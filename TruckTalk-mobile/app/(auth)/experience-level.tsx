import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Text, useTheme, Divider } from 'react-native-paper';
import { OnboardingScreen } from '../../components/onboarding/OnboardingScreen';

interface ExperienceLevel {
  id: string;
  title: string;
  description: string;
}

export default function ExperienceLevelScreen() {
  const router = useRouter();
  const theme = useTheme();
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const experienceLevels: ExperienceLevel[] = [
    {
      id: 'beginner',
      title: 'Beginner',
      description: 'Just starting to learn English or very limited knowledge',
    },
    {
      id: 'intermediate',
      title: 'Intermediate',
      description: 'Can understand basic conversations and express simple needs',
    },
    {
      id: 'advanced',
      title: 'Advanced',
      description: 'Comfortable with most conversations but want to improve specific trucking vocabulary',
    },
    {
      id: 'native',
      title: 'Native/Fluent',
      description: 'Looking for specialized industry terms and cultural nuances',
    },
  ];

  const handleContinue = () => {
    if (selectedLevel) {
      // In a real app, we would save these preferences and create a user account
      router.push('/(tabs)');
    }
  };

  const renderLevelItem = ({ item }: { item: ExperienceLevel }) => {
    const isSelected = selectedLevel === item.id;
    
    return (
      <TouchableOpacity
        style={[
          styles.levelItem,
          { 
            borderColor: isSelected ? theme.colors.primary : theme.colors.outline,
            backgroundColor: isSelected ? `${theme.colors.primary}10` : '#fff',
          }
        ]}
        onPress={() => setSelectedLevel(item.id)}
        activeOpacity={0.7}
      >
        <Text style={[styles.levelTitle, { color: theme.colors.onSurface }]}>
          {item.title}
        </Text>
        <Text style={[styles.levelDescription, { color: theme.colors.onSurfaceVariant }]}>
          {item.description}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <OnboardingScreen
      title="What's your English level?"
      description="This helps us adjust the difficulty of lessons and vocabulary"
      primaryButtonLabel="Start Learning"
      onPrimaryPress={handleContinue}
    >
      <FlatList
        data={experienceLevels}
        renderItem={renderLevelItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        style={styles.listContainer}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    width: '100%',
    marginTop: 16,
  },
  listContent: {
    paddingBottom: 8,
  },
  levelItem: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
  },
  levelTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  levelDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
});
