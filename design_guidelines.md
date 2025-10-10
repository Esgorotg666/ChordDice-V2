# Chord Dice Tapping Feature - Design Guidelines

## Design Approach: Material Design + Music App References
**Rationale**: Utility-focused music education tool requiring custom visualization components. Drawing from Material Design's mobile-first principles while referencing successful music apps like Ultimate Guitar and Fender Play for musical interface patterns.

## Core Design Elements

### A. Color Palette (Dark Mode Primary)

**Base Colors:**
- Background: 220 18% 12% (deep blue-gray)
- Surface: 220 15% 18% (elevated panels)
- Surface Elevated: 220 12% 22% (fretboard containers)

**Musical Theory Color-Coding:**
- Root Notes: 270 70% 60% (vibrant purple)
- Major Thirds: 200 85% 55% (bright cyan)
- Minor Thirds: 340 70% 55% (warm pink)
- Perfect Fifths: 160 60% 50% (mint green)
- Tapping Notes: 30 100% 60% (bold orange - high contrast for attention)

**UI Accents:**
- Primary CTA: 270 70% 60% (matches root notes for brand consistency)
- Text Primary: 0 0% 95%
- Text Secondary: 220 10% 65%

### B. Typography
**Fonts**: Inter (UI) via Google Fonts, JetBrains Mono (chord labels, fret numbers)

**Scale:**
- Headers: 24px/32px (font-semibold)
- Subheaders: 18px/24px (font-medium)
- Body: 15px/22px (font-normal)
- Chord Labels: 14px/20px (font-mono, tracking-wide)
- Fret Numbers: 12px/16px (font-mono, text-muted)

### C. Layout System
**Spacing Primitives**: Tailwind units of 2, 4, 6, 8, 12 for consistent rhythm

**Responsive Breakpoints:**
- Mobile (base): Stacked vertical layout, full-width fretboards
- Desktop (lg:): Side-by-side fretboards with 8-unit gap

**Container Strategy:**
- Feature Container: max-w-7xl mx-auto px-4
- Fretboard Containers: Flexible width, minimum 280px mobile

### D. Component Library

**1. Dual Fretboard Display**
- Container: Flex column (mobile) → Row (desktop), gap-8
- Each Fretboard Card: Rounded-2xl surface with p-6, subtle shadow
- Header Bar: Flex justify-between, includes chord name (18px semibold) + info icon
- Fretboard Grid: 6 strings (rows) × visible frets (columns), aspect ratio maintained
- String Lines: 1px dividers at 40% opacity
- Fret Markers: Dots at 3rd, 5th, 7th, 9th, 12th positions (subtle, 30% opacity)

**2. Note Visualization**
- Base Chord Notes: Circular dots (20px diameter), theory-coded colors, 90% opacity
- Tapping Notes: Larger circles (28px), orange with outer ring glow effect
- Finger Numbers: Centered within dots, 12px mono font, white text
- Open String Indicators: "O" above nut, 14px
- Muted Strings: "X" above nut, red-tinted

**3. Control Panel** (Below/Between Fretboards)
- Dice Button: 56px square, rounded-xl, primary color, rotation animation on tap
- Chord Info Pills: Inline-flex chips showing progression context (e.g., "I → V")
- Theory Toggle: Segmented control for color-coding on/off
- Playback Controls: Minimal icon buttons (play/pause, tempo)

**4. Educational Overlays**
- Interval Labels: Small badges floating near notes ("M3", "P5"), 11px, semi-transparent
- Tapping Pattern Indicator: Curved arrows showing suggested finger path
- Difficulty Badge: Top-right corner pill (Beginner/Intermediate/Advanced)

**5. Freemium UI Elements**
- Premium Lock Icons: 16px lock symbol on advanced tapping patterns
- Upgrade CTA: Fixed bottom sheet on mobile (slide-up), toast on desktop
- Feature Teaser: Blurred fretboard preview with "Unlock Pro Patterns" overlay

### E. Interaction Patterns

**Fretboard Interactivity:**
- Tap Note: Plays sound + subtle scale animation (1.1x)
- Long Press: Shows interval/theory info tooltip
- Swipe Fretboard: Navigate chord progression (mobile)

**Responsiveness:**
- Mobile: Fretboards stack vertically, base chord top, tapping below
- Tablet: Fretboards side-by-side when width > 768px
- Desktop: Max width constraint, centered layout with comfortable viewing distance

**Visual Feedback:**
- Active Note: Pulse animation (scale 1.0 → 1.15), 300ms ease
- Dice Roll: Shuffle animation, stagger note appearance
- Theory Highlight: Smooth color transitions (400ms) when toggling

### F. Micro-Animations
**Strategic Use Only:**
- Dice roll: 500ms rotation with bounce easing
- Note appearance: Staggered fade-in (50ms delay per note)
- Chord transition: Crossfade between fretboard states (300ms)
- NO scroll animations, NO parallax, NO decorative motion

## Implementation Notes

**Icons**: Heroicons via CDN (dice, play, lock, info-circle, adjustments)

**Fretboard Rendering**: Use CSS Grid for precise string/fret alignment, SVG for curved string lines if needed

**Color Accessibility**: All theory colors meet WCAG AA contrast on dark backgrounds, orange tapping notes meet AAA

**Touch Targets**: Minimum 44px for all interactive elements (notes, controls)

**Loading States**: Skeleton fretboards with shimmer effect during generation

**Empty States**: Friendly illustration + "Roll the dice to generate" message when no chord loaded