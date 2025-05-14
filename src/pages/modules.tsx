import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const modules = [
  {
    id: 1,
    title: "Basic Greetings & ID Check",
    description:
      "Learn essential phrases for introducing yourself and handling ID verification during traffic stops.",
    dialogues: 6,
    completion: 0,
    image:
      "https://images.unsplash.com/photo-1577368211130-4bbd0181ddf0?w=600&q=80",
    difficulty: "Beginner",
  },
  {
    id: 2,
    title: "Road Signs & Traffic Rules",
    description:
      "Understand common road signs, traffic rules, and how to explain your actions to officers.",
    dialogues: 8,
    completion: 0,
    image:
      "https://images.unsplash.com/photo-1564694457547-80311e2e653a?w=600&q=80",
    difficulty: "Beginner",
  },
  {
    id: 3,
    title: "Dealing with Police/DOT Officers",
    description:
      "Learn how to communicate effectively with law enforcement and DOT officials during inspections.",
    dialogues: 10,
    completion: 0,
    image:
      "https://images.unsplash.com/photo-1589578527966-fdac0f44566c?w=600&q=80",
    difficulty: "Intermediate",
    isLocked: true,
  },
  {
    id: 4,
    title: "Emergency and Accident Situations",
    description:
      "Essential vocabulary and phrases for handling roadside emergencies and accidents.",
    dialogues: 7,
    completion: 0,
    image:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=80",
    difficulty: "Intermediate",
    isLocked: true,
  },
  {
    id: 5,
    title: "Border Crossing and Inspection",
    description:
      "Communication skills for border crossings, customs, and international transport documentation.",
    dialogues: 9,
    completion: 0,
    image:
      "https://images.unsplash.com/photo-1631248055158-edec7a3c072b?w=600&q=80",
    difficulty: "Advanced",
    isLocked: true,
  },
  {
    id: 6,
    title: "Vehicle Maintenance Vocabulary",
    description:
      "Learn terms related to truck parts, maintenance issues, and repair conversations.",
    dialogues: 8,
    completion: 0,
    image:
      "https://images.unsplash.com/photo-1599256872237-5dcc0fbe9668?w=600&q=80",
    difficulty: "Advanced",
    isLocked: true,
  },
  {
    id: 7,
    title: "Cargo Documentation",
    description:
      "Vocabulary for discussing cargo manifests, bills of lading, and other shipping documents.",
    dialogues: 6,
    completion: 0,
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80",
    difficulty: "Intermediate",
    isLocked: true,
  },
  {
    id: 8,
    title: "Weather Conditions & Road Safety",
    description:
      "Essential phrases for discussing weather conditions, road hazards, and safety precautions.",
    dialogues: 7,
    completion: 0,
    image:
      "https://images.unsplash.com/photo-1520095972714-909e91b038e5?w=600&q=80",
    difficulty: "Beginner",
    isLocked: true,
  },
];

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
            <h1 className="text-xl font-bold">Learning Modules</h1>
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
