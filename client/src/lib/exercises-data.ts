export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Extreme';
export type ExerciseCategory = 
  | 'Chord Changes'
  | 'Chord to Scale'
  | 'Progressions'
  | 'Hammer-On/Pull-Off'
  | 'Tapping'
  | 'Arpeggios'
  | 'Triads & Modes'
  | 'Flamenco'
  | 'Rhythm'
  | 'Lead & Solo'
  | 'Metronome'
  | 'Practice Techniques';

export interface Exercise {
  id: string;
  title: string;
  category: ExerciseCategory;
  skillLevel: SkillLevel;
  description: string;
  whyImportant: string;
  instructions: string[];
  bpm?: { min: number; max: number };
  techniques?: string[];
  difficulty: number; // 1-10
}

export const exercises: Exercise[] = [
  // Chord Changes - Beginner
  {
    id: 'cc-01',
    title: 'Basic Open Chord Transitions',
    category: 'Chord Changes',
    skillLevel: 'Beginner',
    description: 'Practice smooth transitions between C, G, D, and Am chords',
    whyImportant: 'Foundation of rhythm guitar. Clean chord changes are essential for playing songs and maintaining tempo.',
    instructions: [
      'Start with C major chord, strum 4 times',
      'Switch to G major, strum 4 times',
      'Switch to D major, strum 4 times',
      'Switch to Am, strum 4 times',
      'Repeat slowly, focus on clean transitions'
    ],
    bpm: { min: 60, max: 100 },
    techniques: ['Open chords', 'Strumming', 'Finger placement'],
    difficulty: 2
  },
  {
    id: 'cc-02',
    title: 'Barre Chord Mastery',
    category: 'Chord Changes',
    skillLevel: 'Intermediate',
    description: 'Practice F, Bm, and other barre chord transitions',
    whyImportant: 'Barre chords unlock the entire fretboard and enable playing in any key.',
    instructions: [
      'Practice F major barre chord for 1 minute',
      'Switch between F and Bm slowly',
      'Add C to create F-Bm-C progression',
      'Increase speed gradually',
      'Focus on consistent pressure'
    ],
    bpm: { min: 70, max: 120 },
    techniques: ['Barre chords', 'Finger strength', 'Position shifts'],
    difficulty: 5
  },

  // Chord to Scale - Intermediate to Advanced
  {
    id: 'cs-01',
    title: 'C Major Scale to Chord Integration',
    category: 'Chord to Scale',
    skillLevel: 'Intermediate',
    description: 'Connect C major scale runs to C chord',
    whyImportant: 'Bridges rhythm and lead playing. Essential for creating melodic fills between chords.',
    instructions: [
      'Play C major chord',
      'Run up C major scale from 3rd fret',
      'Return to C chord',
      'Practice in rhythm: 2 beats chord, 2 beats scale',
      'Gradually increase tempo'
    ],
    bpm: { min: 80, max: 140 },
    techniques: ['Scale runs', 'Chord-scale connection', 'Timing'],
    difficulty: 6
  },
  {
    id: 'cs-02',
    title: 'Modal Scale Runs Over Chord Changes',
    category: 'Chord to Scale',
    skillLevel: 'Advanced',
    description: 'Use Dorian mode over minor chords, Mixolydian over dominant',
    whyImportant: 'Advanced harmonic understanding. Creates professional-sounding improvisations that match chord quality.',
    instructions: [
      'Play Dm chord, use D Dorian scale for run',
      'Switch to G7, use G Mixolydian',
      'Practice matching scale to chord quality',
      'Focus on target notes (3rd and 7th)',
      'Build melodic phrases'
    ],
    bpm: { min: 90, max: 160 },
    techniques: ['Modal playing', 'Chord tones', 'Advanced theory'],
    difficulty: 8
  },

  // Progressions
  {
    id: 'prog-01',
    title: 'I-IV-V Blues Progression',
    category: 'Progressions',
    skillLevel: 'Beginner',
    description: 'Master the foundational blues progression in A',
    whyImportant: 'The backbone of blues, rock, and countless popular songs. Understanding this progression is fundamental.',
    instructions: [
      'Play A7 for 4 bars',
      'Play D7 for 2 bars',
      'Return to A7 for 2 bars',
      'Play E7 for 1 bar, D7 for 1 bar',
      'End on A7 for 2 bars'
    ],
    bpm: { min: 60, max: 120 },
    techniques: ['12-bar blues', 'Dominant 7ths', 'Form structure'],
    difficulty: 3
  },
  {
    id: 'prog-02',
    title: 'Jazz II-V-I Voicings',
    category: 'Progressions',
    skillLevel: 'Extreme',
    description: 'Complex jazz voicings with extensions and alterations',
    whyImportant: 'The most important progression in jazz. Mastery opens up bebop, standards, and sophisticated harmonic movement.',
    instructions: [
      'Play Dm9 (ii)',
      'Switch to G13♭9 (V) with altered voicing',
      'Resolve to Cmaj9 (I)',
      'Practice voice leading between changes',
      'Add walking bass line underneath'
    ],
    bpm: { min: 100, max: 200 },
    techniques: ['Jazz voicings', 'Extensions', 'Voice leading', 'Walking bass'],
    difficulty: 10
  },

  // Hammer-On/Pull-Off
  {
    id: 'hp-01',
    title: 'Basic Hammer-On Exercise',
    category: 'Hammer-On/Pull-Off',
    skillLevel: 'Beginner',
    description: 'Single string hammer-ons to build finger strength',
    whyImportant: 'Creates smooth, legato phrases. Fundamental technique for speed and expressiveness.',
    instructions: [
      'Play 5th fret on high E string',
      'Hammer on to 7th fret without picking',
      'Repeat on each string',
      'Focus on clear tone from hammer',
      'Practice ascending and descending'
    ],
    bpm: { min: 60, max: 100 },
    techniques: ['Hammer-on', 'Finger strength', 'Legato'],
    difficulty: 3
  },
  {
    id: 'hp-02',
    title: 'Triad Hammer-Pull Combinations',
    category: 'Hammer-On/Pull-Off',
    skillLevel: 'Advanced',
    description: 'Combine hammers and pulls within triad shapes',
    whyImportant: 'Advanced legato playing. Creates fast, fluid runs that sound professional and effortless.',
    instructions: [
      'Play C major triad on strings 1-3',
      'Hammer and pull between each note',
      'Create rolling pattern: pick-hammer-pull',
      'Move through triad inversions',
      'Increase speed while maintaining clarity'
    ],
    bpm: { min: 100, max: 180 },
    techniques: ['Legato', 'Triads', 'Inversions', 'Speed building'],
    difficulty: 8
  },

  // Tapping
  {
    id: 'tap-01',
    title: 'Two-Hand Tapping Basics',
    category: 'Tapping',
    skillLevel: 'Intermediate',
    description: 'Learn fundamental tapping patterns on single string',
    whyImportant: 'Expands your range and creates unique sounds impossible with standard techniques.',
    instructions: [
      'Fret 5th fret with left hand',
      'Tap 12th fret with right hand index',
      'Pull off to 8th fret with left hand',
      'Practice rhythm: tap-pull-hammer pattern',
      'Move pattern across strings'
    ],
    bpm: { min: 70, max: 130 },
    techniques: ['Tapping', 'Two-hand technique', 'Pull-offs'],
    difficulty: 6
  },
  {
    id: 'tap-02',
    title: 'Van Halen Style Tapping Runs',
    category: 'Tapping',
    skillLevel: 'Extreme',
    description: 'Fast ascending and descending tapped arpeggios',
    whyImportant: 'Signature rock/metal technique. Showcases technical mastery and creates explosive solo moments.',
    instructions: [
      'Tap Am arpeggio: 5-12-8 pattern',
      'Move pattern across string sets',
      'Add string skipping for wider intervals',
      'Practice sweep tapping motion',
      'Build to "Eruption" speed'
    ],
    bpm: { min: 120, max: 200 },
    techniques: ['Advanced tapping', 'Arpeggios', 'String skipping', 'Speed'],
    difficulty: 10
  },

  // Arpeggios
  {
    id: 'arp-01',
    title: 'Major Triad Arpeggios',
    category: 'Arpeggios',
    skillLevel: 'Beginner',
    description: 'Practice basic major arpeggio shapes',
    whyImportant: 'Foundation of melodic playing. Arpeggios outline chords and create harmonic clarity in solos.',
    instructions: [
      'Play C major arpeggio: C-E-G ascending',
      'Use alternate picking',
      'Practice across 3 string sets',
      'Descend back down',
      'Keep notes clean and even'
    ],
    bpm: { min: 60, max: 110 },
    techniques: ['Arpeggios', 'Alternate picking', 'Chord tones'],
    difficulty: 4
  },
  {
    id: 'arp-02',
    title: 'Seven-Note Arpeggios with Tapping',
    category: 'Arpeggios',
    skillLevel: 'Extreme',
    description: 'Complex 7th chord arpeggios incorporating tapping',
    whyImportant: 'Ultimate arpeggio mastery. Combines advanced techniques for virtuosic, harmonically sophisticated lines.',
    instructions: [
      'Play Cmaj7 arpeggio: C-E-G-B',
      'Add tapped note at 17th fret',
      'Create sweeping motion through strings',
      'Practice all 7th chord qualities',
      'Build speed and precision'
    ],
    bpm: { min: 100, max: 180 },
    techniques: ['Extended arpeggios', 'Tapping', 'Sweep picking', '7th chords'],
    difficulty: 10
  },

  // Triads & Modes
  {
    id: 'tm-01',
    title: 'Triads Across the Fretboard',
    category: 'Triads & Modes',
    skillLevel: 'Intermediate',
    description: 'Learn triad inversions in all positions',
    whyImportant: 'Unlocks the fretboard. Understanding triads in every position enables melodic freedom and chord melody playing.',
    instructions: [
      'Play C major triad: root position (8-9-9)',
      'Move to 1st inversion (12-13-12)',
      'Play 2nd inversion (15-17-17)',
      'Connect positions smoothly',
      'Practice in all keys'
    ],
    bpm: { min: 80, max: 130 },
    techniques: ['Triads', 'Inversions', 'Position playing'],
    difficulty: 6
  },
  {
    id: 'tm-02',
    title: 'Modal Triads - Lydian & Phrygian',
    category: 'Triads & Modes',
    skillLevel: 'Advanced',
    description: 'Apply triads to exotic modes',
    whyImportant: 'Advanced harmonic color. Creates sophisticated, modern sounds used in jazz, fusion, and progressive music.',
    instructions: [
      'Play F Lydian mode over C major',
      'Emphasize F major triad with ♯4',
      'Switch to E Phrygian over Am',
      'Use E minor triad with ♭2',
      'Practice modal characteristic tones'
    ],
    bpm: { min: 90, max: 150 },
    techniques: ['Modes', 'Modal triads', 'Advanced theory', 'Color tones'],
    difficulty: 9
  },

  // Flamenco
  {
    id: 'flam-01',
    title: 'Flamenco Strumming Patterns (Rasgueado)',
    category: 'Flamenco',
    skillLevel: 'Intermediate',
    description: 'Learn the distinctive flamenco strum technique',
    whyImportant: 'Signature flamenco sound. Develops rhythmic precision and creates passionate, dramatic musical expression.',
    instructions: [
      'Fan fingers outward: pinky, ring, middle, index',
      'Strike strings in rapid succession',
      'Practice on E Phrygian chord (Am shape)',
      'Accent on first and last finger',
      'Build speed maintaining clarity'
    ],
    bpm: { min: 60, max: 140 },
    techniques: ['Rasgueado', 'Finger independence', 'Flamenco rhythm'],
    difficulty: 7
  },
  {
    id: 'flam-02',
    title: 'Flamenco Tremolo Technique',
    category: 'Flamenco',
    skillLevel: 'Extreme',
    description: 'Master the rapid-fire tremolo picking of flamenco',
    whyImportant: 'Pinnacle of classical/flamenco technique. Creates shimmering, sustained melody lines with incredible speed and control.',
    instructions: [
      'Use thumb for bass note',
      'Play melody with: ring-middle-index-ring-middle-index',
      'Maintain strict pattern: p-a-m-i-a-m-i',
      'Practice "Recuerdos de la Alhambra" pattern',
      'Build to 16th note speed'
    ],
    bpm: { min: 80, max: 160 },
    techniques: ['Tremolo', 'Classical technique', 'Finger patterns', 'Independence'],
    difficulty: 10
  },

  // Rhythm
  {
    id: 'rhythm-01',
    title: 'Basic Strumming Patterns',
    category: 'Rhythm',
    skillLevel: 'Beginner',
    description: 'Learn fundamental down-up strumming rhythms',
    whyImportant: 'Core of rhythm guitar. Solid strumming patterns are the foundation of playing with others and keeping time.',
    instructions: [
      'Practice down strokes on beats 1 and 3',
      'Add up strokes on "and" counts',
      'Try pattern: D-D-U-U-D-U',
      'Apply to C-G-Am-F progression',
      'Use metronome for accuracy'
    ],
    bpm: { min: 60, max: 120 },
    techniques: ['Strumming', 'Rhythm', 'Timing'],
    difficulty: 2
  },
  {
    id: 'rhythm-02',
    title: 'Syncopated Funk Rhythms',
    category: 'Rhythm',
    skillLevel: 'Advanced',
    description: 'Master off-beat funk strumming with muting',
    whyImportant: 'Creates groove and pocket. Essential for funk, R&B, and modern popular music styles.',
    instructions: [
      'Mute strings with palm',
      'Hit on "and" counts only',
      'Use wrist motion for percussive attack',
      'Practice "chucka-chucka" pattern',
      'Add ghost notes for groove'
    ],
    bpm: { min: 90, max: 130 },
    techniques: ['Funk rhythm', 'Muting', 'Syncopation', 'Groove'],
    difficulty: 8
  },

  // Lead & Solo
  {
    id: 'lead-01',
    title: 'Pentatonic Box Patterns',
    category: 'Lead & Solo',
    skillLevel: 'Beginner',
    description: 'Learn the 5 positions of minor pentatonic',
    whyImportant: 'Gateway to soloing. Pentatonic scale is the most versatile and commonly used scale in rock, blues, and pop.',
    instructions: [
      'Start with box 1 at 5th fret',
      'Practice ascending and descending',
      'Learn all 5 box patterns',
      'Connect patterns across fretboard',
      'Create simple melodic phrases'
    ],
    bpm: { min: 70, max: 110 },
    techniques: ['Pentatonic scale', 'Box patterns', 'Lead playing'],
    difficulty: 4
  },
  {
    id: 'lead-02',
    title: 'Advanced Solo Techniques: Bends, Vibrato, Slides',
    category: 'Lead & Solo',
    skillLevel: 'Advanced',
    description: 'Combine expressive techniques for emotional solos',
    whyImportant: 'Brings solos to life. These techniques add emotion, personality, and professional polish to lead playing.',
    instructions: [
      'Practice whole-step bends with vibrato',
      'Add slides between target notes',
      'Combine: bend-vibrato-release-slide',
      'Use hammer-ons and pull-offs for flow',
      'Create melodic phrases with all techniques'
    ],
    bpm: { min: 80, max: 140 },
    techniques: ['Bending', 'Vibrato', 'Slides', 'Expression'],
    difficulty: 8
  },
  {
    id: 'lead-03',
    title: 'Sweep Picking Arpeggios',
    category: 'Lead & Solo',
    skillLevel: 'Extreme',
    description: 'Master the sweeping motion for ultra-fast runs',
    whyImportant: 'Peak technical achievement. Creates blazing-fast arpeggio runs that define neoclassical and shred guitar.',
    instructions: [
      'Practice 3-string Am sweep: 5-8-9',
      'Use single picking motion through strings',
      'Mute strings immediately after playing',
      'Expand to 5-string sweeps',
      'Build to Yngwie Malmsteen speed'
    ],
    bpm: { min: 120, max: 200 },
    techniques: ['Sweep picking', 'Arpeggios', 'Speed', 'Neoclassical'],
    difficulty: 10
  },

  // Metronome Training
  {
    id: 'metro-01',
    title: 'Subdivision Practice',
    category: 'Metronome',
    skillLevel: 'Beginner',
    description: 'Practice quarter notes, 8ths, 16ths with metronome',
    whyImportant: 'Develops internal timing. Precision with metronome translates to tight, professional-sounding playing.',
    instructions: [
      'Set metronome to 80 BPM',
      'Play quarter notes on single note',
      'Switch to 8th notes',
      'Try 16th notes',
      'Focus on staying locked in'
    ],
    bpm: { min: 60, max: 120 },
    techniques: ['Timing', 'Subdivisions', 'Metronome practice'],
    difficulty: 3
  },
  {
    id: 'metro-02',
    title: 'Tempo Increase Training',
    category: 'Metronome',
    skillLevel: 'Advanced',
    description: 'Gradually build speed on difficult passages',
    whyImportant: 'Systematic speed building. The professional method for mastering fast, complex passages without sloppiness.',
    instructions: [
      'Choose difficult lick or passage',
      'Start at 60% of target tempo',
      'Play perfectly 10 times',
      'Increase by 5 BPM',
      'Repeat until target tempo achieved'
    ],
    bpm: { min: 60, max: 200 },
    techniques: ['Speed building', 'Precision', 'Practice methodology'],
    difficulty: 7
  },

  // Practice Techniques
  {
    id: 'practice-01',
    title: 'Loop & Perfect Method',
    category: 'Practice Techniques',
    skillLevel: 'Intermediate',
    description: 'Practice difficult sections in small loops',
    whyImportant: 'Most efficient practice method. Isolating problems and perfecting them creates rapid improvement.',
    instructions: [
      'Identify difficult 2-4 measure section',
      'Slow to comfortable tempo',
      'Loop section 20-30 times perfectly',
      'Gradually increase speed',
      'Integrate back into full piece'
    ],
    bpm: { min: 40, max: 140 },
    techniques: ['Practice methodology', 'Problem solving', 'Efficiency'],
    difficulty: 5
  },
  {
    id: 'practice-02',
    title: 'Variation Practice',
    category: 'Practice Techniques',
    skillLevel: 'Advanced',
    description: 'Practice licks with rhythmic and articulation variations',
    whyImportant: 'Develops mastery and musicality. Varying practice creates deeper understanding and creative flexibility.',
    instructions: [
      'Play lick in original form',
      'Play with all hammer-ons',
      'Play with dotted rhythm',
      'Play starting on upbeat',
      'Create 10 different variations'
    ],
    bpm: { min: 80, max: 150 },
    techniques: ['Creative practice', 'Variations', 'Mastery'],
    difficulty: 8
  },
  {
    id: 'practice-03',
    title: 'Blind Fretboard Visualization',
    category: 'Practice Techniques',
    skillLevel: 'Extreme',
    description: 'Play scales and arpeggios without looking',
    whyImportant: 'Ultimate fretboard mastery. Builds muscle memory and mental mapping for effortless, instinctive playing.',
    instructions: [
      'Close eyes or turn away from guitar',
      'Play C major scale from memory',
      'Move to arpeggios',
      'Practice chord shapes blind',
      'Navigate entire fretboard by feel'
    ],
    bpm: { min: 60, max: 120 },
    techniques: ['Muscle memory', 'Fretboard knowledge', 'Mental practice'],
    difficulty: 9
  }
];

// Helper functions
export const getExercisesByCategory = (category: ExerciseCategory): Exercise[] => {
  return exercises.filter(ex => ex.category === category);
};

export const getExercisesBySkillLevel = (level: SkillLevel): Exercise[] => {
  return exercises.filter(ex => ex.skillLevel === level);
};

export const getExercisesByDifficulty = (minDiff: number, maxDiff: number): Exercise[] => {
  return exercises.filter(ex => ex.difficulty >= minDiff && ex.difficulty <= maxDiff);
};

export const getAllCategories = (): ExerciseCategory[] => {
  return [
    'Chord Changes',
    'Chord to Scale',
    'Progressions',
    'Hammer-On/Pull-Off',
    'Tapping',
    'Arpeggios',
    'Triads & Modes',
    'Flamenco',
    'Rhythm',
    'Lead & Solo',
    'Metronome',
    'Practice Techniques'
  ];
};

export const getSkillLevels = (): SkillLevel[] => {
  return ['Beginner', 'Intermediate', 'Advanced', 'Extreme'];
};
