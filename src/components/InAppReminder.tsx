import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crown, X, TrendingUp, Zap, Star, ArrowRight } from "lucide-react";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { useLanguage } from "./LanguageSelector";

interface InAppReminderProps {
  trigger?:
    | "lesson_complete"
    | "module_progress"
    | "feature_limit"
    | "streak_milestone";
  onDismiss?: () => void;
  className?: string;
}

const InAppReminder: React.FC<InAppReminderProps> = ({
  trigger = "feature_limit",
  onDismiss,
  className = "",
}) => {
  const navigate = useNavigate();
  const { currentTier } = useSubscription();
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);
  const [reminderData, setReminderData] = useState<any>(null);

  useEffect(() => {
    // Don't show reminders for premium users
    if (currentTier === "premium") {
      setIsVisible(false);
      return;
    }

    const getReminderData = () => {
      switch (trigger) {
        case "lesson_complete":
          return {
            icon: <Star className="h-5 w-5 text-yellow-500" />,
            title: "Great Progress!",
            message:
              currentTier === "free"
                ? "Unlock all lessons and track your progress with Pro!"
                : "Get AI tutoring and offline downloads with Premium!",
            cta:
              currentTier === "free" ? "Upgrade to Pro" : "Upgrade to Premium",
            variant: "success" as const,
            showAfterDelay: 2000,
          };
        case "module_progress":
          return {
            icon: <TrendingUp className="h-5 w-5 text-blue-500" />,
            title: "You're on fire! 🔥",
            message:
              currentTier === "free"
                ? "You've completed 2 modules. Unlock all 12 modules with Pro!"
                : "Supercharge your learning with AI tutoring and offline access!",
            cta: currentTier === "free" ? "Get Full Access" : "Go Premium",
            variant: "info" as const,
            showAfterDelay: 1000,
          };
        case "feature_limit":
          return {
            icon: <Crown className="h-5 w-5 text-purple-500" />,
            title: "Unlock More Features",
            message:
              currentTier === "free"
                ? "Get quizzes, progress tracking, and audio pronunciation!"
                : "Add AI tutoring and offline downloads to your toolkit!",
            cta: "See Plans",
            variant: "upgrade" as const,
            showAfterDelay: 0,
          };
        case "streak_milestone":
          return {
            icon: <Zap className="h-5 w-5 text-orange-500" />,
            title: "7-Day Streak! 🎉",
            message:
              "You're committed to learning! Unlock premium features to accelerate your progress.",
            cta: "Claim Reward",
            variant: "celebration" as const,
            showAfterDelay: 1500,
          };
        default:
          return null;
      }
    };

    const data = getReminderData();
    if (data) {
      setReminderData(data);

      if (data.showAfterDelay > 0) {
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, data.showAfterDelay);

        return () => clearTimeout(timer);
      }
    }
  }, [trigger, currentTier]);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  const handleUpgrade = () => {
    navigate("/pricing");
    handleDismiss();
  };

  if (!isVisible || !reminderData || currentTier === "premium") {
    return null;
  }

  const getVariantStyles = () => {
    switch (reminderData.variant) {
      case "success":
        return "border-green-200 bg-green-50";
      case "info":
        return "border-blue-200 bg-blue-50";
      case "upgrade":
        return "border-purple-200 bg-purple-50";
      case "celebration":
        return "border-orange-200 bg-orange-50";
      default:
        return "border-gray-200 bg-gray-50";
    }
  };

  return (
    <Card className={`${getVariantStyles()} border-2 shadow-lg ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className="bg-white rounded-full p-2 shadow-sm">
              {reminderData.icon}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-sm">{reminderData.title}</h4>
              <p className="text-xs text-muted-foreground mt-1">
                {reminderData.message}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 ml-4">
            <Button
              size="sm"
              onClick={handleUpgrade}
              className="text-xs px-3 py-1 h-auto"
            >
              {reminderData.cta}
              <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDismiss}
              className="h-6 w-6"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InAppReminder;
