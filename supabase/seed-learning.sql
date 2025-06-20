-- Seed data for learning modules
-- This file populates the database with standalone learning modules

-- Insert learning modules (IDs 101-103 to avoid conflicts with bootcamp modules 1-5)
INSERT INTO modules (id, day_number, title, description, source) VALUES
(101, NULL, 'Traffic Stop Fundamentals', 'Master essential communication skills for traffic stops and document checks', 'learning'),
(102, NULL, 'Vehicle Inspection Communication', 'Learn how to communicate effectively during roadside vehicle inspections', 'learning'),
(103, NULL, 'Professional Communication Skills', 'Develop professional communication skills for various trucking scenarios', 'learning')
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

-- Insert sections for Learning Module 102: Vehicle Inspection Communication
INSERT INTO sections (module_id, type, title, "order", duration, description, source) VALUES
(102, 'video', 'Inspection Types Overview', 1, 10, 'Understanding different types of vehicle inspections', 'learning'),
(102, 'vocabulary', 'Vehicle Inspection Vocabulary', 2, 20, 'Key terms for vehicle inspections and safety checks', 'learning'),
(102, 'dialogue', 'Inspection Dialogue Practice', 3, 25, 'Practice conversations during vehicle inspections', 'learning'),
(102, 'practice', 'Inspection Scenarios', 4, 15, 'Practice responding to various inspection situations', 'learning'),
(102, 'quiz', 'Vehicle Inspection Quiz', 5, 5, 'Test your knowledge of vehicle inspection procedures', 'learning')
ON CONFLICT DO NOTHING;

-- Insert sections for Learning Module 103: Professional Communication Skills
INSERT INTO sections (module_id, type, title, "order", duration, description, source) VALUES
(103, 'vocabulary', 'Professional Greetings', 1, 15, 'Learn appropriate greetings and polite expressions', 'learning'),
(103, 'dialogue', 'Professional Dialogue Practice', 2, 25, 'Practice professional conversations in various situations', 'learning'),
(103, 'quiz', 'Communication Skills Quiz', 3, 20, 'Test your professional communication knowledge', 'learning')
ON CONFLICT DO NOTHING;

-- Insert vocabulary for Traffic Stop Fundamentals
INSERT INTO vocabulary (section_id, term, translation, audio_url, source) VALUES
((SELECT id FROM sections WHERE title = 'Essential Traffic Stop Vocabulary' AND module_id = 101), 'License', 'Licencia', 'https://example.com/audio/license.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Essential Traffic Stop Vocabulary' AND module_id = 101), 'Registration', 'Registro', 'https://example.com/audio/registration.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Essential Traffic Stop Vocabulary' AND module_id = 101), 'Insurance', 'Seguro', 'https://example.com/audio/insurance.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Essential Traffic Stop Vocabulary' AND module_id = 101), 'Officer', 'Oficial', 'https://example.com/audio/officer.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Essential Traffic Stop Vocabulary' AND module_id = 101), 'Pull over', 'Orillarse', 'https://example.com/audio/pull-over.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Essential Traffic Stop Vocabulary' AND module_id = 101), 'Speed limit', 'Límite de velocidad', 'https://example.com/audio/speed-limit.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Essential Traffic Stop Vocabulary' AND module_id = 101), 'Speeding', 'Exceso de velocidad', 'https://example.com/audio/speeding.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Essential Traffic Stop Vocabulary' AND module_id = 101), 'Documents', 'Documentos', 'https://example.com/audio/documents.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Essential Traffic Stop Vocabulary' AND module_id = 101), 'Hands visible', 'Manos visibles', 'https://example.com/audio/hands-visible.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Essential Traffic Stop Vocabulary' AND module_id = 101), 'Steering wheel', 'Volante', 'https://example.com/audio/steering-wheel.mp3', 'learning')
ON CONFLICT DO NOTHING;

-- Insert vocabulary for Vehicle Inspection Communication
INSERT INTO vocabulary (section_id, term, translation, audio_url, source) VALUES
((SELECT id FROM sections WHERE title = 'Vehicle Inspection Vocabulary' AND module_id = 102), 'Inspection', 'Inspección', 'https://example.com/audio/inspection.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Vehicle Inspection Vocabulary' AND module_id = 102), 'Brake', 'Freno', 'https://example.com/audio/brake.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Vehicle Inspection Vocabulary' AND module_id = 102), 'Lights', 'Luces', 'https://example.com/audio/lights.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Vehicle Inspection Vocabulary' AND module_id = 102), 'Tire', 'Llanta', 'https://example.com/audio/tire.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Vehicle Inspection Vocabulary' AND module_id = 102), 'Engine', 'Motor', 'https://example.com/audio/engine.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Vehicle Inspection Vocabulary' AND module_id = 102), 'Hood', 'Capó', 'https://example.com/audio/hood.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Vehicle Inspection Vocabulary' AND module_id = 102), 'Out of service', 'Fuera de servicio', 'https://example.com/audio/out-of-service.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Vehicle Inspection Vocabulary' AND module_id = 102), 'Safety violation', 'Violación de seguridad', 'https://example.com/audio/safety-violation.mp3', 'learning')
ON CONFLICT DO NOTHING;

-- Insert vocabulary for Professional Communication Skills
INSERT INTO vocabulary (section_id, term, translation, audio_url, source) VALUES
((SELECT id FROM sections WHERE title = 'Professional Greetings' AND module_id = 103), 'Good morning', 'Buenos días', 'https://example.com/audio/good-morning.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Professional Greetings' AND module_id = 103), 'Good afternoon', 'Buenas tardes', 'https://example.com/audio/good-afternoon.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Professional Greetings' AND module_id = 103), 'Good evening', 'Buenas noches', 'https://example.com/audio/good-evening.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Professional Greetings' AND module_id = 103), 'Thank you', 'Gracias', 'https://example.com/audio/thank-you.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Professional Greetings' AND module_id = 103), 'Please', 'Por favor', 'https://example.com/audio/please.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Professional Greetings' AND module_id = 103), 'Excuse me', 'Disculpe', 'https://example.com/audio/excuse-me.mp3', 'learning'),
((SELECT id FROM sections WHERE title = 'Professional Greetings' AND module_id = 103), 'I apologize', 'Me disculpo', 'https://example.com/audio/apologize.mp3', 'learning')
ON CONFLICT DO NOTHING;

-- Insert dialogues for learning modules
INSERT INTO dialogues (section_id, title, lines, audio_url, source) VALUES
((SELECT id FROM sections WHERE title = 'Basic Traffic Stop Dialogue' AND module_id = 101), 
 'Routine Traffic Stop', 
 '[
   {"speaker": "Officer", "text": "Good afternoon. I need to see your license, registration, and insurance please.", "audioUrl": "https://example.com/audio/officer-request.mp3"},
   {"speaker": "Driver", "text": "Good afternoon, officer. Yes, of course. My hands are on the steering wheel. May I reach for my documents?", "audioUrl": "https://example.com/audio/driver-response.mp3"},
   {"speaker": "Officer", "text": "Yes, go ahead slowly. Take your time.", "audioUrl": "https://example.com/audio/officer-permission.mp3"},
   {"speaker": "Driver", "text": "Thank you, officer. Here is my CDL, insurance card, and registration.", "audioUrl": "https://example.com/audio/driver-documents.mp3"},
   {"speaker": "Officer", "text": "Do you know why I pulled you over today?", "audioUrl": "https://example.com/audio/officer-question.mp3"},
   {"speaker": "Driver", "text": "I think I might have been going a little fast, officer. I apologize.", "audioUrl": "https://example.com/audio/driver-apology.mp3"}
 ]'::jsonb,
 'https://example.com/audio/traffic-stop-dialogue.mp3',
 'learning'),
((SELECT id FROM sections WHERE title = 'Inspection Dialogue Practice' AND module_id = 102), 
 'Level 2 Roadside Inspection', 
 '[
   {"speaker": "Officer", "text": "I''m going to conduct a Level 2 roadside inspection. Please step out and bring your documents.", "audioUrl": "https://example.com/audio/inspection-start.mp3"},
   {"speaker": "Driver", "text": "Yes, officer. Is there a problem? I did my pre-trip inspection this morning.", "audioUrl": "https://example.com/audio/driver-concern.mp3"},
   {"speaker": "Officer", "text": "This is routine. Please pop the hood so I can inspect the engine compartment.", "audioUrl": "https://example.com/audio/hood-request.mp3"},
   {"speaker": "Driver", "text": "Of course, officer. The hood release is right here. I had the truck serviced last week.", "audioUrl": "https://example.com/audio/hood-compliance.mp3"},
   {"speaker": "Officer", "text": "Now turn on all your lights - headlights, turn signals, brake lights, and hazards.", "audioUrl": "https://example.com/audio/lights-request.mp3"},
   {"speaker": "Driver", "text": "Yes, sir. Headlights on, testing turn signals... left, right... and hazard lights.", "audioUrl": "https://example.com/audio/lights-compliance.mp3"}
 ]'::jsonb,
 'https://example.com/audio/inspection-dialogue.mp3',
 'learning'),
((SELECT id FROM sections WHERE title = 'Professional Dialogue Practice' AND module_id = 103), 
 'Professional Interaction', 
 '[
   {"speaker": "Officer", "text": "Good afternoon. What is the purpose of your trip today?", "audioUrl": "https://example.com/audio/purpose-question.mp3"},
   {"speaker": "Driver", "text": "Good afternoon, officer. I am delivering cargo to a warehouse in the next city.", "audioUrl": "https://example.com/audio/purpose-response.mp3"},
   {"speaker": "Officer", "text": "What type of cargo are you carrying?", "audioUrl": "https://example.com/audio/cargo-question.mp3"},
   {"speaker": "Driver", "text": "I have automotive parts for a factory, officer. I have the bill of lading here if you need to see it.", "audioUrl": "https://example.com/audio/cargo-response.mp3"}
 ]'::jsonb,
 'https://example.com/audio/professional-dialogue.mp3',
 'learning')
ON CONFLICT DO NOTHING;

-- Insert practice prompts for learning modules
INSERT INTO practice_prompts (section_id, scenario, officer_prompt, expected_response, tip, audio_url, source) VALUES
((SELECT id FROM sections WHERE title = 'Traffic Stop Practice Scenarios' AND module_id = 101), 
 'Routine Speeding Stop', 
 'Good afternoon. I pulled you over because you were going 70 in a 55 mph zone. License and registration, please.',
 'Good afternoon, officer. I apologize for speeding. Here are my license and registration.',
 'Always remain calm, acknowledge the violation, and provide documents promptly.',
 'https://example.com/audio/practice-speeding.mp3',
 'learning'),
((SELECT id FROM sections WHERE title = 'Traffic Stop Practice Scenarios' AND module_id = 101), 
 'Document Request', 
 'I need to see your commercial driver''s license, vehicle registration, and insurance card.',
 'Yes, officer. Here is my CDL, registration, and insurance card.',
 'Have your documents organized and easily accessible before driving.',
 'https://example.com/audio/practice-documents.mp3',
 'learning'),
((SELECT id FROM sections WHERE title = 'Inspection Scenarios' AND module_id = 102), 
 'Routine Inspection', 
 'This is a routine Level 2 inspection. Please step out and bring your documents.',
 'Yes, officer. Here are my documents. Is there anything specific you need me to do?',
 'Stay calm, cooperate fully, and ask for clarification if needed.',
 'https://example.com/audio/practice-inspection.mp3',
 'learning'),
((SELECT id FROM sections WHERE title = 'Inspection Scenarios' AND module_id = 102), 
 'Safety Violation Found', 
 'I found an air brake leak. This vehicle is out of service until repairs are made.',
 'I understand, officer. I''ll call for roadside service immediately. Thank you for catching this safety issue.',
 'Accept responsibility and prioritize safety over schedule.',
 'https://example.com/audio/practice-violation.mp3',
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
 'learning'),
(101, 
 'How should you address a police officer?', 
 'multiple_choice', 
 '["Hey", "Officer", "Sir/Ma''am", "Both Officer and Sir/Ma''am"]'::jsonb,
 'Both Officer and Sir/Ma''am',
 'Using ''Officer'' or ''Sir/Ma''am'' shows respect and professionalism.',
 'learning'),
(102, 
 'What does ''out of service'' mean?', 
 'multiple_choice', 
 '["Drive slowly to repair shop", "Cannot drive until repaired", "Drive only during day", "Call dispatcher first"]'::jsonb,
 'Cannot drive until repaired',
 'Out of service means the vehicle cannot be operated until safety violations are fixed.',
 'learning'),
(103, 
 'What is the appropriate greeting for an officer in the afternoon?', 
 'multiple_choice', 
 '["Good morning, officer", "Good afternoon, officer", "Hey there", "What''s up"]'::jsonb,
 'Good afternoon, officer',
 'Use time-appropriate greetings with ''officer'' to show respect.',
 'learning')
ON CONFLICT DO NOTHING;

-- Insert exercises for learning modules
INSERT INTO exercises (section_id, question, type, options, correct_answer, explanation, source) VALUES
((SELECT id FROM sections WHERE title = 'Essential Traffic Stop Vocabulary' AND module_id = 101), 
 'Complete the sentence: "Here is my ______ and registration, officer."', 
 'fill_blank', 
 '["license", "licencia"]'::jsonb,
 'license',
 'When speaking to an officer, you should present your license and registration documents.',
 'learning'),
((SELECT id FROM sections WHERE title = 'Vehicle Inspection Vocabulary' AND module_id = 102), 
 'What does the officer mean when they say "pop the hood"?', 
 'multiple_choice', 
 '["Turn on headlights", "Open the hood", "Start the engine", "Check the tires"]'::jsonb,
 'Open the hood',
 '''Pop the hood'' means to open the hood of the truck for engine inspection.',
 'learning'),
((SELECT id FROM sections WHERE title = 'Professional Greetings' AND module_id = 103), 
 'What is the Spanish translation for "Good afternoon"?', 
 'multiple_choice', 
 '["Buenos días", "Buenas tardes", "Buenas noches", "Hola"]'::jsonb,
 'Buenas tardes',
 '''Buenas tardes'' is the correct Spanish greeting for afternoon hours.',
 'learning')
ON CONFLICT DO NOTHING;

-- Log completion
DO $$
DECLARE
    learning_modules_count INTEGER;
    learning_sections_count INTEGER;
    learning_vocab_count INTEGER;
    learning_dialogue_count INTEGER;
    learning_quiz_count INTEGER;
    learning_exercise_count INTEGER;
    learning_practice_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO learning_modules_count FROM modules WHERE source = 'learning';
    SELECT COUNT(*) INTO learning_sections_count FROM sections WHERE source = 'learning';
    SELECT COUNT(*) INTO learning_vocab_count FROM vocabulary WHERE source = 'learning';
    SELECT COUNT(*) INTO learning_dialogue_count FROM dialogues WHERE source = 'learning';
    SELECT COUNT(*) INTO learning_quiz_count FROM quizzes WHERE source = 'learning';
    SELECT COUNT(*) INTO learning_exercise_count FROM exercises WHERE source = 'learning';
    SELECT COUNT(*) INTO learning_practice_count FROM practice_prompts WHERE source = 'learning';
    
    RAISE NOTICE 'Learning modules seeding completed successfully!';
    RAISE NOTICE 'Inserted: % learning modules, % sections, % vocabulary terms, % dialogues, % quizzes, % exercises, % practice prompts', 
                 learning_modules_count, learning_sections_count, learning_vocab_count, learning_dialogue_count, learning_quiz_count, learning_exercise_count, learning_practice_count;
END $$; 