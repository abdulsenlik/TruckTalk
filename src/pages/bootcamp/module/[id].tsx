import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Clock, BookOpen, CheckCircle, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import LanguageSelector, { useLanguage } from "@/components/LanguageSelector";
import { useSubscription } from "@/contexts/SubscriptionContext";
import DialoguePlayer from "@/components/DialoguePlayer";
import RoleplayDialogue from "@/components/RoleplayDialogue";
import AudioButton from "@/components/AudioButton";
import MicrophoneRecorder from "@/components/MicrophoneRecorder";
import {
  BootcampModule,
  ModuleSection,
  bootcampModules,
} from "@/data/bootcamp-data";

// Quiz Section Component
interface QuizSectionProps {
  questions: any[];
  sectionId: string;
  quizAnswers: Record<
    string,
    { selectedAnswer: string | null; isAnswered: boolean }
  >;
  updateQuizAnswer: (
    sectionId: string,
    questionIndex: number,
    selectedAnswer: string | null,
    isAnswered: boolean,
  ) => void;
}

const QuizSection: React.FC<QuizSectionProps> = ({
  questions,
  sectionId,
  quizAnswers,
  updateQuizAnswer,
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-amber-50 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Knowledge Check</h4>
        <p className="text-sm text-gray-600">
          Test your understanding of the concepts covered in this module by
          answering the following questions.
        </p>
      </div>
      {questions.map((question: any, qIndex: number) => {
        const key = `${sectionId}-${qIndex}`;
        const quizState = quizAnswers[key] || {
          selectedAnswer: null,
          isAnswered: false,
        };
        const { selectedAnswer, isAnswered } = quizState;

        return (
          <div
            key={qIndex}
            className="border rounded-lg p-6 shadow-sm bg-white"
          >
            <p className="font-medium text-lg mb-4">
              {qIndex + 1}. {question.question}
            </p>
            <div className="space-y-3">
              {question.options.map((option: string, oIndex: number) => {
                const isSelected = selectedAnswer === option;
                const isCorrect =
                  isAnswered && option === question.correctAnswer;
                const isWrong =
                  isAnswered && isSelected && option !== question.correctAnswer;

                return (
                  <div
                    key={oIndex}
                    onClick={() =>
                      !isAnswered &&
                      updateQuizAnswer(sectionId, qIndex, option, false)
                    }
                    className={`p-4 rounded-lg cursor-pointer flex items-center justify-between transition-all duration-200
                      ${isSelected && !isAnswered ? "bg-blue-50 border border-blue-300 shadow-sm" : "bg-slate-50 border border-slate-200 hover:border-slate-300"} 
                      ${isCorrect ? "bg-green-50 border-green-300 shadow-sm" : ""}
                      ${isWrong ? "bg-red-50 border-red-300 shadow-sm" : ""}`}
                  >
                    <span className="font-medium">{option}</span>
                    {isCorrect && (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                    {isWrong && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-red-600"
                      >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    )}
                  </div>
                );
              })}
            </div>
            {!isAnswered && selectedAnswer && (
              <Button
                onClick={() =>
                  updateQuizAnswer(sectionId, qIndex, selectedAnswer, true)
                }
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
                      Correct!
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 mr-2"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                      Incorrect. The correct answer is: {question.correctAnswer}
                    </>
                  )}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const BootcampModulePage = () => {
  const { id } = useParams<{ id: string }>();
  const moduleId = parseInt(id || "1");
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { currentTier } = useSubscription();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [module, setModule] = useState<BootcampModule | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<
    Record<string, { selectedAnswer: string | null; isAnswered: boolean }>
  >({});
  const [dialogueTabStates, setDialogueTabStates] = useState<
    Record<string, string>
  >({});
  const [practiceProgress, setPracticeProgress] = useState<
    Record<string, Record<string, boolean>>
  >({});
  const [exerciseAnswers, setExerciseAnswers] = useState<
    Record<string, { answer: string | null; isAnswered: boolean }>
  >({});
  const [recordingStates, setRecordingStates] = useState<
    Record<string, { hasRecording: boolean; audioUrl: string | null }>
  >({});

  useEffect(() => {
    // In a real app, fetch module data from API
    const moduleData = bootcampModules[moduleId];
    if (moduleData) {
      setModule(moduleData);
      if (!activeSection && moduleData.sections.length > 0) {
        setActiveSection(moduleData.sections[0].id);
      }
    }
  }, [moduleId]);

  // Initialize quiz answers when module changes
  useEffect(() => {
    if (module) {
      const initialQuizAnswers: Record<
        string,
        { selectedAnswer: string | null; isAnswered: boolean }
      > = {};
      module.sections.forEach((section) => {
        if (section.type === "quiz" && section.content?.questions) {
          section.content.questions.forEach((_, qIndex: number) => {
            const key = `${section.id}-${qIndex}`;
            initialQuizAnswers[key] = {
              selectedAnswer: null,
              isAnswered: false,
            };
          });
        }
      });
      setQuizAnswers(initialQuizAnswers);
    }
  }, [module]);

  const handleSectionComplete = (sectionId: string) => {
    if (!module) return;

    // Mark section as completed
    const updatedSections = module.sections.map((section) =>
      section.id === sectionId ? { ...section, completed: true } : section,
    );

    // Calculate new completion percentage
    const completedCount = updatedSections.filter((s) => s.completed).length;
    const newCompletion = Math.round(
      (completedCount / updatedSections.length) * 100,
    );

    setModule({
      ...module,
      sections: updatedSections,
      completion: newCompletion,
    });
  };

  const handleNextSection = () => {
    if (!module || !activeSection) return;

    const currentIndex = module.sections.findIndex(
      (s) => s.id === activeSection,
    );
    if (currentIndex < module.sections.length - 1) {
      setActiveSection(module.sections[currentIndex + 1].id);
    } else {
      // Last section completed, navigate back to bootcamp
      navigate("/bootcamp");
    }
  };

  const handlePreviousSection = () => {
    if (!module || !activeSection) return;

    const currentIndex = module.sections.findIndex(
      (s) => s.id === activeSection,
    );
    if (currentIndex > 0) {
      setActiveSection(module.sections[currentIndex - 1].id);
    }
  };

  const updateQuizAnswer = (
    sectionId: string,
    questionIndex: number,
    selectedAnswer: string | null,
    isAnswered: boolean,
  ) => {
    const key = `${sectionId}-${questionIndex}`;
    setQuizAnswers((prev) => ({
      ...prev,
      [key]: { selectedAnswer, isAnswered },
    }));
  };

  const updateDialogueTab = (sectionId: string, tabValue: string) => {
    setDialogueTabStates((prev) => ({
      ...prev,
      [sectionId]: tabValue,
    }));
  };

  const updatePracticeProgress = (
    sectionId: string,
    scenarioId: string,
    completed: boolean,
  ) => {
    setPracticeProgress((prev) => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        [scenarioId]: completed,
      },
    }));
  };

  const updateExerciseAnswer = (
    exerciseId: string,
    answer: string | null,
    isAnswered: boolean,
  ) => {
    setExerciseAnswers((prev) => ({
      ...prev,
      [exerciseId]: { answer, isAnswered },
    }));
  };

  const handleRecordingComplete = (
    recordingId: string,
    audioBlob: Blob,
    audioUrl: string,
  ) => {
    console.log(`[Bootcamp] Recording completed for ${recordingId}`);
    setRecordingStates((prev) => ({
      ...prev,
      [recordingId]: { hasRecording: true, audioUrl },
    }));
  };

  const handleRecordingPermissionDenied = () => {
    console.warn("[Bootcamp] Microphone permission denied");
    // Could show a toast or additional UI feedback here
  };

  if (!module) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Module Not Found</h1>
          <p className="text-gray-600 mb-6">
            The requested bootcamp module could not be found.
          </p>
          <Button onClick={() => navigate("/bootcamp")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Bootcamp
          </Button>
        </div>
      </div>
    );
  }

  const currentSection =
    module.sections.find((s) => s.id === activeSection) || module.sections[0];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/bootcamp")}
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Bootcamp
            </Button>
            <div>
              <Link
                to="/bootcamp"
                className="text-xl font-bold hover:text-primary transition-colors"
              >
                Bootcamp
              </Link>
              <p className="text-sm text-gray-500">
                Day {module.id}: {module.title}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSelector />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-24">
              <h3 className="font-semibold text-lg mb-4">Module Sections</h3>
              <div className="space-y-2">
                {module.sections.map((section, index) => (
                  <div
                    key={section.id}
                    className={`p-3 rounded-md cursor-pointer transition-all ${activeSection === section.id ? "bg-primary text-primary-foreground" : section.completed ? "bg-green-50 text-green-800" : "hover:bg-gray-100"}`}
                    onClick={() => setActiveSection(section.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="w-6 h-6 rounded-full bg-white text-gray-800 flex items-center justify-center text-xs mr-2">
                          {index + 1}
                        </span>
                        <span className="font-medium">{section.title}</span>
                      </div>
                      {section.completed && (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      )}
                    </div>
                    <div className="mt-1 text-xs flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{section.duration} min</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span>Module Progress</span>
                  <span>{module.completion}%</span>
                </div>
                <Progress value={module.completion} className="h-2" />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">
                      {currentSection.title}
                    </CardTitle>
                    <CardDescription>
                      {currentSection.description}
                    </CardDescription>
                  </div>
                  <Badge>
                    <Clock className="h-3 w-3 mr-1" />
                    {currentSection.duration} min
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {/* Render different content based on section type */}
                {currentSection.type === "video" && (
                  <div className="space-y-4">
                    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Button
                          variant="outline"
                          size="lg"
                          className="rounded-full h-16 w-16"
                        >
                          <Play className="h-6 w-6" />
                        </Button>
                        <p className="mt-2 text-sm text-gray-500">
                          Click to play introduction video
                        </p>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Transcript</h4>
                      <p className="text-sm text-gray-600">
                        {currentSection.content.transcript}
                      </p>
                    </div>
                  </div>
                )}

                {currentSection.type === "vocabulary" &&
                  currentSection.content?.vocabularyItems && (
                    <div className="space-y-4">
                      <h4 className="font-medium">
                        Essential Trucking Vocabulary
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {currentSection.content.vocabularyItems.map(
                          (item: any, index: number) => (
                            <Card
                              key={index}
                              className="border border-gray-200"
                            >
                              <CardContent className="pt-4">
                                <div className="flex justify-between items-center mb-2">
                                  <span className="font-medium text-lg">
                                    {item.word}
                                  </span>
                                  <AudioButton
                                    text={item.word}
                                    identifier={`vocab-${index}`}
                                    size="sm"
                                    variant="ghost"
                                    className="h-8 w-8 p-0 audio-button"
                                  />
                                </div>
                                <p className="text-primary font-medium mb-1">
                                  {item.translation.tr}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {item.definition}
                                </p>
                                <p className="text-sm text-gray-500 mt-2 italic">
                                  Example: {item.example}
                                </p>
                              </CardContent>
                            </Card>
                          ),
                        )}
                      </div>
                    </div>
                  )}

                {currentSection.type === "dialogue" && (
                  <div className="space-y-6">
                    <Tabs
                      value={dialogueTabStates[currentSection.id] || "dialogue"}
                      onValueChange={(value) =>
                        updateDialogueTab(currentSection.id, value)
                      }
                      className="w-full"
                    >
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="dialogue">Dialogue</TabsTrigger>
                        <TabsTrigger value="practice">Practice</TabsTrigger>
                        <TabsTrigger value="exercises">Exercises</TabsTrigger>
                      </TabsList>

                      <TabsContent value="dialogue" className="mt-6">
                        <DialoguePlayer
                          dialogue={currentSection.content.dialogue}
                          nativeLanguage="turkish"
                          onComplete={() =>
                            handleSectionComplete(currentSection.id)
                          }
                        />
                      </TabsContent>

                      <TabsContent value="practice" className="mt-6">
                        <div className="space-y-6">
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="font-medium mb-2">
                              {currentSection.content.practice?.title ||
                                "Practice Scenarios"}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {currentSection.content.practice?.description ||
                                "Practice real-world document handling scenarios."}
                            </p>
                          </div>

                          {currentSection.content.practice?.scenarios?.map(
                            (scenario: any, index: number) => (
                              <Card
                                key={scenario.id}
                                className="border border-gray-200"
                              >
                                <CardHeader>
                                  <CardTitle className="text-lg">
                                    {scenario.title}
                                  </CardTitle>
                                  <CardDescription>
                                    {scenario.situation}
                                  </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                  <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="font-medium text-sm mb-2">
                                      Officer/Situation:
                                    </p>
                                    <p className="text-sm italic">
                                      "{scenario.prompt}"
                                    </p>
                                  </div>

                                  <div className="bg-green-50 p-4 rounded-lg">
                                    <p className="font-medium text-sm mb-2">
                                      Suggested Response:
                                    </p>
                                    <p className="text-sm">
                                      "{scenario.expectedResponse}"
                                    </p>
                                    <div className="flex justify-end mt-2">
                                      <AudioButton
                                        text={scenario.expectedResponse}
                                        identifier={`practice-${scenario.id}`}
                                        size="sm"
                                        variant="outline"
                                        showText
                                        className="text-xs"
                                      />
                                    </div>
                                  </div>

                                  <div className="bg-amber-50 p-4 rounded-lg">
                                    <p className="font-medium text-sm mb-2">
                                      Tips:
                                    </p>
                                    <ul className="text-sm space-y-1">
                                      {scenario.tips?.map(
                                        (tip: string, tipIndex: number) => (
                                          <li
                                            key={tipIndex}
                                            className="flex items-start"
                                          >
                                            <span className="text-amber-600 mr-2">
                                              •
                                            </span>
                                            {tip}
                                          </li>
                                        ),
                                      )}
                                    </ul>
                                  </div>

                                  <div className="flex justify-between items-center pt-2">
                                    <div className="flex items-center gap-2">
                                      <MicrophoneRecorder
                                        identifier={`practice-${scenario.id}`}
                                        size="sm"
                                        variant="outline"
                                        maxDuration={60}
                                        expectedText={scenario.expectedResponse}
                                        onRecordingComplete={(blob, url) =>
                                          handleRecordingComplete(
                                            `practice-${scenario.id}`,
                                            blob,
                                            url,
                                          )
                                        }
                                        onPermissionDenied={
                                          handleRecordingPermissionDenied
                                        }
                                      />
                                      <span className="text-xs text-gray-500">
                                        Record Your Response
                                      </span>
                                    </div>
                                    <Button
                                      size="sm"
                                      onClick={() =>
                                        updatePracticeProgress(
                                          currentSection.id,
                                          scenario.id,
                                          true,
                                        )
                                      }
                                      className={
                                        practiceProgress[currentSection.id]?.[
                                          scenario.id
                                        ]
                                          ? "bg-green-600"
                                          : ""
                                      }
                                    >
                                      {practiceProgress[currentSection.id]?.[
                                        scenario.id
                                      ] ? (
                                        <>
                                          <CheckCircle className="h-4 w-4 mr-2" />
                                          Completed
                                        </>
                                      ) : (
                                        "Mark as Practiced"
                                      )}
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>
                            ),
                          )}
                        </div>
                      </TabsContent>

                      <TabsContent value="exercises" className="mt-6">
                        <div className="space-y-6">
                          <div className="bg-purple-50 p-4 rounded-lg">
                            <h4 className="font-medium mb-2">
                              {currentSection.content.exercises?.title ||
                                "Document Terminology Exercises"}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {currentSection.content.exercises?.description ||
                                "Test your understanding with these exercises."}
                            </p>
                          </div>

                          {/* Fill in the Blanks */}
                          {currentSection.content.exercises
                            ?.fillInTheBlanks && (
                            <div className="space-y-4">
                              <h5 className="font-medium text-lg">
                                Fill in the Blanks
                              </h5>
                              {currentSection.content.exercises.fillInTheBlanks.map(
                                (exercise: any, index: number) => {
                                  const exerciseKey = `fill-${currentSection.id}-${exercise.id}`;
                                  const exerciseState = exerciseAnswers[
                                    exerciseKey
                                  ] || { answer: null, isAnswered: false };

                                  return (
                                    <Card
                                      key={exercise.id}
                                      className="border border-gray-200"
                                    >
                                      <CardContent className="pt-6">
                                        <p className="font-medium mb-4">
                                          {exercise.question}
                                        </p>
                                        <div className="grid grid-cols-2 gap-2 mb-4">
                                          {exercise.options.map(
                                            (
                                              option: string,
                                              optIndex: number,
                                            ) => {
                                              const isSelected =
                                                exerciseState.answer === option;
                                              const isCorrect =
                                                exerciseState.isAnswered &&
                                                option === exercise.answer;
                                              const isWrong =
                                                exerciseState.isAnswered &&
                                                isSelected &&
                                                option !== exercise.answer;

                                              return (
                                                <div
                                                  key={optIndex}
                                                  onClick={() =>
                                                    !exerciseState.isAnswered &&
                                                    updateExerciseAnswer(
                                                      exerciseKey,
                                                      option,
                                                      false,
                                                    )
                                                  }
                                                  className={`p-3 rounded-lg cursor-pointer text-center transition-all
                                                ${isSelected && !exerciseState.isAnswered ? "bg-blue-50 border border-blue-300" : "bg-gray-50 border border-gray-200 hover:border-gray-300"}
                                                ${isCorrect ? "bg-green-50 border-green-300" : ""}
                                                ${isWrong ? "bg-red-50 border-red-300" : ""}`}
                                                >
                                                  {option}
                                                  {isCorrect && (
                                                    <CheckCircle className="h-4 w-4 text-green-600 mx-auto mt-1" />
                                                  )}
                                                </div>
                                              );
                                            },
                                          )}
                                        </div>
                                        {!exerciseState.isAnswered &&
                                          exerciseState.answer && (
                                            <Button
                                              onClick={() =>
                                                updateExerciseAnswer(
                                                  exerciseKey,
                                                  exerciseState.answer,
                                                  true,
                                                )
                                              }
                                              className="w-full"
                                            >
                                              Check Answer
                                            </Button>
                                          )}
                                        {exerciseState.isAnswered && (
                                          <div
                                            className={`p-3 rounded-lg ${
                                              exerciseState.answer ===
                                              exercise.answer
                                                ? "bg-green-50 border border-green-200"
                                                : "bg-red-50 border border-red-200"
                                            }`}
                                          >
                                            <p className="text-sm">
                                              {exerciseState.answer ===
                                              exercise.answer
                                                ? "✓ Correct!"
                                                : `✗ Incorrect. The correct answer is: ${exercise.answer}`}
                                            </p>
                                            <p className="text-xs mt-2 text-gray-600">
                                              {exercise.explanation}
                                            </p>
                                          </div>
                                        )}
                                      </CardContent>
                                    </Card>
                                  );
                                },
                              )}
                            </div>
                          )}

                          {/* Multiple Choice */}
                          {currentSection.content.exercises?.multipleChoice && (
                            <div className="space-y-4">
                              <h5 className="font-medium text-lg">
                                Multiple Choice
                              </h5>
                              {currentSection.content.exercises.multipleChoice.map(
                                (exercise: any, index: number) => {
                                  const exerciseKey = `mc-${currentSection.id}-${exercise.id}`;
                                  const exerciseState = exerciseAnswers[
                                    exerciseKey
                                  ] || { answer: null, isAnswered: false };

                                  return (
                                    <Card
                                      key={exercise.id}
                                      className="border border-gray-200"
                                    >
                                      <CardContent className="pt-6">
                                        <p className="font-medium mb-4">
                                          {exercise.question}
                                        </p>
                                        <div className="space-y-2 mb-4">
                                          {exercise.options.map(
                                            (
                                              option: string,
                                              optIndex: number,
                                            ) => {
                                              const isSelected =
                                                exerciseState.answer === option;
                                              const isCorrect =
                                                exerciseState.isAnswered &&
                                                option ===
                                                  exercise.correctAnswer;
                                              const isWrong =
                                                exerciseState.isAnswered &&
                                                isSelected &&
                                                option !==
                                                  exercise.correctAnswer;

                                              return (
                                                <div
                                                  key={optIndex}
                                                  onClick={() =>
                                                    !exerciseState.isAnswered &&
                                                    updateExerciseAnswer(
                                                      exerciseKey,
                                                      option,
                                                      false,
                                                    )
                                                  }
                                                  className={`p-3 rounded-lg cursor-pointer transition-all flex items-center justify-between
                                                ${isSelected && !exerciseState.isAnswered ? "bg-blue-50 border border-blue-300" : "bg-gray-50 border border-gray-200 hover:border-gray-300"}
                                                ${isCorrect ? "bg-green-50 border-green-300" : ""}
                                                ${isWrong ? "bg-red-50 border-red-300" : ""}`}
                                                >
                                                  <span>{option}</span>
                                                  {isCorrect && (
                                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                                  )}
                                                </div>
                                              );
                                            },
                                          )}
                                        </div>
                                        {!exerciseState.isAnswered &&
                                          exerciseState.answer && (
                                            <Button
                                              onClick={() =>
                                                updateExerciseAnswer(
                                                  exerciseKey,
                                                  exerciseState.answer,
                                                  true,
                                                )
                                              }
                                              className="w-full"
                                            >
                                              Check Answer
                                            </Button>
                                          )}
                                        {exerciseState.isAnswered && (
                                          <div
                                            className={`p-3 rounded-lg ${
                                              exerciseState.answer ===
                                              exercise.correctAnswer
                                                ? "bg-green-50 border border-green-200"
                                                : "bg-red-50 border border-red-200"
                                            }`}
                                          >
                                            <p className="text-sm">
                                              {exerciseState.answer ===
                                              exercise.correctAnswer
                                                ? "✓ Correct!"
                                                : `✗ Incorrect. The correct answer is: ${exercise.correctAnswer}`}
                                            </p>
                                            <p className="text-xs mt-2 text-gray-600">
                                              {exercise.explanation}
                                            </p>
                                          </div>
                                        )}
                                      </CardContent>
                                    </Card>
                                  );
                                },
                              )}
                            </div>
                          )}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                )}

                {currentSection.type === "roleplay" && (
                  <RoleplayDialogue
                    title={currentSection.title}
                    description={currentSection.description}
                    exchanges={currentSection.content.exchanges}
                    nativeLanguage="turkish"
                    onComplete={() => handleSectionComplete(currentSection.id)}
                  />
                )}

                {currentSection.type === "practice" &&
                  currentSection.content?.phrases && (
                    <div className="space-y-6">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">
                          Pronunciation Practice
                        </h4>
                        <p className="text-sm text-gray-600">
                          Practice pronouncing these important trucking terms.
                          Click the play button to hear the correct
                          pronunciation, then record yourself saying each term.
                        </p>
                      </div>
                      <div className="space-y-4">
                        {currentSection.content.phrases.map(
                          (phrase: string, index: number) => (
                            <Card
                              key={index}
                              className="border border-gray-200"
                            >
                              <CardContent className="py-4">
                                <div className="flex items-center justify-between">
                                  <span className="font-medium">{phrase}</span>
                                  <div className="flex items-center space-x-2">
                                    <AudioButton
                                      text={phrase}
                                      identifier={`practice-${index}`}
                                      size="sm"
                                      variant="outline"
                                      className="h-8 w-8 p-0 audio-button"
                                    />
                                    <MicrophoneRecorder
                                      identifier={`pronunciation-${index}`}
                                      size="sm"
                                      variant="outline"
                                      maxDuration={10}
                                      expectedText={phrase}
                                      onRecordingComplete={(blob, url) =>
                                        handleRecordingComplete(
                                          `pronunciation-${index}`,
                                          blob,
                                          url,
                                        )
                                      }
                                      onPermissionDenied={
                                        handleRecordingPermissionDenied
                                      }
                                      showWaveform
                                    />
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ),
                        )}
                      </div>
                    </div>
                  )}

                {currentSection.type === "quiz" &&
                  currentSection.content?.questions && (
                    <QuizSection
                      questions={currentSection.content.questions}
                      sectionId={currentSection.id}
                      quizAnswers={quizAnswers}
                      updateQuizAnswer={updateQuizAnswer}
                    />
                  )}
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePreviousSection}
                disabled={
                  module.sections.findIndex((s) => s.id === activeSection) === 0
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="m15 18-6-6 6-6"></path>
                </svg>
                Previous Section
              </Button>
              <Button
                onClick={() => {
                  handleSectionComplete(currentSection.id);
                  handleNextSection();
                }}
              >
                {module.sections.findIndex((s) => s.id === activeSection) ===
                module.sections.length - 1 ? (
                  <>
                    Complete Module
                    <CheckCircle className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    Complete & Continue
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-2"
                    >
                      <path d="m9 18 6-6-6-6"></path>
                    </svg>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BootcampModulePage;
