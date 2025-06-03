import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Volume2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LanguageSelector, { useLanguage } from "@/components/LanguageSelector";

interface EmergencyPhrase {
  id: number;
  category: string;
  phrase: string;
  translation: {
    tr: string;
    kg: string;
    ru: string;
  };
  audioUrl?: string;
}

const emergencyPhrases: EmergencyPhrase[] = [
  // Medical Emergencies
  {
    id: 1,
    category: "medical",
    phrase: "I need medical help",
    translation: {
      tr: "Tıbbi yardıma ihtiyacım var",
      kg: "Мага медициналык жардам керек",
      ru: "Мне нужна медицинская помощь",
    },
  },
  {
    id: 2,
    category: "medical",
    phrase: "I have chest pain",
    translation: {
      tr: "Göğüs ağrım var",
      kg: "Менин көкүрөгүм ооруп жатат",
      ru: "У меня боль в груди",
    },
  },
  {
    id: 3,
    category: "medical",
    phrase: "I need an ambulance",
    translation: {
      tr: "Ambulansa ihtiyacım var",
      kg: "Мага тез жардам керек",
      ru: "Мне нужна скорая помощь",
    },
  },

  // Vehicle Issues
  {
    id: 4,
    category: "vehicle",
    phrase: "My truck broke down",
    translation: {
      tr: "Kamyonum bozuldu",
      kg: "Менин унаам бузулду",
      ru: "Моя фура сломалась",
    },
  },
  {
    id: 5,
    category: "vehicle",
    phrase: "I have a flat tire",
    translation: {
      tr: "Lastiğim patladı",
      kg: "Менин дөңгөлөгүм жарылды",
      ru: "У меня спустило колесо",
    },
  },
  {
    id: 6,
    category: "vehicle",
    phrase: "I need a tow truck",
    translation: {
      tr: "Çekici lazım",
      kg: "Мага сүйрөгүч унаа керек",
      ru: "Мне нужен эвакуатор",
    },
  },
  {
    id: 7,
    category: "vehicle",
    phrase: "My engine is overheating",
    translation: {
      tr: "Motorum aşırı ısınıyor",
      kg: "Менин кыймылдаткычым өтө ысып жатат",
      ru: "Мой двигатель перегревается",
    },
  },

  // Accidents
  {
    id: 8,
    category: "accident",
    phrase: "There has been an accident",
    translation: {
      tr: "Kaza oldu",
      kg: "Жол кырсыгы болду",
      ru: "Произошла авария",
    },
  },
  {
    id: 9,
    category: "accident",
    phrase: "I need to report an accident",
    translation: {
      tr: "Kaza raporu vermem gerekiyor",
      kg: "Мен жол кырсыгы жөнүндө кабарлашым керек",
      ru: "Мне нужно сообщить об аварии",
    },
  },
  {
    id: 10,
    category: "accident",
    phrase: "No one is injured",
    translation: {
      tr: "Kimse yaralanmadı",
      kg: "Эч ким жаракат алган жок",
      ru: "Никто не пострадал",
    },
  },
  {
    id: 11,
    category: "accident",
    phrase: "Someone is injured",
    translation: {
      tr: "Birisi yaralandı",
      kg: "Бирөө жаракат алды",
      ru: "Кто-то пострадал",
    },
  },

  // Police/Authority
  {
    id: 12,
    category: "police",
    phrase: "I don't understand",
    translation: {
      tr: "Anlamıyorum",
      kg: "Мен түшүнбөй жатам",
      ru: "Я не понимаю",
    },
  },
  {
    id: 13,
    category: "police",
    phrase: "Can you speak more slowly?",
    translation: {
      tr: "Daha yavaş konuşabilir misiniz?",
      kg: "Жайыраак сүйлөй аласызбы?",
      ru: "Можете говорить медленнее?",
    },
  },
  {
    id: 14,
    category: "police",
    phrase: "Here are my documents",
    translation: {
      tr: "İşte belgelerim",
      kg: "Мына менин документтерим",
      ru: "Вот мои документы",
    },
  },
  {
    id: 15,
    category: "police",
    phrase: "I need a translator",
    translation: {
      tr: "Tercümana ihtiyacım var",
      kg: "Мага котормочу керек",
      ru: "Мне нужен переводчик",
    },
  },
];

const EmergencyPage = () => {
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingImages, setLoadingImages] = useState<Record<string, boolean>>(
    {},
  );
  const [audioPlaybackErrors, setAudioPlaybackErrors] = useState<
    Record<number, string>
  >({});
  const [audioUrls, setAudioUrls] = useState<Record<number, string>>({});
  const [audioRefs, setAudioRefs] = useState<Record<number, HTMLAudioElement>>(
    {},
  );

  const filteredPhrases = emergencyPhrases.filter((phrase) => {
    const matchesSearch = phrase.phrase
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || phrase.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const playAudio = async (phrase: EmergencyPhrase) => {
    console.log(`[Emergency] Playing audio for phrase: "${phrase.phrase}"`);
    setLoadingImages((prev) => ({ ...prev, [`audio-${phrase.id}`]: true }));
    setAudioPlaybackErrors((prev) => ({ ...prev, [phrase.id]: "" }));

    try {
      const { supabase } = await import("@/lib/supabase");

      const { data, error } = await supabase.functions.invoke(
        "supabase-functions-text-to-speech",
        {
          body: { text: phrase.phrase },
        },
      );

      if (error) {
        console.error(`[Emergency] Supabase error:`, error);
        setAudioPlaybackErrors((prev) => ({
          ...prev,
          [phrase.id]: `TTS service failed: ${error.message || "Unknown error"}`,
        }));
        return;
      }

      if (!data) {
        console.error("[Emergency] No audio data returned");
        setAudioPlaybackErrors((prev) => ({
          ...prev,
          [phrase.id]: "No audio data received from server.",
        }));
        return;
      }

      const blob = new Blob([data], { type: "audio/mpeg" });
      const blobUrl = URL.createObjectURL(blob);

      console.log("Blob size:", blob.size);
      console.log("Blob URL:", blobUrl);

      const audio = new Audio(blobUrl);
      audio.preload = "auto";
      audio.playsInline = true;

      setAudioUrls((prev) => ({ ...prev, [phrase.id]: blobUrl }));
      setAudioRefs((prev) => ({ ...prev, [phrase.id]: audio }));

      // Try muted playback first to get around autoplay policy
      audio.muted = true;
      audio
        .play()
        .then(() => {
          console.log(
            "[Emergency] Silent autoplay succeeded, enabling audio...",
          );
          audio.muted = false;
          audio.currentTime = 0;
          audio.play().catch((err) => {
            console.error(`[Emergency] Playback retry failed:`, err);
            setAudioPlaybackErrors((prev) => ({
              ...prev,
              [phrase.id]: "Playback failed. Try downloading instead.",
            }));
          });
        })
        .catch((playError) => {
          console.error(`[Emergency] Muted autoplay failed:`, playError);
          setAudioPlaybackErrors((prev) => ({
            ...prev,
            [phrase.id]: "Autoplay blocked. Try downloading instead.",
          }));
        });
    } catch (err) {
      console.error(`[Emergency] TTS failure:`, err);
      setAudioPlaybackErrors((prev) => ({
        ...prev,
        [phrase.id]: "Unexpected error occurred.",
      }));
    } finally {
      setTimeout(() => {
        setLoadingImages((prev) => ({
          ...prev,
          [`audio-${phrase.id}`]: false,
        }));
      }, 500);
    }
  };

  useEffect(() => {
    return () => {
      // Clean up audio elements
      Object.values(audioRefs).forEach((audio) => {
        if (audio) {
          audio.pause();
          audio.src = "";
        }
      });
      setAudioRefs({});
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
              <ArrowLeft className="h-5 w-5 mr-2" />
              {t("button.back")}
            </Button>
            <div className="flex items-center space-x-2">
              <Link
                to="/"
                className="text-xl font-bold hover:text-primary transition-colors"
              >
                TruckTalk
              </Link>
              <span className="text-xl font-bold text-muted-foreground">/</span>
              <h1 className="text-xl font-bold">{t("nav.emergency")}</h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSelector />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 flex items-center">
            <div className="bg-red-100 rounded-full p-2 mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-red-800">
                {t("emergency.warning")}
              </h3>
              <p className="text-sm text-red-600">
                {t("emergency.description")}
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder={t("emergency.search")}
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Tabs */}
          <Tabs
            value={activeCategory}
            onValueChange={setActiveCategory}
            className="mb-6"
          >
            <TabsList className="w-full grid grid-cols-2 md:grid-cols-5">
              <TabsTrigger value="all">{t("emergency.all")}</TabsTrigger>
              <TabsTrigger value="medical">
                {t("emergency.medical")}
              </TabsTrigger>
              <TabsTrigger value="vehicle">
                {t("emergency.vehicle")}
              </TabsTrigger>
              <TabsTrigger value="accident">
                {t("emergency.accident")}
              </TabsTrigger>
              <TabsTrigger value="police">{t("emergency.police")}</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Phrases List */}
          <div className="space-y-4">
            {filteredPhrases.length > 0 ? (
              filteredPhrases.map((phrase) => (
                <Card
                  key={phrase.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <p className="font-medium text-lg">{phrase.phrase}</p>
                          <p className="text-muted-foreground">
                            {
                              phrase.translation[
                                language as keyof typeof phrase.translation
                              ]
                            }
                          </p>
                        </div>
                        <div className="flex justify-center md:justify-end">
                          <div className="flex flex-col items-center">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => playAudio(phrase)}
                              disabled={loadingImages[`audio-${phrase.id}`]}
                              className="flex items-center gap-2"
                            >
                              {loadingImages[`audio-${phrase.id}`] ? (
                                <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent"></span>
                              ) : (
                                <Volume2 className="h-5 w-5" />
                              )}
                              <span className="hidden sm:inline">
                                {t("button.playAudio")}
                              </span>
                              <span className="sr-only">Play audio</span>
                            </Button>
                            {audioPlaybackErrors[phrase.id] && (
                              <div className="flex flex-col items-center mt-1 text-center">
                                <span className="text-xs text-red-500 mb-1">
                                  {audioPlaybackErrors[phrase.id]}
                                </span>
                                {audioUrls[phrase.id] && (
                                  <a
                                    href={audioUrls[phrase.id]}
                                    download={`${phrase.phrase.replace(/\s+/g, "-").toLowerCase()}.mp3`}
                                    className="text-xs text-blue-500 hover:underline px-2 py-1 bg-blue-50 rounded"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {t("emergency.downloadAudio")}
                                  </a>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  {t("emergency.noResults")}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmergencyPage;
