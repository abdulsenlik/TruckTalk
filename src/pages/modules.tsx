import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Search, Filter } from "lucide-react";
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
import LanguageSelector from "@/components/LanguageSelector";
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
      return "https://images.unsplash.com/photo-1596394723269-b2cbca4e6e33?w=600&q=80";
    case "emergency-situations":
      return "https://images.unsplash.com/photo-1635355955841-1b3e5fb67c3a?w=600&q=80";
    case "basic-greetings":
      return "https://images.unsplash.com/photo-1577368211130-4bbd0181ddf0?w=600&q=80";
    case "road-signs-traffic-rules":
      return "https://images.unsplash.com/photo-1564694457547-80311e2e653a?w=600&q=80";
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
  isLocked: false, // Remove premium firewall
}));

const ModulesPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState("tr");

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
              Back
            </Button>
            <Link
              to="/"
              className="text-xl font-bold hover:text-blue-600 transition-colors"
            >
              TruckTalk
            </Link>
            <span className="text-xl font-bold text-muted-foreground">
              / Learning Modules
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSelector
              selectedLanguage={selectedLanguage}
              onSelectLanguage={setSelectedLanguage}
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search modules..."
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
                  <SelectValue placeholder="Filter by difficulty" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
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
                isLocked={module.isLocked}
                onClick={() => navigate(`/module/${module.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              No modules found matching your search criteria.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ModulesPage;
