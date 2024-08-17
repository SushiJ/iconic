import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getUserCredits: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const user = await ctx.db.user.findFirst({
      where: {
        id: userId,
      },
    });
    return user?.credits;
  }),
});
