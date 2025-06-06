// Traffic Stop Course Data

export interface VocabularyItem {
  word: string;
  translation: {
    tr: string;
    kg: string;
    ru: string;
  };
  definition: string;
  pronunciation: string;
  example: string;
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
        pronunciation: "LAI-suhns",
        example: "Officer, here is my driver's license.",
      },
      {
        word: "registration",
        translation: {
          tr: "ruhsat",
          kg: "каттоо күбөлүгү",
          ru: "регистрация",
        },
        definition: "document showing vehicle ownership",
        pronunciation: "rej-uh-STRAY-shuhn",
        example: "My vehicle registration is in the glove box.",
      },
      {
        word: "insurance",
        translation: {
          tr: "sigorta",
          kg: "камсыздандыруу",
          ru: "страховка",
        },
        definition: "protection against financial loss",
        pronunciation: "in-SHOOR-uhns",
        example: "I have current insurance for this truck.",
      },
      {
        word: "pull over",
        translation: {
          tr: "kenara çekmek",
          kg: "четке чыгуу",
          ru: "съехать на обочину",
        },
        definition: "to move your vehicle to the side of the road",
        pronunciation: "POOL OH-ver",
        example: "I will pull over to the right shoulder.",
      },
      {
        word: "officer",
        translation: {
          tr: "memur",
          kg: "кызматкер",
          ru: "офицер",
        },
        definition: "a police officer or law enforcement official",
        pronunciation: "AW-fi-ser",
        example: "Good morning, officer. How can I help you?",
      },
      {
        word: "speed limit",
        translation: {
          tr: "hız sınırı",
          kg: "ылдамдык чеги",
          ru: "ограничение скорости",
        },
        definition: "maximum legal speed",
        pronunciation: "SPEED LIM-it",
        example: "What is the speed limit on this highway?",
      },
      {
        word: "speeding",
        translation: {
          tr: "hız aşımı",
          kg: "ылдамдыкты арттыруу",
          ru: "превышение скорости",
        },
        definition: "driving faster than the legal speed limit",
        pronunciation: "SPEED-ing",
        example: "I apologize for speeding, officer.",
      },
      {
        word: "traffic violation",
        translation: {
          tr: "trafik ihlali",
          kg: "жол эрежелерин бузуу",
          ru: "нарушение правил дорожного движения",
        },
        definition: "breaking a traffic law",
        pronunciation: "TRAF-ik vahy-uh-LAY-shuhn",
        example: "This is my first traffic violation this year.",
      },
      {
        word: "documents",
        translation: {
          tr: "belgeler",
          kg: "документтер",
          ru: "документы",
        },
        definition: "official papers required for driving",
        pronunciation: "DOK-yuh-muhnts",
        example: "All my documents are current and valid.",
      },
      {
        word: "hands visible",
        translation: {
          tr: "eller görünür",
          kg: "колдор көрүнүп турат",
          ru: "руки на виду",
        },
        definition: "keeping hands where officer can see them",
        pronunciation: "HANDS VIZ-uh-buhl",
        example: "I will keep my hands visible on the steering wheel.",
      },
      {
        word: "steering wheel",
        translation: {
          tr: "direksiyon",
          kg: "руль",
          ru: "руль",
        },
        definition: "circular control device for directing vehicle",
        pronunciation: "STEER-ing WHEEL",
        example: "My hands are on the steering wheel, officer.",
      },
      {
        word: "apologize",
        translation: {
          tr: "özür dilemek",
          kg: "кечирим сурануу",
          ru: "извиняться",
        },
        definition: "to express regret for a mistake",
        pronunciation: "uh-POL-uh-jahyz",
        example: "I apologize for my mistake, officer.",
      },
      {
        word: "understand",
        translation: {
          tr: "anlamak",
          kg: "түшүнүү",
          ru: "понимать",
        },
        definition: "to comprehend what is being said",
        pronunciation: "uhn-der-STAND",
        example: "I understand what you are saying, officer.",
      },
      {
        word: "slowly",
        translation: {
          tr: "yavaşça",
          kg: "жай эле",
          ru: "медленно",
        },
        definition: "at a reduced speed or pace",
        pronunciation: "SLOH-lee",
        example: "I will move slowly to get my wallet.",
      },
      {
        word: "wallet",
        translation: {
          tr: "cüzdan",
          kg: "капчык",
          ru: "кошелек",
        },
        definition: "small case for carrying money and cards",
        pronunciation: "WAWL-it",
        example: "My license is in my wallet in my back pocket.",
      },
      {
        word: "glove box",
        translation: {
          tr: "torpido gözü",
          kg: "кол кутусу",
          ru: "бардачок",
        },
        definition: "storage compartment in vehicle dashboard",
        pronunciation: "GLUHV BOKS",
        example: "The registration is in the glove box.",
      },
      {
        word: "commercial vehicle",
        translation: {
          tr: "ticari araç",
          kg: "коммерциялык унаа",
          ru: "коммерческий транспорт",
        },
        definition: "vehicle used for business purposes",
        pronunciation: "kuh-MUR-shuhl VEE-i-kuhl",
        example: "This is a commercial vehicle for cargo transport.",
      },
      {
        word: "shoulder",
        translation: {
          tr: "banket",
          kg: "жол четинде",
          ru: "обочина",
        },
        definition: "edge of the road for emergency stops",
        pronunciation: "SHOHL-der",
        example: "I pulled over to the shoulder safely.",
      },
      {
        word: "emergency flashers",
        translation: {
          tr: "dörtlü flaşör",
          kg: "эскертүү жарыктары",
          ru: "аварийная сигнализация",
        },
        definition: "warning lights that flash on all sides",
        pronunciation: "ih-MUR-juhn-see FLASH-erz",
        example: "I turned on my emergency flashers when I stopped.",
      },
      {
        word: "cooperate",
        translation: {
          tr: "işbirliği yapmak",
          kg: "кызматташуу",
          ru: "сотрудничать",
        },
        definition: "to work together and follow instructions",
        pronunciation: "koh-OP-uh-rayt",
        example: "I want to cooperate fully with your investigation.",
      },
    ],
    dialogues: [
      {
        title: "Being Pulled Over",
        exchanges: [
          {
            speaker: "Officer",
            text: "Good afternoon. I need to see your license, registration, and insurance please.",
          },
          {
            speaker: "Driver",
            text: "Good afternoon, officer. Yes, of course. My hands are on the steering wheel. May I reach for my documents?",
          },
          {
            speaker: "Officer",
            text: "Yes, go ahead slowly. Take your time.",
          },
          {
            speaker: "Driver",
            text: "Thank you, officer. Here is my CDL, insurance card, and registration. I'm sorry, my English is not perfect.",
          },
          {
            speaker: "Officer",
            text: "That's okay, you're doing fine. Do you know why I pulled you over today?",
          },
          {
            speaker: "Driver",
            text: "No, officer. I'm not sure. Did I do something wrong? I was trying to be very careful.",
          },
          {
            speaker: "Officer",
            text: "You were traveling 65 miles per hour in a 55 mile per hour zone. The speed limit dropped back there at the construction sign.",
          },
          {
            speaker: "Driver",
            text: "Oh no, I'm very sorry, officer. I have a delivery deadline today and I was worried about being late. But I should have been more careful with the speed limit. This is my mistake.",
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
        pronunciation: "kuh-MUR-shuhl DRAHY-verz LAI-suhns",
        example: "Here is my CDL, officer. It's valid until next year.",
      },
      {
        word: "Electronic Logging Device (ELD)",
        translation: {
          tr: "Elektronik Kayıt Cihazı",
          kg: "Электрондук каттоо түзмөгү",
          ru: "Электронное устройство регистрации",
        },
        definition: "device that records driving hours",
        pronunciation: "ih-lek-TRON-ik LOG-ing dih-VAIS",
        example: "I use an ELD to track my driving hours automatically.",
      },
      {
        word: "logbook",
        translation: {
          tr: "sefer defteri",
          kg: "каттоо китепчеси",
          ru: "журнал учета",
        },
        definition: "record of driving hours and rest periods",
        pronunciation: "LOG-book",
        example: "My logbook shows I have been following all regulations.",
      },
      {
        word: "Hours of Service",
        translation: {
          tr: "Hizmet Saatleri",
          kg: "Кызмат сааттары",
          ru: "Часы обслуживания",
        },
        definition: "regulations limiting driving time",
        pronunciation: "OWRZ uhv SUR-vis",
        example: "I am compliant with all Hours of Service regulations.",
      },
      {
        word: "medical certificate",
        translation: {
          tr: "sağlık belgesi",
          kg: "медициналык сертификат",
          ru: "медицинская справка",
        },
        definition: "document certifying medical fitness to drive",
        pronunciation: "MED-i-kuhl ser-TIF-i-kit",
        example: "My medical certificate is current and attached to my CDL.",
      },
      {
        word: "expired",
        translation: {
          tr: "süresi dolmuş",
          kg: "мөөнөтү бүткөн",
          ru: "просроченный",
        },
        definition: "no longer valid due to time passing",
        pronunciation: "ik-SPAHYRD",
        example: "No officer, none of my documents are expired.",
      },
      {
        word: "valid",
        translation: {
          tr: "geçerli",
          kg: "жарактуу",
          ru: "действительный",
        },
        definition: "legally acceptable and current",
        pronunciation: "VAL-id",
        example: "All my documents are valid and up to date.",
      },
      {
        word: "inspection",
        translation: {
          tr: "denetim",
          kg: "текшерүү",
          ru: "проверка",
        },
        definition: "official examination of documents or vehicle",
        pronunciation: "in-SPEK-shuhn",
        example: "I am ready for your inspection, officer.",
      },
      {
        word: "compliance",
        translation: {
          tr: "uygunluk",
          kg: "шайкештик",
          ru: "соответствие",
        },
        definition: "following rules and regulations",
        pronunciation: "kuhm-PLAHY-uhns",
        example: "I maintain full compliance with DOT regulations.",
      },
      {
        word: "violation",
        translation: {
          tr: "ihlal",
          kg: "бузуу",
          ru: "нарушение",
        },
        definition: "breaking a rule or law",
        pronunciation: "vahy-uh-LAY-shuhn",
        example: "I have no recent violations on my record.",
      },
      {
        word: "duty status",
        translation: {
          tr: "görev durumu",
          kg: "милдет абалы",
          ru: "статус службы",
        },
        definition: "current work status (driving, on-duty, off-duty)",
        pronunciation: "DOO-tee STAY-tuhs",
        example: "My current duty status is 'driving'.",
      },
      {
        word: "rest period",
        translation: {
          tr: "dinlenme süresi",
          kg: "эс алуу мезгили",
          ru: "период отдыха",
        },
        definition: "required time off between driving shifts",
        pronunciation: "REST PEER-ee-uhd",
        example: "I completed my 10-hour rest period before driving.",
      },
      {
        word: "driving time",
        translation: {
          tr: "sürüş süresi",
          kg: "айдоо убактысы",
          ru: "время вождения",
        },
        definition: "hours spent actively driving",
        pronunciation: "DRAHY-ving TAHYM",
        example: "I have 6 hours of driving time remaining today.",
      },
      {
        word: "on-duty time",
        translation: {
          tr: "görevde geçen süre",
          kg: "кызматтагы убакыт",
          ru: "рабочее время",
        },
        definition: "total time working, including non-driving tasks",
        pronunciation: "ON-doo-tee TAHYM",
        example: "My total on-duty time today is 8 hours.",
      },
      {
        word: "sleeper berth",
        translation: {
          tr: "yatak bölmesi",
          kg: "уктоочу жай",
          ru: "спальное место",
        },
        definition: "sleeping area in truck cab",
        pronunciation: "SLEEP-er BURTH",
        example: "I took my rest period in the sleeper berth.",
      },
      {
        word: "pre-trip inspection",
        translation: {
          tr: "sefer öncesi kontrol",
          kg: "жолго чыгуудан мурунку текшерүү",
          ru: "предрейсовый осмотр",
        },
        definition: "safety check before starting to drive",
        pronunciation: "PREE-trip in-SPEK-shuhn",
        example: "I completed my pre-trip inspection this morning.",
      },
      {
        word: "post-trip inspection",
        translation: {
          tr: "sefer sonrası kontrol",
          kg: "жолдон кийинки текшерүү",
          ru: "послерейсовый осмотр",
        },
        definition: "safety check after completing driving",
        pronunciation: "POHST-trip in-SPEK-shuhn",
        example: "I will do my post-trip inspection when I arrive.",
      },
      {
        word: "DOT number",
        translation: {
          tr: "DOT numarası",
          kg: "DOT номери",
          ru: "номер DOT",
        },
        definition: "Department of Transportation identification number",
        pronunciation: "DOT NUHM-ber",
        example: "Our company DOT number is displayed on the truck.",
      },
      {
        word: "carrier",
        translation: {
          tr: "taşıyıcı",
          kg: "ташуучу",
          ru: "перевозчик",
        },
        definition: "company that transports goods",
        pronunciation: "KAIR-ee-er",
        example: "I work for ABC Carrier as a company driver.",
      },
      {
        word: "endorsement",
        translation: {
          tr: "ek yetki",
          kg: "кошумча укук",
          ru: "разрешение",
        },
        definition: "special permission on license for specific cargo",
        pronunciation: "en-DAWRS-muhnt",
        example: "I have a hazmat endorsement on my CDL.",
      },
    ],
    dialogues: [
      {
        title: "Checking Documents",
        exchanges: [
          {
            speaker: "Officer",
            text: "I need to see your commercial driver's license, current insurance, and your logbook for inspection.",
          },
          {
            speaker: "Driver",
            text: "Yes, officer. Here is my CDL. It's valid until next year. Let me get my insurance card and logbook. I keep everything organized in this folder.",
          },
          {
            speaker: "Officer",
            text: "Good. Are you using an electronic logging device or paper logs?",
          },
          {
            speaker: "Driver",
            text: "I use electronic logging device, officer. My company requires it. This tablet here shows all my hours. Should I turn it on for you?",
          },
          {
            speaker: "Officer",
            text: "Yes, please. I need to see your hours of service records for the past 7 days. Can you navigate to that screen?",
          },
          {
            speaker: "Driver",
            text: "Of course, officer. Here, you can see I have been following all the rules. I took my 10-hour rest period last night. I'm still learning the system, but I think I'm doing it correctly.",
          },
          {
            speaker: "Officer",
            text: "This looks good. Your driving hours are within limits. How long have you been driving commercially?",
          },
          {
            speaker: "Driver",
            text: "Two years now, officer. I got my CDL when I moved to America. My company trained me well, and I always try to follow all regulations. Safety is very important to me and my family.",
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
        pronunciation: "in-SPEK-shuhn",
        example: "This is a Level 2 roadside inspection.",
      },
      {
        word: "brake",
        translation: {
          tr: "fren",
          kg: "тормоз",
          ru: "тормоз",
        },
        definition: "device for slowing or stopping a vehicle",
        pronunciation: "BRAYK",
        example: "Please test your brake lights for me.",
      },
      {
        word: "lights",
        translation: {
          tr: "ışıklar",
          kg: "жарыктар",
          ru: "фары",
        },
        definition: "vehicle illumination devices",
        pronunciation: "LAHYTS",
        example: "Turn on all your lights so I can check them.",
      },
      {
        word: "tire",
        translation: {
          tr: "lastik",
          kg: "дөңгөлөк",
          ru: "шина",
        },
        definition: "rubber covering around a wheel",
        pronunciation: "TAHYR",
        example: "I need to check the tire tread depth.",
      },
      {
        word: "engine",
        translation: {
          tr: "motor",
          kg: "кыймылдаткыч",
          ru: "двигатель",
        },
        definition: "machine that powers the vehicle",
        pronunciation: "EN-juhn",
        example: "Please start the engine so I can listen to it.",
      },
      {
        word: "hood",
        translation: {
          tr: "kaput",
          kg: "капот",
          ru: "капот",
        },
        definition: "cover over the engine compartment",
        pronunciation: "HOOD",
        example: "Pop the hood so I can inspect the engine.",
      },
      {
        word: "safety violation",
        translation: {
          tr: "güvenlik ihlali",
          kg: "коопсуздук эрежелерин бузуу",
          ru: "нарушение безопасности",
        },
        definition: "breaking a safety regulation",
        pronunciation: "SAYF-tee vahy-uh-LAY-shuhn",
        example: "This cracked windshield is a safety violation.",
      },
      {
        word: "step out",
        translation: {
          tr: "dışarı çıkmak",
          kg: "чыгуу",
          ru: "выйти",
        },
        definition: "to exit the vehicle",
        pronunciation: "STEP OWT",
        example: "Please step out of the vehicle for inspection.",
      },
      {
        word: "turn signals",
        translation: {
          tr: "sinyal lambaları",
          kg: "бурулуу жарыктары",
          ru: "поворотники",
        },
        definition: "lights that indicate turning direction",
        pronunciation: "TURN SIG-nuhlz",
        example: "Test your left and right turn signals.",
      },
      {
        word: "headlights",
        translation: {
          tr: "farlar",
          kg: "алдыңкы жарыктар",
          ru: "фары",
        },
        definition: "front lights for nighttime driving",
        pronunciation: "HED-lahyts",
        example: "Turn on your headlights, both low and high beam.",
      },
      {
        word: "brake lights",
        translation: {
          tr: "fren lambaları",
          kg: "тормоз жарыктары",
          ru: "стоп-сигналы",
        },
        definition: "red lights that activate when braking",
        pronunciation: "BRAYK LAHYTS",
        example: "Press the brake pedal to test the brake lights.",
      },
      {
        word: "windshield",
        translation: {
          tr: "ön cam",
          kg: "алдыңкы айнек",
          ru: "лобовое стекло",
        },
        definition: "front window of the vehicle",
        pronunciation: "WIND-sheeld",
        example: "Your windshield has a crack that needs repair.",
      },
      {
        word: "mirrors",
        translation: {
          tr: "aynalar",
          kg: "күзгүлөр",
          ru: "зеркала",
        },
        definition: "reflective surfaces for seeing behind vehicle",
        pronunciation: "MIR-erz",
        example: "Adjust your mirrors so I can check them.",
      },
      {
        word: "exhaust system",
        translation: {
          tr: "egzoz sistemi",
          kg: "чыгаруу системасы",
          ru: "выхлопная система",
        },
        definition: "system that removes engine emissions",
        pronunciation: "ig-ZAWST SIS-tuhm",
        example: "I need to inspect your exhaust system for leaks.",
      },
      {
        word: "suspension",
        translation: {
          tr: "süspansiyon",
          kg: "суспензия",
          ru: "подвеска",
        },
        definition: "system that supports vehicle weight and absorbs shocks",
        pronunciation: "suh-SPEN-shuhn",
        example: "The suspension components look good.",
      },
      {
        word: "air brakes",
        translation: {
          tr: "havalı frenler",
          kg: "аба тормоздору",
          ru: "пневматические тормоза",
        },
        definition: "braking system using compressed air",
        pronunciation: "AIR BRAYKS",
        example: "Test your air brakes by applying pressure.",
      },
      {
        word: "tread depth",
        translation: {
          tr: "diş derinliği",
          kg: "протектордун тереңдиги",
          ru: "глубина протектора",
        },
        definition: "measurement of tire grip surface",
        pronunciation: "TRED DEPTH",
        example: "The tread depth on this tire is too shallow.",
      },
      {
        word: "defect",
        translation: {
          tr: "kusur",
          kg: "кемчилик",
          ru: "дефект",
        },
        definition: "fault or problem with vehicle component",
        pronunciation: "DEE-fekt",
        example: "I found a defect in your brake system.",
      },
      {
        word: "out of service",
        translation: {
          tr: "hizmet dışı",
          kg: "кызматтан чыгарылган",
          ru: "вне эксплуатации",
        },
        definition: "vehicle cannot be driven until repaired",
        pronunciation: "OWT uhv SUR-vis",
        example: "This vehicle is out of service until repairs are made.",
      },
      {
        word: "warning triangle",
        translation: {
          tr: "uyarı üçgeni",
          kg: "эскертүү үч бурчтугу",
          ru: "аварийный треугольник",
        },
        definition: "reflective triangle for roadside emergencies",
        pronunciation: "WAWR-ning TRAHY-ang-guhl",
        example: "Do you have warning triangles in your truck?",
      },
    ],
    dialogues: [
      {
        title: "Level 2 Inspection",
        exchanges: [
          {
            speaker: "Officer",
            text: "I'm going to conduct a Level 2 roadside inspection today. This is routine. Please step out of the vehicle and bring your documents with you.",
          },
          {
            speaker: "Driver",
            text: "Yes, officer. Is there a problem with my truck? I did my pre-trip inspection this morning and everything looked good. Should I be worried?",
          },
          {
            speaker: "Officer",
            text: "This is just a routine safety inspection. Nothing to worry about if your vehicle is properly maintained. Please pop the hood so I can inspect the engine compartment.",
          },
          {
            speaker: "Driver",
            text: "Of course, officer. The hood release is right here inside the cab. I had the truck serviced last week at our company garage. All the maintenance records are in my logbook if you need them.",
          },
          {
            speaker: "Officer",
            text: "Good. Now I need you to turn on all your lights - headlights, turn signals, brake lights, and hazard lights. I'll walk around and check each one.",
          },
          {
            speaker: "Driver",
            text: "Yes, sir. Headlights are on now. Should I test the turn signals too? Left signal... right signal... and here are the hazard lights. My partner usually helps me check these, but I can do it myself.",
          },
          {
            speaker: "Officer",
            text: "Perfect. Now press the brake pedal and hold it so I can check the brake lights. Everything looks good so far.",
          },
          {
            speaker: "Driver",
            text: "Thank you, officer. I try to keep my truck in good condition. My family depends on this job, so I want to make sure everything is safe and legal. How much longer will this take? I have a delivery appointment, but safety comes first.",
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
        pronunciation: "muh-KAN-i-kuhl PROB-luhm",
        example: "I have a mechanical problem with my transmission.",
      },
      {
        word: "breakdown",
        translation: {
          tr: "arıza",
          kg: "бузулуу",
          ru: "поломка",
        },
        definition: "vehicle failure",
        pronunciation: "BRAYK-down",
        example: "I had a breakdown and called for roadside assistance.",
      },
      {
        word: "delivery deadline",
        translation: {
          tr: "teslimat son tarihi",
          kg: "жеткирүү мөөнөтү",
          ru: "срок доставки",
        },
        definition: "time by which cargo must be delivered",
        pronunciation: "dih-LIV-uh-ree DED-lahyn",
        example: "I have a delivery deadline tomorrow morning.",
      },
      {
        word: "lost",
        translation: {
          tr: "kaybolmak",
          kg: "адашуу",
          ru: "заблудиться",
        },
        definition: "unable to find the way",
        pronunciation: "LAWST",
        example: "I got lost trying to find the delivery address.",
      },
      {
        word: "detour",
        translation: {
          tr: "sapma",
          kg: "айланып өтүү",
          ru: "объезд",
        },
        definition: "alternate route",
        pronunciation: "DEE-toor",
        example: "I took a detour because of road construction.",
      },
      {
        word: "GPS",
        translation: {
          tr: "GPS",
          kg: "GPS",
          ru: "GPS",
        },
        definition: "navigation system",
        pronunciation: "JEE-PEE-ES",
        example: "My GPS stopped working and I got confused.",
      },
      {
        word: "mistake",
        translation: {
          tr: "hata",
          kg: "ката",
          ru: "ошибка",
        },
        definition: "error or wrong action",
        pronunciation: "mi-STAYK",
        example: "I made a mistake and took the wrong exit.",
      },
      {
        word: "confused",
        translation: {
          tr: "kafası karışık",
          kg: "башы катышкан",
          ru: "запутался",
        },
        definition: "unable to understand clearly",
        pronunciation: "kuhn-FYOOZD",
        example: "I was confused by the road signs.",
      },
      {
        word: "repair shop",
        translation: {
          tr: "tamir dükkanı",
          kg: "оңдоо дүкөнү",
          ru: "ремонтная мастерская",
        },
        definition: "place where vehicles are fixed",
        pronunciation: "ri-PAIR SHOP",
        example: "Is there a repair shop nearby?",
      },
      {
        word: "emergency",
        translation: {
          tr: "acil durum",
          kg: "өзгөчө кырдаал",
          ru: "чрезвычайная ситуация",
        },
        definition: "urgent situation requiring immediate action",
        pronunciation: "ih-MUR-juhn-see",
        example: "This is not an emergency, just a minor problem.",
      },
      {
        word: "explain",
        translation: {
          tr: "açıklamak",
          kg: "түшүндүрүү",
          ru: "объяснить",
        },
        definition: "to make something clear by describing it",
        pronunciation: "ik-SPLAYN",
        example: "Let me explain what happened, officer.",
      },
      {
        word: "situation",
        translation: {
          tr: "durum",
          kg: "кырдаал",
          ru: "ситуация",
        },
        definition: "the circumstances or conditions",
        pronunciation: "sich-oo-AY-shuhn",
        example: "I can explain the whole situation to you.",
      },
      {
        word: "honest",
        translation: {
          tr: "dürüst",
          kg: "чынчыл",
          ru: "честный",
        },
        definition: "truthful and sincere",
        pronunciation: "ON-ist",
        example: "I want to be completely honest with you, officer.",
      },
      {
        word: "responsibility",
        translation: {
          tr: "sorumluluk",
          kg: "жоопкерчилик",
          ru: "ответственность",
        },
        definition: "being accountable for one's actions",
        pronunciation: "ri-spon-suh-BIL-i-tee",
        example: "I take full responsibility for my mistake.",
      },
      {
        word: "experience",
        translation: {
          tr: "deneyim",
          kg: "тажрыйба",
          ru: "опыт",
        },
        definition: "knowledge gained from doing something",
        pronunciation: "ik-SPEER-ee-uhns",
        example: "I have 5 years of driving experience.",
      },
      {
        word: "directions",
        translation: {
          tr: "yol tarifi",
          kg: "жол көрсөтүү",
          ru: "направления",
        },
        definition: "instructions on how to get somewhere",
        pronunciation: "dih-REK-shuhnz",
        example: "Could you give me directions to the nearest truck stop?",
      },
      {
        word: "company policy",
        translation: {
          tr: "şirket politikası",
          kg: "компания саясаты",
          ru: "политика компании",
        },
        definition: "rules set by the employer",
        pronunciation: "KUHM-puh-nee POL-uh-see",
        example: "Our company policy requires me to stop every 4 hours.",
      },
      {
        word: "dispatcher",
        translation: {
          tr: "sevkiyatçı",
          kg: "диспетчер",
          ru: "диспетчер",
        },
        definition: "person who coordinates truck routes and schedules",
        pronunciation: "dis-PACH-er",
        example: "My dispatcher told me to take this route.",
      },
      {
        word: "route",
        translation: {
          tr: "güzergah",
          kg: "маршрут",
          ru: "маршрут",
        },
        definition: "planned path from one place to another",
        pronunciation: "ROOT",
        example: "I am following the route my company gave me.",
      },
      {
        word: "traffic",
        translation: {
          tr: "trafik",
          kg: "жол кыймылы",
          ru: "движение",
        },
        definition: "vehicles moving on roads",
        pronunciation: "TRAF-ik",
        example: "Heavy traffic made me late for my delivery.",
      },
    ],
    dialogues: [
      {
        title: "Explaining a Mechanical Issue",
        exchanges: [
          {
            speaker: "Officer",
            text: "I noticed your right brake light is not working. Were you aware of this problem?",
          },
          {
            speaker: "Driver",
            text: "Oh no, really? I'm so sorry, officer. I didn't know about this. I checked all my lights this morning during my pre-trip inspection, and they were working fine. This must have happened during my trip.",
          },
          {
            speaker: "Officer",
            text: "When was your last full vehicle inspection? Do you have the documentation with you?",
          },
          {
            speaker: "Driver",
            text: "Yes, officer. I had a complete inspection three days ago at our company garage. Here is the paperwork - you can see everything passed. I'm very careful about maintenance because I know how important safety is.",
          },
          {
            speaker: "Officer",
            text: "I can see your inspection is current. However, you'll need to get that brake light fixed before you can continue driving. It's a safety violation.",
          },
          {
            speaker: "Driver",
            text: "I completely understand, officer. Safety is most important. Is there a repair shop nearby that you would recommend? I don't know this area very well, and I want to get this fixed properly.",
          },
          {
            speaker: "Officer",
            text: "There's a truck service center about 2 miles ahead at the next exit. They should be able to replace the bulb quickly. It's probably just a burned-out bulb.",
          },
          {
            speaker: "Driver",
            text: "Thank you so much for your help, officer. I will go there right away. I'm sorry for this problem. I will call my dispatcher to let them know about the delay. My company will understand - they always tell us safety comes first.",
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
        pronunciation: "sahy-TAY-shuhn",
        example: "I am issuing you a citation for speeding.",
      },
      {
        word: "ticket",
        translation: {
          tr: "ceza",
          kg: "айып",
          ru: "штраф",
        },
        definition: "document stating a violation and fine",
        pronunciation: "TIK-it",
        example: "This ticket explains the violation and fine amount.",
      },
      {
        word: "fine",
        translation: {
          tr: "para cezası",
          kg: "айып",
          ru: "штраф",
        },
        definition: "money paid as penalty",
        pronunciation: "FAHYN",
        example: "The fine for this violation is $150.",
      },
      {
        word: "court date",
        translation: {
          tr: "mahkeme tarihi",
          kg: "сот датасы",
          ru: "дата суда",
        },
        definition: "scheduled time to appear in court",
        pronunciation: "KORT DAYT",
        example: "Your court date is printed on the citation.",
      },
      {
        word: "sign here",
        translation: {
          tr: "burayı imzalayın",
          kg: "бул жерге кол коюңуз",
          ru: "распишитесь здесь",
        },
        definition: "instruction to provide signature",
        pronunciation: "SAHYN HEER",
        example: "Please sign here to acknowledge receipt.",
      },
      {
        word: "out-of-service order",
        translation: {
          tr: "hizmet dışı emri",
          kg: "кызматтан чыгаруу буйругу",
          ru: "приказ о выводе из эксплуатации",
        },
        definition: "official command prohibiting vehicle operation",
        pronunciation: "OWT-uhv-SUR-vis AWR-der",
        example:
          "This out-of-service order means you cannot drive until repairs are made.",
      },
      {
        word: "acknowledge",
        translation: {
          tr: "kabul etmek",
          kg: "макулдашуу",
          ru: "подтвердить",
        },
        definition: "to confirm that you received something",
        pronunciation: "ak-NOL-ij",
        example: "Your signature acknowledges that you received the citation.",
      },
      {
        word: "contest",
        translation: {
          tr: "itiraz etmek",
          kg: "каршы чыгуу",
          ru: "оспорить",
        },
        definition: "to dispute or challenge in court",
        pronunciation: "kuhn-TEST",
        example: "You can contest this citation in court if you disagree.",
      },
      {
        word: "guilty",
        translation: {
          tr: "suçlu",
          kg: "күнөөлүү",
          ru: "виновный",
        },
        definition: "responsible for breaking the law",
        pronunciation: "GIL-tee",
        example: "Signing this is not an admission of guilt.",
      },
      {
        word: "admission",
        translation: {
          tr: "itiraf",
          kg: "мойнуна алуу",
          ru: "признание",
        },
        definition: "accepting responsibility for something",
        pronunciation: "ad-MISH-uhn",
        example: "This signature is not an admission of guilt.",
      },
      {
        word: "payment",
        translation: {
          tr: "ödeme",
          kg: "төлөм",
          ru: "платеж",
        },
        definition: "money given to settle a debt or fine",
        pronunciation: "PAY-muhnt",
        example: "Payment instructions are on the back of the citation.",
      },
      {
        word: "due date",
        translation: {
          tr: "son ödeme tarihi",
          kg: "төлөө мөөнөтү",
          ru: "срок оплаты",
        },
        definition: "deadline for payment or court appearance",
        pronunciation: "DOO DAYT",
        example: "The due date for payment is 30 days from today.",
      },
      {
        word: "violation code",
        translation: {
          tr: "ihlal kodu",
          kg: "бузуу коду",
          ru: "код нарушения",
        },
        definition: "number identifying the specific law broken",
        pronunciation: "vahy-uh-LAY-shuhn KOHD",
        example: "The violation code is printed on your citation.",
      },
      {
        word: "mph",
        translation: {
          tr: "mil/saat",
          kg: "миля/саат",
          ru: "миль в час",
        },
        definition: "miles per hour - speed measurement",
        pronunciation: "EM-PEE-AYCH",
        example: "You were driving 65 mph in a 55 mph zone.",
      },
      {
        word: "zone",
        translation: {
          tr: "bölge",
          kg: "аймак",
          ru: "зона",
        },
        definition: "area with specific rules or limits",
        pronunciation: "ZOHN",
        example: "This is a construction zone with reduced speed limits.",
      },
      {
        word: "receipt",
        translation: {
          tr: "makbuz",
          kg: "түбөлүк",
          ru: "квитанция",
        },
        definition: "proof that you received something",
        pronunciation: "ri-SEET",
        example: "Keep this receipt as proof of payment.",
      },
      {
        word: "argue",
        translation: {
          tr: "tartışmak",
          kg: "талашуу",
          ru: "спорить",
        },
        definition: "to disagree or dispute angrily",
        pronunciation: "AHR-gyoo",
        example: "Do not argue with the officer about the citation.",
      },
      {
        word: "professional",
        translation: {
          tr: "profesyonel",
          kg: "кесипкөй",
          ru: "профессиональный",
        },
        definition: "behaving in a business-like, respectful manner",
        pronunciation: "pruh-FESH-uh-nuhl",
        example: "Remain calm and professional when receiving a citation.",
      },
      {
        word: "clarification",
        translation: {
          tr: "açıklama",
          kg: "тактоо",
          ru: "разъяснение",
        },
        definition: "explanation to make something clearer",
        pronunciation: "klar-uh-fi-KAY-shuhn",
        example: "May I ask for clarification about this violation?",
      },
      {
        word: "paperwork",
        translation: {
          tr: "evrak işleri",
          kg: "кагаз иштери",
          ru: "документооборот",
        },
        definition: "documents and forms that need to be completed",
        pronunciation: "PAY-per-wurk",
        example: "Keep all citation paperwork in a safe place.",
      },
    ],
    dialogues: [
      {
        title: "Receiving a Speeding Ticket",
        exchanges: [
          {
            speaker: "Officer",
            text: "I'm going to issue you a citation for speeding - you were driving 65 miles per hour in a 55 mile per hour zone.",
          },
          {
            speaker: "Driver",
            text: "I understand, officer. I'm very sorry about this. This is my first ticket in America. I was not trying to break the law - I was just worried about my delivery time.",
          },
          {
            speaker: "Officer",
            text: "I understand the pressure you're under, but safety has to come first. Now, signing this citation is not an admission of guilt. You have two options: you can pay the fine or contest it in court.",
          },
          {
            speaker: "Driver",
            text: "Thank you for explaining that to me, officer. What is the amount of the fine? And will this affect my commercial driver's license? I'm worried about my job.",
          },
          {
            speaker: "Officer",
            text: "The fine is $150. Since this is a minor speeding violation, it shouldn't affect your CDL status, but you should check with your company. All the information is printed on the citation, including the court date if you choose to contest it.",
          },
          {
            speaker: "Driver",
            text: "Thank you for being patient with me, officer. I will pay the fine and learn from this mistake. Where do I need to sign? And can you please speak slowly when you explain the next steps?",
          },
          {
            speaker: "Officer",
            text: "Of course. Sign here on this line. This just means you received the ticket, not that you're admitting guilt. You have 30 days to either pay online or appear in court. The website and court address are on the back.",
          },
          {
            speaker: "Driver",
            text: "Thank you very much, officer. I will be more careful with speed limits from now on. I appreciate your kindness and patience with my English. Have a safe day.",
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
        pronunciation: "AK-si-duhnt",
        example: "There has been an accident on the highway.",
      },
      {
        word: "injury",
        translation: {
          tr: "yaralanma",
          kg: "жаракат",
          ru: "травма",
        },
        definition: "physical harm",
        pronunciation: "IN-juh-ree",
        example: "One person has a serious injury and needs help.",
      },
      {
        word: "ambulance",
        translation: {
          tr: "ambulans",
          kg: "тез жардам",
          ru: "скорая помощь",
        },
        definition: "emergency medical vehicle",
        pronunciation: "AM-byuh-luhns",
        example: "We need an ambulance at mile marker 45.",
      },
      {
        word: "fire",
        translation: {
          tr: "yangın",
          kg: "өрт",
          ru: "пожар",
        },
        definition: "combustion that produces flame",
        pronunciation: "FAHYR",
        example: "There is a small fire in the engine compartment.",
      },
      {
        word: "hazardous materials",
        translation: {
          tr: "tehlikeli maddeler",
          kg: "коркунучтуу заттар",
          ru: "опасные материалы",
        },
        definition: "dangerous substances",
        pronunciation: "HAZ-er-duhs muh-TEER-ee-uhlz",
        example: "I am not carrying any hazardous materials.",
      },
      {
        word: "help",
        translation: {
          tr: "yardım",
          kg: "жардам",
          ru: "помощь",
        },
        definition: "assistance in time of need",
        pronunciation: "HELP",
        example: "I need help with this emergency situation.",
      },
      {
        word: "emergency",
        translation: {
          tr: "acil durum",
          kg: "өзгөчө кырдаал",
          ru: "чрезвычайная ситуация",
        },
        definition: "serious situation requiring immediate action",
        pronunciation: "ih-MUR-juhn-see",
        example: "This is an emergency - please send help immediately.",
      },
      {
        word: "witness",
        translation: {
          tr: "tanık",
          kg: "күбө",
          ru: "свидетель",
        },
        definition: "person who saw what happened",
        pronunciation: "WIT-nis",
        example: "I was a witness to the accident.",
      },
      {
        word: "collision",
        translation: {
          tr: "çarpışma",
          kg: "кагышуу",
          ru: "столкновение",
        },
        definition: "crash between two or more vehicles",
        pronunciation: "kuh-LIZH-uhn",
        example: "The collision happened at the intersection.",
      },
      {
        word: "unconscious",
        translation: {
          tr: "bilinçsiz",
          kg: "эсинен танган",
          ru: "без сознания",
        },
        definition: "not awake or aware",
        pronunciation: "uhn-KON-shuhs",
        example: "The driver appears to be unconscious.",
      },
      {
        word: "bleeding",
        translation: {
          tr: "kanama",
          kg: "кан агуу",
          ru: "кровотечение",
        },
        definition: "losing blood from a wound",
        pronunciation: "BLEED-ing",
        example: "The person is bleeding from a head wound.",
      },
      {
        word: "blocked",
        translation: {
          tr: "engelli",
          kg: "бөгөттөлгөн",
          ru: "заблокирован",
        },
        definition: "road or path is not passable",
        pronunciation: "BLOKD",
        example: "The right lane is completely blocked.",
      },
      {
        word: "mile marker",
        translation: {
          tr: "mil işareti",
          kg: "миля белгиси",
          ru: "километровый столб",
        },
        definition: "roadside sign showing distance",
        pronunciation: "MAHYL MAHR-ker",
        example: "The accident is near mile marker 127.",
      },
      {
        word: "exit",
        translation: {
          tr: "çıkış",
          kg: "чыгуу жолу",
          ru: "съезд",
        },
        definition: "ramp leaving the highway",
        pronunciation: "EG-zit",
        example: "The accident is between exits 15 and 16.",
      },
      {
        word: "landmark",
        translation: {
          tr: "işaret noktası",
          kg: "белги",
          ru: "ориентир",
        },
        definition: "recognizable feature used for location",
        pronunciation: "LAND-mahrk",
        example: "The accident is near the big water tower landmark.",
      },
      {
        word: "first aid",
        translation: {
          tr: "ilk yardım",
          kg: "биринчи жардам",
          ru: "первая помощь",
        },
        definition: "basic medical help given immediately",
        pronunciation: "FURST AYD",
        example: "I know basic first aid and can help.",
      },
      {
        word: "fire extinguisher",
        translation: {
          tr: "yangın söndürücü",
          kg: "өрт өчүргүч",
          ru: "огнетушитель",
        },
        definition: "device for putting out fires",
        pronunciation: "FAHYR ik-STING-gwish-er",
        example: "I have a fire extinguisher in my truck.",
      },
      {
        word: "call it in",
        translation: {
          tr: "bildirmek",
          kg: "кабарлоо",
          ru: "сообщить",
        },
        definition: "to report by radio or phone",
        pronunciation: "KAWL it IN",
        example: "I'll call it in to dispatch immediately.",
      },
      {
        word: "priority",
        translation: {
          tr: "öncelik",
          kg: "биринчи кезек",
          ru: "приоритет",
        },
        definition: "most important thing to handle first",
        pronunciation: "prahy-AWR-i-tee",
        example: "Safety is the top priority in any emergency.",
      },
      {
        word: "duty",
        translation: {
          tr: "görev",
          kg: "милдет",
          ru: "обязанность",
        },
        definition: "responsibility or obligation",
        pronunciation: "DOO-tee",
        example: "I have a duty to report accidents I witness.",
      },
    ],
    dialogues: [
      {
        title: "Reporting an Accident",
        exchanges: [
          {
            speaker: "Driver",
            text: "Officer! Officer! Please, I need to report an accident. There has been a serious accident about one mile back on the highway. I saw it happen.",
          },
          {
            speaker: "Officer",
            text: "Okay, slow down and tell me clearly. Are there any injuries? Do people need medical help?",
          },
          {
            speaker: "Driver",
            text: "Yes, officer. I think so. One person was not moving, and there was blood. Another driver stopped to help them, but I think we need ambulance quickly. I was very scared, but I knew I had to report this.",
          },
          {
            speaker: "Officer",
            text: "You did the right thing. Is the roadway blocked? Can traffic still get through?",
          },
          {
            speaker: "Driver",
            text: "Yes, the right lane is completely blocked by the crashed cars. Traffic is backing up very bad. Some cars are trying to go around, but it's dangerous. I put on my hazard lights and tried to warn other drivers.",
          },
          {
            speaker: "Officer",
            text: "Good thinking. I'm calling this in right now to get emergency services there. Can you tell me exactly where this happened? Any mile markers or landmarks?",
          },
          {
            speaker: "Driver",
            text: "Yes, officer. It was just past the big blue water tower, maybe near mile marker 127. There were two cars - a red car and a white SUV. The red car was in the ditch. Should I go back to help?",
          },
          {
            speaker: "Driver",
            text: "No, stay here with me. Emergency vehicles are on the way. You've done enough by reporting it. Can you tell me exactly what you saw happen? This information will be very important for the investigation.",
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
  {
    id: "basic-greetings",
    title: "Basic Greetings & ID Check",
    description:
      "Learn essential phrases for introducing yourself and handling ID verification during traffic stops.",
    vocabulary: [
      {
        word: "good morning",
        translation: {
          tr: "günaydın",
          kg: "кутман таң",
          ru: "доброе утро",
        },
        definition: "polite greeting used in the morning",
        pronunciation: "GOOD MAWR-ning",
        example: "Good morning, officer. How can I help you?",
      },
      {
        word: "good afternoon",
        translation: {
          tr: "iyi günler",
          kg: "кутман күн",
          ru: "добрый день",
        },
        definition: "polite greeting used in the afternoon",
        pronunciation: "GOOD af-ter-NOON",
        example: "Good afternoon, officer. Here are my documents.",
      },
      {
        word: "identification",
        translation: {
          tr: "kimlik",
          kg: "жеке күбөлүк",
          ru: "удостоверение личности",
        },
        definition: "document proving who you are",
        pronunciation: "ahy-den-tuh-fi-KAY-shuhn",
        example: "May I see your identification, please?",
      },
      {
        word: "passport",
        translation: {
          tr: "pasaport",
          kg: "паспорт",
          ru: "паспорт",
        },
        definition: "official travel document",
        pronunciation: "PAS-pawrt",
        example: "Here is my passport and driver's license.",
      },
      {
        word: "good evening",
        translation: {
          tr: "iyi akşamlar",
          kg: "кутман кеч",
          ru: "добрый вечер",
        },
        definition: "polite greeting used in the evening",
        pronunciation: "GOOD EEV-ning",
        example: "Good evening, officer. Is there a problem?",
      },
      {
        word: "please",
        translation: {
          tr: "lütfen",
          kg: "сураныч",
          ru: "пожалуйста",
        },
        definition: "polite word when making a request",
        pronunciation: "PLEEZ",
        example: "Could you please repeat that?",
      },
      {
        word: "thank you",
        translation: {
          tr: "teşekkür ederim",
          kg: "рахмат",
          ru: "спасибо",
        },
        definition: "expression of gratitude",
        pronunciation: "THANGK YOO",
        example: "Thank you for your patience, officer.",
      },
      {
        word: "excuse me",
        translation: {
          tr: "affedersiniz",
          kg: "кечиресиз",
          ru: "извините",
        },
        definition: "polite way to get attention or apologize",
        pronunciation: "ik-SKYOOZ MEE",
        example: "Excuse me, officer, I didn't hear you clearly.",
      },
      {
        word: "sir",
        translation: {
          tr: "efendim",
          kg: "мырза",
          ru: "сэр",
        },
        definition: "respectful way to address a male officer",
        pronunciation: "SUR",
        example: "Yes, sir. I understand completely.",
      },
      {
        word: "ma'am",
        translation: {
          tr: "hanımefendi",
          kg: "айым",
          ru: "мэм",
        },
        definition: "respectful way to address a female officer",
        pronunciation: "MAM",
        example: "No ma'am, I don't have any questions.",
      },
      {
        word: "purpose",
        translation: {
          tr: "amaç",
          kg: "максат",
          ru: "цель",
        },
        definition: "reason for doing something",
        pronunciation: "PUR-puhs",
        example: "The purpose of my trip is to deliver cargo.",
      },
      {
        word: "trip",
        translation: {
          tr: "yolculuk",
          kg: "саякат",
          ru: "поездка",
        },
        definition: "journey from one place to another",
        pronunciation: "TRIP",
        example: "This is a business trip for my company.",
      },
      {
        word: "delivering",
        translation: {
          tr: "teslim etmek",
          kg: "жеткирүү",
          ru: "доставлять",
        },
        definition: "taking goods to their destination",
        pronunciation: "dih-LIV-er-ing",
        example: "I am delivering cargo to the warehouse.",
      },
      {
        word: "cargo",
        translation: {
          tr: "kargo",
          kg: "жүк",
          ru: "груз",
        },
        definition: "goods being transported",
        pronunciation: "KAHR-goh",
        example: "My cargo is automotive parts.",
      },
      {
        word: "warehouse",
        translation: {
          tr: "depo",
          kg: "кампа",
          ru: "склад",
        },
        definition: "large building for storing goods",
        pronunciation: "WAIR-hows",
        example: "The warehouse is located in the next city.",
      },
      {
        word: "polite",
        translation: {
          tr: "kibar",
          kg: "сылык",
          ru: "вежливый",
        },
        definition: "showing good manners and respect",
        pronunciation: "puh-LAHYT",
        example: "Always be polite when speaking to officers.",
      },
      {
        word: "respectful",
        translation: {
          tr: "saygılı",
          kg: "урматтуу",
          ru: "уважительный",
        },
        definition: "showing consideration for others",
        pronunciation: "ri-SPEKT-fuhl",
        example: "I want to be respectful during this stop.",
      },
      {
        word: "clearly",
        translation: {
          tr: "açıkça",
          kg: "ачык",
          ru: "ясно",
        },
        definition: "in a way that is easy to understand",
        pronunciation: "KLEER-lee",
        example: "Please speak clearly so I can understand.",
      },
      {
        word: "repeat",
        translation: {
          tr: "tekrarlamak",
          kg: "кайталоо",
          ru: "повторить",
        },
        definition: "to say something again",
        pronunciation: "ri-PEET",
        example: "Could you please repeat your question?",
      },
      {
        word: "understand",
        translation: {
          tr: "anlamak",
          kg: "түшүнүү",
          ru: "понимать",
        },
        definition: "to comprehend what is being said",
        pronunciation: "uhn-der-STAND",
        example: "I understand what you are asking, officer.",
      },
    ],
    dialogues: [
      {
        title: "Basic Introduction",
        exchanges: [
          {
            speaker: "Officer",
            text: "Good morning. I'm Officer Johnson. May I see your identification and driver's license please?",
          },
          {
            speaker: "Driver",
            text: "Good morning, officer. Yes, of course. Here is my passport and my commercial driver's license. I also have my medical certificate attached. Is everything okay?",
          },
          {
            speaker: "Officer",
            text: "Thank you. Everything looks fine so far. What is the purpose of your trip today? Where are you headed?",
          },
          {
            speaker: "Driver",
            text: "I am delivering cargo to a warehouse in the next city, officer. I have automotive parts for a factory there. This is my regular route - I drive this way twice a week for my company.",
          },
          {
            speaker: "Officer",
            text: "How long have you been driving this route? Are you familiar with the area?",
          },
          {
            speaker: "Driver",
            text: "About six months now, officer. I'm still learning some of the roads, but I use GPS and my company gives me good directions. I moved to America two years ago, and this job has been very good for my family.",
          },
          {
            speaker: "Officer",
            text: "That's great. Your English is very good. Is this your first time being stopped by police in the US?",
          },
          {
            speaker: "Driver",
            text: "Thank you, officer. Yes, this is my first time. I was a little nervous, but you are very kind. I always try to follow all the rules because I want to be a good driver and a good citizen here.",
          },
        ],
      },
    ],
    tips: [
      "Always greet the officer politely",
      "Have your documents ready and organized",
      "Speak clearly and at a moderate pace",
      "Make eye contact when speaking",
    ],
  },
  {
    id: "road-signs-traffic-rules",
    title: "Road Signs & Traffic Rules",
    description:
      "Understand common road signs, traffic rules, and how to explain your actions to officers.",
    vocabulary: [
      {
        word: "stop sign",
        translation: {
          tr: "dur işareti",
          kg: "токто белгиси",
          ru: "знак стоп",
        },
        definition: "red octagonal sign requiring complete stop",
      },
      {
        word: "yield",
        translation: {
          tr: "yol ver",
          kg: "жол бер",
          ru: "уступить дорогу",
        },
        definition: "give right of way to other traffic",
      },
      {
        word: "merge",
        translation: {
          tr: "birleşmek",
          kg: "кошулуу",
          ru: "слияние",
        },
        definition: "join traffic from another lane",
      },
    ],
    dialogues: [
      {
        title: "Traffic Rule Explanation",
        exchanges: [
          {
            speaker: "Officer",
            text: "The reason I stopped you is because you didn't come to a complete stop at that stop sign back there. You slowed down, but you didn't stop completely.",
          },
          {
            speaker: "Driver",
            text: "Oh, I'm very sorry, officer. I thought I stopped completely. In my country, sometimes we do what you call 'rolling stop' - but I know I should follow American rules exactly. I was wrong.",
          },
          {
            speaker: "Officer",
            text: "I appreciate your honesty. In the US, you need to come to a complete stop - that means your wheels are not moving at all, even for a few seconds. Then you can proceed when it's safe.",
          },
          {
            speaker: "Driver",
            text: "I understand now, officer. Thank you for explaining this to me. I will remember - complete stop means no movement at all. I don't want to cause an accident or break the law.",
          },
          {
            speaker: "Officer",
            text: "That's the right attitude. With a big truck like yours, it's especially important because other drivers need to see that you're fully stopped before they make their decisions.",
          },
          {
            speaker: "Driver",
            text: "Yes, you are absolutely right, officer. My truck is very heavy and other cars need to know what I'm doing. I will practice this and be more careful. Will you give me a ticket for this mistake?",
          },
          {
            speaker: "Officer",
            text: "Since this is your first violation and you're clearly trying to learn and follow the rules, I'm going to give you a warning this time. But please remember - complete stops at all stop signs.",
          },
          {
            speaker: "Driver",
            text: "Thank you so much for your kindness, officer. I really appreciate this warning. I will never forget this lesson. You have helped me become a better and safer driver.",
          },
        ],
      },
    ],
    tips: [
      "Learn the meaning of common road signs",
      "Always come to a complete stop at stop signs",
      "Understand right-of-way rules",
      "Know the difference between yield and stop",
    ],
  },
  {
    id: "border-crossing",
    title: "Border Crossing and Inspection",
    description:
      "Communication skills for border crossings, customs, and international transport documentation.",
    vocabulary: [
      {
        word: "customs",
        translation: {
          tr: "gümrük",
          kg: "бажы",
          ru: "таможня",
        },
        definition: "government agency controlling imports and exports",
      },
      {
        word: "manifest",
        translation: {
          tr: "manifest",
          kg: "манифест",
          ru: "манифест",
        },
        definition: "document listing cargo contents",
      },
      {
        word: "declaration",
        translation: {
          tr: "beyan",
          kg: "декларация",
          ru: "декларация",
        },
        definition: "official statement of goods being transported",
      },
    ],
    dialogues: [
      {
        title: "Border Inspection",
        exchanges: [
          {
            speaker: "Officer",
            text: "Good afternoon. Welcome to the United States. Please present your passport, commercial driver's license, and cargo manifest for inspection.",
          },
          {
            speaker: "Driver",
            text: "Good afternoon, officer. Here are all my documents. My passport, CDL, and the cargo manifest. I also have the bill of lading and customs declaration if you need them.",
          },
          {
            speaker: "Officer",
            text: "Thank you. What type of cargo are you carrying today, and where is it going?",
          },
          {
            speaker: "Driver",
            text: "I am carrying automotive parts, officer. Engine components going to a factory in Detroit. Everything is listed in the manifest here. The total weight is about 35,000 pounds.",
          },
          {
            speaker: "Officer",
            text: "How often do you make this crossing? Are you a regular driver on this route?",
          },
          {
            speaker: "Driver",
            text: "Yes, officer. I cross here about twice a month for my company. I have been doing this route for eight months now. The border officers here know me, and I always have all my paperwork ready.",
          },
          {
            speaker: "Officer",
            text: "Good. I need to inspect your cargo area. Please open the back of your trailer and step aside while I take a look.",
          },
          {
            speaker: "Driver",
            text: "Of course, officer. Here are the keys to the trailer lock. The cargo is secured with straps as required. Please be careful - some of the parts are heavy. Should I help you or stay back?",
          },
        ],
      },
    ],
    tips: [
      "Have all border crossing documents organized",
      "Know exactly what cargo you are carrying",
      "Be patient during inspections",
      "Answer questions directly and honestly",
    ],
  },
  {
    id: "vehicle-maintenance",
    title: "Vehicle Maintenance Vocabulary",
    description:
      "Learn terms related to truck parts, maintenance issues, and repair conversations.",
    vocabulary: [
      {
        word: "transmission",
        translation: {
          tr: "şanzıman",
          kg: "берүү кутусу",
          ru: "трансмиссия",
        },
        definition: "system that transfers power from engine to wheels",
      },
      {
        word: "alternator",
        translation: {
          tr: "alternatör",
          kg: "альтернатор",
          ru: "генератор",
        },
        definition: "device that generates electrical power",
      },
      {
        word: "maintenance",
        translation: {
          tr: "bakım",
          kg: "тейлөө",
          ru: "техническое обслуживание",
        },
        definition: "regular care and repair of equipment",
      },
    ],
    dialogues: [
      {
        title: "Maintenance Discussion",
        exchanges: [
          {
            speaker: "Officer",
            text: "I need to ask you about your vehicle maintenance. When was your last full maintenance check and inspection?",
          },
          {
            speaker: "Driver",
            text: "I had a complete inspection two weeks ago at our company garage, officer. They check everything - brakes, lights, tires, engine. I also do my pre-trip inspection every morning before I start driving.",
          },
          {
            speaker: "Officer",
            text: "That's good to hear. Do you have the maintenance records with you? I'd like to see the documentation.",
          },
          {
            speaker: "Driver",
            text: "Yes, officer. All the paperwork is right here in my logbook. Here is the inspection report from two weeks ago, and here are the receipts for the oil change and brake check. My company is very strict about maintenance.",
          },
          {
            speaker: "Officer",
            text: "I can see your records are well organized. Have you noticed any problems with the truck lately? Any warning lights or unusual sounds?",
          },
          {
            speaker: "Driver",
            text: "No problems, officer. The truck runs very well. Sometimes I hear a small noise from the air brakes, but the mechanic said it's normal. I always report any problems to my company immediately because safety is most important.",
          },
          {
            speaker: "Officer",
            text: "You're doing everything right. It's clear you take good care of your equipment. How long have you been driving this particular truck?",
          },
          {
            speaker: "Driver",
            text: "About one year now, officer. It's a 2019 Freightliner, and my company maintains it very well. I treat it like my own truck because it's how I support my family. Good maintenance means fewer problems on the road.",
          },
        ],
      },
    ],
    tips: [
      "Keep maintenance records organized",
      "Know basic truck components",
      "Understand maintenance schedules",
      "Be able to explain recent repairs",
    ],
  },
  {
    id: "cargo-documentation",
    title: "Cargo Documentation",
    description:
      "Vocabulary for discussing cargo manifests, bills of lading, and other shipping documents.",
    vocabulary: [
      {
        word: "bill of lading",
        translation: {
          tr: "konşimento",
          kg: "жүк тапшыруу баракчасы",
          ru: "коносамент",
        },
        definition: "document detailing cargo and shipping terms",
      },
      {
        word: "freight",
        translation: {
          tr: "navlun",
          kg: "жүк ташуу",
          ru: "груз",
        },
        definition: "goods transported by truck, ship, or plane",
      },
      {
        word: "shipper",
        translation: {
          tr: "gönderici",
          kg: "жөнөтүүчү",
          ru: "грузоотправитель",
        },
        definition: "person or company sending the cargo",
      },
    ],
    dialogues: [
      {
        title: "Document Review",
        exchanges: [
          {
            speaker: "Officer",
            text: "I need to review your shipping documents. Please show me your bill of lading and cargo manifest.",
          },
          {
            speaker: "Driver",
            text: "Yes, officer. Here are all the documents. The bill of lading is here, and this is the manifest. The cargo is going to three different locations - two stops in Ohio and one in Pennsylvania.",
          },
          {
            speaker: "Officer",
            text: "I see. Who is the original shipper for this load? And what's the total weight you're carrying?",
          },
          {
            speaker: "Driver",
            text: "The shipper is ABC Manufacturing Company in Detroit, officer. The total weight is 42,000 pounds - I'm not overweight. Here is the scale ticket from when I picked up the load yesterday.",
          },
          {
            speaker: "Officer",
            text: "Good. What type of materials are you transporting? Anything hazardous or requiring special permits?",
          },
          {
            speaker: "Driver",
            text: "No hazardous materials, officer. Just regular automotive parts - brake components, filters, and some engine parts. Nothing dangerous. I don't have hazmat endorsement on my license, so I only carry regular freight.",
          },
          {
            speaker: "Officer",
            text: "Your paperwork looks complete and accurate. How long have you been working for this company?",
          },
          {
            speaker: "Driver",
            text: "Almost two years now, officer. They are a good company - they train their drivers well and always make sure we have proper documentation. My dispatcher always checks that I have all the right papers before I leave.",
          },
        ],
      },
    ],
    tips: [
      "Understand all shipping documents",
      "Know your pickup and delivery locations",
      "Be familiar with shipper and consignee information",
      "Keep documents easily accessible",
    ],
  },
  {
    id: "weather-road-safety",
    title: "Weather Conditions & Road Safety",
    description:
      "Essential phrases for discussing weather conditions, road hazards, and safety precautions.",
    vocabulary: [
      {
        word: "visibility",
        translation: {
          tr: "görüş mesafesi",
          kg: "көрүү аралыгы",
          ru: "видимость",
        },
        definition: "how far you can see clearly",
      },
      {
        word: "ice",
        translation: {
          tr: "buz",
          kg: "муз",
          ru: "лед",
        },
        definition: "frozen water on road surface",
      },
      {
        word: "fog",
        translation: {
          tr: "sis",
          kg: "туман",
          ru: "туман",
        },
        definition: "thick cloud near the ground",
      },
    ],
    dialogues: [
      {
        title: "Weather Safety Discussion",
        exchanges: [
          {
            speaker: "Officer",
            text: "I stopped you because the weather conditions are getting very dangerous. The fog is getting thicker, and visibility is dropping fast. Are you planning to continue driving in these conditions?",
          },
          {
            speaker: "Driver",
            text: "Officer, I'm actually very worried about this fog. I can barely see 50 feet ahead of me. I was thinking I should find a safe place to park and wait for it to clear. Is that the right thing to do?",
          },
          {
            speaker: "Officer",
            text: "That's absolutely the right decision. Safety comes first, always. There's a truck stop with a large parking area about 5 miles ahead at the next exit. You can wait there safely.",
          },
          {
            speaker: "Driver",
            text: "Thank you so much for this information, officer. I will drive there very slowly with my hazard lights on. I have a delivery deadline, but I know it's not worth risking an accident.",
          },
          {
            speaker: "Officer",
            text: "You're making the smart choice. Most companies understand weather delays. How long have you been driving in conditions like this?",
          },
          {
            speaker: "Driver",
            text: "This is only my second time in such thick fog, officer. In my country, we don't have fog like this very often. I'm still learning about American weather conditions. It's scary when you can't see the road.",
          },
          {
            speaker: "Officer",
            text: "You're handling it well. When you get to the truck stop, park away from the highway and wait until visibility improves to at least a quarter mile before continuing.",
          },
          {
            speaker: "Driver",
            text: "I will do exactly that, officer. Thank you for caring about my safety and for giving me good advice. I will call my dispatcher and let them know about the weather delay. Better to arrive late than not at all.",
          },
        ],
      },
    ],
    tips: [
      "Know when conditions are too dangerous to drive",
      "Understand weather-related vocabulary",
      "Be able to describe road conditions",
      "Know how to ask for weather updates",
    ],
  },
];
