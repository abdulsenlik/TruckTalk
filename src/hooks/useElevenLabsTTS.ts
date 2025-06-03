import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";

export function useElevenLabsTTS() {
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<Error | null>(null);
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});

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

    setLoading((prev) => ({ ...prev, [identifier]: true }));
    setError(null);

    try {
      if (audioRefs.current[identifier]) {
        audioRefs.current[identifier].pause();
        audioRefs.current[identifier].src = "";
      }

      const { data, error } = await supabase.functions.invoke(
        "supabase-functions-text-to-speech",
        {
          body: { text },
        },
      );

      if (error) throw error;

      const blob = new Blob([data], { type: "audio/mpeg" });
      const audioUrl = URL.createObjectURL(blob);

      const audio = new Audio(audioUrl);
      audioRefs.current[identifier] = audio;
      audio.preload = "auto";
      audio.playsInline = true;
      await audio.play();
    } catch (err) {
      console.error("[TTS] Error:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setTimeout(() => {
        setLoading((prev) => ({ ...prev, [identifier]: false }));
      }, 500);
    }
  };

  return { playText, loading, error };
}
