import React, { useState, useEffect, useRef } from "react";
import { useElevenLabsTTS } from "@/hooks/useElevenLabsTTS";
import {
  Play,
  Pause,
  Volume2,
  Mic,
  Send,
  MessageSquare,
  User,
  Loader2,
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
  const { playText, loading } = useElevenLabsTTS();
  const [currentExchangeIndex, setCurrentExchangeIndex] = useState(0);
  const [conversation, setConversation] = useState<DialogueExchange[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [recognition, setRecognition] = useState<any>(null);
  const conversationEndRef = useRef<HTMLDivElement>(null);

  // Initialize Web Speech API for speech recognition
  useEffect(() => {
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = "en-US";

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setUserInput(transcript);
        setIsRecording(false);
      };

      recognitionInstance.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsRecording(false);
      };

      recognitionInstance.onend = () => {
        setIsRecording(false);
      };

      setRecognition(recognitionInstance);
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
    try {
      console.log("[Roleplay] Playing officer line:", text);
      await playText(text, `officer-${conversation.length}`);
    } catch (error) {
      console.error("[Roleplay] Error playing officer line:", error);
    }
  };

  const handleUserInput = () => {
    if (!userInput.trim()) return;

    // Add user's response to conversation
    const userExchange: DialogueExchange = {
      speaker: "Driver",
      text: userInput,
    };
    setConversation((prev) => [...prev, userExchange]);
    setUserInput("");
    setIsProcessing(true);

    // Get the next officer line if available
    setTimeout(() => {
      if (
        currentExchangeIndex < exchanges.length &&
        exchanges[currentExchangeIndex].speaker === "Officer"
      ) {
        const nextOfficerExchange = exchanges[currentExchangeIndex];
        setConversation((prev) => [...prev, nextOfficerExchange]);
        playOfficerLine(nextOfficerExchange.text);
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
  };

  const handleSuggestionClick = (suggestion: string) => {
    setUserInput(suggestion);
    setShowSuggestions(false);
  };

  const toggleRecording = () => {
    if (!recognition) return;

    if (isRecording) {
      recognition.stop();
    } else {
      setShowSuggestions(false);
      recognition.start();
      setIsRecording(true);
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
          <div className="border rounded-lg p-4 h-80 overflow-y-auto">
            {conversation.map((exchange, index) => (
              <div
                key={index}
                className={`mb-4 flex ${exchange.speaker === "Officer" ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${exchange.speaker === "Officer" ? "bg-slate-100" : "bg-blue-50"}`}
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
                      Officer is responding...
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
                >
                  {isRecording ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Mic className="h-4 w-4" />
                  )}
                </Button>
                <Input
                  placeholder="Type your response..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleUserInput()}
                  className="flex-1"
                />
                <Button
                  variant="default"
                  size="icon"
                  onClick={handleUserInput}
                  disabled={!userInput.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {isRoleplayComplete && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <h3 className="text-lg font-medium text-green-800 mb-2">
                Roleplay Complete!
              </h3>
              <p className="text-sm text-green-700 mb-4">
                You've successfully completed this roleplay scenario.
              </p>
              <Button onClick={onComplete}>Continue</Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RoleplayDialogue;
