import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import OpenAI from "openai";
import { env } from "~/env";
import { users } from "~/server/db/schema";
import { eq } from "drizzle-orm";

const openAi = new OpenAI({
  apiKey: env.OPEN_API_KEY,
});

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
        .set({ credits })
        .where(eq(users.id, ctx.session.user.id));

      if (result.rowsAffected <= 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Do not have enough credits",
        });
      }
      // let url;
      // if (env.MOCK_API === "true") {
      //   // TODO: b64 image
      //   url = "";
      // } else {
      //   const formPrompt = `generate a modern looking icon for ${input.prompt} with the following attributes color:${input.color}, shape:${input.shape}, style:${input.style}`;
      //   const response = await openAi.images.generate({
      //     prompt: formPrompt,
      //     n: 1,
      //     size: "512x512",
      //   });
      //   url = response.data[0]?.url;
      // }
      return {
        result: result.rowsAffected,
        // imageUrl: url,
      };
    }),

  getIcon: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
});
