import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Card, useTheme, Button } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function ProgressScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const renderProgressSection = () => (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.cardTitle}>Your Learning Progress</Text>
        
        <View style={styles.statContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>4</Text>
            <Text style={styles.statLabel}>Modules Started</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Lessons Completed</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>28%</Text>
            <Text style={styles.statLabel}>Course Completion</Text>
          </View>
        </View>
        
        <Text style={styles.sectionTitle}>Current Streak</Text>
        <View style={styles.streakContainer}>
          <View style={[styles.streakDay, { backgroundColor: theme.colors.primary }]}>
            <Text style={styles.streakDayText}>M</Text>
          </View>
          <View style={[styles.streakDay, { backgroundColor: theme.colors.primary }]}>
            <Text style={styles.streakDayText}>T</Text>
          </View>
          <View style={styles.streakDay}>
            <Text style={[styles.streakDayText, { color: theme.colors.outline }]}>W</Text>
          </View>
          <View style={styles.streakDay}>
            <Text style={[styles.streakDayText, { color: theme.colors.outline }]}>T</Text>
          </View>
          <View style={styles.streakDay}>
            <Text style={[styles.streakDayText, { color: theme.colors.outline }]}>F</Text>
          </View>
          <View style={styles.streakDay}>
            <Text style={[styles.streakDayText, { color: theme.colors.outline }]}>S</Text>
          </View>
          <View style={styles.streakDay}>
            <Text style={[styles.streakDayText, { color: theme.colors.outline }]}>S</Text>
          </View>
        </View>
        <Text style={styles.streakText}>You're on a 2-day streak! Keep it up!</Text>
      </Card.Content>
    </Card>
  );

  const renderBadgesSection = () => (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.cardTitle}>Earned Badges</Text>
        <View style={styles.badgesContainer}>
          <View style={styles.badgeItem}>
            <View style={[styles.badge, { backgroundColor: theme.colors.primary }]}>
              <Text style={styles.badgeIcon}>🚀</Text>
            </View>
            <Text style={styles.badgeLabel}>First Lesson</Text>
          </View>
          <View style={styles.badgeItem}>
            <View style={[styles.badge, { backgroundColor: theme.colors.primary }]}>
              <Text style={styles.badgeIcon}>🔄</Text>
            </View>
            <Text style={styles.badgeLabel}>3-Day Streak</Text>
          </View>
          <View style={styles.badgeItem}>
            <View style={[styles.badge, { backgroundColor: theme.colors.primary }]}>
              <Text style={styles.badgeIcon}>🎯</Text>
            </View>
            <Text style={styles.badgeLabel}>Perfect Score</Text>
          </View>
          <View style={styles.badgeItem}>
            <View style={[styles.badge, { backgroundColor: theme.colors.surfaceVariant }]}>
              <Text style={styles.badgeIcon}>🗣️</Text>
            </View>
            <Text style={styles.badgeLabel}>Voice Master</Text>
          </View>
        </View>
        
        <Button 
          mode="outlined" 
          style={styles.seeAllButton}
          onPress={() => {}}
        >
          See All Badges
        </Button>
      </Card.Content>
    </Card>
  );

  const renderRecommendationsSection = () => (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.cardTitle}>Recommended Next Steps</Text>
        <View style={styles.recommendationItem}>
          <Text style={styles.recommendationTitle}>Complete "Border Crossing" Module</Text>
          <Text style={styles.recommendationDescription}>
            You're 70% through this module. Finish it to earn the Border Expert badge!
          </Text>
          <View style={[styles.progressBar, { backgroundColor: theme.colors.surfaceVariant }]}>
            <View 
              style={[
                styles.progressFill, 
                { width: '70%', backgroundColor: theme.colors.primary }
              ]} 
            />
          </View>
        </View>
        
        <View style={styles.recommendationItem}>
          <Text style={styles.recommendationTitle}>Practice Emergency Phrases</Text>
          <Text style={styles.recommendationDescription}>
            Your accuracy on emergency phrases is 65%. Practice these to improve your score.
          </Text>
          <Button 
            mode="contained" 
            style={styles.practiceButton}
            onPress={() => {}}
          >
            Practice Now
          </Button>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Progress</Text>
        <Text style={styles.headerSubtitle}>Track your learning journey</Text>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        {renderProgressSection()}
        {renderBadgesSection()}
        {renderRecommendationsSection()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 16,
    opacity: 0.7,
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  statContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.7,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  streakContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  streakDay: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  streakDayText: {
    fontWeight: '600',
    color: '#fff',
  },
  streakText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  badgeItem: {
    width: '25%',
    alignItems: 'center',
    marginBottom: 16,
  },
  badge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  badgeIcon: {
    fontSize: 24,
  },
  badgeLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  seeAllButton: {
    marginTop: 8,
  },
  recommendationItem: {
    marginBottom: 20,
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  recommendationDescription: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginVertical: 8,
  },
  progressFill: {
    height: 8,
    borderRadius: 4,
  },
  practiceButton: {
    marginTop: 8,
    alignSelf: 'flex-start',
  },
});
