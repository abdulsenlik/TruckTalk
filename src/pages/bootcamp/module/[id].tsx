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

interface ModuleSection {
  id: string;
  title: string;
  duration: number;
  type: "video" | "vocabulary" | "dialogue" | "roleplay" | "quiz" | "practice";
  description: string;
  completed: boolean;
  content?: any;
}

interface BootcampModule {
  id: number;
  title: string;
  description: string;
  duration: number;
  sections: ModuleSection[];
  completion: number;
}

// Sample data for Module 1
const module1: BootcampModule = {
  id: 1,
  title: "Foundations & Essential Trucking Vocabulary",
  description:
    "Master core trucking industry terms and document handling terminology",
  duration: 120, // minutes
  completion: 0,
  sections: [
    {
      id: "intro",
      title: "Introduction & Icebreaker",
      duration: 30,
      type: "video",
      description:
        "Welcome to the 10-Hour English Bootcamp for Truck Drivers. Let's get started with some basic introductions and set your learning goals.",
      completed: false,
      content: {
        videoUrl: "https://example.com/intro-video",
        transcript:
          "Welcome to the 10-Hour English Bootcamp for Truck Drivers. In this course, you'll learn essential English vocabulary and phrases that will help you communicate effectively on the road...",
      },
    },
    {
      id: "vocabulary",
      title: "Core Trucking Vocabulary",
      duration: 45,
      type: "vocabulary",
      description:
        "Learn essential trucking industry terms related to vehicle components, cargo types, and route planning.",
      completed: false,
      content: {
        vocabularyItems: [
          {
            word: "cab",
            translation: {
              tr: "kamyon kabini",
              kg: "кабина",
              ru: "кабина",
            },
            definition: "The compartment or shelter where the driver sits",
            example: "The driver climbed into the cab of his truck.",
          },
          {
            word: "trailer",
            translation: {
              tr: "römork",
              kg: "чиркегич",
              ru: "прицеп",
            },
            definition: "A vehicle pulled by another vehicle",
            example: "He connected the trailer to his truck.",
          },
          {
            word: "load",
            translation: {
              tr: "yük",
              kg: "жүк",
              ru: "груз",
            },
            definition: "The cargo carried by a truck",
            example: "The truck was carrying a heavy load of furniture.",
          },
          {
            word: "dispatch",
            translation: {
              tr: "sevkiyat",
              kg: "жөнөтүү",
              ru: "отправка",
            },
            definition: "To send off to a destination or for a purpose",
            example:
              "The company dispatched three trucks to deliver the goods.",
          },
          {
            word: "freight",
            translation: {
              tr: "navlun",
              kg: "жүк ташуу",
              ru: "фрахт",
            },
            definition:
              "Goods transported in bulk by truck, train, ship, or aircraft",
            example: "The freight arrived on time despite the bad weather.",
          },
          {
            word: "haul",
            translation: {
              tr: "taşıma",
              kg: "ташуу",
              ru: "перевозка",
            },
            definition: "To transport by truck over a long distance",
            example: "He hauls goods between New York and Chicago.",
          },
          {
            word: "rig",
            translation: {
              tr: "tır",
              kg: "чоң жүк ташуучу",
              ru: "фура",
            },
            definition: "A large truck or semi-trailer",
            example: "His rig has a sleeper cab for long journeys.",
          },
          {
            word: "logbook",
            translation: {
              tr: "kayıt defteri",
              kg: "журнал",
              ru: "журнал учета",
            },
            definition: "A record of a driver's hours of service",
            example:
              "The officer asked to see his logbook during the inspection.",
          },
        ],
      },
    },
    {
      id: "document-handling",
      title: "Document Handling Terminology",
      duration: 30,
      type: "dialogue",
      description:
        "Practice essential vocabulary related to bills of lading, permits, and electronic logging devices.",
      completed: false,
      content: {
        dialogue: {
          id: "doc-handling-1",
          title: "Document Inspection Dialogue",
          description:
            "Practice a conversation about document inspection at a checkpoint",
          englishText:
            "Officer: Good morning. May I see your commercial driver's license and registration?\nDriver: Good morning, officer. Here's my CDL and registration.\nOfficer: Thank you. Can I also see your logbook or ELD records?\nDriver: Yes, here are my electronic logging device records.\nOfficer: I need to check your bill of lading as well.\nDriver: Of course. Here's the bill of lading for my current load.\nOfficer: Everything looks in order. Do you have any hazardous materials on board?\nDriver: No, officer. I'm carrying general merchandise.\nOfficer: Thank you for your cooperation. Drive safely.",
          translatedText:
            "Memur: Günaydın. Ticari sürücü belgenizi ve ruhsatınızı görebilir miyim?\nSürücü: Günaydın memur bey. İşte CDL'im ve ruhsatım.\nMemur: Teşekkür ederim. Kayıt defterinizi veya ELD kayıtlarınızı da görebilir miyim?\nSürücü: Evet, işte elektronik kayıt cihazı kayıtlarım.\nMemur: Konşimentonuzu da kontrol etmem gerekiyor.\nSürücü: Tabii. İşte mevcut yüküm için konşimento.\nMemur: Her şey düzgün görünüyor. Araçta tehlikeli madde var mı?\nSürücü: Hayır memur bey. Genel ticari eşya taşıyorum.\nMemur: İşbirliğiniz için teşekkürler. Güvenli sürüşler.",
          vocabulary: [
            {
              word: "commercial driver's license (CDL)",
              translation: "ticari sürücü belgesi",
              definition:
                "A license required to operate large, heavy, or placarded hazardous material vehicles",
            },
            {
              word: "electronic logging device (ELD)",
              translation: "elektronik kayıt cihazı",
              definition:
                "A device that automatically records driving time and monitors engine hours",
            },
            {
              word: "bill of lading",
              translation: "konşimento",
              definition:
                "A document issued by a carrier to acknowledge receipt of cargo for shipment",
            },
            {
              word: "hazardous materials",
              translation: "tehlikeli maddeler",
              definition:
                "Substances that pose risks to health, safety, and property during transportation",
            },
          ],
        },
      },
    },
    {
      id: "pronunciation",
      title: "Pronunciation Clinic",
      duration: 15,
      type: "practice",
      description:
        "Practice pronouncing difficult trucking terms and phrases with audio recording and playback.",
      completed: false,
      content: {
        phrases: [
          "commercial driver's license",
          "electronic logging device",
          "bill of lading",
          "hazardous materials",
          "weight restriction",
          "oversized load",
          "refrigerated trailer",
          "international fuel tax agreement",
        ],
      },
    },
    {
      id: "assessment",
      title: "Assessment & Homework",
      duration: 15,
      type: "quiz",
      description:
        "Test your knowledge of the vocabulary and concepts covered in this module.",
      completed: false,
      content: {
        questions: [
          {
            question:
              "What document acknowledges receipt of cargo for shipment?",
            options: [
              "Commercial driver's license",
              "Bill of lading",
              "Electronic logging device",
              "Hazardous materials permit",
            ],
            correctAnswer: "Bill of lading",
          },
          {
            question:
              "What is the purpose of an electronic logging device (ELD)?",
            options: [
              "To track fuel consumption",
              "To navigate routes",
              "To automatically record driving time",
              "To communicate with dispatch",
            ],
            correctAnswer: "To automatically record driving time",
          },
          {
            question: "What is a 'rig' in trucking terminology?",
            options: [
              "A small delivery van",
              "A large truck or semi-trailer",
              "A loading dock",
              "A weigh station",
            ],
            correctAnswer: "A large truck or semi-trailer",
          },
        ],
      },
    },
  ],
};

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

// Sample data for other modules
const bootcampModules: Record<number, BootcampModule> = {
  1: module1,
  // Add other modules as needed
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
                  <Badge variant="outline" className="flex items-center">
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
                  <DialoguePlayer
                    dialogue={currentSection.content.dialogue}
                    nativeLanguage="turkish"
                    onComplete={() => handleSectionComplete(currentSection.id)}
                  />
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
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="h-8 w-8 p-0"
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
                                      >
                                        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                                        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                                        <line
                                          x1="12"
                                          x2="12"
                                          y1="19"
                                          y2="22"
                                        ></line>
                                      </svg>
                                      <span className="sr-only">
                                        Record audio
                                      </span>
                                    </Button>
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
                    Next Section
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
