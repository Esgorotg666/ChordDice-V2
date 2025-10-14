# Overview

Guitar Dice is a freemium chord riff generator web application designed for musicians to practice and create musical chord progressions. It features a 12x11 grid mapping musical keys to chord types, with color-coding for major and minor contexts. Users can generate single chords or 4-chord progressions using a virtual dice system. The application incorporates a comprehensive freemium business model, including usage limits, ad-supported token generation, subscription upgrades, and a referral program to drive user acquisition and engagement.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend
- **Framework**: React Single Page Application (SPA) built with Vite.
- **UI/UX**: `shadcn/ui` components based on Radix UI primitives, styled with Tailwind CSS and custom CSS variables for musical key color-coding.
- **State Management**: TanStack Query for server state, React hooks for local state.
- **Routing**: Wouter for client-side routing.
- **Design**: Mobile-first, touch-optimized for iPhone.

## Backend
- **Server**: Express.js RESTful API with middleware for logging and error handling.
- **Development**: Vite integration for Hot Module Replacement (HMR).
- **Storage**: Abstracted storage interface (currently in-memory, with PostgreSQL session store integration ready).

## Data Storage
- **Database**: PostgreSQL via Neon Database (serverless).
- **ORM**: Drizzle ORM.
- **Schema**: Users and chord progressions tables, with JSON storage for chord arrays.
- **Migrations**: Drizzle Kit for schema management.

## Key Features

### Core Musical Features
- **Chord Generation**: Two 8-sided dice for random chord progression generation.
- **Musical Theory**: Color-coded key groups, numbered exotic chord types, and a 12x11 interactive chord chart.
- **Visual Aids**: Pentatonic scale guide and dual fretboard tapping visualization (color-coded for roots, tapping, and finger positions).
- **Progression Types**: Single chord generation or full riff creation.

### Freemium Business Model
- **Authentication**: Required sign-up via Replit Auth.
- **Usage Limits**: 5 free riff generations per user.
- **Monetization**: Ad-supported token earning system (daily limit), premium subscription ($4.99/month) for unlimited features via Stripe integration.

### Referral Program
- **Unique Codes**: Collision-resistant referral code generation for each user.
- **Rewards**: 1-month free Premium for referrers when referred users upgrade.
- **Tracking**: Dashboard with stats, recent referrals, and sharing tools.
- **Integration**: Referral code input during authentication with URL parameter support.
- **Atomic Processing**: Race-condition-free reward claiming with database transactions.

### Premium Features
- **Compatible Scales**: Identifies 2-4 musically compatible scales for progressions, with fretboard visualization and theory.
- **Guitar Exercises**: Comprehensive practice section with 8 categories and 4 skill levels, featuring detailed descriptions and fretboard diagrams.
- **Enhanced Tapping**: Dedicated page with independent dual dice for two-hand tapping practice (left-hand fretting chords, right-hand tapping chords with extended voicings), visualized on dual fretboards.
- **Optional Premium Dice**:
    - **Time Signature Dice**: Generates 8 common time signatures.
    - **Metronome BPM Dice**: Generates tempos from 60-200 BPM.
- **Advanced Genres**: Neo-Classical, Spanish Flamenco, Black Metal, Death Metal, Rock, Funk, with genre-specific progressions and music theory.

### UI/UX Decisions
- **Theming**: Black and dark gold (#D4AF37) color scheme for a sophisticated aesthetic.
- **Adaptive Backgrounds**: Dynamic backgrounds for the dice interface, changing based on the selected genre (e.g., Warlock guitar for metal, Spanish guitar for flamenco).
- **Guitar Classroom**: Collapsible Accordion UI for Beginner, Intermediate, and Mastery levels, featuring 45 lessons with fretboard diagrams, scale integration, and freemium gating.

# External Dependencies

- **Database**: Neon Database (PostgreSQL).
- **UI Components**: Radix UI.
- **Payment Processing**: Stripe.
- **Authentication**: Replit Auth.
- **Fonts**: Google Fonts (Inter, Architects Daughter, DM Sans, Fira Code).
- **Development Tools**: TypeScript, ESLint, Prettier.