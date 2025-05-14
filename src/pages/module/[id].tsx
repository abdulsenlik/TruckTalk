import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle, Clock, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import DialoguePlayer from "@/components/DialoguePlayer";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle, Volume2, AlertCircle } from "lucide-react";

import LanguageSelector from "@/components/LanguageSelector";

interface DialogueExchange {
  speaker: string;
  text: string;
}

interface DialogueScene {
  title: string;
  exchanges: DialogueExchange[];
}

interface VocabularyItem {
  english: string;
  translations: {
    tr: string;
    kg: string;
    ru: string;
  };
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface DialogueContent {
  vocabulary?: VocabularyItem[];
  dialogues?: DialogueScene[];
  culturalTips?: string[];
  quiz?: QuizQuestion[];
}

interface Dialogue {
  id: string;
  title: string;
  description: string;
  estimatedTime: number; // in minutes
  difficulty: "beginner" | "intermediate" | "advanced";
  completed: boolean;
  audioUrl?: string;
  content?: DialogueContent;
}

interface Module {
  id: string;
  title: string;
  description: string;
  totalDialogues: number;
  completedDialogues: number;
  dialogues: Dialogue[];
  imageUrl: string;
}

const ModuleDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedDialogue, setSelectedDialogue] = useState<Dialogue | null>(
    null,
  );
  const [activeTab, setActiveTab] = useState("dialogues");
  const [selectedLanguage, setSelectedLanguage] = useState("tr");

  // Module data based on the ID parameter
  const getModuleData = (moduleId: string): Module => {
    // Module 3: Dealing with Police/DOT Officers
    if (moduleId === "3") {
      return {
        id: moduleId,
        title: "Dealing with Police/DOT Officers",
        description:
          "Learn how to communicate effectively with law enforcement and DOT officials during traffic stops, inspections, and safety checks.",
        totalDialogues: 6,
        completedDialogues: 0,
        imageUrl:
          "https://images.unsplash.com/photo-1589578527966-fdac0f44566c?w=800&q=80",
        dialogues: [
          {
            id: "1",
            title: "Initial Traffic Stop & Greetings",
            description:
              "Learn essential phrases for the first moments of a traffic stop, including proper greetings and initial responses.",
            estimatedTime: 10,
            difficulty: "beginner",
            completed: false,
            content: {
              vocabulary: [
                {
                  english: "Good morning/afternoon/evening",
                  translations: {
                    tr: "Günaydın/İyi günler/İyi akşamlar",
                    kg: "Кутмандуу эртең/күн/кеч",
                    ru: "Доброе утро/день/вечер",
                  },
                },
                {
                  english: "Officer",
                  translations: { tr: "Memur", kg: "Кызматкер", ru: "Офицер" },
                },
                {
                  english: "License",
                  translations: {
                    tr: "Ehliyet",
                    kg: "Айдоочунун күбөлүгү",
                    ru: "Водительские права",
                  },
                },
                {
                  english: "Registration",
                  translations: {
                    tr: "Ruhsat",
                    kg: "Каттоо",
                    ru: "Регистрация",
                  },
                },
                {
                  english: "Insurance",
                  translations: {
                    tr: "Sigorta",
                    kg: "Камсыздандыруу",
                    ru: "Страховка",
                  },
                },
                {
                  english: "Pull over",
                  translations: {
                    tr: "Kenara çek",
                    kg: "Четке чыгуу",
                    ru: "Съехать на обочину",
                  },
                },
                {
                  english: "Speeding",
                  translations: {
                    tr: "Hız aşımı",
                    kg: "Ылдамдыкты арттыруу",
                    ru: "Превышение скорости",
                  },
                },
              ],
              dialogues: [
                {
                  title: "Being Pulled Over",
                  exchanges: [
                    {
                      speaker: "Officer",
                      text: "Good afternoon. License and registration, please.",
                    },
                    {
                      speaker: "Driver",
                      text: "Good afternoon, officer. One moment, please.",
                    },
                    {
                      speaker: "Officer",
                      text: "Do you know why I stopped you today?",
                    },
                    {
                      speaker: "Driver",
                      text: "No, officer. Could you please tell me?",
                    },
                    {
                      speaker: "Officer",
                      text: "You were going 70 in a 55 zone.",
                    },
                    {
                      speaker: "Driver",
                      text: "I'm sorry, officer. I didn't notice.",
                    },
                  ],
                },
              ],
              culturalTips: [
                "Always address the officer as 'officer' or 'sir/ma'am'.",
                "Keep your hands visible on the steering wheel until instructed otherwise.",
                "Inform the officer before reaching for documents: 'My license is in my wallet. May I reach for it?'",
                "Maintain respectful eye contact when speaking with the officer.",
                "Never exit your vehicle unless instructed to do so.",
              ],
              quiz: [
                {
                  question:
                    "What should you say when an officer asks for your license?",
                  options: [
                    "I don't have it",
                    "One moment, please",
                    "Why do you need it?",
                    "I'm in a hurry",
                  ],
                  correctAnswer: 1,
                },
                {
                  question:
                    "Where should you keep your hands during a traffic stop?",
                  options: [
                    "In your pockets",
                    "On the steering wheel",
                    "Searching for documents",
                    "Out the window",
                  ],
                  correctAnswer: 1,
                },
                {
                  question: "How should you address a police officer?",
                  options: [
                    "By their first name",
                    "Hey you",
                    "Officer",
                    "Friend",
                  ],
                  correctAnswer: 2,
                },
              ],
            },
          },
          {
            id: "2",
            title: "Requesting and Providing Documents",
            description:
              "Learn how to understand document requests and properly provide your driver's license, insurance, ELD, and logbook.",
            estimatedTime: 12,
            difficulty: "beginner",
            completed: false,
            content: {
              vocabulary: [
                {
                  english: "Commercial Driver's License (CDL)",
                  translations: {
                    tr: "Ticari Sürücü Belgesi",
                    kg: "Коммерциялык айдоочу күбөлүгү",
                    ru: "Коммерческие водительские права",
                  },
                },
                {
                  english: "Electronic Logging Device (ELD)",
                  translations: {
                    tr: "Elektronik Kayıt Cihazı",
                    kg: "Электрондук каттоо түзмөгү",
                    ru: "Электронное устройство регистрации",
                  },
                },
                {
                  english: "Logbook",
                  translations: {
                    tr: "Sefer defteri",
                    kg: "Каттоо китепчеси",
                    ru: "Журнал учета",
                  },
                },
                {
                  english: "Hours of Service",
                  translations: {
                    tr: "Hizmet Saatleri",
                    kg: "Кызмат сааттары",
                    ru: "Часы обслуживания",
                  },
                },
                {
                  english: "Medical certificate",
                  translations: {
                    tr: "Sağlık belgesi",
                    kg: "Медициналык сертификат",
                    ru: "Медицинская справка",
                  },
                },
                {
                  english: "I don't understand",
                  translations: {
                    tr: "Anlamıyorum",
                    kg: "Мен түшүнбөй жатам",
                    ru: "Я не понимаю",
                  },
                },
                {
                  english: "Could you repeat that?",
                  translations: {
                    tr: "Tekrar edebilir misiniz?",
                    kg: "Кайталап айтып бересизби?",
                    ru: "Не могли бы вы повторить?",
                  },
                },
              ],
              dialogues: [
                {
                  title: "Document Check",
                  exchanges: [
                    {
                      speaker: "Officer",
                      text: "I need to see your CDL, insurance, and logbook.",
                    },
                    {
                      speaker: "Driver",
                      text: "Yes, officer. My CDL is here. Let me get my insurance and logbook.",
                    },
                    {
                      speaker: "Officer",
                      text: "Is this an electronic or paper logbook?",
                    },
                    {
                      speaker: "Driver",
                      text: "I use an electronic logging device. It's right here.",
                    },
                    {
                      speaker: "Officer",
                      text: "Show me your hours of service for the past 7 days.",
                    },
                    {
                      speaker: "Driver",
                      text: "Here they are, officer. I can show you on the screen.",
                    },
                  ],
                },
                {
                  title: "Asking for Clarification",
                  exchanges: [
                    { speaker: "Officer", text: "Your IFTA decal is expired." },
                    {
                      speaker: "Driver",
                      text: "I'm sorry, I don't understand. Could you repeat that?",
                    },
                    {
                      speaker: "Officer",
                      text: "Your International Fuel Tax Agreement sticker. It's expired.",
                    },
                    {
                      speaker: "Driver",
                      text: "Oh, I understand now. I thought it was renewed last month.",
                    },
                    {
                      speaker: "Officer",
                      text: "Do you have the paperwork for the renewal?",
                    },
                    {
                      speaker: "Driver",
                      text: "Let me check my documents, please.",
                    },
                  ],
                },
              ],
              culturalTips: [
                "Always have your documents organized and easily accessible.",
                "If you don't understand something, it's better to ask for clarification than to guess.",
                "When showing electronic records, offer to hand your device to the officer rather than making them reach for it.",
                "Be patient and calm when retrieving documents, even if it takes time.",
                "If you need to unbuckle your seatbelt to reach documents, inform the officer first.",
              ],
              quiz: [
                {
                  question:
                    "What should you do if you don't understand what the officer is asking for?",
                  options: [
                    "Ignore them",
                    "Pretend to understand",
                    "Ask them to repeat or clarify",
                    "Give them random documents",
                  ],
                  correctAnswer: 2,
                },
                {
                  question: "What is an ELD used for?",
                  options: [
                    "Tracking fuel usage",
                    "Recording hours of service",
                    "Navigation",
                    "Communication",
                  ],
                  correctAnswer: 1,
                },
                {
                  question:
                    "How many days of driving history might an officer ask to see?",
                  options: ["1 day", "3 days", "7 days", "30 days"],
                  correctAnswer: 2,
                },
              ],
            },
          },
          {
            id: "3",
            title: "Understanding Officer Instructions",
            description:
              "Learn how to comprehend and respond to common instructions during vehicle inspections and safety checks.",
            estimatedTime: 15,
            difficulty: "intermediate",
            completed: false,
            content: {
              vocabulary: [
                {
                  english: "Step out of the vehicle",
                  translations: {
                    tr: "Araçtan çıkın",
                    kg: "Унаадан чыгыңыз",
                    ru: "Выйдите из машины",
                  },
                },
                {
                  english: "Pop the hood",
                  translations: {
                    tr: "Kaputu açın",
                    kg: "Капотту ачыңыз",
                    ru: "Откройте капот",
                  },
                },
                {
                  english: "Turn on your lights",
                  translations: {
                    tr: "Işıklarınızı yakın",
                    kg: "Жарыктарыңызды күйгүзүңүз",
                    ru: "Включите фары",
                  },
                },
                {
                  english: "Check your brakes",
                  translations: {
                    tr: "Frenlerinizi kontrol edin",
                    kg: "Тормозуңузду текшериңиз",
                    ru: "Проверьте тормоза",
                  },
                },
                {
                  english: "Follow me",
                  translations: {
                    tr: "Beni takip et",
                    kg: "Мени ээрчиңиз",
                    ru: "Следуйте за мной",
                  },
                },
                {
                  english: "Wait here",
                  translations: {
                    tr: "Burada bekle",
                    kg: "Бул жерде күтүңүз",
                    ru: "Подождите здесь",
                  },
                },
                {
                  english: "Safety inspection",
                  translations: {
                    tr: "Güvenlik denetimi",
                    kg: "Коопсуздук текшерүүсү",
                    ru: "Проверка безопасности",
                  },
                },
              ],
              dialogues: [
                {
                  title: "Vehicle Inspection",
                  exchanges: [
                    {
                      speaker: "Officer",
                      text: "I'm going to conduct a Level 2 inspection. Please step out of the vehicle.",
                    },
                    {
                      speaker: "Driver",
                      text: "Yes, officer. I'm stepping out now.",
                    },
                    {
                      speaker: "Officer",
                      text: "Pop the hood and show me your engine compartment.",
                    },
                    {
                      speaker: "Driver",
                      text: "Right away, officer. The hood release is here.",
                    },
                    {
                      speaker: "Officer",
                      text: "Now turn on all your lights so I can check them.",
                    },
                    {
                      speaker: "Driver",
                      text: "Yes, I'll turn them on. Headlights, turn signals, and brake lights.",
                    },
                  ],
                },
                {
                  title: "Brake Test",
                  exchanges: [
                    {
                      speaker: "Officer",
                      text: "I need to check your brakes. Apply pressure to the brake pedal.",
                    },
                    {
                      speaker: "Driver",
                      text: "I'm applying pressure to the brake pedal now.",
                    },
                    {
                      speaker: "Officer",
                      text: "Hold it there while I check the brake lines.",
                    },
                    { speaker: "Driver", text: "I'll hold it, officer." },
                    {
                      speaker: "Officer",
                      text: "Release the brake and set your parking brake.",
                    },
                    {
                      speaker: "Driver",
                      text: "Releasing the brake now. Setting the parking brake.",
                    },
                  ],
                },
              ],
              culturalTips: [
                "Always confirm that you understand instructions by repeating them back or saying 'Yes, officer'.",
                "Move slowly and deliberately when following physical instructions.",
                "If you're unsure how to perform a requested action (like opening a specific compartment), ask for guidance rather than struggling.",
                "During inspections, stand where the officer can see you unless instructed otherwise.",
                "Hand gestures are commonly used during inspections - pointing means 'look at this' or 'go there'.",
              ],
              quiz: [
                {
                  question:
                    "What should you do when an officer asks you to step out of the vehicle?",
                  options: [
                    "Refuse",
                    "Ask why",
                    "Comply immediately",
                    "Call your company first",
                  ],
                  correctAnswer: 2,
                },
                {
                  question:
                    "If you don't know how to open a specific compartment, you should:",
                  options: [
                    "Ignore the request",
                    "Pretend to try",
                    "Ask for guidance",
                    "Force it open",
                  ],
                  correctAnswer: 2,
                },
                {
                  question:
                    "During a brake test, what might an officer ask you to do?",
                  options: [
                    "Drive in circles",
                    "Apply pressure to the brake pedal",
                    "Disconnect the brake lines",
                    "Honk the horn",
                  ],
                  correctAnswer: 1,
                },
              ],
            },
          },
          {
            id: "4",
            title: "Explaining Situations or Problems",
            description:
              "Learn how to explain common situations, mistakes, or mechanical issues to officers in a clear and professional manner.",
            estimatedTime: 12,
            difficulty: "intermediate",
            completed: false,
            content: {
              vocabulary: [
                {
                  english: "I missed my exit",
                  translations: {
                    tr: "Çıkışı kaçırdım",
                    kg: "Мен чыгууну өткөрүп жибердим",
                    ru: "Я пропустил съезд",
                  },
                },
                {
                  english: "I'm a new driver",
                  translations: {
                    tr: "Yeni bir sürücüyüm",
                    kg: "Мен жаңы айдоочумун",
                    ru: "Я новый водитель",
                  },
                },
                {
                  english: "Mechanical problem",
                  translations: {
                    tr: "Mekanik sorun",
                    kg: "Механикалык көйгөй",
                    ru: "Механическая проблема",
                  },
                },
                {
                  english: "Delivery deadline",
                  translations: {
                    tr: "Teslimat son tarihi",
                    kg: "Жеткирүү мөөнөтү",
                    ru: "Срок доставки",
                  },
                },
                {
                  english: "Navigation system",
                  translations: {
                    tr: "Navigasyon sistemi",
                    kg: "Навигация системасы",
                    ru: "Навигационная система",
                  },
                },
                {
                  english: "Traffic delay",
                  translations: {
                    tr: "Trafik gecikmesi",
                    kg: "Жол тыгыны",
                    ru: "Задержка движения",
                  },
                },
                {
                  english: "Road construction",
                  translations: {
                    tr: "Yol yapımı",
                    kg: "Жол куруу",
                    ru: "Дорожное строительство",
                  },
                },
              ],
              dialogues: [
                {
                  title: "Explaining a Route Mistake",
                  exchanges: [
                    {
                      speaker: "Officer",
                      text: "Why were you making that U-turn on the highway?",
                    },
                    {
                      speaker: "Driver",
                      text: "I'm sorry, officer. I missed my exit and my GPS was recalculating.",
                    },
                    {
                      speaker: "Officer",
                      text: "That's a dangerous maneuver. You should have taken the next exit.",
                    },
                    {
                      speaker: "Driver",
                      text: "You're right. I made a mistake. I'm not familiar with this area.",
                    },
                    { speaker: "Officer", text: "Where are you headed?" },
                    {
                      speaker: "Driver",
                      text: "I'm delivering to the distribution center in Springfield. This is my first time on this route.",
                    },
                  ],
                },
                {
                  title: "Explaining a Mechanical Issue",
                  exchanges: [
                    {
                      speaker: "Officer",
                      text: "Your right brake light is out. Did you know that?",
                    },
                    {
                      speaker: "Driver",
                      text: "No, officer, I didn't know. I checked all lights this morning during my pre-trip inspection.",
                    },
                    {
                      speaker: "Officer",
                      text: "When was your last full vehicle inspection?",
                    },
                    {
                      speaker: "Driver",
                      text: "Three days ago at our company garage. I have the paperwork here.",
                    },
                    {
                      speaker: "Officer",
                      text: "You'll need to get that fixed before continuing your route.",
                    },
                    {
                      speaker: "Driver",
                      text: "I understand. Is there a repair shop you recommend nearby?",
                    },
                  ],
                },
              ],
              culturalTips: [
                "Take responsibility for mistakes without making excuses.",
                "Be honest about your experience level if relevant to the situation.",
                "Explain problems clearly and directly without unnecessary details.",
                "Never blame your company or dispatcher when explaining situations to an officer.",
                "If you're lost or confused about directions, it's okay to admit this to the officer.",
              ],
              quiz: [
                {
                  question: "If you missed your exit, what should you do?",
                  options: [
                    "Make an illegal U-turn",
                    "Continue to the next exit",
                    "Stop on the shoulder",
                    "Call your dispatcher",
                  ],
                  correctAnswer: 1,
                },
                {
                  question: "When explaining a mechanical issue, you should:",
                  options: [
                    "Blame the maintenance team",
                    "Claim you didn't notice it",
                    "Explain when you last had an inspection",
                    "Argue it's not important",
                  ],
                  correctAnswer: 2,
                },
                {
                  question:
                    "If you're new to a route and get lost, you should:",
                  options: [
                    "Pretend you know the area",
                    "Honestly explain you're unfamiliar with the area",
                    "Ignore the officer's questions",
                    "Blame your GPS",
                  ],
                  correctAnswer: 1,
                },
              ],
            },
          },
          {
            id: "5",
            title: "Ticket or Citation Language",
            description:
              "Learn to understand the language used in traffic citations and how to respond appropriately when receiving a ticket.",
            estimatedTime: 10,
            difficulty: "intermediate",
            completed: false,
            content: {
              vocabulary: [
                {
                  english: "Citation",
                  translations: {
                    tr: "Ceza makbuzu",
                    kg: "Жазапул",
                    ru: "Штраф",
                  },
                },
                {
                  english: "Violation",
                  translations: { tr: "İhlal", kg: "Бузуу", ru: "Нарушение" },
                },
                {
                  english: "Fine",
                  translations: { tr: "Para cezası", kg: "Айып", ru: "Штраф" },
                },
                {
                  english: "Court date",
                  translations: {
                    tr: "Mahkeme tarihi",
                    kg: "Сот датасы",
                    ru: "Дата суда",
                  },
                },
                {
                  english: "Sign here",
                  translations: {
                    tr: "Burayı imzalayın",
                    kg: "Бул жерге кол коюңуз",
                    ru: "Распишитесь здесь",
                  },
                },
                {
                  english: "Contest the ticket",
                  translations: {
                    tr: "Cezaya itiraz et",
                    kg: "Жазапулга каршы чыгуу",
                    ru: "Оспорить штраф",
                  },
                },
                {
                  english: "Pay the fine",
                  translations: {
                    tr: "Para cezasını öde",
                    kg: "Айыпты төлөө",
                    ru: "Оплатить штраф",
                  },
                },
              ],
              dialogues: [
                {
                  title: "Receiving a Speeding Ticket",
                  exchanges: [
                    {
                      speaker: "Officer",
                      text: "I'm issuing you a citation for driving 65 in a 55 mph zone.",
                    },
                    { speaker: "Driver", text: "I understand, officer." },
                    {
                      speaker: "Officer",
                      text: "This is not an admission of guilt. You can either pay the fine or contest it in court.",
                    },
                    {
                      speaker: "Driver",
                      text: "What is the amount of the fine?",
                    },
                    {
                      speaker: "Officer",
                      text: "The fine is $150. All the information is on the citation, including the court date if you wish to contest it.",
                    },
                    {
                      speaker: "Driver",
                      text: "Thank you for explaining. Where do I need to sign?",
                    },
                  ],
                },
                {
                  title: "Out-of-Service Order",
                  exchanges: [
                    {
                      speaker: "Officer",
                      text: "I'm placing your vehicle out of service due to these brake violations.",
                    },
                    { speaker: "Driver", text: "What does that mean exactly?" },
                    {
                      speaker: "Officer",
                      text: "It means you cannot operate this vehicle until the violations are fixed and inspected again.",
                    },
                    { speaker: "Driver", text: "How long will that take?" },
                    {
                      speaker: "Officer",
                      text: "That depends on how quickly you can get the repairs done. Here's the out-of-service order with all the details.",
                    },
                    {
                      speaker: "Driver",
                      text: "I need to contact my company about this. May I use my phone?",
                    },
                  ],
                },
              ],
              culturalTips: [
                "Signing a ticket is not admitting guilt - it only acknowledges that you received it.",
                "Never argue with an officer about a citation - the appropriate place to contest it is in court.",
                "Remain calm and professional when receiving a citation, even if you disagree with it.",
                "Ask for clarification if you don't understand any part of the citation or what you need to do next.",
                "Keep all citation paperwork in a safe place - you'll need it later whether you pay the fine or contest it.",
              ],
              quiz: [
                {
                  question: "What does signing a citation mean?",
                  options: [
                    "You're admitting guilt",
                    "You're agreeing to pay immediately",
                    "You're acknowledging receipt",
                    "You're contesting the ticket",
                  ],
                  correctAnswer: 2,
                },
                {
                  question: "If you disagree with a citation, you should:",
                  options: [
                    "Argue with the officer",
                    "Refuse to sign it",
                    "Contest it in court",
                    "Ignore it",
                  ],
                  correctAnswer: 2,
                },
                {
                  question: "What does an out-of-service order mean?",
                  options: [
                    "You must take a break",
                    "Your vehicle cannot operate until violations are fixed",
                    "You're fired",
                    "You need to change your route",
                  ],
                  correctAnswer: 1,
                },
              ],
            },
          },
          {
            id: "6",
            title: "Emergency and Safety Scenarios",
            description:
              "Learn essential phrases for communicating with officers during emergency situations, accidents, or safety hazards.",
            estimatedTime: 12,
            difficulty: "advanced",
            completed: false,
            content: {
              vocabulary: [
                {
                  english: "Accident",
                  translations: { tr: "Kaza", kg: "Кырсык", ru: "Авария" },
                },
                {
                  english: "Injury",
                  translations: {
                    tr: "Yaralanma",
                    kg: "Жаракат",
                    ru: "Травма",
                  },
                },
                {
                  english: "Fire",
                  translations: { tr: "Yangın", kg: "Өрт", ru: "Пожар" },
                },
                {
                  english: "Hazardous materials",
                  translations: {
                    tr: "Tehlikeli maddeler",
                    kg: "Коркунучтуу заттар",
                    ru: "Опасные материалы",
                  },
                },
                {
                  english: "Call an ambulance",
                  translations: {
                    tr: "Ambulans çağır",
                    kg: "Тез жардам чакыруу",
                    ru: "Вызвать скорую помощь",
                  },
                },
                {
                  english: "First aid kit",
                  translations: {
                    tr: "İlk yardım çantası",
                    kg: "Биринчи жардам көрсөтүү топтому",
                    ru: "Аптечка первой помощи",
                  },
                },
                {
                  english: "Emergency contact",
                  translations: {
                    tr: "Acil durum irtibatı",
                    kg: "Шашылыш байланыш",
                    ru: "Экстренный контакт",
                  },
                },
              ],
              dialogues: [
                {
                  title: "Reporting an Accident",
                  exchanges: [
                    {
                      speaker: "Driver",
                      text: "Officer, there's been an accident about a mile back on the highway.",
                    },
                    { speaker: "Officer", text: "Are there any injuries?" },
                    {
                      speaker: "Driver",
                      text: "Yes, one person appears to be injured. Another driver is helping them.",
                    },
                    { speaker: "Officer", text: "Is the road blocked?" },
                    {
                      speaker: "Driver",
                      text: "Yes, one lane is completely blocked by the vehicles.",
                    },
                    {
                      speaker: "Officer",
                      text: "I'll call it in. Please wait here and tell me exactly what you saw.",
                    },
                  ],
                },
                {
                  title: "Vehicle Fire",
                  exchanges: [
                    {
                      speaker: "Driver",
                      text: "Officer! My truck's engine is smoking badly. I think it might catch fire.",
                    },
                    {
                      speaker: "Officer",
                      text: "Pull over immediately and turn off the engine. Do you have an extinguisher?",
                    },
                    {
                      speaker: "Driver",
                      text: "Yes, I have a fire extinguisher in the cab.",
                    },
                    {
                      speaker: "Officer",
                      text: "Get it ready but don't open the hood. I'm calling the fire department.",
                    },
                    {
                      speaker: "Driver",
                      text: "Should I move away from the truck?",
                    },
                    {
                      speaker: "Officer",
                      text: "Yes, move to a safe distance. Are you carrying any hazardous materials?",
                    },
                  ],
                },
              ],
              culturalTips: [
                "In emergencies, speak clearly and get to the important information quickly.",
                "Always prioritize safety over property or schedules during emergency situations.",
                "Learn the phrase 'This is an emergency' - it will help officers understand the urgency.",
                "Know how to describe your exact location - mile markers, exits, or landmarks are helpful.",
                "If you witness an accident but aren't involved, you still have a duty to report it to authorities.",
              ],
              quiz: [
                {
                  question: "If you witness an accident, you should:",
                  options: [
                    "Keep driving",
                    "Stop and report it to authorities",
                    "Take photos only",
                    "Call your company first",
                  ],
                  correctAnswer: 1,
                },
                {
                  question:
                    "If your vehicle is smoking or on fire, you should:",
                  options: [
                    "Continue driving to the next exit",
                    "Open the hood to check",
                    "Pull over immediately and turn off the engine",
                    "Pour water on the engine",
                  ],
                  correctAnswer: 2,
                },
                {
                  question:
                    "When reporting an emergency, what information is most important to provide first?",
                  options: [
                    "Your name and company",
                    "The cause of the emergency",
                    "Location and whether there are injuries",
                    "Your delivery schedule",
                  ],
                  correctAnswer: 2,
                },
              ],
            },
          },
        ],
      };
    }

    // Default module (Module 1: Basic Greetings & ID Check)
    return {
      id: id || "1",
      title: "Basic Greetings & ID Check",
      description:
        "Learn essential phrases for greeting officers and handling ID verification during traffic stops.",
      totalDialogues: 8,
      completedDialogues: 3,
      imageUrl:
        "https://images.unsplash.com/photo-1590496793929-36417d3117de?w=800&q=80",
      dialogues: [
        {
          id: "1",
          title: "Initial Greeting",
          description:
            "Basic phrases for when an officer first approaches your vehicle",
          estimatedTime: 5,
          difficulty: "beginner",
          completed: true,
          audioUrl: "/audio/greeting.mp3",
        },
        {
          id: "2",
          title: "License and Registration",
          description: "How to respond when asked for your documents",
          estimatedTime: 8,
          difficulty: "beginner",
          completed: true,
          audioUrl: "/audio/license.mp3",
        },
        {
          id: "3",
          title: "Explaining Your Route",
          description:
            "Phrases to describe where you are coming from and going to",
          estimatedTime: 10,
          difficulty: "intermediate",
          completed: true,
          audioUrl: "/audio/route.mp3",
        },
        {
          id: "4",
          title: "Understanding Instructions",
          description: "Common instructions officers might give during a stop",
          estimatedTime: 12,
          difficulty: "intermediate",
          completed: false,
          audioUrl: "/audio/instructions.mp3",
        },
        {
          id: "5",
          title: "Vehicle Inspection Basics",
          description:
            "Vocabulary related to parts of your truck during inspection",
          estimatedTime: 15,
          difficulty: "intermediate",
          completed: false,
          audioUrl: "/audio/inspection.mp3",
        },
        {
          id: "6",
          title: "Explaining Technical Issues",
          description: "How to communicate about mechanical problems",
          estimatedTime: 12,
          difficulty: "advanced",
          completed: false,
          audioUrl: "/audio/technical.mp3",
        },
        {
          id: "7",
          title: "Asking for Clarification",
          description: "Phrases to use when you don't understand something",
          estimatedTime: 8,
          difficulty: "beginner",
          completed: false,
          audioUrl: "/audio/clarification.mp3",
        },
        {
          id: "8",
          title: "Concluding the Interaction",
          description: "Polite phrases to end the conversation with an officer",
          estimatedTime: 6,
          difficulty: "beginner",
          completed: false,
          audioUrl: "/audio/conclusion.mp3",
        },
      ],
    };
  };

  const moduleData = getModuleData(id || "1");

  const completionPercentage = Math.round(
    (moduleData.completedDialogues / moduleData.totalDialogues) * 100,
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleDialogueSelect = (dialogue: Dialogue) => {
    setSelectedDialogue(dialogue);
  };

  const handleBackToList = () => {
    setSelectedDialogue(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </Button>
            <h1 className="text-xl font-bold">TruckTalk</h1>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSelector
              selectedLanguage={selectedLanguage}
              onSelectLanguage={setSelectedLanguage}
            />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {selectedDialogue ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Button variant="outline" onClick={handleBackToList}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Module
              </Button>
              <Badge variant="outline">
                {selectedDialogue.difficulty.charAt(0).toUpperCase() +
                  selectedDialogue.difficulty.slice(1)}
              </Badge>
            </div>
            {selectedDialogue?.content ? (
              <div className="space-y-8">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-bold mb-4">
                    {selectedDialogue.title}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {selectedDialogue.description}
                  </p>

                  {/* Vocabulary Section */}
                  {selectedDialogue.content.vocabulary && (
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold mb-3 flex items-center">
                        <BookOpen className="h-5 w-5 mr-2 text-primary" />
                        Vocabulary
                      </h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {selectedDialogue.content.vocabulary.map(
                            (item, index) => (
                              <div
                                key={index}
                                className="border-b border-gray-200 pb-2 last:border-0 last:pb-0"
                              >
                                <div className="flex justify-between items-center mb-1">
                                  <span className="font-medium">
                                    {item.english}
                                  </span>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                      const utterance =
                                        new SpeechSynthesisUtterance(
                                          item.english,
                                        );
                                      utterance.lang = "en-US";
                                      window.speechSynthesis.speak(utterance);
                                    }}
                                  >
                                    <Volume2 className="h-4 w-4" />
                                    <span className="sr-only">Play audio</span>
                                  </Button>
                                </div>
                                <p className="text-sm text-primary">
                                  {
                                    item.translations[
                                      selectedLanguage as keyof typeof item.translations
                                    ]
                                  }
                                </p>
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Dialogues Section */}
                  {selectedDialogue.content.dialogues && (
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold mb-3">
                        Practice Dialogues
                      </h3>
                      <Tabs
                        defaultValue={selectedDialogue.content.dialogues[0].title
                          .toLowerCase()
                          .replace(/\s+/g, "-")}
                      >
                        <TabsList className="mb-2">
                          {selectedDialogue.content.dialogues.map(
                            (dialogue, index) => (
                              <TabsTrigger
                                key={index}
                                value={dialogue.title
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")}
                              >
                                {dialogue.title}
                              </TabsTrigger>
                            ),
                          )}
                        </TabsList>

                        {selectedDialogue.content.dialogues.map(
                          (dialogue, dialogueIndex) => (
                            <TabsContent
                              key={dialogueIndex}
                              value={dialogue.title
                                .toLowerCase()
                                .replace(/\s+/g, "-")}
                              className="border rounded-lg p-4 bg-white"
                            >
                              <div className="space-y-4">
                                {dialogue.exchanges.map(
                                  (exchange, exchangeIndex) => (
                                    <div
                                      key={exchangeIndex}
                                      className={`flex ${exchange.speaker === "Officer" ? "justify-start" : "justify-end"}`}
                                    >
                                      <div
                                        className={`max-w-[80%] p-3 rounded-lg ${exchange.speaker === "Officer" ? "bg-gray-100" : "bg-primary/10"}`}
                                      >
                                        <div className="flex justify-between items-center mb-1">
                                          <span className="font-medium text-sm">
                                            {exchange.speaker}
                                          </span>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-6 w-6 p-0"
                                            onClick={() => {
                                              const utterance =
                                                new SpeechSynthesisUtterance(
                                                  exchange.text,
                                                );
                                              utterance.lang = "en-US";
                                              utterance.rate = 0.9; // Slightly slower for clarity
                                              window.speechSynthesis.speak(
                                                utterance,
                                              );
                                            }}
                                          >
                                            <Volume2 className="h-3 w-3" />
                                            <span className="sr-only">
                                              Play audio
                                            </span>
                                          </Button>
                                        </div>
                                        <p>{exchange.text}</p>
                                      </div>
                                    </div>
                                  ),
                                )}
                              </div>
                              <div className="mt-4 flex justify-center">
                                <Button
                                  onClick={() => {
                                    // Play the entire dialogue
                                    dialogue.exchanges.forEach(
                                      (exchange, i) => {
                                        const utterance =
                                          new SpeechSynthesisUtterance(
                                            exchange.text,
                                          );
                                        utterance.lang = "en-US";
                                        utterance.rate = 0.9;
                                        // Add delay between speakers
                                        setTimeout(() => {
                                          window.speechSynthesis.speak(
                                            utterance,
                                          );
                                        }, i * 3000); // 3 second delay between each line
                                      },
                                    );
                                  }}
                                >
                                  <Volume2 className="h-4 w-4 mr-2" />
                                  Play Full Dialogue
                                </Button>
                              </div>
                            </TabsContent>
                          ),
                        )}
                      </Tabs>
                    </div>
                  )}

                  {/* Cultural Tips Section */}
                  {selectedDialogue.content.culturalTips && (
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold mb-3 flex items-center">
                        <AlertCircle className="h-5 w-5 mr-2 text-amber-500" />
                        Cultural Tips
                      </h3>
                      <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
                        <ul className="space-y-2">
                          {selectedDialogue.content.culturalTips.map(
                            (tip, index) => (
                              <li key={index} className="flex items-start">
                                <span className="text-amber-500 mr-2">•</span>
                                <span>{tip}</span>
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Quiz Section */}
                  {selectedDialogue.content.quiz && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">
                        Knowledge Check
                      </h3>
                      <div className="space-y-6">
                        {selectedDialogue.content.quiz.map(
                          (question, qIndex) => (
                            <div key={qIndex} className="border rounded-lg p-4">
                              <p className="font-medium mb-3">
                                {qIndex + 1}. {question.question}
                              </p>
                              <div className="space-y-2">
                                {question.options.map((option, oIndex) => (
                                  <div
                                    key={oIndex}
                                    className="flex items-center"
                                  >
                                    <input
                                      type="radio"
                                      id={`q${qIndex}-o${oIndex}`}
                                      name={`question-${qIndex}`}
                                      className="mr-2"
                                    />
                                    <label htmlFor={`q${qIndex}-o${oIndex}`}>
                                      {option}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ),
                        )}
                        <div className="flex justify-end">
                          <Button>Check Answers</Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handleBackToList}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Module
                  </Button>
                  <Button onClick={() => setSelectedDialogue(null)}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark as Complete
                  </Button>
                </div>
              </div>
            ) : (
              <DialoguePlayer
                dialogue={selectedDialogue}
                nativeLanguage={
                  selectedLanguage === "tr"
                    ? "turkish"
                    : selectedLanguage === "kg"
                      ? "kyrgyz"
                      : "russian"
                }
                onComplete={() => setSelectedDialogue(null)}
              />
            )}
          </div>
        ) : (
          <div className="space-y-8">
            {/* Module Header */}
            <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/4">
                <img
                  src={moduleData.imageUrl}
                  alt={moduleData.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <div className="w-full md:w-3/4 space-y-4">
                <h1 className="text-2xl font-bold">{moduleData.title}</h1>
                <p className="text-gray-600">{moduleData.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Progress: {moduleData.completedDialogues} of{" "}
                      {moduleData.totalDialogues} dialogues completed
                    </span>
                    <span className="text-sm font-medium">
                      {completionPercentage}%
                    </span>
                  </div>
                  <Progress value={completionPercentage} className="h-2" />
                </div>
              </div>
            </div>

            {/* Module Content */}
            <Tabs
              defaultValue="dialogues"
              value={activeTab}
              onValueChange={setActiveTab}
            >
              <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-3">
                <TabsTrigger value="dialogues">Dialogues</TabsTrigger>
                <TabsTrigger value="vocabulary">Vocabulary</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>
              <TabsContent value="dialogues" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {moduleData.dialogues.map((dialogue) => (
                    <Card
                      key={dialogue.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${dialogue.completed ? "border-green-200" : ""}`}
                      onClick={() => handleDialogueSelect(dialogue)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-medium">{dialogue.title}</h3>
                              {dialogue.completed && (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              )}
                            </div>
                            <p className="text-sm text-gray-500">
                              {dialogue.description}
                            </p>
                            <div className="flex items-center space-x-4 pt-2">
                              <div className="flex items-center text-xs text-gray-500">
                                <Clock className="h-3 w-3 mr-1" />
                                {dialogue.estimatedTime} min
                              </div>
                              <div
                                className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(dialogue.difficulty)}`}
                              >
                                {dialogue.difficulty}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="vocabulary" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center py-8">
                      <BarChart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium mb-2">
                        Vocabulary List
                      </h3>
                      <p className="text-gray-500 mb-4">
                        Key terms and phrases from this module
                      </p>
                      <Button>View Vocabulary</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="resources" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center py-8">
                      <BarChart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium mb-2">
                        Additional Resources
                      </h3>
                      <p className="text-gray-500 mb-4">
                        Downloadable materials and practice exercises
                      </p>
                      <Button>Access Resources</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModuleDetailPage;
