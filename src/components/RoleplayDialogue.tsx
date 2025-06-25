import React, { useState, useEffect, useRef } from "react";
import { audioService } from "@/lib/audioService";
import { supabase } from "@/lib/supabase";
import {
  Play,
  Pause,
  Volume2,
  Mic,
  Send,
  MessageSquare,
  User,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface DialogueExchange {
  speaker: string;
  text: string;
}

interface RoleplayDialogueProps {
  title: string;
  description: string;
  exchanges: DialogueExchange[];
  nativeLanguage?: "turkish" | "kyrgyz" | "russian";
  onComplete?: () => void;
}

const RoleplayDialogue: React.FC<RoleplayDialogueProps> = ({
  title = "Traffic Stop Roleplay",
  description = "Practice responding to a police officer during a traffic stop",
  exchanges = [
    {
      speaker: "Officer",
      text: "Good afternoon. License, registration, and insurance please.",
    },
    {
      speaker: "Driver",
      text: "Good afternoon, officer. Here are my documents.",
    },
    {
      speaker: "Officer",
      text: "Do you know why I pulled you over?",
    },
    {
      speaker: "Driver",
      text: "No, officer. What seems to be the problem?",
    },
    {
      speaker: "Officer",
      text: "You were going 65 in a 55 zone.",
    },
    {
      speaker: "Driver",
      text: "I apologize. I didn't notice the speed limit.",
    },
  ],
  nativeLanguage = "turkish",
  onComplete = () => {},
}) => {
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [currentExchangeIndex, setCurrentExchangeIndex] = useState(0);
  const [conversation, setConversation] = useState<DialogueExchange[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [recognition, setRecognition] = useState<any>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null,
  );
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [apiError, setApiError] = useState<string | null>(null);
  const conversationEndRef = useRef<HTMLDivElement>(null);

  // Initialize Web Speech API for speech recognition
  useEffect(() => {
    // Define SpeechRecognition with TypeScript compatibility
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      console.log("[RoleplayDialogue] Speech recognition is supported");
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = "en-US";
      recognitionInstance.maxAlternatives = 1;

      recognitionInstance.onstart = () => {
        console.log("[RoleplayDialogue] Speech recognition started");
        setIsRecording(true);
      };

      recognitionInstance.onresult = (event) => {
        console.log(
          "[RoleplayDialogue] Speech recognition results:",
          event.results,
        );

        let finalTranscript = "";
        let interimTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        if (finalTranscript) {
          console.log("[RoleplayDialogue] Final transcript:", finalTranscript);
          setUserInput(finalTranscript.trim());
          // Don't set recording to false here - let the media recorder handle it
        } else if (interimTranscript) {
          console.log(
            "[RoleplayDialogue] Interim transcript:",
            interimTranscript,
          );
          setUserInput(interimTranscript.trim());
        }
      };

      recognitionInstance.onerror = (event) => {
        console.error(
          "[RoleplayDialogue] Speech recognition error:",
          event.error,
          "Additional info:",
          event,
        );
        setIsRecording(false);

        // Provide user-friendly error messages
        if (event.error === "not-allowed") {
          alert(
            "Microphone access denied. Please allow microphone permissions and try again.",
          );
        } else if (event.error === "no-speech") {
          console.log(
            "[RoleplayDialogue] No speech detected, please try again",
          );
        } else if (event.error === "audio-capture") {
          alert(
            "No microphone found. Please ensure a microphone is connected.",
          );
        } else if (event.error === "network") {
          alert("Network error occurred during speech recognition.");
        }
      };

      recognitionInstance.onend = () => {
        console.log("[RoleplayDialogue] Speech recognition ended");
        // Don't set recording to false here - let the media recorder handle it
      };

      setRecognition(recognitionInstance);
    } else {
      console.warn(
        "[RoleplayDialogue] Speech Recognition API not supported in this browser",
      );
    }

    return () => {
      if (recognition) {
        recognition.abort();
      }
    };
  }, []);

  // Start the roleplay with the first officer line
  useEffect(() => {
    if (exchanges.length > 0 && currentExchangeIndex === 0) {
      const firstExchange = exchanges[0];
      if (firstExchange.speaker === "Officer") {
        setConversation([firstExchange]);
        playOfficerLine(firstExchange.text);
        setCurrentExchangeIndex(1);
      }
    }
  }, [exchanges]);

  // Scroll to bottom of conversation when it updates
  useEffect(() => {
    if (conversationEndRef.current) {
      conversationEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation]);

  const playOfficerLine = async (text: string) => {
    const identifier = `officer-${conversation.length}`;
    try {
      console.log("[RoleplayDialogue] Playing officer line:", text);
      setLoading((prev) => ({ ...prev, [identifier]: true }));
      await audioService.playText(text, identifier);
      setLoading((prev) => ({ ...prev, [identifier]: false }));
      return true;
    } catch (error) {
      console.error("[RoleplayDialogue] Error playing officer line:", error);
      setLoading((prev) => ({ ...prev, [identifier]: false }));
      return false;
    }
  };

  const sendAudioToAPI = async (audioBlob: Blob, transcript: string) => {
    console.log("[RoleplayDialogue] Sending audio to API...");
    setIsProcessing(true);
    setApiError(null);

    try {
      // Call the Supabase function
      const { data, error } = await supabase.functions.invoke("roleplay-response", {
        body: {
          transcript,
          context: {
          currentExchangeIndex,
          conversationHistory: conversation,
          },
        },
      });

      if (error) {
        throw new Error(`API request failed: ${error.message}`);
      }

      console.log("[RoleplayDialogue] API response:", data);

      if (!data.replyText) {
        throw new Error("Invalid API response format");
      }

      // Add user's response to conversation
      const userExchange: DialogueExchange = {
        speaker: "Driver",
        text: transcript,
      };

      // Add officer's response to conversation
      const officerExchange: DialogueExchange = {
        speaker: "Officer",
        text: data.replyText,
      };

      setConversation((prev) => [...prev, userExchange, officerExchange]);
      setCurrentExchangeIndex(currentExchangeIndex + 1);

      // Play the officer's audio response
      // Check for both possible property names for backward compatibility
      const audioUrl = data.ttsAudioUrl || data.audioUrl;
      if (audioUrl) {
      try {
          const audio = new Audio(audioUrl);
        audio.preload = "auto";
        audio.setAttribute("playsinline", "true");
        await audio.play();
        console.log("[RoleplayDialogue] Officer audio played successfully");
      } catch (audioError) {
        console.error(
          "[RoleplayDialogue] Error playing officer audio:",
          audioError,
        );
        // Fallback to text-to-speech if direct audio fails
        try {
          await audioService.playText(
            data.replyText,
            `officer-api-${Date.now()}`,
          );
        } catch (ttsError) {
          console.error(
            "[RoleplayDialogue] TTS fallback also failed:",
              ttsError,
            );
          }
        }
      } else {
        // No audio URL provided, use local TTS
        try {
          await audioService.playText(
            data.replyText,
            `officer-api-${Date.now()}`,
          );
        } catch (ttsError) {
          console.error(
            "[RoleplayDialogue] TTS failed:",
            ttsError,
          );
        }
      }
    } catch (error) {
      console.error("[RoleplayDialogue] API request failed:", error);
      setApiError(
        error instanceof Error ? error.message : "Unknown error occurred",
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUserInput = async () => {
    if (!userInput.trim()) return;

    console.log("[RoleplayDialogue] Processing user input:", userInput);

    // If we have recorded audio, send it to the API
    if (audioChunks.length > 0) {
      const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
      await sendAudioToAPI(audioBlob, userInput);
      setAudioChunks([]); // Clear audio chunks after sending
    } else {
      // Fallback to original behavior for text-only input
      const userExchange: DialogueExchange = {
        speaker: "Driver",
        text: userInput,
      };
      setConversation((prev) => [...prev, userExchange]);
      setIsProcessing(true);

      // Get the next officer line if available
      setTimeout(async () => {
        if (
          currentExchangeIndex < exchanges.length &&
          exchanges[currentExchangeIndex].speaker === "Officer"
        ) {
          const nextOfficerExchange = exchanges[currentExchangeIndex];
          setConversation((prev) => [...prev, nextOfficerExchange]);

          try {
            await playOfficerLine(nextOfficerExchange.text);
          } catch (error) {
            console.error(
              "[RoleplayDialogue] Error playing officer line:",
              error,
            );
          }

          setCurrentExchangeIndex(currentExchangeIndex + 1);
        } else if (currentExchangeIndex >= exchanges.length - 1) {
          // End of roleplay
          setIsProcessing(false);
        } else {
          // Skip driver lines in the script since user is providing those
          setCurrentExchangeIndex(currentExchangeIndex + 2); // Skip to next officer line
          setIsProcessing(false);
        }
      }, 1000);
    }

    setUserInput("");
  };

  const handleSuggestionClick = (suggestion: string) => {
    setUserInput(suggestion);
    setShowSuggestions(false);
  };

  const toggleRecording = async () => {
    if (!recognition) {
      console.warn("[RoleplayDialogue] Speech recognition not available");
      alert(
        "Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.",
      );
      return;
    }

    if (isRecording) {
      console.log("[RoleplayDialogue] Stopping recording");
      try {
        recognition.stop();
        if (mediaRecorder && mediaRecorder.state === "recording") {
          mediaRecorder.stop();
        }
      } catch (error) {
        console.error("[RoleplayDialogue] Error stopping recording:", error);
      }
      setIsRecording(false);
    } else {
      console.log("[RoleplayDialogue] Starting recording");
      setShowSuggestions(false);

      try {
        // Check if permissions API is available
        if ("permissions" in navigator) {
          try {
            const permissionStatus = await navigator.permissions.query({
              name: "microphone" as PermissionName,
            });
            console.log(
              "[RoleplayDialogue] Microphone permission status:",
              permissionStatus.state,
            );

            if (permissionStatus.state === "denied") {
              alert(
                "Microphone access is denied. Please enable microphone permissions in your browser settings and refresh the page.",
              );
              return;
            }
          } catch (permError) {
            console.log(
              "[RoleplayDialogue] Permission query not supported:",
              permError,
            );
          }
        }

        // Request microphone access and set up media recorder
        let stream: MediaStream | null = null;
        try {
          stream = await navigator.mediaDevices.getUserMedia({
            audio: {
              echoCancellation: true,
              noiseSuppression: true,
              autoGainControl: true,
              sampleRate: 16000,
            },
          });
          console.log("[RoleplayDialogue] Microphone access granted");

          // Set up MediaRecorder for audio capture
          const recorder = new MediaRecorder(stream, {
            mimeType: "audio/webm;codecs=opus",
          });

          const chunks: Blob[] = [];

          recorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
              chunks.push(event.data);
              console.log(
                "[RoleplayDialogue] Audio chunk recorded:",
                event.data.size,
                "bytes",
              );
            }
          };

          recorder.onstop = () => {
            console.log(
              "[RoleplayDialogue] MediaRecorder stopped, total chunks:",
              chunks.length,
            );
            setAudioChunks(chunks);
            // Stop the stream after recording
            stream?.getTracks().forEach((track) => {
              track.stop();
              console.log(
                "[RoleplayDialogue] Audio track stopped:",
                track.label,
              );
            });
          };

          setMediaRecorder(recorder);

          // Start recording
          recorder.start(1000); // Collect data every second
          console.log("[RoleplayDialogue] MediaRecorder started");
        } catch (mediaError) {
          console.error("[RoleplayDialogue] Media access error:", mediaError);

          if (mediaError instanceof Error) {
            if (mediaError.name === "NotAllowedError") {
              alert(
                "Microphone access denied. Please allow microphone access in your browser and try again.",
              );
            } else if (mediaError.name === "NotFoundError") {
              alert(
                "No microphone found. Please ensure a microphone is connected and try again.",
              );
            } else if (mediaError.name === "NotReadableError") {
              alert(
                "Microphone is already in use by another application. Please close other applications using the microphone and try again.",
              );
            } else {
              alert(`Microphone error: ${mediaError.message}`);
            }
          }
          return;
        }

        // Start speech recognition after successful media access
        try {
          // Ensure recognition is not already running
          if (recognition.state && recognition.state !== "inactive") {
            console.log(
              "[RoleplayDialogue] Recognition already active, stopping first",
            );
            recognition.stop();
            await new Promise((resolve) => setTimeout(resolve, 100));
          }

          recognition.start();
          console.log(
            "[RoleplayDialogue] Speech recognition started successfully",
          );
        } catch (recognitionError) {
          console.error(
            "[RoleplayDialogue] Error starting recognition:",
            recognitionError,
          );
          setIsRecording(false);

          if (
            recognitionError instanceof Error &&
            recognitionError.message.includes("already started")
          ) {
            console.log(
              "[RoleplayDialogue] Recognition already running, attempting restart",
            );
            try {
              recognition.stop();
              setTimeout(() => {
                try {
                  recognition.start();
                  console.log(
                    "[RoleplayDialogue] Recognition restarted successfully",
                  );
                } catch (retryError) {
                  console.error("[RoleplayDialogue] Retry failed:", retryError);
                  alert(
                    "Failed to start speech recognition. Please try again.",
                  );
                }
              }, 200);
            } catch (stopError) {
              console.error(
                "[RoleplayDialogue] Error stopping recognition:",
                stopError,
              );
            }
          } else {
            alert(
              `Speech recognition error: ${recognitionError instanceof Error ? recognitionError.message : "Unknown error"}`,
            );
          }
        }
      } catch (error) {
        console.error("[RoleplayDialogue] Unexpected error:", error);
        setIsRecording(false);
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  // Get response suggestions based on current exchange
  const getResponseSuggestions = (): string[] => {
    if (currentExchangeIndex >= exchanges.length) return [];

    // Find the next driver response in the script
    for (let i = currentExchangeIndex; i < exchanges.length; i++) {
      if (exchanges[i].speaker === "Driver") {
        return [exchanges[i].text];
      }
    }

    // Default suggestions if no driver response is found
    const currentOfficerText =
      conversation[conversation.length - 1]?.text || "";

    if (currentOfficerText.includes("License, registration, and insurance")) {
      return [
        "Good afternoon, officer. Here are my documents.",
        "Here you go, officer.",
        "One moment, let me get those for you.",
      ];
    } else if (currentOfficerText.includes("why I pulled you over")) {
      return [
        "No, officer. What seems to be the problem?",
        "I'm not sure, officer.",
        "Was I speeding?",
      ];
    } else if (
      currentOfficerText.includes("55 zone") ||
      currentOfficerText.includes("speeding")
    ) {
      return [
        "I apologize. I didn't notice the speed limit.",
        "I'm sorry, officer. I'll be more careful.",
        "I didn't realize I was going that fast.",
      ];
    }

    return ["Yes, officer.", "I understand, officer.", "Thank you, officer."];
  };

  const isRoleplayComplete = currentExchangeIndex >= exchanges.length;

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white shadow-lg">
      <CardHeader className="bg-slate-50 border-b">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl">{title}</CardTitle>
            <CardDescription className="mt-1">{description}</CardDescription>
          </div>
          <Badge variant="outline" className="text-sm">
            {nativeLanguage === "turkish"
              ? "Türkçe"
              : nativeLanguage === "kyrgyz"
                ? "Кыргызча"
                : "Русский"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="bg-slate-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Interactive Roleplay</h3>
            <p className="text-sm text-slate-600 mb-4">
              Practice responding to a police officer during a traffic stop. The
              AI will play the role of the officer, and you'll respond as the
              driver.
            </p>
          </div>

          {/* Conversation Area */}
          <div className="border rounded-lg p-4 h-80 overflow-y-auto bg-white shadow-inner">
            {conversation.map((exchange, index) => (
              <div
                key={index}
                className={`mb-4 flex ${exchange.speaker === "Officer" ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-lg shadow-sm transition-all ${exchange.speaker === "Officer" ? "bg-slate-100" : "bg-blue-50"}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {exchange.speaker === "Officer" ? (
                      <>
                        <Badge variant="outline" className="bg-slate-200">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          Officer
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => playOfficerLine(exchange.text)}
                          disabled={loading[`officer-${index}`]}
                        >
                          {loading[`officer-${index}`] ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : (
                            <Volume2 className="h-3 w-3" />
                          )}
                        </Button>
                      </>
                    ) : (
                      <Badge variant="outline" className="bg-blue-100">
                        <User className="h-3 w-3 mr-1" />
                        You
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm">{exchange.text}</p>
                </div>
              </div>
            ))}
            {isProcessing && (
              <div className="flex justify-start mb-4">
                <div className="bg-slate-100 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-slate-500" />
                    <span className="text-sm text-slate-500">
                      {audioChunks.length > 0
                        ? "Processing your response..."
                        : "Officer is responding..."}
                    </span>
                  </div>
                </div>
              </div>
            )}
            {apiError && (
              <div className="flex justify-center mb-4">
                <div className="bg-red-50 border border-red-200 p-3 rounded-lg max-w-md">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-red-700">
                      ⚠️ Error: {apiError}
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div ref={conversationEndRef} />
          </div>

          {/* User Input Area */}
          {!isRoleplayComplete && (
            <div className="space-y-4">
              {showSuggestions && (
                <div className="flex flex-wrap gap-2">
                  {getResponseSuggestions().map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-2">
                <Button
                  variant={isRecording ? "destructive" : "outline"}
                  size="icon"
                  onClick={toggleRecording}
                  disabled={!recognition}
                  title={
                    recognition
                      ? "Click to use microphone"
                      : "Speech recognition not supported in this browser"
                  }
                  className="relative transition-all duration-200 hover:bg-slate-100"
                >
                  {isRecording ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    </>
                  ) : (
                    <Mic className="h-4 w-4" />
                  )}
                </Button>
                <Input
                  placeholder="Type your response..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleUserInput()}
                  className="flex-1 focus-visible:ring-primary/20 focus-visible:ring-offset-1"
                />
                <Button
                  variant="default"
                  size="icon"
                  onClick={handleUserInput}
                  disabled={!userInput.trim()}
                  className="transition-all duration-200 hover:scale-105"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {isRoleplayComplete && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center shadow-sm">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-medium text-green-800 mb-2">
                Roleplay Complete!
              </h3>
              <p className="text-sm text-green-700 mb-6">
                You've successfully completed this roleplay scenario.
              </p>
              <Button
                onClick={onComplete}
                className="px-8 py-2 transition-all duration-200 hover:scale-105"
              >
                Continue to Next Lesson
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RoleplayDialogue;
