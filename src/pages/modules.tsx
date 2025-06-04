import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Search, Filter, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ModuleCard from "@/components/ModuleCard";
import LanguageSelector, { useLanguage } from "@/components/LanguageSelector";
import InAppReminder from "@/components/InAppReminder";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { trafficStopCourse } from "@/data/trafficStopCourse";

// Helper function to get appropriate image for each section
function getImageForSection(sectionId: string): string {
  switch (sectionId) {
    case "initial-stop":
      return "https://images.unsplash.com/photo-1617906855223-a69f14c9841d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    case "document-check":
      return "https://images.unsplash.com/photo-1631651693480-97f1132e333d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    case "vehicle-inspection":
      return "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=600&q=80";
    case "explaining-situations":
      return "https://images.unsplash.com/photo-1589578527966-fdac0f44566c?w=600&q=80";
    case "citations-and-tickets":
      return "https://www.consumercoverage.com/wp-content/uploads/2023/03/Difference-Between-Citation-And-Ticket.jpg";
    case "emergency-situations":
      return "https://domf5oio6qrcr.cloudfront.net/medialibrary/12642/conversions/bd3a86d1-cab1-49f5-8b13-5ba9529203c6-thumb.jpg";
    case "basic-greetings":
      return "https://images.unsplash.com/photo-1577368211130-4bbd0181ddf0?w=600&q=80";
    case "road-signs-traffic-rules":
      return "https://www.accuform.com/files/damObject/Image/huge/TrafficSigns2.jpg";
    case "border-crossing":
      return "https://images.unsplash.com/photo-1631248055158-edec7a3c072b?w=600&q=80";
    case "vehicle-maintenance":
      return "https://images.unsplash.com/photo-1599256872237-5dcc0fbe9668?w=600&q=80";
    case "cargo-documentation":
      return "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80";
    case "weather-road-safety":
      return "https://images.unsplash.com/photo-1520095972714-909e91b038e5?w=600&q=80";
    default:
      return "https://images.unsplash.com/photo-1590496793929-36417d3117de?w=600&q=80";
  }
}

// Convert traffic stop course data to module format
const modules = trafficStopCourse.map((section, index) => ({
  id: section.id,
  title: section.title,
  description: section.description,
  dialogues: section.dialogues.length,
  completion: 0,
  image: getImageForSection(section.id),
  difficulty: index < 3 ? "Beginner" : index < 7 ? "Intermediate" : "Advanced",
  isLocked: index >= 2, // Lock modules beyond the first 2 for free users
  requiredTier: index >= 2 ? "pro" : "free",
}));

const ModulesPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { currentTier, features, showUpgradeModal } = useSubscription();
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [showReminder, setShowReminder] = useState(true);

  const handleModuleClick = (module: any) => {
    if (module.isLocked && currentTier === "free") {
      showUpgradeModal("All Modules Access");
      return;
    }
    navigate(`/module/${module.id}`);
  };

  const filteredModules = modules.filter((module) => {
    const matchesSearch = module.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesDifficulty =
      difficultyFilter === "all" ||
      module.difficulty.toLowerCase() === difficultyFilter.toLowerCase();
    return matchesSearch && matchesDifficulty;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
              <ArrowLeft className="h-5 w-5 mr-2" />
              {t("button.back")}
            </Button>
            <Link
              to="/"
              className="text-xl font-bold hover:text-blue-600 transition-colors"
            >
              TruckTalk
            </Link>
            <span className="text-xl font-bold text-muted-foreground">
              / {t("nav.modules")}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSelector />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Subscription Status & Reminder */}
        {currentTier === "free" && showReminder && (
          <div className="mb-6">
            <InAppReminder
              trigger="module_progress"
              onDismiss={() => setShowReminder(false)}
            />
          </div>
        )}

        {/* Plan Status */}
        <div className="bg-gradient-to-r from-primary/5 to-purple-500/5 rounded-lg p-4 mb-8 border border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg capitalize">
                {currentTier} Plan
              </h3>
              <p className="text-sm text-muted-foreground">
                {currentTier === "free"
                  ? `Access to ${features.maxModules} modules • Upgrade for full access`
                  : currentTier === "pro"
                    ? "Full access to all modules and quizzes"
                    : "Premium access with AI tutor and offline downloads"}
              </p>
            </div>
            {currentTier !== "premium" && (
              <Button
                onClick={() => navigate("/pricing")}
                size="sm"
                className="bg-gradient-to-r from-primary to-purple-600"
              >
                <Crown className="h-4 w-4 mr-2" />
                Upgrade
              </Button>
            )}
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder={t("modules.search") || "Search modules..."}
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="w-full md:w-64">
            <Select
              value={difficultyFilter}
              onValueChange={setDifficultyFilter}
            >
              <SelectTrigger className="w-full">
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue
                    placeholder={
                      t("modules.filterByDifficulty") || "Filter by difficulty"
                    }
                  />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  {t("modules.allLevels") || "All Levels"}
                </SelectItem>
                <SelectItem value="beginner">
                  {t("modules.beginner") || "Beginner"}
                </SelectItem>
                <SelectItem value="intermediate">
                  {t("modules.intermediate") || "Intermediate"}
                </SelectItem>
                <SelectItem value="advanced">
                  {t("modules.advanced") || "Advanced"}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Module Grid */}
        {filteredModules.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredModules.map((module) => (
              <ModuleCard
                key={module.id}
                id={module.id}
                title={module.title}
                description={module.description}
                dialogues={module.dialogues}
                completion={module.completion}
                image={module.image}
                difficulty={module.difficulty}
                isLocked={module.isLocked && currentTier === "free"}
                onClick={() => handleModuleClick(module)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              {t("modules.noResults") ||
                "No modules found matching your search criteria."}
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ModulesPage;
