import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Globe,
  Menu,
  X,
  Users,
  Award,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LanguageSelector, { useLanguage } from "@/components/LanguageSelector";
import UserAuthButton from "@/components/UserAuthButton";
import SubscriptionPlans from "@/components/SubscriptionPlans";
import FeatureComparison from "@/components/FeatureComparison";
import { useSubscription } from "@/contexts/SubscriptionContext";

const PricingPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { currentTier } = useSubscription();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("plans");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Globe className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">TruckTalk</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="text-sm font-medium hover:text-primary"
            >
              {t("nav.home")}
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/modules")}
              className="text-sm font-medium hover:text-primary"
            >
              {t("nav.modules")}
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/progress")}
              className="text-sm font-medium hover:text-primary"
            >
              {t("nav.progress")}
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/emergency")}
              className="text-sm font-medium hover:text-primary"
            >
              {t("nav.emergency")}
            </Button>
            <Button
              variant="ghost"
              className="text-sm font-medium text-primary border-b-2 border-primary"
            >
              {t("nav.pricing")}
            </Button>
            <div className="flex items-center gap-2">
              <LanguageSelector />
              <UserAuthButton />
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="container md:hidden py-4 flex flex-col gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="text-sm font-medium hover:text-primary text-left justify-start"
            >
              {t("nav.home")}
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/modules")}
              className="text-sm font-medium hover:text-primary text-left justify-start"
            >
              {t("nav.modules")}
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/progress")}
              className="text-sm font-medium hover:text-primary text-left justify-start"
            >
              {t("nav.progress")}
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/emergency")}
              className="text-sm font-medium hover:text-primary text-left justify-start"
            >
              {t("nav.emergency")}
            </Button>
            <Button
              variant="ghost"
              className="text-sm font-medium text-primary text-left justify-start"
            >
              {t("nav.pricing")}
            </Button>
            <LanguageSelector />
            <UserAuthButton />
          </div>
        )}
      </header>

      <main className="container py-6 space-y-12">
        {/* Hero Section */}
        <section className="py-12 md:py-16 lg:py-20 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Master English for the Road
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Choose the perfect plan to accelerate your English learning journey.
            From basic phrases to AI-powered conversations, we've got you
            covered.
          </p>

          {/* Social Proof */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>10,000+ truck drivers learning</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              <span>4.9/5 average rating</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span>95% pass rate improvement</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="outline" onClick={() => navigate("/")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t("button.back")}
            </Button>
            <Button size="lg" onClick={() => navigate("/modules")}>
              {t("button.startLearning")}
            </Button>
          </div>
        </section>

        {/* Pricing Tabs */}
        <section>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
              <TabsTrigger value="plans">Pricing Plans</TabsTrigger>
              <TabsTrigger value="compare">Compare Features</TabsTrigger>
            </TabsList>

            <TabsContent value="plans">
              <SubscriptionPlans />
            </TabsContent>

            <TabsContent value="compare">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-4">
                    Feature Comparison
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    See exactly what's included in each plan and find the
                    perfect fit for your learning goals.
                  </p>
                </div>
                <FeatureComparison highlightTier={currentTier} />
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* FAQ Section */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Frequently Asked Questions
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">
                    Can I switch plans anytime?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Yes! You can upgrade or downgrade your plan at any time.
                    Changes take effect immediately, and we'll prorate any
                    billing differences.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Is there a free trial?</h3>
                  <p className="text-sm text-muted-foreground">
                    Our Free plan gives you access to 2 modules and basic
                    features forever. You can upgrade anytime to unlock more
                    content and features.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">
                    How does the AI tutor work?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Our AI tutor provides personalized conversation practice,
                    pronunciation feedback, and adapts to your learning pace.
                    Available in Premium plan.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Can I use it offline?</h3>
                  <p className="text-sm text-muted-foreground">
                    Premium subscribers can download lessons and audio files for
                    offline learning. Perfect for studying during breaks or in
                    areas with poor internet.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/40">
        <div className="container py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <Link to="/" className="flex items-center gap-2 mb-4">
                <Globe className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">TruckTalk</span>
              </Link>
              <p className="text-muted-foreground">{t("footer.description")}</p>
            </div>
            <div>
              <h3 className="font-medium mb-4">{t("footer.quickLinks")}</h3>
              <ul className="space-y-2">
                <li>
                  <Button
                    variant="ghost"
                    onClick={() => navigate("/")}
                    className="text-muted-foreground hover:text-foreground p-0 h-auto"
                  >
                    {t("nav.home")}
                  </Button>
                </li>
                <li>
                  <Button
                    variant="ghost"
                    onClick={() => navigate("/modules")}
                    className="text-muted-foreground hover:text-foreground p-0 h-auto"
                  >
                    {t("nav.modules")}
                  </Button>
                </li>
                <li>
                  <Button
                    variant="ghost"
                    onClick={() => navigate("/progress")}
                    className="text-muted-foreground hover:text-foreground p-0 h-auto"
                  >
                    {t("nav.progress")}
                  </Button>
                </li>
                <li>
                  <Button
                    variant="ghost"
                    onClick={() => navigate("/emergency")}
                    className="text-muted-foreground hover:text-foreground p-0 h-auto"
                  >
                    {t("nav.emergency")}
                  </Button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">{t("footer.support")}</h3>
              <ul className="space-y-2">
                <li>
                  <span className="text-muted-foreground">
                    {t("footer.helpCenter")}
                  </span>
                </li>
                <li>
                  <span className="text-muted-foreground">
                    {t("footer.contactUs")}
                  </span>
                </li>
                <li>
                  <span className="text-muted-foreground">
                    {t("footer.privacyPolicy")}
                  </span>
                </li>
                <li>
                  <span className="text-muted-foreground">
                    {t("footer.termsOfService")}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
            <p>
              &copy; {new Date().getFullYear()} TruckTalk. {t("footer.rights")}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PricingPage;
