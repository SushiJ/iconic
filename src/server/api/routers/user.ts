import { desc, eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { users, icons } from "~/server/db/schema";

export const userRouter = createTRPCRouter({
  getUserCredits: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const user = await ctx.db.query.users.findFirst({
      where: eq(users.id, userId),
    });
    return user?.credits;
  }),
  getUserInfo: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.query.users.findFirst({
      where: eq(users.id, ctx.session.user.id),
    });
    const userIcons = await ctx.db.query.icons.findMany({
      where: eq(icons.userId, ctx.session.user.id),
      limit: 10,
      orderBy: desc(icons.createdAt),
    });
    return {
      userIcons,
      user,
    };
  }),
});
