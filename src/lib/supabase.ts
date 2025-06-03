import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pvstwthufbertinmojuk.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2c3R3dGh1ZmJlcnRpbm1vanVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwOTI2NDQsImV4cCI6MjA2MjY2ODY0NH0.PG7BJeWuYe-piU_JatbBfauK-I3d9sVh-2fJypAZHS8"; //

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
