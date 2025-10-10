export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export interface LessonSubsection {
  id: string;
  title: string;
  content: string;
  technique?: string;
  tips?: string[];
}

export interface Lesson {
  id: string;
  genre: string;
  difficulty: DifficultyLevel;
  title: string;
  description: string;
  subsections: LessonSubsection[];
  isFree: boolean;
}

export const lessons: Lesson[] = [
  // METAL LESSONS
  {
    id: 'metal-beginner',
    genre: 'Metal',
    difficulty: 'beginner',
    title: 'Metal Basics: Power Chords & Palm Muting',
    description: 'Learn the foundation of metal guitar with power chords and palm muting technique',
    isFree: true,
    subsections: [
      {
        id: 'metal-beginner-1',
        title: 'Introduction to Power Chords',
        content: 'Power chords are the backbone of metal music. A power chord consists of just two notes: the root and the fifth. This creates a powerful, distorted sound that works perfectly with high-gain amplifiers.',
        technique: 'Place your index finger on the root note (low E string) and your ring finger two frets higher on the A string. Use your palm to mute the other strings.',
        tips: [
          'Keep your fingers arched to avoid muting adjacent strings',
          'Use the tip of your index finger for cleaner sound',
          'Practice moving power chords up and down the fretboard'
        ]
      },
      {
        id: 'metal-beginner-2',
        title: 'Palm Muting Technique',
        content: 'Palm muting creates the signature "chugga-chugga" sound in metal. Rest the edge of your picking hand lightly on the strings near the bridge while picking.',
        technique: 'Rest the edge of your palm (near your pinky) on the strings close to the bridge. Pick with a downward motion while maintaining light palm contact.',
        tips: [
          'Don\'t press too hard - you want to dampen, not completely mute',
          'Keep your wrist loose for faster alternate picking',
          'Practice with a metronome starting at 80 BPM'
        ]
      },
      {
        id: 'metal-beginner-3',
        title: 'Combining Power Chords with Palm Muting',
        content: 'Now combine both techniques! Play power chords with palm muting to create heavy, rhythmic riffs. This is the foundation of rhythm guitar in metal.',
        technique: 'Play E5 power chord (0-2-2-x-x-x) with palm muting for 4 beats, then A5 (x-0-2-2-x-x) for 4 beats. Use all downstrokes.',
        tips: [
          'Start slow and focus on consistency',
          'Gradually increase tempo as you get comfortable',
          'Listen to Metallica\'s "Enter Sandman" for reference'
        ]
      }
    ]
  },
  {
    id: 'metal-intermediate',
    genre: 'Metal',
    difficulty: 'intermediate',
    title: 'Galloping Rhythms & Triplet Picking',
    description: 'Master the galloping rhythm pattern used in classic metal bands like Iron Maiden',
    isFree: false,
    subsections: [
      {
        id: 'metal-intermediate-1',
        title: 'Understanding Galloping Rhythms',
        content: 'The gallop is a triplet-based rhythm pattern (down-down-up) that creates driving energy in metal music.',
        technique: 'Play one palm-muted downstroke, followed by two quick alternate-picked notes (down-up). This creates a "galloping" horse-like rhythm.',
        tips: [
          'Practice the pattern slowly: DOWN-down-up, DOWN-down-up',
          'Keep the first note accented and longer',
          'Iron Maiden\'s "The Trooper" is the definitive gallop example'
        ]
      },
      {
        id: 'metal-intermediate-2',
        title: 'Triplet Picking Patterns',
        content: 'Triplet picking divides each beat into three equal notes, creating fluid runs and fills.',
        technique: 'Practice groups of three notes per beat using strict alternate picking: down-up-down, down-up-down.',
        tips: [
          'Use a metronome with triplet subdivision',
          'Start at 60 BPM and gradually increase',
          'Focus on evenness of notes, not speed'
        ]
      },
      {
        id: 'metal-intermediate-3',
        title: 'Combining Gallops with Power Chords',
        content: 'Apply galloping rhythms to power chord progressions for authentic metal rhythm playing.',
        technique: 'Play E5 power chord with gallop rhythm (8 repetitions), then shift to D5 and A5 using the same pattern.',
        tips: [
          'Maintain palm muting throughout',
          'Keep your picking hand relaxed',
          'Memorize the pattern so it becomes automatic'
        ]
      }
    ]
  },
  {
    id: 'metal-advanced',
    genre: 'Metal',
    difficulty: 'advanced',
    title: 'Tremolo Picking & Speed Techniques',
    description: 'Develop extreme picking speed and control for thrash and death metal styles',
    isFree: false,
    subsections: [
      {
        id: 'metal-advanced-1',
        title: 'Tremolo Picking Fundamentals',
        content: 'Tremolo picking is rapid alternate picking on a single note or power chord, creating a sustained, aggressive sound.',
        technique: 'Hold a pick lightly and use minimal wrist motion. Pick as fast as possible with down-up strokes, focusing on evenness over speed.',
        tips: [
          'Keep pick movement minimal (1-2mm)',
          'Relax your grip - tension kills speed',
          'Practice with a metronome, increasing by 5 BPM weekly'
        ]
      },
      {
        id: 'metal-advanced-2',
        title: 'Building Speed Endurance',
        content: 'Speed requires both technique and stamina. Build endurance through progressive practice sessions.',
        technique: 'Practice tremolo picking in 30-second intervals with 30-second rests. Gradually increase duration to 2-minute intervals.',
        tips: [
          'Stop immediately if you feel pain',
          'Stretch your hands and wrists before practice',
          'Practice daily for best results'
        ]
      },
      {
        id: 'metal-advanced-3',
        title: 'Applying Speed to Riffs',
        content: 'Use tremolo picking in real musical contexts: riffs, transitions, and climactic sections.',
        technique: 'Create a simple three-chord progression and add tremolo picking sections between chord changes for dramatic effect.',
        tips: [
          'Don\'t overuse tremolo - save it for impact moments',
          'Combine with palm muting for different tones',
          'Study Slayer and Metallica for classic tremolo riffs'
        ]
      }
    ]
  },

  // JAZZ LESSONS
  {
    id: 'jazz-beginner',
    genre: 'Jazz',
    difficulty: 'beginner',
    title: 'Jazz Chord Voicings & Swing Feel',
    description: 'Introduction to jazz guitar with basic chord shapes and rhythm',
    isFree: true,
    subsections: [
      {
        id: 'jazz-beginner-1',
        title: 'Major 7th and Minor 7th Chords',
        content: 'Jazz uses extended chords that add color and sophistication. The Maj7 and min7 chords are the foundation.',
        technique: 'Cmaj7: x-3-2-0-0-0 (root on A string). Cmin7: x-3-1-3-4-3. Practice transitioning between these shapes.',
        tips: [
          'Use your thumb to mute the low E string',
          'Keep fingers curved for clean notes',
          'Listen to Wes Montgomery for classic jazz chord sound'
        ]
      },
      {
        id: 'jazz-beginner-2',
        title: 'Understanding Swing Rhythm',
        content: 'Swing feel is what makes jazz sound like jazz. Instead of even eighth notes, jazz uses a "long-short" triplet feel.',
        technique: 'Play eighth notes with a triplet subdivision: play the first and third note of each triplet, creating an uneven, swinging feel.',
        tips: [
          'Think "doo-BAH, doo-BAH" instead of even "da-da-da-da"',
          'Listen to jazz drummers to internalize the feel',
          'Practice with a metronome set to swing/shuffle mode'
        ]
      },
      {
        id: 'jazz-beginner-3',
        title: 'ii-V-I Progression Basics',
        content: 'The ii-V-I is the most important progression in jazz. In C major: Dm7 → G7 → Cmaj7.',
        technique: 'Play Dm7 (x-5-3-5-6-5), G7 (3-x-3-4-3-x), Cmaj7 (x-3-2-0-0-0) with swing rhythm.',
        tips: [
          'Strum once per chord, letting them ring',
          'Practice in all 12 keys for complete understanding',
          'This progression appears in thousands of jazz standards'
        ]
      }
    ]
  },
  {
    id: 'jazz-intermediate',
    genre: 'Jazz',
    difficulty: 'intermediate',
    title: 'Walking Bass Lines & Chord Melody',
    description: 'Create movement with walking bass and play melody with chords simultaneously',
    isFree: false,
    subsections: [
      {
        id: 'jazz-intermediate-1',
        title: 'Walking Bass Line Construction',
        content: 'Walking bass lines connect chords smoothly by playing one note per beat, targeting chord tones.',
        technique: 'For each chord, play: root on beat 1, approach the 5th, play the 5th on beat 3, approach the next chord\'s root.',
        tips: [
          'Use chromatic approach notes (half-step below target)',
          'Mix scale tones with chromatic passing tones',
          'Listen to Ray Brown and Ron Carter for inspiration'
        ]
      },
      {
        id: 'jazz-intermediate-2',
        title: 'Chord Melody Fundamentals',
        content: 'Chord melody combines melody notes with supporting harmony, allowing solo guitar performance.',
        technique: 'Take a simple melody and harmonize each note with a chord voicing that contains that melody note on top.',
        tips: [
          'Start with simple melodies like "Autumn Leaves"',
          'Keep melody on the highest string for clarity',
          'Use drop-2 voicings for smooth voice leading'
        ]
      },
      {
        id: 'jazz-intermediate-3',
        title: 'Combining Bass and Chords',
        content: 'Play bass notes on lower strings while comping chords on higher strings for full-sounding arrangements.',
        technique: 'Pluck bass note with thumb, then strum upper 3-4 strings with fingers for chord. Alternate for walking feel.',
        tips: [
          'Practice thumb independence exercises',
          'Start with slow tempos (60-80 BPM)',
          'Joe Pass is the master of this technique'
        ]
      }
    ]
  },
  {
    id: 'jazz-advanced',
    genre: 'Jazz',
    difficulty: 'advanced',
    title: 'Bebop Lines & Advanced Substitutions',
    description: 'Master complex bebop vocabulary and sophisticated harmonic substitutions',
    isFree: false,
    subsections: [
      {
        id: 'jazz-advanced-1',
        title: 'Bebop Scale Applications',
        content: 'Bebop scales add a chromatic passing tone to standard scales, allowing chord tones to fall on strong beats.',
        technique: 'Major bebop scale adds a chromatic note between 5 and 6. Practice ascending and descending through changes.',
        tips: [
          'Chord tones should land on beats 1 and 3',
          'Use bebop scales to outline chord progressions',
          'Transcribe Charlie Parker solos for authentic phrasing'
        ]
      },
      {
        id: 'jazz-advanced-2',
        title: 'Tritone Substitutions',
        content: 'Replace dominant 7th chords with another dominant 7th a tritone away for sophisticated harmony.',
        technique: 'Instead of G7 → C, play Db7 → C. Both chords share the same tritone (B and F) but create different color.',
        tips: [
          'Works best on dominant chords in ii-V-I progressions',
          'Creates smooth chromatic bass motion',
          'Common in modern jazz and bossa nova'
        ]
      },
      {
        id: 'jazz-advanced-3',
        title: 'Outside Playing Techniques',
        content: 'Create tension and release by temporarily playing "outside" the key, then resolving back.',
        technique: 'Play a phrase a half-step above or below the chord, then resolve to a chord tone. Creates chromatic tension.',
        tips: [
          'Outside phrases should be brief (1-2 beats)',
          'Always resolve clearly to inside notes',
          'John Scofield and Kurt Rosenwinkel use this extensively'
        ]
      }
    ]
  },

  // FLAMENCO LESSONS
  {
    id: 'flamenco-beginner',
    genre: 'Flamenco',
    difficulty: 'beginner',
    title: 'Rasgueado & Basic Flamenco Strumming',
    description: 'Learn the essential flamenco strumming technique and Phrygian mode',
    isFree: true,
    subsections: [
      {
        id: 'flamenco-beginner-1',
        title: 'Introduction to Rasgueado',
        content: 'Rasgueado is the rapid-fire flamenco strumming technique using individual finger flicks across the strings.',
        technique: 'Start with pinky, ring, middle, then index finger - each flicking outward in sequence. Practice slowly at first.',
        tips: [
          'Keep your hand relaxed near the sound hole',
          'Each finger should strike all 6 strings',
          'Start with p-a-m-i (thumb-ring-middle-index) pattern'
        ]
      },
      {
        id: 'flamenco-beginner-2',
        title: 'Phrygian Mode Basics',
        content: 'Flamenco commonly uses the Phrygian mode (minor scale with flatted 2nd). In E Phrygian: E-F-G-A-B-C-D.',
        technique: 'Play E Phrygian: 0-1-3-0-2-3-0-2 on high E string. Notice the exotic Spanish sound from the F natural (♭2).',
        tips: [
          'The ♭2 (F) to root (E) is the signature flamenco sound',
          'Practice the scale ascending and descending',
          'Common flamenco progression: Em-F-G-Am'
        ]
      },
      {
        id: 'flamenco-beginner-3',
        title: 'Basic Flamenco Progression',
        content: 'Learn the classic Andalusian cadence: Am-G-F-E (i-♭VII-♭VI-V in A minor Phrygian).',
        technique: 'Play Am (x-0-2-2-1-0), G (3-2-0-0-3-3), F (1-3-3-2-1-1), E (0-2-2-1-0-0) with rasgueado strumming.',
        tips: [
          'Accent the first beat of each chord change',
          'Let chords ring into each other slightly',
          'Listen to Paco de Lucía for authentic phrasing'
        ]
      }
    ]
  },
  {
    id: 'flamenco-intermediate',
    genre: 'Flamenco',
    difficulty: 'intermediate',
    title: 'Picado & Alzapúa Techniques',
    description: 'Master the flamenco scale-running and thumb techniques',
    isFree: false,
    subsections: [
      {
        id: 'flamenco-intermediate-1',
        title: 'Picado Technique (Scale Runs)',
        content: 'Picado is the rest-stroke technique for playing fast melodic lines using index and middle fingers alternately.',
        technique: 'Use strict i-m (index-middle) alternation. After plucking, let your finger rest on the next string (rest stroke).',
        tips: [
          'Keep fingers curved and motion from the knuckle',
          'Practice on a single string before moving across strings',
          'Start at 60 BPM, increase by 5 BPM when comfortable'
        ]
      },
      {
        id: 'flamenco-intermediate-2',
        title: 'Alzapúa Thumb Technique',
        content: 'Alzapúa uses the thumb for both downstrokes and upstrokes, creating powerful rhythmic patterns.',
        technique: 'Thumb down on bass note, then thumb up catching the treble strings, then individual finger notes. Pattern: down-up-i-down-up-m.',
        tips: [
          'Thumb should pivot at the base joint',
          'Common pattern: thumb bass note, thumb upstroke (3 strings), finger notes',
          'Used extensively in Bulerías and Tangos'
        ]
      },
      {
        id: 'flamenco-intermediate-3',
        title: 'Flamenco Tremolo',
        content: 'Flamenco tremolo uses four fingers (a-m-i-p) creating a sustained melodic line over accompaniment.',
        technique: 'Thumb plays bass note, then ring-middle-index-ring in quick succession on melody string. Pattern: p-a-m-i-a.',
        tips: [
          'Keep all four notes even in volume and timing',
          'Practice with metronome: one tick = full p-a-m-i-a pattern',
          'Francisco Tárrega\'s "Recuerdos de la Alhambra" is THE tremolo study'
        ]
      }
    ]
  },
  {
    id: 'flamenco-advanced',
    genre: 'Flamenco',
    difficulty: 'advanced',
    title: 'Compás & Advanced Palmas',
    description: 'Master the complex rhythmic cycles and hand-clapping patterns of flamenco',
    isFree: false,
    subsections: [
      {
        id: 'flamenco-advanced-1',
        title: 'Understanding Compás (12-Beat Cycle)',
        content: 'Most flamenco forms use a 12-beat cycle with specific accent patterns. Bulerías emphasizes beats 12-1-2-3-6-8-10.',
        technique: 'Count and clap the 12-beat cycle: 1-2-3-4-5-6-7-8-9-10-11-12, emphasizing the traditional accents.',
        tips: [
          'The 12-beat cycle is similar to two bars of 6/8 time',
          'Different palos (forms) accent different beats',
          'Listen to live flamenco to internalize the compás'
        ]
      },
      {
        id: 'flamenco-advanced-2',
        title: 'Palmas (Hand Clapping Patterns)',
        content: 'Palmas sordas (muted claps) and palmas fuertes (loud claps) create the percussion backbone of flamenco.',
        technique: 'Palmas sordas: clap with cupped hands. Palmas fuertes: flat hands, fingers striking opposite palm center.',
        tips: [
          'Sordas create the subtle pulse, fuertes accent important beats',
          'Practice patterns matching the 12-beat compás',
          'In ensemble playing, different people play interlocking patterns'
        ]
      },
      {
        id: 'flamenco-advanced-3',
        title: 'Falsetas & Improvisation',
        content: 'Falsetas are melodic interludes between sung verses. Learn to create variations on traditional themes.',
        technique: 'Take a traditional falseta and create variations: change octaves, add tremolo, alter rhythm while keeping harmonic structure.',
        tips: [
          'Study traditional falsetas before attempting improvisation',
          'Respect the compás - your falseta must fit the rhythmic cycle',
          'Transcribe Sabicas and Paco de Lucía falsetas for vocabulary'
        ]
      }
    ]
  },

  // BLUES LESSONS
  {
    id: 'blues-beginner',
    genre: 'Blues',
    difficulty: 'beginner',
    title: 'Blues Shuffle & 12-Bar Progression',
    description: 'Learn the foundational blues rhythm and chord progression',
    isFree: true,
    subsections: [
      {
        id: 'blues-beginner-1',
        title: 'The Blues Shuffle Pattern',
        content: 'The shuffle rhythm is the heartbeat of blues guitar. It creates that characteristic "swing" feel. For E blues: play E (fret 0) and C# (fret 4) on low E string with triplet swing: E-E-C#, E-E-C#.',
        technique: 'Play root note (6th string), then add the 6th interval on the same string (5 frets up), alternating with swing feel.',
        tips: [
          'Think "boom-ba-doom, boom-ba-doom" rhythm',
          'Keep the root note accented and longer',
          'Listen to Stevie Ray Vaughan for perfect shuffle feel'
        ]
      },
      {
        id: 'blues-beginner-2',
        title: '12-Bar Blues Progression',
        content: 'The 12-bar blues is the most important progression in blues music. Typically uses I-IV-V chords.',
        technique: 'In A: 4 bars of A7, 2 bars of D7, 2 bars of A7, 1 bar of E7, 1 bar of D7, 2 bars of A7.',
        tips: [
          'Each number represents one bar (4 beats)',
          'Use dominant 7th chords for authentic blues sound',
          'This progression repeats continuously'
        ]
      },
      {
        id: 'blues-beginner-3',
        title: 'Minor Pentatonic Scale',
        content: 'The minor pentatonic scale (5 notes) is the foundation for blues soloing.',
        technique: 'A minor pentatonic: 5-8 on low E, 5-7 on A, 5-7 on D, 5-7 on G, 5-8 on B, 5-8 on high E (box pattern at 5th fret).',
        tips: [
          'Learn the box pattern by heart',
          'Bend the notes for expressive blues phrasing',
          'This scale works over all three chords in A blues'
        ]
      }
    ]
  }
];

export const genres = [
  'Metal',
  'Jazz', 
  'Flamenco',
  'Blues',
  'Rock',
  'Folk',
  'Funk'
] as const;

export type GenreName = typeof genres[number];

export function getLessonsByGenre(genre: GenreName): Lesson[] {
  return lessons.filter(lesson => lesson.genre === genre);
}

export function getLessonById(id: string): Lesson | undefined {
  return lessons.find(lesson => lesson.id === id);
}
