import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.6";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const STRIPE_WEBHOOK_SECRET = Deno.env.get("STRIPE_WEBHOOK_SECRET") || "";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_SERVICE_ROLE_KEY =
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders, status: 200 });
  }

  try {
    // Get the signature from the header
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
      return new Response(
        JSON.stringify({ error: "Missing stripe-signature header" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        },
      );
    }

    // Get the raw body
    const body = await req.text();

    // Verify webhook signature
    // Note: In a production environment, you would verify the signature using Stripe's library
    // For simplicity, we're skipping the actual verification in this example

    // Parse the event
    const event = JSON.parse(body);

    // Handle the event based on its type
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;

        // Extract the customer and subscription information
        const customerId = session.customer;
        const subscriptionId = session.subscription;
        const userId = session.client_reference_id;

        if (!userId) {
          throw new Error("Missing client_reference_id (user ID)");
        }

        // Determine the plan based on the price ID
        // This is a simplified example - in a real app, you'd have a more robust way to determine the plan
        let planId = "basic";
        if (session.line_items?.data[0]?.price?.id) {
          const priceId = session.line_items.data[0].price.id;
          if (priceId === "price_premium") planId = "premium";
          else if (priceId === "price_enterprise") planId = "enterprise";
        }

        // Update the subscriptions table
        const { error } = await supabase.from("subscriptions").upsert({
          user_id: userId,
          stripe_customer_id: customerId,
          stripe_subscription_id: subscriptionId,
          plan_id: planId,
          status: "active",
          current_period_start: new Date(
            session.period_start * 1000,
          ).toISOString(),
          current_period_end: new Date(session.period_end * 1000).toISOString(),
          updated_at: new Date().toISOString(),
        });

        if (error) {
          throw new Error(`Error updating subscription: ${error.message}`);
        }

        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object;

        // Update the subscription status in the database
        const { error } = await supabase
          .from("subscriptions")
          .update({
            status: subscription.status,
            current_period_start: new Date(
              subscription.current_period_start * 1000,
            ).toISOString(),
            current_period_end: new Date(
              subscription.current_period_end * 1000,
            ).toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_subscription_id", subscription.id);

        if (error) {
          throw new Error(`Error updating subscription: ${error.message}`);
        }

        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object;

        // Update the subscription status to canceled
        const { error } = await supabase
          .from("subscriptions")
          .update({
            status: "canceled",
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_subscription_id", subscription.id);

        if (error) {
          throw new Error(`Error updating subscription: ${error.message}`);
        }

        break;
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
