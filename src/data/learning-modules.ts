// Learning Modules Data
// This file contains standalone learning modules that complement the bootcamp curriculum

export interface LearningModuleSection {
  id: string;
  title: string;
  duration: number;
  type: "video" | "vocabulary" | "dialogue" | "roleplay" | "quiz" | "practice";
  description: string;
  completed: boolean;
  content?: any;
}

export interface LearningModule {
  id: number;
  title: string;
  description: string;
  duration: number;
  sections: LearningModuleSection[];
  completion: number;
}

// Learning Module 1: Traffic Stop Fundamentals
const trafficStopModule: LearningModule = {
  id: 101, // Start learning modules at 101 to avoid conflicts with bootcamp (1-5)
  title: "Traffic Stop Fundamentals",
  description: "Master essential communication skills for traffic stops and document checks",
  duration: 90,
  completion: 0,
  sections: [
    {
      id: "ts-intro",
      title: "Traffic Stop Overview",
      duration: 15,
      type: "video",
      description: "Understanding traffic stop procedures and what to expect",
      completed: false,
      content: {
        videoUrl: "https://example.com/traffic-stop-overview",
        transcript: "Learn the basics of traffic stop interactions..."
      }
    },
    {
      id: "ts-vocab",
      title: "Essential Traffic Stop Vocabulary", 
      duration: 25,
      type: "vocabulary",
      description: "Key terms and phrases for traffic stop communication",
      completed: false,
      content: {
        vocabulary: [
          { term: "License", translation: "Licencia", audioUrl: "https://example.com/audio/license.mp3" },
          { term: "Registration", translation: "Registro", audioUrl: "https://example.com/audio/registration.mp3" },
          { term: "Insurance", translation: "Seguro", audioUrl: "https://example.com/audio/insurance.mp3" },
          { term: "Officer", translation: "Oficial", audioUrl: "https://example.com/audio/officer.mp3" },
          { term: "Pull over", translation: "Orillarse", audioUrl: "https://example.com/audio/pull-over.mp3" },
          { term: "Speed limit", translation: "Límite de velocidad", audioUrl: "https://example.com/audio/speed-limit.mp3" },
          { term: "Speeding", translation: "Exceso de velocidad", audioUrl: "https://example.com/audio/speeding.mp3" },
          { term: "Documents", translation: "Documentos", audioUrl: "https://example.com/audio/documents.mp3" },
          { term: "Hands visible", translation: "Manos visibles", audioUrl: "https://example.com/audio/hands-visible.mp3" },
          { term: "Steering wheel", translation: "Volante", audioUrl: "https://example.com/audio/steering-wheel.mp3" }
        ]
      }
    },
    {
      id: "ts-dialogue",
      title: "Basic Traffic Stop Dialogue",
      duration: 20,
      type: "dialogue", 
      description: "Practice common traffic stop conversations",
      completed: false,
      content: {
        dialogue: {
          title: "Routine Traffic Stop",
          lines: [
            { speaker: "Officer", text: "Good afternoon. I need to see your license, registration, and insurance please.", audioUrl: "https://example.com/audio/officer-request.mp3" },
            { speaker: "Driver", text: "Good afternoon, officer. Yes, of course. My hands are on the steering wheel. May I reach for my documents?", audioUrl: "https://example.com/audio/driver-response.mp3" },
            { speaker: "Officer", text: "Yes, go ahead slowly. Take your time.", audioUrl: "https://example.com/audio/officer-permission.mp3" },
            { speaker: "Driver", text: "Thank you, officer. Here is my CDL, insurance card, and registration.", audioUrl: "https://example.com/audio/driver-documents.mp3" },
            { speaker: "Officer", text: "Do you know why I pulled you over today?", audioUrl: "https://example.com/audio/officer-question.mp3" },
            { speaker: "Driver", text: "I think I might have been going a little fast, officer. I apologize.", audioUrl: "https://example.com/audio/driver-apology.mp3" }
          ],
          audioUrl: "https://example.com/audio/traffic-stop-dialogue.mp3"
        }
      }
    },
    {
      id: "ts-practice",
      title: "Traffic Stop Practice Scenarios",
      duration: 20,
      type: "practice",
      description: "Interactive practice with various traffic stop situations",
      completed: false,
      content: {
        scenarios: [
          {
            scenario: "Routine Speeding Stop",
            officerPrompt: "Good afternoon. I pulled you over because you were going 70 in a 55 mph zone. License and registration, please.",
            expectedResponse: "Good afternoon, officer. I apologize for speeding. Here are my license and registration.",
            tip: "Always remain calm, acknowledge the violation, and provide documents promptly."
          },
          {
            scenario: "Document Request",
            officerPrompt: "I need to see your commercial driver's license, vehicle registration, and insurance card.",
            expectedResponse: "Yes, officer. Here is my CDL, registration, and insurance card.",
            tip: "Have your documents organized and easily accessible before driving."
          }
        ]
      }
    },
    {
      id: "ts-quiz",
      title: "Traffic Stop Knowledge Quiz",
      duration: 10,
      type: "quiz",
      description: "Test your understanding of traffic stop procedures",
      completed: false,
      content: {
        questions: [
          {
            question: "What should you do with your hands when an officer approaches?",
            type: "multiple_choice",
            options: ["Hide them", "Keep them visible on the steering wheel", "Put them in pockets", "Wave at officer"],
            correctAnswer: "Keep them visible on the steering wheel",
            explanation: "Visible hands show you're not a threat and help ensure everyone's safety."
          },
          {
            question: "How should you address a police officer?",
            type: "multiple_choice", 
            options: ["Hey", "Officer", "Sir/Ma'am", "Both Officer and Sir/Ma'am"],
            correctAnswer: "Both Officer and Sir/Ma'am",
            explanation: "Using 'Officer' or 'Sir/Ma'am' shows respect and professionalism."
          }
        ]
      }
    }
  ]
};

// Learning Module 2: Vehicle Inspections
const vehicleInspectionModule: LearningModule = {
  id: 102,
  title: "Vehicle Inspection Communication",
  description: "Learn how to communicate effectively during roadside vehicle inspections",
  duration: 75,
  completion: 0,
  sections: [
    {
      id: "vi-intro",
      title: "Inspection Types Overview",
      duration: 10,
      type: "video",
      description: "Understanding different types of vehicle inspections",
      completed: false,
      content: {
        videoUrl: "https://example.com/vehicle-inspection-overview",
        transcript: "Learn about Level 1, 2, and 3 inspections..."
      }
    },
    {
      id: "vi-vocab",
      title: "Vehicle Inspection Vocabulary",
      duration: 20,
      type: "vocabulary",
      description: "Key terms for vehicle inspections and safety checks",
      completed: false,
      content: {
        vocabulary: [
          { term: "Inspection", translation: "Inspección", audioUrl: "https://example.com/audio/inspection.mp3" },
          { term: "Brake", translation: "Freno", audioUrl: "https://example.com/audio/brake.mp3" },
          { term: "Lights", translation: "Luces", audioUrl: "https://example.com/audio/lights.mp3" },
          { term: "Tire", translation: "Llanta", audioUrl: "https://example.com/audio/tire.mp3" },
          { term: "Engine", translation: "Motor", audioUrl: "https://example.com/audio/engine.mp3" },
          { term: "Hood", translation: "Capó", audioUrl: "https://example.com/audio/hood.mp3" },
          { term: "Out of service", translation: "Fuera de servicio", audioUrl: "https://example.com/audio/out-of-service.mp3" },
          { term: "Safety violation", translation: "Violación de seguridad", audioUrl: "https://example.com/audio/safety-violation.mp3" }
        ]
      }
    },
    {
      id: "vi-dialogue",
      title: "Inspection Dialogue Practice",
      duration: 25,
      type: "dialogue",
      description: "Practice conversations during vehicle inspections",
      completed: false,
      content: {
        dialogue: {
          title: "Level 2 Roadside Inspection",
          lines: [
            { speaker: "Officer", text: "I'm going to conduct a Level 2 roadside inspection. Please step out and bring your documents.", audioUrl: "https://example.com/audio/inspection-start.mp3" },
            { speaker: "Driver", text: "Yes, officer. Is there a problem? I did my pre-trip inspection this morning.", audioUrl: "https://example.com/audio/driver-concern.mp3" },
            { speaker: "Officer", text: "This is routine. Please pop the hood so I can inspect the engine compartment.", audioUrl: "https://example.com/audio/hood-request.mp3" },
            { speaker: "Driver", text: "Of course, officer. The hood release is right here. I had the truck serviced last week.", audioUrl: "https://example.com/audio/hood-compliance.mp3" },
            { speaker: "Officer", text: "Now turn on all your lights - headlights, turn signals, brake lights, and hazards.", audioUrl: "https://example.com/audio/lights-request.mp3" },
            { speaker: "Driver", text: "Yes, sir. Headlights on, testing turn signals... left, right... and hazard lights.", audioUrl: "https://example.com/audio/lights-compliance.mp3" }
          ],
          audioUrl: "https://example.com/audio/inspection-dialogue.mp3"
        }
      }
    },
    {
      id: "vi-practice",
      title: "Inspection Scenarios",
      duration: 15,
      type: "practice",
      description: "Practice responding to various inspection situations",
      completed: false,
      content: {
        scenarios: [
          {
            scenario: "Routine Inspection",
            officerPrompt: "This is a routine Level 2 inspection. Please step out and bring your documents.",
            expectedResponse: "Yes, officer. Here are my documents. Is there anything specific you need me to do?",
            tip: "Stay calm, cooperate fully, and ask for clarification if needed."
          },
          {
            scenario: "Safety Violation Found",
            officerPrompt: "I found an air brake leak. This vehicle is out of service until repairs are made.",
            expectedResponse: "I understand, officer. I'll call for roadside service immediately. Thank you for catching this safety issue.",
            tip: "Accept responsibility and prioritize safety over schedule."
          }
        ]
      }
    },
    {
      id: "vi-quiz",
      title: "Vehicle Inspection Quiz",
      duration: 5,
      type: "quiz",
      description: "Test your knowledge of vehicle inspection procedures",
      completed: false,
      content: {
        questions: [
          {
            question: "What does 'out of service' mean?",
            type: "multiple_choice",
            options: ["Drive slowly to repair shop", "Cannot drive until repaired", "Drive only during day", "Call dispatcher first"],
            correctAnswer: "Cannot drive until repaired",
            explanation: "Out of service means the vehicle cannot be operated until safety violations are fixed."
          }
        ]
      }
    }
  ]
};

// Learning Module 3: Professional Communication
const professionalCommModule: LearningModule = {
  id: 103,
  title: "Professional Communication Skills",
  description: "Develop professional communication skills for various trucking scenarios",
  duration: 60,
  completion: 0,
  sections: [
    {
      id: "pc-greetings",
      title: "Professional Greetings",
      duration: 15,
      type: "vocabulary",
      description: "Learn appropriate greetings and polite expressions",
      completed: false,
      content: {
        vocabulary: [
          { term: "Good morning", translation: "Buenos días", audioUrl: "https://example.com/audio/good-morning.mp3" },
          { term: "Good afternoon", translation: "Buenas tardes", audioUrl: "https://example.com/audio/good-afternoon.mp3" },
          { term: "Good evening", translation: "Buenas noches", audioUrl: "https://example.com/audio/good-evening.mp3" },
          { term: "Thank you", translation: "Gracias", audioUrl: "https://example.com/audio/thank-you.mp3" },
          { term: "Please", translation: "Por favor", audioUrl: "https://example.com/audio/please.mp3" },
          { term: "Excuse me", translation: "Disculpe", audioUrl: "https://example.com/audio/excuse-me.mp3" },
          { term: "I apologize", translation: "Me disculpo", audioUrl: "https://example.com/audio/apologize.mp3" }
        ]
      }
    },
    {
      id: "pc-dialogue",
      title: "Professional Dialogue Practice",
      duration: 25,
      type: "dialogue",
      description: "Practice professional conversations in various situations",
      completed: false,
      content: {
        dialogue: {
          title: "Professional Interaction",
          lines: [
            { speaker: "Officer", text: "Good afternoon. What is the purpose of your trip today?", audioUrl: "https://example.com/audio/purpose-question.mp3" },
            { speaker: "Driver", text: "Good afternoon, officer. I am delivering cargo to a warehouse in the next city.", audioUrl: "https://example.com/audio/purpose-response.mp3" },
            { speaker: "Officer", text: "What type of cargo are you carrying?", audioUrl: "https://example.com/audio/cargo-question.mp3" },
            { speaker: "Driver", text: "I have automotive parts for a factory, officer. I have the bill of lading here if you need to see it.", audioUrl: "https://example.com/audio/cargo-response.mp3" }
          ],
          audioUrl: "https://example.com/audio/professional-dialogue.mp3"
        }
      }
    },
    {
      id: "pc-quiz",
      title: "Communication Skills Quiz",
      duration: 20,
      type: "quiz",
      description: "Test your professional communication knowledge",
      completed: false,
      content: {
        questions: [
          {
            question: "What is the appropriate greeting for an officer in the afternoon?",
            type: "multiple_choice",
            options: ["Good morning, officer", "Good afternoon, officer", "Hey there", "What's up"],
            correctAnswer: "Good afternoon, officer",
            explanation: "Use time-appropriate greetings with 'officer' to show respect."
          }
        ]
      }
    }
  ]
};

// Export all learning modules
export const learningModules: { [key: number]: LearningModule } = {
  101: trafficStopModule,
  102: vehicleInspectionModule,
  103: professionalCommModule
}; 