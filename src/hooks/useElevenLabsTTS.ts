import { useState, useEffect, useRef } from "react";

export function useElevenLabsTTS() {
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<Error | null>(null);
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});

  // Clean up audio elements on unmount
  useEffect(() => {
    return () => {
      Object.values(audioRefs.current).forEach((audio) => {
        audio.pause();
        audio.src = "";
      });
      audioRefs.current = {};
    };
  }, []);

  const playText = async (text: string, identifier: string = "default") => {
    if (!text) return;

    console.log(
      `[TTS] Starting playText for: "${text.substring(0, 30)}${text.length > 30 ? "..." : ""}"`,
    );
    setLoading((prev) => ({ ...prev, [identifier]: true }));
    setError(null);

    try {
      // Stop any currently playing audio for this identifier
      if (audioRefs.current[identifier]) {
        audioRefs.current[identifier].pause();
        audioRefs.current[identifier].src = "";
      }

      console.log("[TTS] Sending fetch request to TTS API");
      const response = await fetch(
        "https://pvstwthufbertinmojuk.functions.supabase.co/supabase-functions-text-to-speech",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }),
        },
      );

      console.log(
        "[TTS] Response status:",
        response.status,
        response.statusText,
      );

      if (!response.ok) {
        throw new Error(`TTS API error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("[TTS] Full API response:", data);

      // Check for different possible paths to the audio URL
      const audioUrl = data?.audioUrl || data?.data?.audioUrl || data?.url;
      console.log("[TTS] Extracted audioUrl:", audioUrl);

      if (!audioUrl) {
        console.error(
          "[TTS] No audioUrl found in response. Full response:",
          data,
        );
        throw new Error("No audioUrl returned from TTS API");
      }

      console.log("[TTS] Creating Audio object with URL:", audioUrl);
      const audio = new Audio(audioUrl);
      audioRefs.current[identifier] = audio;

      console.log("[TTS] Attempting to play audio...");
      await audio.play();
      console.log("[TTS] Audio playback started successfully");
    } catch (err) {
      console.error("[TTS] Error playing TTS audio:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      // Set loading to false after processing
      setTimeout(() => {
        setLoading((prev) => ({ ...prev, [identifier]: false }));
      }, 500);
    }
  };

  // Function to get audio URL without playing it
  const getAudioUrl = async (text: string): Promise<string> => {
    if (!text) return "";

    try {
      console.log(
        `[TTS] Fetching TTS audio URL for text: "${text.substring(0, 30)}${text.length > 30 ? "..." : ""}"`,
      );

      const { supabase } = await import("@/lib/supabase");

      const { data: responseData, error } = await supabase.functions.invoke(
        "supabase-functions-tts-service",
        {
          body: { text },
        },
      );

      if (error) {
        console.error("[TTS] getAudioUrl error:", error);
        throw error;
      }

      console.log("[TTS] getAudioUrl response data received");

      // Get audio URL from response
      const audioUrl = responseData?.audioUrl;
      console.log("[TTS] getAudioUrl extracted audioUrl:", audioUrl);

      if (!audioUrl) {
        console.error(
          "[TTS] No audioUrl found in response. Full response:",
          data,
        );
        throw new Error("No audioUrl returned from TTS API");
      }

      return audioUrl;
    } catch (err) {
      console.error("[TTS] Error getting TTS audio URL:", err);
      throw err;
    }
  };

  return { playText, getAudioUrl, loading, error };
}
