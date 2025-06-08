import { useRef } from "react";

export default function StaticAudioTest() {
  const audioRef = useRef<HTMLAudioElement>(null);

  return (
    <div style={{ padding: 20 }}>
      <audio ref={audioRef} src="/test.mp3" controls />
      <button
        onClick={() => {
          audioRef.current
            ?.play()
            .then(() => console.log("✅ StaticAudioTest play succeeded"))
            .catch((err) =>
              console.error("❌ StaticAudioTest play failed:", err),
            );
        }}
      >
        ▶️ Play Static Test
      </button>
    </div>
  );
}
