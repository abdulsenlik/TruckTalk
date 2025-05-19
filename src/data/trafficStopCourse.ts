// Traffic Stop Course Data

export interface VocabularyItem {
  word: string;
  translation: {
    tr: string;
    kg: string;
    ru: string;
  };
  definition: string;
}

export interface DialogueExchange {
  speaker: string;
  text: string;
}

export interface Section {
  id: string;
  title: string;
  description: string;
  vocabulary: VocabularyItem[];
  dialogues: {
    title: string;
    exchanges: DialogueExchange[];
  }[];
  tips: string[];
}

export const trafficStopCourse: Section[] = [
  {
    id: "initial-stop",
    title: "Initial Traffic Stop",
    description:
      "Essential phrases and vocabulary for when an officer first pulls you over.",
    vocabulary: [
      {
        word: "license",
        translation: {
          tr: "ehliyet",
          kg: "айдоочунун күбөлүгү",
          ru: "водительские права",
        },
        definition: "official document permitting you to drive",
      },
      {
        word: "registration",
        translation: {
          tr: "ruhsat",
          kg: "каттоо күбөлүгү",
          ru: "регистрация",
        },
        definition: "document showing vehicle ownership",
      },
      {
        word: "insurance",
        translation: {
          tr: "sigorta",
          kg: "камсыздандыруу",
          ru: "страховка",
        },
        definition: "protection against financial loss",
      },
      {
        word: "pull over",
        translation: {
          tr: "kenara çekmek",
          kg: "четке чыгуу",
          ru: "съехать на обочину",
        },
        definition: "to move your vehicle to the side of the road",
      },
      {
        word: "officer",
        translation: {
          tr: "memur",
          kg: "кызматкер",
          ru: "офицер",
        },
        definition: "a police officer or law enforcement official",
      },
      {
        word: "speed limit",
        translation: {
          tr: "hız sınırı",
          kg: "ылдамдык чеги",
          ru: "ограничение скорости",
        },
        definition: "maximum legal speed",
      },
      {
        word: "speeding",
        translation: {
          tr: "hız aşımı",
          kg: "ылдамдыкты арттыруу",
          ru: "превышение скорости",
        },
        definition: "driving faster than the legal speed limit",
      },
      {
        word: "traffic violation",
        translation: {
          tr: "trafik ihlali",
          kg: "жол эрежелерин бузуу",
          ru: "нарушение правил дорожного движения",
        },
        definition: "breaking a traffic law",
      },
    ],
    dialogues: [
      {
        title: "Being Pulled Over",
        exchanges: [
          {
            speaker: "Officer",
            text: "Good afternoon. License, registration, and insurance please.",
          },
          {
            speaker: "Driver",
            text: "Good afternoon, officer. Here are my documents.",
          },
          {
            speaker: "Officer",
            text: "Do you know why I pulled you over?",
          },
          {
            speaker: "Driver",
            text: "No, officer. What seems to be the problem?",
          },
          {
            speaker: "Officer",
            text: "You were going 65 in a 55 zone.",
          },
          {
            speaker: "Driver",
            text: "I apologize. I didn't notice the speed limit.",
          },
        ],
      },
    ],
    tips: [
      "Always keep your hands visible on the steering wheel until instructed otherwise",
      "Address the officer as 'officer' or 'sir/ma'am'",
      "Move slowly when reaching for documents",
      "Inform the officer before reaching for documents: 'My license is in my wallet. May I reach for it?'",
      "Never exit your vehicle unless instructed to do so",
    ],
  },
  {
    id: "document-check",
    title: "Document Check",
    description:
      "How to understand and respond to requests for documentation during a traffic stop.",
    vocabulary: [
      {
        word: "Commercial Driver's License (CDL)",
        translation: {
          tr: "Ticari Sürücü Belgesi",
          kg: "Коммерциялык айдоочу күбөлүгү",
          ru: "Коммерческие водительские права",
        },
        definition: "special license required to operate commercial vehicles",
      },
      {
        word: "Electronic Logging Device (ELD)",
        translation: {
          tr: "Elektronik Kayıt Cihazı",
          kg: "Электрондук каттоо түзмөгү",
          ru: "Электронное устройство регистрации",
        },
        definition: "device that records driving hours",
      },
      {
        word: "logbook",
        translation: {
          tr: "sefer defteri",
          kg: "каттоо китепчеси",
          ru: "журнал учета",
        },
        definition: "record of driving hours and rest periods",
      },
      {
        word: "Hours of Service",
        translation: {
          tr: "Hizmet Saatleri",
          kg: "Кызмат сааттары",
          ru: "Часы обслуживания",
        },
        definition: "regulations limiting driving time",
      },
      {
        word: "medical certificate",
        translation: {
          tr: "sağlık belgesi",
          kg: "медициналык сертификат",
          ru: "медицинская справка",
        },
        definition: "document certifying medical fitness to drive",
      },
      {
        word: "expired",
        translation: {
          tr: "süresi dolmuş",
          kg: "мөөнөтү бүткөн",
          ru: "просроченный",
        },
        definition: "no longer valid due to time passing",
      },
    ],
    dialogues: [
      {
        title: "Checking Documents",
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
    ],
    tips: [
      "Keep all documents organized and easily accessible",
      "If you don't understand something, ask for clarification",
      "Know how to access and display your electronic logs",
      "Make sure all your documents are current and not expired",
      "Be familiar with how to show your Hours of Service records",
    ],
  },
  {
    id: "vehicle-inspection",
    title: "Vehicle Inspection",
    description:
      "Understanding instructions during roadside inspections and safety checks.",
    vocabulary: [
      {
        word: "inspection",
        translation: {
          tr: "denetim",
          kg: "текшерүү",
          ru: "проверка",
        },
        definition: "official examination of the vehicle",
      },
      {
        word: "brake",
        translation: {
          tr: "fren",
          kg: "тормоз",
          ru: "тормоз",
        },
        definition: "device for slowing or stopping a vehicle",
      },
      {
        word: "lights",
        translation: {
          tr: "ışıklar",
          kg: "жарыктар",
          ru: "фары",
        },
        definition: "vehicle illumination devices",
      },
      {
        word: "tire",
        translation: {
          tr: "lastik",
          kg: "дөңгөлөк",
          ru: "шина",
        },
        definition: "rubber covering around a wheel",
      },
      {
        word: "engine",
        translation: {
          tr: "motor",
          kg: "кыймылдаткыч",
          ru: "двигатель",
        },
        definition: "machine that powers the vehicle",
      },
      {
        word: "hood",
        translation: {
          tr: "kaput",
          kg: "капот",
          ru: "капот",
        },
        definition: "cover over the engine compartment",
      },
      {
        word: "safety violation",
        translation: {
          tr: "güvenlik ihlali",
          kg: "коопсуздук эрежелерин бузуу",
          ru: "нарушение безопасности",
        },
        definition: "breaking a safety regulation",
      },
    ],
    dialogues: [
      {
        title: "Level 2 Inspection",
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
    ],
    tips: [
      "Follow all instructions carefully and promptly",
      "Move slowly and deliberately during inspections",
      "Know the basic components of your vehicle",
      "Be familiar with how to operate all vehicle systems",
      "If you don't understand an instruction, ask for clarification",
    ],
  },
  {
    id: "explaining-situations",
    title: "Explaining Situations",
    description:
      "How to explain common situations, mistakes, or mechanical issues to officers.",
    vocabulary: [
      {
        word: "mechanical problem",
        translation: {
          tr: "mekanik sorun",
          kg: "механикалык көйгөй",
          ru: "механическая проблема",
        },
        definition: "issue with the vehicle's functioning",
      },
      {
        word: "breakdown",
        translation: {
          tr: "arıza",
          kg: "бузулуу",
          ru: "поломка",
        },
        definition: "vehicle failure",
      },
      {
        word: "delivery deadline",
        translation: {
          tr: "teslimat son tarihi",
          kg: "жеткирүү мөөнөтү",
          ru: "срок доставки",
        },
        definition: "time by which cargo must be delivered",
      },
      {
        word: "lost",
        translation: {
          tr: "kaybolmak",
          kg: "адашуу",
          ru: "заблудиться",
        },
        definition: "unable to find the way",
      },
      {
        word: "detour",
        translation: {
          tr: "sapma",
          kg: "айланып өтүү",
          ru: "объезд",
        },
        definition: "alternate route",
      },
      {
        word: "GPS",
        translation: {
          tr: "GPS",
          kg: "GPS",
          ru: "GPS",
        },
        definition: "navigation system",
      },
    ],
    dialogues: [
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
    tips: [
      "Take responsibility for mistakes without making excuses",
      "Be honest about your experience level if relevant",
      "Explain problems clearly and directly",
      "Never blame your company or dispatcher when explaining situations",
      "If you're lost or confused about directions, it's okay to admit this",
    ],
  },
  {
    id: "citations-and-tickets",
    title: "Citations and Tickets",
    description:
      "Understanding traffic citations and how to respond appropriately when receiving a ticket.",
    vocabulary: [
      {
        word: "citation",
        translation: {
          tr: "ceza makbuzu",
          kg: "жазапул",
          ru: "штраф",
        },
        definition: "official notice of a traffic violation",
      },
      {
        word: "ticket",
        translation: {
          tr: "ceza",
          kg: "айып",
          ru: "штраф",
        },
        definition: "document stating a violation and fine",
      },
      {
        word: "fine",
        translation: {
          tr: "para cezası",
          kg: "айып",
          ru: "штраф",
        },
        definition: "money paid as penalty",
      },
      {
        word: "court date",
        translation: {
          tr: "mahkeme tarihi",
          kg: "сот датасы",
          ru: "дата суда",
        },
        definition: "scheduled time to appear in court",
      },
      {
        word: "sign here",
        translation: {
          tr: "burayı imzalayın",
          kg: "бул жерге кол коюңуз",
          ru: "распишитесь здесь",
        },
        definition: "instruction to provide signature",
      },
      {
        word: "out-of-service order",
        translation: {
          tr: "hizmet dışı emri",
          kg: "кызматтан чыгаруу буйругу",
          ru: "приказ о выводе из эксплуатации",
        },
        definition: "official command prohibiting vehicle operation",
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
          {
            speaker: "Driver",
            text: "I understand, officer.",
          },
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
    ],
    tips: [
      "Signing a ticket is not admitting guilt - it only acknowledges that you received it",
      "Never argue with an officer about a citation - the appropriate place to contest it is in court",
      "Remain calm and professional when receiving a citation",
      "Ask for clarification if you don't understand any part of the citation",
      "Keep all citation paperwork in a safe place",
    ],
  },
  {
    id: "emergency-situations",
    title: "Emergency Situations",
    description:
      "Essential phrases for communicating during emergency situations, accidents, or safety hazards.",
    vocabulary: [
      {
        word: "accident",
        translation: {
          tr: "kaza",
          kg: "кырсык",
          ru: "авария",
        },
        definition: "collision or crash involving vehicles",
      },
      {
        word: "injury",
        translation: {
          tr: "yaralanma",
          kg: "жаракат",
          ru: "травма",
        },
        definition: "physical harm",
      },
      {
        word: "ambulance",
        translation: {
          tr: "ambulans",
          kg: "тез жардам",
          ru: "скорая помощь",
        },
        definition: "emergency medical vehicle",
      },
      {
        word: "fire",
        translation: {
          tr: "yangın",
          kg: "өрт",
          ru: "пожар",
        },
        definition: "combustion that produces flame",
      },
      {
        word: "hazardous materials",
        translation: {
          tr: "tehlikeli maddeler",
          kg: "коркунучтуу заттар",
          ru: "опасные материалы",
        },
        definition: "dangerous substances",
      },
      {
        word: "help",
        translation: {
          tr: "yardım",
          kg: "жардам",
          ru: "помощь",
        },
        definition: "assistance in time of need",
      },
      {
        word: "emergency",
        translation: {
          tr: "acil durum",
          kg: "өзгөчө кырдаал",
          ru: "чрезвычайная ситуация",
        },
        definition: "serious situation requiring immediate action",
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
          {
            speaker: "Officer",
            text: "Are there any injuries?",
          },
          {
            speaker: "Driver",
            text: "Yes, one person appears to be injured. Another driver is helping them.",
          },
          {
            speaker: "Officer",
            text: "Is the road blocked?",
          },
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
    ],
    tips: [
      "In emergencies, speak clearly and get to the important information quickly",
      "Always prioritize safety over property or schedules",
      "Learn the phrase 'This is an emergency' - it will help officers understand the urgency",
      "Know how to describe your exact location - mile markers, exits, or landmarks are helpful",
      "If you witness an accident but aren't involved, you still have a duty to report it",
    ],
  },
];
