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
    if (this.permissionRequested) {
      return this.webAudioContext?.state === "running" || false;
    }

    this.permissionRequested = true;
    console.log("[AudioService] Requesting audio permission...");

    // Check if AudioPermissionProvider is available
    if ((window as any).__audioPermissionProvider) {
      return await (
        window as any
      ).__audioPermissionProvider.requestPermission();
    }

    // Fallback: try to initialize directly
    return await this.initializeWebAudioContext();
  }

  private async prepareAudio(
    text: string,
    identifier: string,
  ): Promise<AudioContextData> {
    if (this.audioContexts[identifier]?.ready) {
      return this.audioContexts[identifier];
    }

    const { data, error } = await supabase.functions.invoke(
      "supabase-functions-text-to-speech",
      { body: { text } },
    );

    if (error || !data) {
      throw new Error(error?.message || "No audio data returned from TTS.");
    }

    const blob = new Blob([data], { type: "audio/mpeg" });
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);

    // Configure audio element for iframe compatibility
    audio.preload = "auto";
    audio.setAttribute("playsinline", "true");
    audio.crossOrigin = "anonymous";

    // Additional attributes for iframe compatibility
    audio.setAttribute("playsinline", "true");
    audio.setAttribute("webkit-playsinline", "true");

    // Set volume to ensure it's audible
    audio.volume = 1.0;
    audio.muted = false;

    const context: AudioContextData = {
      audio,
      url,
      ready: false,
    };

    this.audioContexts[identifier] = context;

    await new Promise<void>((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error("Timeout: Audio loading took too long."));
      }, 8000);

      audio.addEventListener(
        "canplaythrough",
        () => {
          clearTimeout(timeout);
          context.ready = true;
          console.log(`[AudioService] Audio ready for: ${identifier}`);
          resolve();
        },
        { once: true },
      );

      audio.addEventListener(
        "error",
        (e) => {
          clearTimeout(timeout);
          console.error(
            `[AudioService] Audio load error for ${identifier}:`,
            e,
          );
          reject(new Error("Failed to load audio element."));
        },
        { once: true },
      );
    });

    return context;
  }

  async playText(text: string, identifier: string = "default"): Promise<void> {
    if (!text) return;
    console.log(`[AudioService] Playing: "${text}" (${identifier})`);
    console.log(`[AudioService] In iframe: ${this.isInIframe()}`);

    try {
      // Request audio permission first
      const hasPermission = await this.requestAudioPermission();
      if (!hasPermission) {
        console.warn("[AudioService] Audio permission not granted");
        throw new Error("Audio permission required");
      }

      const context = await this.prepareAudio(text, identifier);
      const { audio } = context;

      // Reset audio position
      audio.currentTime = 0;

      // Ensure audio is not muted
      audio.muted = false;
      audio.volume = 1.0;

      console.log(`[AudioService] Audio element state:`, {
        readyState: audio.readyState,
        paused: audio.paused,
        muted: audio.muted,
        volume: audio.volume,
        src: audio.src ? "set" : "not set",
      });

      // Play with enhanced error handling
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        await playPromise;
        console.log("[AudioService] Playback started successfully");

        // Additional verification that audio is actually playing
        setTimeout(() => {
          if (!audio.paused) {
            console.log("[AudioService] Audio confirmed playing");
          } else {
            console.warn(
              "[AudioService] Audio appears to be paused despite play() success",
            );
          }
        }, 100);
      }
    } catch (err: any) {
      console.error("[AudioService] Playback error:", err);

      // Enhanced error reporting
      if (err.name === "NotAllowedError") {
        console.error(
          "[AudioService] Audio blocked by browser policy - user interaction required",
        );
        throw new Error(
          "Audio playback blocked - please enable audio permissions",
        );
      } else if (err.name === "NotSupportedError") {
        console.error("[AudioService] Audio format not supported");
        throw new Error("Audio format not supported by browser");
      } else {
        throw new Error("Failed to play audio: " + err.message);
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
