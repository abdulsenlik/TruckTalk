import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Globe, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageSelector, { useLanguage } from "@/components/LanguageSelector";
import UserAuthButton from "@/components/UserAuthButton";
import SubscriptionPlans from "@/components/SubscriptionPlans";

const PricingPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            {t("subscription.title")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            {t("subscription.subtitle")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="outline" asChild>
              <Button onClick={() => navigate("/")} className="text-black-500">
                <ArrowLeft className="h-4 w-4 mr-2 " />
                {t("button.back")}
              </Button>
            </Button>
            <Button size="lg" asChild>
              <Button onClick={() => navigate("/modules")}>
                {t("button.startLearning")}
              </Button>
            </Button>
          </div>
        </section>

        {/* Subscription Plans */}
        <SubscriptionPlans />
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
              <p className="text-muted-foreground">
                Master essential English phrases for truck drivers during
                traffic stops and roadside interactions.
              </p>
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
