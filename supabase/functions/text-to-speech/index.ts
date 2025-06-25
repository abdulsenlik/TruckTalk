// Supabase Edge Function for ElevenLabs Text-to-Speech (TTS)
// Public function - no JWT verification required

Deno.serve(async (req) => {
  // Get the origin from the request headers
  const origin = req.headers.get("origin");
  
  // Dynamic CORS headers - only allow the requesting origin
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
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
    console.log("[TTS] Request received");
    
    // Parse the request body
    const { text, voice = "en-US-Neural2-F", language = "en-US", speed = 1.0 } = await req.json();
    
    if (!text) {
      throw new Error("Missing required parameter: text");
    }

    // Get API key from environment
    const apiKey = Deno.env.get("ELEVENLABS_API_KEY");
    if (!apiKey) {
      console.error("[TTS] ELEVENLABS_API_KEY not found in environment");
      throw new Error("ELEVENLABS_API_KEY not configured");
    }

    // ElevenLabs configuration
    const voiceId = "21m00Tcm4TlvDq8ikWAM";
    const elevenLabsUrl = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;

    console.log(`[TTS] Generating audio for text: "${text.substring(0, 50)}..."`);
    console.log(`[TTS] Using voice ID: ${voiceId}`);

    // Create an AbortController with 10 second timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      // Call ElevenLabs API with timeout
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
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      console.log(`[TTS] ElevenLabs response status: ${response.status}`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`[TTS] ElevenLabs API Error: ${response.status} - ${errorText}`);
        throw new Error(`ElevenLabs API Error: ${response.status} - ${errorText}`);
      }

      // Get the audio data
      const audioData = await response.arrayBuffer();
      console.log(`[TTS] Audio data received: ${audioData.byteLength} bytes`);

      // Return the audio data directly
      return new Response(audioData, {
        headers: {
          ...corsHeaders,
          "Content-Type": "audio/mpeg",
          "Content-Length": audioData.byteLength.toString(),
          "Cache-Control": "public, max-age=3600" // Cache for 1 hour
        }
      });

    } catch (fetchError: any) {
      clearTimeout(timeoutId);
      
      if (fetchError.name === 'AbortError') {
        console.error("[TTS] Request timed out after 10 seconds");
        throw new Error("ElevenLabs API request timed out");
      }
      
      throw fetchError;
    }

  } catch (err: any) {
    console.error("[TTS] Error:", err.message || err);
    return new Response(
      JSON.stringify({
        success: false,
        error: err.message || "Unknown error occurred"
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json"
        },
        status: 500
      }
    );
  }
});
