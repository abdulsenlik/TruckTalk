import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Globe, Menu, X, ChevronRight, CheckCircle2, Star } from "lucide-react";
import CheckoutButton from "./CheckoutButton";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import ModuleCard from "./ModuleCard";
import LanguageSelector, { useLanguage } from "./LanguageSelector";
import UserAuthButton from "./UserAuthButton";
import SubscriptionPlans from "./SubscriptionPlans";

const modules = [
  {
    id: 1,
    title: "Basic Greetings & ID Check",
    description:
      "Learn essential phrases for introducing yourself and handling ID verification during traffic stops.",
    dialogues: 6,
    completion: 0,
    image:
      "https://images.unsplash.com/photo-1577368211130-4bbd0181ddf0?w=600&q=80",
    difficulty: "Beginner",
  },
  {
    id: 2,
    title: "Road Signs & Traffic Rules",
    description:
      "Understand common road signs, traffic rules, and how to explain your actions to officers.",
    dialogues: 8,
    completion: 0,
    image:
      "https://images.unsplash.com/photo-1564694457547-80311e2e653a?w=600&q=80",
    difficulty: "Beginner",
  },
  {
    id: 3,
    title: "Dealing with Police/DOT Officers",
    description:
      "Learn how to communicate effectively with law enforcement and DOT officials during inspections.",
    dialogues: 10,
    completion: 0,
    image:
      "https://images.unsplash.com/photo-1589578527966-fdac0f44566c?w=600&q=80",
    difficulty: "Intermediate",
  },
  {
    id: 4,
    title: "Emergency and Accident Situations",
    description:
      "Essential vocabulary and phrases for handling roadside emergencies and accidents.",
    dialogues: 7,
    completion: 0,
    image:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=80",
    difficulty: "Intermediate",
  },
  {
    id: 5,
    title: "Border Crossing and Inspection",
    description:
      "Communication skills for border crossings, customs, and international transport documentation.",
    dialogues: 9,
    completion: 0,
    image:
      "https://images.unsplash.com/photo-1631248055158-edec7a3c072b?w=600&q=80",
    difficulty: "Advanced",
  },
  {
    id: 6,
    title: "Vehicle Maintenance Vocabulary",
    description:
      "Learn terms related to truck parts, maintenance issues, and repair conversations.",
    dialogues: 8,
    completion: 0,
    image:
      "https://images.unsplash.com/photo-1599256872237-5dcc0fbe9668?w=600&q=80",
    difficulty: "Advanced",
  },
];

const emergencyPhrases = [
  {
    phrase: "I need medical help",
    translation: {
      tr: "Tıbbi yardıma ihtiyacım var",
      kg: "Мага медициналык жардам керек",
      ru: "Мне нужна медицинская помощь",
    },
  },
  {
    phrase: "My truck broke down",
    translation: {
      tr: "Kamyonum bozuldu",
      kg: "Менин унаам бузулду",
      ru: "Моя фура сломалась",
    },
  },
  {
    phrase: "I have a flat tire",
    translation: {
      tr: "Lastiğim patladı",
      kg: "Менин дөңгөлөгүм жарылды",
      ru: "У меня спустило колесо",
    },
  },
  {
    phrase: "I need a tow truck",
    translation: {
      tr: "Çekici lazım",
      kg: "Мага сүйрөгүч унаа керек",
      ru: "Мне нужен эвакуатор",
    },
  },
  {
    phrase: "There has been an accident",
    translation: {
      tr: "Kaza oldu",
      kg: "Жол кырсыгы болду",
      ru: "Произошла авария",
    },
  },
];

const Home = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">TruckTalk</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium hover:text-primary">
              {t("nav.home")}
            </Link>
            <Link
              to="/modules"
              className="text-sm font-medium hover:text-primary"
            >
              {t("nav.modules")}
            </Link>
            <Link
              to="/progress"
              className="text-sm font-medium hover:text-primary"
            >
              {t("nav.progress")}
            </Link>
            <Link
              to="/emergency"
              className="text-sm font-medium hover:text-primary"
            >
              {t("nav.emergency")}
            </Link>
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
            <Link to="/" className="text-sm font-medium hover:text-primary">
              {t("nav.home")}
            </Link>
            <Link
              to="/modules"
              className="text-sm font-medium hover:text-primary"
            >
              {t("nav.modules")}
            </Link>
            <Link
              to="/progress"
              className="text-sm font-medium hover:text-primary"
            >
              {t("nav.progress")}
            </Link>
            <Link
              to="/emergency"
              className="text-sm font-medium hover:text-primary"
            >
              {t("nav.emergency")}
            </Link>
            <LanguageSelector />
            <UserAuthButton />
          </div>
        )}
      </header>

      <main className="container py-6 space-y-12">
        {/* Hero Section */}
        <section className="py-12 md:py-16 lg:py-20 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            {t("home.hero.title")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            {t("home.hero.subtitle")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/modules">{t("button.startLearning")}</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/emergency">{t("button.emergencyPhrases")}</Link>
            </Button>
          </div>
        </section>

        {/* Module Selection */}
        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold tracking-tight">
              {t("modules.title")}
            </h2>
            <Button variant="ghost" asChild>
              <Link to="/modules">
                {t("modules.viewAll")} <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.slice(0, 3).map((module) => (
              <ModuleCard
                key={module.id}
                id={module.id}
                title={module.title}
                description={module.description}
                dialogues={module.dialogues}
                completion={module.completion}
                image={module.image}
                difficulty={module.difficulty}
                onClick={() => navigate(`/module/${module.id}`)}
              />
            ))}
          </div>
        </section>

        {/* Subscription Tiers */}
        <SubscriptionPlans />

        {/* Emergency Phrases */}
        <section className="space-y-6 py-8 bg-muted/50 rounded-lg p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold tracking-tight">
              {t("emergency.title")}
            </h2>
            <Button variant="outline" size="sm" asChild>
              <Link to="/emergency">{t("emergency.viewAll")}</Link>
            </Button>
          </div>

          <div className="space-y-4">
            {emergencyPhrases.map((item, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <p className="font-medium text-lg">{item.phrase}</p>
                      <p className="text-muted-foreground">
                        {
                          item.translation[
                            language as keyof typeof item.translation
                          ]
                        }
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        const utterance = new SpeechSynthesisUtterance(
                          item.phrase,
                        );
                        utterance.lang = "en-US";
                        utterance.rate = 0.9; // Slightly slower for clarity
                        window.speechSynthesis.speak(utterance);
                      }}
                    >
                      <span className="sr-only">Play audio</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6"
                      >
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                      </svg>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/40">
        <div className="container py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Globe className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">TruckTalk</span>
              </div>
              <p className="text-muted-foreground">{t("footer.description")}</p>
            </div>
            <div>
              <h3 className="font-medium mb-4">{t("footer.quickLinks")}</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {t("nav.home")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/modules"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {t("nav.modules")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/progress"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {t("nav.progress")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/emergency"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {t("nav.emergency")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">{t("footer.support")}</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/help"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {t("footer.helpCenter")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {t("footer.contactUs")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {t("footer.privacyPolicy")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {t("footer.termsOfService")}
                  </Link>
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

export default Home;
