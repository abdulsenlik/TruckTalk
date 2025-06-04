import React from "react";
import { Lock, Crown, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { useNavigate } from "react-router-dom";

interface SubscriptionGateProps {
  feature:
    | "quizzes"
    | "audio_pronunciation"
    | "progress_tracking"
    | "ai_tutor"
    | "offline_downloads";
  requiredTier: "pro" | "premium";
  children: React.ReactNode;
  fallback?: React.ReactNode;
  showUpgrade?: boolean;
}

const SubscriptionGate: React.FC<SubscriptionGateProps> = ({
  feature,
  requiredTier,
  children,
  fallback,
  showUpgrade = true,
}) => {
  const { currentTier, canAccessFeature, showUpgradeModal } = useSubscription();
  const navigate = useNavigate();

  const hasAccess = canAccessFeature(feature as any);

  if (hasAccess) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  const getFeatureInfo = () => {
    switch (feature) {
      case "quizzes":
        return {
          title: "Interactive Quizzes",
          description:
            "Test your knowledge with comprehensive quizzes and get instant feedback.",
          icon: <Zap className="h-6 w-6 text-yellow-500" />,
        };
      case "audio_pronunciation":
        return {
          title: "Audio Pronunciation",
          description:
            "Listen to native pronunciation for all phrases and vocabulary.",
          icon: <Crown className="h-6 w-6 text-blue-500" />,
        };
      case "progress_tracking":
        return {
          title: "Progress Tracking",
          description:
            "Track your learning journey with detailed analytics and insights.",
          icon: <Crown className="h-6 w-6 text-green-500" />,
        };
      case "ai_tutor":
        return {
          title: "AI Conversation Tutor",
          description:
            "Practice conversations with our AI-powered tutor for personalized feedback.",
          icon: <Crown className="h-6 w-6 text-purple-500" />,
        };
      case "offline_downloads":
        return {
          title: "Offline Downloads",
          description:
            "Download lessons and practice materials for learning on the go.",
          icon: <Crown className="h-6 w-6 text-orange-500" />,
        };
      default:
        return {
          title: "Premium Feature",
          description: "This feature requires a premium subscription.",
          icon: <Lock className="h-6 w-6 text-gray-500" />,
        };
    }
  };

  const featureInfo = getFeatureInfo();
  const isProFeature = requiredTier === "pro";

  return (
    <Card className="border-2 border-dashed border-gray-300 bg-gray-50/50">
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-3">{featureInfo.icon}</div>
        <CardTitle className="text-lg flex items-center justify-center gap-2">
          <Lock className="h-4 w-4" />
          {featureInfo.title}
        </CardTitle>
        <Badge
          variant="outline"
          className={`mx-auto ${isProFeature ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-purple-50 text-purple-700 border-purple-200"}`}
        >
          {isProFeature ? "Pro Feature" : "Premium Feature"}
        </Badge>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <p className="text-sm text-muted-foreground">
          {featureInfo.description}
        </p>

        {showUpgrade && (
          <div className="space-y-2">
            <Button
              onClick={() => showUpgradeModal(feature)}
              className="w-full"
              size="sm"
            >
              <Crown className="h-4 w-4 mr-2" />
              Upgrade to {isProFeature ? "Pro" : "Premium"}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/pricing")}
              className="w-full text-xs"
            >
              View All Plans
            </Button>
          </div>
        )}

        <p className="text-xs text-muted-foreground">
          You're currently on the{" "}
          <strong className="capitalize">{currentTier}</strong> plan
        </p>
      </CardContent>
    </Card>
  );
};

export default SubscriptionGate;
