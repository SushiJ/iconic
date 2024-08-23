import { TRPCError } from "@trpc/server";
import { z } from "zod";
import OpenAI from "openai";
import { eq } from "drizzle-orm";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { icons, users } from "~/server/db/schema";
import { env } from "~/env";

import { b64Image } from "~/data/b64";

const openAi = new OpenAI({
  apiKey: env.OPEN_API_KEY,
});

const s3 = new S3Client({
  credentials: {
    accessKeyId: env.ACCESS_KEY,
    secretAccessKey: env.SECRET_ACCESS_KEY,
  },
  region: "ap-south-1",
});

function putObject(key: string, image: string) {
  return new PutObjectCommand({
    Key: key,
    Bucket: env.BUCKET_NAME,
    Body: Buffer.from(image, "base64"),
    ContentEncoding: "base64",
    ContentType: "image/png",
  });
}

export const generateRouter = createTRPCRouter({
  generateIcon: protectedProcedure
    .input(
      z.object({
        prompt: z.string().min(10),
        color: z.string(),
        shape: z.string(),
        style: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.db.query.users.findFirst({
        where: eq(users.id, ctx.session.user.id),
      });
      const credits = Math.max(user!.credits! - 1, 0);

      const result = await ctx.db
        .update(users)
        .set({ credits: credits })
        .where(eq(users.id, ctx.session.user.id));

      if (result.rowsAffected <= 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Do not have enough credits",
        });
      }
      let base64: string | undefined;
      if (env.MOCK_API === "true") {
        base64 = b64Image;
      } else {
        const formPrompt = `generate a modern looking icon for ${input.prompt} with the following attributes color:${input.color}, shape:${input.shape}, style:${input.style}`;
        const response = await openAi.images.generate({
          prompt: formPrompt,
          n: 1,
          size: "512x512",
          response_format: "b64_json",
        });
        base64 = response.data[0]?.b64_json;
      }

      const icon = await ctx.db
        .insert(icons)
        .values({
          prompt: input.prompt,
          userId: ctx.session.user.id,
        })
        .returning();
      // TODO: handle it fails to save to the db

      const response = await s3.send(putObject(icon[0]!.id, base64!));
      if (response.$metadata.httpStatusCode !== 200) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to save it to the database",
        });
      }

      return {
        imageUrl: `https://${env.BUCKET_NAME}.s3.ap-south-1.amazonaws.com/${icon[0]?.id}`,
      };
    }),

  getIcon: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input, ctx }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
});
