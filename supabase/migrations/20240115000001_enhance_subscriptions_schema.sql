-- Add subscription_tier to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'pro', 'premium'));

-- Add more fields to subscriptions table for better tracking
ALTER TABLE subscriptions 
ADD COLUMN IF NOT EXISTS price_id TEXT,
ADD COLUMN IF NOT EXISTS cancel_at_period_end BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS canceled_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS trial_start TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS trial_end TIMESTAMP WITH TIME ZONE;

-- Create subscription_events table for audit trail
CREATE TABLE IF NOT EXISTS subscription_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subscription_id UUID REFERENCES subscriptions(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  stripe_event_id TEXT UNIQUE,
  data JSONB,
  processed_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on subscription_events
ALTER TABLE subscription_events ENABLE ROW LEVEL SECURITY;

-- Create policy for subscription_events
DROP POLICY IF EXISTS "Service role can manage subscription events";
CREATE POLICY "Service role can manage subscription events"
  ON subscription_events FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role');

-- Add to realtime
alter publication supabase_realtime add table subscription_events;

-- Create function to update subscription tier in profiles
CREATE OR REPLACE FUNCTION update_profile_subscription_tier()
RETURNS TRIGGER AS $$
BEGIN
  -- Update the subscription tier in profiles table based on subscription status
  UPDATE public.profiles 
  SET subscription_tier = CASE 
    WHEN NEW.status = 'active' THEN 
      CASE NEW.plan_id
        WHEN 'pro' THEN 'pro'
        WHEN 'premium' THEN 'premium'
        ELSE 'free'
      END
    ELSE 'free'
  END
  WHERE id = NEW.user_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically update profile subscription tier
DROP TRIGGER IF EXISTS update_profile_tier_on_subscription_change ON subscriptions;
CREATE TRIGGER update_profile_tier_on_subscription_change
  AFTER INSERT OR UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_profile_subscription_tier();
