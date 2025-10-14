export type DifficultyLevel = 'beginner' | 'intermediate' | 'mastery';
export type GenreType = 'general' | 'rock' | 'metal' | 'blues' | 'jazz' | 'funk' | 'country' | 'neoclassical' | 'flamenco';

export interface FretboardPattern {
  name: string;
  positions: (number | 'x')[];  // Fret positions for each string (E A D G B e)
  fingers?: (number | null)[];   // Finger numbers
}

export interface ScaleInfo {
  name: string;
  pattern: string;  // e.g., "W-W-H-W-W-W-H" for major scale
  notes?: string[]; // Scale degrees or actual notes
}

export interface LessonSubsection {
  id: string;
  title: string;
  content: string;
  technique?: string;
  tips?: string[];
}

export interface Lesson {
  id: string;
  difficulty: DifficultyLevel;
  genre: GenreType;
  title: string;
  description: string;
  fretboardPatterns: FretboardPattern[];
  scales: ScaleInfo[];
  subsections: LessonSubsection[];
}

// GENERAL BEGINNER LESSONS - Learning to play guitar basics
export const generalBeginnerLessons: Lesson[] = [
  {
    id: 'general-1',
    difficulty: 'beginner',
    genre: 'general',
    title: 'First Finger Exercise - Chromatic',
    description: 'Build finger strength and dexterity with this foundational exercise',
    fretboardPatterns: [
      { name: 'Low E - Fret 1', positions: [1, 'x', 'x', 'x', 'x', 'x'], fingers: [1, 0, 0, 0, 0, 0] },
      { name: 'Low E - Fret 2', positions: [2, 'x', 'x', 'x', 'x', 'x'], fingers: [2, 0, 0, 0, 0, 0] },
      { name: 'Low E - Fret 3', positions: [3, 'x', 'x', 'x', 'x', 'x'], fingers: [3, 0, 0, 0, 0, 0] },
      { name: 'Low E - Fret 4', positions: [4, 'x', 'x', 'x', 'x', 'x'], fingers: [4, 0, 0, 0, 0, 0] }
    ],
    scales: [],
    subsections: [
      {
        id: 'general-1-1',
        title: 'One Finger Per Fret',
        content: 'Play frets 1-2-3-4 on the low E string only: 1st fret (index), 2nd fret (middle), 3rd fret (ring), 4th fret (pinky). Then repeat on A string, then D, G, B, and high E.',
        technique: 'Keep all fingers hovering over their assigned frets. When you press fret 1, fingers 2-3-4 should already be hovering over frets 2-3-4.',
        tips: ['Go SLOW at first', 'Keep fingers curved', 'Press just behind the fret wire', 'Practice 5 minutes daily']
      },
      {
        id: 'general-1-2',
        title: 'Complete Exercise',
        content: 'Do the 1-2-3-4 pattern on ALL strings: Low E: 1-2-3-4, A: 1-2-3-4, D: 1-2-3-4, G: 1-2-3-4, B: 1-2-3-4, High E: 1-2-3-4.',
        technique: 'Use alternate picking: down-up-down-up. Keep a steady rhythm, even if it\'s very slow.',
        tips: ['Start at 40 BPM', 'Increase speed gradually', 'Listen for clean notes']
      }
    ]
  },
  {
    id: 'general-2',
    difficulty: 'beginner',
    genre: 'general',
    title: 'Essential Open Chords - E, A, D',
    description: 'Master the three most important beginner chords',
    fretboardPatterns: [
      { name: 'E Major', positions: [0, 2, 2, 1, 0, 0], fingers: [0, 2, 3, 1, 0, 0] },
      { name: 'A Major', positions: ['x', 0, 2, 2, 2, 0], fingers: [0, 0, 1, 2, 3, 0] },
      { name: 'D Major', positions: ['x', 'x', 0, 2, 3, 2], fingers: [0, 0, 0, 1, 3, 2] }
    ],
    scales: [],
    subsections: [
      {
        id: 'general-2-1',
        title: 'E Major Chord',
        content: 'This is one of the easiest chords. Place: Index on G string fret 1, Middle on A string fret 2, Ring on D string fret 2. Strum all 6 strings.',
        technique: 'Keep fingers arched so they don\'t touch adjacent strings. Press firmly just behind the fret.',
        tips: ['Strum slowly and listen', 'Check each string rings clearly', 'Practice switching to A chord']
      },
      {
        id: 'general-2-2',
        title: 'A Major Chord',
        content: 'A is a bright, happy chord. Place all three fingers on the 2nd fret: Index on D, Middle on G, Ring on B. Don\'t play the low E string (X).',
        technique: 'Line up your three fingers in a row on fret 2. They should be close together.',
        tips: ['Mute low E with your thumb', 'Keep wrist relaxed', 'Practice E to A changes']
      },
      {
        id: 'general-2-3',
        title: 'D Major Chord',
        content: 'D is essential for thousands of songs. Index on G string fret 2, Ring on B string fret 3, Middle on high E fret 2. Play only the top 4 strings.',
        technique: 'Form a triangle shape with your fingers. Don\'t play the low E or A strings.',
        tips: ['Strum from the D string down', 'Keep fingers curved', 'Practice D to A to E progression']
      }
    ]
  },
  {
    id: 'general-3',
    difficulty: 'beginner',
    genre: 'general',
    title: 'Minor Chords - Em, Am, Dm',
    description: 'Learn sad/dark sounding minor chords',
    fretboardPatterns: [
      { name: 'E Minor', positions: [0, 2, 2, 0, 0, 0], fingers: [0, 2, 3, 0, 0, 0] },
      { name: 'A Minor', positions: ['x', 0, 2, 2, 1, 0], fingers: [0, 0, 2, 3, 1, 0] },
      { name: 'D Minor', positions: ['x', 'x', 0, 2, 3, 1], fingers: [0, 0, 0, 2, 3, 1] }
    ],
    scales: [
      { name: 'E Natural Minor Scale', pattern: 'W-H-W-W-H-W-W', notes: ['E', 'F#', 'G', 'A', 'B', 'C', 'D'] }
    ],
    subsections: [
      {
        id: 'general-3-1',
        title: 'E Minor - Easiest Chord',
        content: 'Em only needs 2 fingers! Middle on A string fret 2, Ring on D string fret 2. Strum all strings.',
        technique: 'This is usually the first chord beginners learn. Keep both fingers on the same fret.',
        tips: ['All 6 strings ring open or fretted', 'Compare sound to E major', 'Practice for smooth tone']
      },
      {
        id: 'general-3-2',
        title: 'A Minor Chord',
        content: 'Very similar to E. Middle on D fret 2, Ring on G fret 2, Index on B fret 1. Skip low E string.',
        technique: 'Arch your fingers so the open high E rings clearly.',
        tips: ['Contrast with A major sound', 'Practice Am to E changes', 'Keep steady rhythm']
      }
    ]
  },
  {
    id: 'general-4',
    difficulty: 'beginner',
    genre: 'general',
    title: 'G and C Major Chords',
    description: 'Two essential chords for thousands of songs',
    fretboardPatterns: [
      { name: 'G Major', positions: [3, 2, 0, 0, 0, 3], fingers: [3, 2, 0, 0, 0, 4] },
      { name: 'C Major', positions: ['x', 3, 2, 0, 1, 0], fingers: [0, 3, 2, 0, 1, 0] }
    ],
    scales: [],
    subsections: [
      {
        id: 'general-4-1',
        title: 'G Major - The Big Chord',
        content: 'Middle on low E fret 3, Index on A fret 2, Pinky on high E fret 3. Strum all 6 strings for a full, ringing sound.',
        technique: 'Stretch your pinky to reach the high E. Keep fingers arched so middle strings ring open.',
        tips: ['Pinky strength comes with practice', 'All 6 strings should ring', 'Common in rock and folk']
      },
      {
        id: 'general-4-2',
        title: 'C Major Chord',
        content: 'Ring on A fret 3, Middle on D fret 2, Index on B fret 1. Don\'t play the low E. This is a bright, clear chord.',
        technique: 'Stack fingers vertically - ring over middle over index. Keep them curved.',
        tips: ['Mute low E string', 'Practice G to C changes', 'Used in countless songs']
      }
    ]
  },
  {
    id: 'general-5',
    difficulty: 'beginner',
    genre: 'general',
    title: 'Pentatonic Scale - Box 1',
    description: 'Your first lead guitar scale for solos',
    fretboardPatterns: [
      { name: 'Low E - Fret 0', positions: [0, 'x', 'x', 'x', 'x', 'x'], fingers: [0, 0, 0, 0, 0, 0] },
      { name: 'Low E - Fret 3', positions: [3, 'x', 'x', 'x', 'x', 'x'], fingers: [4, 0, 0, 0, 0, 0] },
      { name: 'A - Fret 0', positions: ['x', 0, 'x', 'x', 'x', 'x'], fingers: [0, 0, 0, 0, 0, 0] },
      { name: 'A - Fret 2', positions: ['x', 2, 'x', 'x', 'x', 'x'], fingers: [0, 1, 0, 0, 0, 0] },
      { name: 'D - Fret 0', positions: ['x', 'x', 0, 'x', 'x', 'x'], fingers: [0, 0, 0, 0, 0, 0] },
      { name: 'D - Fret 2', positions: ['x', 'x', 2, 'x', 'x', 'x'], fingers: [0, 0, 1, 0, 0, 0] },
      { name: 'G - Fret 0', positions: ['x', 'x', 'x', 0, 'x', 'x'], fingers: [0, 0, 0, 0, 0, 0] },
      { name: 'G - Fret 2', positions: ['x', 'x', 'x', 2, 'x', 'x'], fingers: [0, 0, 0, 1, 0, 0] },
      { name: 'B - Fret 0', positions: ['x', 'x', 'x', 'x', 0, 'x'], fingers: [0, 0, 0, 0, 0, 0] },
      { name: 'B - Fret 3', positions: ['x', 'x', 'x', 'x', 3, 'x'], fingers: [0, 0, 0, 0, 4, 0] },
      { name: 'High E - Fret 0', positions: ['x', 'x', 'x', 'x', 'x', 0], fingers: [0, 0, 0, 0, 0, 0] },
      { name: 'High E - Fret 3', positions: ['x', 'x', 'x', 'x', 'x', 3], fingers: [0, 0, 0, 0, 0, 4] }
    ],
    scales: [
      { name: 'E Minor Pentatonic', pattern: 'Root-b3-4-5-b7', notes: ['E', 'G', 'A', 'B', 'D'] }
    ],
    subsections: [
      {
        id: 'general-5-1',
        title: 'Complete Box Pattern',
        content: 'The diagrams show every note in the scale. Low E: 0-3, A: 0-2, D: 0-2, G: 0-2, B: 0-3, High E: 0-3. Play both notes on each string.',
        technique: 'Open strings (0) and fret 2 use index finger. Fret 3 uses pinky. Hand stays in one position.',
        tips: ['This is THE most important scale pattern', 'Memorize the shape', 'Works for rock, blues, and metal']
      },
      {
        id: 'general-5-2',
        title: 'Practice Routine',
        content: 'Ascending: Start low E fret 0, play 3, move to A, play 0-2, move to D, play 0-2, etc. Descending: Reverse the pattern.',
        technique: 'Alternate picking throughout: down-up-down-up. Keep every note clean and even.',
        tips: ['Practice with metronome at 60 BPM', 'Use with E minor backing track', 'Try bending the high notes']
      }
    ]
  }
];

// ROCK GENRE LESSONS
export const rockLessons: Lesson[] = [
  {
    id: 'rock-1',
    difficulty: 'beginner',
    genre: 'rock',
    title: 'Power Chords - Essential Shapes',
    description: 'Master the foundation of rock guitar with power chords',
    fretboardPatterns: [
      { name: 'E5 Power Chord', positions: [0, 2, 2, 'x', 'x', 'x'], fingers: [0, 1, 3, 0, 0, 0] },
      { name: 'A5 Power Chord', positions: ['x', 0, 2, 2, 'x', 'x'], fingers: [0, 0, 1, 3, 0, 0] },
      { name: 'D5 Power Chord', positions: ['x', 'x', 0, 2, 3, 'x'], fingers: [0, 0, 0, 1, 3, 0] },
      { name: 'G5 Power Chord', positions: [3, 5, 5, 'x', 'x', 'x'], fingers: [1, 3, 4, 0, 0, 0] }
    ],
    scales: [
      { name: 'E Minor Pentatonic', pattern: 'Root-b3-4-5-b7', notes: ['E', 'G', 'A', 'B', 'D'] }
    ],
    subsections: [
      {
        id: 'rock-1-1',
        title: 'Two-Finger Power Chord',
        content: 'Index on root note, ring finger two frets higher on next string. Play only these 2 strings. E5: Low E open, A string fret 2.',
        technique: 'Mute the other 4 strings by lightly touching them with your index finger. Only 2 strings ring.',
        tips: ['Sounds great with distortion', 'Move this shape anywhere', 'Root note determines chord name']
      },
      {
        id: 'rock-1-2',
        title: 'Three-Finger Power Chord',
        content: 'Add pinky one string higher, same fret as ring finger. E5: Low E open, A fret 2, D fret 2. Bigger, fuller sound.',
        technique: 'Index-ring-pinky form a triangle. Bar ring and pinky together if easier.',
        tips: ['Adds octave for thickness', 'Mute unused strings', 'Practice E5-A5-D5 progression']
      },
      {
        id: 'rock-1-3',
        title: 'Movable Power Chords',
        content: 'Slide the same shape up the neck. Fret 3: G5, Fret 5: A5, Fret 7: B5. Learn fret names to play any chord.',
        technique: 'Keep shape locked as you slide. Mute with picking hand palm.',
        tips: ['Memorize fret names', 'Used in punk, metal, grunge', 'AC/DC uses these constantly']
      }
    ]
  },
  {
    id: 'rock-2',
    difficulty: 'intermediate',
    genre: 'rock',
    title: 'Classic Rock Riffs',
    description: 'Learn iconic rock riffs and techniques',
    fretboardPatterns: [
      { name: 'Smoke on Water Riff', positions: [0, 3, 5, 'x', 'x', 'x'], fingers: [0, 1, 3, 0, 0, 0] },
      { name: 'Iron Man Opening', positions: [2, 2, 2, 'x', 'x', 'x'], fingers: [1, 1, 1, 0, 0, 0] },
      { name: 'Seven Nation Army', positions: [0, 7, 5, 'x', 'x', 'x'], fingers: [0, 4, 2, 0, 0, 0] }
    ],
    scales: [],
    subsections: [
      {
        id: 'rock-2-1',
        title: 'Smoke on Water',
        content: 'Famous Deep Purple riff. A string: 0-3-5, then 0-3-6-5, then 0-3-5-3-0. Uses power chord shape.',
        technique: 'Use index and ring finger. Slide between frets smoothly. Palm mute slightly.',
        tips: ['Most famous riff ever', 'Great for beginners', 'Play with attitude']
      },
      {
        id: 'rock-2-2',
        title: 'String Bending Basics',
        content: 'Push string upward at fret 7 on G string. Bend up a whole step (2 frets worth). Creates expressive, vocal-like sound.',
        technique: 'Use ring finger to bend, support with middle and index behind it. Push toward ceiling.',
        tips: ['Start with light gauge strings', 'Bend in tune', 'Essential for blues and rock solos']
      }
    ]
  }
];

// METAL GENRE LESSONS
export const metalLessons: Lesson[] = [
  {
    id: 'metal-1',
    difficulty: 'intermediate',
    genre: 'metal',
    title: 'Chromatic Speed Exercise',
    description: 'Build shred speed with chromatic patterns',
    fretboardPatterns: [
      { name: 'Low E - Fret 5', positions: [5, 'x', 'x', 'x', 'x', 'x'], fingers: [1, 0, 0, 0, 0, 0] },
      { name: 'Low E - Fret 6', positions: [6, 'x', 'x', 'x', 'x', 'x'], fingers: [2, 0, 0, 0, 0, 0] },
      { name: 'Low E - Fret 7', positions: [7, 'x', 'x', 'x', 'x', 'x'], fingers: [3, 0, 0, 0, 0, 0] },
      { name: 'Low E - Fret 8', positions: [8, 'x', 'x', 'x', 'x', 'x'], fingers: [4, 0, 0, 0, 0, 0] }
    ],
    scales: [
      { name: 'E Phrygian Dominant', pattern: '1-b2-3-4-5-b6-b7', notes: ['E', 'F', 'G#', 'A', 'B', 'C', 'D'] }
    ],
    subsections: [
      {
        id: 'metal-1-1',
        title: 'Spider Exercise',
        content: 'Play on ONE string at a time: Low E: 5-6-7-8, then A: 5-6-7-8, then D: 5-6-7-8, continue on all strings. Each finger gets one fret.',
        technique: 'Keep all 4 fingers hovering over frets 5-6-7-8. Minimize finger lift. Alternate pick strictly: DOWN-UP-DOWN-UP.',
        tips: ['Start 60 BPM', 'Perfect for warm-ups', 'Builds finger independence']
      },
      {
        id: 'metal-1-2',
        title: 'Speed Building',
        content: 'After ascending (Low E to High E), descend back down. High E: 8-7-6-5, B: 8-7-6-5, G: 8-7-6-5, etc.',
        technique: 'Wrist should barely move. Small, controlled pick strokes. Every note must be clean and even.',
        tips: ['Used by Petrucci, Vai, Malmsteen', 'Increase tempo weekly', 'Record yourself']
      }
    ]
  },
  {
    id: 'metal-2',
    difficulty: 'intermediate',
    genre: 'metal',
    title: 'Palm Muted Gallops',
    description: 'Master the Iron Maiden gallop technique',
    fretboardPatterns: [
      { name: 'E5 Power Chord', positions: [0, 2, 2, 'x', 'x', 'x'], fingers: [0, 1, 3, 0, 0, 0] },
      { name: 'Low E - Open (Muted)', positions: [0, 'x', 'x', 'x', 'x', 'x'], fingers: [0, 0, 0, 0, 0, 0] },
      { name: 'A String - Open (Muted)', positions: ['x', 0, 'x', 'x', 'x', 'x'], fingers: [0, 0, 0, 0, 0, 0] }
    ],
    scales: [],
    subsections: [
      {
        id: 'metal-2-1',
        title: 'Gallop Rhythm Pattern',
        content: 'Palm mute: Down-Down-UP triplet. First 2 notes muted tight, third note rings. Like a horse galloping.',
        technique: 'Edge of palm on bridge. First 2 picks dead, lift palm for 3rd. Triplet feel: 1-2-3, 1-2-3.',
        tips: ['Classic Iron Maiden sound', 'Keep palm loose', 'Practice with "The Trooper"']
      },
      {
        id: 'metal-2-2',
        title: 'Speed Galloping',
        content: 'Same pattern at 140+ BPM. Open low E: DOWN-DOWN-up-DOWN-DOWN-up. Tight, aggressive, relentless.',
        technique: 'Wrist does the work, not arm. Palm stays planted. Only lift for accent notes.',
        tips: ['Start 100 BPM', 'Build to 160 BPM', 'Essential metal rhythm']
      }
    ]
  }
];

// BLUES GENRE LESSONS  
export const bluesLessons: Lesson[] = [
  {
    id: 'blues-1',
    difficulty: 'beginner',
    genre: 'blues',
    title: 'Blues Pentatonic Licks',
    description: 'Essential blues scale patterns and licks',
    fretboardPatterns: [
      { name: 'Low E - Fret 5', positions: [5, 'x', 'x', 'x', 'x', 'x'], fingers: [1, 0, 0, 0, 0, 0] },
      { name: 'Low E - Fret 8', positions: [8, 'x', 'x', 'x', 'x', 'x'], fingers: [4, 0, 0, 0, 0, 0] },
      { name: 'A - Fret 5', positions: ['x', 5, 'x', 'x', 'x', 'x'], fingers: [0, 1, 0, 0, 0, 0] },
      { name: 'A - Fret 7', positions: ['x', 7, 'x', 'x', 'x', 'x'], fingers: [0, 3, 0, 0, 0, 0] },
      { name: 'D - Fret 5', positions: ['x', 'x', 5, 'x', 'x', 'x'], fingers: [0, 0, 1, 0, 0, 0] },
      { name: 'D - Fret 7', positions: ['x', 'x', 7, 'x', 'x', 'x'], fingers: [0, 0, 3, 0, 0, 0] },
      { name: 'G - Fret 5', positions: ['x', 'x', 'x', 5, 'x', 'x'], fingers: [0, 0, 0, 1, 0, 0] },
      { name: 'G - Fret 7', positions: ['x', 'x', 'x', 7, 'x', 'x'], fingers: [0, 0, 0, 3, 0, 0] },
      { name: 'B - Fret 5', positions: ['x', 'x', 'x', 'x', 5, 'x'], fingers: [0, 0, 0, 0, 1, 0] },
      { name: 'B - Fret 8', positions: ['x', 'x', 'x', 'x', 8, 'x'], fingers: [0, 0, 0, 0, 4, 0] },
      { name: 'High E - Fret 5', positions: ['x', 'x', 'x', 'x', 'x', 5], fingers: [0, 0, 0, 0, 0, 1] },
      { name: 'High E - Fret 8', positions: ['x', 'x', 'x', 'x', 'x', 8], fingers: [0, 0, 0, 0, 0, 4] }
    ],
    scales: [
      { name: 'A Minor Pentatonic', pattern: 'Root-b3-4-5-b7', notes: ['A', 'C', 'D', 'E', 'G'] },
      { name: 'A Blues Scale', pattern: 'Root-b3-4-b5-5-b7', notes: ['A', 'C', 'D', 'Eb', 'E', 'G'] }
    ],
    subsections: [
      {
        id: 'blues-1-1',
        title: 'Complete Blues Box',
        content: 'All diagrams show every note. LOW E: 5-8, A: 5-7, D: 5-7, G: 5-7, B: 5-8, HIGH E: 5-8. Index on 5, ring on 7, pinky on 8.',
        technique: 'Hand stays at fret 5 position. Index stretches back for fret 5, ring for 7, pinky for 8.',
        tips: ['This is movable to any key', 'Fret 5 = A minor blues', 'Add bends on B and high E']
      },
      {
        id: 'blues-1-2',
        title: 'Classic B.B. King Lick',
        content: 'B string: BEND fret 8 up (whole step), release to 8, then 5, 8, 5. The diagrams show frets 5 and 8 on B string.',
        technique: 'Ring finger bends fret 8 upward. Support with middle and index. Bend equals fret 10 pitch.',
        tips: ['Bend slowly and in tune', 'Add vibrato while bent', 'Listen to "The Thrill is Gone" for reference']
      }
    ]
  },
  {
    id: 'blues-2',
    difficulty: 'intermediate',
    genre: 'blues',
    title: '12-Bar Blues Chords',
    description: 'Learn dominant 7th chords for authentic blues',
    fretboardPatterns: [
      { name: 'E7', positions: [0, 2, 0, 1, 0, 0], fingers: [0, 2, 0, 1, 0, 0] },
      { name: 'A7', positions: ['x', 0, 2, 0, 2, 0], fingers: [0, 0, 2, 0, 3, 0] },
      { name: 'B7', positions: ['x', 2, 1, 2, 0, 2], fingers: [0, 2, 1, 3, 0, 4] }
    ],
    scales: [
      { name: 'E Blues Scale', pattern: '1-b3-4-b5-5-b7', notes: ['E', 'G', 'A', 'Bb', 'B', 'D'] }
    ],
    subsections: [
      {
        id: 'blues-2-1',
        title: 'E7 Dominant Chord',
        content: 'Open low E, Middle on A fret 2, Index on G fret 1, open D, B, E. This is the I chord (E7) for a blues in E.',
        technique: 'Let all open strings ring. This chord has a bluesy, unresolved sound.',
        tips: ['Strum with swing feel', 'Adds tension to major', 'Foundation of blues']
      },
      {
        id: 'blues-2-2',
        title: '12-Bar Blues Pattern',
        content: '4 bars E7, 2 bars A7, 2 bars E7, 1 bar B7, 1 bar A7, 2 bars E7. This is the classic 12-bar blues.',
        technique: 'Count beats: 1-2-3-4 per bar. Switch chords on beat 1 of new measure.',
        tips: ['Use metronome at 80 BPM', 'Shuffle rhythm', 'Play with backing track']
      }
    ]
  }
];

// JAZZ GENRE LESSONS
export const jazzLessons: Lesson[] = [
  {
    id: 'jazz-1',
    difficulty: 'intermediate',
    genre: 'jazz',
    title: 'Jazz 7th Chord Shapes',
    description: 'Master essential maj7, min7, and dom7 voicings',
    fretboardPatterns: [
      { name: 'Cmaj7', positions: ['x', 3, 2, 0, 0, 0], fingers: [0, 3, 2, 0, 0, 0] },
      { name: 'Dm7', positions: ['x', 'x', 0, 2, 1, 1], fingers: [0, 0, 0, 2, 1, 1] },
      { name: 'G7', positions: [3, 2, 0, 0, 0, 1], fingers: [3, 2, 0, 0, 0, 1] },
      { name: 'Am7', positions: ['x', 0, 2, 0, 1, 0], fingers: [0, 0, 2, 0, 1, 0] }
    ],
    scales: [
      { name: 'C Major Scale', pattern: 'W-W-H-W-W-W-H', notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'] }
    ],
    subsections: [
      {
        id: 'jazz-1-1',
        title: 'Major 7th Voicing',
        content: 'Cmaj7: Ring on A fret 3, Middle on D fret 2, open G, B, E. Dreamy, sophisticated sound.',
        technique: 'Let the open strings ring. This chord has a lush, jazzy quality.',
        tips: ['Used in bossa nova', 'Different from C major', 'Listen to the 7th degree']
      },
      {
        id: 'jazz-1-2',
        title: 'Minor 7th Voicing',
        content: 'Dm7: Open D, Middle on G fret 2, Index bars B and high E at fret 1. Mellow, smooth minor sound.',
        technique: 'Bar with index lightly. Don\'t press too hard, just enough for both strings.',
        tips: ['Compare to regular Dm', 'Less sad, more jazzy', 'Essential for jazz']
      },
      {
        id: 'jazz-1-3',
        title: 'ii-V-I Progression',
        content: 'Dm7 (ii) → G7 (V) → Cmaj7 (I). The most important progression in jazz. Practice the changes smoothly.',
        technique: 'Keep fingers close to fretboard between changes. Minimize movement.',
        tips: ['Used in 90% of jazz songs', 'Practice all 12 keys', 'Add walking bass']
      }
    ]
  },
  {
    id: 'jazz-2',
    difficulty: 'mastery',
    genre: 'jazz',
    title: 'Jazz Arpeggios',
    description: 'Learn chord tone soloing with arpeggios',
    fretboardPatterns: [
      { name: 'Cmaj7 Arpeggio', positions: ['x', 3, 2, 0, 0, 3], fingers: [0, 2, 1, 0, 0, 4] },
      { name: 'Dm7 Arpeggio', positions: ['x', 'x', 0, 2, 1, 3], fingers: [0, 0, 0, 2, 1, 3] },
      { name: 'G7 Arpeggio', positions: [3, 2, 0, 0, 0, 1], fingers: [4, 3, 0, 0, 0, 1] }
    ],
    scales: [
      { name: 'Jazz Melodic Minor', pattern: '1-2-b3-4-5-6-7', notes: ['C', 'D', 'Eb', 'F', 'G', 'A', 'B'] }
    ],
    subsections: [
      {
        id: 'jazz-2-1',
        title: 'Chord Tone Targeting',
        content: 'Play the individual notes of a chord as a melody: C-E-G-B for Cmaj7. This outlines the harmony.',
        technique: 'Start on root, play up through 3rd, 5th, 7th. Then descend. Clean, articulate notes.',
        tips: ['Creates instant jazz sound', 'Target chord tones on beat 1', 'Connect with scale tones']
      },
      {
        id: 'jazz-2-2',
        title: 'Arpeggio Practice',
        content: 'Practice arpeggios ascending and descending through chord changes. Dm7 arpeggio → G7 arpeggio → Cmaj7 arpeggio.',
        technique: 'Use economy of motion. Find closest fingerings between chord changes.',
        tips: ['Wes Montgomery used this', 'Builds harmonic knowledge', 'Practice with backing tracks']
      }
    ]
  }
];

// Legacy exports for backward compatibility (to be updated in classroom.tsx)
export const beginnerLessons: Lesson[] = generalBeginnerLessons;
export const intermediateLessons: Lesson[] = [];
export const masteryLessons: Lesson[] = [];
