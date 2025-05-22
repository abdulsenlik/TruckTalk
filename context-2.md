### Project Overview:  
A mobile app for truck drivers to practice emergency English through interactive, video-based roleplays. Supports English, Turkish, Kyrgyz, and Russian, with one-handed optimization. Features gamification, offline mode, and adaptive video quality.  

### Tech Stack:  
- **Framework**: Expo (React Native)  
- **Language**: TypeScript  
- **Navigation**: Expo Router  
- **UI Library**: React Native Paper  
- **Backend/Auth**: Supabase (authentication, data storage, real-time features)  
- **Deployment**: Expo Go  

### Expo Setup:  
- Initialize Expo project with TypeScript template.  
- Configure Supabase for auth and data storage.  
- Set up Expo Router for file-based navigation.  
- Integrate React Native Paper for consistent UI components.  

### Authentication Flow:  
- Email/password or social login (Google, Apple) via Supabase.  
- Guest mode with limited access (no progress sync).  
- Language preference selection on first launch.  

### Feature List:  

#### 1. **Home Screen**  
- Displays modules ("Getting Pulled Over," etc.) as cards with thumbnails and completion %.  
- Native language toggle in header.  
- Emergency phrase shortcut (floating button).  
- User profile (photo, name, level) with quick access.  
- "Quick Phrases" section (horizontal scroll).  

#### 2. **Roleplay Screen**  
- AI-generated video scenarios with dual-language subtitles.  
- Pause-and-respond interactions (voice or preset options).  
- Voice recognition for pronunciation feedback.  
- Glossary popup, playback controls, and skip options.  

#### 3. **Progress Tracker**  
- Module-wise progress visualization (charts/graphs).  
- Tracks lessons, time spent, badges, and fluency scores.  
- Daily streaks, social sharing, and smart recommendations.  

#### 4. **Offline Mode (Premium)**  
- Download modules for offline use.  
- Sync progress when back online.  

#### 5. **Accessibility & Customization**  
- Adjustable playback speed, font size, and volume.  
- Screen reader support and high-contrast mode.  

#### 6. **Gamification**  
- Badges, points, and leaderboard (Supabase real-time).  
- Spaced repetition for vocabulary reinforcement.  

#### 7. **Performance Optimization**  
- Video quality adapts to connection speed.  
- Preloads next lesson during idle time.  

#### 8. **Emergency Shortcut**  
- One-tap access to critical phrases (shake gesture or floating button).  

#### 9. **Multilingual Support**  
- UI and content in 4 languages (stored in Supabase).  
- Culturally sensitive design for diverse backgrounds.  

#### 10. **One-Handed UI**  
- Bottom-aligned navigation and large touch targets.  
- Swipe gestures for module navigation.  

### Notes:  
- Prioritize offline-first design for truckers with poor connectivity.  
- Use Expo’s AV module for adaptive video playback.  
- Test on low-end devices for performance.