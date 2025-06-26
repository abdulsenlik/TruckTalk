import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Globe,
  Menu,
  X,
  ChevronRight,
  CheckCircle2,
  Star,
  Clock,
  Calendar,
  Award,
  BookOpen,
  Users,
  Zap,
  Target,
  TrendingUp,
  Shield,
  Briefcase,
} from "lucide-react";
import CheckoutButton from "./CheckoutButton";
import StaticAudioTest from "./StaticAudioTest";
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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import ModuleCard from "./ModuleCard";
import LanguageSelector, { useLanguage } from "./LanguageSelector";
import UserAuthButton from "./UserAuthButton";
import { audioService } from "@/lib/audioService";
import AudioButton from "./AudioButton";

import { trafficStopCourse } from "@/data/trafficStopCourse";

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

const modules = trafficStopCourse.map((section, index) => ({
  id: section.id,
  title: section.title,
  description: section.description,
  dialogues: section.dialogues.length,
  completion: 0,
  image: getImageForSection(section.id),
  difficulty: index < 3 ? "Beginner" : index < 7 ? "Intermediate" : "Advanced",
}));

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
      return "https://dornsife.usc.edu/wp-content/uploads/sites/7/2023/04/story-3195.jpg"; // Ambulance/medical image
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
  const [bootcampModalOpen, setBootcampModalOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language, t } = useLanguage();

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
            <Link to="/blog" className="text-sm font-medium hover:text-primary">
              Blog
            </Link>
            <Link
              to="/pricing"
              className="text-sm font-medium hover:text-primary"
            >
              Pricing
            </Link>
            <Link
              to="/landing"
              className="text-sm font-medium hover:text-primary"
            >
              About
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
            <Link to="/blog" className="text-sm font-medium hover:text-primary">
              Blog
            </Link>
            <Link
              to="/pricing"
              className="text-sm font-medium hover:text-primary"
            >
              Pricing
            </Link>
            <Link
              to="/landing"
              className="text-sm font-medium hover:text-primary"
            >
              About
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

        {/* Featured 10-Hour English Bootcamp */}
        <section className="relative overflow-hidden">
          <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl border border-blue-100 shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-purple-500/5"></div>
            <div className="relative p-6 md:p-8 lg:p-10">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Content */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
                      <Zap className="h-5 w-5 text-white" />
                    </div>
                    <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
                      Featured Course
                    </Badge>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                    10-Hour English Bootcamp
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6 max-w-2xl">
                    Master essential English communication skills for truck
                    drivers with our comprehensive 5-day intensive program.
                    Build confidence in traffic stops, border crossings, and
                    professional interactions.
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">10 Hours Total</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">5 Daily Modules</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Award className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">Certificate Included</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                      asChild
                    >
                      <Link to="/bootcamp">
                        <BookOpen className="mr-2 h-5 w-5" />
                        Start Bootcamp
                      </Link>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-blue-200 hover:bg-blue-50"
                      onClick={() => setBootcampModalOpen(true)}
                    >
                      Learn More
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Visual Element */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-2xl">
                      <img
                        src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&q=80"
                        alt="Truck driver learning English"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Floating elements */}
                    <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="absolute -bottom-4 -left-4 bg-white rounded-full p-3 shadow-lg">
                      <Award className="h-6 w-6 text-indigo-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                        <AudioButton
                          text={item.phrase}
                          identifier={`emergency-${index}`}
                          size="sm"
                          variant="ghost"
                          showText
                          className="flex items-center gap-2"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
            {/*–– DEBUG: static audio tester ––*/}
            <StaticAudioTest />
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
                <li>
                  <Link
                    to="/blog"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Blog
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

      {/* Bootcamp Learn More Modal */}
      <Dialog open={bootcampModalOpen} onOpenChange={setBootcampModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
              Transform Your Trucking Career with English Mastery
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold">
                  Why This Bootcamp Will Change Everything
                </h3>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Imagine confidently handling any traffic stop, smoothly
                navigating border crossings, and communicating professionally
                with customers. This isn't just language learning—it's career
                transformation that puts you in control of every interaction on
                the road.
              </p>
            </div>

            {/* Transformation Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-lg font-semibold flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Career Advancement
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>
                      Qualify for higher-paying routes requiring English
                      proficiency
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Access international driving opportunities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Stand out to premium trucking companies</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  Peace of Mind
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Handle police stops with confidence and clarity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Navigate emergencies without language barriers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Reduce stress from miscommunication</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* What Makes This Different */}
            <div className="bg-amber-50 rounded-lg p-6 border border-amber-200">
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-amber-600" />
                What Makes This Bootcamp Different?
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium mb-2">Real-World Scenarios</h5>
                  <p className="text-sm text-muted-foreground">
                    Practice actual conversations you'll have on the road—not
                    generic language lessons.
                  </p>
                </div>
                <div>
                  <h5 className="font-medium mb-2">
                    Industry-Specific Vocabulary
                  </h5>
                  <p className="text-sm text-muted-foreground">
                    Master the exact terms and phrases used in trucking,
                    logistics, and transportation.
                  </p>
                </div>
                <div>
                  <h5 className="font-medium mb-2">Confidence Building</h5>
                  <p className="text-sm text-muted-foreground">
                    Interactive roleplay prepares you for high-pressure
                    situations.
                  </p>
                </div>
                <div>
                  <h5 className="font-medium mb-2">Immediate Results</h5>
                  <p className="text-sm text-muted-foreground">
                    Start using what you learn from day one—see improvement in
                    every interaction.
                  </p>
                </div>
              </div>
            </div>

            {/* Success Stories Preview */}
            <div className="bg-green-50 rounded-lg p-6 border border-green-200">
              <h4 className="text-lg font-semibold mb-4 text-green-800">
                Join Thousands of Successful Drivers
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-700">95%</div>
                  <div className="text-sm text-green-600">
                    Report increased confidence
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-700">87%</div>
                  <div className="text-sm text-green-600">
                    Found better job opportunities
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-700">92%</div>
                  <div className="text-sm text-green-600">
                    Recommend to other drivers
                  </div>
                </div>
              </div>
            </div>

            {/* Course Structure */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">
                Your 5-Day Transformation Journey
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <div className="font-medium">Foundation & Vocabulary</div>
                    <div className="text-sm text-muted-foreground">
                      Master essential trucking terms and documentation
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg">
                  <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <div className="font-medium">
                      Navigation & Communication
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Confident directions and dispatcher interactions
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <div className="font-medium">
                      Police & Emergency Situations
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Handle inspections and emergencies professionally
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-pink-50 rounded-lg">
                  <div className="w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    4
                  </div>
                  <div>
                    <div className="font-medium">
                      Customer & Border Interactions
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Professional delivery and crossing procedures
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    5
                  </div>
                  <div>
                    <div className="font-medium">Certification & Mastery</div>
                    <div className="text-sm text-muted-foreground">
                      CDL test prep and comprehensive review
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg p-6 text-center">
              <h4 className="text-xl font-bold mb-2">
                Ready to Transform Your Career?
              </h4>
              <p className="mb-4 opacity-90">
                Join the bootcamp that's already helped thousands of drivers
                succeed.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100"
                  onClick={() => {
                    setBootcampModalOpen(false);
                    navigate("/bootcamp");
                  }}
                >
                  <BookOpen className="mr-2 h-5 w-5" />
                  Start Your Transformation Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                  onClick={() => setBootcampModalOpen(false)}
                >
                  I'll Think About It
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Home;
