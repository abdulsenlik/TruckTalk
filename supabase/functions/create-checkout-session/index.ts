import { StripeCheckoutResponse } from "@shared/types.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.6";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
      status: 200,
    });
  }

  try {
    const {
      priceId,
      successUrl,
      cancelUrl,
      mode = "subscription",
      customerEmail,
      userId,
    } = await req.json();

    if (!priceId || !successUrl || !cancelUrl) {
      throw new Error(
        "Missing required parameters: priceId, successUrl, or cancelUrl",
      );
    }

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    let customerId = null;

    // If we have a userId, check if customer already exists
    if (userId) {
      const { data: subscription } = await supabase
        .from("subscriptions")
        .select("stripe_customer_id")
        .eq("user_id", userId)
        .single();

      if (subscription?.stripe_customer_id) {
        customerId = subscription.stripe_customer_id;
      }
    }

    // Create Stripe checkout session
    const url = "https://api.picaos.com/v1/passthrough/v1/checkout/sessions";

    const params = new URLSearchParams();
    params.append("mode", mode);
    params.append("line_items[0][price]", priceId);
    params.append("line_items[0][quantity]", "1");
    params.append("success_url", successUrl);
    params.append("cancel_url", cancelUrl);

    if (customerId) {
      params.append("customer", customerId);
    } else if (customerEmail) {
      params.append("customer_email", customerEmail);
    }

    // Add client reference ID for webhook processing
    if (userId) {
      params.append("client_reference_id", userId);
    }

    // Add metadata for tracking
    params.append("metadata[source]", "truckers_english_app");
    params.append("metadata[user_id]", userId || "");

    // Set subscription data for webhook processing
    if (mode === "subscription") {
      params.append("subscription_data[metadata][user_id]", userId || "");
      params.append("subscription_data[metadata][price_id]", priceId);
    }

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      "x-pica-secret": Deno.env.get("PICA_SECRET_KEY") || "",
      "x-pica-connection-key": Deno.env.get("PICA_STRIPE_CONNECTION_KEY") || "",
      "x-pica-action-id": "conn_mod_def::GCmLNSLWawg::Pj6pgAmnQhuqMPzB8fquRg",
    };

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: params.toString(),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Stripe API error:", errorData);
      throw new Error(`Stripe API error: ${response.status} ${errorData}`);
    }

    const data: StripeCheckoutResponse = await response.json();

    return new Response(
      JSON.stringify({
        success: true,
        data,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        status: 200,
      },
    );
  } catch (error) {
    console.error("Checkout session creation error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        status: 400,
      },
    );
  }
});
