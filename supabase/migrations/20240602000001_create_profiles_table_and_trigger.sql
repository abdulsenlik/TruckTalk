-- Create profiles table if it doesn't exist yet
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  username TEXT,
  progress JSONB DEFAULT '{}'::jsonb
);

-- Enable row level security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles table
-- Drop existing policies if they exist using DO block to handle errors
DO $$ 
BEGIN
  BEGIN
    DROP POLICY "Users can view their own profile" ON public.profiles;
  EXCEPTION WHEN undefined_object THEN
    -- Policy doesn't exist, so do nothing
  END;
  
  BEGIN
    DROP POLICY "Users can update their own profile" ON public.profiles;
  EXCEPTION WHEN undefined_object THEN
    -- Policy doesn't exist, so do nothing
  END;
  
  BEGIN
    DROP POLICY "Service role can manage all profiles" ON public.profiles;
  EXCEPTION WHEN undefined_object THEN
    -- Policy doesn't exist, so do nothing
  END;
END $$;

-- Create new policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Service role can manage all profiles"
  ON public.profiles FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role');

-- Create function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create profile when a user signs up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Add to realtime (only if not already added)
DO $
BEGIN
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;
  EXCEPTION WHEN duplicate_object THEN
    -- Table is already in the publication, so do nothing
  END;
END $;