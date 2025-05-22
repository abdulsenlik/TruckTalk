import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Text, useTheme, Icon } from 'react-native-paper';
import { OnboardingScreen } from '../../components/onboarding/OnboardingScreen';

interface LearningGoal {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export default function LearningGoalScreen() {
  const router = useRouter();
  const theme = useTheme();
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const learningGoals: LearningGoal[] = [
    {
      id: 'border',
      title: 'Border Crossing',
      description: 'Learn phrases for smooth border checkpoint interactions',
      icon: 'map-marker-radius',
    },
    {
      id: 'emergency',
      title: 'Emergency Situations',
      description: 'Essential phrases for accidents, breakdowns, or medical needs',
      icon: 'alert-circle',
    },
    {
      id: 'loading',
      title: 'Loading/Unloading',
      description: 'Communication at delivery or pickup points',
      icon: 'truck-delivery',
    },
    {
      id: 'general',
      title: 'General Conversation',
      description: 'Everyday phrases for rest stops, gas stations, etc.',
      icon: 'forum',
    },
  ];

  const handleContinue = () => {
    if (selectedGoal) {
      // In a real app, we would store this preference
      router.push('/(auth)/experience-level');
    }
  };

  const renderGoalItem = ({ item }: { item: LearningGoal }) => {
    const isSelected = selectedGoal === item.id;
    
    return (
      <TouchableOpacity
        style={[
          styles.goalItem,
          { 
            borderColor: isSelected ? theme.colors.primary : theme.colors.outline,
            backgroundColor: isSelected ? `${theme.colors.primary}10` : '#fff',
          }
        ]}
        onPress={() => setSelectedGoal(item.id)}
        activeOpacity={0.7}
      >
        <View style={styles.goalContent}>
          <View style={[styles.iconContainer, { backgroundColor: isSelected ? theme.colors.primary : theme.colors.surfaceVariant }]}>
            <Icon 
              source={item.icon}
              color={isSelected ? '#fff' : theme.colors.onSurfaceVariant}
              size={24}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.goalTitle, { color: theme.colors.onSurface }]}>
              {item.title}
            </Text>
            <Text style={[styles.goalDescription, { color: theme.colors.onSurfaceVariant }]}>
              {item.description}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <OnboardingScreen
      title="What would you like to learn?"
      description="Select your primary learning goal to help us personalize your experience"
      primaryButtonLabel="Continue"
      onPrimaryPress={handleContinue}
    >
      <FlatList
        data={learningGoals}
        renderItem={renderGoalItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        style={styles.listContainer}
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
  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderRadius: 12,
  },
  goalContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  goalDescription: {
    fontSize: 14,
    opacity: 0.8,
  },
});
