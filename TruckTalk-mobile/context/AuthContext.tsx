import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { AppLanguage } from '../types';

// Define types for our auth state
interface AuthState {
  session: Session | null;
  user: any;
  isLoading: boolean;
  error: string | null;
  onboardingComplete: boolean;
}

// Define types for our auth actions
type AuthAction =
  | { type: 'SET_SESSION'; payload: Session | null }
  | { type: 'SET_USER'; payload: any }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_ONBOARDING_COMPLETE'; payload: boolean };

// Define initial state
const initialState: AuthState = {
  session: null,
  user: null,
  isLoading: true,
  error: null,
  onboardingComplete: false,
};

// Create auth reducer
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'SET_SESSION':
      return { ...state, session: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_ONBOARDING_COMPLETE':
      return { ...state, onboardingComplete: action.payload };
    default:
      return state;
  }
}

// Define context interface
interface AuthContextType extends AuthState {
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<{ error: any }>;
  saveOnboardingData: (data: OnboardingData) => Promise<void>;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define onboarding data interface
interface OnboardingData {
  language: AppLanguage;
  learningGoal: string;
  experienceLevel: string;
}

// Provider component that wraps the app and makes auth available
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize auth by checking for existing session
  useEffect(() => {
    async function initializeAuth() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        dispatch({ type: 'SET_SESSION', payload: session });
        dispatch({ type: 'SET_USER', payload: session?.user ?? null });
        
        if (session?.user) {
          // Check if user has completed onboarding
          const { data, error } = await supabase
            .from('user_preferences')
            .select('*')
            .eq('user_id', session.user.id)
            .single();
            
          if (data) {
            dispatch({ type: 'SET_ONBOARDING_COMPLETE', payload: true });
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        dispatch({ type: 'SET_ERROR', payload: 'Failed to initialize authentication' });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    }

    initializeAuth();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        dispatch({ type: 'SET_SESSION', payload: session });
        dispatch({ type: 'SET_USER', payload: session?.user ?? null });
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    );

    // Cleanup subscription
    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  // Sign up function
  async function signUp(email: string, password: string) {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const { error } = await supabase.auth.signUp({ email, password });
      
      if (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
      }
      
      return { error };
    } catch (error: any) {
      console.error('Error signing up:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { error };
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }

  // Sign in function
  async function signIn(email: string, password: string) {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
      }
      
      return { error };
    } catch (error: any) {
      console.error('Error signing in:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { error };
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }

  // Sign out function
  async function signOut() {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
      }
      
      return { error };
    } catch (error: any) {
      console.error('Error signing out:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { error };
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }

  // Save onboarding data
  async function saveOnboardingData(data: OnboardingData) {
    if (!state.user) return;
    
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const { error } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: state.user.id,
          language: data.language,
          learning_goal: data.learningGoal,
          experience_level: data.experienceLevel,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
      
      if (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
        return;
      }
        
      dispatch({ type: 'SET_ONBOARDING_COMPLETE', payload: true });
    } catch (error: any) {
      console.error('Error saving onboarding data:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }

  // Provide auth context value
  const value = {
    ...state,
    signUp,
    signIn,
    signOut,
    saveOnboardingData,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for consuming the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}
