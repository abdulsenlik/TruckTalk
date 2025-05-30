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

import { trafficStopCourse } from "@/data/trafficStopCourse";

const modules = trafficStopCourse.map((section, index) => ({
  id: section.id,
  title: section.title,
  description: section.description,
  dialogues: section.dialogues.length,
  completion: 0,
  image: getImageForSection(section.id),
  difficulty: index < 2 ? "Beginner" : index < 4 ? "Intermediate" : "Advanced",
}));

// Helper function to get appropriate image for each section
function getImageForSection(sectionId: string): string {
  switch (sectionId) {
    case "initial-stop":
      return "https://images.unsplash.com/photo-1617906855223-a69f14c9841d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    case "document-check":
      return "https://images.unsplash.com/photo-1631651693480-97f1132e333d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    case "vehicle-inspection":
      return "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=600&q=80";
    case "explaining-situations":
      return "https://images.unsplash.com/photo-1589578527966-fdac0f44566c?w=600&q=80";
    case "citations-and-tickets":
      return "https://images.unsplash.com/photo-1596394723269-b2cbca4e6e33?w=600&q=80";
    case "emergency-situations":
      return "https://images.unsplash.com/photo-1635355955841-1b3e5fb67c3a?w=600&q=80";
    default:
      return "https://images.unsplash.com/photo-1590496793929-36417d3117de?w=600&q=80";
  }
}

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

// Helper function to get appropriate image for each emergency phrase
function getEmergencyPhraseImage(phrase: string): string {
  // Map phrases to relevant images
  switch (phrase.toLowerCase()) {
    case "i need medical help":
      return "https://plumgroveinc.com/wp-content/uploads/medical-assistance-window-decals-32-2000x2000.jpg"; // Ambulance/medical image
    case "my truck broke down":
      return "https://farm8.staticflickr.com/7232/7324846058_c01551db3c_z.jpg"; // Broken down truck
    case "i have a flat tire":
      return "https://www.bankrate.com/2022/07/27111118/flat-tire-statistics.jpg"; // Flat tire
    case "i need a tow truck":
      return "https://www.bobtail.com/wp-content/uploads/2024/02/predatory-towing.jpg"; // Tow truck
    case "there has been an accident":
      return "https://www.attorneyjaviermarcos.com/wp-content/uploads/2016/05/6.-18-wheeler-1024x680.jpg"; // Accident scene
    default:
      return "https://images.unsplash.com/photo-1590496793929-36417d3117de?w=600&q=80"; // Default truck image
  }
}

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
                onClick={() => {
                  console.log("Navigating to module:", module.id);
                  navigate(`/module/${module.id}`);
                }}
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
            {emergencyPhrases.map((item, index) => {
              const imageUrl = getEmergencyPhraseImage(item.phrase);
              console.log(
                `Emergency phrase image URL for "${item.phrase}": ${imageUrl}`,
              );

              return (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="w-full md:w-1/4 h-32 md:h-auto">
                        <img
                          src={imageUrl}
                          alt={item.phrase}
                          className="w-full h-full object-cover rounded-md"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 flex-1">
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
                          onClick={async () => {
                            try {
                              // Call the ElevenLabs TTS API
                              console.log(
                                "[Home] Calling TTS API for emergency phrase:",
                                item.phrase,
                              );
                              // Use Supabase Edge Function for TTS
                              const { supabase } = await import(
                                "@/lib/supabase"
                              );

                              supabase.functions
                                .invoke("supabase-functions-tts-service", {
                                  body: { text: item.phrase },
                                })
                                .then(({ data, error }) => {
                                  if (error) {
                                    console.error("[Home] TTS error:", error);
                                    throw error;
                                  }

                                  console.log(
                                    "[Home] TTS response data received",
                                  );

                                  // Get audio URL from response
                                  const audioUrl = data?.audioUrl;
                                  console.log(
                                    "[Home] Extracted audioUrl:",
                                    audioUrl,
                                  );

                                  if (audioUrl) {
                                    console.log(
                                      "[Home] Attempting to play emergency phrase audio:",
                                      audioUrl,
                                    );
                                    const audio = new Audio(audioUrl);
                                    return audio
                                      .play()
                                      .then(() =>
                                        console.log(
                                          "[Home] Emergency phrase audio played successfully",
                                        ),
                                      )
                                      .catch((playError) => {
                                        console.error(
                                          "[Home] Error playing emergency phrase audio:",
                                          playError,
                                        );
                                        // Create a download link if playback fails
                                        const downloadLink =
                                          document.createElement("a");
                                        downloadLink.href = audioUrl;
                                        downloadLink.download =
                                          "emergency-phrase.mp3";
                                        downloadLink.innerHTML =
                                          "Download Audio";
                                        downloadLink.style.color = "blue";
                                        downloadLink.style.textDecoration =
                                          "underline";
                                        downloadLink.style.cursor = "pointer";
                                        downloadLink.style.marginTop = "5px";

                                        // Find the button that was clicked and append the download link after it
                                        const button = document.activeElement;
                                        if (button && button.parentNode) {
                                          button.parentNode.appendChild(
                                            document.createElement("br"),
                                          );
                                          button.parentNode.appendChild(
                                            downloadLink,
                                          );
                                        }

                                        throw playError;
                                      });
                                  } else {
                                    console.error(
                                      "[Home] No audioUrl found in response. Full response:",
                                      data,
                                    );
                                    throw new Error(
                                      "No audio URL returned from TTS API",
                                    );
                                  }
                                })
                                .catch((error) => {
                                  console.error(
                                    "[Home] Error with TTS process:",
                                    error,
                                  );
                                });
                            } catch (error) {
                              console.error("[Home] Error:", error);
                            }
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
                    </div>
                  </CardContent>
                </Card>
              );
            })}
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
