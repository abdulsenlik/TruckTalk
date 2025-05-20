// Edge function for text-to-speech service integration

import { corsHeaders } from "../_shared/cors.ts";
import {
  TextToSpeechRequest,
  TextToSpeechResponse,
} from "../_shared/tts-types.ts";

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
      text,
      voice = "en-US-Neural2-F",
      language = "en-US",
      speed = 1.0,
    } = (await req.json()) as TextToSpeechRequest;

    if (!text) {
      throw new Error("Missing required parameter: text");
    }

    console.log(
      "Processing text-to-speech request for:",
      text.substring(0, 30),
    );

    // Get API key from environment
    const apiKey = Deno.env.get("ELEVENLABS_API_KEY");
    console.log("API Key available:", !!apiKey);

    if (!apiKey) {
      throw new Error("ELEVENLABS_API_KEY not configured");
    }

    // Use ElevenLabs API for high-quality TTS
    const voiceId = "21m00Tcm4TlvDq8ikWAM"; // Default voice ID (Rachel - natural sounding)
    const elevenLabsUrl = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;

    console.log("Calling ElevenLabs API at:", elevenLabsUrl);

    const headers = {
      "Content-Type": "application/json",
      "xi-api-key": apiKey,
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
      const errorText = await response.text();
      console.error(`ElevenLabs API error: ${response.status}`, errorText);
      throw new Error(`ElevenLabs API error: ${response.status}`);
    }

    console.log("ElevenLabs API response received successfully");

    // Get the audio data as an ArrayBuffer
    const audioData = await response.arrayBuffer();
    console.log("Audio data received, size:", audioData.byteLength);

    // Convert to base64
    const uint8Array = new Uint8Array(audioData);
    let binary = "";
    for (let i = 0; i < uint8Array.byteLength; i++) {
      binary += String.fromCharCode(uint8Array[i]);
    }
    const base64Audio = btoa(binary);
    const audioUrl = `data:audio/mpeg;base64,${base64Audio}`;

    console.log("Audio URL created successfully");

    const result: TextToSpeechResponse = {
      audioUrl,
      duration: 0, // Actual duration would require audio analysis
    };

    return new Response(JSON.stringify(result), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
      status: 200,
    });
  } catch (error) {
    console.error("TTS Error:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "Failed to generate speech",
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
