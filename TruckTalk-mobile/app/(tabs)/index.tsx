import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, FlatList, Image } from 'react-native';
import { Text, Card, Avatar, Button, useTheme, FAB, IconButton } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

const DUMMY_MODULES = [
  {
    id: '1',
    title: 'Getting Pulled Over',
    description: 'Learn how to communicate with law enforcement',
    completionPercentage: 75,
  },
  {
    id: '2',
    title: 'Border Crossing',
    description: 'Essential phrases for crossing borders smoothly',
    completionPercentage: 30,
  },
  {
    id: '3',
    title: 'Roadside Assistance',
    description: 'Get help when you have vehicle problems',
    completionPercentage: 0,
  },
  {
    id: '4',
    title: 'Loading & Unloading',
    description: 'Communication at delivery locations',
    completionPercentage: 10,
  },
];

const QUICK_PHRASES = [
  {
    id: '1',
    text: 'I need medical help',
    translation: 'Acil tıbbi yardıma ihtiyacım var',
  },
  {
    id: '2',
    text: 'My truck has broken down',
    translation: 'Kamyonum bozuldu',
  },
  {
    id: '3',
    text: 'Where is the nearest rest stop?',
    translation: 'En yakın dinlenme tesisi nerede?',
  },
];

export default function HomeScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const renderModuleCard = ({ item }: any) => (
    <Card 
      style={styles.moduleCard}
      onPress={() => router.push(`/roleplay?moduleId=${item.id}`)}
    >
      <Card.Cover 
        source={{ uri: `https://picsum.photos/seed/${item.id}/500/300` }}
        style={styles.cardCover}
      />
      <Card.Content style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
        <View style={styles.progressContainer}>
          <View 
            style={[
              styles.progressBar, 
              { 
                width: `${item.completionPercentage}%`,
                backgroundColor: theme.colors.primary 
              }
            ]} 
          />
          <Text style={styles.progressText}>{item.completionPercentage}% complete</Text>
        </View>
      </Card.Content>
    </Card>
  );

  const renderQuickPhrase = ({ item }: any) => (
    <TouchableOpacity 
      style={[styles.phraseCard, { borderColor: theme.colors.outline }]}
      onPress={() => {/* Play audio */}}
    >
      <View>
        <Text style={styles.phraseText}>{item.text}</Text>
        <Text style={styles.phraseTranslation}>{item.translation}</Text>
      </View>
      <IconButton 
        icon="play-circle" 
        size={24} 
        iconColor={theme.colors.primary}
      />
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>TruckTalk</Text>
          <Text style={styles.headerSubtitle}>Welcome back, Driver</Text>
        </View>
        
        <View style={styles.headerActions}>
          <IconButton
            icon="translate"
            size={24}
            onPress={() => {/* Toggle language */}}
          />
          <Avatar.Image 
            size={40} 
            source={{ uri: 'https://i.pravatar.cc/300' }} 
          />
        </View>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.sectionTitle}>Continue Learning</Text>
        <FlatList
          data={DUMMY_MODULES}
          renderItem={renderModuleCard}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.moduleList}
        />
        
        <Text style={styles.sectionTitle}>Quick Phrases</Text>
        <FlatList
          data={QUICK_PHRASES}
          renderItem={renderQuickPhrase}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.phraseList}
          scrollEnabled={false}
        />
      </ScrollView>
      
      <FAB
        icon="microphone"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={() => router.push('/emergency')}
        label="Emergency"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 14,
    opacity: 0.7,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 12,
  },
  moduleList: {
    paddingLeft: 16,
  },
  moduleCard: {
    width: 280,
    marginRight: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  cardCover: {
    height: 140,
  },
  cardContent: {
    paddingVertical: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 14,
    opacity: 0.8,
    marginTop: 4,
    marginBottom: 8,
  },
  progressContainer: {
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    marginVertical: 8,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'right',
  },
  phraseList: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  phraseCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  phraseText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  phraseTranslation: {
    fontSize: 14,
    opacity: 0.7,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    borderRadius: 28,
  },
});
