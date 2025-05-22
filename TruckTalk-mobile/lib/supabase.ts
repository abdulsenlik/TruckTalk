import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { AppLanguage } from '../types';

// Replace these with your own Supabase URL and anon key
const supabaseUrl = 'https://pvstwthufbertinmojuk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2c3R3dGh1ZmJlcnRpbm1vanVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwOTI2NDQsImV4cCI6MjA2MjY2ODY0NH0.PG7BJeWuYe-piU_JatbBfauK-I3d9sVh-2fJypAZHS8';

// Create a custom storage adapter for AsyncStorage
const AsyncStorageAdapter = {
  getItem: (key: string) => AsyncStorage.getItem(key),
  setItem: (key: string, value: string) => AsyncStorage.setItem(key, value),
  removeItem: (key: string) => AsyncStorage.removeItem(key),
};

// Create the Supabase client
// The native WebSocket implementation is used automatically in React Native
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorageAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
  // Disable realtime subscriptions for now to avoid WebSocket issues
  // Enable this later if you need realtime features
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

// Auth helper functions
export async function signUp(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error signing up:', error);
    return { data: null, error };
  }
}

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error signing in:', error);
    return { data: null, error };
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error signing out:', error);
    return { error };
  }
}

export async function resetPassword(email: string) {
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error resetting password:', error);
    return { data: null, error };
  }
}

// User preferences functions
export async function saveUserPreferences(userId: string, preferences: {
  language: AppLanguage;
  learningGoal: string;
  experienceLevel: string;
}) {
  try {
    const { data, error } = await supabase
      .from('user_preferences')
      .upsert(
        { 
          user_id: userId,
          ...preferences,
          updated_at: new Date().toISOString()
        },
        { onConflict: 'user_id' }
      );
    
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error saving user preferences:', error);
    return { data: null, error };
  }
}

export async function getUserPreferences(userId: string) {
  try {
    const { data, error } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching user preferences:', error);
    return { data: null, error };
  }
}

// Learning progress functions
export async function saveModuleProgress(userId: string, moduleId: string, progress: {
  completion_percentage: number;
  last_accessed: string;
}) {
  try {
    const { data, error } = await supabase
      .from('module_progress')
      .upsert(
        { 
          user_id: userId,
          module_id: moduleId,
          ...progress,
          updated_at: new Date().toISOString()
        },
        { onConflict: 'user_id, module_id' }
      );
    
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error saving module progress:', error);
    return { data: null, error };
  }
}

export async function getUserModuleProgress(userId: string) {
  try {
    const { data, error } = await supabase
      .from('module_progress')
      .select('*')
      .eq('user_id', userId);
    
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching user module progress:', error);
    return { data: null, error };
  }
}

// Streak tracking functions
export async function updateUserStreak(userId: string) {
  try {
    // First get the current streak
    const { data: currentStreak, error: fetchError } = await supabase
      .from('user_streaks')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (fetchError && fetchError.code !== 'PGRST116') throw fetchError;
    
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    
    let streakData = {
      user_id: userId,
      current_streak: 1,
      longest_streak: 1,
      last_activity_date: today
    };
    
    if (currentStreak) {
      const lastActivityDate = new Date(currentStreak.last_activity_date);
      const dayDifference = Math.floor((now.getTime() - lastActivityDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (dayDifference === 0) {
        // Already logged today, no change
        return { data: currentStreak, error: null };
      } else if (dayDifference === 1) {
        // Consecutive day, increase streak
        streakData = {
          ...streakData,
          current_streak: currentStreak.current_streak + 1,
          longest_streak: Math.max(currentStreak.longest_streak, currentStreak.current_streak + 1)
        };
      } else {
        // Streak broken, reset to 1 but keep longest
        streakData = {
          ...streakData,
          longest_streak: currentStreak.longest_streak
        };
      }
    }
    
    const { data, error } = await supabase
      .from('user_streaks')
      .upsert(streakData, { onConflict: 'user_id' });
    
    if (error) throw error;
    return { data: streakData, error: null };
  } catch (error) {
    console.error('Error updating user streak:', error);
    return { data: null, error };
  }
}
