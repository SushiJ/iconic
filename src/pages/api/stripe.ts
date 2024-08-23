import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { eq } from "drizzle-orm";
import { buffer } from "micro";
import { env } from "~/env";

import { db } from "~/server/db";
import { users } from "~/server/db/schema";

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const webhook = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"] as string;

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        buf,
        sig,
        env.STRIPE_WEBHOOK_SECRET,
      );
    } catch (err) {
      let message = "Unknown Error";
      if (err instanceof Error) message = err.message;
      res.status(400).send(`Webhook Error: ${message}`);
      return;
    }

    switch (event.type) {
      case "checkout.session.completed":
        const completedEvent = event.data.object as unknown as {
          id: string;
          metadata: {
            userId: string;
          };
        };

        const user = await db.query.users.findFirst({
          where: eq(users.id, completedEvent.metadata.userId),
        });
        await db
          .update(users)
          .set({
            credits: user!.credits! + 100,
          })
          .where(eq(users.id, completedEvent.metadata.userId));

        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export default webhook;
