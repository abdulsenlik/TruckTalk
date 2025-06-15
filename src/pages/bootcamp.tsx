import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Calendar,
  Award,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LanguageSelector, { useLanguage } from "@/components/LanguageSelector";
import { useSubscription } from "@/contexts/SubscriptionContext";
import InAppReminder from "@/components/InAppReminder";

interface BootcampModule {
  id: number;
  title: string;
  description: string;
  duration: number;
  components: string[];
  completion: number;
  isLocked: boolean;
  image: string;
}

const bootcampModules: BootcampModule[] = [
  {
    id: 1,
    title: "Foundations & Essential Trucking Vocabulary",
    description:
      "Master core trucking industry terms and document handling terminology",
    duration: 120, // minutes
    components: [
      "Introduction & Icebreaker (30 min)",
      "Core Trucking Vocabulary (45 min)",
      "Document Handling Terminology (30 min)",
      "Pronunciation Clinic (15 min)",
    ],
    completion: 0,
    isLocked: false,
    image:
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&q=80",
  },
  {
    id: 2,
    title: "On the Road – Communication & Navigation",
    description:
      "Navigate confidently using English directions and master radio communication",
    duration: 120,
    components: [
      "Navigation Essentials (40 min)",
      "Road Signs & Safety Language (30 min)",
      "CB Radio & Dispatcher Communication (30 min)",
      "Interactive Roleplay (20 min)",
    ],
    completion: 0,
    isLocked: false,
    image:
      "https://images.unsplash.com/photo-1566143260825-4ceeaed58d26?w=600&q=80",
  },
  {
    id: 3,
    title: "Police Stops, Inspections & Emergencies",
    description:
      "Learn to respond appropriately to law enforcement and handle emergency situations",
    duration: 120,
    components: [
      "Police Interaction Scenarios (45 min)",
      "Inspection Vocabulary & Procedures (30 min)",
      "Emergency Communication (30 min)",
      "Interactive Practice (15 min)",
    ],
    completion: 0,
    isLocked: false,
    image:
      "https://images.unsplash.com/photo-1596394723269-b2cbca4e6e33?w=600&q=80",
  },
  {
    id: 4,
    title: "Customer & Border Interactions",
    description:
      "Handle customer interactions professionally and navigate border crossing procedures",
    duration: 120,
    components: [
      "Customer Service Essentials (40 min)",
      "Border Crossing & Weigh Station Communication (40 min)",
      "Cultural Communication Tips (20 min)",
      "Interactive Roleplay (20 min)",
    ],
    completion: 0,
    isLocked: false,
    image:
      "https://images.unsplash.com/photo-1631651693480-97f1132e333d?w=600&q=80",
  },
  {
    id: 5,
    title: "Test Prep, Review & Certification",
    description:
      "Master CDL test vocabulary and demonstrate improved English communication skills",
    duration: 120,
    components: [
      "CDL Test Language Preparation (30 min)",
      "Comprehensive Review (45 min)",
      "Mock Assessment (30 min)",
      "Certification & Future Learning (15 min)",
    ],
    completion: 0,
    isLocked: false,
    image:
      "https://images.unsplash.com/photo-1589578527966-fdac0f44566c?w=600&q=80",
  },
];

const BootcampPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { currentTier, showUpgradeModal } = useSubscription();
  const [activeTab, setActiveTab] = useState("overview");
  const [showReminder, setShowReminder] = useState(true);

  const totalCompletion =
    bootcampModules.reduce((sum, module) => sum + module.completion, 0) /
    bootcampModules.length;

  const handleModuleClick = (module: BootcampModule) => {
    if (module.isLocked && currentTier === "free") {
      showUpgradeModal("Bootcamp Access");
      return;
    }
    navigate(`/bootcamp/module/${module.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
              <ArrowLeft className="h-5 w-5 mr-2" />
              {t ? t("button.back") : "Back"}
            </Button>
            <div className="flex items-center space-x-2">
              <Link
                to="/"
                className="text-xl font-bold hover:text-primary transition-colors"
              >
                TruckTalk
              </Link>
              <span className="text-xl font-bold text-muted-foreground">/</span>
              <h1 className="text-xl font-bold">10-Hour Bootcamp</h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSelector />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Subscription Reminder */}
        {currentTier === "free" && showReminder && (
          <div className="mb-6">
            <InAppReminder
              trigger="module_progress"
              onDismiss={() => setShowReminder(false)}
            />
          </div>
        )}

        {/* Bootcamp Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-8 border border-blue-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                10-Hour English Bootcamp for Truck Drivers
              </h2>
              <p className="text-muted-foreground mb-4">
                Master essential English communication skills for the trucking
                industry with our comprehensive 5-day program.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-1 text-blue-500" />
                  <span>10 hours total</span>
                </div>
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-1 text-blue-500" />
                  <span>5 daily modules</span>
                </div>
                <div className="flex items-center text-sm">
                  <Award className="h-4 w-4 mr-1 text-blue-500" />
                  <span>Certificate upon completion</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center md:items-end">
              <div className="mb-2 text-sm font-medium">
                Overall Progress: {Math.round(totalCompletion)}%
              </div>
              <Progress
                value={totalCompletion}
                className="w-full md:w-40 h-2"
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-2 md:w-auto md:inline-flex">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="modules">Modules</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  About This Bootcamp
                </h3>
                <p className="text-muted-foreground mb-4">
                  Welcome to our comprehensive 10-hour English language bootcamp
                  specifically designed for truck drivers. This intensive course
                  is structured into five 2-hour daily modules that
                  systematically build essential English communication skills
                  needed in the trucking industry.
                </p>
                <p className="text-muted-foreground mb-4">
                  Each module combines vocabulary acquisition, practical
                  scenarios, interactive exercises, and assessment to ensure
                  maximum learning effectiveness. By the end of this course,
                  you'll gain confidence in your English communication abilities
                  in professional contexts.
                </p>
                <h3 className="text-xl font-semibold mb-4">
                  What You'll Learn
                </h3>
                <ul className="space-y-2 list-disc pl-5 text-muted-foreground">
                  <li>
                    Essential trucking industry vocabulary and terminology
                  </li>
                  <li>Confident navigation using English directions</li>
                  <li>Effective communication with law enforcement</li>
                  <li>
                    Professional customer and border crossing interactions
                  </li>
                  <li>CDL test-specific language preparation</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Interactive Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Card className="border border-blue-100">
                    <CardContent className="pt-6">
                      <div className="mb-2 p-2 bg-blue-50 rounded-full w-10 h-10 flex items-center justify-center">
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
                          className="text-blue-500"
                        >
                          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                          <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                          <line x1="12" x2="12" y1="19" y2="22"></line>
                        </svg>
                      </div>
                      <h4 className="font-medium">Audio Pronunciation</h4>
                      <p className="text-sm text-muted-foreground">
                        Native speaker recordings with speech recognition
                        practice
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border border-blue-100">
                    <CardContent className="pt-6">
                      <div className="mb-2 p-2 bg-blue-50 rounded-full w-10 h-10 flex items-center justify-center">
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
                          className="text-blue-500"
                        >
                          <path d="m22 8-6 4 6 4V8Z"></path>
                          <rect
                            width="14"
                            height="12"
                            x="2"
                            y="6"
                            rx="2"
                            ry="2"
                          ></rect>
                        </svg>
                      </div>
                      <h4 className="font-medium">Video Demonstrations</h4>
                      <p className="text-sm text-muted-foreground">
                        Real-world scenario videos showing proper communication
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border border-blue-100">
                    <CardContent className="pt-6">
                      <div className="mb-2 p-2 bg-blue-50 rounded-full w-10 h-10 flex items-center justify-center">
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
                          className="text-blue-500"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="m9 12 2 2 4-4"></path>
                        </svg>
                      </div>
                      <h4 className="font-medium">Interactive Quizzes</h4>
                      <p className="text-sm text-muted-foreground">
                        End-of-module assessments with immediate feedback
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border border-blue-100">
                    <CardContent className="pt-6">
                      <div className="mb-2 p-2 bg-blue-50 rounded-full w-10 h-10 flex items-center justify-center">
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
                          className="text-blue-500"
                        >
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                      </div>
                      <h4 className="font-medium">AI Roleplay</h4>
                      <p className="text-sm text-muted-foreground">
                        Practice conversations with interactive AI scenarios
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <div className="mt-6">
                  <Button
                    onClick={() => setActiveTab("modules")}
                    className="w-full"
                  >
                    Start Learning Now
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="modules" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bootcampModules.map((module) => (
                <Card
                  key={module.id}
                  className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${module.isLocked && currentTier === "free" ? "opacity-70" : "hover:scale-[1.02]"} cursor-pointer bg-white`}
                  onClick={() => handleModuleClick(module)}
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={module.image}
                      alt={module.title}
                      className="w-full h-full object-cover"
                    />
                    {module.isLocked && currentTier === "free" && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="bg-white/90 px-3 py-1 rounded-md text-sm font-medium">
                          Premium Content
                        </div>
                      </div>
                    )}
                    <Badge className="absolute top-2 right-2 bg-blue-100 text-blue-800">
                      Day {module.id}
                    </Badge>
                  </div>
                  <CardContent className="pt-4">
                    <h3 className="text-lg font-semibold mb-1 line-clamp-1">
                      {module.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {module.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                      <span>Progress</span>
                      <span>{module.completion}%</span>
                    </div>
                    <Progress value={module.completion} className="h-1.5" />
                  </CardContent>
                  <CardFooter className="pt-0 pb-4 flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{module.duration / 60} hours</span>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default BootcampPage;
