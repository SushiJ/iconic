import Stripe from "stripe";
import { env } from "~/env";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});

export const checkoutRouter = createTRPCRouter({
  createCheckout: protectedProcedure.mutation(({ ctx }) => {
    return stripe.checkout.sessions.create({
      success_url: env.HOST_NAME,
      cancel_url: env.HOST_NAME,
      metadata: {
        userId: ctx.session.user.id,
      },
      payment_method_types: ["card", "us_bank_account"],
      line_items: [
        {
          price: env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: "payment",
    });
  }),
});
