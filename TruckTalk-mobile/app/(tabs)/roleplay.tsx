import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function RoleplayScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { moduleId } = useLocalSearchParams<{ moduleId?: string }>();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Roleplay</Text>
        <Text style={styles.headerSubtitle}>
          {moduleId ? `Module ID: ${moduleId}` : 'Practice your English skills'}
        </Text>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>
            Video roleplay scenarios will be displayed here.
          </Text>
          <Text style={styles.placeholderDescription}>
            Features to be implemented:
          </Text>
          <View style={styles.featureList}>
            <Text style={styles.featureItem}>• AI-generated video scenarios</Text>
            <Text style={styles.featureItem}>• Dual-language subtitles</Text>
            <Text style={styles.featureItem}>• Voice recognition</Text>
            <Text style={styles.featureItem}>• Pause-and-respond interactions</Text>
          </View>
          
          <Button 
            mode="contained" 
            onPress={() => router.back()}
            style={{ marginTop: 24 }}
          >
            Back to Modules
          </Button>
        </View>
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
    flexGrow: 1,
    padding: 16,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 24,
  },
  placeholderText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  placeholderDescription: {
    fontSize: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  featureList: {
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  featureItem: {
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20,
  },
});
