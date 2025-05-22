import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from 'react-native-paper';
import { OnboardingScreen } from '../../components/onboarding/OnboardingScreen';

export default function WelcomeScreen() {
  const router = useRouter();
  const theme = useTheme();

  // Using a null image reference until we have actual assets
  // This will prevent the bundling error
  const welcomeImage = null;

  // Multi-language greeting text (matches Figma design)
  const renderMultilingualGreeting = () => (
    <View style={styles.greetingContainer}>
      <Text style={[styles.greeting, { color: theme.colors.primary }]}>Hello</Text>
      <Text style={[styles.greeting, { color: theme.colors.primary }]}>Merhaba</Text>
      <Text style={[styles.greeting, { color: theme.colors.primary }]}>Салам</Text>
      <Text style={[styles.greeting, { color: theme.colors.primary }]}>Привет</Text>
    </View>
  );

  return (
    <OnboardingScreen
      title="Welcome to TruckTalk"
      description="Learn emergency English for truck drivers through interactive video scenarios"
      image={welcomeImage}
      primaryButtonLabel="Get Started"
      secondaryButtonLabel="Already have an account? Log in"
      onPrimaryPress={() => router.push('/(auth)/language')}
      onSecondaryPress={() => router.push('/(auth)/login')}
    >
      {renderMultilingualGreeting()}
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  greetingContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 4,
  },
});
