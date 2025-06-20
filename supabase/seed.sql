-- Seed data for bootcamp curriculum
-- This file populates the database with sample bootcamp modules and content

-- Insert bootcamp modules
INSERT INTO modules (day_number, title, description, source) VALUES
(1, 'Foundations & Essential Trucking Vocabulary', 'Master core trucking industry terms and document handling terminology', 'bootcamp'),
(2, 'Traffic Stop Communication', 'Learn essential phrases and protocols for traffic stops', 'bootcamp'),
(3, 'Cargo & Loading Documentation', 'Understand shipping documents and cargo handling procedures', 'bootcamp'),
(4, 'Route Planning & Navigation', 'Master route planning and GPS navigation terminology', 'bootcamp'),
(5, 'Emergency Situations & Safety', 'Learn critical emergency response and safety protocols', 'bootcamp')
ON CONFLICT (day_number) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  source = EXCLUDED.source;

-- Insert sections for Module 1
INSERT INTO sections (module_id, type, title, "order", duration, description, source) VALUES
((SELECT id FROM modules WHERE day_number = 1), 'video', 'Welcome to TruckTalk', 1, 10, 'Introduction to the TruckTalk bootcamp and what you''ll learn', 'bootcamp'),
((SELECT id FROM modules WHERE day_number = 1), 'vocabulary', 'Essential Trucking Terms', 2, 30, 'Learn 20 essential trucking industry terms', 'bootcamp'),
((SELECT id FROM modules WHERE day_number = 1), 'dialogue', 'Basic Trucking Conversation', 3, 25, 'Practice common trucking workplace conversations', 'bootcamp'),
((SELECT id FROM modules WHERE day_number = 1), 'quiz', 'Module 1 Quiz', 4, 15, 'Test your knowledge of trucking vocabulary', 'bootcamp')
ON CONFLICT DO NOTHING;

-- Insert sections for Module 2  
INSERT INTO sections (module_id, type, title, "order", duration, description, source) VALUES
((SELECT id FROM modules WHERE day_number = 2), 'video', 'Traffic Stop Overview', 1, 15, 'Understanding traffic stop procedures and protocols', 'bootcamp'),
((SELECT id FROM modules WHERE day_number = 2), 'vocabulary', 'Traffic Stop Vocabulary', 2, 20, 'Key terms and phrases for traffic stops', 'bootcamp'),
((SELECT id FROM modules WHERE day_number = 2), 'dialogue', 'Traffic Stop Dialogue', 3, 25, 'Practice common traffic stop conversations', 'bootcamp'),
((SELECT id FROM modules WHERE day_number = 2), 'roleplay', 'Traffic Stop Practice', 4, 20, 'Interactive traffic stop scenarios', 'bootcamp'),
((SELECT id FROM modules WHERE day_number = 2), 'quiz', 'Module 2 Quiz', 5, 10, 'Test your traffic stop communication skills', 'bootcamp')
ON CONFLICT DO NOTHING;

-- Insert vocabulary for Module 1
INSERT INTO vocabulary (section_id, term, translation, audio_url, source) VALUES
((SELECT id FROM sections WHERE title = 'Essential Trucking Terms' AND module_id = (SELECT id FROM modules WHERE day_number = 1)), 'Bill of Lading', 'Documento de embarque', 'https://example.com/audio/bill-of-lading.mp3', 'bootcamp'),
((SELECT id FROM sections WHERE title = 'Essential Trucking Terms' AND module_id = (SELECT id FROM modules WHERE day_number = 1)), 'Freight', 'Carga', 'https://example.com/audio/freight.mp3', 'bootcamp'),
((SELECT id FROM sections WHERE title = 'Essential Trucking Terms' AND module_id = (SELECT id FROM modules WHERE day_number = 1)), 'Dispatcher', 'Despachador', 'https://example.com/audio/dispatcher.mp3', 'bootcamp'),
((SELECT id FROM sections WHERE title = 'Essential Trucking Terms' AND module_id = (SELECT id FROM modules WHERE day_number = 1)), 'Load', 'Carga', 'https://example.com/audio/load.mp3', 'bootcamp'),
((SELECT id FROM sections WHERE title = 'Essential Trucking Terms' AND module_id = (SELECT id FROM modules WHERE day_number = 1)), 'Route', 'Ruta', 'https://example.com/audio/route.mp3', 'bootcamp'),
((SELECT id FROM sections WHERE title = 'Essential Trucking Terms' AND module_id = (SELECT id FROM modules WHERE day_number = 1)), 'Delivery', 'Entrega', 'https://example.com/audio/delivery.mp3', 'bootcamp'),
((SELECT id FROM sections WHERE title = 'Essential Trucking Terms' AND module_id = (SELECT id FROM modules WHERE day_number = 1)), 'Pickup', 'Recogida', 'https://example.com/audio/pickup.mp3', 'bootcamp'),
((SELECT id FROM sections WHERE title = 'Essential Trucking Terms' AND module_id = (SELECT id FROM modules WHERE day_number = 1)), 'Warehouse', 'Almacén', 'https://example.com/audio/warehouse.mp3', 'bootcamp'),
((SELECT id FROM sections WHERE title = 'Essential Trucking Terms' AND module_id = (SELECT id FROM modules WHERE day_number = 1)), 'Cargo', 'Carga', 'https://example.com/audio/cargo.mp3', 'bootcamp'),
((SELECT id FROM sections WHERE title = 'Essential Trucking Terms' AND module_id = (SELECT id FROM modules WHERE day_number = 1)), 'Trailer', 'Remolque', 'https://example.com/audio/trailer.mp3', 'bootcamp')
ON CONFLICT DO NOTHING;

-- Insert vocabulary for Module 2
INSERT INTO vocabulary (section_id, term, translation, audio_url, source) VALUES
((SELECT id FROM sections WHERE title = 'Traffic Stop Vocabulary' AND module_id = (SELECT id FROM modules WHERE day_number = 2)), 'License', 'Licencia', 'https://example.com/audio/license.mp3', 'bootcamp'),
((SELECT id FROM sections WHERE title = 'Traffic Stop Vocabulary' AND module_id = (SELECT id FROM modules WHERE day_number = 2)), 'Registration', 'Registro', 'https://example.com/audio/registration.mp3', 'bootcamp'),
((SELECT id FROM sections WHERE title = 'Traffic Stop Vocabulary' AND module_id = (SELECT id FROM modules WHERE day_number = 2)), 'Insurance', 'Seguro', 'https://example.com/audio/insurance.mp3', 'bootcamp'),
((SELECT id FROM sections WHERE title = 'Traffic Stop Vocabulary' AND module_id = (SELECT id FROM modules WHERE day_number = 2)), 'Officer', 'Oficial', 'https://example.com/audio/officer.mp3', 'bootcamp'),
((SELECT id FROM sections WHERE title = 'Traffic Stop Vocabulary' AND module_id = (SELECT id FROM modules WHERE day_number = 2)), 'Speed limit', 'Límite de velocidad', 'https://example.com/audio/speed-limit.mp3', 'bootcamp'),
((SELECT id FROM sections WHERE title = 'Traffic Stop Vocabulary' AND module_id = (SELECT id FROM modules WHERE day_number = 2)), 'Citation', 'Multa', 'https://example.com/audio/citation.mp3', 'bootcamp'),
((SELECT id FROM sections WHERE title = 'Traffic Stop Vocabulary' AND module_id = (SELECT id FROM modules WHERE day_number = 2)), 'Warning', 'Advertencia', 'https://example.com/audio/warning.mp3', 'bootcamp')
ON CONFLICT DO NOTHING;

-- Insert dialogues
INSERT INTO dialogues (section_id, title, lines, audio_url, source) VALUES
((SELECT id FROM sections WHERE title = 'Basic Trucking Conversation' AND module_id = (SELECT id FROM modules WHERE day_number = 1)), 
 'Dispatcher Communication', 
 '[
   {"speaker": "Dispatcher", "text": "Good morning, this is dispatch. What''s your location?", "audioUrl": "https://example.com/audio/dispatcher1.mp3"},
   {"speaker": "Driver", "text": "Good morning. I''m at mile marker 45 on I-80 westbound.", "audioUrl": "https://example.com/audio/driver1.mp3"},
   {"speaker": "Dispatcher", "text": "Copy that. Your next pickup is at the warehouse on Industrial Drive.", "audioUrl": "https://example.com/audio/dispatcher2.mp3"},
   {"speaker": "Driver", "text": "Roger. What time is the pickup scheduled?", "audioUrl": "https://example.com/audio/driver2.mp3"}
 ]'::jsonb,
 'https://example.com/audio/dispatcher-conversation.mp3', 'bootcamp'),
((SELECT id FROM sections WHERE title = 'Traffic Stop Dialogue' AND module_id = (SELECT id FROM modules WHERE day_number = 2)), 
 'Basic Traffic Stop', 
 '[
   {"speaker": "Officer", "text": "Good morning. License and registration, please.", "audioUrl": "https://example.com/audio/officer1.mp3"},
   {"speaker": "Driver", "text": "Good morning, officer. Here you go.", "audioUrl": "https://example.com/audio/driver1.mp3"},
   {"speaker": "Officer", "text": "Do you know why I stopped you today?", "audioUrl": "https://example.com/audio/officer2.mp3"},
   {"speaker": "Driver", "text": "I''m not sure, officer.", "audioUrl": "https://example.com/audio/driver2.mp3"},
   {"speaker": "Officer", "text": "You were going 70 in a 55 mph zone.", "audioUrl": "https://example.com/audio/officer3.mp3"},
   {"speaker": "Driver", "text": "I apologize, officer. I didn''t realize I was speeding.", "audioUrl": "https://example.com/audio/driver3.mp3"}
 ]'::jsonb,
 'https://example.com/audio/traffic-stop-conversation.mp3', 'bootcamp')
ON CONFLICT DO NOTHING;

-- Insert practice prompts
INSERT INTO practice_prompts (section_id, scenario, officer_prompt, expected_response, tip, audio_url, source) VALUES
((SELECT id FROM sections WHERE title = 'Traffic Stop Practice' AND module_id = (SELECT id FROM modules WHERE day_number = 2)), 
 'Routine Traffic Stop', 
 'Good afternoon. I pulled you over because you were speeding. License and registration, please.',
 'Good afternoon, officer. I apologize for speeding. Here are my license and registration.',
 'Always remain calm and polite. Have your documents ready and keep your hands visible.',
 'https://example.com/audio/practice-scenario1.mp3', 'bootcamp'),
((SELECT id FROM sections WHERE title = 'Traffic Stop Practice' AND module_id = (SELECT id FROM modules WHERE day_number = 2)), 
 'Document Request', 
 'I need to see your commercial driver''s license and vehicle registration.',
 'Here is my CDL and the vehicle registration, officer.',
 'Commercial drivers should always carry their CDL and vehicle documentation.',
 'https://example.com/audio/practice-scenario2.mp3', 'bootcamp')
ON CONFLICT DO NOTHING;

-- Insert quizzes
INSERT INTO quizzes (module_id, question, type, options, correct_answer, explanation, source) VALUES
((SELECT id FROM modules WHERE day_number = 1), 
 'What is a "Bill of Lading"?', 
 'multiple_choice', 
 '["A shipping document", "A type of truck", "A loading dock", "A driver''s license"]'::jsonb,
 'A shipping document',
 'A Bill of Lading is a legal document that details the type, quantity, and destination of goods being carried.', 'bootcamp'),
((SELECT id FROM modules WHERE day_number = 1), 
 'The Spanish translation for "Freight" is ______.', 
 'fill_blank', 
 '["Carga", "Flete", "Mercancía"]'::jsonb,
 'Carga',
 'Freight translates to "Carga" in Spanish, referring to goods transported by truck.', 'bootcamp'),
((SELECT id FROM modules WHERE day_number = 2), 
 'When stopped by an officer, you should first:', 
 'multiple_choice', 
 '["Get out of the vehicle", "Keep your hands visible", "Ask why you were stopped", "Turn off the engine"]'::jsonb,
 'Keep your hands visible',
 'Keeping your hands visible helps ensure the officer''s safety and shows you are not a threat.', 'bootcamp'),
((SELECT id FROM modules WHERE day_number = 2), 
 'What documents should a truck driver have ready during a traffic stop?', 
 'multiple_choice', 
 '["Only driver''s license", "License and registration", "Just registration", "Insurance only"]'::jsonb,
 'License and registration',
 'Truck drivers should always have their license, registration, and insurance documents ready.', 'bootcamp')
ON CONFLICT DO NOTHING;

-- Insert exercises
INSERT INTO exercises (section_id, question, type, options, correct_answer, explanation, source) VALUES
((SELECT id FROM sections WHERE title = 'Essential Trucking Terms' AND module_id = (SELECT id FROM modules WHERE day_number = 1)), 
 'Match the term: A person who coordinates truck routes and schedules', 
 'multiple_choice', 
 '["Driver", "Dispatcher", "Mechanic", "Loader"]'::jsonb,
 'Dispatcher',
 'A dispatcher is responsible for coordinating routes, schedules, and communication with drivers.', 'bootcamp'),
((SELECT id FROM sections WHERE title = 'Traffic Stop Vocabulary' AND module_id = (SELECT id FROM modules WHERE day_number = 2)), 
 'Complete the sentence: "Here is my ______ and registration, officer."', 
 'fill_blank', 
 '["license", "licencia"]'::jsonb,
 'license',
 'When speaking to an officer, you should present your license and registration documents.', 'bootcamp')
ON CONFLICT DO NOTHING;

-- Log completion
DO $$
DECLARE
    module_count INTEGER;
    section_count INTEGER;
    vocab_count INTEGER;
    dialogue_count INTEGER;
    quiz_count INTEGER;
    exercise_count INTEGER;
    practice_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO module_count FROM modules;
    SELECT COUNT(*) INTO section_count FROM sections;
    SELECT COUNT(*) INTO vocab_count FROM vocabulary;
    SELECT COUNT(*) INTO dialogue_count FROM dialogues;
    SELECT COUNT(*) INTO quiz_count FROM quizzes;
    SELECT COUNT(*) INTO exercise_count FROM exercises;
    SELECT COUNT(*) INTO practice_count FROM practice_prompts;
    
    RAISE NOTICE 'Bootcamp seeding completed successfully!';
    RAISE NOTICE 'Inserted: % modules, % sections, % vocabulary terms, % dialogues, % quizzes, % exercises, % practice prompts', 
                 module_count, section_count, vocab_count, dialogue_count, quiz_count, exercise_count, practice_count;
END $$;

-- ===================================================================
-- LEARNING MODULES SECTION
-- ===================================================================

-- Insert learning modules (IDs 101-103 to avoid conflicts with bootcamp modules 1-5)
-- day_number is NULL for learning modules since they don't follow a daily structure
INSERT INTO modules (id, title, description, source, day_number) VALUES
(101, 'Traffic Stop Fundamentals', 'Master essential communication skills for traffic stops and document checks', 'learning', NULL),
(102, 'Vehicle Inspection Communication', 'Learn how to communicate effectively during roadside vehicle inspections', 'learning', NULL),
(103, 'Professional Communication Skills', 'Develop professional communication skills for various trucking scenarios', 'learning', NULL)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  source = EXCLUDED.source;

-- Insert sections for Learning Module 101: Traffic Stop Fundamentals
INSERT INTO sections (module_id, type, title, "order", duration, description, source) VALUES
(101, 'video', 'Traffic Stop Overview', 1, 15, 'Understanding traffic stop procedures and what to expect', 'learning'),
(101, 'vocabulary', 'Essential Traffic Stop Vocabulary', 2, 25, 'Key terms and phrases for traffic stop communication', 'learning'),
(101, 'dialogue', 'Basic Traffic Stop Dialogue', 3, 20, 'Practice common traffic stop conversations', 'learning'),
(101, 'practice', 'Traffic Stop Practice Scenarios', 4, 20, 'Interactive practice with various traffic stop situations', 'learning'),
(101, 'quiz', 'Traffic Stop Knowledge Quiz', 5, 10, 'Test your understanding of traffic stop procedures', 'learning')
ON CONFLICT DO NOTHING;

-- Insert vocabulary for Traffic Stop Fundamentals
INSERT INTO vocabulary (section_id, term, translation, audio_url, source) VALUES
((SELECT id FROM sections WHERE title = 'Essential Traffic Stop Vocabulary' AND module_id = 101), 'License', 'Licencia', 'https://example.com/audio/license.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Essential Traffic Stop Vocabulary' AND module_id = 101), 'Registration', 'Registro', 'https://example.com/audio/registration.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Essential Traffic Stop Vocabulary' AND module_id = 101), 'Insurance', 'Seguro', 'https://example.com/audio/insurance.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Essential Traffic Stop Vocabulary' AND module_id = 101), 'Officer', 'Oficial', 'https://example.com/audio/officer.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Essential Traffic Stop Vocabulary' AND module_id = 101), 'Pull over', 'Orillarse', 'https://example.com/audio/pull-over.mp3', 'learning')
ON CONFLICT DO NOTHING;

-- Insert dialogues for learning modules
INSERT INTO dialogues (section_id, title, lines, audio_url, source) VALUES
((SELECT id FROM sections WHERE title = 'Basic Traffic Stop Dialogue' AND module_id = 101), 
 'Routine Traffic Stop', 
 '[
   {"speaker": "Officer", "text": "Good afternoon. I need to see your license, registration, and insurance please.", "audioUrl": "https://example.com/audio/officer-request.mp3"},
   {"speaker": "Driver", "text": "Good afternoon, officer. Yes, of course. My hands are on the steering wheel. May I reach for my documents?", "audioUrl": "https://example.com/audio/driver-response.mp3"},
   {"speaker": "Officer", "text": "Yes, go ahead slowly. Take your time.", "audioUrl": "https://example.com/audio/officer-permission.mp3"},
   {"speaker": "Driver", "text": "Thank you, officer. Here is my CDL, insurance card, and registration.", "audioUrl": "https://example.com/audio/driver-documents.mp3"}
 ]'::jsonb,
 'https://example.com/audio/traffic-stop-dialogue.mp3',
 'learning')
ON CONFLICT DO NOTHING;

-- Insert quizzes for learning modules
INSERT INTO quizzes (module_id, question, type, options, correct_answer, explanation, source) VALUES
(101, 
 'What should you do with your hands when an officer approaches?', 
 'multiple_choice', 
 '["Hide them", "Keep them visible on the steering wheel", "Put them in pockets", "Wave at officer"]'::jsonb,
 'Keep them visible on the steering wheel',
 'Visible hands show you''re not a threat and help ensure everyone''s safety.',
 'learning')
ON CONFLICT DO NOTHING;

-- Log final completion
DO $$
DECLARE
    total_modules INTEGER;
    bootcamp_modules INTEGER;
    learning_modules INTEGER;
    total_sections INTEGER;
    total_vocab INTEGER;
BEGIN
    SELECT COUNT(*) INTO total_modules FROM modules;
    SELECT COUNT(*) INTO bootcamp_modules FROM modules WHERE source = 'bootcamp';
    SELECT COUNT(*) INTO learning_modules FROM modules WHERE source = 'learning';
    SELECT COUNT(*) INTO total_sections FROM sections;
    SELECT COUNT(*) INTO total_vocab FROM vocabulary;
    
    RAISE NOTICE 'All seeding completed successfully!';
    RAISE NOTICE 'Total: % modules (% bootcamp, % learning), % sections, % vocabulary terms', 
                 total_modules, bootcamp_modules, learning_modules, total_sections, total_vocab;
END $$;

-- ===================================================================
-- TRAFFIC STOP COURSE MODULES SECTION
-- ===================================================================

-- Insert traffic stop course modules (IDs 104-115)
INSERT INTO modules (id, title, description, source, day_number) VALUES
(104, 'Initial Traffic Stop', 'Essential phrases and vocabulary for when an officer first pulls you over.', 'learning', NULL),
(105, 'Document Check', 'How to understand and respond to requests for documentation during a traffic stop.', 'learning', NULL),
(106, 'Vehicle Inspection', 'Understanding instructions during roadside inspections and safety checks.', 'learning', NULL),
(107, 'Explaining Situations', 'How to clearly explain your situation and circumstances to law enforcement.', 'learning', NULL),
(108, 'Citations and Tickets', 'Understanding and responding to traffic citations and tickets.', 'learning', NULL),
(109, 'Emergency Situations', 'Communication during emergency situations and roadside assistance.', 'learning', NULL),
(110, 'Basic Greetings', 'Professional greetings and basic communication with law enforcement.', 'learning', NULL),
(111, 'Road Signs and Traffic Rules', 'Understanding and discussing road signs and traffic regulations.', 'learning', NULL),
(112, 'Border Crossing', 'Communication during border crossings and customs inspections.', 'learning', NULL),
(113, 'Vehicle Maintenance', 'Discussing vehicle maintenance and mechanical issues with officers.', 'learning', NULL),
(114, 'Cargo Documentation', 'Understanding and presenting cargo documentation and manifests.', 'learning', NULL),
(115, 'Weather and Road Safety', 'Communication about weather conditions and road safety concerns.', 'learning', NULL)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  source = EXCLUDED.source;

-- Insert sections for Traffic Stop Course modules
INSERT INTO sections (module_id, type, title, "order", duration, description, source) VALUES
-- Module 104: Initial Traffic Stop
(104, 'vocabulary', 'Traffic Stop Vocabulary', 1, 30, 'Essential terms for traffic stop communication', 'learning'),
(104, 'dialogue', 'Traffic Stop Dialogues', 2, 25, 'Practice conversations during traffic stops', 'learning'),
(104, 'practice', 'Traffic Stop Tips', 3, 15, 'Best practices and safety tips', 'learning'),
(104, 'quiz', 'Traffic Stop Assessment', 4, 20, 'Test your traffic stop communication skills', 'learning'),

-- Module 105: Document Check
(105, 'vocabulary', 'Documentation Vocabulary', 1, 25, 'Terms related to document requests and verification', 'learning'),
(105, 'dialogue', 'Document Check Dialogues', 2, 30, 'Practice document verification conversations', 'learning'),
(105, 'practice', 'Documentation Tips', 3, 15, 'Tips for organizing and presenting documents', 'learning'),
(105, 'quiz', 'Document Check Assessment', 4, 20, 'Test your document handling knowledge', 'learning'),

-- Module 106: Vehicle Inspection
(106, 'vocabulary', 'Vehicle Inspection Terms', 1, 25, 'Vocabulary for vehicle inspections and safety checks', 'learning'),
(106, 'dialogue', 'Inspection Dialogues', 2, 30, 'Practice vehicle inspection conversations', 'learning'),
(106, 'practice', 'Inspection Tips', 3, 15, 'Tips for vehicle inspection procedures', 'learning'),
(106, 'quiz', 'Vehicle Inspection Assessment', 4, 20, 'Test your inspection communication skills', 'learning'),

-- Module 107: Explaining Situations
(107, 'vocabulary', 'Situation Explanation Terms', 1, 20, 'Vocabulary for explaining circumstances and situations', 'learning'),
(107, 'dialogue', 'Situation Dialogues', 2, 25, 'Practice explaining various situations', 'learning'),
(107, 'practice', 'Explanation Tips', 3, 15, 'Tips for clear communication', 'learning'),
(107, 'quiz', 'Situation Explanation Assessment', 4, 20, 'Test your explanation skills', 'learning'),

-- Module 108: Citations and Tickets
(108, 'vocabulary', 'Citation Vocabulary', 1, 20, 'Terms related to citations and tickets', 'learning'),
(108, 'dialogue', 'Citation Dialogues', 2, 25, 'Practice citation-related conversations', 'learning'),
(108, 'practice', 'Citation Tips', 3, 15, 'Tips for handling citations', 'learning'),
(108, 'quiz', 'Citation Assessment', 4, 20, 'Test your citation knowledge', 'learning'),

-- Module 109: Emergency Situations
(109, 'vocabulary', 'Emergency Vocabulary', 1, 20, 'Terms for emergency communication', 'learning'),
(109, 'dialogue', 'Emergency Dialogues', 2, 25, 'Practice emergency situation conversations', 'learning'),
(109, 'practice', 'Emergency Tips', 3, 15, 'Tips for emergency communication', 'learning'),
(109, 'quiz', 'Emergency Assessment', 4, 20, 'Test your emergency communication skills', 'learning'),

-- Module 110: Basic Greetings
(110, 'vocabulary', 'Greeting Vocabulary', 1, 15, 'Professional greetings and polite expressions', 'learning'),
(110, 'dialogue', 'Greeting Dialogues', 2, 20, 'Practice professional greetings', 'learning'),
(110, 'practice', 'Greeting Tips', 3, 10, 'Tips for professional communication', 'learning'),
(110, 'quiz', 'Greeting Assessment', 4, 15, 'Test your greeting skills', 'learning'),

-- Module 111: Road Signs and Traffic Rules
(111, 'vocabulary', 'Traffic Rules Vocabulary', 1, 20, 'Terms for road signs and traffic regulations', 'learning'),
(111, 'dialogue', 'Traffic Rules Dialogues', 2, 25, 'Practice traffic rule conversations', 'learning'),
(111, 'practice', 'Traffic Rules Tips', 3, 15, 'Tips for traffic rule compliance', 'learning'),
(111, 'quiz', 'Traffic Rules Assessment', 4, 20, 'Test your traffic rules knowledge', 'learning'),

-- Module 112: Border Crossing
(112, 'vocabulary', 'Border Crossing Vocabulary', 1, 20, 'Terms for border crossing and customs', 'learning'),
(112, 'dialogue', 'Border Crossing Dialogues', 2, 25, 'Practice border crossing conversations', 'learning'),
(112, 'practice', 'Border Crossing Tips', 3, 15, 'Tips for border crossing procedures', 'learning'),
(112, 'quiz', 'Border Crossing Assessment', 4, 20, 'Test your border crossing knowledge', 'learning'),

-- Module 113: Vehicle Maintenance
(113, 'vocabulary', 'Maintenance Vocabulary', 1, 20, 'Terms for vehicle maintenance discussions', 'learning'),
(113, 'dialogue', 'Maintenance Dialogues', 2, 25, 'Practice maintenance conversations', 'learning'),
(113, 'practice', 'Maintenance Tips', 3, 15, 'Tips for maintenance communication', 'learning'),
(113, 'quiz', 'Maintenance Assessment', 4, 20, 'Test your maintenance knowledge', 'learning'),

-- Module 114: Cargo Documentation
(114, 'vocabulary', 'Cargo Vocabulary', 1, 20, 'Terms for cargo documentation and manifests', 'learning'),
(114, 'dialogue', 'Cargo Dialogues', 2, 25, 'Practice cargo documentation conversations', 'learning'),
(114, 'practice', 'Cargo Tips', 3, 15, 'Tips for cargo documentation', 'learning'),
(114, 'quiz', 'Cargo Assessment', 4, 20, 'Test your cargo documentation knowledge', 'learning'),

-- Module 115: Weather and Road Safety
(115, 'vocabulary', 'Weather Safety Vocabulary', 1, 20, 'Terms for weather and safety discussions', 'learning'),
(115, 'dialogue', 'Weather Safety Dialogues', 2, 25, 'Practice weather safety conversations', 'learning'),
(115, 'practice', 'Weather Safety Tips', 3, 15, 'Tips for weather safety communication', 'learning'),
(115, 'quiz', 'Weather Safety Assessment', 4, 20, 'Test your weather safety knowledge', 'learning')
ON CONFLICT DO NOTHING;

-- Insert vocabulary for Traffic Stop Course modules
INSERT INTO vocabulary (section_id, term, translation, audio_url, source) VALUES
-- Module 104: Initial Traffic Stop Vocabulary
((SELECT id FROM sections WHERE title = 'Traffic Stop Vocabulary' AND module_id = 104), 'license', 'Licencia', 'https://example.com/audio/license.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Traffic Stop Vocabulary' AND module_id = 104), 'registration', 'Registro', 'https://example.com/audio/registration.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Traffic Stop Vocabulary' AND module_id = 104), 'insurance', 'Seguro', 'https://example.com/audio/insurance.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Traffic Stop Vocabulary' AND module_id = 104), 'pull over', 'Orillarse', 'https://example.com/audio/pull-over.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Traffic Stop Vocabulary' AND module_id = 104), 'officer', 'Oficial', 'https://example.com/audio/officer.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Traffic Stop Vocabulary' AND module_id = 104), 'speed limit', 'Límite de velocidad', 'https://example.com/audio/speed-limit.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Traffic Stop Vocabulary' AND module_id = 104), 'speeding', 'Exceso de velocidad', 'https://example.com/audio/speeding.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Traffic Stop Vocabulary' AND module_id = 104), 'traffic violation', 'Infracción de tránsito', 'https://example.com/audio/traffic-violation.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Traffic Stop Vocabulary' AND module_id = 104), 'documents', 'Documentos', 'https://example.com/audio/documents.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Traffic Stop Vocabulary' AND module_id = 104), 'hands visible', 'Manos visibles', 'https://example.com/audio/hands-visible.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Traffic Stop Vocabulary' AND module_id = 104), 'steering wheel', 'Volante', 'https://example.com/audio/steering-wheel.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Traffic Stop Vocabulary' AND module_id = 104), 'apologize', 'Disculparse', 'https://example.com/audio/apologize.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Traffic Stop Vocabulary' AND module_id = 104), 'understand', 'Entender', 'https://example.com/audio/understand.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Traffic Stop Vocabulary' AND module_id = 104), 'slowly', 'Despacio', 'https://example.com/audio/slowly.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Traffic Stop Vocabulary' AND module_id = 104), 'wallet', 'Billetera', 'https://example.com/audio/wallet.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Traffic Stop Vocabulary' AND module_id = 104), 'glove box', 'Guantera', 'https://example.com/audio/glove-box.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Traffic Stop Vocabulary' AND module_id = 104), 'commercial vehicle', 'Vehículo comercial', 'https://example.com/audio/commercial-vehicle.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Traffic Stop Vocabulary' AND module_id = 104), 'shoulder', 'Acera', 'https://example.com/audio/shoulder.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Traffic Stop Vocabulary' AND module_id = 104), 'emergency flashers', 'Luces de emergencia', 'https://example.com/audio/emergency-flashers.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Traffic Stop Vocabulary' AND module_id = 104), 'cooperate', 'Cooperar', 'https://example.com/audio/cooperate.mp3', 'learning'),

-- Module 105: Document Check Vocabulary
((SELECT id FROM sections WHERE title = 'Documentation Vocabulary' AND module_id = 105), 'Commercial Driver''s License (CDL)', 'Licencia de Conductor Comercial', 'https://example.com/audio/cdl.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Documentation Vocabulary' AND module_id = 105), 'Electronic Logging Device (ELD)', 'Dispositivo de Registro Electrónico', 'https://example.com/audio/eld.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Documentation Vocabulary' AND module_id = 105), 'logbook', 'Libro de registro', 'https://example.com/audio/logbook.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Documentation Vocabulary' AND module_id = 105), 'Hours of Service', 'Horas de servicio', 'https://example.com/audio/hours-of-service.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Documentation Vocabulary' AND module_id = 105), 'medical certificate', 'Certificado médico', 'https://example.com/audio/medical-certificate.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Documentation Vocabulary' AND module_id = 105), 'expired', 'Vencido', 'https://example.com/audio/expired.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Documentation Vocabulary' AND module_id = 105), 'valid', 'Válido', 'https://example.com/audio/valid.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Documentation Vocabulary' AND module_id = 105), 'inspection', 'Inspección', 'https://example.com/audio/inspection.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Documentation Vocabulary' AND module_id = 105), 'compliance', 'Cumplimiento', 'https://example.com/audio/compliance.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Documentation Vocabulary' AND module_id = 105), 'violation', 'Violación', 'https://example.com/audio/violation.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Documentation Vocabulary' AND module_id = 105), 'duty status', 'Estado de servicio', 'https://example.com/audio/duty-status.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Documentation Vocabulary' AND module_id = 105), 'rest period', 'Período de descanso', 'https://example.com/audio/rest-period.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Documentation Vocabulary' AND module_id = 105), 'driving time', 'Tiempo de conducción', 'https://example.com/audio/driving-time.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Documentation Vocabulary' AND module_id = 105), 'on-duty time', 'Tiempo en servicio', 'https://example.com/audio/on-duty-time.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Documentation Vocabulary' AND module_id = 105), 'sleeper berth', 'Litera', 'https://example.com/audio/sleeper-berth.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Documentation Vocabulary' AND module_id = 105), 'pre-trip inspection', 'Inspección previa al viaje', 'https://example.com/audio/pre-trip-inspection.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Documentation Vocabulary' AND module_id = 105), 'post-trip inspection', 'Inspección posterior al viaje', 'https://example.com/audio/post-trip-inspection.mp3', 'learning'),

-- Module 106: Vehicle Inspection Vocabulary
((SELECT id FROM sections WHERE title = 'Vehicle Inspection Terms' AND module_id = 106), 'brake', 'Freno', 'https://example.com/audio/brake.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Vehicle Inspection Terms' AND module_id = 106), 'lights', 'Luces', 'https://example.com/audio/lights.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Vehicle Inspection Terms' AND module_id = 106), 'tire', 'Neumático', 'https://example.com/audio/tire.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Vehicle Inspection Terms' AND module_id = 106), 'engine', 'Motor', 'https://example.com/audio/engine.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Vehicle Inspection Terms' AND module_id = 106), 'hood', 'Capó', 'https://example.com/audio/hood.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Vehicle Inspection Terms' AND module_id = 106), 'safety violation', 'Violación de seguridad', 'https://example.com/audio/safety-violation.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Vehicle Inspection Terms' AND module_id = 106), 'step out', 'Salir', 'https://example.com/audio/step-out.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Vehicle Inspection Terms' AND module_id = 106), 'turn signals', 'Direccionales', 'https://example.com/audio/turn-signals.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Vehicle Inspection Terms' AND module_id = 106), 'headlights', 'Faros', 'https://example.com/audio/headlights.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Vehicle Inspection Terms' AND module_id = 106), 'brake lights', 'Luces de freno', 'https://example.com/audio/brake-lights.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Vehicle Inspection Terms' AND module_id = 106), 'windshield', 'Parabrisas', 'https://example.com/audio/windshield.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Vehicle Inspection Terms' AND module_id = 106), 'mirrors', 'Espejos', 'https://example.com/audio/mirrors.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Vehicle Inspection Terms' AND module_id = 106), 'exhaust system', 'Sistema de escape', 'https://example.com/audio/exhaust-system.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Vehicle Inspection Terms' AND module_id = 106), 'suspension', 'Suspensión', 'https://example.com/audio/suspension.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Vehicle Inspection Terms' AND module_id = 106), 'air brakes', 'Frenos de aire', 'https://example.com/audio/air-brakes.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Vehicle Inspection Terms' AND module_id = 106), 'tread depth', 'Profundidad del dibujo', 'https://example.com/audio/tread-depth.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Vehicle Inspection Terms' AND module_id = 106), 'defect', 'Defecto', 'https://example.com/audio/defect.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Vehicle Inspection Terms' AND module_id = 106), 'out of service', 'Fuera de servicio', 'https://example.com/audio/out-of-service.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Vehicle Inspection Terms' AND module_id = 106), 'warning triangle', 'Triángulo de advertencia', 'https://example.com/audio/warning-triangle.mp3', 'learning')
ON CONFLICT DO NOTHING;

-- Insert dialogues for Traffic Stop Course modules
INSERT INTO dialogues (section_id, title, lines, audio_url, source) VALUES
-- Module 104: Initial Traffic Stop Dialogues
((SELECT id FROM sections WHERE title = 'Traffic Stop Dialogues' AND module_id = 104), 
 'Being Pulled Over - Polite Officer, Nervous Driver', 
 '[
   {"speaker": "Officer", "text": "Good afternoon. I need to see your license, registration, and insurance please.", "audioUrl": "https://example.com/audio/officer-request.mp3"},
   {"speaker": "Driver", "text": "Good afternoon, officer. Yes, of course. My hands are on the steering wheel. May I reach for my documents?", "audioUrl": "https://example.com/audio/driver-response.mp3"},
   {"speaker": "Officer", "text": "Yes, go ahead slowly. Take your time.", "audioUrl": "https://example.com/audio/officer-permission.mp3"},
   {"speaker": "Driver", "text": "Thank you, officer. Here is my CDL, insurance card, and registration. I''m sorry, my English is not perfect.", "audioUrl": "https://example.com/audio/driver-documents.mp3"},
   {"speaker": "Officer", "text": "That''s okay, you''re doing fine. Do you know why I pulled you over today?", "audioUrl": "https://example.com/audio/officer-question.mp3"},
   {"speaker": "Driver", "text": "No, officer. I''m not sure. Did I do something wrong? I was trying to be very careful.", "audioUrl": "https://example.com/audio/driver-unsure.mp3"},
   {"speaker": "Officer", "text": "You were traveling 65 miles per hour in a 55 mile per hour zone. The speed limit dropped back there at the construction sign.", "audioUrl": "https://example.com/audio/officer-explanation.mp3"},
   {"speaker": "Driver", "text": "Oh no, I''m very sorry, officer. I have a delivery deadline today and I was worried about being late. But I should have been more careful with the speed limit. This is my mistake.", "audioUrl": "https://example.com/audio/driver-apology.mp3"}
 ]'::jsonb,
 'https://example.com/audio/traffic-stop-dialogue-1.mp3',
 'learning'),

-- Module 105: Document Check Dialogues
((SELECT id FROM sections WHERE title = 'Document Check Dialogues' AND module_id = 105), 
 'Document Verification - Professional Officer, Prepared Driver', 
 '[
   {"speaker": "Officer", "text": "I need to see your CDL, medical certificate, and hours of service records.", "audioUrl": "https://example.com/audio/officer-document-request.mp3"},
   {"speaker": "Driver", "text": "Yes, officer. Here is my CDL, medical certificate, and my ELD records. Everything is current.", "audioUrl": "https://example.com/audio/driver-document-response.mp3"},
   {"speaker": "Officer", "text": "Your medical certificate expires next month. Are you aware of that?", "audioUrl": "https://example.com/audio/officer-expiration-notice.mp3"},
   {"speaker": "Driver", "text": "Yes, officer. I have an appointment with the doctor next week to renew it. I always renew early to avoid problems.", "audioUrl": "https://example.com/audio/driver-renewal-plan.mp3"},
   {"speaker": "Officer", "text": "Good thinking. Your hours look fine. Any violations or accidents in the past year?", "audioUrl": "https://example.com/audio/officer-record-check.mp3"},
   {"speaker": "Driver", "text": "No violations, no accidents, officer. I try to drive very carefully. I know one mistake can cost me my job and my family''s income.", "audioUrl": "https://example.com/audio/driver-clean-record.mp3"}
 ]'::jsonb,
 'https://example.com/audio/document-check-dialogue.mp3',
 'learning'),

-- Module 106: Vehicle Inspection Dialogues
((SELECT id FROM sections WHERE title = 'Inspection Dialogues' AND module_id = 106), 
 'Level 2 Inspection - Routine Check, Well-Maintained Vehicle', 
 '[
   {"speaker": "Officer", "text": "I''m going to conduct a Level 2 roadside inspection today. This is routine. Please step out of the vehicle and bring your documents with you.", "audioUrl": "https://example.com/audio/officer-inspection-start.mp3"},
   {"speaker": "Driver", "text": "Yes, officer. Is there a problem with my truck? I did my pre-trip inspection this morning and everything looked good.", "audioUrl": "https://example.com/audio/driver-inspection-question.mp3"},
   {"speaker": "Officer", "text": "This is just a routine safety inspection. Nothing to worry about if your vehicle is properly maintained. Please pop the hood so I can inspect the engine compartment.", "audioUrl": "https://example.com/audio/officer-hood-request.mp3"},
   {"speaker": "Driver", "text": "Of course, officer. The hood release is right here inside the cab. I had the truck serviced last week at our company garage.", "audioUrl": "https://example.com/audio/driver-hood-response.mp3"},
   {"speaker": "Officer", "text": "Good. Now I need you to turn on all your lights - headlights, turn signals, brake lights, and hazard lights. I''ll walk around and check each one.", "audioUrl": "https://example.com/audio/officer-lights-request.mp3"},
   {"speaker": "Driver", "text": "Yes, sir. Headlights are on now. Should I test the turn signals too? Left signal... right signal... and here are the hazard lights.", "audioUrl": "https://example.com/audio/driver-lights-test.mp3"}
 ]'::jsonb,
 'https://example.com/audio/vehicle-inspection-dialogue-1.mp3',
 'learning'),

((SELECT id FROM sections WHERE title = 'Inspection Dialogues' AND module_id = 106), 
 'Level 1 Inspection - Safety Violations Found', 
 '[
   {"speaker": "Officer", "text": "This is a Level 1 DOT inspection. I''ll be checking your vehicle thoroughly and your driver qualifications. Step out and bring all your paperwork.", "audioUrl": "https://example.com/audio/officer-level1-start.mp3"},
   {"speaker": "Driver", "text": "Level 1? That sounds serious, officer. I hope everything is okay. Here are my documents. I try to maintain my truck well.", "audioUrl": "https://example.com/audio/driver-level1-concern.mp3"},
   {"speaker": "Officer", "text": "We''ll see. Turn on your headlights... I can see your left headlight is significantly dimmer than the right. When did you last check your lights?", "audioUrl": "https://example.com/audio/officer-headlight-issue.mp3"},
   {"speaker": "Driver", "text": "I check them every morning during pre-trip, officer. The left one was working this morning, but maybe it''s getting weak?", "audioUrl": "https://example.com/audio/driver-headlight-explanation.mp3"},
   {"speaker": "Officer", "text": "Now test your air brakes. Apply and release... I''m hearing an air leak. Do you hear that hissing sound? That''s a serious safety issue.", "audioUrl": "https://example.com/audio/officer-air-leak.mp3"},
   {"speaker": "Driver", "text": "Oh no, I do hear it now. I thought that was normal air system noise. I''m not very experienced with air brake systems yet. Is this dangerous?", "audioUrl": "https://example.com/audio/driver-air-leak-concern.mp3"},
   {"speaker": "Officer", "text": "Very dangerous. I''m placing this vehicle out of service until repairs are made. You cannot drive with faulty brakes. You''ll need to call for roadside service.", "audioUrl": "https://example.com/audio/officer-out-of-service.mp3"},
   {"speaker": "Driver", "text": "I understand, officer. Safety is most important. I''ll call my company right now. Thank you for catching this problem before something bad happened.", "audioUrl": "https://example.com/audio/driver-safety-agreement.mp3"}
 ]'::jsonb,
 'https://example.com/audio/vehicle-inspection-dialogue-2.mp3',
 'learning')
ON CONFLICT DO NOTHING;

-- Insert practice prompts for Traffic Stop Course modules
INSERT INTO practice_prompts (section_id, scenario, officer_prompt, expected_response, tip, audio_url, source) VALUES
-- Module 104: Traffic Stop Tips
((SELECT id FROM sections WHERE title = 'Traffic Stop Tips' AND module_id = 104), 
 'Hands Visibility', 
 'Keep your hands visible on the steering wheel until instructed otherwise.',
 'I will keep my hands visible on the steering wheel, officer.',
 'Always keep your hands where the officer can see them to show you are not a threat.',
 'https://example.com/audio/tip-hands-visible.mp3',
 'learning'),
((SELECT id FROM sections WHERE title = 'Traffic Stop Tips' AND module_id = 104), 
 'Document Request', 
 'I need to see your license, registration, and insurance.',
 'Yes, officer. May I reach for my documents? They are in my wallet and glove box.',
 'Always ask permission before reaching for documents and move slowly.',
 'https://example.com/audio/tip-document-request.mp3',
 'learning'),
((SELECT id FROM sections WHERE title = 'Traffic Stop Tips' AND module_id = 104), 
 'Speeding Violation', 
 'You were going 70 in a 55 mph zone.',
 'I apologize, officer. I should have been more careful with the speed limit.',
 'Acknowledge the violation and apologize rather than making excuses.',
 'https://example.com/audio/tip-speeding-violation.mp3',
 'learning'),

-- Module 105: Documentation Tips
((SELECT id FROM sections WHERE title = 'Documentation Tips' AND module_id = 105), 
 'CDL Verification', 
 'Show me your Commercial Driver''s License.',
 'Here is my CDL, officer. It''s valid until next year.',
 'Always carry your CDL and keep it current.',
 'https://example.com/audio/tip-cdl-verification.mp3',
 'learning'),
((SELECT id FROM sections WHERE title = 'Documentation Tips' AND module_id = 105), 
 'Hours of Service', 
 'I need to see your hours of service records.',
 'I use an ELD to track my hours automatically. Here are my current records.',
 'Be familiar with your ELD and how to display your hours.',
 'https://example.com/audio/tip-hours-service.mp3',
 'learning'),
((SELECT id FROM sections WHERE title = 'Documentation Tips' AND module_id = 105), 
 'Medical Certificate', 
 'Your medical certificate is expired.',
 'I have an appointment to renew it next week. I always renew early.',
 'Keep track of expiration dates and renew documents early.',
 'https://example.com/audio/tip-medical-certificate.mp3',
 'learning'),

-- Module 106: Vehicle Inspection Tips
((SELECT id FROM sections WHERE title = 'Inspection Tips' AND module_id = 106), 
 'Inspection Start', 
 'I''m going to conduct a Level 2 roadside inspection. Please step out of the vehicle.',
 'Yes, officer. I''ll step out and bring my documents with me.',
 'Follow all instructions carefully and promptly during inspections.',
 'https://example.com/audio/tip-inspection-start.mp3',
 'learning'),
((SELECT id FROM sections WHERE title = 'Inspection Tips' AND module_id = 106), 
 'Hood Request', 
 'Pop the hood so I can inspect the engine compartment.',
 'Of course, officer. The hood release is right here inside the cab.',
 'Know how to operate all vehicle systems and components.',
 'https://example.com/audio/tip-hood-request.mp3',
 'learning'),
((SELECT id FROM sections WHERE title = 'Inspection Tips' AND module_id = 106), 
 'Lights Test', 
 'Turn on all your lights - headlights, turn signals, brake lights, and hazard lights.',
 'Yes, sir. Headlights are on now. Should I test the turn signals too?',
 'Be familiar with how to operate all vehicle lighting systems.',
 'https://example.com/audio/tip-lights-test.mp3',
 'learning'),
((SELECT id FROM sections WHERE title = 'Inspection Tips' AND module_id = 106), 
 'Safety Violation', 
 'I found a defect in your brake system. This vehicle is out of service.',
 'I understand, officer. Safety is most important. I''ll call for roadside service.',
 'If you don''t understand an instruction, ask for clarification.',
 'https://example.com/audio/tip-safety-violation.mp3',
 'learning')
ON CONFLICT DO NOTHING;

-- Insert quizzes for Traffic Stop Course modules
INSERT INTO quizzes (module_id, question, type, options, correct_answer, explanation, source) VALUES
-- Module 104: Traffic Stop Assessment
(104, 
 'What should you do with your hands when an officer first approaches your vehicle?', 
 'multiple_choice', 
 '["Hide them under the steering wheel", "Keep them visible on the steering wheel", "Put them in your pockets", "Wave them at the officer"]'::jsonb,
 'Keep them visible on the steering wheel',
 'Keeping your hands visible on the steering wheel shows the officer you are not a threat and helps create a safe interaction.',
 'learning'),
(104, 
 'Complete this polite response: "Good afternoon, _______. Here are my documents."', 
 'fill_blank', 
 '["sir", "officer", "boss", "driver"]'::jsonb,
 'officer',
 'Always address law enforcement officers as "officer" to show respect and professionalism.',
 'learning'),
(104, 
 'An officer says: "Do you know why I pulled you over?" You were speeding but want to be honest. What''s the best response?', 
 'multiple_choice', 
 '["No, I have no idea why you stopped me.", "I think I might have been going a little fast, officer. I apologize.", "Everyone else was speeding too!", "This is unfair, I wasn''t doing anything wrong."]'::jsonb,
 'I think I might have been going a little fast, officer. I apologize.',
 'Being honest and apologetic while taking responsibility shows respect and may lead to more lenient treatment.',
 'learning'),

-- Module 105: Document Check Assessment
(105, 
 'What does CDL stand for?', 
 'multiple_choice', 
 '["Commercial Driver''s License", "Certified Driving License", "Commercial Delivery License", "Certified Driver''s License"]'::jsonb,
 'Commercial Driver''s License',
 'CDL stands for Commercial Driver''s License, which is required to operate commercial vehicles like trucks.',
 'learning'),
(105, 
 'An officer asks about your hours. You respond: "I use an _______ to track my driving hours automatically."', 
 'fill_blank', 
 '["ELD", "GPS", "CDL", "DOT"]'::jsonb,
 'ELD',
 'ELD stands for Electronic Logging Device, which automatically records driving hours and duty status.',
 'learning'),
(105, 
 'An officer finds that you only rested 8 hours instead of the required 10 hours. What should you say?', 
 'multiple_choice', 
 '["My dispatcher made me do it, it''s not my fault.", "I know this was wrong. I should have refused the dispatch. Safety rules are more important than company pressure.", "Everyone does this, it''s normal in trucking.", "I didn''t know about the 10-hour rule."]'::jsonb,
 'I know this was wrong. I should have refused the dispatch. Safety rules are more important than company pressure.',
 'Taking responsibility and acknowledging that safety rules come before company pressure shows maturity and understanding of regulations.',
 'learning'),

-- Module 106: Vehicle Inspection Assessment
(106, 
 'What does "out of service" mean for your vehicle?', 
 'multiple_choice', 
 '["You can drive slowly to a repair shop", "You cannot drive until repairs are made", "You can drive only during daytime", "You need to call your dispatcher first"]'::jsonb,
 'You cannot drive until repairs are made',
 'When a vehicle is placed "out of service," it cannot be driven at all until the safety violations are repaired and cleared.',
 'learning'),
(106, 
 'The officer says: "Turn on your _______, turn signals, brake lights, and hazard lights."', 
 'fill_blank', 
 '["headlights", "windshield", "mirrors", "engine"]'::jsonb,
 'headlights',
 'During vehicle inspections, officers check all lighting systems including headlights, turn signals, brake lights, and hazard lights.',
 'learning'),
(106, 
 'During inspection, the officer finds an air brake leak. You didn''t notice it before. What''s your best response?', 
 'multiple_choice', 
 '["That''s impossible, my brakes were fine this morning.", "I do hear it now. I thought that was normal air system noise. I need to learn more about air brake maintenance.", "My company mechanic said small leaks are okay.", "I''ll fix it when I get home."]'::jsonb,
 'I do hear it now. I thought that was normal air system noise. I need to learn more about air brake maintenance.',
 'Acknowledging the problem and showing willingness to learn about maintenance demonstrates responsibility and safety awareness.',
 'learning')
ON CONFLICT DO NOTHING;

-- Log final completion
DO $$
DECLARE
    total_modules INTEGER;
    bootcamp_modules INTEGER;
    learning_modules INTEGER;
    total_sections INTEGER;
    total_vocab INTEGER;
BEGIN
    SELECT COUNT(*) INTO total_modules FROM modules;
    SELECT COUNT(*) INTO bootcamp_modules FROM modules WHERE source = 'bootcamp';
    SELECT COUNT(*) INTO learning_modules FROM modules WHERE source = 'learning';
    SELECT COUNT(*) INTO total_sections FROM sections;
    SELECT COUNT(*) INTO total_vocab FROM vocabulary;
    
    RAISE NOTICE 'All seeding completed successfully!';
    RAISE NOTICE 'Total: % modules (% bootcamp, % learning), % sections, % vocabulary terms', 
                 total_modules, bootcamp_modules, learning_modules, total_sections, total_vocab;
END $$; 