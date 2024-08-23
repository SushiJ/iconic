import { loadStripe } from "@stripe/stripe-js";
import { env } from "~/env";
import { api } from "~/utils/api";

const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_KEY);

export function useGetCredits() {
  const checkout = api.checkout.createCheckout.useMutation();

  const buyCredits = async () => {
    const response = await checkout.mutateAsync();
    const stripe = await stripePromise;
    await stripe?.redirectToCheckout({
      sessionId: response.id,
    });
  };
  return buyCredits;
}
