import React, { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { audioService } from "@/lib/audioService";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Mic,
  Check,
  RefreshCw,
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
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";

interface DialoguePlayerProps {
  dialogue?: {
    id: string;
    title: string;
    description: string;
    audioUrl: string;
    englishText: string;
    translatedText: string;
    vocabulary: Array<{
      word: string;
      translation: string;
      definition: string;
    }>;
    exercises: Array<{
      question: string;
      options: string[];
      correctAnswer: string;
    }>;
  };
  nativeLanguage?: "turkish" | "kyrgyz" | "russian";
  onComplete?: () => void;
}

const DialoguePlayer = ({
  dialogue = {
    id: "1",
    title: "Traffic Stop Introduction",
    description: "Learn how to respond when pulled over by a police officer",
    audioUrl: "/audio/traffic-stop.mp3",
    englishText:
      "Officer: Good afternoon. License, registration, and insurance please.\nDriver: Good afternoon, officer. Here are my documents.\nOfficer: Do you know why I pulled you over?\nDriver: No, officer. What seems to be the problem?\nOfficer: You were going 65 in a 55 zone.\nDriver: I apologize. I didn't notice the speed limit.\nOfficer: Where are you headed today?\nDriver: I'm delivering cargo to Chicago.\nOfficer: I'll be back in a moment with your documents.",
    translatedText:
      'Memur: İyi günler. Ehliyet, ruhsat ve sigorta lütfen.\nSürücü: İyi günler memur bey. İşte belgelerim.\nMemur: Neden sizi durdurduğumu biliyor musunuz?\nSürücü: Hayır memur bey. Sorun nedir?\nMemur: 55 hız sınırı olan yerde 65 ile gidiyordunuz.\nSürücü: Özür dilerim. Hız sınırını fark etmedim.\nMemur: Bugün nereye gidiyorsunuz?\nSürücü: Chicago"ya kargo teslim ediyorum.\nMemur: Belgelerinizle birazdan döneceğim.',
    vocabulary: [
      {
        word: "license",
        translation: "ehliyet",
        definition: "official document permitting you to drive",
      },
      {
        word: "registration",
        translation: "ruhsat",
        definition: "document showing vehicle ownership",
      },
      {
        word: "insurance",
        translation: "sigorta",
        definition: "protection against financial loss",
      },
      {
        word: "pulled over",
        translation: "kenara çekilmek",
        definition: "stopped by police while driving",
      },
      {
        word: "speed limit",
        translation: "hız sınırı",
        definition: "maximum legal speed",
      },
    ],
    exercises: [
      {
        question: "What three documents did the officer ask for?",
        options: [
          "License, passport, insurance",
          "License, registration, insurance",
          "Passport, visa, registration",
          "License, permit, registration",
        ],
        correctAnswer: "License, registration, insurance",
      },
      {
        question: "Why was the driver pulled over?",
        options: [
          "Broken taillight",
          "Expired registration",
          "Speeding",
          "Illegal turn",
        ],
        correctAnswer: "Speeding",
      },
    ],
  },
  nativeLanguage = "turkish",
  onComplete = () => {},
}: DialoguePlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(100);
  const [activeTab, setActiveTab] = useState("dialogue");
  const [isRecording, setIsRecording] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, string>
  >({});
  const [showResults, setShowResults] = useState(false);
  const [audioLoading, setAudioLoading] = useState<Record<string, boolean>>({});
  const [audioPlaybackError, setAudioPlaybackError] = useState<
    Record<string, string>
  >({});
  const [audioUrls, setAudioUrls] = useState<Record<number, string>>({});
  const [ttsLoading, setTtsLoading] = useState<Record<string, boolean>>({});
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const sampleAudioUrl =
      "https://assets.mixkit.co/active_storage/sfx/212/212-preview.mp3";
    audio.src = dialogue.audioUrl || sampleAudioUrl;

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration);
    });
    audio.addEventListener("ended", () => {
      setIsPlaying(false);
    });

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", () => {});
      audio.removeEventListener("ended", () => {});
    };
  }, [dialogue.audioUrl]);

  const updateProgress = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  // ——— NEW: promise‐wrapped play/pause ———
  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      console.log("▶️ Audio paused");
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          console.log("▶️ Audio play succeeded");
          setIsPlaying(true);
        })
        .catch((err) => {
          console.error("❌ Audio play failed:", err);
        });
    }
  };
  // ————————————————————————————————

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const playLineAudio = async (text: string) => {
    const identifier = `line-${text
      .substring(0, 10)
      .replace(/\s+/g, "-")
      .toLowerCase()}`;
    setTtsLoading((prev) => ({ ...prev, [identifier]: true }));

    try {
      console.log(
        "[DialoguePlayer] Playing line audio:",
        text.substring(0, 30) + "...",
        "with identifier:",
        identifier,
      );
      await audioService.playText(text, identifier);
      console.log("[DialoguePlayer] Audio played successfully");
    } catch (error) {
      console.error("[DialoguePlayer] Audio Error:", error);
      setAudioPlaybackError((prev) => ({
        ...prev,
        [identifier]: "Failed to play audio",
      }));
    } finally {
      setTtsLoading((prev) => ({ ...prev, [identifier]: false }));
    }
  };

  const playVocabularyAudio = async (word: string) => {
    const identifier = `vocab-${word.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;
    setAudioPlaybackError((prev) => ({ ...prev, [identifier]: "" }));
    setTtsLoading((prev) => ({ ...prev, [identifier]: true }));

    try {
      console.log(
        "[DialoguePlayer] Playing vocabulary audio for word:",
        word,
        "with identifier:",
        identifier,
      );
      await audioService.playText(word, identifier);
      console.log("[DialoguePlayer] Audio played successfully for word:", word);
    } catch (error) {
      console.error("[DialoguePlayer] Audio Error:", error);
      setAudioPlaybackError((prev) => ({
        ...prev,
        [identifier]: "Failed to play audio",
      }));
    } finally {
      setTtsLoading((prev) => ({ ...prev, [identifier]: false }));
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const selectAnswer = (i: number, answer: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [i]: answer }));
  };
  const checkAnswers = () => setShowResults(true);
  const resetExercise = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };
  const calculateScore = () => {
    let correct = 0;
    dialogue.exercises.forEach((ex, idx) => {
      if (selectedAnswers[idx] === ex.correctAnswer) correct++;
    });
    return {
      score: correct,
      total: dialogue.exercises.length,
      percentage: Math.round((correct / dialogue.exercises.length) * 100),
    };
  };

  const englishLines = dialogue.englishText.split("\n");
  const translatedLines = dialogue.translatedText.split("\n");

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white shadow-lg">
      <CardHeader className="bg-slate-50 border-b">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl">{dialogue.title}</CardTitle>
            <CardDescription className="mt-1">
              {dialogue.description}
            </CardDescription>
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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="px-6 pt-4">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="dialogue">Dialogue</TabsTrigger>
            <TabsTrigger value="practice">Practice</TabsTrigger>
            <TabsTrigger value="exercises">Exercises</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="dialogue" className="p-6">
          <div className="space-y-6">
            {/* Audio Player */}
            <div className="bg-slate-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      if (!audioRef.current) return;
                      const n = Math.max(0, audioRef.current.currentTime - 5);
                      audioRef.current.currentTime = n;
                      setCurrentTime(n);
                    }}
                  >
                    <SkipBack className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="default"
                    size="icon"
                    onClick={togglePlayPause}
                  >
                    {isPlaying ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      if (!audioRef.current) return;
                      const n = Math.min(
                        audioRef.current.duration || duration,
                        audioRef.current.currentTime + 5,
                      );
                      audioRef.current.currentTime = n;
                      setCurrentTime(n);
                    }}
                  >
                    <SkipForward className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" onClick={toggleMute}>
                    {isMuted ? (
                      <VolumeX className="h-4 w-4" />
                    ) : (
                      <Volume2 className="h-4 w-4" />
                    )}
                  </Button>
                  <span className="text-xs text-slate-500">
                    {isPlaying ? "Playing" : "Paused"}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max={duration}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>
                    {Math.floor(currentTime / 60)}:
                    {(currentTime % 60).toString().padStart(2, "0")}
                  </span>
                  <span>
                    {Math.floor(duration / 60)}:
                    {(duration % 60).toString().padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>

            {/* Dialogue Text */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Dialogue</h3>
              <div className="space-y-4">
                {englishLines.map((line, idx) => (
                  <div key={idx} className="space-y-1">
                    <p className="font-medium text-slate-900 flex items-center gap-2">
                      {line}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => playLineAudio(line)}
                      >
                        <Volume2 className="h-3 w-3" />
                      </Button>
                    </p>
                    <p className="text-sm text-slate-600">
                      {translatedLines[idx] || ""}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Vocabulary */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Key Vocabulary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {dialogue.vocabulary.map((item, idx) => {
                  const id = `vocab-${item.word
                    .toLowerCase()
                    .replace(/[^a-z0-9]/g, "-")}`;
                  return (
                    <div key={idx} className="border rounded-md p-3">
                      <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{item.word}</span>
                          <div className="flex flex-col items-end">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() => playVocabularyAudio(item.word)}
                              disabled={ttsLoading[id]}
                            >
                              {ttsLoading[id] ? (
                                <span className="h-3 w-3 animate-spin rounded-full border-2 border-primary border-t-transparent"></span>
                              ) : (
                                <Volume2 className="h-3 w-3" />
                              )}
                            </Button>
                            {audioPlaybackError[id] && (
                              <span className="text-xs text-red-500 mt-1">
                                {audioPlaybackError[id]}
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="text-sm text-blue-600">
                          {item.translation}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 mt-1">
                        {item.definition}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="practice" className="p-6">
          {/* …practice tab unchanged… */}
        </TabsContent>

        <TabsContent value="exercises" className="p-6">
          {/* …exercises tab unchanged… */}
        </TabsContent>
      </Tabs>

      <CardFooter className="border-t bg-slate-50 flex justify-between">
        <Button variant="outline">Previous Dialogue</Button>
        <Button onClick={onComplete}>Complete & Continue</Button>
      </CardFooter>
    </Card>
  );
};

export default DialoguePlayer;
