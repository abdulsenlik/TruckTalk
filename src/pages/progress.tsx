import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
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
  LogIn,
  UserPlus,
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

interface UserProfile {
  id: string;
  email: string;
  username?: string;
  progress: {
    moduleProgress: ModuleProgress[];
    userStats: UserStats;
    achievements: Achievement[];
  };
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  completed: boolean;
  date?: string;
  progress?: number;
  total?: number;
}

import { trafficStopCourse } from "@/data/trafficStopCourse";

// Default module progress structure
const getDefaultModuleProgress = (): ModuleProgress[] =>
  trafficStopCourse.map((section, index) => ({
    id: index + 1,
    title: section.title,
    totalDialogues: section.dialogues.length,
    completedDialogues: 0,
    lastAccessed: "",
    image: getImageForSection(section.id),
  }));

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
      return "https://www.policechiefmagazine.org/wp-content/uploads/Born_RNC-Community.jpg?w=600&q=80";
    case "citations-and-tickets":
      return "https://www.consumercoverage.com/wp-content/uploads/2023/03/Difference-Between-Citation-And-Ticket.jpg?w=600&q=80";
    case "emergency-situations":
      return "https://domf5oio6qrcr.cloudfront.net/medialibrary/12642/conversions/bd3a86d1-cab1-49f5-8b13-5ba9529203c6-thumb.jpg?w=600&q=80";
    default:
      return "https://images.unsplash.com/photo-1590496793929-36417d3117de?w=600&q=80";
  }
}

// Default achievements structure
const getDefaultAchievements = (): Achievement[] => [
  {
    id: 1,
    title: "First Lesson",
    description: "Complete your first dialogue",
    icon: <Award className="h-8 w-8 text-yellow-500" />,
    completed: false,
  },
  {
    id: 2,
    title: "Quick Learner",
    description: "Complete 5 dialogues",
    icon: <TrendingUp className="h-8 w-8 text-blue-500" />,
    completed: false,
    progress: 0,
    total: 5,
  },
  {
    id: 3,
    title: "Consistent Practice",
    description: "Study for 3 consecutive days",
    icon: <Calendar className="h-8 w-8 text-green-500" />,
    completed: false,
    progress: 0,
    total: 3,
  },
  {
    id: 4,
    title: "Road Master",
    description: "Complete the Road Signs module",
    icon: <Target className="h-8 w-8 text-red-500" />,
    completed: false,
    progress: 0,
    total: 8,
  },
  {
    id: 5,
    title: "Safety Expert",
    description: "Complete all emergency phrases",
    icon: <Zap className="h-8 w-8 text-purple-500" />,
    completed: false,
    progress: 0,
    total: 15,
  },
  {
    id: 6,
    title: "Vocabulary Champion",
    description: "Learn 100 new words",
    icon: <BookOpen className="h-8 w-8 text-indigo-500" />,
    completed: false,
    progress: 0,
    total: 100,
  },
];

// Default user stats
const getDefaultUserStats = (): UserStats => ({
  totalTimeSpent: 0,
  streak: 0,
  lastActive: new Date().toISOString(),
  level: 1,
  xp: 0,
  nextLevelXp: 100,
});

const ProgressPage = () => {
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [moduleProgress, setModuleProgress] = useState<ModuleProgress[]>([]);
  const [userStats, setUserStats] = useState<UserStats>(getDefaultUserStats());
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    const initializeUserData = async () => {
      setIsLoading(true);
      try {
        // Get current user
        const {
          data: { user: currentUser },
        } = await supabase.auth.getUser();

        if (!currentUser) {
          setUser(null);
          setIsLoading(false);
          return;
        }

        setUser(currentUser);

        // Fetch user profile from database
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", currentUser.id)
          .single();

        if (error && error.code !== "PGRST116") {
          // PGRST116 = no rows returned
          console.error("Error fetching profile:", error);
          // Use default data if profile fetch fails
          initializeDefaultData();
          return;
        }

        if (profile && profile.progress) {
          // User has existing progress data
          const progressData = profile.progress;
          setModuleProgress(
            progressData.moduleProgress || getDefaultModuleProgress(),
          );
          setUserStats(progressData.userStats || getDefaultUserStats());
          setAchievements(
            progressData.achievements || getDefaultAchievements(),
          );
          setUserProfile({
            id: profile.id,
            email: profile.email,
            username: profile.username,
            progress: progressData,
          });
        } else {
          // New user or no progress data - initialize with defaults
          await initializeNewUserProgress(currentUser);
        }
      } catch (error) {
        console.error("Error initializing user data:", error);
        initializeDefaultData();
      } finally {
        setIsLoading(false);
      }
    };

    const initializeDefaultData = () => {
      setModuleProgress(getDefaultModuleProgress());
      setUserStats(getDefaultUserStats());
      setAchievements(getDefaultAchievements());
    };

    const initializeNewUserProgress = async (currentUser: any) => {
      const defaultModuleProgress = getDefaultModuleProgress();
      const defaultUserStats = getDefaultUserStats();
      const defaultAchievements = getDefaultAchievements();

      const progressData = {
        moduleProgress: defaultModuleProgress,
        userStats: defaultUserStats,
        achievements: defaultAchievements,
      };

      // Update profile with initial progress data
      const { error } = await supabase
        .from("profiles")
        .update({ progress: progressData })
        .eq("id", currentUser.id);

      if (error) {
        console.error("Error updating profile with initial progress:", error);
      }

      setModuleProgress(defaultModuleProgress);
      setUserStats(defaultUserStats);
      setAchievements(defaultAchievements);
      setUserProfile({
        id: currentUser.id,
        email: currentUser.email,
        username: currentUser.user_metadata?.name,
        progress: progressData,
      });
    };

    initializeUserData();

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        setUser(null);
        setUserProfile(null);
        setModuleProgress([]);
        setUserStats(getDefaultUserStats());
        setAchievements([]);
      } else if (event === "SIGNED_IN" && session?.user) {
        initializeUserData();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
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

  // Unauthenticated user fallback UI
  if (!user && !isLoading) {
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
              <div className="flex items-center space-x-2">
                <Link
                  to="/"
                  className="text-xl font-bold hover:text-primary transition-colors"
                >
                  TruckTalk
                </Link>
                <span className="text-xl font-bold text-muted-foreground">
                  /
                </span>
                <h1 className="text-xl font-bold">{t("progress.title")}</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSelector />
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="p-8">
              <div className="mb-6">
                <User className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-2xl font-bold mb-2">
                  Sign In to View Your Progress
                </h2>
                <p className="text-muted-foreground mb-6">
                  Track your learning journey, view completed modules, and earn
                  achievements by signing in to your account.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => navigate("/auth")}
                  className="flex items-center gap-2"
                >
                  <LogIn className="h-4 w-4" />
                  {t("auth.login")}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/auth?signup=true")}
                  className="flex items-center gap-2"
                >
                  <UserPlus className="h-4 w-4" />
                  {t("auth.signup")}
                </Button>
              </div>

              <div className="mt-8 pt-6 border-t">
                <h3 className="font-semibold mb-3">
                  What you'll get with an account:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Track your progress</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Earn achievements</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Save your learning streak</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Resume where you left off</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your progress...</p>
        </div>
      </div>
    );
  }

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
            <div className="flex items-center space-x-2">
              <Link
                to="/"
                className="text-xl font-bold hover:text-primary transition-colors"
              >
                TruckTalk
              </Link>
              <span className="text-xl font-bold text-muted-foreground">/</span>
              <h1 className="text-xl font-bold">{t("progress.title")}</h1>
            </div>
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
                    {user?.user_metadata?.name ||
                      userProfile?.username ||
                      "Truck Driver"}
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
                    <span className="text-xs text-gray-500">
                      {t("progress.dayStreak")}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex flex-col items-center">
                    <Clock className="h-6 w-6 text-primary mb-1" />
                    <span className="text-xl font-bold">
                      {userStats.totalTimeSpent}
                    </span>
                    <span className="text-xs text-gray-500">
                      {t("progress.minutesStudied")}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex flex-col items-center">
                    <Trophy className="h-6 w-6 text-primary mb-1" />
                    <span className="text-xl font-bold">
                      {achievements.filter((a) => a.completed).length}
                    </span>
                    <span className="text-xs text-gray-500">
                      {t("progress.achievements")}
                    </span>
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
                    {completedDialogues} {t("module.of")} {totalDialogues}{" "}
                    {t("module.totalDialogues")} {t("module.completed")}
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
                            {module.completedDialogues} {t("module.of")}{" "}
                            {module.totalDialogues} {t("module.totalDialogues")}
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
                          {t("progress.lastAccessed")}{" "}
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
                            {t("progress.completedOn")}{" "}
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
