import { supabase } from "@/lib/supabase";

interface AudioContextData {
  audio: HTMLAudioElement;
  url: string;
  ready: boolean;
}

class AudioService {
  private audioContexts: Record<string, AudioContextData> = {};
  private webAudioContext: AudioContext | null = null;
  private permissionRequested = false;

  // Check if we're in an iframe
  private isInIframe(): boolean {
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  }

  // Initialize Web Audio API context with user gesture
  private async initializeWebAudioContext(): Promise<boolean> {
    if (this.webAudioContext && this.webAudioContext.state !== "closed") {
      return true;
    }

    try {
      console.log("[AudioService] Initializing Web Audio Context...");

      // Create AudioContext
      this.webAudioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();

      // ────── 🔧 User‐gesture resume hack ──────
      // On first click anywhere, if the context is still suspended, resume it
      document.addEventListener(
        "click",
        () => {
          if (this.webAudioContext?.state === "suspended") {
            this.webAudioContext
              .resume()
              .then(() =>
                console.log(
                  "[AudioService] Web Audio Context resumed via user gesture",
                ),
              );
          }
        },
        { once: true },
      );
      // ───────────────────────────────────────

      // Resume context if suspended (required for autoplay policy)
      if (this.webAudioContext.state === "suspended") {
        await this.webAudioContext.resume();
        console.log("[AudioService] Web Audio Context resumed");
      }

      console.log(
        "[AudioService] Web Audio Context state:",
        this.webAudioContext.state,
      );
      return this.webAudioContext.state === "running";
    } catch (error) {
      console.error(
        "[AudioService] Failed to initialize Web Audio Context:",
        error,
      );
      return false;
    }
  }

  // Request audio permission through user interaction
  private async requestAudioPermission(): Promise<boolean> {
    if (this.permissionRequested && this.webAudioContext?.state === "running") {
      return true;
    }

    this.permissionRequested = true;
    console.log("[AudioService] Requesting audio permission...");

    // Check if AudioPermissionProvider is available
    if ((window as any).__audioPermissionProvider) {
      try {
        return await (
          window as any
        ).__audioPermissionProvider.requestPermission();
      } catch (error) {
        console.warn("[AudioService] AudioPermissionProvider failed:", error);
      }
    }

    // Fallback: try to initialize directly
    return await this.initializeWebAudioContext();
  }

  // Replace your existing prepareAudio method in src/lib/audioService.ts with this:

  private async prepareAudio(
    text: string,
    identifier: string,
  ): Promise<AudioContextData> {
    if (this.audioContexts[identifier]?.ready) {
      return this.audioContexts[identifier];
    }

    console.log(
      `[AudioService] Preparing audio for: "${text}" (${identifier})`,
    );

    // ─── 1. Fetch binary audio from your Edge Function ───
    const res = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/supabase-functions-text-to-speech`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({ text }),
      },
    );

    if (!res.ok) {
      const errMsg = await res.text();
      console.error(
        `[AudioService] Edge Function error ${res.status}:`,
        errMsg,
      );
      throw new Error(`Edge Function returned ${res.status}`);
    }

    const arrayBuffer = await res.arrayBuffer();
    console.log(
      `[AudioService] Audio data size: ${arrayBuffer.byteLength} bytes`,
    );

    if (arrayBuffer.byteLength === 0) {
      throw new Error("Received empty audio data from TTS service");
    }

    // ─── 2. Turn it into a Blob + URL ───
    const blob = new Blob([arrayBuffer], { type: "audio/mpeg" });
    const url = URL.createObjectURL(blob);
    const audio = new Audio();
    audio.src = url;
    audio.preload = "auto";
    audio.setAttribute("playsinline", "true");
    audio.crossOrigin = "anonymous";
    audio.volume = 1.0;
    audio.muted = false;
    audio.controls = false;
    audio.autoplay = false;

    // ─── 3. Wait for canplaythrough ───
    const context: AudioContextData = { audio, url, ready: false };
    this.audioContexts[identifier] = context;

    await new Promise<void>((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error("Timeout: Audio loading took too long."));
      }, 10_000);

      audio.addEventListener(
        "canplaythrough",
        () => {
          clearTimeout(timeout);
          context.ready = true;
          console.log(`[AudioService] Audio ready for: ${identifier}`, {
            duration: audio.duration,
            readyState: audio.readyState,
          });
          resolve();
        },
        { once: true },
      );

      audio.addEventListener(
        "error",
        (e) => {
          clearTimeout(timeout);
          reject(new Error("Error loading audio element"));
        },
        { once: true },
      );

      audio.load();
    });

    return context;
  }

  async playText(text: string, identifier: string = "default"): Promise<void> {
    if (!text) {
      console.warn("[AudioService] Empty text provided, skipping playback");
      return;
    }

    // Normalize identifier to avoid conflicts
    const normalizedIdentifier = identifier
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-");
    console.log(`[AudioService] Playing: "${text}" (${normalizedIdentifier})`);
    console.log(`[AudioService] In iframe: ${this.isInIframe()}`);

    try {
      // Request audio permission first
      const hasPermission = await this.requestAudioPermission();
      if (!hasPermission) {
        console.warn("[AudioService] Audio permission not granted");
        throw new Error("Audio permission required");
      }

      const context = await this.prepareAudio(text, normalizedIdentifier);
      const { audio } = context;

      // Stop any currently playing audio with the same identifier
      if (this.audioContexts[normalizedIdentifier]?.audio) {
        try {
          this.audioContexts[normalizedIdentifier].audio.pause();
          this.audioContexts[normalizedIdentifier].audio.currentTime = 0;
        } catch (stopError) {
          console.warn(
            "[AudioService] Error stopping previous audio:",
            stopError,
          );
        }
      }

      // Reset audio position
      try {
        audio.currentTime = 0;
      } catch (resetError) {
        console.warn(
          "[AudioService] Could not reset audio position:",
          resetError,
        );
      }

      // Ensure audio is not muted
      audio.muted = false;
      audio.volume = 1.0;

      console.log(`[AudioService] Audio element state:`, {
        readyState: audio.readyState,
        paused: audio.paused,
        muted: audio.muted,
        volume: audio.volume,
        src: audio.src ? "set" : "not set",
        duration: audio.duration,
        networkState: audio.networkState,
      });

      // Play with enhanced error handling
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        await playPromise;
        console.log("[AudioService] Playback started successfully");

        // Additional verification that audio is actually playing
        setTimeout(() => {
          if (!audio.paused && audio.currentTime > 0) {
            console.log(
              "[AudioService] Audio confirmed playing at time:",
              audio.currentTime,
            );
          } else {
            console.warn(
              "[AudioService] Audio appears to be paused despite play() success",
              { paused: audio.paused, currentTime: audio.currentTime },
            );
          }
        }, 200);
      }
    } catch (err: any) {
      console.error("[AudioService] Playback error:", err);

      // Enhanced error reporting
      if (err.name === "NotAllowedError") {
        console.error(
          "[AudioService] Audio blocked by browser policy - user interaction required",
        );
        throw new Error(
          "Audio playback blocked - please click to enable audio permissions",
        );
      } else if (err.name === "NotSupportedError") {
        console.error("[AudioService] Audio format not supported");
        throw new Error("Audio format not supported by browser");
      } else if (err.name === "AbortError") {
        console.error("[AudioService] Audio playback was aborted");
        throw new Error("Audio playback was interrupted");
      } else {
        throw new Error(
          "Failed to play audio: " + (err.message || "Unknown error"),
        );
      }
    }
  }

  // Method to check if audio is supported and permitted
  async checkAudioSupport(): Promise<{
    supported: boolean;
    permitted: boolean;
    inIframe: boolean;
  }> {
    const supported = !!(
      window.Audio &&
      (window.AudioContext || (window as any).webkitAudioContext)
    );
    const inIframe = this.isInIframe();

    let permitted = false;
    try {
      const testAudio = new Audio();
      const playPromise = testAudio.play();
      if (playPromise) {
        await playPromise;
        testAudio.pause();
        permitted = true;
      }
    } catch (e) {
      permitted = false;
    }

    return { supported, permitted, inIframe };
  }

  cleanup(): void {
    console.log("[AudioService] Cleaning up audio contexts");

    for (const { audio, url } of Object.values(this.audioContexts)) {
      audio.pause();
      audio.src = "";
      URL.revokeObjectURL(url);
    }
    this.audioContexts = {};

    if (this.webAudioContext && this.webAudioContext.state !== "closed") {
      this.webAudioContext.close();
      this.webAudioContext = null;
    }
  }
}

export const audioService = new AudioService();

if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", () => {
    audioService.cleanup();
  });
}
