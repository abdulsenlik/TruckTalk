import React from 'react';
import { StyleSheet, View, Text, Image, ImageSourcePropType, useWindowDimensions, Platform } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface OnboardingScreenProps {
  title: string;
  description: string;
  image?: ImageSourcePropType;
  primaryButtonLabel: string;
  secondaryButtonLabel?: string;
  onPrimaryPress: () => void;
  onSecondaryPress?: () => void;
  children?: React.ReactNode;
}

export function OnboardingScreen({
  title,
  description,
  image,
  primaryButtonLabel,
  secondaryButtonLabel,
  onPrimaryPress,
  onSecondaryPress,
  children,
}: OnboardingScreenProps) {
  const { width, height } = useWindowDimensions();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  
  const isSmallDevice = width < 380;

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 16 }]}>
      {image && (
        <View style={styles.imageContainer}>
          <Image 
            source={image} 
            style={[
              styles.image, 
              { width: width * 0.8, height: height * 0.3 }
            ]} 
            resizeMode="contain"
          />
        </View>
      )}
      
      <View style={styles.contentContainer}>
        <Text style={[styles.title, { color: theme.colors.primary, fontSize: isSmallDevice ? 28 : 32 }]}>
          {title}
        </Text>
        <Text style={[styles.description, { color: theme.colors.onBackground, fontSize: isSmallDevice ? 16 : 18 }]}>
          {description}
        </Text>
        
        {children}
      </View>
      
      <View style={[styles.buttonContainer, { marginBottom: Platform.OS === 'ios' ? 0 : 16 }]}>
        <Button
          mode="contained"
          onPress={onPrimaryPress}
          style={styles.primaryButton}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
        >
          {primaryButtonLabel}
        </Button>
        
        {secondaryButtonLabel && (
          <Button
            mode="text"
            onPress={onSecondaryPress}
            style={styles.secondaryButton}
            labelStyle={{ color: theme.colors.primary }}
          >
            {secondaryButtonLabel}
          </Button>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 48,
  },
  image: {
    maxWidth: 300,
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginVertical: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 16,
  },
  primaryButton: {
    width: '100%',
    borderRadius: 12,
    marginBottom: 8,
  },
  buttonContent: {
    height: 56,
  },
  buttonLabel: {
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    marginTop: 8,
  },
});
