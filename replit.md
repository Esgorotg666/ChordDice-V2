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
- **Demo/Guest Mode**: Full premium access to try all features (no restrictions)
- **Authentication**: Required sign-up via Replit Auth for saving progress
- **Free Tier** (authenticated users without subscription): Limited access to basic features, exotic chords locked
- **Usage Limits**: 5 free riff generations per authenticated free user
- **Monetization**: Ad-supported token earning system (daily limit), premium subscription ($4.99/month) for unlimited features via Stripe integration
- **Premium Tier**: Full access to exotic chords, advanced genres, scales, exercises, and unlimited usage

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

## Recent Updates (October 2025)

### Music Theory Accuracy for Chord Generation - Band-Specific Progressions (October 19, 2025)
- **70 Authentic Progressions**: Complete update with 10 progressions per genre from music theory analyses and song breakdowns
- **Extreme Metal** (10 progressions):
  - Slayer "Raining Blood" chromatic descent, Morbid Angel "God of Emptiness" tritone, Dying Fetus Aeolian melodic
  - Sodom "Agent Orange" power drops, Nile "Sacrifice Unto Sebek" Phrygian exotic, Necrophagist diminished technical
  - Beherit, Deicide, Dark Funeral, Archspire progressions with palm-muted aggression and dissonance
- **Black Metal** (10 progressions):
  - Darkthrone "Transilvanian Hunger" cyclical, Dark Funeral Andalusian descent, Dimmu Borgir symphonic
  - Mayhem "Freezing Moon" atmospheric, Cradle of Filth diminished, Der Weg Einer Freiheit post-black modal
  - Behemoth, 1349 augmented chaos, Nargaroth tremolo, Peste Noire folk-black with Aeolian/Harmonic Minor modes
- **Death Metal** (10 progressions):
  - Cannibal Corpse "Inhumane Harvest" tritone horror, "Meathook Sodomy" tremolo, Nile Phrygian exotic
  - Suffocation diminished chaos, Vader chromatic descent, Morbid Angel "Chapel of Ghouls" harmonic minor
  - Deicide, Entombed "Left Hand Path", Arch Enemy melodic, Sepultura "Roots Bloody Roots" groove
- **Rock** (10 progressions):
  - Ozzy "Crazy Train" I-IV-V, Led Zeppelin "Rock and Roll", U2 "With or Without You" anthemic
  - System of a Down emotional build, Scorpions retro energy, Iron Maiden "The Trooper" minor hard rock
  - Kiss, Red Hot Chili Peppers descending, Dio, Motley Crue power sequences with diatonic triads
- **Jazz** (10 progressions):
  - Miles Davis "Autumn Leaves" ii-V-I, John Coltrane "Blue Bossa" minor variant, Dizzy Gillespie "I Got Rhythm"
  - Duke Ellington "Satin Doll" turnaround, Coltrane "Giant Steps" changes and ascending build
  - Bird blues, backdoor progression, modal shift with extended 7ths/9ths/13ths and alterations
- **Funk** (10 progressions):
  - Parliament-Funkadelic "Give Up the Funk" static E9 vamp, Sly Stone minor-dominant alternation
  - Tower of Power chromatic ninths, The Temptations soulful vamp, Earth Wind & Fire extended groove
  - Bootsy Collins/Parliament dominant resolution, Marvin Gaye, Rick James, Curtis Mayfield, Zapp
- **Classical/Neo-Classical** (10 progressions):
  - Mozart Piano Sonata K.545 authentic cadence, Bach BWV 846 circle of fifths, Handel La Folia
  - Bach chorales canon, Beethoven "Moonlight Sonata", Mozart "Eine Kleine Nachtmusik"
  - Handel "Hallelujah" plagal cadence, Schubert deceptive, Chopin Andalusian, Hildegard von Bingen modal
- **Random Selection**: Each genre randomly selects from 10 authentic progressions every dice roll for infinite variety
- **Transposition**: All progressions automatically transpose to match the rolled key while preserving chord relationships

## Recent Updates (October 2025)

### Musical Theory Accuracy Fixes (October 17, 2025)
- **Dynamic Scale Generation**: Removed all hardcoded scales, implemented dynamic generation from interval formulas for 100% musical accuracy
- **Accidental Family Preservation**: Fixed transpose function to preserve flat/sharp spellings based on key signature
  - Flat keys (E♭, A♭, B♭, D♭) correctly display with flat notes (E♭ F G A♭ B♭ C D)
  - Sharp keys continue using sharp spellings (F♯ G♯ A♯)
  - Example: E♭ Major now shows "E♭ F G A♭ B♭ C D" (not "D♯ F G G♯ A♯ C D")
- **Modal Accidental Preference**: Added `preferFlats` flag to mode definitions
  - Modes with flatted degrees (Dorian ♭3/♭7, Phrygian ♭2/♭3/♭6/♭7, Mixolydian ♭7, Aeolian ♭3/♭6/♭7, Locrian ♭2/♭3/♭5/♭6/♭7) use flat spellings
  - G Dorian correctly shows "G A B♭ C D E F" (not "G A A♯ C D E F")
  - Major modes (Ionian, Lydian) continue using sharp spellings when needed
- **Chord Quality Suffix Handling**: Fixed transpose to extract pure root note from chord symbols (A♭m → A♭, Bm7 → B)
- **Fretboard Visualization Fix**: Updated /scales page fretboard rendering to display notes from scale array, preserving flat/sharp spellings
- **Comprehensive Verification**: Created test suite confirming all 7 modes, pentatonic scales, and various keys are 100% musically accurate

### Two-Hand Tapping Display Fixes (October 17, 2025)
- **Color Coding Correction**: Fixed tapping hand to show ALL orange markers (previously showed purple root + orange)
  - Base hand (left): Purple root note + blue finger positions
  - Tapping hand (right): ALL orange markers (no purple mixing)
- **Open String Support**: Fixed to include open strings (position 0) in marker rendering
- **Finger Number Labels**: All markers now display finger numbers (1-4) instead of generic "Tap" labels
- **Inline Style Implementation**: Replaced dynamic Tailwind classes with explicit hex color inline styles to ensure reliable rendering:
  - Orange tapping: #f97316 (rgb(249,115,22))
  - Purple root: #9333ea (rgb(147,51,234))
  - Blue fingers: #2563eb (rgb(37,99,235))
- **High Fret Rendering**: Added automatic fret position calculation for tapping chords (e.g., Bm7 at fret 7-12)

### Fretboard Diagram Overhaul
- **Complete Visual Learning System**: All guitar classroom lessons now feature accurate, comprehensive fretboard diagrams
- **Individual Note Display**: Single-note exercises (chromatic, spider) show one note per diagram with accurate labels (e.g., "Low E - Fret 1")
- **Complete Scale Coverage**: Pentatonic and blues scales display ALL 12 diagrams showing every note on every string
- **Accessibility Compliance**: All fretboard markers include aria-label, data-testid, and role="img" attributes for screen readers and automated testing
- **Accurate Labeling**: Diagram names precisely match displayed content (eliminated misleading multi-fret labels)
- **Muted String Clarity**: Single-string exercises correctly display only intended strings (no multiple open string artifacts)

### Enhanced Scale Section - Full Fretboard Visualization (October 17, 2025)
- **24-Fret Full Neck Display**: Extended fretboard visualization from 12 to 24 frets showing complete guitar neck
- **Interactive Toggle**: Switch between compact (12 frets) and full (24 frets) views with intuitive Maximize/Minimize button
- **Standard Fret Markers**: Gold dots at positions 3, 5, 7, 9, 12, 15, 17, 19, 21, 24 (double dots at 12 and 24) matching real guitar inlays
- **Octave Highlighting**: Root notes show full color, octaves show 70% opacity, scale notes show 40% opacity for pattern recognition
- **Fret Number Labels**: Bottom row displays fret numbers 1-24 for easy position reference
- **Visual Legend**: Comprehensive fretboard guide explaining root notes, octaves, scale notes, and fret markers
- **Horizontal Scroll**: Touch-optimized scrolling for viewing entire 24-fret neck on mobile devices
- **Preserved Accuracy**: All note spellings maintain flat/sharp accuracy from scale.notes array (Dorian/Phrygian use flats, Ionian/Lydian use sharps)
- **React Optimization**: Key-based re-rendering ensures smooth toggle transitions without stale DOM elements

### Two-Hand Tapping Classroom Lesson Rebuild (October 19, 2025)
- **Music Theory Foundation**: Completely rebuilt metal-11 tapping lesson with proper chord-scale relationships
- **Fretting Hand Role**: Clear explanation that left hand establishes harmonic foundation (root + chord tones)
- **Tapping Hand Role**: Right hand plays melodic scale intervals relative to the chord being held
- **Practical Examples**: Three detailed examples with fretboard positions:
  - E Major: Left hand holds E chord (E, B, G#), right hand taps E major scale notes (F#, A, B)
  - A Minor: Left hand holds Am chord (A, E, C), right hand taps A minor scale notes (B, D, F)
  - C Dominant 7th: Left hand holds C7 chord, right hand uses C Mixolydian mode (with Bb)
- **Technique Details**: Specific instructions for tap firmness, pull-off "snap" motion, and building speed
- **6 Subsections**: Expanded from 2 to 6 comprehensive subsections covering theory, examples, and practice methods
- **Scale Integration**: Added fretboard patterns showing left-hand chord shapes and scale info for tapping hand
- **Progressive Training**: Step-by-step tempo building from 60 BPM to 120+ BPM with metronome guidance

# External Dependencies

- **Database**: Neon Database (PostgreSQL).
- **UI Components**: Radix UI.
- **Payment Processing**: Stripe.
- **Authentication**: Replit Auth.
- **Fonts**: Google Fonts (Inter, Architects Daughter, DM Sans, Fira Code).
- **Development Tools**: TypeScript, ESLint, Prettier.