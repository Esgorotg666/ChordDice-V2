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
    title: 'How to Hold a Guitar',
    description: 'Proper posture and guitar positioning fundamentals',
    fretboardPatterns: [],
    scales: [],
    subsections: [
      {
        id: 'general-1-1',
        title: 'Sitting Position',
        content: 'Learn the proper way to sit with a guitar. Keep your back straight, guitar body resting on your dominant leg, and neck angled slightly upward.',
        technique: 'Rest the guitar\'s lower bout on your strumming-hand side leg. Support the neck with your fretting hand, keeping a relaxed grip.',
        tips: ['Keep shoulders relaxed', 'Avoid slouching', 'Ensure you can see the fretboard clearly']
      },
      {
        id: 'general-1-2',
        title: 'Hand Position',
        content: 'Position your fretting hand thumb behind the neck, fingers curved over the fretboard. Strumming hand should hover over the sound hole.',
        technique: 'Thumb stays centered behind the neck. Fingers should be perpendicular to the fretboard for clean notes.',
        tips: ['Keep wrist straight', 'Don\'t grip too tight', 'Relax both hands']
      }
    ]
  },
  {
    id: 'general-2',
    difficulty: 'beginner',
    genre: 'general',
    title: 'Understanding the Fretboard',
    description: 'Learn the guitar neck, string names, and fret numbering',
    fretboardPatterns: [],
    scales: [],
    subsections: [
      {
        id: 'general-2-1',
        title: 'String Names',
        content: 'The six strings from thickest to thinnest are E-A-D-G-B-E. Remember with "Eddie Ate Dynamite, Good Bye Eddie".',
        technique: 'Count strings 6 to 1, with string 6 being the thickest (low E) and string 1 being the thinnest (high E).',
        tips: ['Practice saying string names aloud', 'Learn both counting directions', 'Use mnemonics to remember']
      },
      {
        id: 'general-2-2',
        title: 'Fret Numbers',
        content: 'Frets are numbered starting from the headstock. First fret is closest to the headstock, 12th fret is marked with double dots.',
        technique: 'Fret markers (dots) are typically at frets 3, 5, 7, 9, 12, 15, 17, 19, and 21.',
        tips: ['Use fret markers as landmarks', 'The 12th fret is the octave', 'Practice finding specific fret numbers']
      }
    ]
  },
  {
    id: 'general-3',
    difficulty: 'beginner',
    genre: 'general',
    title: 'Tuning Your Guitar',
    description: 'Standard tuning and how to use a tuner',
    fretboardPatterns: [],
    scales: [
      { name: 'Standard Tuning', pattern: 'E-A-D-G-B-E', notes: ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'] }
    ],
    subsections: [
      {
        id: 'general-3-1',
        title: 'Using a Tuner',
        content: 'Turn on your tuner, pluck a string, and adjust the tuning peg until the tuner shows you\'re in tune.',
        technique: 'Turn the peg clockwise to raise pitch, counter-clockwise to lower. Make small adjustments.',
        tips: ['Tune from lowest to highest string', 'Always tune up to pitch', 'Check tuning before each practice']
      }
    ]
  },
  {
    id: 'general-4',
    difficulty: 'beginner',
    genre: 'general',
    title: 'First Chord - E Minor',
    description: 'Your first open chord shape',
    fretboardPatterns: [
      { name: 'Em', positions: [0, 2, 2, 0, 0, 0], fingers: [null, 2, 3, null, null, null] }
    ],
    scales: [],
    subsections: [
      {
        id: 'general-4-1',
        title: 'Placing Your Fingers',
        content: 'Em only requires two fingers! Place your middle finger on the 2nd fret of the A string, and ring finger on the 2nd fret of the D string.',
        technique: 'Press down firmly just behind the fret wire. Keep fingers curved and fingertips perpendicular to the fretboard.',
        tips: ['Start slow', 'Listen for clean notes', 'Strum all six strings']
      }
    ]
  },
  {
    id: 'general-5',
    difficulty: 'beginner',
    genre: 'general',
    title: 'Strumming Basics',
    description: 'Learn downstrokes and basic rhythm',
    fretboardPatterns: [
      { name: 'Em', positions: [0, 2, 2, 0, 0, 0], fingers: [null, 2, 3, null, null, null] }
    ],
    scales: [],
    subsections: [
      {
        id: 'general-5-1',
        title: 'Downstroke Motion',
        content: 'Use a pick or your thumb to stroke downward across all strings in a smooth motion.',
        technique: 'Move from your elbow, not just your wrist. Let the pick glide across the strings.',
        tips: ['Practice with a metronome at 60 BPM', 'Keep strums even', 'Focus on consistent volume']
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
    title: 'Power Chords Foundation',
    description: 'Learn the basic two-note power chords used in rock',
    fretboardPatterns: [
      { name: 'E5', positions: [0, 2, 2, 'x', 'x', 'x'], fingers: [null, 1, 3, null, null, null] },
      { name: 'A5', positions: ['x', 0, 2, 2, 'x', 'x'], fingers: [null, null, 1, 3, null, null] }
    ],
    scales: [
      { name: 'E Minor Pentatonic', pattern: 'Root-b3-4-5-b7', notes: ['E', 'G', 'A', 'B', 'D'] }
    ],
    subsections: [
      {
        id: 'rock-1-1',
        title: 'What Are Power Chords?',
        content: 'Power chords consist of the root note and the perfect fifth interval. They have a strong, neutral sound perfect for distorted guitar.',
        technique: 'Use your index finger on the root and ring finger two frets up on the next string.',
        tips: ['Keep fingers arched', 'Mute unused strings with your palm', 'Practice clean transitions']
      }
    ]
  },
  {
    id: 'rock-2',
    difficulty: 'beginner',
    genre: 'rock',
    title: 'Basic Palm Muting',
    description: 'Master the palm muting technique for rock rhythm',
    fretboardPatterns: [
      { name: 'Muted E5', positions: [0, 2, 2, 'x', 'x', 'x'], fingers: [null, 1, 3, null, null, null] }
    ],
    scales: [],
    subsections: [
      {
        id: 'rock-2-1',
        title: 'Palm Muting Technique',
        content: 'Rest the edge of your picking hand on the strings near the bridge to create a dampened, percussive sound.',
        technique: 'Lightly touch the strings with the heel of your palm, about 1-2 inches from the bridge.',
        tips: ['Don\'t press too hard', 'Experiment with placement', 'Combine with power chords']
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
    title: 'Alternate Picking Speed',
    description: 'Develop speed and precision with alternate picking',
    fretboardPatterns: [],
    scales: [
      { name: 'E Phrygian Dominant', pattern: '1-b2-3-4-5-b6-b7', notes: ['E', 'F', 'G#', 'A', 'B', 'C', 'D'] }
    ],
    subsections: [
      {
        id: 'metal-1-1',
        title: 'Down-Up Motion',
        content: 'Alternate picking is the foundation of metal speed. Every note alternates between downstroke and upstroke.',
        technique: 'Start slow at 60 BPM, down-up-down-up on each note. Focus on even timing and attack.',
        tips: ['Keep pick motion small', 'Relax your grip', 'Gradually increase tempo']
      }
    ]
  },
  {
    id: 'metal-2',
    difficulty: 'intermediate',
    genre: 'metal',
    title: 'Galloping Rhythms',
    description: 'Master the iconic triplet gallop rhythm pattern',
    fretboardPatterns: [
      { name: 'E5', positions: [0, 2, 2, 'x', 'x', 'x'], fingers: [null, 1, 3, null, null, null] }
    ],
    scales: [],
    subsections: [
      {
        id: 'metal-2-1',
        title: 'Triplet Pattern',
        content: 'The gallop rhythm follows a down-down-up pattern on triplets, creating the signature Iron Maiden sound.',
        technique: 'Palm mute the first two notes of each triplet, let the third ring. Pattern: DOWN-DOWN-up.',
        tips: ['Practice with a metronome', 'Start at 80 BPM', 'Focus on the accent pattern']
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
    title: '12-Bar Blues Progression',
    description: 'Learn the foundational blues chord progression',
    fretboardPatterns: [
      { name: 'E7', positions: [0, 2, 0, 1, 0, 0], fingers: [null, 2, null, 1, null, null] },
      { name: 'A7', positions: ['x', 0, 2, 0, 2, 0], fingers: [null, null, 2, null, 3, null] },
      { name: 'B7', positions: ['x', 2, 1, 2, 0, 2], fingers: [null, 2, 1, 3, null, 4] }
    ],
    scales: [
      { name: 'E Blues Scale', pattern: '1-b3-4-b5-5-b7', notes: ['E', 'G', 'A', 'Bb', 'B', 'D'] }
    ],
    subsections: [
      {
        id: 'blues-1-1',
        title: 'The 12-Bar Structure',
        content: 'The 12-bar blues uses three chords (I, IV, V) in a specific 12-measure pattern. In E: E7-E7-E7-E7, A7-A7-E7-E7, B7-A7-E7-B7.',
        technique: 'Practice the chord changes slowly, making sure each chord rings clearly before moving to the next.',
        tips: ['Count the bars', 'Use a drum backing track', 'Focus on timing']
      }
    ]
  },
  {
    id: 'blues-2',
    difficulty: 'intermediate',
    genre: 'blues',
    title: 'String Bending',
    description: 'Master the expressive blues bending technique',
    fretboardPatterns: [],
    scales: [
      { name: 'A Minor Pentatonic', pattern: '1-b3-4-5-b7', notes: ['A', 'C', 'D', 'E', 'G'] }
    ],
    subsections: [
      {
        id: 'blues-2-1',
        title: 'Half-Step Bends',
        content: 'Push the string upward (or pull downward on higher strings) to raise the pitch by a half step (one fret).',
        technique: 'Use your ring finger supported by middle and index. Push with your wrist, not just fingers.',
        tips: ['Start with the G string', 'Listen for accurate pitch', 'Use multiple fingers for support']
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
    title: 'Jazz Chord Voicings',
    description: 'Learn essential jazz 7th chord shapes',
    fretboardPatterns: [
      { name: 'Cmaj7', positions: ['x', 3, 2, 0, 0, 0], fingers: [null, 3, 2, null, null, null] },
      { name: 'Dm7', positions: ['x', 'x', 0, 2, 1, 1], fingers: [null, null, null, 2, 1, 1] },
      { name: 'G7', positions: [3, 2, 0, 0, 0, 1], fingers: [3, 2, null, null, null, 1] }
    ],
    scales: [
      { name: 'C Major Scale', pattern: 'W-W-H-W-W-W-H', notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'] }
    ],
    subsections: [
      {
        id: 'jazz-1-1',
        title: 'ii-V-I Progression',
        content: 'The ii-V-I (Dm7-G7-Cmaj7) is the most important progression in jazz. It forms the backbone of countless standards.',
        technique: 'Practice smooth voice leading between chords. Keep common tones and move other notes by the smallest interval.',
        tips: ['Visualize chord tones', 'Practice in all keys', 'Use a metronome']
      }
    ]
  }
];

// Legacy exports for backward compatibility (to be updated in classroom.tsx)
export const beginnerLessons: Lesson[] = generalBeginnerLessons;
export const intermediateLessons: Lesson[] = [];
export const masteryLessons: Lesson[] = [];
