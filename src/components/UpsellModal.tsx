import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Crown,
  Zap,
  Download,
  BarChart3,
  MessageSquare,
  Headphones,
  X,
  Sparkles,
} from "lucide-react";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { useLanguage } from "./LanguageSelector";

interface UpsellModalProps {
  open: boolean;
  onClose: () => void;
  feature: string;
}

const UpsellModal: React.FC<UpsellModalProps> = ({
  open,
  onClose,
  feature,
}) => {
  const navigate = useNavigate();
  const { currentTier } = useSubscription();
  const { t } = useLanguage();

  const getFeatureInfo = (featureName: string) => {
    switch (featureName.toLowerCase()) {
      case "ai tutor":
      case "ai_tutor":
        return {
          icon: <MessageSquare className="h-8 w-8 text-purple-500" />,
          title: "AI Tutor",
          description:
            "Get personalized feedback and practice with our AI-powered conversation partner.",
          requiredTier: "premium",
          benefits: [
            "Real-time conversation practice",
            "Personalized feedback on pronunciation",
            "Adaptive learning based on your progress",
            "Available 24/7 for practice sessions",
          ],
        };
      case "offline downloads":
      case "offline_downloads":
        return {
          icon: <Download className="h-8 w-8 text-green-500" />,
          title: "Offline Downloads",
          description:
            "Download lessons and practice materials for learning on the go without internet.",
          requiredTier: "premium",
          benefits: [
            "Download all lessons for offline use",
            "Access audio files without internet",
            "Practice anywhere, anytime",
            "Save mobile data while learning",
          ],
        };
      case "progress tracking":
      case "progress_tracking":
        return {
          icon: <BarChart3 className="h-8 w-8 text-blue-500" />,
          title: "Advanced Progress Tracking",
          description:
            "Track your learning journey with detailed analytics and insights.",
          requiredTier: "pro",
          benefits: [
            "Detailed learning analytics",
            "Progress streaks and achievements",
            "Performance insights",
            "Goal setting and tracking",
          ],
        };
      case "audio pronunciation":
      case "audio_pronunciation":
        return {
          icon: <Headphones className="h-8 w-8 text-orange-500" />,
          title: "Audio Pronunciation",
          description:
            "Listen to native pronunciation for all phrases and vocabulary.",
          requiredTier: "pro",
          benefits: [
            "Native speaker audio for all content",
            "Pronunciation practice tools",
            "Audio playback controls",
            "Multiple accent options",
          ],
        };
      case "quizzes":
        return {
          icon: <Zap className="h-8 w-8 text-yellow-500" />,
          title: "Interactive Quizzes",
          description:
            "Test your knowledge with comprehensive quizzes and assessments.",
          requiredTier: "pro",
          benefits: [
            "Interactive knowledge tests",
            "Immediate feedback",
            "Progress validation",
            "Spaced repetition system",
          ],
        };
      default:
        return {
          icon: <Crown className="h-8 w-8 text-primary" />,
          title: "Premium Feature",
          description: "Unlock this feature with a premium subscription.",
          requiredTier: "premium",
          benefits: [
            "Access to all premium features",
            "Enhanced learning experience",
            "Priority customer support",
            "Regular feature updates",
          ],
        };
    }
  };

  const featureInfo = getFeatureInfo(feature);
  const isProUpgrade = featureInfo.requiredTier === "pro";

  const handleUpgrade = () => {
    navigate("/pricing");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {featureInfo.icon}
              <div>
                <DialogTitle className="text-xl">
                  {featureInfo.title}
                </DialogTitle>
                <Badge
                  variant="outline"
                  className={`mt-1 ${isProUpgrade ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-purple-50 text-purple-700 border-purple-200"}`}
                >
                  {isProUpgrade ? "Pro Feature" : "Premium Feature"}
                </Badge>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription className="text-base mt-4">
            {featureInfo.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-6">
          <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              What you'll get:
            </h4>
            <ul className="space-y-2">
              {featureInfo.benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <Button onClick={handleUpgrade} className="w-full" size="lg">
              <Crown className="h-4 w-4 mr-2" />
              Upgrade to {isProUpgrade ? "Pro" : "Premium"}
            </Button>
            <Button variant="outline" onClick={onClose} className="w-full">
              Maybe Later
            </Button>
          </div>

          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              {currentTier === "free" ? (
                <>
                  You're currently on the <strong>Free</strong> plan
                </>
              ) : (
                <>
                  You're currently on the{" "}
                  <strong className="capitalize">{currentTier}</strong> plan
                </>
              )}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpsellModal;
