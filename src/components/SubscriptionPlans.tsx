import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLanguage } from "./LanguageSelector";
import { supabase } from "@/lib/supabase";

interface PlanFeature {
  name: string;
  included: boolean;
}

interface SubscriptionPlan {
  id: string;
  name: string;
  price: string;
  description: string;
  features: PlanFeature[];
  buttonText: string;
  popular?: boolean;
}

const SubscriptionPlans = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
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
    const { data: session } = await supabase.auth.getSession();

    if (!session?.session) {
      // Not logged in, redirect to auth page
      navigate("/auth");
      return;
    }

    // For now, just navigate to success page
    // In a real implementation, this would create a checkout session
    navigate("/success");
  };

  const plans: SubscriptionPlan[] = [
    {
      id: "free",
      name: "Free",
      price: "$0",
      description: "Basic access to get started",
      features: [
        { name: "Access to first 2 modules", included: true },
        { name: "Basic vocabulary practice", included: true },
        { name: "Limited dialogues", included: true },
        { name: "Emergency phrases", included: true },
        { name: "Progress tracking", included: false },
        { name: "Audio pronunciation", included: false },
        { name: "Offline access", included: false },
      ],
      buttonText: "Current Plan",
    },
    {
      id: "basic",
      name: "Basic",
      price: "$4.99",
      description: "Full access to all learning content",
      features: [
        { name: "Access to all 6 modules", included: true },
        { name: "Complete vocabulary lists", included: true },
        { name: "All dialogues", included: true },
        { name: "Emergency phrases", included: true },
        { name: "Progress tracking", included: true },
        { name: "Audio pronunciation", included: true },
        { name: "Offline access", included: false },
      ],
      buttonText: "Subscribe",
      popular: true,
    },
    {
      id: "premium",
      name: "Premium",
      price: "$9.99",
      description: "Enhanced learning experience",
      features: [
        { name: "Access to all 6 modules", included: true },
        { name: "Complete vocabulary lists", included: true },
        { name: "All dialogues", included: true },
        { name: "Emergency phrases", included: true },
        { name: "Progress tracking", included: true },
        { name: "Audio pronunciation", included: true },
        { name: "AI speaking coach", included: true },
        { name: "Downloadable content", included: true },
        { name: "Offline access", included: true },
      ],
      buttonText: "Subscribe",
    },
  ];

  // If user is logged in, don't show subscription plans
  if (user && !loading) {
    return null;
  }

  // Show loading state
  if (loading) {
    return (
      <div className="py-12 bg-gray-50 flex justify-center items-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">{t("subscription.title")}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t("subscription.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative overflow-hidden ${plan.popular ? "border-primary shadow-lg" : ""}`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">
                  {t("subscription.mostPopular") || "Most Popular"}
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-gray-500 ml-1">
                    {t("subscription.perMonth") || "/month"}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-2">{plan.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      ) : (
                        <X className="h-5 w-5 text-gray-300 mr-2 shrink-0" />
                      )}
                      <span
                        className={`text-sm ${feature.included ? "text-gray-700" : "text-gray-400"}`}
                      >
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className={`w-full ${plan.id === "free" ? "bg-gray-200 hover:bg-gray-300 text-gray-700" : ""}`}
                  variant={plan.id === "free" ? "outline" : "default"}
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={plan.id === "free"}
                >
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
