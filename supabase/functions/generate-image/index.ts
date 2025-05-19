// Edge function to generate images for emergency phrases

interface ImageGenerationRequest {
  prompt: string;
  language?: string;
}

interface ImageGenerationResponse {
  imageUrl: string;
}

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
const OPENAI_API_URL = "https://api.openai.com/v1/images/generations";

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
    // Parse request body
    const { prompt, language = "en" } =
      (await req.json()) as ImageGenerationRequest;

    if (!prompt) {
      throw new Error("Missing required parameter: prompt");
    }

    if (!OPENAI_API_KEY) {
      throw new Error("OpenAI API key not configured");
    }

    // Enhance the prompt based on the language
    let enhancedPrompt = `A clear, simple illustration showing: ${prompt}`;

    if (language !== "en") {
      enhancedPrompt += `. The image should be culturally appropriate and easily understood by ${language === "tr" ? "Turkish" : language === "kg" ? "Kyrgyz" : language === "ru" ? "Russian" : "international"} viewers.`;
    }

    // Call OpenAI API to generate image
    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: enhancedPrompt,
        n: 1,
        size: "1024x1024",
        quality: "standard",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenAI API error: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    const imageUrl = data.data[0]?.url;

    if (!imageUrl) {
      throw new Error("Failed to generate image");
    }

    const result: ImageGenerationResponse = { imageUrl };

    return new Response(JSON.stringify(result), {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      status: 200,
    });
  } catch (error) {
    console.error("Error generating image:", error);

    return new Response(
      JSON.stringify({
        error: error.message || "Failed to generate image",
      }),
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        status: 500,
      },
    );
  }
});
