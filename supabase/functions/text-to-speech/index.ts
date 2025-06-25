// Supabase Edge Function for ElevenLabs Text-to-Speech (TTS)
// Public function - no JWT verification required

Deno.serve(async (req) => {
  // Get the origin from the request headers
  const origin = req.headers.get("origin");
  
  // Dynamic CORS headers - only allow the requesting origin
  const corsHeaders = {
    "Access-Control-Allow-Origin": origin || "https://thetrucktalk.com",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Vary": "Origin" // Important for caching with multiple origins
  };

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
      status: 200
    });
  }

  // Only allow POST requests
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({
        success: false,
        error: `Method ${req.method} not allowed. Only POST is supported.`
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json"
        },
        status: 405
      }
    );
  }

  try {
    // Parse the request body
    const { text, voice = "en-US-Neural2-F", language = "en-US", speed = 1.0 } = await req.json();
    
    if (!text) {
      throw new Error("Missing required parameter: text");
    }

    // Get API key from environment
    const apiKey = Deno.env.get("ELEVENLABS_API_KEY");
    if (!apiKey) {
      throw new Error("ELEVENLABS_API_KEY not configured");
    }

    // ElevenLabs configuration
    const voiceId = "21m00Tcm4TlvDq8ikWAM";
    const elevenLabsUrl = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;

    console.log(`[TTS] Generating audio for text: "${text.substring(0, 50)}..."`);

    // Call ElevenLabs API
    const response = await fetch(elevenLabsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": apiKey
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_monolingual_v1",
        voice_settings: {
          stability: 0.75,
          similarity_boost: 0.75,
          speaking_rate: speed,
          style: 0,
          use_speaker_boost: true
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[TTS] ElevenLabs API Error: ${response.status} - ${errorText}`);
      throw new Error(`ElevenLabs API Error: ${response.status} - ${errorText}`);
    }

    // Stream the audio response directly to the client
    // This is more efficient than loading into memory first
    return new Response(response.body, {
      headers: {
        ...corsHeaders,
        "Content-Type": "audio/mpeg",
        "Content-Disposition": "inline; filename=speech.mp3",
        "Cache-Control": "public, max-age=3600" // Cache for 1 hour
      }
    });

  } catch (err) {
    console.error("[TTS] Error:", err);
    return new Response(
      JSON.stringify({
        success: false,
        error: err.message
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json"
        },
        status: 400
      }
    );
  }
});
