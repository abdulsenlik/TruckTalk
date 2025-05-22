import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { OnboardingScreen } from '../../components/onboarding/OnboardingScreen';
import { LanguageSelector } from '../../components/onboarding/LanguageSelector';
import { AppLanguage } from '../../types';

export default function LanguageScreen() {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState<AppLanguage>('en');

  const handleContinue = () => {
    // In a real app, we would store this preference
    router.push('/(auth)/learning-goal');
  };

  return (
    <OnboardingScreen
      title="Choose Your Language"
      description="Select the language you're most comfortable with. All instructions and translations will be provided in this language."
      primaryButtonLabel="Continue"
      onPrimaryPress={handleContinue}
    >
      <LanguageSelector
        selectedLanguage={selectedLanguage}
        onSelectLanguage={setSelectedLanguage}
      />
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({});
