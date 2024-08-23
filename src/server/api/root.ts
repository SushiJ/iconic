import { generateRouter } from "~/server/api/routers/generate";
import { exampleRouter } from "~/server/api/routers/example";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "./routers/user";
import { iconRouter } from "./routers/icon";
import { checkoutRouter } from "./routers/checkout";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  generate: generateRouter,
  user: userRouter,
  icon: iconRouter,
  checkout: checkoutRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
