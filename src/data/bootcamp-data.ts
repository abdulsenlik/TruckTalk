export interface ModuleSection {
  id: string;
  title: string;
  duration: number;
  type: "video" | "vocabulary" | "dialogue" | "roleplay" | "quiz" | "practice";
  description: string;
  completed: boolean;
  content?: any;
}

export interface BootcampModule {
  id: number;
  title: string;
  description: string;
  duration: number;
  sections: ModuleSection[];
  completion: number;
}

// Sample data for Module 1
const module1: BootcampModule = {
  id: 1,
  title: "Foundations & Essential Trucking Vocabulary",
  description:
    "Master core trucking industry terms and document handling terminology",
  duration: 120, // minutes
  completion: 0,
  sections: [
    {
      id: "intro",
      title: "Introduction & Icebreaker",
      duration: 30,
      type: "video",
      description:
        "Welcome to the 10-Hour English Bootcamp for Truck Drivers. Let's get started with some basic introductions and set your learning goals.",
      completed: false,
      content: {
        videoUrl: "https://example.com/intro-video",
        transcript:
          "Welcome to the 10-Hour English Bootcamp for Truck Drivers. In this course, you'll learn essential English vocabulary and phrases that will help you communicate effectively on the road...",
      },
    },
    {
      id: "vocabulary",
      title: "Core Trucking Vocabulary",
      duration: 45,
      type: "vocabulary",
      description:
        "Learn essential trucking industry terms related to vehicle components, cargo types, and route planning.",
      completed: false,
      content: {
        vocabularyItems: [
          {
            word: "cab",
            translation: {
              tr: "kamyon kabini",
              kg: "кабина",
              ru: "кабина",
            },
            definition: "The compartment or shelter where the driver sits",
            example: "The driver climbed into the cab of his truck.",
          },
          {
            word: "trailer",
            translation: {
              tr: "römork",
              kg: "чиркегич",
              ru: "прицеп",
            },
            definition: "A vehicle pulled by another vehicle",
            example: "He connected the trailer to his truck.",
          },
          {
            word: "load",
            translation: {
              tr: "yük",
              kg: "жүк",
              ru: "груз",
            },
            definition: "The cargo carried by a truck",
            example: "The truck was carrying a heavy load of furniture.",
          },
          {
            word: "dispatch",
            translation: {
              tr: "sevkiyat",
              kg: "жөнөтүү",
              ru: "отправка",
            },
            definition: "To send off to a destination or for a purpose",
            example:
              "The company dispatched three trucks to deliver the goods.",
          },
          {
            word: "freight",
            translation: {
              tr: "navlun",
              kg: "жүк ташуу",
              ru: "фрахт",
            },
            definition:
              "Goods transported in bulk by truck, train, ship, or aircraft",
            example: "The freight arrived on time despite the bad weather.",
          },
          {
            word: "haul",
            translation: {
              tr: "taşıma",
              kg: "ташуу",
              ru: "перевозка",
            },
            definition: "To transport by truck over a long distance",
            example: "He hauls goods between New York and Chicago.",
          },
          {
            word: "rig",
            translation: {
              tr: "tır",
              kg: "чоң жүк ташуучу",
              ru: "фура",
            },
            definition: "A large truck or semi-trailer",
            example: "His rig has a sleeper cab for long journeys.",
          },
          {
            word: "logbook",
            translation: {
              tr: "kayıt defteri",
              kg: "журнал",
              ru: "журнал учета",
            },
            definition: "A record of a driver's hours of service",
            example:
              "The officer asked to see his logbook during the inspection.",
          },
        ],
      },
    },
    {
      id: "document-handling",
      title: "Document Handling Terminology",
      duration: 30,
      type: "dialogue",
      description:
        "Practice essential vocabulary related to bills of lading, permits, and electronic logging devices.",
      completed: false,
      content: {
        dialogue: {
          id: "doc-handling-1",
          title: "Document Inspection Dialogue",
          description:
            "Practice a conversation about document inspection at a checkpoint",
          englishText:
            "Officer: Good morning. May I see your commercial driver's license and registration?\nDriver: Good morning, officer. Here's my CDL and registration.\nOfficer: Thank you. Can I also see your logbook or ELD records?\nDriver: Yes, here are my electronic logging device records.\nOfficer: I need to check your bill of lading as well.\nDriver: Of course. Here's the bill of lading for my current load.\nOfficer: Everything looks in order. Do you have any hazardous materials on board?\nDriver: No, officer. I'm carrying general merchandise.\nOfficer: Thank you for your cooperation. Drive safely.",
          translatedText:
            "Memur: Günaydın. Ticari sürücü belgenizi ve ruhsatınızı görebilir miyim?\nSürücü: Günaydın memur bey. İşte CDL'im ve ruhsatım.\nMemur: Teşekkür ederim. Kayıt defterinizi veya ELD kayıtlarınızı da görebilir miyim?\nSürücü: Evet, işte elektronik kayıt cihazı kayıtlarım.\nMemur: Konşimentonuzu da kontrol etmem gerekiyor.\nSürücü: Tabii. İşte mevcut yüküm için konşimento.\nMemur: Her şey düzgün görünüyor. Araçta tehlikeli madde var mı?\nSürücü: Hayır memur bey. Genel ticari eşya taşıyorum.\nMemur: İşbirliğiniz için teşekkürler. Güvenli sürüşler.",
          vocabulary: [
            {
              word: "commercial driver's license (CDL)",
              translation: "ticari sürücü belgesi",
              definition:
                "A license required to operate large, heavy, or placarded hazardous material vehicles",
            },
            {
              word: "electronic logging device (ELD)",
              translation: "elektronik kayıt cihazı",
              definition:
                "A device that automatically records driving time and monitors engine hours",
            },
            {
              word: "bill of lading",
              translation: "konşimento",
              definition:
                "A document issued by a carrier to acknowledge receipt of cargo for shipment",
            },
            {
              word: "hazardous materials",
              translation: "tehlikeli maddeler",
              definition:
                "Substances that pose risks to health, safety, and property during transportation",
            },
          ],
        },
        practice: {
          title: "Document Handling Practice",
          description:
            "Practice common document-related scenarios and responses",
          scenarios: [
            {
              id: "scenario-1",
              title: "Checkpoint Document Request",
              situation:
                "An officer asks for your documents at a checkpoint. Practice your response.",
              prompt:
                "Officer: 'I need to see your CDL, registration, and logbook records.'",
              expectedResponse:
                "Here's my commercial driver's license, vehicle registration, and my electronic logging device records, officer.",
              tips: [
                "Always be polite and cooperative",
                "Have documents ready and organized",
                "Speak clearly and calmly",
              ],
            },
            {
              id: "scenario-2",
              title: "Bill of Lading Explanation",
              situation:
                "Explain what cargo you're carrying using your bill of lading.",
              prompt: "Officer: 'What type of cargo are you transporting?'",
              expectedResponse:
                "According to my bill of lading, I'm carrying general merchandise - specifically furniture and household goods from Chicago to Denver.",
              tips: [
                "Reference your bill of lading",
                "Be specific about cargo type",
                "Mention origin and destination",
              ],
            },
            {
              id: "scenario-3",
              title: "ELD Records Presentation",
              situation:
                "Show and explain your electronic logging device records.",
              prompt:
                "Officer: 'Can you show me your hours of service records?'",
              expectedResponse:
                "Yes, here are my ELD records. I've been driving for 8 hours today and I'm within my 14-hour duty period. My last rest break was 2 hours ago.",
              tips: [
                "Know your current driving hours",
                "Understand duty period limits",
                "Be ready to explain recent breaks",
              ],
            },
          ],
        },
        exercises: {
          title: "Document Terminology Exercises",
          description:
            "Complete these exercises to test your understanding of document handling terminology",
          fillInTheBlanks: [
            {
              id: "fill-1",
              question:
                "A _______ is required to operate large commercial vehicles.",
              answer: "CDL",
              options: ["CDL", "ELD", "BOL", "DOT"],
              explanation:
                "CDL stands for Commercial Driver's License, which is required for operating large trucks.",
            },
            {
              id: "fill-2",
              question:
                "The _______ automatically records driving time and monitors engine hours.",
              answer: "ELD",
              options: ["CDL", "ELD", "GPS", "CB"],
              explanation:
                "ELD stands for Electronic Logging Device, which tracks hours of service.",
            },
            {
              id: "fill-3",
              question:
                "A _______ is a document that acknowledges receipt of cargo for shipment.",
              answer: "bill of lading",
              options: ["bill of lading", "manifest", "invoice", "receipt"],
              explanation:
                "A bill of lading is the official document that details the cargo being transported.",
            },
          ],
          multipleChoice: [
            {
              id: "mc-1",
              question:
                "What information is typically found on a bill of lading?",
              options: [
                "Driver's personal information",
                "Cargo details and destination",
                "Vehicle maintenance records",
                "Fuel consumption data",
              ],
              correctAnswer: "Cargo details and destination",
              explanation:
                "A bill of lading contains information about the cargo, shipper, consignee, and destination.",
            },
            {
              id: "mc-2",
              question:
                "How long must ELD records be kept available for inspection?",
              options: ["7 days", "14 days", "30 days", "90 days"],
              correctAnswer: "7 days",
              explanation:
                "Drivers must keep ELD records for the current day plus the previous 7 days.",
            },
            {
              id: "mc-3",
              question:
                "What should you do if an officer asks for documents you don't have?",
              options: [
                "Make an excuse and leave quickly",
                "Explain politely what documents you have available",
                "Argue that you don't need those documents",
                "Refuse to cooperate",
              ],
              correctAnswer:
                "Explain politely what documents you have available",
              explanation:
                "Always be honest and cooperative. Explain what documents you have and why others might not be available.",
            },
          ],
        },
      },
    },
    {
      id: "pronunciation",
      title: "Pronunciation Clinic",
      duration: 15,
      type: "practice",
      description:
        "Practice pronouncing difficult trucking terms and phrases with audio recording and playback.",
      completed: false,
      content: {
        phrases: [
          "commercial driver's license",
          "electronic logging device",
          "bill of lading",
          "hazardous materials",
          "weight restriction",
          "oversized load",
          "refrigerated trailer",
          "international fuel tax agreement",
        ],
      },
    },
    {
      id: "assessment",
      title: "Assessment & Homework",
      duration: 15,
      type: "quiz",
      description:
        "Test your knowledge of the vocabulary and concepts covered in this module.",
      completed: false,
      content: {
        questions: [
          {
            question:
              "What document acknowledges receipt of cargo for shipment?",
            options: [
              "Commercial driver's license",
              "Bill of lading",
              "Electronic logging device",
              "Hazardous materials permit",
            ],
            correctAnswer: "Bill of lading",
          },
          {
            question:
              "What is the purpose of an electronic logging device (ELD)?",
            options: [
              "To track fuel consumption",
              "To navigate routes",
              "To automatically record driving time",
              "To communicate with dispatch",
            ],
            correctAnswer: "To automatically record driving time",
          },
          {
            question: "What is a 'rig' in trucking terminology?",
            options: [
              "A small delivery van",
              "A large truck or semi-trailer",
              "A loading dock",
              "A weigh station",
            ],
            correctAnswer: "A large truck or semi-trailer",
          },
        ],
      },
    },
  ],
};

// Module 2: On the Road – Communication & Navigation
const module2: BootcampModule = {
  id: 2,
  title: "On the Road – Communication & Navigation",
  description:
    "Navigate confidently using English directions and master radio communication",
  duration: 120,
  completion: 0,
  sections: [
    {
      id: "navigation-essentials",
      title: "Navigation Essentials",
      duration: 40,
      type: "vocabulary",
      description:
        "Master vocabulary and phrases for directions, landmarks, and GPS instructions",
      completed: false,
      content: {
        vocabularyItems: [
          {
            word: "interstate",
            translation: {
              tr: "eyaletler arası otoyol",
              kg: "штаттар аралык жол",
              ru: "межштатная автомагистраль",
            },
            definition: "A major highway connecting different states",
            example: "Take Interstate 95 north to Boston.",
          },
          {
            word: "exit ramp",
            translation: {
              tr: "çıkış rampası",
              kg: "чыгуу рампасы",
              ru: "съезд",
            },
            definition: "A road that allows vehicles to leave a highway",
            example: "Take the next exit ramp to get to the truck stop.",
          },
          {
            word: "mile marker",
            translation: {
              tr: "mil işareti",
              kg: "миля белгиси",
              ru: "мильный столб",
            },
            definition: "Signs along highways showing distance in miles",
            example: "I'm at mile marker 150 on Highway 40.",
          },
          {
            word: "truck route",
            translation: {
              tr: "kamyon güzergahı",
              kg: "жүк ташуучу жолу",
              ru: "грузовой маршрут",
            },
            definition: "Designated roads suitable for large trucks",
            example: "Follow the truck route to avoid low bridges.",
          },
          {
            word: "weigh station",
            translation: {
              tr: "tartı istasyonu",
              kg: "салмак өлчөө станциясы",
              ru: "весовая станция",
            },
            definition: "A checkpoint where trucks are weighed for compliance",
            example: "All trucks must stop at the weigh station ahead.",
          },
          {
            word: "rest area",
            translation: {
              tr: "dinlenme alanı",
              kg: "эс алуу аймагы",
              ru: "зона отдыха",
            },
            definition: "A designated area for drivers to rest and park",
            example:
              "There's a rest area in 5 miles where you can take a break.",
          },
          {
            word: "detour",
            translation: {
              tr: "sapak yol",
              kg: "четке чыгуу жолу",
              ru: "объезд",
            },
            definition: "An alternative route around a blocked road",
            example: "Construction ahead - follow the detour signs.",
          },
          {
            word: "GPS coordinates",
            translation: {
              tr: "GPS koordinatları",
              kg: "GPS координаттары",
              ru: "GPS координаты",
            },
            definition: "Exact location using satellite positioning",
            example:
              "The delivery address GPS coordinates are 40.7128, -74.0060.",
          },
        ],
      },
    },
    {
      id: "road-signs",
      title: "Road Signs & Safety Language",
      duration: 30,
      type: "dialogue",
      description: "Understand road signs and safety communications",
      completed: false,
      content: {
        dialogue: {
          id: "road-signs-1",
          title: "Road Sign Recognition Dialogue",
          description: "Practice identifying and understanding road signs",
          englishText:
            "Dispatcher: What's your current location?\nDriver: I'm approaching a construction zone with reduced speed signs.\nDispatcher: What does the sign say?\nDriver: It says 'Work Zone Ahead - Reduce Speed to 45 MPH'.\nDispatcher: Are there any lane restrictions?\nDriver: Yes, the right lane is closed. Traffic is merging left.\nDispatcher: Good. Watch for flaggers and construction workers.\nDriver: Copy that. I can see orange cones and a flagger ahead.\nDispatcher: Take your time through the work zone and stay safe.",
          translatedText:
            "Dispatcher: Şu anki konumunuz nerede?\nSürücü: Hız azaltma işaretleri olan bir inşaat bölgesine yaklaşıyorum.\nDispatcher: Tabela ne diyor?\nSürücü: 'İlerisi İnşaat Bölgesi - Hızı 45 MPH'ye Düşürün' diyor.\nDispatcher: Şerit kısıtlaması var mı?\nSürücü: Evet, sağ şerit kapalı. Trafik sola birleşiyor.\nDispatcher: İyi. Bayrakçıları ve inşaat işçilerini gözet.\nSürücü: Anlaşıldı. İleride turuncu koniler ve bir bayrakçı görebiliyorum.\nDispatcher: İnşaat bölgesinden geçerken acele etme ve güvenli ol.",
          vocabulary: [
            {
              word: "construction zone",
              translation: "inşaat bölgesi",
              definition: "An area where road work is being performed",
            },
            {
              word: "lane restriction",
              translation: "şerit kısıtlaması",
              definition: "Temporary closure or limitation of traffic lanes",
            },
            {
              word: "flagger",
              translation: "bayrakçı",
              definition: "A person who directs traffic in construction zones",
            },
            {
              word: "merge",
              translation: "birleşmek",
              definition:
                "To combine traffic from multiple lanes into fewer lanes",
            },
          ],
        },
        practice: {
          title: "Road Sign Communication Practice",
          description: "Practice communicating about road signs and conditions",
          scenarios: [
            {
              id: "scenario-1",
              title: "Reporting Road Conditions",
              situation:
                "You encounter a road sign and need to report it to dispatch.",
              prompt: "Dispatcher: 'What road conditions are you seeing?'",
              expectedResponse:
                "I'm seeing a 'Bridge Height 13'6\"' sign ahead. My trailer is 13'2\", so I can safely pass under.",
              tips: [
                "Always check bridge heights against your vehicle dimensions",
                "Report any unusual or hazardous conditions",
                "Use clear, specific measurements",
              ],
            },
            {
              id: "scenario-2",
              title: "Construction Zone Communication",
              situation:
                "You're entering a construction zone with specific instructions.",
              prompt: "Dispatcher: 'Describe the construction zone ahead.'",
              expectedResponse:
                "There's a work zone with flaggers controlling traffic. Speed limit is reduced to 35 MPH, and the left lane is closed for the next 2 miles.",
              tips: [
                "Note speed limit changes",
                "Identify which lanes are affected",
                "Mention the presence of workers or flaggers",
              ],
            },
          ],
        },
        exercises: {
          title: "Road Sign Recognition Exercises",
          description:
            "Test your knowledge of common road signs and their meanings",
          fillInTheBlanks: [
            {
              id: "fill-1",
              question:
                "A _______ zone requires reduced speed and extra caution.",
              answer: "construction",
              options: ["construction", "school", "residential", "commercial"],
              explanation:
                "Construction zones are temporary work areas that require reduced speed for safety.",
            },
            {
              id: "fill-2",
              question:
                "When lanes _______, traffic from multiple lanes combines into fewer lanes.",
              answer: "merge",
              options: ["merge", "split", "close", "open"],
              explanation:
                "Merging occurs when traffic from separate lanes combines into a single lane.",
            },
          ],
          multipleChoice: [
            {
              id: "mc-1",
              question:
                "What should you do when you see a 'Bridge Height' sign?",
              options: [
                "Ignore it if you're experienced",
                "Check your vehicle height against the posted limit",
                "Speed up to get through quickly",
                "Change lanes immediately",
              ],
              correctAnswer:
                "Check your vehicle height against the posted limit",
              explanation:
                "Always verify your vehicle dimensions against posted height restrictions to avoid accidents.",
            },
          ],
        },
      },
    },
    {
      id: "radio-communication",
      title: "CB Radio & Dispatcher Communication",
      duration: 30,
      type: "roleplay",
      description:
        "Master radio communication protocols and dispatcher interactions",
      completed: false,
      content: {
        exchanges: [
          {
            id: "radio-1",
            speaker: "Dispatcher",
            text: "Unit 47, this is dispatch. What's your 20?",
            translation: "47 numaralı araç, burası merkez. Konumun nerede?",
            response:
              "Dispatch, Unit 47. I'm at mile marker 85 on I-40 westbound.",
            responseTranslation:
              "Merkez, 47 numaralı araç. I-40 batı yönünde 85. mil işaretindeyim.",
          },
          {
            id: "radio-2",
            speaker: "Dispatcher",
            text: "Copy that. What's your ETA to the Phoenix terminal?",
            translation: "Anlaşıldı. Phoenix terminaline varış süreniz ne?",
            response:
              "ETA is approximately 3 hours, depending on traffic conditions.",
            responseTranslation:
              "Tahmini varış süresi yaklaşık 3 saat, trafik durumuna bağlı olarak.",
          },
          {
            id: "radio-3",
            speaker: "Dispatcher",
            text: "Roger. Any issues with the load or equipment?",
            translation: "Anlaşıldı. Yük veya ekipmanla ilgili sorun var mı?",
            response:
              "Negative. Load is secure and all equipment is functioning normally.",
            responseTranslation:
              "Hayır. Yük güvenli ve tüm ekipman normal çalışıyor.",
          },
        ],
      },
    },
    {
      id: "interactive-roleplay",
      title: "Interactive Roleplay",
      duration: 20,
      type: "practice",
      description: "Practice realistic dispatcher-driver conversations",
      completed: false,
      content: {
        phrases: [
          "What's your twenty? (What's your location?)",
          "Copy that, dispatch",
          "I'm running behind schedule",
          "Traffic is heavy on this route",
          "Requesting permission to take alternate route",
          "Load is secure and ready for transport",
          "ETA to destination is 2 hours",
          "Over and out",
        ],
      },
    },
  ],
};

// Module 3: Police Stops, Inspections & Emergencies
const module3: BootcampModule = {
  id: 3,
  title: "Police Stops, Inspections & Emergencies",
  description:
    "Learn to respond appropriately to law enforcement and handle emergency situations",
  duration: 120,
  completion: 0,
  sections: [
    {
      id: "police-interactions",
      title: "Police Interaction Scenarios",
      duration: 45,
      type: "dialogue",
      description:
        "Practice structured dialogues for police stops and inspections",
      completed: false,
      content: {
        dialogue: {
          id: "police-stop-1",
          title: "Routine Traffic Stop Dialogue",
          description: "Practice a routine police traffic stop interaction",
          englishText:
            "Officer: Good afternoon. I pulled you over for following too closely. License and registration, please.\nDriver: Good afternoon, officer. Here's my commercial driver's license and vehicle registration.\nOfficer: Thank you. Are you carrying any hazardous materials?\nDriver: No, sir. I'm transporting general freight - furniture and appliances.\nOfficer: Can I see your logbook and bill of lading?\nDriver: Yes, officer. Here are my electronic logging device records and the bill of lading.\nOfficer: Everything appears to be in order. Please maintain a safe following distance.\nDriver: I understand, officer. I'll be more careful about my following distance.\nOfficer: Drive safely. Have a good day.",
          translatedText:
            "Memur: İyi günler. Sizi çok yakın takip ettiğiniz için durdurdum. Ehliyet ve ruhsat lütfen.\nSürücü: İyi günler memur bey. İşte ticari sürücü belgem ve araç ruhsatım.\nMemur: Teşekkürler. Tehlikeli madde taşıyor musunuz?\nSürücü: Hayır efendim. Genel yük taşıyorum - mobilya ve ev aletleri.\nMemur: Kayıt defterinizi ve konşimentonuzu görebilir miyim?\nSürücü: Evet memur bey. İşte elektronik kayıt cihazı kayıtlarım ve konşimento.\nMemur: Her şey düzgün görünüyor. Lütfen güvenli takip mesafesi koruyun.\nSürücü: Anlıyorum memur bey. Takip mesafesi konusunda daha dikkatli olacağım.\nMemur: Güvenli sürüşler. İyi günler.",
          vocabulary: [
            {
              word: "following distance",
              translation: "takip mesafesi",
              definition:
                "The space between your vehicle and the vehicle in front",
            },
            {
              word: "general freight",
              translation: "genel yük",
              definition:
                "Common commercial cargo that doesn't require special handling",
            },
            {
              word: "maintain",
              translation: "korumak",
              definition:
                "To keep or continue in a particular state or condition",
            },
          ],
        },
        practice: {
          title: "Police Interaction Practice",
          description:
            "Practice responding to common police questions and situations",
          scenarios: [
            {
              id: "scenario-1",
              title: "Document Request Response",
              situation:
                "An officer asks for your documents during a routine stop.",
              prompt:
                "Officer: 'I need to see your CDL, registration, and medical certificate.'",
              expectedResponse:
                "Yes, officer. Here's my commercial driver's license, vehicle registration, and DOT medical certificate. All are current and valid.",
              tips: [
                "Keep documents organized and easily accessible",
                "Mention that documents are current and valid",
                "Remain calm and cooperative",
              ],
            },
            {
              id: "scenario-2",
              title: "Cargo Information Response",
              situation:
                "An officer asks about your cargo during an inspection.",
              prompt:
                "Officer: 'What type of cargo are you hauling and where is it going?'",
              expectedResponse:
                "I'm hauling general merchandise - household goods and furniture. It's going from Atlanta to Miami according to my bill of lading.",
              tips: [
                "Be specific about cargo type",
                "Mention origin and destination",
                "Reference your bill of lading",
              ],
            },
            {
              id: "scenario-3",
              title: "Hours of Service Explanation",
              situation:
                "An officer asks about your driving hours and rest periods.",
              prompt: "Officer: 'How long have you been driving today?'",
              expectedResponse:
                "I've been driving for 6 hours today, officer. I took my last 30-minute break 3 hours ago, and I'm within my 14-hour duty period.",
              tips: [
                "Know your exact driving hours",
                "Mention recent breaks",
                "Confirm you're within legal limits",
              ],
            },
          ],
        },
        exercises: {
          title: "Police Interaction Exercises",
          description:
            "Test your knowledge of proper responses during police interactions",
          fillInTheBlanks: [
            {
              id: "fill-1",
              question:
                "When stopped by police, always provide your _______, registration, and medical certificate.",
              answer: "CDL",
              options: ["CDL", "passport", "insurance", "permit"],
              explanation:
                "A Commercial Driver's License (CDL) is required for operating commercial vehicles.",
            },
            {
              id: "fill-2",
              question:
                "You must take a _______ minute break after 8 hours of driving.",
              answer: "30",
              options: ["15", "30", "45", "60"],
              explanation:
                "Federal regulations require a 30-minute break after 8 hours of driving.",
            },
          ],
          multipleChoice: [
            {
              id: "mc-1",
              question: "What should you do when pulled over by police?",
              options: [
                "Get out of the vehicle immediately",
                "Stay in the vehicle and wait for instructions",
                "Start explaining before the officer speaks",
                "Keep driving to find a better location",
              ],
              correctAnswer: "Stay in the vehicle and wait for instructions",
              explanation:
                "Always remain in your vehicle unless instructed otherwise by the officer.",
            },
          ],
        },
      },
    },
    {
      id: "inspection-vocabulary",
      title: "Inspection Vocabulary & Procedures",
      duration: 30,
      type: "vocabulary",
      description:
        "Learn terminology related to vehicle inspections and safety requirements",
      completed: false,
      content: {
        vocabularyItems: [
          {
            word: "pre-trip inspection",
            translation: {
              tr: "sefer öncesi kontrol",
              kg: "жол алдындагы текшерүү",
              ru: "предрейсовый осмотр",
            },
            definition: "A safety check performed before starting a trip",
            example: "I completed my pre-trip inspection and found no defects.",
          },
          {
            word: "brake system",
            translation: {
              tr: "fren sistemi",
              kg: "тормоз системасы",
              ru: "тормозная система",
            },
            definition: "The vehicle's braking mechanism and components",
            example:
              "The inspector checked the brake system for proper operation.",
          },
          {
            word: "tire tread depth",
            translation: {
              tr: "lastik diş derinliği",
              kg: "дөңгөлөктүн тереңдиги",
              ru: "глубина протектора шины",
            },
            definition: "The measurement of tire groove depth for safety",
            example:
              "All tires have adequate tread depth above the minimum requirement.",
          },
          {
            word: "out of service",
            translation: {
              tr: "hizmet dışı",
              kg: "кызматтан чыгарылган",
              ru: "выведен из эксплуатации",
            },
            definition:
              "A vehicle or driver prohibited from operating due to violations",
            example:
              "The vehicle was placed out of service due to brake defects.",
          },
          {
            word: "violation",
            translation: {
              tr: "ihlal",
              kg: "бузуу",
              ru: "нарушение",
            },
            definition: "A breach of safety regulations or requirements",
            example:
              "The driver received a violation for exceeding hours of service.",
          },
          {
            word: "safety defect",
            translation: {
              tr: "güvenlik kusuru",
              kg: "коопсуздук кемчилиги",
              ru: "дефект безопасности",
            },
            definition: "A mechanical problem that affects vehicle safety",
            example: "No safety defects were found during the inspection.",
          },
        ],
      },
    },
    {
      id: "emergency-communication",
      title: "Emergency Communication",
      duration: 30,
      type: "practice",
      description:
        "Learn to communicate effectively during emergency situations",
      completed: false,
      content: {
        phrases: [
          "I need immediate assistance",
          "There has been an accident",
          "My vehicle has broken down",
          "I need a tow truck",
          "Send medical help immediately",
          "The road is blocked",
          "I'm at mile marker 150 on Interstate 75",
          "No one appears to be injured",
          "I have a flat tire",
          "My engine is overheating",
          "I'm in the emergency lane",
          "Traffic is backing up behind me",
        ],
      },
    },
    {
      id: "interactive-practice",
      title: "Interactive Practice",
      duration: 15,
      type: "quiz",
      description: "Test your knowledge of emergency and inspection procedures",
      completed: false,
      content: {
        questions: [
          {
            question:
              "What should you do first when your vehicle breaks down on the highway?",
            options: [
              "Get out and check the engine",
              "Move to the emergency lane and turn on hazard lights",
              "Call your family",
              "Continue driving slowly",
            ],
            correctAnswer:
              "Move to the emergency lane and turn on hazard lights",
          },
          {
            question:
              "During a DOT inspection, what documents must you provide?",
            options: [
              "Only your driver's license",
              "CDL, medical certificate, logbook, and registration",
              "Just the vehicle registration",
              "Only your insurance papers",
            ],
            correctAnswer:
              "CDL, medical certificate, logbook, and registration",
          },
          {
            question: "If placed 'out of service', what must you do?",
            options: [
              "Continue driving carefully",
              "Fix the problem immediately and continue",
              "Stop operating until violations are corrected",
              "Drive only during daylight hours",
            ],
            correctAnswer: "Stop operating until violations are corrected",
          },
        ],
      },
    },
  ],
};

// Module 4: Customer & Border Interactions
const module4: BootcampModule = {
  id: 4,
  title: "Customer & Border Interactions",
  description:
    "Handle customer interactions professionally and navigate border crossing procedures",
  duration: 120,
  completion: 0,
  sections: [
    {
      id: "customer-service",
      title: "Customer Service Essentials",
      duration: 40,
      type: "dialogue",
      description:
        "Learn professional communication for deliveries and customer interactions",
      completed: false,
      content: {
        dialogue: {
          id: "customer-delivery-1",
          title: "Professional Delivery Dialogue",
          description:
            "Practice professional customer interaction during delivery",
          englishText:
            "Driver: Good morning. I'm here to deliver your furniture shipment from Atlanta Furniture Company.\nCustomer: Great! I've been expecting this delivery. Do you have the delivery receipt?\nDriver: Yes, here's the delivery receipt. I need to verify the delivery address and get your signature.\nCustomer: The address looks correct. What do I need to sign?\nDriver: Please sign here to confirm receipt of the shipment. The delivery includes 3 boxes and 1 large item.\nCustomer: Everything looks good. Where would you like me to sign?\nDriver: Right here on this line, please. Thank you for your business.\nCustomer: Thank you for the professional service. Have a safe trip.",
          translatedText:
            "Sürücü: Günaydın. Atlanta Mobilya Şirketi'nden mobilya sevkiyatınızı teslim etmeye geldim.\nMüşteri: Harika! Bu teslimatı bekliyordum. Teslimat makbuzunuz var mı?\nSürücü: Evet, işte teslimat makbuzu. Teslimat adresini doğrulamam ve imzanızı almam gerekiyor.\nMüşteri: Adres doğru görünüyor. Neyi imzalamam gerekiyor?\nSürücü: Sevkiyatı aldığınızı onaylamak için lütfen burayı imzalayın. Teslimat 3 kutu ve 1 büyük eşya içeriyor.\nMüşteri: Her şey iyi görünüyor. Nereyi imzalamamı istiyorsunuz?\nSürücü: Lütfen şu satırı imzalayın. İşiniz için teşekkürler.\nMüşteri: Profesyonel hizmet için teşekkürler. Güvenli yolculuklar.",
          vocabulary: [
            {
              word: "delivery receipt",
              translation: "teslimat makbuzu",
              definition: "A document confirming goods have been delivered",
            },
            {
              word: "verify",
              translation: "doğrulamak",
              definition: "To confirm that something is accurate or correct",
            },
            {
              word: "signature",
              translation: "imza",
              definition:
                "A person's name written by themselves as identification",
            },
            {
              word: "shipment",
              translation: "sevkiyat",
              definition: "A quantity of goods sent or delivered at one time",
            },
          ],
        },
        practice: {
          title: "Customer Service Practice",
          description: "Practice professional customer service scenarios",
          scenarios: [
            {
              id: "scenario-1",
              title: "Delivery Confirmation",
              situation:
                "You need to confirm delivery details with a customer.",
              prompt:
                "Customer: 'Is this the delivery from Chicago Manufacturing?'",
              expectedResponse:
                "Yes, this is your delivery from Chicago Manufacturing. I have 5 boxes of industrial parts. May I verify your name and address for the delivery receipt?",
              tips: [
                "Confirm the shipper's name",
                "Describe the shipment contents",
                "Ask to verify customer information",
              ],
            },
            {
              id: "scenario-2",
              title: "Delivery Delay Explanation",
              situation: "You need to explain a delivery delay to a customer.",
              prompt:
                "Customer: 'You were supposed to be here this morning. Where have you been?'",
              expectedResponse:
                "I apologize for the delay. We encountered unexpected traffic due to an accident on the interstate. I'm here now and ready to complete your delivery.",
              tips: [
                "Apologize for the inconvenience",
                "Provide a brief, honest explanation",
                "Focus on completing the delivery",
              ],
            },
            {
              id: "scenario-3",
              title: "Damaged Goods Report",
              situation: "You discover damaged goods during delivery.",
              prompt:
                "Customer: 'One of these boxes looks damaged. What should we do?'",
              expectedResponse:
                "I see the damage too. Let me document this on the delivery receipt. You can note the damage before signing, and I'll report this to my dispatcher immediately.",
              tips: [
                "Acknowledge the problem",
                "Document damage on delivery receipt",
                "Involve your dispatcher",
              ],
            },
          ],
        },
        exercises: {
          title: "Customer Service Exercises",
          description:
            "Test your knowledge of professional customer service practices",
          fillInTheBlanks: [
            {
              id: "fill-1",
              question:
                "Always ask the customer to _______ the delivery receipt to confirm they received the goods.",
              answer: "sign",
              options: ["sign", "read", "copy", "keep"],
              explanation:
                "A signature on the delivery receipt serves as legal proof that goods were delivered.",
            },
          ],
          multipleChoice: [
            {
              id: "mc-1",
              question:
                "What should you do if goods are damaged during delivery?",
              options: [
                "Don't mention it and leave quickly",
                "Document the damage and inform your dispatcher",
                "Blame the customer for poor handling",
                "Refuse to deliver the damaged items",
              ],
              correctAnswer: "Document the damage and inform your dispatcher",
              explanation:
                "Proper documentation protects both you and the customer, and your dispatcher needs to know about delivery issues.",
            },
          ],
        },
      },
    },
    {
      id: "border-crossing",
      title: "Border Crossing & Weigh Station Communication",
      duration: 40,
      type: "dialogue",
      description:
        "Master communication for border crossings and weigh station procedures",
      completed: false,
      content: {
        dialogue: {
          id: "border-crossing-1",
          title: "Border Crossing Dialogue",
          description: "Practice communication with border agents",
          englishText:
            "Agent: Good afternoon. Purpose of your visit to Canada?\nDriver: Good afternoon. I'm making a commercial delivery to Toronto.\nAgent: What are you transporting?\nDriver: I'm carrying automotive parts from Detroit to a manufacturing plant in Toronto.\nAgent: Do you have your commercial documents?\nDriver: Yes, here's my passport, commercial driver's license, and bill of lading.\nAgent: How long will you be in Canada?\nDriver: Just for the delivery - approximately 6 hours total.\nAgent: Any prohibited items or goods to declare?\nDriver: No prohibited items. Everything is listed on the commercial invoice.\nAgent: Thank you. Proceed to the inspection area for a routine check.",
          translatedText:
            "Memur: İyi günler. Kanada'ya ziyaret amacınız nedir?\nSürücü: İyi günler. Toronto'ya ticari teslimat yapıyorum.\nMemur: Ne taşıyorsunuz?\nSürücü: Detroit'ten Toronto'daki bir üretim tesisine otomotiv parçaları taşıyorum.\nMemur: Ticari belgeleriniz var mı?\nSürücü: Evet, işte pasaportum, ticari sürücü belgem ve konşimento.\nMemur: Kanada'da ne kadar kalacaksınız?\nSürücü: Sadece teslimat için - toplamda yaklaşık 6 saat.\nMemur: Yasak eşya veya beyan edilecek mal var mı?\nSürücü: Yasak eşya yok. Her şey ticari faturada listelendi.\nMemur: Teşekkürler. Rutin kontrol için muayene alanına geçin.",
          vocabulary: [
            {
              word: "commercial delivery",
              translation: "ticari teslimat",
              definition: "Transportation of goods for business purposes",
            },
            {
              word: "prohibited items",
              translation: "yasak eşyalar",
              definition: "Goods that are not allowed to cross borders",
            },
            {
              word: "commercial invoice",
              translation: "ticari fatura",
              definition:
                "A document detailing goods being transported for customs",
            },
            {
              word: "inspection area",
              translation: "muayene alanı",
              definition:
                "A designated area where vehicles and cargo are examined",
            },
          ],
        },
        practice: {
          title: "Border Crossing Practice",
          description:
            "Practice border crossing and weigh station communications",
          scenarios: [
            {
              id: "scenario-1",
              title: "Document Presentation",
              situation: "A border agent requests your documentation.",
              prompt:
                "Agent: 'I need to see your passport, CDL, and shipping documents.'",
              expectedResponse:
                "Here's my passport, commercial driver's license, bill of lading, and commercial invoice. All documents are current and valid.",
              tips: [
                "Have documents organized and ready",
                "Mention that documents are current",
                "Include all required paperwork",
              ],
            },
            {
              id: "scenario-2",
              title: "Cargo Declaration",
              situation: "You need to declare your cargo contents.",
              prompt: "Agent: 'Describe exactly what you're carrying.'",
              expectedResponse:
                "I'm transporting 500 units of electronic components from Phoenix to Vancouver. Total value is $50,000 as shown on the commercial invoice.",
              tips: [
                "Be specific about quantity and type",
                "Mention the value if significant",
                "Reference supporting documents",
              ],
            },
          ],
        },
        exercises: {
          title: "Border Crossing Exercises",
          description: "Test your knowledge of border crossing procedures",
          fillInTheBlanks: [
            {
              id: "fill-1",
              question:
                "When crossing borders, you must present your passport, CDL, and _______.",
              answer: "bill of lading",
              options: [
                "bill of lading",
                "insurance card",
                "fuel receipt",
                "driver log",
              ],
              explanation:
                "The bill of lading is required to document what goods you're transporting across borders.",
            },
          ],
          multipleChoice: [
            {
              id: "mc-1",
              question: "What should you do if asked about prohibited items?",
              options: [
                "Say you don't know what's in your trailer",
                "Refer to your commercial invoice and bill of lading",
                "Guess based on what you think might be prohibited",
                "Ask the agent what items are prohibited",
              ],
              correctAnswer:
                "Refer to your commercial invoice and bill of lading",
              explanation:
                "Your shipping documents contain the official declaration of what you're carrying.",
            },
          ],
        },
      },
    },
    {
      id: "cultural-communication",
      title: "Cultural Communication Tips",
      duration: 20,
      type: "vocabulary",
      description:
        "Understand cultural differences and communication strategies",
      completed: false,
      content: {
        vocabularyItems: [
          {
            word: "courtesy",
            translation: {
              tr: "nezaket",
              kg: "сылыктык",
              ru: "вежливость",
            },
            definition: "Polite behavior and good manners",
            example:
              "Always show courtesy when interacting with customers and officials.",
          },
          {
            word: "professional demeanor",
            translation: {
              tr: "profesyonel davranış",
              kg: "кесиптик жүрүм-турум",
              ru: "профессиональное поведение",
            },
            definition: "Appropriate behavior and attitude in work situations",
            example:
              "Maintain a professional demeanor during all business interactions.",
          },
          {
            word: "cultural sensitivity",
            translation: {
              tr: "kültürel duyarlılık",
              kg: "маданий сезгичтик",
              ru: "культурная чувствительность",
            },
            definition:
              "Awareness and respect for different cultural practices",
            example:
              "Cultural sensitivity helps build better relationships with diverse customers.",
          },
        ],
      },
    },
    {
      id: "roleplay-practice",
      title: "Interactive Roleplay",
      duration: 20,
      type: "quiz",
      description:
        "Test your knowledge of customer service and border procedures",
      completed: false,
      content: {
        questions: [
          {
            question:
              "What's the most important thing when dealing with an upset customer?",
            options: [
              "Argue your point strongly",
              "Listen carefully and remain calm",
              "Blame your company",
              "Leave immediately",
            ],
            correctAnswer: "Listen carefully and remain calm",
          },
          {
            question:
              "At a border crossing, what should you do if you don't understand a question?",
            options: [
              "Guess what they're asking",
              "Politely ask them to repeat or clarify",
              "Ignore the question",
              "Answer a different question",
            ],
            correctAnswer: "Politely ask them to repeat or clarify",
          },
          {
            question:
              "When should you contact your dispatcher during a delivery?",
            options: [
              "Only if there's a major problem",
              "Never during deliveries",
              "For any issues, delays, or damage",
              "Only at the end of the day",
            ],
            correctAnswer: "For any issues, delays, or damage",
          },
        ],
      },
    },
  ],
};

// Module 5: Test Prep, Review & Certification
const module5: BootcampModule = {
  id: 5,
  title: "Test Prep, Review & Certification",
  description:
    "Master CDL test vocabulary and demonstrate improved English communication skills",
  duration: 120,
  completion: 0,
  sections: [
    {
      id: "cdl-test-prep",
      title: "CDL Test Language Preparation",
      duration: 30,
      type: "vocabulary",
      description: "Focus on vocabulary and instructions for CDL testing",
      completed: false,
      content: {
        vocabularyItems: [
          {
            word: "air brake system",
            translation: {
              tr: "havalı fren sistemi",
              kg: "аба тормоз системасы",
              ru: "пневматическая тормозная система",
            },
            definition: "A braking system that uses compressed air to operate",
            example:
              "The CDL test includes questions about air brake system operation.",
          },
          {
            word: "combination vehicle",
            translation: {
              tr: "kombine araç",
              kg: "айкалышкан унаа",
              ru: "автопоезд",
            },
            definition: "A truck tractor and semi-trailer connected together",
            example: "You need a Class A CDL to operate a combination vehicle.",
          },
          {
            word: "hazmat endorsement",
            translation: {
              tr: "tehlikeli madde onayı",
              kg: "коркунучтуу заттар уруксаты",
              ru: "допуск к перевозке опасных грузов",
            },
            definition: "Special permission to transport hazardous materials",
            example:
              "A hazmat endorsement requires additional testing and background checks.",
          },
          {
            word: "pre-trip inspection",
            translation: {
              tr: "sefer öncesi muayene",
              kg: "жол алдындагы текшерүү",
              ru: "предрейсовый осмотр",
            },
            definition:
              "A safety check performed before operating a commercial vehicle",
            example:
              "The CDL skills test includes demonstrating a pre-trip inspection.",
          },
          {
            word: "backing maneuver",
            translation: {
              tr: "geri manevra",
              kg: "артка жүрүү маневри",
              ru: "маневр задним ходом",
            },
            definition: "Operating a vehicle in reverse direction",
            example:
              "The CDL test includes various backing maneuvers like parallel parking.",
          },
          {
            word: "weight distribution",
            translation: {
              tr: "ağırlık dağılımı",
              kg: "салмактын бөлүштүрүлүшү",
              ru: "распределение веса",
            },
            definition: "How cargo weight is spread across vehicle axles",
            example:
              "Proper weight distribution is crucial for safe vehicle operation.",
          },
        ],
      },
    },
    {
      id: "comprehensive-review",
      title: "Comprehensive Review",
      duration: 45,
      type: "dialogue",
      description: "Review key concepts from all previous modules",
      completed: false,
      content: {
        dialogue: {
          id: "comprehensive-review-1",
          title: "Complete Scenario Review",
          description:
            "A comprehensive scenario combining elements from all modules",
          englishText:
            "Dispatcher: Unit 23, what's your status?\nDriver: Dispatch, I'm at the weigh station on I-75. The inspector wants to see my documents.\nInspector: I need your CDL, medical certificate, and logbook records.\nDriver: Here you go, officer. My CDL is current, medical certificate expires next year, and here are my ELD records.\nInspector: How long have you been driving today?\nDriver: I've been driving for 7 hours with a 30-minute break 4 hours ago. I'm within my 14-hour duty period.\nInspector: What's your cargo?\nDriver: I'm hauling general freight - furniture and appliances from Atlanta to Detroit. Here's my bill of lading.\nInspector: Everything looks good. Drive safely.\nDriver: Thank you, officer. Dispatch, inspection complete. Continuing to Detroit with ETA of 3 hours.",
          translatedText:
            "Dispatcher: 23 numaralı araç, durumun nedir?\nSürücü: Merkez, I-75'teki tartı istasyonundayım. Müfettiş belgelerimi görmek istiyor.\nMüfettiş: CDL'inizi, sağlık sertifikanızı ve kayıt defteri kayıtlarınızı görmem gerekiyor.\nSürücü: Buyurun memur bey. CDL'im geçerli, sağlık sertifikam gelecek yıl sona eriyor, ve işte ELD kayıtlarım.\nMüfettiş: Bugün ne kadar süredir sürüyorsunuz?\nSürücü: 4 saat önce 30 dakika mola vererek 7 saattir sürüyorum. 14 saatlik görev sürem içindeyim.\nMüfettiş: Yükünüz nedir?\nSürücü: Genel yük taşıyorum - Atlanta'dan Detroit'e mobilya ve ev aletleri. İşte konşimentom.\nMüfettiş: Her şey iyi görünüyor. Güvenli sürüşler.\nSürücü: Teşekkürler memur bey. Merkez, muayene tamamlandı. Detroit'e 3 saat ETA ile devam ediyorum.",
          vocabulary: [
            {
              word: "status",
              translation: "durum",
              definition: "Current condition or situation",
            },
            {
              word: "inspection complete",
              translation: "muayene tamamlandı",
              definition: "The examination process has finished",
            },
            {
              word: "ETA",
              translation: "tahmini varış zamanı",
              definition: "Estimated Time of Arrival",
            },
          ],
        },
        practice: {
          title: "Comprehensive Practice Scenarios",
          description: "Practice complex scenarios combining multiple skills",
          scenarios: [
            {
              id: "scenario-1",
              title: "Multi-Step Communication",
              situation:
                "Handle a complex situation involving dispatch, customer, and authorities.",
              prompt:
                "You're running late due to weather, need to inform dispatch and customer, and encounter a weigh station.",
              expectedResponse:
                "Dispatch, Unit 15. I'm running 2 hours behind due to severe weather conditions. Please notify the Detroit customer of the delay. I'm approaching the Michigan weigh station now for inspection.",
              tips: [
                "Communicate with all relevant parties",
                "Explain the reason for delays",
                "Provide specific information",
              ],
            },
          ],
        },
        exercises: {
          title: "Comprehensive Review Exercises",
          description: "Test your knowledge across all bootcamp modules",
          fillInTheBlanks: [
            {
              id: "fill-1",
              question:
                "When communicating with dispatch, always provide your _______ and current location.",
              answer: "unit number",
              options: [
                "unit number",
                "full name",
                "phone number",
                "company name",
              ],
              explanation:
                "Your unit number helps dispatch identify you quickly in their system.",
            },
          ],
          multipleChoice: [
            {
              id: "mc-1",
              question:
                "What's the most important skill for professional truck drivers?",
              options: [
                "Driving fast",
                "Clear communication",
                "Working alone",
                "Avoiding authorities",
              ],
              correctAnswer: "Clear communication",
              explanation:
                "Clear communication is essential for safety, compliance, and professional success.",
            },
          ],
        },
      },
    },
    {
      id: "mock-assessment",
      title: "Mock Assessment",
      duration: 30,
      type: "quiz",
      description: "Comprehensive assessment covering all module topics",
      completed: false,
      content: {
        questions: [
          {
            question: "During a police stop, what should you do first?",
            options: [
              "Get out and approach the officer",
              "Stay in the vehicle and wait for instructions",
              "Start explaining immediately",
              "Call your dispatcher",
            ],
            correctAnswer: "Stay in the vehicle and wait for instructions",
          },
          {
            question: "What documents are required for border crossing?",
            options: [
              "Only passport",
              "Passport, CDL, and shipping documents",
              "Just the bill of lading",
              "Only commercial invoice",
            ],
            correctAnswer: "Passport, CDL, and shipping documents",
          },
          {
            question: "How should you communicate cargo damage to a customer?",
            options: [
              "Don't mention it",
              "Blame the shipper",
              "Document it and inform your dispatcher",
              "Refuse to deliver",
            ],
            correctAnswer: "Document it and inform your dispatcher",
          },
          {
            question:
              "What's the maximum driving time before a required break?",
            options: ["6 hours", "8 hours", "10 hours", "12 hours"],
            correctAnswer: "8 hours",
          },
          {
            question: "When should you contact dispatch?",
            options: [
              "Only for emergencies",
              "Once per day",
              "For delays, issues, or status updates",
              "Never while driving",
            ],
            correctAnswer: "For delays, issues, or status updates",
          },
        ],
      },
    },
    {
      id: "certification",
      title: "Certification & Future Learning",
      duration: 15,
      type: "practice",
      description:
        "Complete your bootcamp certification and plan continued learning",
      completed: false,
      content: {
        phrases: [
          "I have completed the 10-Hour English Bootcamp",
          "I can communicate professionally with customers",
          "I understand police interaction procedures",
          "I know how to handle emergency situations",
          "I can navigate border crossings confidently",
          "I will continue practicing my English skills",
          "I am ready for professional trucking communication",
          "Thank you for this comprehensive training",
        ],
      },
    },
  ],
};

export const bootcampModules: Record<number, BootcampModule> = {
  1: module1,
  2: module2,
  3: module3,
  4: module4,
  5: module5,
}; 