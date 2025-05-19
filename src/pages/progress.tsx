import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Award,
  Calendar,
  BarChart2,
  TrendingUp,
  Clock,
  CheckCircle,
  Star,
  Trophy,
  Target,
  Zap,
  BookOpen,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/components/LanguageSelector";
import { supabase } from "@/lib/supabase";

interface ModuleProgress {
  id: number;
  title: string;
  totalDialogues: number;
  completedDialogues: number;
  lastAccessed: string;
  image?: string;
}

interface UserStats {
  totalTimeSpent: number; // in minutes
  streak: number;
  lastActive: string;
  level: number;
  xp: number;
  nextLevelXp: number;
}

import { trafficStopCourse } from "@/data/trafficStopCourse";

const moduleProgress: ModuleProgress[] = trafficStopCourse.map(
  (section, index) => ({
    id: index + 1,
    title: section.title,
    totalDialogues: section.dialogues.length,
    completedDialogues: index === 0 ? 1 : 0,
    lastAccessed: index === 0 ? new Date().toISOString() : "",
    image: getImageForSection(section.id),
  }),
);

// Helper function to get appropriate image for each section
function getImageForSection(sectionId: string): string {
  switch (sectionId) {
    case "initial-stop":
      return "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=600&q=80";
    case "document-check":
      return "https://images.unsplash.com/photo-1577368211130-4bbd0181ddf0?w=600&q=80";
    case "vehicle-inspection":
      return "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=600&q=80";
    case "explaining-situations":
      return "https://images.unsplash.com/photo-1589578527966-fdac0f44566c?w=600&q=80";
    case "citations-and-tickets":
      return "https://images.unsplash.com/photo-1596394723269-b2cbca4e6e33?w=600&q=80";
    case "emergency-situations":
      return "https://images.unsplash.com/photo-1635355955841-1b3e5fb67c3a?w=600&q=80";
    default:
      return "https://images.unsplash.com/photo-1590496793929-36417d3117de?w=600&q=80";
  }
}

const achievements = [
  {
    id: 1,
    title: "First Lesson",
    description: "Complete your first dialogue",
    icon: <Award className="h-8 w-8 text-yellow-500" />,
    completed: true,
    date: "2023-05-08",
  },
  {
    id: 2,
    title: "Quick Learner",
    description: "Complete 5 dialogues",
    icon: <TrendingUp className="h-8 w-8 text-blue-500" />,
    completed: false,
    progress: 3,
    total: 5,
  },
  {
    id: 3,
    title: "Consistent Practice",
    description: "Study for 3 consecutive days",
    icon: <Calendar className="h-8 w-8 text-green-500" />,
    completed: false,
    progress: 1,
    total: 3,
  },
  {
    id: 4,
    title: "Road Master",
    description: "Complete the Road Signs module",
    icon: <Target className="h-8 w-8 text-red-500" />,
    completed: false,
    progress: 2,
    total: 8,
  },
  {
    id: 5,
    title: "Safety Expert",
    description: "Complete all emergency phrases",
    icon: <Zap className="h-8 w-8 text-purple-500" />,
    completed: false,
    progress: 5,
    total: 15,
  },
  {
    id: 6,
    title: "Vocabulary Champion",
    description: "Learn 100 new words",
    icon: <BookOpen className="h-8 w-8 text-indigo-500" />,
    completed: false,
    progress: 42,
    total: 100,
  },
];

const userStats: UserStats = {
  totalTimeSpent: 127, // minutes
  streak: 2, // days
  lastActive: new Date().toISOString(),
  level: 3,
  xp: 320,
  nextLevelXp: 500,
};

const ProgressPage = () => {
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      setIsLoading(true);
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
      }
      setIsLoading(false);
    };

    getUser();
  }, []);

  // Calculate overall progress
  const totalDialogues = moduleProgress.reduce(
    (sum, module) => sum + module.totalDialogues,
    0,
  );
  const completedDialogues = moduleProgress.reduce(
    (sum, module) => sum + module.completedDialogues,
    0,
  );
  const overallProgress =
    totalDialogues > 0
      ? Math.round((completedDialogues / totalDialogues) * 100)
      : 0;

  // Calculate XP progress percentage
  const xpProgress = Math.round((userStats.xp / userStats.nextLevelXp) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
              <ArrowLeft className="h-5 w-5 mr-2" />
              {t("button.back")}
            </Button>
            <h1 className="text-xl font-bold">{t("progress.title")}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSelector />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* User Profile Card */}
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-r from-primary/80 to-primary p-6 text-white">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 rounded-full p-4">
                  <User className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">
                    {user?.user_metadata?.name || "Truck Driver"}
                  </h2>
                  <div className="flex items-center mt-1">
                    <Star className="h-4 w-4 mr-1 fill-white" />
                    <span>Level {userStats.level}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>
                    XP: {userStats.xp}/{userStats.nextLevelXp}
                  </span>
                  <span>{xpProgress}%</span>
                </div>
                <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full"
                    style={{ width: `${xpProgress}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="flex flex-col items-center">
                    <Calendar className="h-6 w-6 text-primary mb-1" />
                    <span className="text-xl font-bold">
                      {userStats.streak}
                    </span>
                    <span className="text-xs text-gray-500">Day Streak</span>
                  </div>
                </div>
                <div>
                  <div className="flex flex-col items-center">
                    <Clock className="h-6 w-6 text-primary mb-1" />
                    <span className="text-xl font-bold">
                      {userStats.totalTimeSpent}
                    </span>
                    <span className="text-xs text-gray-500">
                      Minutes Studied
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex flex-col items-center">
                    <Trophy className="h-6 w-6 text-primary mb-1" />
                    <span className="text-xl font-bold">
                      {achievements.filter((a) => a.completed).length}
                    </span>
                    <span className="text-xs text-gray-500">Achievements</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Overall Progress Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>{t("progress.overall")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {completedDialogues} of {totalDialogues} dialogues completed
                  </span>
                  <span className="font-medium">{overallProgress}%</span>
                </div>
                <Progress value={overallProgress} className="h-2" />

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-muted/30 p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold">
                      {completedDialogues}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {t("progress.dialoguesCompleted")}
                    </div>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold">
                      {
                        moduleProgress.filter((m) => m.completedDialogues > 0)
                          .length
                      }
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {t("progress.modulesStarted")}
                    </div>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold">
                      {
                        moduleProgress.filter(
                          (m) => m.completedDialogues === m.totalDialogues,
                        ).length
                      }
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {t("progress.modulesCompleted")}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs for different progress views */}
          <Tabs defaultValue="modules">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="modules">
                {t("progress.moduleProgress")}
              </TabsTrigger>
              <TabsTrigger value="achievements">
                {t("progress.achievements")}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="modules" className="space-y-4 mt-6">
              {moduleProgress.map((module) => (
                <Card
                  key={module.id}
                  className="hover:shadow-sm transition-shadow overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row">
                    {module.image && (
                      <div className="w-full md:w-1/4 h-32 md:h-auto">
                        <img
                          src={module.image}
                          alt={module.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <CardContent className="p-4 flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{module.title}</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/module/${module.id}`)}
                        >
                          {t("button.continue")}
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">
                            {module.completedDialogues} of{" "}
                            {module.totalDialogues} dialogues
                          </span>
                          <span>
                            {Math.round(
                              (module.completedDialogues /
                                module.totalDialogues) *
                                100,
                            )}
                            %
                          </span>
                        </div>
                        <Progress
                          value={Math.round(
                            (module.completedDialogues /
                              module.totalDialogues) *
                              100,
                          )}
                          className="h-1.5"
                        />
                      </div>

                      {module.lastAccessed && (
                        <div className="text-xs text-muted-foreground mt-2">
                          Last accessed:{" "}
                          {new Date(module.lastAccessed).toLocaleDateString()}
                        </div>
                      )}
                    </CardContent>
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="achievements" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <Card
                    key={achievement.id}
                    className={`${achievement.completed ? "border-green-200 bg-green-50/30" : ""}`}
                  >
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="bg-background rounded-full p-3">
                        {achievement.icon}
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium">{achievement.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {achievement.description}
                        </p>

                        {achievement.completed ? (
                          <div className="flex items-center mt-2 text-sm text-green-600">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Completed on{" "}
                            {new Date(achievement.date).toLocaleDateString()}
                          </div>
                        ) : achievement.progress !== undefined &&
                          achievement.total !== undefined ? (
                          <div className="mt-2">
                            <div className="flex justify-between text-xs mb-1">
                              <span>
                                {achievement.progress}/{achievement.total}
                              </span>
                              <span>
                                {Math.round(
                                  (achievement.progress / achievement.total) *
                                    100,
                                )}
                                %
                              </span>
                            </div>
                            <Progress
                              value={Math.round(
                                (achievement.progress / achievement.total) *
                                  100,
                              )}
                              className="h-1"
                            />
                          </div>
                        ) : null}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default ProgressPage;
