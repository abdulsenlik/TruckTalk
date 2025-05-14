import { StripeCheckoutResponse } from "@shared/types.ts";

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "authorization, x-client-info, apikey, content-type",
      },
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
    } = await req.json();

    if (!priceId || !successUrl || !cancelUrl) {
      throw new Error(
        "Missing required parameters: priceId, successUrl, or cancelUrl",
      );
    }

    const url = "https://api.picaos.com/v1/passthrough/v1/checkout/sessions";

    const params = new URLSearchParams();
    params.append("mode", mode);
    params.append("line_items[0][price]", priceId);
    params.append("line_items[0][quantity]", "1");
    params.append("success_url", successUrl);
    params.append("cancel_url", cancelUrl);

    if (customerEmail) {
      params.append("customer_email", customerEmail);
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
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        status: 200,
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        status: 400,
      },
    );
  }
});
