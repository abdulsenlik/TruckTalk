-- Create subscriptions table to track user subscriptions
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  plan_id TEXT NOT NULL,
  status TEXT NOT NULL,
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  price_id TEXT,
  cancel_at_period_end BOOLEAN DEFAULT false,
  canceled_at TIMESTAMP WITH TIME ZONE,
  trial_start TIMESTAMP WITH TIME ZONE,
  trial_end TIMESTAMP WITH TIME ZONE
);

-- Enable row level security
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Users can view their own subscriptions" ON subscriptions;
CREATE POLICY "Users can view their own subscriptions"
  ON subscriptions FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Service role can manage all subscriptions" ON subscriptions;
CREATE POLICY "Service role can manage all subscriptions"
  ON subscriptions FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role');

-- Add to realtime
alter publication supabase_realtime add table subscriptions;

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
DROP POLICY IF EXISTS "Service role can manage subscription events" ON subscription_events;
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
