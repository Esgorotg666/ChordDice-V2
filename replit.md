# Overview

Guitar Dice is a freemium web application designed to generate musical chord progressions. It provides a 12x11 grid mapping musical keys to chord types, enhanced with color-coding for major and minor contexts. The application allows users to generate single chords or 4-chord progressions using a virtual dice system. Its business model is freemium, featuring usage limits, ad-supported token generation, subscription upgrades, and a referral program to drive user acquisition. The vision is to offer a comprehensive tool for musical practice and creation, supported by a robust monetization strategy and community growth initiatives.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## UI/UX
- **Frontend Framework**: React SPA with Vite.
- **Components**: `shadcn/ui` (Radix UI, Tailwind CSS) with custom CSS for musical key color-coding.
- **Design Principles**: Mobile-first, touch-optimized, with a black and dark gold (`#D4AF37`) color scheme.
- **Dynamic Elements**: Adaptive backgrounds based on selected genre, comprehensive fretboard diagrams with interactive toggles.

## Backend
- **Server**: Express.js RESTful API.
- **Development**: Vite integration for HMR.
- **Session Management**: `express-session` with `connect-pg-simple` for persistent sessions, ensuring secure cookie handling (`HttpOnly`, `SameSite=Lax`, `MaxAge=7 days`, `Secure` in production).

## Data Storage
- **Database**: PostgreSQL (Neon Database).
- **ORM**: Drizzle ORM.
- **Schema**: Tables for users and chord progressions, including fields for payment provider tracking (`paymentProvider`, `revenueCatUserId`).
- **Migrations**: Drizzle Kit.

## Key Features

### Core Musical Features
- **3-Dice Bridge System**: Generates chord progressions using a Main Chord Die, Bridge Pattern Die (Compatible Scale, Pentatonic Pattern, Chromatic Connection, Arpeggio Bridge), and Supporting Chord Die, utilizing 8 color groups.
- **Musical Theory Integration**: Color-coded key groups, exotic chord types, interactive chord chart, pentatonic scale guide, and dual fretboard visualization.
- **Progression Types**: Single chord generation or genre-specific 4-chord riff creation (e.g., Extreme Metal, Jazz, Funk) that transpose to the rolled key.
- **Musical Accuracy**: Dynamic scale generation, preservation of accidental families, and correct modal accidental preferences.
- **Fretboard Display**: Normalizes dice-generated chord names to map correctly to chord diagram database keys (e.g., A#M7 to Bbmaj7).

### Freemium & Monetization
- **Access Tiers**: Demo/Guest mode (full premium access without persistence), Free Tier (limited access), Premium Tier (unlimited features).
- **Authentication**: Replit Auth, plus email/password with email verification (bypassed in development). Enhanced signup flow for mobile.
- **Monetization**: Hybrid payment system using Stripe for web and RevenueCat (Google Play Billing/App Store IAP) for mobile, detected via `Capacitor.getPlatform()`.
- **Ad-supported tokens**: Google AdMob rewarded video ads for additional dice rolls.
- **Premium Subscription**: $4.99/month for advanced features.

### Referral Program
- **Mechanism**: Unique, collision-resistant referral codes.
- **Rewards**: 1-month free Premium for referrers when referred users upgrade.
- **Tracking**: User dashboard for stats and sharing tools.

### Premium Features
- **Compatible Scales**: Identification and visualization of 2-4 musically compatible scales.
- **Guitar Exercises**: Comprehensive practice section across 8 categories and 4 skill levels.
- **Enhanced Tapping**: Dedicated page with independent dual dice for two-hand tapping practice, visualized on dual fretboards.
- **Optional Dice**: Time Signature Dice and Metronome BPM Dice.
- **Advanced Genres**: Neo-Classical, Spanish Flamenco, Black Metal, Death Metal, etc., with genre-specific progressions.
- **Guitar Classroom**: Educational interface with 6 skill tiers (Beginner to Master), featuring visual progression and enhanced hero section.

### Engagement & Personalization
- **Daily Practice Streak System**: Tracks consecutive dice rolls with milestone rewards.
- **Analytics Tracking**: Google Analytics 4 for user behavior and monetization events.
- **Affiliate Marketing**: Integrated music gear affiliate programs (Sweetwater, Thomann, Guitar Center) with context-aware recommendations.
- **Personalization System**: Stores `playingStyle`, `preferredGenre`, `skillLevel`, and `hasCompletedOnboarding`.
- **Onboarding Flow**: 3-step modal for new users to set preferences, with a "Skip for now" option.
- **Dynamic Backgrounds**: `BackgroundProvider` context applies genre-specific backgrounds based on `preferredGenre`.
- **Personalized Classroom**: "Recommended For You" section filters lessons by skill level and `preferredGenre`.

### Guest/Demo Mode
- Allows unauthenticated users full access to the dice interface and premium features without persistence, facilitating user acquisition and testing.

## Android Deployment
- **App ID**: `com.chorddice.app`
- **Version**: 1.10.0 (versionCode: 30)
- **Framework**: Capacitor 7.4.3.
- **Build Process**: GitHub Actions workflows for building signed APK/AAB and auto-uploading to Google Play Store Internal Testing.

# External Dependencies

- **Database**: Neon Database (PostgreSQL).
- **UI Components**: Radix UI.
- **Payment Processing**: Stripe, RevenueCat.
- **Authentication**: Replit Auth.
- **Analytics**: Google Analytics 4.
- **Ads**: Google AdMob (`@capacitor-community/admob`).
- **Fonts**: Google Fonts (Inter, Architects Daughter, DM Sans, Fira Code).
- **Development Tools**: TypeScript, ESLint, Prettier.
- **Mobile Framework**: Capacitor.