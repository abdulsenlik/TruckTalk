import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Volume2, AlertCircle } from "lucide-react";

interface AudioPermissionContextType {
  hasPermission: boolean;
  requestPermission: () => Promise<boolean>;
  isInitialized: boolean;
  hasMicrophonePermission: boolean;
  requestMicrophonePermission: () => Promise<boolean>;
}

const AudioPermissionContext = createContext<AudioPermissionContextType | null>(
  null,
);

export const useAudioPermission = () => {
  const context = useContext(AudioPermissionContext);
  if (!context) {
    throw new Error(
      "useAudioPermission must be used within AudioPermissionProvider",
    );
  }
  return context;
};

interface AudioPermissionProviderProps {
  children: ReactNode;
}

export const AudioPermissionProvider: React.FC<
  AudioPermissionProviderProps
> = ({ children }) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [showPermissionDialog, setShowPermissionDialog] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState(false);
  const [microphoneStream, setMicrophoneStream] = useState<MediaStream | null>(
    null,
  );

  // Check if we're in an iframe
  const isInIframe = () => {
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  };

  // Initialize Web Audio API context
  const initializeAudioContext = async (): Promise<boolean> => {
    try {
      console.log("[AudioPermission] Initializing audio context...");

      // Create AudioContext with user gesture
      const ctx = new (window.AudioContext ||
        (window as any).webkitAudioContext)();

      // Resume context if suspended (required for autoplay policy)
      if (ctx.state === "suspended") {
        await ctx.resume();
        console.log("[AudioPermission] Audio context resumed");
      }

      setAudioContext(ctx);
      setHasPermission(true);
      setIsInitialized(true);

      console.log("[AudioPermission] Audio context initialized successfully");
      return true;
    } catch (error) {
      console.error(
        "[AudioPermission] Failed to initialize audio context:",
        error,
      );
      return false;
    }
  };

  // Request microphone permission
  const requestMicrophonePermission = async (): Promise<boolean> => {
    console.log("[AudioPermission] Requesting microphone permission...");

    if (hasMicrophonePermission && microphoneStream) {
      return true;
    }

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error("[AudioPermission] getUserMedia not supported");
        return false;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      console.log("[AudioPermission] Microphone permission granted");
      setMicrophoneStream(stream);
      setHasMicrophonePermission(true);
      return true;
    } catch (error) {
      console.error("[AudioPermission] Microphone permission denied:", error);
      setHasMicrophonePermission(false);
      return false;
    }
  };

  // Request audio permission with user interaction
  const requestPermission = async (): Promise<boolean> => {
    console.log("[AudioPermission] Requesting audio permission...");

    if (hasPermission && isInitialized) {
      return true;
    }

    // Show permission dialog if in iframe or if permission needed
    if (isInIframe() || !hasPermission) {
      setShowPermissionDialog(true);
      return new Promise((resolve) => {
        // Store resolve function to call after user interaction
        (window as any).__audioPermissionResolve = resolve;
      });
    }

    return await initializeAudioContext();
  };

  // Handle permission grant
  const handleGrantPermission = async () => {
    console.log("[AudioPermission] User granted audio permission");
    setShowPermissionDialog(false);

    const success = await initializeAudioContext();

    // Store the provider globally for audioService to use
    (window as any).__audioPermissionProvider = {
      requestPermission: async () => {
        if (hasPermission && isInitialized) {
          return true;
        }
        return await initializeAudioContext();
      },
      requestMicrophonePermission,
      hasPermission: success,
      isInitialized: success,
      hasMicrophonePermission,
    };

    // Resolve the promise if it exists
    if ((window as any).__audioPermissionResolve) {
      (window as any).__audioPermissionResolve(success);
      delete (window as any).__audioPermissionResolve;
    }
  };

  // Handle permission denial
  const handleDenyPermission = () => {
    console.log("[AudioPermission] User denied audio permission");
    setShowPermissionDialog(false);

    // Resolve the promise if it exists
    if ((window as any).__audioPermissionResolve) {
      (window as any).__audioPermissionResolve(false);
      delete (window as any).__audioPermissionResolve;
    }
  };

  // Check for existing audio context on mount
  useEffect(() => {
    // Try to detect if audio is already allowed
    const checkExistingPermission = async () => {
      try {
        // Test if we can create an audio context without user gesture
        const testCtx = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
        if (testCtx.state !== "suspended") {
          setHasPermission(true);
          setIsInitialized(true);
          setAudioContext(testCtx);
          console.log("[AudioPermission] Audio already permitted");

          // Store the provider globally
          (window as any).__audioPermissionProvider = {
            requestPermission: async () => true,
            requestMicrophonePermission,
            hasPermission: true,
            isInitialized: true,
            hasMicrophonePermission,
          };
        } else {
          testCtx.close();
        }
      } catch (error) {
        console.log("[AudioPermission] Audio context requires user gesture");
      }
    };

    checkExistingPermission();

    // Cleanup on unmount
    return () => {
      if (audioContext) {
        audioContext.close();
      }
      if (microphoneStream) {
        microphoneStream.getTracks().forEach((track) => track.stop());
      }
      // Clean up global reference
      delete (window as any).__audioPermissionProvider;
    };
  }, []);

  const contextValue: AudioPermissionContextType = {
    hasPermission,
    requestPermission,
    isInitialized,
    hasMicrophonePermission,
    requestMicrophonePermission,
  };

  return (
    <AudioPermissionContext.Provider value={contextValue}>
      {children}

      {/* Permission Dialog */}
      <Dialog open={showPermissionDialog} onOpenChange={() => {}}>
        <DialogContent
          className="sm:max-w-md"
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Volume2 className="h-5 w-5 text-primary" />
              Enable Audio
            </DialogTitle>
            <DialogDescription className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">
                    Audio & Microphone Permission Required
                  </p>
                  <p>
                    To play pronunciation audio, practice dialogues, and record
                    your voice, we need your permission to enable audio playback
                    and microphone access.
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                This is required due to browser security policies. Click "Enable
                Audio & Microphone" to continue with all interactive features.
              </p>
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2 mt-4">
            <Button onClick={handleGrantPermission} className="w-full">
              <Volume2 className="h-4 w-4 mr-2" />
              Enable Audio & Microphone
            </Button>
            <Button
              variant="outline"
              onClick={handleDenyPermission}
              className="w-full"
            >
              Continue Without Audio
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AudioPermissionContext.Provider>
  );
};
