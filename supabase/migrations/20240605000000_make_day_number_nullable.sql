-- Make day_number nullable for learning modules
-- Learning modules don't follow a daily structure like bootcamp modules

ALTER TABLE modules ALTER COLUMN day_number DROP NOT NULL;

-- Add a comment to clarify the usage
COMMENT ON COLUMN modules.day_number IS 'Day number for bootcamp modules (1-5). NULL for standalone learning modules.';

-- Log the change
DO $$
BEGIN
    RAISE NOTICE 'day_number column is now nullable to support learning modules';
END $$; 