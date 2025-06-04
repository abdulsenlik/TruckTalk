import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, X, Crown, Zap, Star, Sparkles } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "./LanguageSelector";
import { supabase } from "@/lib/supabase";
import { useSubscription } from "@/contexts/SubscriptionContext";
import CheckoutButton from "./CheckoutButton";

interface PlanFeature {
  name: string;
  included: boolean | string;
  highlight?: boolean;
}

interface SubscriptionPlan {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  period: string;
  description: string;
  features: PlanFeature[];
  buttonText: string;
  popular?: boolean;
  recommended?: boolean;
  icon: React.ReactNode;
  color: string;
  savings?: string;
}

const SubscriptionPlans = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { currentTier, isLoading: subscriptionLoading } = useSubscription();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      const { data } = await supabase.auth.getUser();
      setUser(data?.user || null);
      setLoading(false);
    };

    getUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSubscribe = async (planId: string) => {
    if (planId === "free") return;

    const { data: session } = await supabase.auth.getSession();

    if (!session?.session) {
      // Not logged in, redirect to auth page
      navigate("/auth");
      return;
    }

    // Navigate to pricing page for checkout
    navigate("/pricing");
  };

  const plans: SubscriptionPlan[] = [
    {
      id: "free",
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started with basic English phrases",
      icon: <Star className="h-6 w-6" />,
      color: "text-gray-600",
      features: [
        { name: "Access to 2 learning modules", included: true },
        { name: "Basic vocabulary (50+ words)", included: true },
        { name: "Emergency phrases", included: true },
        { name: "Basic dialogues", included: true },
        { name: "Interactive quizzes", included: false },
        { name: "Audio pronunciation", included: false },
        { name: "Progress tracking", included: false },
        { name: "AI conversation tutor", included: false },
        { name: "Offline downloads", included: false },
      ],
      buttonText: currentTier === "free" ? "Current Plan" : "Get Started",
    },
    {
      id: "pro",
      name: "Pro",
      price: "$9.99",
      period: "per month",
      description: "Complete learning experience with all lessons and quizzes",
      icon: <Zap className="h-6 w-6" />,
      color: "text-blue-600",
      features: [
        { name: "All 12 learning modules", included: true, highlight: true },
        { name: "Complete vocabulary (500+ words)", included: true },
        { name: "All dialogues and scenarios", included: true },
        {
          name: "Interactive quizzes & assessments",
          included: true,
          highlight: true,
        },
        { name: "Native audio pronunciation", included: true, highlight: true },
        { name: "Detailed progress tracking", included: true, highlight: true },
        { name: "Achievement system", included: true },
        { name: "AI conversation tutor", included: false },
        { name: "Offline downloads", included: false },
      ],
      buttonText: currentTier === "pro" ? "Current Plan" : "Upgrade to Pro",
      popular: true,
    },
    {
      id: "premium",
      name: "Premium",
      price: "$19.99",
      originalPrice: "$24.99",
      period: "per month",
      description:
        "AI-powered learning with personalized tutoring and offline access",
      icon: <Crown className="h-6 w-6" />,
      color: "text-purple-600",
      savings: "Save $5/month",
      features: [
        { name: "Everything in Pro", included: true },
        { name: "AI conversation tutor", included: true, highlight: true },
        { name: "Personalized learning path", included: true, highlight: true },
        { name: "Offline downloads", included: true, highlight: true },
        { name: "Priority customer support", included: true },
        {
          name: "Advanced pronunciation analysis",
          included: true,
          highlight: true,
        },
        { name: "Custom practice scenarios", included: true },
        { name: "Weekly progress reports", included: true },
        { name: "Early access to new features", included: true },
      ],
      buttonText: currentTier === "premium" ? "Current Plan" : "Go Premium",
      recommended: true,
    },
  ];

  // Show loading state
  if (loading || subscriptionLoading) {
    return (
      <div className="py-12 bg-gray-50 flex justify-center items-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Choose Your Learning Journey
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Master essential English for truck drivers with our comprehensive
            learning platform. Start free and upgrade as you progress.
          </p>

          {currentTier !== "free" && (
            <div className="mt-4">
              <Badge
                variant="outline"
                className="bg-green-50 text-green-700 border-green-200"
              >
                <Sparkles className="h-3 w-3 mr-1" />
                You're currently on the{" "}
                <span className="font-semibold capitalize">
                  {currentTier}
                </span>{" "}
                plan
              </Badge>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => {
            const isCurrent = currentTier === plan.id;
            const isUpgrade =
              (currentTier === "free" && plan.id !== "free") ||
              (currentTier === "pro" && plan.id === "premium");

            return (
              <Card
                key={plan.id}
                className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
                  plan.popular
                    ? "border-2 border-blue-500 shadow-lg scale-105"
                    : plan.recommended
                      ? "border-2 border-purple-500 shadow-lg"
                      : isCurrent
                        ? "border-2 border-green-500 shadow-md"
                        : "border border-gray-200 hover:border-gray-300"
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-blue-500 text-white px-4 py-1 text-sm font-semibold">
                      🔥 Most Popular
                    </Badge>
                  </div>
                )}

                {/* Recommended Badge */}
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-purple-500 text-white px-4 py-1 text-sm font-semibold">
                      ⭐ Recommended
                    </Badge>
                  </div>
                )}

                {/* Current Plan Badge */}
                {isCurrent && (
                  <div className="absolute -top-3 right-4 z-10">
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200"
                    >
                      Current Plan
                    </Badge>
                  </div>
                )}

                {/* Savings Badge */}
                {plan.savings && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-orange-500 text-white text-xs">
                      {plan.savings}
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div className={`${plan.color} mb-3 flex justify-center`}>
                    {plan.icon}
                  </div>
                  <CardTitle className="text-2xl font-bold">
                    {plan.name}
                  </CardTitle>
                  <div className="space-y-1">
                    <div className="flex items-center justify-center gap-2">
                      {plan.originalPrice && (
                        <span className="text-lg text-gray-400 line-through">
                          {plan.originalPrice}
                        </span>
                      )}
                      <span className="text-4xl font-bold">{plan.price}</span>
                    </div>
                    <div className="text-sm text-gray-500">{plan.period}</div>
                  </div>
                  <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                    {plan.description}
                  </p>
                </CardHeader>

                <CardContent className="space-y-4 px-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        {feature.included ? (
                          <Check
                            className={`h-5 w-5 mt-0.5 shrink-0 ${
                              feature.highlight
                                ? "text-primary"
                                : "text-green-500"
                            }`}
                          />
                        ) : (
                          <X className="h-5 w-5 mt-0.5 text-gray-300 shrink-0" />
                        )}
                        <span
                          className={`text-sm leading-relaxed ${
                            feature.included
                              ? feature.highlight
                                ? "text-gray-900 font-medium"
                                : "text-gray-700"
                              : "text-gray-400"
                          }`}
                        >
                          {typeof feature.included === "string"
                            ? feature.included
                            : feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="px-6 pb-6">
                  {isCurrent ? (
                    <Button className="w-full" variant="outline" disabled>
                      <Check className="h-4 w-4 mr-2" />
                      Current Plan
                    </Button>
                  ) : plan.id === "free" ? (
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={() => handleSubscribe(plan.id)}
                    >
                      Get Started Free
                    </Button>
                  ) : (
                    <div className="w-full space-y-2">
                      <CheckoutButton
                        priceId={
                          plan.id === "pro" ? "price_pro" : "price_premium"
                        }
                        buttonText={plan.buttonText}
                        className={`w-full ${
                          plan.popular
                            ? "bg-blue-600 hover:bg-blue-700"
                            : plan.recommended
                              ? "bg-purple-600 hover:bg-purple-700"
                              : ""
                        }`}
                        customerEmail={user?.email}
                      />
                      {isUpgrade && (
                        <p className="text-xs text-center text-gray-500">
                          {currentTier === "free"
                            ? "Upgrade from Free"
                            : "Upgrade from Pro"}
                        </p>
                      )}
                    </div>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 text-center">
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>30-day money-back guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>Secure payment</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>Instant access</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
