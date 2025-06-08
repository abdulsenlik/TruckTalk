import { useState, useRef } from "react";
import { supabase } from "@/lib/supabase";

export function useTTS() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAudio = async (text: string) => {
    if (!text) return;

    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.functions.invoke(
        "supabase-functions-text-to-speech",
        {
          body: { text },
        },
      );

      if (error) throw error;

      const blob = new Blob([data], { type: "audio/mpeg" });
      const audio = new Audio(URL.createObjectURL(blob));
      audio.preload = "auto";
      audio.setAttribute("playsinline", "true");

      if (audioRef.current) audioRef.current.pause();
      audioRef.current = audio;
      await audio.play();
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      console.error("TTS Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return { playAudio, loading, error };
}
