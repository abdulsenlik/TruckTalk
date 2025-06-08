import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Loader2 } from "lucide-react";
import { audioService } from "@/lib/audioService";
import { useAudioPermission } from "./AudioPermissionProvider";
import { useToast } from "@/components/ui/use-toast";

interface AudioButtonProps {
  text: string;
  identifier?: string;
  variant?:
    | "default"
    | "ghost"
    | "outline"
    | "secondary"
    | "destructive"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

export const AudioButton: React.FC<AudioButtonProps> = ({
  text,
  identifier,
  variant = "ghost",
  size = "sm",
  className,
  disabled = false,
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { requestPermission } = useAudioPermission();
  const { toast } = useToast();

  const handlePlay = async () => {
    if (!text || disabled) return;

    setIsLoading(true);
    setHasError(false);

    try {
      console.log(`[AudioButton] Requesting permission and playing: "${text}"`);
      console.log(
        `[AudioButton] Using identifier: ${identifier || `audio-${Date.now()}`}`,
      );

      // Request permission first
      const hasPermission = await requestPermission();
      if (!hasPermission) {
        console.warn("[AudioButton] Audio permission denied");
        toast({
          title: "Audio Permission Required",
          description: "Please enable audio to hear pronunciations.",
          variant: "destructive",
        });
        return;
      }

      // Play the audio with a unique identifier
      const audioId =
        identifier ||
        `audio-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      console.log(`[AudioButton] Playing with ID: ${audioId}`);

      await audioService.playText(text, audioId);
      console.log(`[AudioButton] Successfully played: "${text}"`);
    } catch (error: any) {
      console.error(`[AudioButton] Error playing audio:`, error);
      setHasError(true);

      toast({
        title: "Audio Error",
        description: error.message || "Failed to play audio. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handlePlay}
      disabled={disabled || isLoading}
      title="Play audio"
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : hasError ? (
        <VolumeX className="h-4 w-4 text-red-500" />
      ) : (
        <Volume2 className="h-4 w-4" />
      )}
      {children && <span className="ml-2">{children}</span>}
      <span className="sr-only">Play audio</span>
    </Button>
  );
};

export default AudioButton;
