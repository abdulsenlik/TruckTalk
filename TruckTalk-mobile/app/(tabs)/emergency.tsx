import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Text, Searchbar, useTheme, Divider, IconButton } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

interface EmergencyPhrase {
  id: string;
  category: string;
  text: string;
  translation: string;
  pronunciation?: string;
}

const EMERGENCY_PHRASES: EmergencyPhrase[] = [
  {
    id: '1',
    category: 'Medical',
    text: 'I need medical help urgently',
    translation: 'Acil tıbbi yardıma ihtiyacım var',
    pronunciation: 'Ajil tibbi yardeema ihtiyajim var',
  },
  {
    id: '2',
    category: 'Medical',
    text: 'Call an ambulance please',
    translation: 'Lütfen ambulans çağırın',
    pronunciation: 'Lutfen ambulans chahirin',
  },
  {
    id: '3',
    category: 'Vehicle',
    text: 'My truck has broken down',
    translation: 'Kamyonum bozuldu',
    pronunciation: 'Kamyonum bozuldu',
  },
  {
    id: '4',
    category: 'Vehicle',
    text: 'I have a flat tire',
    translation: 'Lastiğim patladı',
    pronunciation: 'Lastigim patladi',
  },
  {
    id: '5',
    category: 'Vehicle',
    text: 'I\'m out of fuel',
    translation: 'Yakıtım bitti',
    pronunciation: 'Yakitim bitti',
  },
  {
    id: '6',
    category: 'Police',
    text: 'I need to report an accident',
    translation: 'Bir kaza bildirmem gerekiyor',
    pronunciation: 'Bir kaza bildirmem gerekiyor',
  },
  {
    id: '7',
    category: 'Police',
    text: 'Someone hit my truck',
    translation: 'Birisi kamyonuma çarptı',
    pronunciation: 'Birisi kamyonuma charpti',
  },
  {
    id: '8',
    category: 'Location',
    text: 'I\'m lost, can you help me?',
    translation: 'Kayboldum, bana yardım edebilir misiniz?',
    pronunciation: 'Kayboldum, bana yardim edebilir misiniz',
  },
  {
    id: '9',
    category: 'Location',
    text: 'Where is the nearest truck stop?',
    translation: 'En yakın tır parkı nerede?',
    pronunciation: 'En yakin tir parki nerede',
  },
];

export default function EmergencyScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [...new Set(EMERGENCY_PHRASES.map(phrase => phrase.category))];

  const filteredPhrases = EMERGENCY_PHRASES.filter(phrase => {
    const matchesSearch = phrase.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          phrase.translation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? phrase.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const handleCategoryPress = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const renderCategoryChip = (category: string) => {
    const isSelected = category === selectedCategory;
    
    return (
      <TouchableOpacity
        key={category}
        style={[
          styles.categoryChip,
          { 
            backgroundColor: isSelected ? theme.colors.primary : theme.colors.surfaceVariant,
          }
        ]}
        onPress={() => handleCategoryPress(category)}
      >
        <Text style={[
          styles.categoryChipText,
          { color: isSelected ? '#fff' : theme.colors.onSurfaceVariant }
        ]}>
          {category}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderPhraseItem = ({ item }: { item: EmergencyPhrase }) => (
    <View style={styles.phraseCard}>
      <View style={styles.phraseHeader}>
        <Text style={styles.categoryTag}>{item.category}</Text>
        <IconButton
          icon="volume-high"
          size={20}
          onPress={() => {/* Play audio */}}
          style={styles.audioButton}
        />
      </View>
      <Text style={styles.phraseText}>{item.text}</Text>
      <Text style={styles.phraseTranslation}>{item.translation}</Text>
      {item.pronunciation && (
        <Text style={styles.phrasePronunciation}>Pronunciation: {item.pronunciation}</Text>
      )}
      <View style={styles.actionRow}>
        <IconButton icon="share-variant" size={20} onPress={() => {}} />
        <IconButton icon="star-outline" size={20} onPress={() => {}} />
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Emergency Phrases</Text>
        <Text style={styles.headerSubtitle}>Quick access to critical phrases</Text>
      </View>
      
      <Searchbar
        placeholder="Search phrases..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
        iconColor={theme.colors.primary}
      />
      
      <ScrollView 
        horizontal 
        contentContainerStyle={styles.categoriesContainer}
        showsHorizontalScrollIndicator={false}
      >
        {categories.map(renderCategoryChip)}
      </ScrollView>
      
      <FlatList
        data={filteredPhrases}
        renderItem={renderPhraseItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.phrasesContainer}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
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
  searchBar: {
    margin: 16,
    borderRadius: 12,
    elevation: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
  },
  categoryChipText: {
    fontWeight: '500',
  },
  phrasesContainer: {
    padding: 16,
    paddingBottom: 24,
  },
  phraseCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  phraseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryTag: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  audioButton: {
    margin: 0,
  },
  phraseText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  phraseTranslation: {
    fontSize: 16,
    marginBottom: 4,
    opacity: 0.8,
  },
  phrasePronunciation: {
    fontSize: 14,
    fontStyle: 'italic',
    opacity: 0.6,
    marginTop: 4,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
});
