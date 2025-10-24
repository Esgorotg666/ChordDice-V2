# Overview

Guitar Dice is a freemium web application that generates musical chord progressions for musicians. It features a 12x11 grid mapping musical keys to chord types, color-coded for major and minor contexts. Users can generate single chords or 4-chord progressions using a virtual dice system. The application incorporates a freemium business model with usage limits, ad-supported token generation, subscription upgrades, and a referral program to drive user acquisition and engagement. The business vision is to provide a comprehensive tool for musical practice and creation, leveraging a robust monetization strategy and community growth initiatives.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend
- **Framework**: React Single Page Application (SPA) with Vite.
- **UI/UX**: `shadcn/ui` components (Radix UI, Tailwind CSS) with custom CSS variables for musical key color-coding. Mobile-first, touch-optimized design.
- **State Management**: TanStack Query for server state, React hooks for local state.
- **Routing**: Wouter.
- **Theming**: Black and dark gold (#D4AF37) color scheme.
- **Adaptive Backgrounds**: Dynamic dice interface backgrounds based on selected genre.
- **Fretboard Diagrams**: Comprehensive, accurate fretboard diagrams across the application, with single-note, scale, and chord visualizations, including 24-fret full neck display and interactive toggles.

## Backend
- **Server**: Express.js RESTful API with middleware for logging and error handling.
- **Development**: Vite integration for Hot Module Replacement (HMR).
- **Storage**: Abstracted storage interface (currently in-memory, with PostgreSQL session store integration).

## Data Storage
- **Database**: PostgreSQL via Neon Database (serverless).
- **ORM**: Drizzle ORM.
- **Schema**: Users and chord progressions tables, with JSON storage for chord arrays.
- **Migrations**: Drizzle Kit.

## Key Features

### Core Musical Features
- **Chord Generation**: Two 8-sided dice for random chord progression generation.
- **Musical Theory**: Color-coded key groups, numbered exotic chord types, 12x11 interactive chord chart, pentatonic scale guide, and dual fretboard tapping visualization.
- **Progression Types**: Single chord generation or full riff creation with authentic, genre-specific progressions (e.g., Extreme Metal, Black Metal, Rock, Jazz, Funk, Classical) that transpose to the rolled key.
- **Musical Accuracy**: Dynamic scale generation from interval formulas, preservation of accidental families during transposition, and correct modal accidental preferences.

### Freemium Business Model
- **Modes**: Demo/Guest mode (full premium access), Free Tier (limited access, 5 free riff generations), Premium Tier (unlimited features).
- **Authentication**: Replit Auth for saving progress.
- **Monetization**: Ad-supported token earning system, premium subscription ($4.99/month) via Stripe for full access to exotic chords, advanced genres, scales, and exercises.

### Referral Program
- **Mechanism**: Unique collision-resistant referral codes.
- **Rewards**: 1-month free Premium for referrers when referred users upgrade.
- **Tracking**: Dashboard with stats, recent referrals, and sharing tools.
- **Integration**: Referral code input during authentication with URL parameter support, atomic processing for reward claiming.

### Premium Features
- **Compatible Scales**: Identifies 2-4 musically compatible scales with fretboard visualization.
- **Guitar Exercises**: Comprehensive practice section (8 categories, 4 skill levels) with detailed descriptions and fretboard diagrams.
- **Enhanced Tapping**: Dedicated page with independent dual dice for two-hand tapping practice, visualized on dual fretboards with corrected color coding and finger number labels.
- **Optional Premium Dice**: Time Signature Dice and Metronome BPM Dice.
- **Advanced Genres**: Neo-Classical, Spanish Flamenco, Black Metal, Death Metal, Rock, Funk, with genre-specific progressions and music theory.
- **Guitar Classroom**: Collapsible Accordion UI for Beginner, Intermediate, and Mastery levels, featuring 45 lessons with fretboard diagrams and scale integration.

### Engagement Features
- **Daily Practice Streak System**: Tracks consecutive days of dice rolls, offers milestone rewards (bonus tokens), and displays visual streak indicators.
- **Analytics Tracking**: Comprehensive event tracking via Google Analytics 4 for user behavior, dice rolls, chord interactions, subscription conversions, and streak milestones.
- **Affiliate Marketing System**: Music gear affiliate programs integrated throughout app with geo-detection (Sweetwater 5% US, Thomann 5% EU, Guitar Center/zZounds/Musician's Friend 3-5%). Strategic placements after dice rolls, in riff modal, exercises page, and classroom. Context-aware recommendations (e.g., BC Rich Warlock for metal genres, metronomes for exercises).

# External Dependencies

- **Database**: Neon Database (PostgreSQL).
- **UI Components**: Radix UI.
- **Payment Processing**: Stripe.
- **Authentication**: Replit Auth.
- **Analytics**: Google Analytics 4.
- **Fonts**: Google Fonts (Inter, Architects Daughter, DM Sans, Fira Code).
- **Development Tools**: TypeScript, ESLint, Prettier.