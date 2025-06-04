// Supabase Edge Function for ElevenLabs Text-to-Speech (TTS)
Deno.serve(async (req) => {
  // Handle CORS preflight
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
      text,
      voice = "en-US-Neural2-F",
      language = "en-US",
      speed = 1.0,
    } = await req.json();
    if (!text) throw new Error("Missing required parameter: text");
    const apiKey = Deno.env.get("ELEVENLABS_API_KEY");
    if (!apiKey) throw new Error("ELEVENLABS_API_KEY not configured");
    const voiceId = "21m00Tcm4TlvDq8ikWAM";
    const elevenLabsUrl = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;
    const response = await fetch(elevenLabsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": apiKey,
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_monolingual_v1",
        voice_settings: {
          stability: 0.75,
          similarity_boost: 0.75,
          speaking_rate: speed,
          style: 0,
          use_speaker_boost: true,
        },
      }),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `ElevenLabs API Error: ${response.status} - ${errorText}`,
      );
    }
    const audioData = await response.arrayBuffer();
    return new Response(audioData, {
      headers: {
        "Content-Type": "audio/mpeg", // or try audio/mp3 if needed
        "Content-Disposition": "inline; filename=speech.mp3",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    console.error("TTS Error:", err);
    return new Response(
      JSON.stringify({
        success: false,
        error: err.message,
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
