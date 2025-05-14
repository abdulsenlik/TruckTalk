import { supabase } from "./supabase";

interface CheckoutParams {
  priceId: string;
  successUrl: string;
  cancelUrl: string;
  customerEmail?: string;
  mode?: "subscription" | "payment";
}

export async function createCheckoutSession(params: CheckoutParams) {
  const { data, error } = await supabase.functions.invoke(
    "supabase-functions-create-checkout-session",
    {
      body: params,
    },
  );

  if (error) {
    throw new Error(`Error creating checkout session: ${error.message}`);
  }

  return data;
}

export const SUBSCRIPTION_PRICES = {
  FREE: "free", // Not an actual price ID, just for reference
  BASIC: "price_basic123", // Replace with actual Stripe price ID
  PREMIUM: "price_premium123", // Replace with actual Stripe price ID
  ENTERPRISE: "price_enterprise123", // Replace with actual Stripe price ID
};
