-- Add source column to distinguish between bootcamp and learning content
-- This migration adds a 'source' column to all curriculum tables

-- Add source column to modules table
ALTER TABLE modules 
ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'learning' CHECK (source IN ('bootcamp', 'learning'));

-- Add source column to sections table
ALTER TABLE sections 
ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'learning' CHECK (source IN ('bootcamp', 'learning'));

-- Add source column to vocabulary table
ALTER TABLE vocabulary 
ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'learning' CHECK (source IN ('bootcamp', 'learning'));

-- Add source column to dialogues table
ALTER TABLE dialogues 
ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'learning' CHECK (source IN ('bootcamp', 'learning'));

-- Add source column to exercises table
ALTER TABLE exercises 
ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'learning' CHECK (source IN ('bootcamp', 'learning'));

-- Add source column to quizzes table
ALTER TABLE quizzes 
ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'learning' CHECK (source IN ('bootcamp', 'learning'));

-- Add source column to practice_prompts table
ALTER TABLE practice_prompts 
ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'learning' CHECK (source IN ('bootcamp', 'learning'));

-- Update existing bootcamp data to have source = 'bootcamp'
-- Update modules (bootcamp modules have day_number 1-5)
UPDATE modules 
SET source = 'bootcamp' 
WHERE day_number BETWEEN 1 AND 5;

-- Update sections that belong to bootcamp modules
UPDATE sections 
SET source = 'bootcamp' 
WHERE module_id IN (SELECT id FROM modules WHERE source = 'bootcamp');

-- Update vocabulary that belongs to bootcamp sections
UPDATE vocabulary 
SET source = 'bootcamp' 
WHERE section_id IN (SELECT id FROM sections WHERE source = 'bootcamp');

-- Update dialogues that belong to bootcamp sections
UPDATE dialogues 
SET source = 'bootcamp' 
WHERE section_id IN (SELECT id FROM sections WHERE source = 'bootcamp');

-- Update exercises that belong to bootcamp sections
UPDATE exercises 
SET source = 'bootcamp' 
WHERE section_id IN (SELECT id FROM sections WHERE source = 'bootcamp');

-- Update quizzes that belong to bootcamp modules
UPDATE quizzes 
SET source = 'bootcamp' 
WHERE module_id IN (SELECT id FROM modules WHERE source = 'bootcamp');

-- Update practice_prompts that belong to bootcamp sections
UPDATE practice_prompts 
SET source = 'bootcamp' 
WHERE section_id IN (SELECT id FROM sections WHERE source = 'bootcamp');

-- Create indexes for efficient filtering by source
CREATE INDEX IF NOT EXISTS idx_modules_source ON modules(source);
CREATE INDEX IF NOT EXISTS idx_sections_source ON sections(source);
CREATE INDEX IF NOT EXISTS idx_vocabulary_source ON vocabulary(source);
CREATE INDEX IF NOT EXISTS idx_dialogues_source ON dialogues(source);
CREATE INDEX IF NOT EXISTS idx_exercises_source ON exercises(source);
CREATE INDEX IF NOT EXISTS idx_quizzes_source ON quizzes(source);
CREATE INDEX IF NOT EXISTS idx_practice_prompts_source ON practice_prompts(source);

-- Log the migration completion
DO $$
DECLARE
    bootcamp_modules_count INTEGER;
    learning_modules_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO bootcamp_modules_count FROM modules WHERE source = 'bootcamp';
    SELECT COUNT(*) INTO learning_modules_count FROM modules WHERE source = 'learning';
    
    RAISE NOTICE 'Source column migration completed successfully!';
    RAISE NOTICE 'Bootcamp modules: %, Learning modules: %', bootcamp_modules_count, learning_modules_count;
END $$; 