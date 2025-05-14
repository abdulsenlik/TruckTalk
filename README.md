# TruckTalk - English for Truck Drivers

![TruckTalk Logo](https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=200&q=80)

## About TruckTalk

TruckTalk is a specialized language learning application designed for non-English speaking truck drivers operating in the United States. The app focuses on teaching essential English phrases and vocabulary needed for traffic stops, roadside inspections, emergencies, and interactions with law enforcement or DOT officials.

### Target Audience

- Non-English speaking truck drivers (primarily Turkish, Kyrgyz, and Russian speakers)
- Trucking companies with international drivers
- CDL schools with ESL students

## Features

### Learning Modules

The app is structured into progressive learning modules:

1. **Basic Greetings & ID Check** - Essential phrases for introducing yourself and handling ID verification
2. **Road Signs & Traffic Rules** - Understanding common road signs and explaining your actions
3. **Dealing with Police/DOT Officers** - Communication with law enforcement during inspections
4. **Emergency and Accident Situations** - Vocabulary for handling roadside emergencies
5. **Border Crossing and Inspection** - Communication for border crossings and customs
6. **Vehicle Maintenance Vocabulary** - Terms related to truck parts and maintenance issues

### Key Features

- **Multi-language Support**: Interface and translations in Turkish, Kyrgyz, Russian, and English
- **Audio Pronunciation**: Listen to correct pronunciation of all phrases
- **Interactive Dialogues**: Practice real-world scenarios with simulated conversations
- **Progress Tracking**: Monitor learning progress across all modules
- **Emergency Phrases**: Quick access to critical phrases for urgent situations
- **Achievement System**: Earn badges and track accomplishments
- **User Authentication**: Secure login and account management

### Subscription Tiers

- **Free**: Access to first 2 modules, basic vocabulary practice
- **Basic ($4.99/month)**: Full access to all modules, complete vocabulary lists, progress tracking
- **Premium ($9.99/month)**: All Basic features plus AI speaking coach, downloadable content, offline mode
- **Enterprise ($19.99/month)**: All Premium features plus bulk licensing, custom content options

## Technical Information

### Built With

- React + TypeScript
- Vite
- Tailwind CSS
- Shadcn UI Components
- Supabase (Authentication & Database)

### Getting Started

#### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

#### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/trucktalk.git

# Navigate to the project directory
cd trucktalk

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## User Flow

The application follows this user flow:

1. **App Launch** → User either logs in or signs up
2. **Language Selection** → User selects their native language
3. **Dashboard** → User accesses learning modules, emergency phrases, or progress tracking
4. **Module Selection** → User chooses from available modules based on subscription tier
5. **Lesson Activities** → User engages with dialogues, vocabulary, grammar, and simulations
6. **Progress Tracking** → User monitors their learning progress and achievements

## Deployment

The application is deployed on Vercel:

```bash
# Build the application
npm run build

# Deploy to Vercel
vercel
```

### Vercel Deployment Steps

1. **Connect GitHub Repository to Vercel**
   - Log in to your Vercel dashboard at [vercel.com](https://vercel.com)
   - Click on "New Project"
   - Import your GitHub repository
   - Select the TruckTalk repository

2. **Configure Environment Variables**
   - Add the following environment variables:
     - `VITE_SUPABASE_URL` - Your Supabase URL
     - `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key

3. **Configure Build Settings**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete
   - Your app will be available at a Vercel-generated URL

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions or support, please contact [your-email@example.com](mailto:your-email@example.com).
