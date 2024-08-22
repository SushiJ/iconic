import { eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { icons } from "~/server/db/schema";

export const iconRouter = createTRPCRouter({
  getIcons: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const icon = await ctx.db.query.icons.findFirst({
      where: eq(icons.userId, userId),
    });
    return icon;
  }),
});
