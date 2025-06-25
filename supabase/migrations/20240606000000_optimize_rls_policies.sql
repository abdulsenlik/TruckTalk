-- Optimize RLS Policies for Performance
-- This migration fixes auth function re-evaluation and consolidates overlapping policies

-- ===================================================================
-- PROFILES TABLE OPTIMIZATION
-- ===================================================================

-- Drop existing policies for profiles
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Service role can manage all profiles" ON public.profiles;

-- Create optimized consolidated policies for profiles
-- Combined policy for SELECT operations (users can view their own profile OR service role can view all)
CREATE POLICY "profiles_select_policy"
  ON public.profiles FOR SELECT
  USING (
    (SELECT auth.uid()) = id 
    OR 
    (SELECT auth.jwt() ->> 'role') = 'service_role'
  );

-- Combined policy for UPDATE operations (users can update their own profile OR service role can update all)
CREATE POLICY "profiles_update_policy"
  ON public.profiles FOR UPDATE
  USING (
    (SELECT auth.uid()) = id 
    OR 
    (SELECT auth.jwt() ->> 'role') = 'service_role'
  );

-- Policy for INSERT operations (only service role can insert)
CREATE POLICY "profiles_insert_policy"
  ON public.profiles FOR INSERT
  WITH CHECK (
    (SELECT auth.jwt() ->> 'role') = 'service_role'
  );

-- Policy for DELETE operations (only service role can delete)
CREATE POLICY "profiles_delete_policy"
  ON public.profiles FOR DELETE
  USING (
    (SELECT auth.jwt() ->> 'role') = 'service_role'
  );

-- ===================================================================
-- SUBSCRIPTIONS TABLE OPTIMIZATION
-- ===================================================================

-- Drop existing policies for subscriptions
DROP POLICY IF EXISTS "Users can view their own subscriptions" ON subscriptions;
DROP POLICY IF EXISTS "Service role can manage all subscriptions" ON subscriptions;

-- Create optimized consolidated policies for subscriptions
-- Combined policy for SELECT operations (users can view their own subscriptions OR service role can view all)
CREATE POLICY "subscriptions_select_policy"
  ON subscriptions FOR SELECT
  USING (
    (SELECT auth.uid()) = user_id 
    OR 
    (SELECT auth.jwt() ->> 'role') = 'service_role'
  );

-- Policy for INSERT operations (only service role can insert)
CREATE POLICY "subscriptions_insert_policy"
  ON subscriptions FOR INSERT
  WITH CHECK (
    (SELECT auth.jwt() ->> 'role') = 'service_role'
  );

-- Policy for UPDATE operations (only service role can update)
CREATE POLICY "subscriptions_update_policy"
  ON subscriptions FOR UPDATE
  USING (
    (SELECT auth.jwt() ->> 'role') = 'service_role'
  );

-- Policy for DELETE operations (only service role can delete)
CREATE POLICY "subscriptions_delete_policy"
  ON subscriptions FOR DELETE
  USING (
    (SELECT auth.jwt() ->> 'role') = 'service_role'
  );

-- ===================================================================
-- SUBSCRIPTION_EVENTS TABLE OPTIMIZATION
-- ===================================================================

-- Drop existing policies for subscription_events
DROP POLICY IF EXISTS "Service role can manage subscription events" ON subscription_events;

-- Create optimized policy for subscription_events (only service role can access)
CREATE POLICY "subscription_events_all_policy"
  ON subscription_events FOR ALL
  USING (
    (SELECT auth.jwt() ->> 'role') = 'service_role'
  );

-- ===================================================================
-- ADD MISSING INDEXES FOR FOREIGN KEYS
-- ===================================================================

-- Add indexes for foreign keys to improve performance
CREATE INDEX IF NOT EXISTS idx_dialogues_section_id ON dialogues(section_id);
CREATE INDEX IF NOT EXISTS idx_exercises_section_id ON exercises(section_id);
CREATE INDEX IF NOT EXISTS idx_practice_prompts_section_id ON practice_prompts(section_id);
CREATE INDEX IF NOT EXISTS idx_quizzes_module_id ON quizzes(module_id);
CREATE INDEX IF NOT EXISTS idx_sections_module_id ON sections(module_id);
CREATE INDEX IF NOT EXISTS idx_subscription_events_subscription_id ON subscription_events(subscription_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_vocabulary_section_id ON vocabulary(section_id);

-- ===================================================================
-- REMOVE UNUSED INDEXES
-- ===================================================================

-- Drop unused indexes that are not being utilized
DROP INDEX IF EXISTS idx_sections_source;
DROP INDEX IF EXISTS idx_vocabulary_source;
DROP INDEX IF EXISTS idx_dialogues_source;
DROP INDEX IF EXISTS idx_exercises_source;
DROP INDEX IF EXISTS idx_quizzes_source;
DROP INDEX IF EXISTS idx_practice_prompts_source; 