import React from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { Text, useTheme, RadioButton } from 'react-native-paper';
import { AppLanguage } from '../../types';

interface Language {
  code: AppLanguage;
  name: string;
  nativeName: string;
}

interface LanguageSelectorProps {
  selectedLanguage: AppLanguage;
  onSelectLanguage: (language: AppLanguage) => void;
}

const LANGUAGES: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe' },
  { code: 'ky', name: 'Kyrgyz', nativeName: 'Кыргызча' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
];

export function LanguageSelector({ selectedLanguage, onSelectLanguage }: LanguageSelectorProps) {
  const theme = useTheme();

  const renderLanguageItem = ({ item }: { item: Language }) => {
    const isSelected = selectedLanguage === item.code;
    
    return (
      <TouchableOpacity
        style={[
          styles.languageItem,
          { borderColor: isSelected ? theme.colors.primary : theme.colors.outline }
        ]}
        onPress={() => onSelectLanguage(item.code)}
        activeOpacity={0.7}
      >
        <View style={styles.languageContent}>
          <Text style={[styles.languageName, { color: theme.colors.onSurface }]}>
            {item.name}
          </Text>
          <Text style={styles.nativeName}>
            {item.nativeName}
          </Text>
        </View>
        <RadioButton
          value={item.code}
          status={isSelected ? 'checked' : 'unchecked'}
          onPress={() => onSelectLanguage(item.code)}
          color={theme.colors.primary}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.colors.onSurface }]}>
        Select your language
      </Text>
      <FlatList
        data={LANGUAGES}
        renderItem={renderLanguageItem}
        keyExtractor={(item) => item.code}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 8,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 6,
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  languageContent: {
    flexDirection: 'column',
  },
  languageName: {
    fontSize: 16,
    fontWeight: '600',
  },
  nativeName: {
    fontSize: 14,
    opacity: 0.7,
  },
});
