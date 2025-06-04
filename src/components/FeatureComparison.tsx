import React from "react";
import { Check, X, Crown, Zap, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useSubscription } from "@/contexts/SubscriptionContext";

interface Feature {
  name: string;
  free: boolean | string;
  pro: boolean | string;
  premium: boolean | string;
  category: "learning" | "practice" | "support" | "advanced";
}

interface FeatureComparisonProps {
  compact?: boolean;
  highlightTier?: "free" | "pro" | "premium";
}

const FeatureComparison: React.FC<FeatureComparisonProps> = ({
  compact = false,
  highlightTier,
}) => {
  const navigate = useNavigate();
  const { currentTier } = useSubscription();

  const features: Feature[] = [
    {
      name: "Learning Modules",
      free: "2 modules",
      pro: "All 12 modules",
      premium: "All 12 modules",
      category: "learning",
    },
    {
      name: "Basic Vocabulary",
      free: true,
      pro: true,
      premium: true,
      category: "learning",
    },
    {
      name: "Emergency Phrases",
      free: true,
      pro: true,
      premium: true,
      category: "learning",
    },
    {
      name: "Interactive Quizzes",
      free: false,
      pro: true,
      premium: true,
      category: "practice",
    },
    {
      name: "Audio Pronunciation",
      free: false,
      pro: true,
      premium: true,
      category: "practice",
    },
    {
      name: "Progress Tracking",
      free: false,
      pro: true,
      premium: true,
      category: "practice",
    },
    {
      name: "AI Conversation Tutor",
      free: false,
      pro: false,
      premium: true,
      category: "advanced",
    },
    {
      name: "Offline Downloads",
      free: false,
      pro: false,
      premium: true,
      category: "advanced",
    },
    {
      name: "Custom Learning Path",
      free: false,
      pro: false,
      premium: true,
      category: "advanced",
    },
    {
      name: "Priority Support",
      free: false,
      pro: false,
      premium: true,
      category: "support",
    },
  ];

  const plans = [
    {
      id: "free",
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started",
      icon: <Star className="h-5 w-5" />,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
    },
    {
      id: "pro",
      name: "Pro",
      price: "$9.99",
      period: "per month",
      description: "Full learning experience",
      icon: <Zap className="h-5 w-5" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      popular: true,
    },
    {
      id: "premium",
      name: "Premium",
      price: "$19.99",
      period: "per month",
      description: "AI-powered learning",
      icon: <Crown className="h-5 w-5" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
  ];

  const renderFeatureValue = (value: boolean | string) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="h-4 w-4 text-green-500 mx-auto" />
      ) : (
        <X className="h-4 w-4 text-gray-300 mx-auto" />
      );
    }
    return <span className="text-sm font-medium">{value}</span>;
  };

  const getCategoryFeatures = (category: string) => {
    return features.filter((f) => f.category === category);
  };

  const categories = [
    { id: "learning", name: "Learning Content", icon: "📚" },
    { id: "practice", name: "Practice Tools", icon: "🎯" },
    { id: "advanced", name: "Advanced Features", icon: "🚀" },
    { id: "support", name: "Support", icon: "💬" },
  ];

  if (compact) {
    return (
      <div className="space-y-6">
        {categories.map((category) => {
          const categoryFeatures = getCategoryFeatures(category.id);
          if (categoryFeatures.length === 0) return null;

          return (
            <div key={category.id} className="space-y-3">
              <h4 className="font-semibold text-sm flex items-center gap-2">
                <span>{category.icon}</span>
                {category.name}
              </h4>
              <div className="grid grid-cols-4 gap-2 text-xs">
                <div className="font-medium">Feature</div>
                <div className="text-center font-medium">Free</div>
                <div className="text-center font-medium">Pro</div>
                <div className="text-center font-medium">Premium</div>

                {categoryFeatures.map((feature, index) => (
                  <React.Fragment key={index}>
                    <div className="py-2">{feature.name}</div>
                    <div className="py-2 text-center">
                      {renderFeatureValue(feature.free)}
                    </div>
                    <div className="py-2 text-center">
                      {renderFeatureValue(feature.pro)}
                    </div>
                    <div className="py-2 text-center">
                      {renderFeatureValue(feature.premium)}
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Plan Headers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const isHighlighted = highlightTier === plan.id;
          const isCurrent = currentTier === plan.id;

          return (
            <Card
              key={plan.id}
              className={`relative ${isHighlighted ? "ring-2 ring-primary shadow-lg" : ""} ${isCurrent ? "border-green-500" : plan.borderColor}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-white px-3 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              {isCurrent && (
                <div className="absolute -top-3 right-4">
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200"
                  >
                    Current Plan
                  </Badge>
                </div>
              )}

              <CardHeader
                className={`text-center ${plan.bgColor} rounded-t-lg`}
              >
                <div className={`${plan.color} mb-2`}>{plan.icon}</div>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="space-y-1">
                  <div className="text-3xl font-bold">{plan.price}</div>
                  <div className="text-sm text-muted-foreground">
                    {plan.period}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </CardHeader>

              <CardContent className="p-4">
                {!isCurrent && (
                  <Button
                    className="w-full"
                    variant={plan.id === "free" ? "outline" : "default"}
                    onClick={() => navigate("/pricing")}
                    disabled={plan.id === "free"}
                  >
                    {plan.id === "free"
                      ? "Current Plan"
                      : `Upgrade to ${plan.name}`}
                  </Button>
                )}
                {isCurrent && (
                  <Button className="w-full" variant="outline" disabled>
                    Current Plan
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Feature Comparison Table */}
      <div className="space-y-6">
        {categories.map((category) => {
          const categoryFeatures = getCategoryFeatures(category.id);
          if (categoryFeatures.length === 0) return null;

          return (
            <Card key={category.id}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span>{category.icon}</span>
                  {category.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 font-medium">Feature</th>
                        <th className="text-center py-3 font-medium w-24">
                          Free
                        </th>
                        <th className="text-center py-3 font-medium w-24">
                          Pro
                        </th>
                        <th className="text-center py-3 font-medium w-24">
                          Premium
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {categoryFeatures.map((feature, index) => (
                        <tr
                          key={index}
                          className="border-b border-gray-100 hover:bg-gray-50"
                        >
                          <td className="py-3 font-medium">{feature.name}</td>
                          <td className="py-3 text-center">
                            {renderFeatureValue(feature.free)}
                          </td>
                          <td className="py-3 text-center">
                            {renderFeatureValue(feature.pro)}
                          </td>
                          <td className="py-3 text-center">
                            {renderFeatureValue(feature.premium)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default FeatureComparison;
