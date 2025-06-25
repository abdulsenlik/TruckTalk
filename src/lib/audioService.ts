import { supabase } from "@/lib/supabase";

interface AudioContextData {
  audio: HTMLAudioElement;
  url: string;
  ready: boolean;
}

// Use environment variables instead of hardcoded values
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://pvstwthufbertinmojuk.supabase.co";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2c3R3dGh1ZmJlcnRpbm1vanVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwOTI2NDQsImV4cCI6MjA2MjY2ODY0NH0.PG7BJeWuYe-piU_JatbBfauK-I3d9sVh-2fJypAZHS8";

class AudioService {
  private audioContexts: Record<string, AudioContextData> = {};
  private webAudioContext: AudioContext | null = null;
  private permissionRequested = false;
  private pendingRequests: Set<string> = new Set(); // Step 3: Request deduplication

  // Check if we're in an iframe
  private isInIframe(): boolean {
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  }

  // Step 1: Fix auth validation
  private validateAuth(): boolean {
    const key = SUPABASE_ANON_KEY;
    if (!key || key.length === 0 || key === 'undefined' || key === 'null') {
      console.error('[AudioService] Invalid auth key - length:', key?.length || 0);
      return false;
    }
    if (key.length < 100) { // JWT tokens are typically much longer
      console.error('[AudioService] Auth key appears to be truncated:', key.substring(0, 20) + '...');
      return false;
    }
    return true;
  }

  // Step 2: Enhanced cleanup for failed contexts
  private cleanupFailedContext(identifier: string): void {
    console.log(`[AudioService] Cleaning up failed context: ${identifier}`);
    if (this.audioContexts[identifier]) {
      const context = this.audioContexts[identifier];
      try {
        context.audio.pause();
        context.audio.src = '';
        context.audio.load(); // Force reset
        URL.revokeObjectURL(context.url);
      } catch (cleanupError) {
        console.warn(`[AudioService] Error during cleanup:`, cleanupError);
      }
      delete this.audioContexts[identifier];
    }
    // Also remove from pending requests
    this.pendingRequests.delete(identifier);
  }

  // Step 4: Create fresh audio element
  private createFreshAudioElement(): HTMLAudioElement {
    const audio = new Audio();
    audio.preload = "auto";
    audio.setAttribute("playsinline", "true");
    audio.crossOrigin = "anonymous";
    audio.volume = 1.0;
    audio.muted = false;
    audio.controls = false;
    audio.autoplay = false;
    return audio;
  }

  // Helper method for retrying requests with exponential backoff
  private async fetchWithRetry(
    url: string,
    options: RequestInit,
    maxRetries: number = 3
  ): Promise<Response> {
    let lastError: Error;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        console.log(`[AudioService] Fetch attempt ${attempt + 1}/${maxRetries + 1} for ${url}`);
        
        const response = await fetch(url, options);
        
        // If we get a 503 (Service Unavailable), retry
        if (response.status === 503 && attempt < maxRetries) {
          const waitTime = Math.min(1000 * Math.pow(2, attempt), 5000);
          console.warn(`[AudioService] Got 503 on attempt ${attempt + 1}, retrying in ${waitTime}ms...`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
          continue;
        }
        
        // If we get a 504 (Gateway Timeout), also retry
        if (response.status === 504 && attempt < maxRetries) {
          const waitTime = Math.min(2000 * Math.pow(2, attempt), 8000);
          console.warn(`[AudioService] Got 504 on attempt ${attempt + 1}, retrying in ${waitTime}ms...`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
          continue;
        }
        
        return response;
      } catch (error: any) {
        lastError = error;
        console.warn(`[AudioService] Fetch attempt ${attempt + 1} failed:`, error.message);
        
        if (attempt < maxRetries) {
          const waitTime = Math.min(1000 * Math.pow(2, attempt), 5000);
          console.log(`[AudioService] Retrying in ${waitTime}ms...`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
          continue;
        }
      }
    }
    
    throw lastError!;
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

  // Enhanced prepareAudio method with all fixes
  private async prepareAudio(
    text: string,
    identifier: string,
  ): Promise<AudioContextData> {
    // Step 3: Check for pending requests (deduplication)
    if (this.pendingRequests.has(identifier)) {
      console.log(`[AudioService] Request already pending for: ${identifier}, waiting...`);
      // Wait for the pending request to complete
      while (this.pendingRequests.has(identifier)) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      // If context is now ready, return it
      if (this.audioContexts[identifier]?.ready) {
        return this.audioContexts[identifier];
      }
    }

    // If we have a ready context, return it
    if (this.audioContexts[identifier]?.ready) {
      console.log(`[AudioService] Using cached audio for: ${identifier}`);
      return this.audioContexts[identifier];
    }

    // Step 1: Validate auth before making request
    if (!this.validateAuth()) {
      throw new Error("Invalid authentication key - please check configuration");
    }

    console.log(`[AudioService] Preparing audio for: "${text}" (${identifier})`);
    
    // Mark as pending
    this.pendingRequests.add(identifier);

    try {
      // Clean up any existing failed context
      this.cleanupFailedContext(identifier);

      // ─── 1. Fetch binary audio from Edge Function with retry logic ───
      let res: Response;
      
      // Try with Authorization header first
      try {
        res = await this.fetchWithRetry(
          `${SUPABASE_URL}/functions/v1/text-to-speech`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
            },
            body: JSON.stringify({ text }),
          }
        );
      } catch (authError: any) {
        // If we get a 401, try without Authorization header (for --no-verify-jwt functions)
        if (authError.message?.includes("401") || authError.message?.includes("Unauthorized")) {
          console.log(`[AudioService] Retrying without Authorization header...`);
          res = await this.fetchWithRetry(
            `${SUPABASE_URL}/functions/v1/text-to-speech`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ text }),
            }
          );
        } else {
          throw authError;
        }
      }

      if (!res.ok) {
        const errMsg = await res.text();
        console.error(
          `[AudioService] Edge Function error ${res.status}:`,
          errMsg,
        );
        throw new Error(`Edge Function returned ${res.status}: ${errMsg}`);
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
      
      // Step 4: Create fresh audio element
      const audio = this.createFreshAudioElement();
      audio.src = url;

      // ─── 3. Wait for canplaythrough with timeout ───
      const context: AudioContextData = { audio, url, ready: false };
      this.audioContexts[identifier] = context;

      await new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => {
          this.cleanupFailedContext(identifier);
          reject(new Error("Timeout: Audio loading took too long."));
        }, 15_000);

        const onCanPlay = () => {
          clearTimeout(timeout);
          context.ready = true;
          console.log(`[AudioService] Audio ready for: ${identifier}`, {
            duration: audio.duration,
            readyState: audio.readyState,
          });
          resolve();
        };

        const onError = (e: Event) => {
          clearTimeout(timeout);
          console.error(`[AudioService] Audio element error for ${identifier}:`, e);
          this.cleanupFailedContext(identifier);
          reject(new Error(`Error loading audio element: ${audio.error?.message || 'Unknown error'}`));
        };

        audio.addEventListener("canplaythrough", onCanPlay, { once: true });
        audio.addEventListener("error", onError, { once: true });

        audio.load();
      });

      return context;
    } catch (error: any) {
      console.error(`[AudioService] Failed to prepare audio for "${text}":`, error);
      this.cleanupFailedContext(identifier);
      throw error;
    } finally {
      // Always remove from pending requests
      this.pendingRequests.delete(identifier);
    }
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
    
    console.log(`[AudioService] 🎵 Playing: "${text}" (${normalizedIdentifier})`);
    console.log(`[AudioService] 🖼️ In iframe: ${this.isInIframe()}`);
    console.log(`[AudioService] 🔊 Audio context state: ${this.webAudioContext?.state || "not initialized"}`);

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
          const currentAudio = this.audioContexts[normalizedIdentifier].audio;
          currentAudio.pause();
          currentAudio.currentTime = 0;
        } catch (stopError) {
          console.warn("[AudioService] Error stopping previous audio:", stopError);
        }
      }

      // Reset audio position
      try {
        audio.currentTime = 0;
      } catch (resetError) {
        console.warn("[AudioService] Could not reset audio position:", resetError);
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
        console.log("[AudioService] ✅ Playback started successfully");

        // Additional verification that audio is actually playing
        setTimeout(() => {
          if (!audio.paused && audio.currentTime > 0) {
            console.log("[AudioService] ✅ Audio confirmed playing at time:", audio.currentTime);
          } else {
            console.warn("[AudioService] ⚠️ Audio appears to be paused despite play() success", 
              { paused: audio.paused, currentTime: audio.currentTime });
          }
        }, 200);
      }
    } catch (err: any) {
      console.error("[AudioService] Playback error:", err);

      // Clean up failed context to allow retry
      this.cleanupFailedContext(normalizedIdentifier);

      // Enhanced error reporting with user-friendly messages
      if (err.name === "NotAllowedError") {
        console.error("[AudioService] Audio blocked by browser policy - user interaction required");
        throw new Error("Audio playback blocked - please click to enable audio permissions");
      } else if (err.name === "NotSupportedError") {
        console.error("[AudioService] Audio format not supported");
        throw new Error("Audio format not supported by browser");
      } else if (err.name === "AbortError") {
        console.error("[AudioService] Audio playback was aborted");
        throw new Error("Audio playback was interrupted");
      } else if (err.message?.includes("503") || err.message?.includes("Service Unavailable")) {
        throw new Error("Audio service temporarily unavailable - please try again");
      } else if (err.message?.includes("504") || err.message?.includes("Gateway Timeout")) {
        throw new Error("Audio service timed out - please try again");
      } else if (err.message?.includes("401") || err.message?.includes("Key length is zero")) {
        throw new Error("Authentication error - please refresh the page and try again");
      } else {
        throw new Error("Failed to play audio: " + (err.message || "Unknown error"));
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

  // Enhanced cleanup method
  cleanup(): void {
    console.log("[AudioService] Cleaning up audio contexts");

    // Clear all pending requests
    this.pendingRequests.clear();

    // Clean up all audio contexts
    for (const [identifier, context] of Object.entries(this.audioContexts)) {
      try {
        context.audio.pause();
        context.audio.src = "";
        URL.revokeObjectURL(context.url);
      } catch (error) {
        console.warn(`[AudioService] Error cleaning up context ${identifier}:`, error);
      }
    }
    this.audioContexts = {};

    if (this.webAudioContext && this.webAudioContext.state !== "closed") {
      this.webAudioContext.close();
      this.webAudioContext = null;
    }
  }

  // Method to manually clear a specific audio context (useful for debugging)
  clearAudioContext(identifier: string): void {
    const normalizedIdentifier = identifier.toLowerCase().replace(/[^a-z0-9-]/g, "-");
    console.log(`[AudioService] Manually clearing context: ${normalizedIdentifier}`);
    this.cleanupFailedContext(normalizedIdentifier);
  }
}

export const audioService = new AudioService();

if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", () => {
    audioService.cleanup();
  });
}
