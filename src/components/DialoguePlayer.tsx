import React, { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
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

  // Audio reference
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element
  useEffect(() => {
    // Create audio element
    const audio = new Audio();
    audioRef.current = audio;

    // Set audio source
    // For demo purposes, use a sample audio URL if the dialogue.audioUrl is not accessible
    const sampleAudioUrl =
      "https://assets.mixkit.co/active_storage/sfx/212/212-preview.mp3";
    audio.src = dialogue.audioUrl || sampleAudioUrl;

    // Set up event listeners
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration);
    });
    audio.addEventListener("ended", () => {
      setIsPlaying(false);
    });

    // Clean up on unmount
    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", () => {});
      audio.removeEventListener("ended", () => {});
    };
  }, [dialogue.audioUrl]);

  // Update progress function
  const updateProgress = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  // Split dialogue into lines for better display
  const englishLines = dialogue.englishText.split("\n");
  const translatedLines = dialogue.translatedText.split("\n");

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    }
    setIsPlaying(!isPlaying);
  };

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
    try {
      console.log(
        "Calling text-to-speech function for line:",
        text.substring(0, 30) + "...",
      );
      // Call the Supabase Edge Function for text-to-speech
      const { data, error } = await supabase.functions.invoke(
        "supabase-functions-text-to-speech",
        {
          body: {
            text: text,
            language: "en-US",
            speed: 0.9,
          },
        },
      );

      if (error) {
        console.error("Supabase function error:", error);
        throw error;
      }

      console.log("TTS response:", data);

      if (data?.data?.audioUrl) {
        // Play the audio from the returned URL
        const audio = new Audio(data.data.audioUrl);
        await audio.play();
        console.log("Playing audio from URL");
      } else {
        console.log("No audio URL returned, falling back to Web Speech API");
        // Fallback to Web Speech API if no audio URL is returned
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-US";
        utterance.rate = 0.9; // Slightly slower for clarity
        window.speechSynthesis.speak(utterance);
      }
    } catch (error) {
      console.error("Error playing audio:", error);
      // Fallback to Web Speech API
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const playVocabularyAudio = async (word: string) => {
    setAudioLoading((prev) => ({ ...prev, [word]: true }));

    try {
      // Call the Supabase Edge Function for text-to-speech
      const { data, error } = await supabase.functions.invoke(
        "supabase-functions-text-to-speech",
        {
          body: {
            text: word,
            language: "en-US",
            speed: 0.9,
          },
        },
      );

      if (error) {
        throw error;
      }

      if (data?.data?.audioUrl) {
        // Play the audio from the returned URL
        const audio = new Audio(data.data.audioUrl);
        audio.play();
      } else {
        // Fallback to Web Speech API if no audio URL is returned
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = "en-US";
        utterance.rate = 0.9; // Slightly slower for clarity
        window.speechSynthesis.speak(utterance);
      }
    } catch (error) {
      console.error("Error playing audio:", error);
      // Fallback to Web Speech API
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = "en-US";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    } finally {
      // Set loading to false after processing
      setTimeout(() => {
        setAudioLoading((prev) => ({ ...prev, [word]: false }));
      }, 1000);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Recording logic would go here
  };

  const selectAnswer = (questionIndex: number, answer: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: answer,
    }));
  };

  const checkAnswers = () => {
    setShowResults(true);
  };

  const resetExercise = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  const calculateScore = () => {
    let correct = 0;
    dialogue.exercises.forEach((exercise, index) => {
      if (selectedAnswers[index] === exercise.correctAnswer) {
        correct++;
      }
    });
    return {
      score: correct,
      total: dialogue.exercises.length,
      percentage: Math.round((correct / dialogue.exercises.length) * 100),
    };
  };

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
                      const newTime = Math.max(
                        0,
                        audioRef.current.currentTime - 5,
                      );
                      audioRef.current.currentTime = newTime;
                      setCurrentTime(newTime);
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
                      const newTime = Math.min(
                        audioRef.current.duration || duration,
                        audioRef.current.currentTime + 5,
                      );
                      audioRef.current.currentTime = newTime;
                      setCurrentTime(newTime);
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
                {englishLines.map((line, index) => (
                  <div key={index} className="space-y-1">
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
                      {translatedLines[index] || ""}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Vocabulary */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Key Vocabulary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {dialogue.vocabulary.map((item, index) => (
                  <div key={index} className="border rounded-md p-3">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{item.word}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => playVocabularyAudio(item.word)}
                          disabled={audioLoading[item.word]}
                        >
                          {audioLoading && audioLoading[item.word] ? (
                            <span className="h-3 w-3 animate-spin rounded-full border-2 border-primary border-t-transparent"></span>
                          ) : (
                            <Volume2 className="h-3 w-3" />
                          )}
                        </Button>
                      </div>
                      <span className="text-sm text-blue-600">
                        {item.translation}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mt-1">
                      {item.definition}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="practice" className="p-6">
          <div className="space-y-6">
            <div className="bg-slate-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-4">
                Pronunciation Practice
              </h3>
              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <p className="font-medium mb-2">Try saying:</p>
                  <p className="text-lg mb-4 flex items-center gap-2">
                    "Good afternoon, officer. Here are my documents."
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() =>
                        playLineAudio(
                          "Good afternoon, officer. Here are my documents.",
                        )
                      }
                    >
                      <Volume2 className="h-3 w-3" />
                    </Button>
                  </p>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant={isRecording ? "destructive" : "default"}
                      onClick={toggleRecording}
                      className="flex items-center space-x-2"
                    >
                      <Mic className="h-4 w-4" />
                      <span>
                        {isRecording ? "Stop Recording" : "Start Recording"}
                      </span>
                    </Button>
                    <Button variant="outline" disabled={!isRecording}>
                      Listen to Playback
                    </Button>
                  </div>
                </div>

                {/* Waveform visualization placeholder */}
                <div className="h-24 bg-slate-100 rounded-md border flex items-center justify-center">
                  <p className="text-slate-400">
                    Audio waveform visualization would appear here
                  </p>
                </div>

                <div className="bg-slate-100 rounded-md p-4">
                  <h4 className="font-medium mb-2">Feedback</h4>
                  <p className="text-sm text-slate-600">
                    Record your voice to receive pronunciation feedback
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="exercises" className="p-6">
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Comprehension Exercises</h3>

            {showResults && (
              <div className="bg-slate-50 p-4 rounded-lg mb-6">
                <h4 className="font-medium mb-2">Your Results</h4>
                <div className="flex items-center space-x-4">
                  <Progress
                    value={calculateScore().percentage}
                    className="w-1/2"
                  />
                  <span className="font-medium">
                    {calculateScore().score}/{calculateScore().total} correct (
                    {calculateScore().percentage}%)
                  </span>
                </div>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={resetExercise}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
              </div>
            )}

            <div className="space-y-6">
              {dialogue.exercises.map((exercise, qIndex) => (
                <div key={qIndex} className="border rounded-md p-4">
                  <p className="font-medium mb-3">{exercise.question}</p>
                  <div className="space-y-2">
                    {exercise.options.map((option, oIndex) => {
                      const isSelected = selectedAnswers[qIndex] === option;
                      const isCorrect =
                        showResults && option === exercise.correctAnswer;
                      const isWrong =
                        showResults &&
                        isSelected &&
                        option !== exercise.correctAnswer;

                      return (
                        <div
                          key={oIndex}
                          className={`p-3 rounded-md cursor-pointer flex items-center justify-between ${isSelected ? "bg-blue-50 border border-blue-200" : "bg-slate-50 border border-slate-200"} ${
                            isCorrect ? "bg-green-50 border-green-200" : ""
                          } ${isWrong ? "bg-red-50 border-red-200" : ""}`}
                          onClick={() =>
                            !showResults && selectAnswer(qIndex, option)
                          }
                        >
                          <span>{option}</span>
                          {isCorrect && (
                            <Check className="h-5 w-5 text-green-600" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {!showResults && (
              <Button className="w-full" onClick={checkAnswers}>
                Check Answers
              </Button>
            )}
          </div>
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
