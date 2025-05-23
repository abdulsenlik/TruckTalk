import React, { useState, useEffect } from "react";
import { trafficStopCourse, Section } from "@/data/trafficStopCourse";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  BarChart,
  Volume2,
  AlertCircle,
  BookOpen,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import DialoguePlayer from "@/components/DialoguePlayer";
import RoleplayDialogue from "@/components/RoleplayDialogue";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useElevenLabsTTS } from "@/hooks/useElevenLabsTTS";

import LanguageSelector from "@/components/LanguageSelector";

interface DialogueExchange {
  speaker: string;
  text: string;
}

interface DialogueScene {
  title: string;
  exchanges: DialogueExchange[];
}

interface VocabularyItem {
  word: string;
  translation: {
    tr: string;
    kg: string;
    ru: string;
  };
  definition: string;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface DialogueContent {
  vocabulary?: VocabularyItem[];
  dialogues?: DialogueScene[];
  culturalTips?: string[];
  quiz?: QuizQuestion[];
}

interface Dialogue {
  id: string;
  title: string;
  description: string;
  estimatedTime: number; // in minutes
  difficulty: "beginner" | "intermediate" | "advanced";
  completed: boolean;
  audioUrl?: string;
  content?: DialogueContent;
}

interface Module {
  id: string;
  title: string;
  description: string;
  totalDialogues: number;
  completedDialogues: number;
  dialogues: Dialogue[];
  imageUrl: string;
}

const ModuleDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDialogue, setSelectedDialogue] = useState<Dialogue | null>(
    null,
  );
  const [activeTab, setActiveTab] = useState("dialogues");
  const [selectedLanguage, setSelectedLanguage] = useState("tr");
  const [audioLoading, setAudioLoading] = useState<Record<string, boolean>>({});
  const { playText, loading: ttsPlayLoading } = useElevenLabsTTS();

  // Use the traffic stop course data

  // Module data based on the ID parameter
  const getModuleData = (moduleId: string): Module => {
    // Find the section that matches the ID
    const section = trafficStopCourse.find((s) => s.id === moduleId);

    if (section) {
      return {
        id: section.id,
        title: section.title,
        description: section.description,
        totalDialogues: section.dialogues.length,
        completedDialogues: 0,
        imageUrl: getImageForSection(section.id),
        dialogues: section.dialogues.map((dialogue, index) => ({
          id: `${index + 1}`,
          title: dialogue.title,
          description:
            "Practice this dialogue to learn essential phrases for traffic stops.",
          estimatedTime: 10,
          difficulty: "beginner",
          completed: false,
          content: {
            vocabulary: section.vocabulary,
            dialogues: [dialogue],
            culturalTips: section.tips,
            quiz: [],
          },
        })),
      };
    }

    // Default to the first section if ID doesn't match
    const defaultSection = trafficStopCourse[0];
    return {
      id: defaultSection.id,
      title: defaultSection.title,
      description: defaultSection.description,
      totalDialogues: defaultSection.dialogues.length,
      completedDialogues: 0,
      imageUrl:
        "https://images.unsplash.com/photo-1590496793929-36417d3117de?w=800&q=80",
      dialogues: defaultSection.dialogues.map((dialogue, index) => ({
        id: `${index + 1}`,
        title: dialogue.title,
        description:
          "Practice this dialogue to learn essential phrases for traffic stops.",
        estimatedTime: 10,
        difficulty: "beginner",
        completed: false,
        content: {
          vocabulary: defaultSection.vocabulary,
          dialogues: [dialogue],
          culturalTips: defaultSection.tips,
          quiz: [],
        },
      })),
    };
  };

  // Helper function to get appropriate image for each section
  function getImageForSection(sectionId: string): string {
    switch (sectionId) {
      case "initial-stop":
        return "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=800&q=80";
      case "document-check":
        return "https://images.unsplash.com/photo-1577368211130-4bbd0181ddf0?w=800&q=80";
      case "vehicle-inspection":
        return "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&q=80";
      case "explaining-situations":
        return "https://images.unsplash.com/photo-1589578527966-fdac0f44566c?w=800&q=80";
      case "citations-and-tickets":
        return "https://images.unsplash.com/photo-1596394723269-b2cbca4e6e33?w=800&q=80";
      case "emergency-situations":
        return "https://images.unsplash.com/photo-1635355955841-1b3e5fb67c3a?w=800&q=80";
      default:
        return "https://images.unsplash.com/photo-1590496793929-36417d3117de?w=800&q=80";
    }
  }

  const moduleData = getModuleData(id || "initial-stop");

  const completionPercentage = Math.round(
    (moduleData.completedDialogues / moduleData.totalDialogues) * 100,
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleDialogueSelect = (dialogue: Dialogue) => {
    // Navigate to the lesson page using URL-friendly dialogue title
    const lessonId = dialogue.title.toLowerCase().replace(/\s+/g, "-");
    navigate(`/lesson/${lessonId}`);
  };

  const handleBackToList = () => {
    setSelectedDialogue(null);
  };

  const playVocabularyAudio = async (word: string) => {
    try {
      console.log("[Module] Playing vocabulary audio for word:", word);
      await playText(word, `vocab-${word}`);
      console.log("[Module] Audio playback started successfully");
    } catch (err) {
      console.error("[Module] Error playing vocabulary audio:", err);
    }
  };

  const playLineAudio = async (text: string) => {
    try {
      console.log(
        "[Module] Playing line audio:",
        text.substring(0, 30) + "...",
      );
      await playText(
        text,
        `line-${text.substring(0, 10).replace(/\s+/g, "-")}`,
      );
    } catch (error) {
      console.error("[Module] Error playing line audio:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </Button>
            <Link
              to="/"
              className="text-xl font-bold hover:text-primary transition-colors"
            >
              TruckTalk
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSelector
              selectedLanguage={selectedLanguage}
              onSelectLanguage={setSelectedLanguage}
            />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {selectedDialogue ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Button variant="outline" onClick={handleBackToList}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Module
              </Button>
              <Badge variant="outline">
                {selectedDialogue.difficulty.charAt(0).toUpperCase() +
                  selectedDialogue.difficulty.slice(1)}
              </Badge>
            </div>
            {selectedDialogue?.content ? (
              <div className="space-y-8">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-bold mb-4">
                    {selectedDialogue.title}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {selectedDialogue.description}
                  </p>

                  {/* Vocabulary Section */}
                  {selectedDialogue.content.vocabulary && (
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold mb-3 flex items-center">
                        <BookOpen className="h-5 w-5 mr-2 text-primary" />
                        Vocabulary
                      </h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {selectedDialogue.content.vocabulary.map(
                            (item, index) => (
                              <Card
                                key={index}
                                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-all duration-200 hover:shadow-md"
                              >
                                <div className="flex justify-between items-center mb-2">
                                  <span className="font-medium text-lg">
                                    {item.word}
                                  </span>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      playVocabularyAudio(item.word)
                                    }
                                    disabled={
                                      ttsPlayLoading[`vocab-${item.word}`]
                                    }
                                    className="relative overflow-hidden group"
                                  >
                                    {ttsPlayLoading[`vocab-${item.word}`] ? (
                                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></span>
                                    ) : (
                                      <>
                                        <Volume2 className="h-4 w-4 group-hover:scale-110 transition-transform" />
                                        <span className="absolute inset-0 bg-primary/5 scale-0 group-hover:scale-100 rounded-full transition-transform duration-300"></span>
                                      </>
                                    )}
                                    <span className="sr-only">Play audio</span>
                                  </Button>
                                </div>
                                <p className="text-primary font-medium mb-1">
                                  {item.translation &&
                                    item.translation[
                                      selectedLanguage as keyof typeof item.translation
                                    ]}
                                </p>
                              </Card>
                            ),
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Dialogues Section */}
                  {selectedDialogue.content.dialogues && (
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold mb-3">
                        Practice Dialogues
                      </h3>
                      <Tabs
                        defaultValue={selectedDialogue.content.dialogues[0].title
                          .toLowerCase()
                          .replace(/\s+/g, "-")}
                      >
                        <TabsList className="mb-2">
                          {selectedDialogue.content.dialogues.map(
                            (dialogue, index) => (
                              <TabsTrigger
                                key={index}
                                value={dialogue.title
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")}
                              >
                                {dialogue.title}
                              </TabsTrigger>
                            ),
                          )}
                          {selectedDialogue.content.dialogues[0].title ===
                            "Being Pulled Over" && (
                            <TabsTrigger value="roleplay">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              AI Roleplay
                            </TabsTrigger>
                          )}
                        </TabsList>

                        {selectedDialogue.content.dialogues.map(
                          (dialogue, dialogueIndex) => (
                            <TabsContent
                              key={dialogueIndex}
                              value={dialogue.title
                                .toLowerCase()
                                .replace(/\s+/g, "-")}
                              className="border rounded-lg p-4 bg-white"
                            >
                              <div className="space-y-4">
                                {dialogue.exchanges.map(
                                  (exchange, exchangeIndex) => (
                                    <div
                                      key={exchangeIndex}
                                      className={`flex ${exchange.speaker === "Officer" ? "justify-start" : "justify-end"}`}
                                    >
                                      <div
                                        className={`max-w-[80%] p-3 rounded-lg ${exchange.speaker === "Officer" ? "bg-gray-100" : "bg-primary/10"}`}
                                      >
                                        <div className="flex justify-between items-center mb-1">
                                          <span className="font-medium text-sm">
                                            {exchange.speaker}
                                          </span>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-6 w-6 p-0"
                                            onClick={() =>
                                              playLineAudio(exchange.text)
                                            }
                                          >
                                            <Volume2 className="h-3 w-3" />
                                            <span className="sr-only">
                                              Play audio
                                            </span>
                                          </Button>
                                        </div>
                                        <p>{exchange.text}</p>
                                      </div>
                                    </div>
                                  ),
                                )}
                              </div>
                              <div className="mt-4 flex justify-center">
                                <Button
                                  onClick={() => {
                                    console.log(
                                      "[Module] Playing full dialogue",
                                    );
                                    // Play the entire dialogue
                                    dialogue.exchanges.forEach(
                                      (exchange, i) => {
                                        // Add delay between speakers
                                        setTimeout(async () => {
                                          console.log(
                                            `[Module] Playing exchange ${i + 1}/${dialogue.exchanges.length}: "${exchange.text.substring(0, 30)}..."`,
                                          );
                                          // Call the ElevenLabs TTS API
                                          console.log(
                                            "[Module] Sending fetch request to TTS API",
                                          );
                                          // Use Supabase Edge Function for TTS
                                          const { supabase } = await import(
                                            "@/lib/supabase"
                                          );

                                          supabase.functions
                                            .invoke(
                                              "supabase-functions-text-to-speech",
                                              {
                                                body: { text: exchange.text },
                                              },
                                            )
                                            .then(({ data, error }) => {
                                              if (error) {
                                                console.error(
                                                  `[Module] Exchange ${i + 1} error:`,
                                                  error,
                                                );
                                                throw error;
                                              }

                                              console.log(
                                                `[Module] Exchange ${i + 1} response data received`,
                                              );

                                              const audioUrl = data?.audioUrl;
                                              console.log(
                                                `[Module] Exchange ${i + 1} extracted audioUrl:`,
                                                audioUrl,
                                              );

                                              if (audioUrl) {
                                                console.log(
                                                  `[Module] Exchange ${i + 1} creating Audio object with URL:`,
                                                  audioUrl,
                                                );
                                                const audio = new Audio(
                                                  audioUrl,
                                                );
                                                console.log(
                                                  `[Module] Exchange ${i + 1} attempting to play audio...`,
                                                );
                                                audio
                                                  .play()
                                                  .then(() =>
                                                    console.log(
                                                      `[Module] Exchange ${i + 1} audio playback started successfully`,
                                                    ),
                                                  )
                                                  .catch((error) => {
                                                    console.error(
                                                      `[Module] Exchange ${i + 1} error playing audio:`,
                                                      error,
                                                    );
                                                  });
                                              } else {
                                                console.error(
                                                  `[Module] Exchange ${i + 1} no audioUrl found in response. Full response:`,
                                                  data,
                                                );
                                                throw new Error(
                                                  "No audio URL returned from TTS API",
                                                );
                                              }
                                            })
                                            .catch((error) => {
                                              console.error(
                                                `[Module] Exchange ${i + 1} error with TTS process:`,
                                                error,
                                              );
                                            });
                                        }, i * 3000); // 3 second delay between each line
                                      },
                                    );
                                  }}
                                >
                                  <Volume2 className="h-4 w-4 mr-2" />
                                  Play Full Dialogue
                                </Button>
                              </div>
                            </TabsContent>
                          ),
                        )}

                        {/* AI Roleplay Tab */}
                        {selectedDialogue.content.dialogues[0].title ===
                          "Being Pulled Over" && (
                          <TabsContent
                            value="roleplay"
                            className="border rounded-lg p-0 bg-white overflow-hidden"
                          >
                            <RoleplayDialogue
                              title="Traffic Stop Roleplay"
                              description="Practice responding to a police officer during a traffic stop. You play the driver."
                              exchanges={
                                selectedDialogue.content.dialogues[0].exchanges
                              }
                              nativeLanguage={
                                selectedLanguage === "tr"
                                  ? "turkish"
                                  : selectedLanguage === "kg"
                                    ? "kyrgyz"
                                    : "russian"
                              }
                              onComplete={() => {}}
                            />
                          </TabsContent>
                        )}
                      </Tabs>
                    </div>
                  )}

                  {/* Cultural Tips Section */}
                  {selectedDialogue.content.culturalTips && (
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold mb-3 flex items-center">
                        <AlertCircle className="h-5 w-5 mr-2 text-amber-500" />
                        Cultural Tips
                      </h3>
                      <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
                        <ul className="space-y-2">
                          {selectedDialogue.content.culturalTips.map(
                            (tip, index) => (
                              <li key={index} className="flex items-start">
                                <span className="text-amber-500 mr-2">•</span>
                                <span>{tip}</span>
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Quiz Section */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <BarChart className="h-5 w-5 mr-2 text-primary" />
                      Knowledge Check
                    </h3>
                    <div className="space-y-6">
                      {/* Step indicator */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">Progress</span>
                          <div className="flex items-center space-x-1">
                            {[1, 2, 3].map((step) => (
                              <div
                                key={step}
                                className={`w-8 h-2 rounded-full ${step === 1 ? "bg-primary" : "bg-gray-200"}`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">
                          Question 1 of 3
                        </span>
                      </div>

                      {/* Mock quiz data */}
                      {[
                        {
                          question:
                            "What documents should you provide when pulled over?",
                          options: [
                            "License only",
                            "License and registration",
                            "License, registration, and insurance",
                            "Passport and visa",
                          ],
                          correctAnswer: 2,
                        },
                        {
                          question:
                            "What should you do with your hands when pulled over?",
                          options: [
                            "Keep them on the steering wheel",
                            "Put them in your pockets",
                            "Hold your phone to record",
                            "Wave them to show you're friendly",
                          ],
                          correctAnswer: 0,
                        },
                        {
                          question: "How should you address the officer?",
                          options: [
                            "By their first name",
                            "As 'officer' or 'sir/ma'am'",
                            "Don't address them at all",
                            "As 'buddy' or 'friend'",
                          ],
                          correctAnswer: 1,
                        },
                      ].map((question, qIndex) => {
                        const [selectedAnswer, setSelectedAnswer] = useState<
                          number | null
                        >(null);
                        const [isAnswered, setIsAnswered] = useState(false);

                        return (
                          <div
                            key={qIndex}
                            className="border rounded-lg p-6 shadow-sm bg-white"
                          >
                            <p className="font-medium text-lg mb-4">
                              {qIndex + 1}. {question.question}
                            </p>
                            <div className="space-y-3">
                              {question.options.map((option, oIndex) => {
                                const isSelected = selectedAnswer === oIndex;
                                const isCorrect =
                                  isAnswered &&
                                  oIndex === question.correctAnswer;
                                const isWrong =
                                  isAnswered &&
                                  isSelected &&
                                  oIndex !== question.correctAnswer;

                                return (
                                  <div
                                    key={oIndex}
                                    onClick={() =>
                                      !isAnswered && setSelectedAnswer(oIndex)
                                    }
                                    className={`p-4 rounded-lg cursor-pointer flex items-center justify-between transition-all duration-200
                                      ${isSelected && !isAnswered ? "bg-blue-50 border border-blue-300 shadow-sm" : "bg-slate-50 border border-slate-200 hover:border-slate-300"} 
                                      ${isCorrect ? "bg-green-50 border-green-300 shadow-sm" : ""}
                                      ${isWrong ? "bg-red-50 border-red-300 shadow-sm" : ""}`}
                                  >
                                    <span className="font-medium">
                                      {option}
                                    </span>
                                    {isCorrect && (
                                      <CheckCircle className="h-5 w-5 text-green-600 animate-fadeIn" />
                                    )}
                                    {isWrong && (
                                      <X className="h-5 w-5 text-red-600 animate-fadeIn" />
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                            {!isAnswered && selectedAnswer !== null && (
                              <Button
                                onClick={() => setIsAnswered(true)}
                                className="mt-6 w-full"
                              >
                                Check Answer
                              </Button>
                            )}
                            {isAnswered && (
                              <div
                                className={`mt-6 p-4 rounded-lg ${selectedAnswer === question.correctAnswer ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}
                              >
                                <p
                                  className={`flex items-center ${selectedAnswer === question.correctAnswer ? "text-green-700" : "text-red-700"}`}
                                >
                                  {selectedAnswer === question.correctAnswer ? (
                                    <>
                                      <CheckCircle className="h-5 w-5 mr-2" />
                                      Correct! Well done.
                                    </>
                                  ) : (
                                    <>
                                      <AlertCircle className="h-5 w-5 mr-2" />
                                      Incorrect. The correct answer is:{" "}
                                      {question.options[question.correctAnswer]}
                                    </>
                                  )}
                                </p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                      <div className="mt-8 bg-slate-50 p-6 rounded-lg border border-slate-200">
                        <h4 className="font-medium mb-3 flex items-center">
                          <BarChart className="h-4 w-4 mr-2 text-primary" />
                          Module Progress
                        </h4>
                        <Progress
                          value={33}
                          className="h-3 mb-3 rounded-full"
                        />
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-gray-500">
                            1/3 modules completed
                          </p>
                          <Badge
                            variant="outline"
                            className="bg-primary/10 text-primary"
                          >
                            33% Complete
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={handleBackToList}
                    className="transition-all duration-200 hover:bg-slate-50"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Module
                  </Button>
                  <Button
                    onClick={() => setSelectedDialogue(null)}
                    className="transition-all duration-200 hover:scale-105 bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark as Complete
                  </Button>
                </div>
              </div>
            ) : selectedDialogue ? (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">
                  {selectedDialogue.title}
                </h2>
                <p className="text-gray-600 mb-6">
                  {selectedDialogue.description}
                </p>
                <DialoguePlayer
                  dialogue={{
                    id: selectedDialogue.id,
                    title: selectedDialogue.title,
                    description: selectedDialogue.description,
                    audioUrl: selectedDialogue.audioUrl || "",
                    englishText:
                      selectedDialogue.content?.dialogues?.[0]?.exchanges
                        ?.map((e) => `${e.speaker}: ${e.text}`)
                        .join("\n") || "",
                    translatedText: "",
                    vocabulary:
                      selectedDialogue.content?.vocabulary?.map((v) => ({
                        word: v.word,
                        translation:
                          v.translation[
                            selectedLanguage as keyof typeof v.translation
                          ] || "",
                        definition: v.definition || "",
                      })) || [],
                    exercises: [],
                  }}
                  nativeLanguage={
                    selectedLanguage === "tr"
                      ? "turkish"
                      : selectedLanguage === "kg"
                        ? "kyrgyz"
                        : "russian"
                  }
                  onComplete={() => setSelectedDialogue(null)}
                />
              </div>
            ) : null}
          </div>
        ) : (
          <div className="space-y-8">
            {/* Module Header */}
            <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/4">
                <img
                  src={moduleData.imageUrl}
                  alt={moduleData.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <div className="w-full md:w-3/4 space-y-4">
                <h1 className="text-2xl font-bold">{moduleData.title}</h1>
                <p className="text-gray-600">{moduleData.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Progress: {moduleData.completedDialogues} of{" "}
                      {moduleData.totalDialogues} dialogues completed
                    </span>
                    <span className="text-sm font-medium">
                      {completionPercentage}%
                    </span>
                  </div>
                  <Progress value={completionPercentage} className="h-2" />
                </div>
              </div>
            </div>

            {/* Module Content */}
            <Tabs
              defaultValue="dialogues"
              value={activeTab}
              onValueChange={setActiveTab}
            >
              <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-3">
                <TabsTrigger value="dialogues">Dialogues</TabsTrigger>
                <TabsTrigger value="vocabulary">Vocabulary</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>
              <TabsContent value="dialogues" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {moduleData.dialogues.map((dialogue) => (
                    <Card
                      key={dialogue.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${dialogue.completed ? "border-green-200 bg-green-50/30" : ""}`}
                      onClick={() => handleDialogueSelect(dialogue)}
                    >
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-medium text-lg">
                                {dialogue.title}
                              </h3>
                              {dialogue.completed && (
                                <div className="bg-green-100 p-1 rounded-full">
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                </div>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">
                              {dialogue.description}
                            </p>
                            <div className="flex items-center space-x-4 pt-2">
                              <div className="flex items-center text-xs text-gray-500">
                                <Clock className="h-3 w-3 mr-1" />
                                {dialogue.estimatedTime} min
                              </div>
                              <div
                                className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(dialogue.difficulty)}`}
                              >
                                {dialogue.difficulty}
                              </div>
                            </div>
                          </div>
                          <div className="bg-slate-100 hover:bg-slate-200 transition-colors p-2 rounded-full">
                            <ArrowLeft className="h-4 w-4 rotate-180" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="vocabulary" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-center mb-4">
                        Vocabulary List
                      </h3>
                      <ScrollArea className="h-[400px] pr-4">
                        {moduleData.dialogues[0]?.content?.vocabulary &&
                        moduleData.dialogues[0].content.vocabulary.length >
                          0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {moduleData.dialogues[0].content.vocabulary.map(
                              (item, index) => (
                                <Card
                                  key={index}
                                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-all duration-200 hover:shadow-md"
                                >
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="font-medium text-lg">
                                      {item.word}
                                    </span>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() =>
                                        playVocabularyAudio(item.word)
                                      }
                                      disabled={
                                        ttsPlayLoading[`vocab-${item.word}`]
                                      }
                                      className="relative overflow-hidden group"
                                    >
                                      {ttsPlayLoading[`vocab-${item.word}`] ? (
                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></span>
                                      ) : (
                                        <>
                                          <Volume2 className="h-4 w-4 group-hover:scale-110 transition-transform" />
                                          <span className="absolute inset-0 bg-primary/5 scale-0 group-hover:scale-100 rounded-full transition-transform duration-300"></span>
                                        </>
                                      )}
                                      <span className="sr-only">
                                        Play audio
                                      </span>
                                    </Button>
                                  </div>
                                  <p className="text-primary font-medium mb-1">
                                    {item.translation &&
                                      item.translation[
                                        selectedLanguage as keyof typeof item.translation
                                      ]}
                                  </p>
                                  {item.definition && (
                                    <p className="text-sm text-gray-600">
                                      {item.definition}
                                    </p>
                                  )}
                                </Card>
                              ),
                            )}
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <p className="text-gray-500 mb-4">
                              No vocabulary available for this module yet.
                            </p>
                          </div>
                        )}
                      </ScrollArea>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="resources" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center py-8">
                      <BarChart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium mb-2">
                        Additional Resources
                      </h3>
                      <p className="text-gray-500 mb-4">
                        Downloadable materials and practice exercises
                      </p>
                      <Button>Access Resources</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModuleDetailPage;
