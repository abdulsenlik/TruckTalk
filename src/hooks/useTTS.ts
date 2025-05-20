import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";

export function useTTS(text: string) {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!text) return;

    let isCancelled = false;
    setLoading(true);
    setError(null);

    async function fetchAudio() {
      try {
        const { data, error } = await supabase.functions.invoke(
          "supabase-functions-text-to-speech",
          {
            body: {
              text,
              language: "en-US",
              speed: 0.9,
            },
          },
        );

        if (error) {
          throw error;
        }

        if (!isCancelled && data?.data?.audioUrl) {
          setAudioUrl(data.data.audioUrl);
        } else if (!isCancelled) {
          throw new Error("No audio URL returned from TTS service");
        }
      } catch (err) {
        if (!isCancelled) {
          console.error("Failed to fetch audioUrl:", err);
          setError(err instanceof Error ? err : new Error(String(err)));
        }
      } finally {
        if (!isCancelled) setLoading(false);
      }
    }

    fetchAudio();

    return () => {
      isCancelled = true;
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
    };
  }, [text]);

  const playAudio = async () => {
    if (!audioUrl) return;

    try {
      if (audioRef.current) {
        audioRef.current.pause();
      }

      audioRef.current = new Audio(audioUrl);
      await audioRef.current.play();
    } catch (err) {
      console.error("Audio playback error:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  };

  return { audioUrl, loading, error, playAudio };
}
