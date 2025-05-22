import React, { useEffect, useMemo } from 'react';
import { Slot, Stack, useRouter, useSegments } from 'expo-router';
import { PaperProvider, adaptNavigationTheme } from 'react-native-paper';
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import { AuthProvider, useAuth } from '../context/AuthContext';
import * as SplashScreen from 'expo-splash-screen';

// Keep the splash screen visible until we're ready to render
SplashScreen.preventAutoHideAsync();

// Root layout with auth provider
export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNavigation />
    </AuthProvider>
  );
}

// Inner component that handles navigation based on auth state
function RootLayoutNavigation() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const segments = useSegments();
  const { isLoading, session, onboardingComplete } = useAuth();
  
  // Setup themes
  const { LightTheme, DarkTheme } = useMemo(() => {
    const { LightTheme, DarkTheme } = adaptNavigationTheme({
      reactNavigationLight: NavigationDefaultTheme,
      reactNavigationDark: NavigationDarkTheme,
    });
    
    // Define custom fonts with proper variants
    const customFonts = {
      regular: {
        fontFamily: 'sans-serif',
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: 'sans-serif-medium',
        fontWeight: '500',
      },
      bold: {
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
      },
      heavy: {
        fontFamily: 'sans-serif',
        fontWeight: '900',
      },
    };
    
    return {
      LightTheme: {
        ...LightTheme,
        colors: {
          ...LightTheme.colors,
          primary: '#FF5722', // Truck orange color
          background: '#f7f7f7',
        },
        fonts: {
          ...LightTheme.fonts,
          // Add custom fonts with proper variants
          labelLarge: customFonts.medium,
          labelMedium: customFonts.regular,
          labelSmall: customFonts.regular,
          bodyLarge: customFonts.regular,
          bodyMedium: customFonts.regular,
          bodySmall: customFonts.regular,
          titleLarge: customFonts.bold,
          titleMedium: customFonts.bold,
          titleSmall: customFonts.medium,
          headlineLarge: customFonts.bold,
          headlineMedium: customFonts.bold,
          headlineSmall: customFonts.bold,
        },
      },
      DarkTheme: {
        ...DarkTheme,
        colors: {
          ...DarkTheme.colors,
          primary: '#FF7043', // Slightly lighter orange for dark mode
          background: '#121212',
        },
        fonts: {
          ...DarkTheme.fonts,
          // Add custom fonts with proper variants
          labelLarge: customFonts.medium,
          labelMedium: customFonts.regular,
          labelSmall: customFonts.regular,
          bodyLarge: customFonts.regular,
          bodyMedium: customFonts.regular,
          bodySmall: customFonts.regular,
          titleLarge: customFonts.bold,
          titleMedium: customFonts.bold,
          titleSmall: customFonts.medium,
          headlineLarge: customFonts.bold,
          headlineMedium: customFonts.bold,
          headlineSmall: customFonts.bold,
        },
      },
    };
  }, []);
  
  const theme = colorScheme === 'dark' ? DarkTheme : LightTheme;

  // Handle auth-dependent navigation
  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';
    const inTabsGroup = segments[0] === '(tabs)';

    // Hide splash screen once we're ready to navigate
    SplashScreen.hideAsync();

    if (!session && !inAuthGroup) {
      // If not authenticated, redirect to auth
      router.replace('/(auth)/welcome');
    } else if (session) {
      if (inAuthGroup) {
        // If authenticated but still in auth group
        if (!onboardingComplete && !segments.includes('experience-level')) {
          // If onboarding not complete, ensure we're in onboarding flow
          router.replace('/(auth)/language');
        } else if (onboardingComplete) {
          // If onboarding is done, go to main app
          router.replace('/(tabs)');
        }
      } else if (!onboardingComplete && !inAuthGroup) {
        // If authenticated but onboarding not complete and not in auth group
        router.replace('/(auth)/language');
      }
    }
  }, [isLoading, session, segments, onboardingComplete]);

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <Slot />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
