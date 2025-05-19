// Edge function for text-to-speech using ElevenLabs API

interface TextToSpeechRequest {
  text: string;
  voice?: string;
  language?: string;
  speed?: number;
}

interface TextToSpeechResponse {
  audioUrl: string;
  duration: number;
}

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
      text,
      voice = "en-US-Neural2-F",
      language = "en-US",
      speed = 1.0,
    } = (await req.json()) as TextToSpeechRequest;

    if (!text) {
      throw new Error("Missing required parameter: text");
    }

    // Use ElevenLabs API for high-quality TTS
    const voiceId = "21m00Tcm4TlvDq8ikWAM"; // Default voice ID (Rachel - natural sounding)
    const elevenLabsUrl = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;

    const headers = {
      "Content-Type": "application/json",
      "xi-api-key":
        Deno.env.get("ELEVENLABS_API_KEY") || "your-elevenlabs-api-key",
    };

    const body = JSON.stringify({
      text,
      model_id: "eleven_monolingual_v1",
      voice_settings: {
        stability: 0.75,
        similarity_boost: 0.75,
        style: 0.0,
        use_speaker_boost: true,
        speaking_rate: speed,
      },
    });

    const response = await fetch(elevenLabsUrl, {
      method: "POST",
      headers,
      body,
    });

    if (!response.ok) {
      console.error(`ElevenLabs API error: ${response.status}`);
      throw new Error(`ElevenLabs API error: ${response.status}`);
    }

    // Get the audio data as an ArrayBuffer
    const audioData = await response.arrayBuffer();

    // Convert to base64
    const base64Audio = btoa(String.fromCharCode(...new Uint8Array(audioData)));
    const audioUrl = `data:audio/mpeg;base64,${base64Audio}`;

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          audioUrl,
          duration: 0, // Actual duration would require audio analysis
        },
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
    console.error("TTS Error:", error);
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
