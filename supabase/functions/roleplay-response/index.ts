// Supabase Edge Function for Roleplay Response Generation
Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers":
          "authorization, x-client-info, apikey, content-type",
      },
      status: 200,
    });
  }

  // Only allow POST requests
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({
        success: false,
        error: `Method ${req.method} not allowed. Only POST is supported.`,
      }),
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        status: 405,
      },
    );
  }

  try {
    // Parse the request body
    const { transcript, context } = await req.json();

    if (!transcript) {
      throw new Error("Missing required parameter: transcript");
    }

    const conversationHistory = context?.conversationHistory || [];

    // Get OpenAI API key
    const openaiApiKey = Deno.env.get("OPENAI_API_KEY");
    if (!openaiApiKey) {
      throw new Error("OPENAI_API_KEY not configured");
    }

    // Build the conversation for OpenAI
    const messages = [
      {
        role: "system",
        content: `You are playing the role of a police officer conducting a traffic stop. 
        Be professional, realistic, and follow typical traffic stop procedures. 
        Keep responses brief and natural, as they would be in a real traffic stop.
        Do not be overly friendly or chatty - maintain professional distance.
        Your responses should be 1-2 sentences maximum unless asking for specific information.
        Common flow: greeting -> ask for documents -> explain reason for stop -> decide on warning/ticket.`,
      },
    ];

    // Add conversation history
    for (const exchange of conversationHistory) {
      messages.push({
        role: exchange.speaker === "Officer" ? "assistant" : "user",
        content: exchange.text,
      });
    }

    // Add the current user response
    messages.push({
      role: "user",
      content: transcript,
    });

    // Call OpenAI API
    const openaiResponse = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiApiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4-turbo-preview",
          messages: messages,
          temperature: 0.7,
          max_tokens: 150,
          presence_penalty: 0.3,
          frequency_penalty: 0.3,
        }),
      },
    );

    if (!openaiResponse.ok) {
      const errorText = await openaiResponse.text();
      throw new Error(
        `OpenAI API Error: ${openaiResponse.status} - ${errorText}`,
      );
    }

    const openaiData = await openaiResponse.json();
    const replyText = openaiData.choices[0].message.content.trim();

    // Generate TTS audio using ElevenLabs
    const elevenLabsApiKey = Deno.env.get("ELEVENLABS_API_KEY");
    if (!elevenLabsApiKey) {
      throw new Error("ELEVENLABS_API_KEY not configured");
    }

    const voiceId = "21m00Tcm4TlvDq8ikWAM"; // Rachel voice
    const elevenLabsUrl = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;

    const ttsResponse = await fetch(elevenLabsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": elevenLabsApiKey,
      },
      body: JSON.stringify({
        text: replyText,
        model_id: "eleven_monolingual_v1",
        voice_settings: {
          stability: 0.75,
          similarity_boost: 0.75,
          speaking_rate: 1.0,
          style: 0,
          use_speaker_boost: true,
        },
      }),
    });

    if (!ttsResponse.ok) {
      const errorText = await ttsResponse.text();
      console.error(`ElevenLabs API Error: ${ttsResponse.status} - ${errorText}`);
      // Don't throw, just return without audio
      return new Response(
        JSON.stringify({
          success: true,
          replyText: replyText,
          ttsAudioUrl: null,
        }),
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          status: 200,
        },
      );
    }

    // Convert audio response to base64
    const audioData = await ttsResponse.arrayBuffer();
    const base64Audio = btoa(
      String.fromCharCode.apply(null, new Uint8Array(audioData)),
    );
    const audioDataUrl = `data:audio/mpeg;base64,${base64Audio}`;

    // Return the response with both text and audio
    return new Response(
      JSON.stringify({
        success: true,
        replyText: replyText,
        ttsAudioUrl: audioDataUrl,
      }),
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        status: 200,
      },
    );
  } catch (err) {
    console.error("Roleplay Response Error:", err);
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
        status: 500,
      },
    );
  }
}); 