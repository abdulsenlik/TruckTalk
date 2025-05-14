import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";
import { useLanguage } from "./LanguageSelector";

interface ModuleCardProps {
  id: string | number;
  title: string;
  description: string;
  completion?: number;
  dialogues?: number;
  image?: string;
  difficulty?: string;
  isLocked?: boolean;
  onClick?: (id: string | number) => void;
}

const ModuleCard = ({
  id,
  title = "Module Title",
  description = "This module covers essential phrases and vocabulary for specific trucking situations.",
  completion = 0,
  dialogues = 5,
  image = "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&q=80",
  difficulty = "beginner",
  isLocked = false,
  onClick,
}: ModuleCardProps) => {
  const { t } = useLanguage();

  const difficultyColors = {
    beginner: "bg-green-100 text-green-800",
    intermediate: "bg-yellow-100 text-yellow-800",
    advanced: "bg-red-100 text-red-800",
  };

  // Normalize difficulty to lowercase for consistent mapping
  const normalizedDifficulty =
    difficulty.toLowerCase() as keyof typeof difficultyColors;

  const difficultyColor =
    difficultyColors[normalizedDifficulty] || difficultyColors.beginner;

  const handleClick = () => {
    if (!isLocked && onClick) {
      onClick(id);
    }
  };

  // Module-specific images based on ID or title
  const getModuleImage = () => {
    // If an image is explicitly provided, use it
    if (
      image !==
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&q=80"
    ) {
      return image;
    }

    // Otherwise, assign images based on module title or ID
    if (typeof id === "number" || !isNaN(Number(id))) {
      switch (Number(id)) {
        case 1: // Basic Greetings & ID Check
          return "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=600&q=80";
        case 2: // Road Signs & Traffic Rules
          return "https://images.unsplash.com/photo-1566143260825-4ceeaed58d26?w=600&q=80";
        case 3: // Dealing with Police/DOT Officers
          return "https://images.unsplash.com/photo-1596394723269-b2cbca4e6e33?w=600&q=80";
        case 4: // Emergency and Accident Situations
          return "https://images.unsplash.com/photo-1635355955841-1b3e5fb67c3a?w=600&q=80";
        case 5: // Border Crossing and Inspection
          return "https://images.unsplash.com/photo-1473445730015-841f29a9490b?w=600&q=80";
        case 6: // Vehicle Maintenance Vocabulary
          return "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=600&q=80";
        default:
          return "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&q=80";
      }
    } else if (title.toLowerCase().includes("greetings")) {
      return "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=600&q=80";
    } else if (
      title.toLowerCase().includes("road signs") ||
      title.toLowerCase().includes("traffic")
    ) {
      return "https://images.unsplash.com/photo-1566143260825-4ceeaed58d26?w=600&q=80";
    } else if (
      title.toLowerCase().includes("police") ||
      title.toLowerCase().includes("dot")
    ) {
      return "https://images.unsplash.com/photo-1596394723269-b2cbca4e6e33?w=600&q=80";
    } else if (
      title.toLowerCase().includes("emergency") ||
      title.toLowerCase().includes("accident")
    ) {
      return "https://images.unsplash.com/photo-1635355955841-1b3e5fb67c3a?w=600&q=80";
    } else if (
      title.toLowerCase().includes("border") ||
      title.toLowerCase().includes("inspection")
    ) {
      return "https://images.unsplash.com/photo-1473445730015-841f29a9490b?w=600&q=80";
    } else if (
      title.toLowerCase().includes("maintenance") ||
      title.toLowerCase().includes("vehicle")
    ) {
      return "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=600&q=80";
    }

    // Default image
    return "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&q=80";
  };

  return (
    <Card
      className={`w-full overflow-hidden transition-all duration-300 hover:shadow-lg ${isLocked ? "opacity-70 cursor-not-allowed" : "cursor-pointer hover:scale-[1.02]"} bg-white`}
      onClick={handleClick}
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={getModuleImage()}
          alt={title}
          className="w-full h-full object-cover"
        />
        {isLocked && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white/90 px-3 py-1 rounded-md text-sm font-medium">
              Premium Content
            </div>
          </div>
        )}
        <div className="absolute top-2 right-2">
          <Badge className={`${difficultyColor} capitalize`}>
            {difficulty}
          </Badge>
        </div>
      </div>

      <CardContent className="pt-4">
        <h3 className="text-lg font-semibold mb-1 line-clamp-1">{title}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{description}</p>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <span>Progress</span>
          <span>{completion}%</span>
        </div>
        <Progress value={completion} className="h-1.5" />
      </CardContent>

      <CardFooter className="pt-0 pb-4 flex items-center text-sm text-gray-600">
        <BookOpen className="h-4 w-4 mr-1" />
        <span>
          {dialogues} {dialogues === 1 ? "dialogue" : "dialogues"}
        </span>
      </CardFooter>
    </Card>
  );
};

export default ModuleCard;
