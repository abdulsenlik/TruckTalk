// Supabase Edge Function for ElevenLabs Text-to-Speech (TTS)
// Public function - no JWT verification required

Deno.serve(async (req) => {
  const startTime = Date.now();
  const requestId = Math.random().toString(36).substring(7);
  
  console.log(`[TTS-${requestId}] Request received at ${new Date().toISOString()}`);
  
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
    console.log(`[TTS-${requestId}] CORS preflight request from origin: ${origin}`);
    return new Response("ok", {
      headers: corsHeaders,
      status: 200
    });
  }

  // Only allow POST requests
  if (req.method !== "POST") {
    console.log(`[TTS-${requestId}] Method ${req.method} not allowed`);
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
    console.log(`[TTS-${requestId}] Processing POST request`);
    
    // Parse the request body with timeout
    const bodyPromise = req.json();
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error("Request body parsing timeout")), 5000)
    );
    
    const { text, voice = "en-US-Neural2-F", language = "en-US", speed = 1.0 } = 
      await Promise.race([bodyPromise, timeoutPromise]) as any;
    
    if (!text) {
      console.log(`[TTS-${requestId}] Missing text parameter`);
      throw new Error("Missing required parameter: text");
    }

    console.log(`[TTS-${requestId}] Text length: ${text.length} characters`);

    // Get API key from environment
    const apiKey = Deno.env.get("ELEVENLABS_API_KEY");
    if (!apiKey) {
      console.error(`[TTS-${requestId}] ELEVENLABS_API_KEY not found in environment`);
      throw new Error("ELEVENLABS_API_KEY not configured");
    }

    // ElevenLabs configuration
    const voiceId = "21m00Tcm4TlvDq8ikWAM";
    const elevenLabsUrl = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;

    console.log(`[TTS-${requestId}] Generating audio for text: "${text.substring(0, 50)}..."`);
    console.log(`[TTS-${requestId}] Using voice ID: ${voiceId}`);

    // Create an AbortController with 15 second timeout (increased from 10)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      console.log(`[TTS-${requestId}] Request timeout after 15 seconds`);
      controller.abort();
    }, 15000);

    try {
      // Call ElevenLabs API with timeout
      const elevenLabsStartTime = Date.now();
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
      const elevenLabsTime = Date.now() - elevenLabsStartTime;
      
      console.log(`[TTS-${requestId}] ElevenLabs response status: ${response.status} (took ${elevenLabsTime}ms)`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`[TTS-${requestId}] ElevenLabs API Error: ${response.status} - ${errorText}`);
        
        // Provide more specific error messages based on status code
        if (response.status === 401) {
          throw new Error("ElevenLabs API authentication failed - check API key");
        } else if (response.status === 429) {
          throw new Error("ElevenLabs API rate limit exceeded - please try again later");
        } else if (response.status >= 500) {
          throw new Error("ElevenLabs API server error - please try again later");
        } else {
          throw new Error(`ElevenLabs API Error: ${response.status} - ${errorText}`);
        }
      }

      // Get the audio data
      const audioStartTime = Date.now();
      const audioData = await response.arrayBuffer();
      const audioTime = Date.now() - audioStartTime;
      
      console.log(`[TTS-${requestId}] Audio data received: ${audioData.byteLength} bytes (took ${audioTime}ms)`);

      if (audioData.byteLength === 0) {
        throw new Error("Received empty audio data from ElevenLabs");
      }

      const totalTime = Date.now() - startTime;
      console.log(`[TTS-${requestId}] Request completed successfully in ${totalTime}ms`);

      // Return the audio data directly
      return new Response(audioData, {
        headers: {
          ...corsHeaders,
          "Content-Type": "audio/mpeg",
          "Content-Length": audioData.byteLength.toString(),
          "Cache-Control": "public, max-age=3600", // Cache for 1 hour
          "X-Request-ID": requestId,
          "X-Processing-Time": totalTime.toString()
        }
      });

    } catch (fetchError: any) {
      clearTimeout(timeoutId);
      
      if (fetchError.name === 'AbortError') {
        console.error(`[TTS-${requestId}] Request timed out after 15 seconds`);
        throw new Error("ElevenLabs API request timed out - please try again");
      }
      
      console.error(`[TTS-${requestId}] Fetch error:`, fetchError);
      throw fetchError;
    }

  } catch (err: any) {
    const totalTime = Date.now() - startTime;
    console.error(`[TTS-${requestId}] Error after ${totalTime}ms:`, err.message || err);
    
    // Determine appropriate status code
    let statusCode = 500;
    if (err.message?.includes("Missing required parameter")) {
      statusCode = 400;
    } else if (err.message?.includes("not configured")) {
      statusCode = 500;
    } else if (err.message?.includes("timeout")) {
      statusCode = 504;
    } else if (err.message?.includes("rate limit")) {
      statusCode = 429;
    }
    
    return new Response(
      JSON.stringify({
        success: false,
        error: err.message || "Unknown error occurred",
        requestId: requestId,
        processingTime: totalTime
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
          "X-Request-ID": requestId,
          "X-Processing-Time": totalTime.toString()
        },
        status: statusCode
      }
    );
  }
});
