export interface OnboardingItem {
  id: string;
  title: string;
  description: string;
  image: any;
}

export type AppLanguage = 'en' | 'tr' | 'ky' | 'ru';

export interface UserPreferences {
  language: AppLanguage;
  learningGoal: string;
  drivingExperience: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  thumbnail: any;
  completionPercentage: number;
  phrases: Phrase[];
}

export interface Phrase {
  id: string;
  text: string;
  translation: string;
  audio?: string;
}
