import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useLanguage } from "./LanguageSelector";
import AudioButton from "./AudioButton";

interface VocabularyCardProps {
  word: string;
  translation: {
    tr: string;
    kg: string;
    ru: string;
  };
  definition: string;
  example?: string;
  onMastered?: (word: string) => void;
}

const VocabularyCard = ({
  word,
  translation,
  definition,
  example,
  onMastered,
}: VocabularyCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMastered, setIsMastered] = useState(false);
  const { language } = useLanguage();

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleMastered = () => {
    setIsMastered(true);
    if (onMastered) {
      onMastered(word);
    }
  };

  const currentTranslation =
    translation[language as keyof typeof translation] || translation.tr;

  return (
    <div className={`perspective-1000 ${isMastered ? "opacity-60" : ""}`}>
      <Card
        className={`w-full h-full transition-transform duration-500 transform-style-preserve-3d cursor-pointer ${isFlipped ? "rotate-y-180" : ""} ${isMastered ? "border-green-200 bg-green-50" : ""}`}
        onClick={handleFlip}
      >
        {/* Front of card */}
        <div
          className={`absolute w-full h-full backface-hidden ${isFlipped ? "invisible" : ""}`}
        >
          <CardContent className="p-4 h-full flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg">{word}</h3>
                <AudioButton
                  text={word}
                  className="h-8 w-8 p-0"
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                />
              </div>

              <p className="text-sm text-muted-foreground">
                Click to see translation and definition
              </p>
            </div>
            <div className="flex justify-between items-center mt-4">
              <span className="text-xs text-muted-foreground">
                Trucking Vocabulary
              </span>
              <Button
                variant={isMastered ? "default" : "outline"}
                size="sm"
                className={`h-8 ${isMastered ? "bg-green-600 hover:bg-green-700" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleMastered();
                }}
              >
                <Check className="h-3 w-3 mr-1" />
                {isMastered ? "Mastered" : "Mark as Mastered"}
              </Button>
            </div>
          </CardContent>
        </div>

        {/* Back of card */}
        <div
          className={`absolute w-full h-full backface-hidden rotate-y-180 ${isFlipped ? "" : "invisible"}`}
        >
          <CardContent className="p-4 h-full flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg text-primary">
                  {currentTranslation}
                </h3>
                <AudioButton
                  text={word}
                  className="h-8 w-8 p-0"
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                />
              </div>
              <p className="text-sm font-medium mb-2">{word}</p>
              <p className="text-sm text-muted-foreground mb-2">{definition}</p>
              {example && (
                <p className="text-xs italic text-muted-foreground">
                  Example: {example}
                </p>
              )}
            </div>
            <div className="flex justify-between items-center mt-4">
              <span className="text-xs text-muted-foreground">
                Click to flip back
              </span>
              <Button
                variant={isMastered ? "default" : "outline"}
                size="sm"
                className={`h-8 ${isMastered ? "bg-green-600 hover:bg-green-700" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleMastered();
                }}
              >
                <Check className="h-3 w-3 mr-1" />
                {isMastered ? "Mastered" : "Mark as Mastered"}
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default VocabularyCard;
