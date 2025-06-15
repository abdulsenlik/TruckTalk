import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Mic,
  MicOff,
  Play,
  Pause,
  Square,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Volume2,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface MicrophoneRecorderProps {
  onRecordingComplete?: (audioBlob: Blob, audioUrl: string) => void;
  onPermissionDenied?: () => void;
  maxDuration?: number; // in seconds
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline" | "ghost";
  showWaveform?: boolean;
  autoStart?: boolean;
  expectedText?: string; // For comparison/scoring
  identifier?: string;
}

type RecordingState =
  | "idle"
  | "requesting"
  | "recording"
  | "recorded"
  | "playing"
  | "error";

const MicrophoneRecorder: React.FC<MicrophoneRecorderProps> = ({
  onRecordingComplete,
  onPermissionDenied,
  maxDuration = 30,
  className = "",
  size = "md",
  variant = "default",
  showWaveform = false,
  autoStart = false,
  expectedText,
  identifier = "default",
}) => {
  const [recordingState, setRecordingState] = useState<RecordingState>("idle");
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<
    "unknown" | "granted" | "denied"
  >("unknown");
  const [audioLevel, setAudioLevel] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const { toast } = useToast();

  // Cleanup function
  const cleanup = () => {
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== "closed") {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
    }
  };

  // Check microphone permission
  const checkMicrophonePermission = async (): Promise<boolean> => {
    try {
      console.log(
        `[MicrophoneRecorder-${identifier}] Checking microphone permission...`,
      );

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error(
          `[MicrophoneRecorder-${identifier}] getUserMedia not supported`,
        );
        setPermissionStatus("denied");
        return false;
      }

      // Check permission status if available
      if (navigator.permissions) {
        try {
          const permission = await navigator.permissions.query({
            name: "microphone" as PermissionName,
          });
          console.log(
            `[MicrophoneRecorder-${identifier}] Permission status:`,
            permission.state,
          );

          if (permission.state === "denied") {
            setPermissionStatus("denied");
            return false;
          }
        } catch (permError) {
          console.warn(
            `[MicrophoneRecorder-${identifier}] Permission query failed:`,
            permError,
          );
        }
      }

      return true;
    } catch (error) {
      console.error(
        `[MicrophoneRecorder-${identifier}] Permission check failed:`,
        error,
      );
      setPermissionStatus("denied");
      return false;
    }
  };

  // Request microphone access
  const requestMicrophoneAccess = async (): Promise<MediaStream | null> => {
    try {
      console.log(
        `[MicrophoneRecorder-${identifier}] Requesting microphone access...`,
      );
      setRecordingState("requesting");

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 44100,
        },
      });

      console.log(
        `[MicrophoneRecorder-${identifier}] Microphone access granted`,
      );
      setPermissionStatus("granted");
      streamRef.current = stream;
      return stream;
    } catch (error) {
      console.error(
        `[MicrophoneRecorder-${identifier}] Microphone access denied:`,
        error,
      );
      setPermissionStatus("denied");
      setRecordingState("error");

      if (onPermissionDenied) {
        onPermissionDenied();
      }

      toast({
        title: "Microphone Access Denied",
        description:
          "Please allow microphone access to record your voice. Check your browser settings and try again.",
        variant: "destructive",
      });

      return null;
    }
  };

  // Setup audio analysis for visual feedback
  const setupAudioAnalysis = (stream: MediaStream) => {
    try {
      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(stream);

      analyser.fftSize = 256;
      source.connect(analyser);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;

      // Start audio level monitoring
      const updateAudioLevel = () => {
        if (analyserRef.current && recordingState === "recording") {
          const dataArray = new Uint8Array(
            analyserRef.current.frequencyBinCount,
          );
          analyserRef.current.getByteFrequencyData(dataArray);

          const average =
            dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
          setAudioLevel(Math.min(100, (average / 128) * 100));

          animationFrameRef.current = requestAnimationFrame(updateAudioLevel);
        }
      };

      updateAudioLevel();
    } catch (error) {
      console.warn(
        `[MicrophoneRecorder-${identifier}] Audio analysis setup failed:`,
        error,
      );
    }
  };

  // Start recording
  const startRecording = async () => {
    try {
      console.log(`[MicrophoneRecorder-${identifier}] Starting recording...`);

      const canRecord = await checkMicrophonePermission();
      if (!canRecord) {
        return;
      }

      const stream = await requestMicrophoneAccess();
      if (!stream) {
        return;
      }

      // Setup MediaRecorder
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported("audio/webm")
          ? "audio/webm"
          : "audio/mp4",
      });

      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        console.log(`[MicrophoneRecorder-${identifier}] Recording stopped`);
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);

        setAudioBlob(blob);
        setAudioUrl(url);
        setRecordingState("recorded");

        if (onRecordingComplete) {
          onRecordingComplete(blob, url);
        }

        cleanup();
      };

      mediaRecorder.onerror = (event) => {
        console.error(
          `[MicrophoneRecorder-${identifier}] Recording error:`,
          event,
        );
        setRecordingState("error");
        cleanup();

        toast({
          title: "Recording Error",
          description: "An error occurred while recording. Please try again.",
          variant: "destructive",
        });
      };

      mediaRecorderRef.current = mediaRecorder;

      // Setup audio analysis for visual feedback
      setupAudioAnalysis(stream);

      // Start recording
      mediaRecorder.start(100); // Collect data every 100ms
      setRecordingState("recording");
      setRecordingTime(0);

      // Start timer
      recordingTimerRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          const newTime = prev + 1;
          if (newTime >= maxDuration) {
            stopRecording();
          }
          return newTime;
        });
      }, 1000);

      console.log(
        `[MicrophoneRecorder-${identifier}] Recording started successfully`,
      );
    } catch (error) {
      console.error(
        `[MicrophoneRecorder-${identifier}] Failed to start recording:`,
        error,
      );
      setRecordingState("error");
      cleanup();

      toast({
        title: "Recording Failed",
        description:
          "Failed to start recording. Please check your microphone and try again.",
        variant: "destructive",
      });
    }
  };

  // Stop recording
  const stopRecording = () => {
    console.log(`[MicrophoneRecorder-${identifier}] Stopping recording...`);

    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();
    }

    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  };

  // Play recorded audio
  const playRecording = () => {
    if (audioUrl && audioRef.current) {
      setRecordingState("playing");
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  // Pause playback
  const pausePlayback = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setRecordingState("recorded");
    }
  };

  // Reset recording
  const resetRecording = () => {
    console.log(`[MicrophoneRecorder-${identifier}] Resetting recording...`);

    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }

    setAudioBlob(null);
    setAudioUrl(null);
    setRecordingTime(0);
    setAudioLevel(0);
    setRecordingState("idle");

    cleanup();
  };

  // Handle audio playback events
  useEffect(() => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onended = () => {
        setRecordingState("recorded");
      };

      audio.onerror = () => {
        console.error(
          `[MicrophoneRecorder-${identifier}] Audio playback error`,
        );
        setRecordingState("recorded");
      };
    }
  }, [audioUrl, identifier]);

  // Auto-start if requested
  useEffect(() => {
    if (autoStart && recordingState === "idle") {
      startRecording();
    }
  }, [autoStart]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanup();
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, []);

  // Get button size classes
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "h-8 w-8 p-0";
      case "lg":
        return "h-12 w-12 p-0";
      default:
        return "h-10 w-10 p-0";
    }
  };

  // Get icon size
  const getIconSize = () => {
    switch (size) {
      case "sm":
        return 16;
      case "lg":
        return 24;
      default:
        return 20;
    }
  };

  // Render recording button
  const renderRecordingButton = () => {
    const iconSize = getIconSize();
    const buttonClasses = `${getSizeClasses()} ${className}`;

    if (recordingState === "requesting") {
      return (
        <Button variant={variant} className={buttonClasses} disabled>
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />
        </Button>
      );
    }

    if (recordingState === "recording") {
      return (
        <Button
          variant="destructive"
          className={`${buttonClasses} animate-pulse`}
          onClick={stopRecording}
        >
          <Square size={iconSize} />
        </Button>
      );
    }

    if (recordingState === "recorded") {
      return (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className={getSizeClasses()}
            onClick={playRecording}
            disabled={recordingState === "playing"}
          >
            {recordingState === "playing" ? (
              <Pause size={iconSize} />
            ) : (
              <Play size={iconSize} />
            )}
          </Button>
          <Button
            variant="ghost"
            className={getSizeClasses()}
            onClick={resetRecording}
          >
            <RotateCcw size={iconSize} />
          </Button>
        </div>
      );
    }

    if (recordingState === "error" || permissionStatus === "denied") {
      return (
        <Button
          variant="outline"
          className={`${buttonClasses} border-red-300 text-red-600`}
          onClick={startRecording}
        >
          <MicOff size={iconSize} />
        </Button>
      );
    }

    return (
      <Button
        variant={variant}
        className={buttonClasses}
        onClick={startRecording}
      >
        <Mic size={iconSize} />
      </Button>
    );
  };

  // Render status indicator
  const renderStatusIndicator = () => {
    if (recordingState === "idle" || size === "sm") return null;

    return (
      <div className="flex items-center gap-2 text-sm">
        {recordingState === "requesting" && (
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            <Volume2 className="h-3 w-3 mr-1" />
            Requesting Permission
          </Badge>
        )}

        {recordingState === "recording" && (
          <Badge variant="outline" className="bg-red-50 text-red-700">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              Recording {Math.floor(recordingTime / 60)}:
              {(recordingTime % 60).toString().padStart(2, "0")}
            </div>
          </Badge>
        )}

        {recordingState === "recorded" && (
          <Badge variant="outline" className="bg-green-50 text-green-700">
            <CheckCircle className="h-3 w-3 mr-1" />
            Recorded ({Math.floor(recordingTime / 60)}:
            {(recordingTime % 60).toString().padStart(2, "0")})
          </Badge>
        )}

        {recordingState === "playing" && (
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            <Play className="h-3 w-3 mr-1" />
            Playing
          </Badge>
        )}

        {(recordingState === "error" || permissionStatus === "denied") && (
          <Badge variant="outline" className="bg-red-50 text-red-700">
            <AlertCircle className="h-3 w-3 mr-1" />
            Permission Denied
          </Badge>
        )}
      </div>
    );
  };

  // Render audio level indicator
  const renderAudioLevel = () => {
    if (!showWaveform || recordingState !== "recording") return null;

    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500">Level:</span>
        <Progress value={audioLevel} className="w-20 h-2" />
      </div>
    );
  };

  // Render permission denied fallback
  const renderPermissionDeniedFallback = () => {
    if (permissionStatus !== "denied") return null;

    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="pt-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-red-800 mb-1">
                Microphone Access Denied
              </p>
              <p className="text-red-700 mb-2">
                To record your voice, please allow microphone access in your
                browser settings.
              </p>
              <div className="text-xs text-red-600">
                <p>• Click the microphone icon in your browser's address bar</p>
                <p>• Select "Allow" for microphone access</p>
                <p>• Refresh the page and try again</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (size === "sm") {
    return (
      <div className="flex items-center gap-2">
        {renderRecordingButton()}
        {renderPermissionDeniedFallback()}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        {renderRecordingButton()}
        {renderStatusIndicator()}
      </div>

      {renderAudioLevel()}
      {renderPermissionDeniedFallback()}

      {recordingState === "recording" && maxDuration > 0 && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-gray-500">
            <span>Recording...</span>
            <span>{maxDuration - recordingTime}s remaining</span>
          </div>
          <Progress
            value={(recordingTime / maxDuration) * 100}
            className="h-1"
          />
        </div>
      )}
    </div>
  );
};

export default MicrophoneRecorder;
