import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  trafficStopCourse,
  Section,
  DialogueExchange,
} from "@/data/trafficStopCourse";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  Volume2,
  AlertCircle,
  BookOpen,
  MessageSquare,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import RoleplayDialogue from "@/components/RoleplayDialogue";
import LanguageSelector from "@/components/LanguageSelector";
import { useElevenLabsTTS } from "@/hooks/useElevenLabsTTS";

interface VocabularyItem {
  word: string;
  translation: {
    tr: string;
    kg: string;
    ru: string;
  };
  definition: string;
}

interface DialogueScene {
  title: string;
  exchanges: DialogueExchange[];
}

interface LessonData {
  id: string;
  title: string;
  description: string;
  moduleId: string;
  moduleTitle: string;
  vocabulary: VocabularyItem[];
  dialogues: DialogueScene[];
  tips: string[];
  estimatedTime: number;
  difficulty: "beginner" | "intermediate" | "advanced";
}

const LessonDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState("tr");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { playText, loading: ttsPlayLoading } = useElevenLabsTTS();

  // Parse lesson ID to get module and dialogue info
  const getLessonData = (lessonId: string): LessonData | null => {
    // First, try to find by URL-friendly dialogue title across all modules
    for (const section of trafficStopCourse) {
      for (
        let dialogueIndex = 0;
        dialogueIndex < section.dialogues.length;
        dialogueIndex++
      ) {
        const dialogue = section.dialogues[dialogueIndex];
        const urlFriendlyTitle = dialogue.title
          .toLowerCase()
          .replace(/\s+/g, "-");

        if (lessonId === urlFriendlyTitle) {
          return createLessonData(
            section,
            dialogue,
            dialogueIndex,
            `${section.id}-${dialogueIndex}`,
          );
        }
      }
    }

    // Fallback: try the standard format "moduleId-dialogueIndex"
    const parts = lessonId.split("-");
    if (parts.length < 2) return null;

    const lastPart = parts[parts.length - 1];
    const dialogueIndex = !isNaN(parseInt(lastPart)) ? parseInt(lastPart) : 0;
    const moduleId = !isNaN(parseInt(lastPart))
      ? parts.slice(0, -1).join("-")
      : lessonId;

    const section = trafficStopCourse.find((s) => s.id === moduleId);
    if (!section || !section.dialogues[dialogueIndex]) return null;

    const dialogue = section.dialogues[dialogueIndex];
    return createLessonData(section, dialogue, dialogueIndex, lessonId);
  };

  // Helper function to create lesson data object
  const createLessonData = (
    section: Section,
    dialogue: any,
    dialogueIndex: number,
    lessonId: string,
  ): LessonData => {
    return {
      id: lessonId,
      title: dialogue.title,
      description: `Practice this dialogue to learn essential phrases for ${section.title.toLowerCase()}.`,
      moduleId: section.id,
      moduleTitle: section.title,
      vocabulary: section.vocabulary,
      dialogues: [dialogue],
      tips: section.tips,
      estimatedTime: 10,
      difficulty: "beginner",
    };
  };

  const lessonData = getLessonData(id || "");

  if (!lessonData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Lesson Not Found</h1>
          <p className="text-gray-600 mb-6">
            The lesson you're looking for doesn't exist.
          </p>
          <Button onClick={() => navigate("/modules")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Modules
          </Button>
        </div>
      </div>
    );
  }

  const playVocabularyAudio = async (word: string) => {
    try {
      await playText(word, `vocab-${word}`);
    } catch (err) {
      console.error("Error playing vocabulary audio:", err);
    }
  };

  const playLineAudio = async (text: string) => {
    try {
      await playText(
        text,
        `line-${text.substring(0, 10).replace(/\s+/g, "-")}`,
      );
    } catch (error) {
      console.error("Error playing line audio:", error);
    }
  };

  const mockQuizQuestions = [
    {
      question: "What documents should you provide when pulled over?",
      options: [
        "License only",
        "License and registration",
        "License, registration, and insurance",
        "Passport and visa",
      ],
      correctAnswer: 2,
    },
    {
      question: "What should you do with your hands when pulled over?",
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
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(`/module/${lessonData.moduleId}`)}
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Module
            </Button>
            <div>
              <Link
                to="/"
                className="text-xl font-bold hover:text-primary transition-colors"
              >
                TruckTalk
              </Link>
              <p className="text-sm text-gray-500">{lessonData.moduleTitle}</p>
            </div>
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
        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">{lessonData.title}</h2>
                <p className="text-gray-600">{lessonData.description}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  {lessonData.estimatedTime} min
                </div>
                <Badge variant="outline">
                  {lessonData.difficulty.charAt(0).toUpperCase() +
                    lessonData.difficulty.slice(1)}
                </Badge>
              </div>
            </div>

            {/* Vocabulary Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-primary" />
                Vocabulary
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {lessonData.vocabulary.map((item, index) => (
                    <Card
                      key={index}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-all duration-200 hover:shadow-md"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-lg">{item.word}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => playVocabularyAudio(item.word)}
                          disabled={ttsPlayLoading[`vocab-${item.word}`]}
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
                      <p className="text-sm text-gray-600">{item.definition}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Dialogues Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Practice Dialogues</h3>
              <Tabs defaultValue="dialogue" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="dialogue">Dialogue Practice</TabsTrigger>
                  <TabsTrigger value="roleplay">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    AI Roleplay
                  </TabsTrigger>
                </TabsList>

                <TabsContent
                  value="dialogue"
                  className="border rounded-lg p-4 bg-white"
                >
                  <div className="space-y-4">
                    {lessonData.dialogues[0].exchanges.map(
                      (exchange, index) => (
                        <div
                          key={index}
                          className={`flex ${
                            exchange.speaker === "Officer"
                              ? "justify-start"
                              : "justify-end"
                          }`}
                        >
                          <div
                            className={`max-w-[80%] p-3 rounded-lg ${
                              exchange.speaker === "Officer"
                                ? "bg-gray-100"
                                : "bg-primary/10"
                            }`}
                          >
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-medium text-sm">
                                {exchange.speaker}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                                onClick={() => playLineAudio(exchange.text)}
                              >
                                <Volume2 className="h-3 w-3" />
                                <span className="sr-only">Play audio</span>
                              </Button>
                            </div>
                            <p>{exchange.text}</p>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </TabsContent>

                <TabsContent
                  value="roleplay"
                  className="border rounded-lg p-0 bg-white overflow-hidden"
                >
                  <RoleplayDialogue
                    title={`${lessonData.title} Roleplay`}
                    description="Practice responding in this scenario. You play the driver."
                    exchanges={lessonData.dialogues[0].exchanges}
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
              </Tabs>
            </div>

            {/* Cultural Tips Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 text-amber-500" />
                Cultural Tips
              </h3>
              <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
                <ul className="space-y-2">
                  {lessonData.tips.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-amber-500 mr-2">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Quiz Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Knowledge Check</h3>
              <div className="space-y-6">
                {mockQuizQuestions.map((question, qIndex) => {
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
                            isAnswered && oIndex === question.correctAnswer;
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
                              <span className="font-medium">{option}</span>
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
                          className={`mt-6 p-4 rounded-lg ${
                            selectedAnswer === question.correctAnswer
                              ? "bg-green-50 border border-green-200"
                              : "bg-red-50 border border-red-200"
                          }`}
                        >
                          <p
                            className={`flex items-center ${
                              selectedAnswer === question.correctAnswer
                                ? "text-green-700"
                                : "text-red-700"
                            }`}
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
              </div>
            </div>

            {/* Progress Section */}
            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
              <h4 className="font-medium mb-3">Lesson Progress</h4>
              <Progress value={100} className="h-3 mb-3 rounded-full" />
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">Lesson completed</p>
                <Badge
                  variant="outline"
                  className="bg-green-100 text-green-700"
                >
                  Complete
                </Badge>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => navigate(`/module/${lessonData.moduleId}`)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Module
            </Button>
            <Button
              onClick={() => navigate(`/module/${lessonData.moduleId}`)}
              className="bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark as Complete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonDetailPage;
