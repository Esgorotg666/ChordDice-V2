export type DifficultyLevel = 'beginner' | 'intermediate' | 'mastery';

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
  title: string;
  description: string;
  fretboardPatterns: FretboardPattern[];
  scales: ScaleInfo[];
  subsections: LessonSubsection[];
}

// BEGINNER LESSONS (15 total)
export const beginnerLessons: Lesson[] = [
  {
    id: 'beginner-1',
    difficulty: 'beginner',
    title: 'Power Chords Foundation',
    description: 'Learn the basic two-note power chords used in rock and metal',
    fretboardPatterns: [
      { name: 'E5', positions: [0, 2, 2, 'x', 'x', 'x'], fingers: [null, 1, 3, null, null, null] },
      { name: 'A5', positions: ['x', 0, 2, 2, 'x', 'x'], fingers: [null, null, 1, 3, null, null] }
    ],
    scales: [
      { name: 'E Minor Pentatonic', pattern: 'Root-b3-4-5-b7', notes: ['E', 'G', 'A', 'B', 'D'] }
    ],
    subsections: [
      {
        id: 'beginner-1-1',
        title: 'What Are Power Chords?',
        content: 'Power chords consist of the root note and the perfect fifth interval. They have a strong, neutral sound perfect for distorted guitar.',
        technique: 'Use your index finger on the root and ring finger two frets up on the next string.',
        tips: ['Keep fingers arched', 'Mute unused strings with your palm', 'Practice clean transitions']
      },
      {
        id: 'beginner-1-2',
        title: 'Playing E5 and A5',
        content: 'Start with open string power chords. E5 uses strings 6 and 5, A5 uses strings 5 and 4.',
        technique: 'For E5: open E string + 2nd fret A string. For A5: open A string + 2nd fret D string.',
        tips: ['Strike only the two strings involved', 'Listen for clean, ringing notes', 'Avoid hitting muted strings']
      },
      {
        id: 'beginner-1-3',
        title: 'Moving Power Chords',
        content: 'Learn to move the same shape up and down the fretboard to play different power chords.',
        technique: 'The shape stays the same - just slide to different frets. Each fret is a half-step higher.',
        tips: ['Practice sliding smoothly', 'Memorize power chord positions', 'Use a chromatic diagram as reference']
      }
    ]
  },
  {
    id: 'beginner-2',
    difficulty: 'beginner',
    title: 'Basic Palm Muting',
    description: 'Master the palm muting technique for rhythmic control',
    fretboardPatterns: [
      { name: 'Muted E5', positions: [0, 2, 2, 'x', 'x', 'x'], fingers: [null, 1, 3, null, null, null] }
    ],
    scales: [
      { name: 'E Blues Scale', pattern: 'Root-b3-4-b5-5-b7', notes: ['E', 'G', 'A', 'Bb', 'B', 'D'] }
    ],
    subsections: [
      {
        id: 'beginner-2-1',
        title: 'Palm Muting Technique',
        content: 'Rest the edge of your picking hand on the strings near the bridge to create a dampened, percussive sound.',
        technique: 'Lightly touch the strings with the heel of your palm, about 1-2 inches from the bridge.',
        tips: ['Don\'t press too hard', 'Experiment with placement', 'Combine with power chords']
      },
      {
        id: 'beginner-2-2',
        title: 'Rhythm Patterns',
        content: 'Practice simple eighth-note patterns with palm muting for rock rhythm guitar.',
        technique: 'Play steady downstrokes while maintaining light palm contact.',
        tips: ['Start slow at 60 BPM', 'Focus on evenness', 'Gradually increase tempo']
      },
      {
        id: 'beginner-2-3',
        title: 'Combining Techniques',
        content: 'Use palm muting with power chord changes to create dynamic rhythm parts.',
        technique: 'Alternate between muted and open power chords for contrast.',
        tips: ['Listen to AC/DC for examples', 'Practice with a metronome', 'Record yourself']
      }
    ]
  },
  {
    id: 'beginner-3',
    difficulty: 'beginner',
    title: 'Open Chords - Major Triads',
    description: 'Learn essential open position major chords',
    fretboardPatterns: [
      { name: 'C Major', positions: ['x', 3, 2, 0, 1, 0], fingers: [null, 3, 2, null, 1, null] },
      { name: 'G Major', positions: [3, 2, 0, 0, 0, 3], fingers: [2, 1, null, null, null, 3] }
    ],
    scales: [
      { name: 'C Major Scale', pattern: 'W-W-H-W-W-W-H', notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'] }
    ],
    subsections: [
      {
        id: 'beginner-3-1',
        title: 'C Major Chord',
        content: 'The C major chord is one of the most common chords in popular music.',
        technique: 'Place fingers on 3rd fret A string, 2nd fret D string, and 1st fret B string.',
        tips: ['Arch your fingers', 'Avoid touching adjacent strings', 'Strum from A string down']
      },
      {
        id: 'beginner-3-2',
        title: 'G Major Chord',
        content: 'G major uses all six strings and has a full, rich sound.',
        technique: 'Use fingers 2, 1, and 3 on the low E, A, and high E strings respectively.',
        tips: ['Make sure all strings ring clearly', 'Practice the finger stretch', 'Common in folk and rock']
      },
      {
        id: 'beginner-3-3',
        title: 'Chord Transitions',
        content: 'Practice smooth transitions between C and G major chords.',
        technique: 'Find common finger positions and move efficiently between chords.',
        tips: ['Practice slowly first', 'Use a metronome', 'Focus on minimal finger movement']
      }
    ]
  },
  {
    id: 'beginner-4',
    difficulty: 'beginner',
    title: 'Open Chords - Minor Triads',
    description: 'Master essential open position minor chords',
    fretboardPatterns: [
      { name: 'A Minor', positions: ['x', 0, 2, 2, 1, 0], fingers: [null, null, 2, 3, 1, null] },
      { name: 'E Minor', positions: [0, 2, 2, 0, 0, 0], fingers: [null, 1, 2, null, null, null] }
    ],
    scales: [
      { name: 'A Natural Minor', pattern: 'W-H-W-W-H-W-W', notes: ['A', 'B', 'C', 'D', 'E', 'F', 'G'] }
    ],
    subsections: [
      {
        id: 'beginner-4-1',
        title: 'Understanding Minor Chords',
        content: 'Minor chords have a darker, sadder quality compared to major chords.',
        technique: 'Minor chords have a flatted third interval, creating the characteristic sound.',
        tips: ['Compare with major chords', 'Notice the emotional difference', 'Used extensively in rock and blues']
      },
      {
        id: 'beginner-4-2',
        title: 'A Minor Chord',
        content: 'Am is one of the easiest chords to learn and very common in songs.',
        technique: 'Place fingers in a compact triangle shape on the D, G, and B strings.',
        tips: ['Very similar to E major shape', 'Strum from A string', 'Great for beginners']
      },
      {
        id: 'beginner-4-3',
        title: 'E Minor Chord',
        content: 'Em uses all six strings and is extremely common in rock music.',
        technique: 'Just two fingers on the A and D strings, 2nd fret.',
        tips: ['Easiest full chord to learn', 'Great for strumming', 'Works with many songs']
      }
    ]
  },
  {
    id: 'beginner-5',
    difficulty: 'beginner',
    title: 'Basic Strumming Patterns',
    description: 'Learn fundamental strumming rhythms',
    fretboardPatterns: [
      { name: 'D Major', positions: ['x', 'x', 0, 2, 3, 2], fingers: [null, null, null, 1, 3, 2] }
    ],
    scales: [
      { name: 'D Major Scale', pattern: 'W-W-H-W-W-W-H', notes: ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'] }
    ],
    subsections: [
      {
        id: 'beginner-5-1',
        title: 'Downstroke Strumming',
        content: 'Start with all downstrokes to develop rhythm and pick control.',
        technique: 'Use your elbow for motion, not just your wrist. Strum through all chord strings.',
        tips: ['Keep motion fluid', 'Match to metronome', 'Practice with open chords']
      },
      {
        id: 'beginner-5-2',
        title: 'Adding Upstrokes',
        content: 'Introduce upstrokes for eighth-note patterns.',
        technique: 'Down-up pattern creates twice as many strums per beat.',
        tips: ['Lighter touch on upstrokes', 'Maintain steady tempo', 'Count "1-and-2-and"']
      },
      {
        id: 'beginner-5-3',
        title: 'Common Patterns',
        content: 'Learn the most common strumming patterns used in popular music.',
        technique: 'Down-down-up-up-down-up is a classic pattern that fits many songs.',
        tips: ['Practice with different chords', 'Add dynamics', 'Make it musical']
      }
    ]
  },
  {
    id: 'beginner-6',
    difficulty: 'beginner',
    title: 'Chromatic Scale & Fretboard',
    description: 'Understand the chromatic scale and fretboard layout',
    fretboardPatterns: [
      { name: 'Chromatic Exercise', positions: [0, 1, 2, 3, 4, 5], fingers: [null, 1, 2, 3, 4, null] }
    ],
    scales: [
      { name: 'Chromatic Scale', pattern: 'All half-steps', notes: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'] }
    ],
    subsections: [
      {
        id: 'beginner-6-1',
        title: 'The Chromatic Scale',
        content: 'The chromatic scale includes all 12 notes in Western music, separated by half-steps.',
        technique: 'Play all 12 notes moving up one fret at a time on a single string.',
        tips: ['Each fret = one half-step', 'Memorize the note names', 'Foundation for all scales']
      },
      {
        id: 'beginner-6-2',
        title: 'Fretboard Navigation',
        content: 'Learn how notes repeat across the fretboard in different positions.',
        technique: 'The same note appears in multiple places on the fretboard.',
        tips: ['Learn octave shapes', 'Find patterns', 'Use fret markers as guides']
      },
      {
        id: 'beginner-6-3',
        title: 'Finger Exercises',
        content: 'Use chromatic patterns to build finger strength and independence.',
        technique: 'Play 1-2-3-4 pattern on each string, one finger per fret.',
        tips: ['Start slow', 'Keep fingers close to fretboard', 'Build up speed gradually']
      }
    ]
  },
  {
    id: 'beginner-7',
    difficulty: 'beginner',
    title: 'Simple Picking Patterns',
    description: 'Develop basic fingerpicking technique',
    fretboardPatterns: [
      { name: 'C Major Arpeggio', positions: ['x', 3, 2, 0, 1, 0], fingers: [null, 3, 2, null, 1, null] }
    ],
    scales: [
      { name: 'C Major Arpeggio', pattern: 'Root-3rd-5th', notes: ['C', 'E', 'G'] }
    ],
    subsections: [
      {
        id: 'beginner-7-1',
        title: 'Thumb and Finger Assignment',
        content: 'Learn which fingers pluck which strings in fingerstyle guitar.',
        technique: 'Thumb plays bass notes (E, A, D), fingers play treble strings (G, B, e).',
        tips: ['p = thumb', 'i = index', 'm = middle', 'a = ring finger']
      },
      {
        id: 'beginner-7-2',
        title: 'Basic Travis Pattern',
        content: 'The Travis picking pattern is fundamental to fingerstyle playing.',
        technique: 'Alternate bass notes with thumb while fingers play melody on treble strings.',
        tips: ['Start very slowly', 'Keep steady rhythm', 'Classic country/folk pattern']
      },
      {
        id: 'beginner-7-3',
        title: 'Arpeggio Picking',
        content: 'Play chord notes individually in sequence.',
        technique: 'Pluck each note of the chord separately in ascending or descending order.',
        tips: ['Creates flowing sound', 'Good for ballads', 'Practice with open chords']
      }
    ]
  },
  {
    id: 'beginner-8',
    difficulty: 'beginner',
    title: 'Barre Chord Fundamentals',
    description: 'Introduction to moveable barre chord shapes',
    fretboardPatterns: [
      { name: 'F Major Barre', positions: [1, 3, 3, 2, 1, 1], fingers: [1, 3, 4, 2, 1, 1] }
    ],
    scales: [
      { name: 'F Major Scale', pattern: 'W-W-H-W-W-W-H', notes: ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'] }
    ],
    subsections: [
      {
        id: 'beginner-8-1',
        title: 'The Barre Technique',
        content: 'Learn to use your index finger to press multiple strings simultaneously.',
        technique: 'Flatten your index finger across all six strings at the same fret.',
        tips: ['Use the side of your finger', 'Keep thumb behind neck', 'Requires finger strength']
      },
      {
        id: 'beginner-8-2',
        title: 'E Shape Barre Chord',
        content: 'The E-shape barre chord is based on the open E major shape.',
        technique: 'Barre across fret 1, then make an E major shape with remaining fingers.',
        tips: ['F major at fret 1', 'Move shape up for other chords', 'Practice holding barre']
      },
      {
        id: 'beginner-8-3',
        title: 'Building Finger Strength',
        content: 'Exercises to develop the strength needed for barre chords.',
        technique: 'Practice holding barre for 30 seconds, gradually increasing duration.',
        tips: ['Don\'t give up', 'Takes time to develop', 'Warm up before practicing']
      }
    ]
  },
  {
    id: 'beginner-9',
    difficulty: 'beginner',
    title: 'Alternate Picking Basics',
    description: 'Master down-up picking motion',
    fretboardPatterns: [
      { name: 'Single String Exercise', positions: [5, 7, 8, 5, 7, 8], fingers: [1, 3, 4, 1, 3, 4] }
    ],
    scales: [
      { name: 'G Major Pentatonic', pattern: 'Root-2-3-5-6', notes: ['G', 'A', 'B', 'D', 'E'] }
    ],
    subsections: [
      {
        id: 'beginner-9-1',
        title: 'Alternate Picking Technique',
        content: 'Alternate between downstrokes and upstrokes for maximum efficiency.',
        technique: 'Down-up-down-up pattern for every note, regardless of string changes.',
        tips: ['Keep pick angle consistent', 'Use wrist motion', 'Essential for speed']
      },
      {
        id: 'beginner-9-2',
        title: 'Single String Exercises',
        content: 'Practice alternate picking on one string before moving to multiple strings.',
        technique: 'Play chromatic pattern 1-2-3-4 with strict alternate picking.',
        tips: ['Start at 60 BPM', 'Increase speed gradually', 'Maintain pick depth']
      },
      {
        id: 'beginner-9-3',
        title: 'String Crossing',
        content: 'Learn to maintain alternate picking when changing strings.',
        technique: 'Continue down-up pattern even when moving to a new string.',
        tips: ['Don\'t break the pattern', 'Practice scales', 'Watch for economy of motion']
      }
    ]
  },
  {
    id: 'beginner-10',
    difficulty: 'beginner',
    title: 'Minor Pentatonic Scale',
    description: 'Learn the foundation scale for rock and blues lead guitar',
    fretboardPatterns: [
      { name: 'A Minor Pentatonic Box 1', positions: [5, 5, 5, 5, 5, 5], fingers: [1, 1, 1, 1, 1, 1] }
    ],
    scales: [
      { name: 'A Minor Pentatonic', pattern: 'Root-b3-4-5-b7', notes: ['A', 'C', 'D', 'E', 'G'] }
    ],
    subsections: [
      {
        id: 'beginner-10-1',
        title: 'Pentatonic Scale Structure',
        content: 'The pentatonic scale has 5 notes and is the backbone of rock/blues soloing.',
        technique: 'Learn the "box" pattern starting at the 5th fret for A minor pentatonic.',
        tips: ['Most important scale for rock', 'Easy to memorize', 'Sounds great over many chords']
      },
      {
        id: 'beginner-10-2',
        title: 'Box Position 1',
        content: 'Master the first box position of the minor pentatonic scale.',
        technique: 'Two notes per string pattern, starting with your index finger on the root.',
        tips: ['Practice ascending and descending', 'Memorize the pattern', 'Play along with backing tracks']
      },
      {
        id: 'beginner-10-3',
        title: 'Simple Licks',
        content: 'Create simple melodic phrases using the pentatonic scale.',
        technique: 'Combine scale notes in musical patterns, use bends and vibrato.',
        tips: ['Start with 3-4 note phrases', 'Repeat patterns', 'Add expression']
      }
    ]
  },
  {
    id: 'beginner-11',
    difficulty: 'beginner',
    title: 'String Bending Basics',
    description: 'Learn the expressive technique of string bending',
    fretboardPatterns: [
      { name: 'Bend Exercise', positions: ['x', 'x', 7, 'x', 'x', 'x'], fingers: [null, null, 3, null, null, null] }
    ],
    scales: [
      { name: 'E Minor Pentatonic', pattern: 'Root-b3-4-5-b7', notes: ['E', 'G', 'A', 'B', 'D'] }
    ],
    subsections: [
      {
        id: 'beginner-11-1',
        title: 'Bending Technique',
        content: 'Push or pull the string to raise its pitch, adding expression to your playing.',
        technique: 'Use your wrist to rotate and bend the string up (towards ceiling) or down.',
        tips: ['Support with multiple fingers', 'Bend with your wrist', 'Listen to target pitch']
      },
      {
        id: 'beginner-11-2',
        title: 'Half-Step Bends',
        content: 'Start with small bends, raising the pitch by one fret (half-step).',
        technique: 'Bend until the note sounds like the next fret up.',
        tips: ['Practice on G string', 'Compare to target note', 'Use ring finger']
      },
      {
        id: 'beginner-11-3',
        title: 'Whole-Step Bends',
        content: 'Bend the string up two frets (whole-step) for dramatic effect.',
        technique: 'Requires more finger strength, bend until pitch rises two frets.',
        tips: ['Very common in blues', 'Build strength gradually', 'Classic rock sound']
      }
    ]
  },
  {
    id: 'beginner-12',
    difficulty: 'beginner',
    title: 'Vibrato Technique',
    description: 'Add expressiveness with controlled vibrato',
    fretboardPatterns: [
      { name: 'Vibrato Exercise', positions: ['x', 'x', 'x', 7, 'x', 'x'], fingers: [null, null, null, 3, null, null] }
    ],
    scales: [
      { name: 'Blues Scale', pattern: 'Root-b3-4-b5-5-b7', notes: ['Various'] }
    ],
    subsections: [
      {
        id: 'beginner-12-1',
        title: 'What is Vibrato?',
        content: 'Vibrato is a slight, rapid variation in pitch that adds emotion to sustained notes.',
        technique: 'Shake the string up and down (or side to side) to create pitch oscillation.',
        tips: ['Like singing vibrato', 'Makes notes sing', 'Essential for expression']
      },
      {
        id: 'beginner-12-2',
        title: 'Wrist Vibrato',
        content: 'Use wrist rotation to create smooth, controlled vibrato.',
        technique: 'Rotate wrist back and forth to bend string slightly up and down.',
        tips: ['Keep it subtle', 'Match to musical context', 'Blues and rock standard']
      },
      {
        id: 'beginner-12-3',
        title: 'Speed and Width',
        content: 'Control vibrato speed (fast/slow) and width (subtle/wide).',
        technique: 'Adjust wrist motion speed and amplitude for different effects.',
        tips: ['Slow = emotional', 'Fast = intense', 'Match the mood']
      }
    ]
  },
  {
    id: 'beginner-13',
    difficulty: 'beginner',
    title: 'Rhythm Guitar Fundamentals',
    description: 'Understanding rhythm, timing, and groove',
    fretboardPatterns: [
      { name: 'Rhythm Exercise', positions: ['x', 'x', 'x', 5, 5, 5], fingers: [null, null, null, 1, 1, 1] }
    ],
    scales: [
      { name: 'Major Scale Rhythm', pattern: 'W-W-H-W-W-W-H', notes: ['Various'] }
    ],
    subsections: [
      {
        id: 'beginner-13-1',
        title: 'Understanding Time Signatures',
        content: '4/4 time means 4 beats per measure, with quarter note getting one beat.',
        technique: 'Count "1-2-3-4" and ensure chords align with beats.',
        tips: ['Most common time signature', 'Tap your foot', 'Internalize the pulse']
      },
      {
        id: 'beginner-13-2',
        title: 'Syncopation Basics',
        content: 'Emphasizing off-beats creates rhythmic interest.',
        technique: 'Accent the "and" counts between main beats.',
        tips: ['Creates groove', 'Funk and reggae use this', 'Practice with metronome']
      },
      {
        id: 'beginner-13-3',
        title: 'Chord Progression Playing',
        content: 'Combine chords with rhythm patterns to accompany songs.',
        technique: 'Play chord progressions with consistent strumming or picking patterns.',
        tips: ['Lock in with drummer', 'Support the song', 'Leave space']
      }
    ]
  },
  {
    id: 'beginner-14',
    difficulty: 'beginner',
    title: 'Hammer-Ons and Pull-Offs',
    description: 'Learn legato techniques for smooth playing',
    fretboardPatterns: [
      { name: 'Legato Exercise', positions: ['x', 'x', 5, 7, 'x', 'x'], fingers: [null, null, 1, 3, null, null] }
    ],
    scales: [
      { name: 'Legato Scale Pattern', pattern: 'Hammer-on/Pull-off combinations', notes: ['Various'] }
    ],
    subsections: [
      {
        id: 'beginner-14-1',
        title: 'Hammer-On Technique',
        content: 'Strike a fretted note, then "hammer" another finger down to sound a higher note.',
        technique: 'Pick the first note, then forcefully place next finger to sound second note.',
        tips: ['No pick for second note', 'Hammer with fingertip', 'Common in blues']
      },
      {
        id: 'beginner-14-2',
        title: 'Pull-Off Technique',
        content: 'Remove a fretting finger to sound a lower note without picking.',
        technique: 'Fret both notes, pick higher note, then pull finger off to sound lower note.',
        tips: ['Pull slightly to side', 'Lower note must be fretted', 'Creates smooth sound']
      },
      {
        id: 'beginner-14-3',
        title: 'Combining Techniques',
        content: 'Use hammer-ons and pull-offs together for fluid melodic lines.',
        technique: 'Chain hammer-ons and pull-offs: pick, hammer, pull, hammer, pull.',
        tips: ['Sounds like two hands', 'Increases speed', 'Legato playing']
      }
    ]
  },
  {
    id: 'beginner-15',
    difficulty: 'beginner',
    title: 'Simple Song Structure',
    description: 'Understand verse, chorus, and bridge sections',
    fretboardPatterns: [
      { name: 'I-IV-V Progression', positions: [0, 0, 0, 0, 0, 0], fingers: [null, null, null, null, null, null] }
    ],
    scales: [
      { name: 'Key Center Understanding', pattern: 'I-IV-V relationships', notes: ['Various'] }
    ],
    subsections: [
      {
        id: 'beginner-15-1',
        title: 'Song Sections',
        content: 'Most songs have distinct sections: Intro, Verse, Chorus, Bridge, Outro.',
        technique: 'Learn to identify and play different sections with appropriate dynamics.',
        tips: ['Verse = softer', 'Chorus = bigger', 'Bridge = different']
      },
      {
        id: 'beginner-15-2',
        title: 'The I-IV-V Progression',
        content: 'The most common chord progression in popular music.',
        technique: 'In key of C: C (I), F (IV), G (V) - countless songs use this.',
        tips: ['Foundation of rock', 'Blues standard', 'Easy to jam over']
      },
      {
        id: 'beginner-15-3',
        title: 'Playing Through Songs',
        content: 'Put it all together by playing complete songs from start to finish.',
        technique: 'Combine chords, rhythm, and technique to play full arrangements.',
        tips: ['Start with 3-chord songs', 'Build repertoire', 'Play along with recordings']
      }
    ]
  }
];

// INTERMEDIATE LESSONS (15 total)
export const intermediateLessons: Lesson[] = [
  {
    id: 'intermediate-1',
    difficulty: 'intermediate',
    title: 'Advanced Power Chord Techniques',
    description: 'Three-note power chords and palm muting variations',
    fretboardPatterns: [
      { name: 'E5 (3-note)', positions: [0, 2, 2, 4, 'x', 'x'], fingers: [null, 1, 2, 4, null, null] }
    ],
    scales: [
      { name: 'E Phrygian', pattern: 'H-W-W-W-H-W-W', notes: ['E', 'F', 'G', 'A', 'B', 'C', 'D'] }
    ],
    subsections: [
      {
        id: 'intermediate-1-1',
        title: 'Three-Note Power Chords',
        content: 'Add the octave to power chords for a fuller sound.',
        technique: 'Root, fifth, and octave create a thicker power chord voicing.',
        tips: ['More sustain', 'Fuller sound', 'Used in modern metal']
      },
      {
        id: 'intermediate-1-2',
        title: 'Galloping Palm Mute',
        content: 'The classic Iron Maiden gallop rhythm using palm muting.',
        technique: 'Down-down-up pattern with palm mute, lifting for accents.',
        tips: ['Practice with "The Trooper"', 'Keep tight rhythm', 'Triplet feel']
      },
      {
        id: 'intermediate-1-3',
        title: 'Power Chord Runs',
        content: 'Fast chromatic or scale-based power chord movements.',
        technique: 'Slide power chords quickly in sequence for dramatic effect.',
        tips: ['Thrash metal staple', 'Mute between chords', 'Build speed gradually']
      }
    ]
  },
  {
    id: 'intermediate-2',
    difficulty: 'intermediate',
    title: 'Seventh Chords',
    description: 'Dominant, major, and minor seventh chord voicings',
    fretboardPatterns: [
      { name: 'G7', positions: [3, 2, 0, 0, 0, 1], fingers: [3, 2, null, null, null, 1] },
      { name: 'Cmaj7', positions: ['x', 3, 2, 0, 0, 0], fingers: [null, 3, 2, null, null, null] }
    ],
    scales: [
      { name: 'Mixolydian Mode', pattern: 'W-W-H-W-W-H-W', notes: ['G', 'A', 'B', 'C', 'D', 'E', 'F'] }
    ],
    subsections: [
      {
        id: 'intermediate-2-1',
        title: 'Dominant Seventh Chords',
        content: 'The bluesy sound of dominant 7th chords (e.g., G7, D7).',
        technique: 'Add the flatted 7th to a major triad for blues/jazz flavor.',
        tips: ['Creates tension', 'Wants to resolve', 'Blues essential']
      },
      {
        id: 'intermediate-2-2',
        title: 'Major Seventh Chords',
        content: 'Lush, sophisticated sound for jazz and ballads.',
        technique: 'Add the natural 7th to major triad for dreamy quality.',
        tips: ['Softer than dom7', 'Jazz standard', 'Emotional depth']
      },
      {
        id: 'intermediate-2-3',
        title: 'Minor Seventh Chords',
        content: 'Smooth, jazzy minor chords with added depth.',
        technique: 'Add flatted 7th to minor triad for mellow vibe.',
        tips: ['Very common in jazz', 'Smooth transitions', 'ii-V-I progressions']
      }
    ]
  },
  {
    id: 'intermediate-3',
    difficulty: 'intermediate',
    title: 'Major Scale Modes',
    description: 'Introduction to the modal system',
    fretboardPatterns: [
      { name: 'C Ionian (Major)', positions: [8, 10, 12, 9, 10, 12], fingers: [1, 3, 4, 1, 2, 4] }
    ],
    scales: [
      { name: 'Ionian Mode', pattern: 'W-W-H-W-W-W-H', notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'] },
      { name: 'Dorian Mode', pattern: 'W-H-W-W-W-H-W', notes: ['D', 'E', 'F', 'G', 'A', 'B', 'C'] }
    ],
    subsections: [
      {
        id: 'intermediate-3-1',
        title: 'Understanding Modes',
        content: 'Modes are scales derived from different starting points of the major scale.',
        technique: 'Each mode has unique intervals creating different moods.',
        tips: ['7 modes total', 'Same notes, different emphasis', 'Jazz and fusion essential']
      },
      {
        id: 'intermediate-3-2',
        title: 'Ionian and Dorian',
        content: 'Learn the bright Ionian (major) and jazzy Dorian modes.',
        technique: 'Ionian = happy/bright, Dorian = jazzy minor with major 6th.',
        tips: ['Dorian = funk/fusion', 'Miles Davis used Dorian', 'Practice modal vamps']
      },
      {
        id: 'intermediate-3-3',
        title: 'Modal Applications',
        content: 'Use modes over chord progressions for sophisticated soloing.',
        technique: 'Match mode to chord quality (Dorian over minor 7th, etc.).',
        tips: ['Listen to modal jazz', 'Experiment with each mode', 'Hear the character']
      }
    ]
  },
  {
    id: 'intermediate-4',
    difficulty: 'intermediate',
    title: 'String Skipping Technique',
    description: 'Expand melodic possibilities with string skipping',
    fretboardPatterns: [
      { name: 'Skip Pattern', positions: [5, 'x', 5, 'x', 5, 'x'], fingers: [1, null, 1, null, 1, null] }
    ],
    scales: [
      { name: 'Arpeggio Patterns', pattern: 'Root-3rd-5th-octave', notes: ['Various'] }
    ],
    subsections: [
      {
        id: 'intermediate-4-1',
        title: 'String Skipping Basics',
        content: 'Jump over strings to create wide interval leaps.',
        technique: 'Alternate pick while intentionally skipping strings.',
        tips: ['Creates angular melodies', 'Modern technique', 'Requires pick accuracy']
      },
      {
        id: 'intermediate-4-2',
        title: 'Arpeggio Application',
        content: 'Use string skipping to play arpeggios across the fretboard.',
        technique: 'Play chord tones on non-adjacent strings for spread voicings.',
        tips: ['Practice slowly', 'Maintain alternate picking', 'Shred technique']
      },
      {
        id: 'intermediate-4-3',
        title: 'Musical Phrases',
        content: 'Create melodic lines using strategic string skips.',
        technique: 'Combine skipped and sequential notes for dynamic phrasing.',
        tips: ['Allan Holdsworth style', 'Modern jazz/fusion', 'Wide interval jumps']
      }
    ]
  },
  {
    id: 'intermediate-5',
    difficulty: 'intermediate',
    title: 'Sweep Picking Introduction',
    description: 'Begin learning the sweep picking technique',
    fretboardPatterns: [
      { name: '3-String Sweep', positions: ['x', 'x', 5, 4, 5, 'x'], fingers: [null, null, 2, 1, 3, null] }
    ],
    scales: [
      { name: 'Minor Arpeggio', pattern: 'Root-b3-5', notes: ['Am: A-C-E'] }
    ],
    subsections: [
      {
        id: 'intermediate-5-1',
        title: 'Sweep Picking Concept',
        content: 'Sweep picking uses a single pick stroke across multiple strings.',
        technique: 'Rake the pick across strings while fretting notes in sequence.',
        tips: ['One pick motion per string', 'Mute with fretting hand', 'Neo-classical staple']
      },
      {
        id: 'intermediate-5-2',
        title: 'Three-String Sweeps',
        content: 'Master small 3-string sweep shapes before expanding.',
        technique: 'Down-down-down or up-up-up across three adjacent strings.',
        tips: ['Start very slow', 'Each note must ring clear', 'Yngwie Malmsteen technique']
      },
      {
        id: 'intermediate-5-3',
        title: 'Coordination Exercises',
        content: 'Develop hand synchronization critical for sweep picking.',
        technique: 'Fretting hand must perfectly time with picking hand sweeps.',
        tips: ['Practice unplugged', 'Use metronome', 'Patience required']
      }
    ]
  },
  {
    id: 'intermediate-6',
    difficulty: 'intermediate',
    title: 'Hybrid Picking',
    description: 'Combine pick and fingers for versatile technique',
    fretboardPatterns: [
      { name: 'Hybrid Pattern', positions: [3, 'x', 0, 0, 0, 0], fingers: [1, null, null, null, null, null] }
    ],
    scales: [
      { name: 'Country Licks', pattern: 'Pentatonic with hybrid picking', notes: ['Various'] }
    ],
    subsections: [
      {
        id: 'intermediate-6-1',
        title: 'Hybrid Picking Basics',
        content: 'Use pick for bass notes and fingers for treble strings.',
        technique: 'Pick with thumb/index, use middle and ring fingers for higher strings.',
        tips: ['Country essential', 'Albert Lee style', 'Very versatile']
      },
      {
        id: 'intermediate-6-2',
        title: 'Chicken Picking',
        content: 'The classic country "chicken pickin\'" sound using hybrid technique.',
        technique: 'Snap strings with fingers for percussive, twangy attack.',
        tips: ['Brad Paisley uses this', 'Bright, snappy tone', 'Practice string snapping']
      },
      {
        id: 'intermediate-6-3',
        title: 'Expanding Possibilities',
        content: 'Play complex patterns impossible with just pick or just fingers.',
        technique: 'Arpeggios, pedal tones, and banjo-style rolls with hybrid picking.',
        tips: ['Opens new voicings', 'Faster arpeggios', 'Jazz and country crossover']
      }
    ]
  },
  {
    id: 'intermediate-7',
    difficulty: 'intermediate',
    title: 'Two-Hand Tapping Basics',
    description: 'Introduction to tapping with both hands on fretboard',
    fretboardPatterns: [
      { name: 'Basic Tap', positions: [5, 'x', 'x', 'x', 12, 'x'], fingers: [1, null, null, null, null, null] }
    ],
    scales: [
      { name: 'Tapping Patterns', pattern: 'Tap-Pull-Hammer sequences', notes: ['Various'] }
    ],
    subsections: [
      {
        id: 'intermediate-7-1',
        title: 'Tapping Technique',
        content: 'Use right hand fingers to tap notes on fretboard like a piano.',
        technique: 'Tap firmly with fingertip, then pull off to sound lower notes.',
        tips: ['Eddie Van Halen popularized', 'Creates cascading runs', 'High gain helps']
      },
      {
        id: 'intermediate-7-2',
        title: 'Tap-Pull-Hammer Pattern',
        content: 'The fundamental tapping pattern combining all legato techniques.',
        technique: 'Tap high note, pull to middle, hammer to low, repeat.',
        tips: ['Practice on one string', 'Build speed slowly', '"Eruption" style']
      },
      {
        id: 'intermediate-7-3',
        title: 'Musical Applications',
        content: 'Create musical phrases and arpeggios with tapping.',
        technique: 'Use tapping for wide interval jumps and fast scalar runs.',
        tips: ['Not just for show', 'Can be melodic', 'Shred essential']
      }
    ]
  },
  {
    id: 'intermediate-8',
    difficulty: 'intermediate',
    title: 'Advanced Bending',
    description: 'Pre-bends, reverse bends, and unison bends',
    fretboardPatterns: [
      { name: 'Unison Bend', positions: ['x', 'x', 7, 7, 'x', 'x'], fingers: [null, null, 3, 1, null, null] }
    ],
    scales: [
      { name: 'Blues Bends', pattern: 'Target note bending', notes: ['Various blues licks'] }
    ],
    subsections: [
      {
        id: 'intermediate-8-1',
        title: 'Pre-Bend Technique',
        content: 'Bend the string before picking, then release to lower pitch.',
        technique: 'Bend string silently, pick, then release for descending effect.',
        tips: ['Reverse of normal bend', 'Creates unique sound', 'Blues and country use']
      },
      {
        id: 'intermediate-8-2',
        title: 'Unison Bends',
        content: 'Bend one string to match pitch of adjacent fretted string.',
        technique: 'Bend G string at fret 7 to match B string fret 8 pitch.',
        tips: ['Sweet harmonic effect', 'B.B. King signature', 'Practice pitch matching']
      },
      {
        id: 'intermediate-8-3',
        title: 'Expressive Bending',
        content: 'Control bend speed and vibrato for maximum expression.',
        technique: 'Vary bend speed, add vibrato at peak, control release.',
        tips: ['Slow bends = emotional', 'Fast bends = aggressive', 'Listen to Gilmour']
      }
    ]
  },
  {
    id: 'intermediate-9',
    difficulty: 'intermediate',
    title: 'Harmonic Minor Scale',
    description: 'Explore the exotic harmonic minor sound',
    fretboardPatterns: [
      { name: 'A Harmonic Minor', positions: [5, 7, 8, 5, 6, 8], fingers: [1, 3, 4, 1, 2, 4] }
    ],
    scales: [
      { name: 'Harmonic Minor', pattern: 'W-H-W-W-H-1.5-H', notes: ['A', 'B', 'C', 'D', 'E', 'F', 'G#'] }
    ],
    subsections: [
      {
        id: 'intermediate-9-1',
        title: 'Harmonic Minor Structure',
        content: 'Natural minor with raised 7th creates Middle Eastern/classical flavor.',
        technique: 'Interval pattern includes exotic 1.5-step (3 frets) gap.',
        tips: ['Sounds exotic', 'Classical music uses this', 'Yngwie Malmsteen favorite']
      },
      {
        id: 'intermediate-9-2',
        title: 'Scale Applications',
        content: 'Use over minor chords for dramatic, classical sound.',
        technique: 'Works great over i-V progressions in minor keys.',
        tips: ['Neo-classical metal', 'Flamenco guitar', 'Creates tension']
      },
      {
        id: 'intermediate-9-3',
        title: 'Five Positions',
        content: 'Learn all five positions across the fretboard.',
        technique: 'Connect positions for seamless scalar runs anywhere on neck.',
        tips: ['Practice in sequence', 'Visualize patterns', 'Use with modes']
      }
    ]
  },
  {
    id: 'intermediate-10',
    difficulty: 'intermediate',
    title: 'Extended Chords',
    description: '9th, 11th, and 13th chord voicings',
    fretboardPatterns: [
      { name: 'Dm9', positions: ['x', 'x', 0, 2, 1, 0], fingers: [null, null, null, 2, 1, null] }
    ],
    scales: [
      { name: 'Chord Tone Theory', pattern: '9th-11th-13th extensions', notes: ['Various'] }
    ],
    subsections: [
      {
        id: 'intermediate-10-1',
        title: 'Understanding Extensions',
        content: 'Extended chords add 9th, 11th, or 13th for color and complexity.',
        technique: '9th = 2nd octave up, 11th = 4th octave up, 13th = 6th octave up.',
        tips: ['Jazz essential', 'Adds sophistication', 'Voice carefully']
      },
      {
        id: 'intermediate-10-2',
        title: 'Ninth Chords',
        content: 'Add the 9th (2nd) for jazzy, sophisticated harmony.',
        technique: 'Dominant 9th, major 9th, minor 9th voicings.',
        tips: ['Very common in jazz', 'Lush sound', 'Hendrix used dom9']
      },
      {
        id: 'intermediate-10-3',
        title: 'Practical Voicings',
        content: 'Learn playable extended chord shapes on guitar.',
        technique: 'Often omit 5th or root to make room for extensions.',
        tips: ['Drop 2 voicings', 'Jazz comping', 'Modern harmony']
      }
    ]
  },
  {
    id: 'intermediate-11',
    difficulty: 'intermediate',
    title: 'Octaves and Double Stops',
    description: 'Play two-note harmonies for thick sound',
    fretboardPatterns: [
      { name: 'Octave Shape', positions: [3, 'x', 5, 'x', 'x', 'x'], fingers: [1, null, 3, null, null, null] }
    ],
    scales: [
      { name: 'Intervallic Playing', pattern: 'Octaves and harmonized melodies', notes: ['Various'] }
    ],
    subsections: [
      {
        id: 'intermediate-11-1',
        title: 'Octave Shapes',
        content: 'Play the same note two octaves apart for thick melodic lines.',
        technique: 'Mute middle string, fret notes on outer strings.',
        tips: ['Wes Montgomery style', 'Fat lead tone', 'Jazz standard']
      },
      {
        id: 'intermediate-11-2',
        title: 'Double Stop Technique',
        content: 'Play two notes simultaneously for harmonic depth.',
        technique: 'Common intervals: 3rds, 4ths, 5ths, 6ths.',
        tips: ['Country lead staple', 'Blues essential', 'Chuck Berry style']
      },
      {
        id: 'intermediate-11-3',
        title: 'Creating Melodies',
        content: 'Use octaves and double stops for memorable melodic hooks.',
        technique: 'Combine with bends and slides for expressive playing.',
        tips: ['Iconic sound', 'Allman Brothers', 'Dual guitar harmonies']
      }
    ]
  },
  {
    id: 'intermediate-12',
    difficulty: 'intermediate',
    title: 'Slap and Pop Technique',
    description: 'Percussive funk techniques adapted for guitar',
    fretboardPatterns: [
      { name: 'Slap Pattern', positions: [0, 0, 0, 0, 0, 0], fingers: [null, null, null, null, null, null] }
    ],
    scales: [
      { name: 'Funk Rhythms', pattern: 'Percussive and syncopated', notes: ['Various'] }
    ],
    subsections: [
      {
        id: 'intermediate-12-1',
        title: 'Slap Technique',
        content: 'Strike strings with thumb for percussive bass notes.',
        technique: 'Bounce thumb off strings near neck pickup.',
        tips: ['Larry Graham inspired', 'Funk essential', 'Percussive rhythm']
      },
      {
        id: 'intermediate-12-2',
        title: 'Pop Technique',
        content: 'Pull and release strings for snapping pop sound.',
        technique: 'Hook finger under string and pull up sharply.',
        tips: ['Treble strings', 'Complements slap', 'Flea uses this']
      },
      {
        id: 'intermediate-12-3',
        title: 'Groove Application',
        content: 'Combine slap and pop for funky bass-like guitar grooves.',
        technique: 'Alternate bass slaps with treble pops rhythmically.',
        tips: ['Mark King style', 'Very rhythmic', 'Practice with funk tracks']
      }
    ]
  },
  {
    id: 'intermediate-13',
    difficulty: 'intermediate',
    title: 'Tritone Substitution',
    description: 'Advanced harmonic substitution for jazz',
    fretboardPatterns: [
      { name: 'Tritone Sub', positions: [6, 8, 6, 7, 6, 6], fingers: [1, 4, 1, 2, 1, 1] }
    ],
    scales: [
      { name: 'Altered Scale', pattern: 'H-W-H-W-W-W-W', notes: ['Db', 'D', 'E', 'F', 'G', 'A', 'B'] }
    ],
    subsections: [
      {
        id: 'intermediate-13-1',
        title: 'Tritone Theory',
        content: 'Substitute a dominant chord with another a tritone away.',
        technique: 'Replace G7 with Db7 - they share the same tritone interval.',
        tips: ['Creates chromatic movement', 'Jazz standard', 'Sounds sophisticated']
      },
      {
        id: 'intermediate-13-2',
        title: 'Practical Application',
        content: 'Use tritone subs in ii-V-I progressions.',
        technique: 'Dm7 - Db7 - Cmaj7 instead of Dm7 - G7 - Cmaj7.',
        tips: ['Smooth bass line', 'Modern harmony', 'Practice in all keys']
      },
      {
        id: 'intermediate-13-3',
        title: 'Altered Dominants',
        content: 'Use altered scales over tritone substitution chords.',
        technique: 'Play altered scale (7th mode of melodic minor) for outside sound.',
        tips: ['Advanced jazz', 'Creates tension', 'John Coltrane used this']
      }
    ]
  },
  {
    id: 'intermediate-14',
    difficulty: 'intermediate',
    title: 'Crosspicking Technique',
    description: 'Bluegrass-style rapid string crossing',
    fretboardPatterns: [
      { name: 'Crosspick Pattern', positions: [0, 0, 0, 0, 0, 0], fingers: [null, null, null, null, null, null] }
    ],
    scales: [
      { name: 'Major Scale Patterns', pattern: 'W-W-H-W-W-W-H', notes: ['Various'] }
    ],
    subsections: [
      {
        id: 'intermediate-14-1',
        title: 'Crosspicking Basics',
        content: 'Rapid alternating pick strokes across non-adjacent strings.',
        technique: 'Down-up-down pattern while skipping strings.',
        tips: ['Tony Rice technique', 'Bluegrass essential', 'Very clean sound']
      },
      {
        id: 'intermediate-14-2',
        title: 'String Crossing Patterns',
        content: 'Practice systematic string-crossing exercises.',
        technique: 'String 6-4-5, 5-3-4, 4-2-3 patterns with alternate picking.',
        tips: ['Build accuracy first', 'Speed comes later', 'Banjo-like effect']
      },
      {
        id: 'intermediate-14-3',
        title: 'Musical Application',
        content: 'Apply crosspicking to create flowing melodic passages.',
        technique: 'Use in bluegrass, country, and folk contexts.',
        tips: ['Doc Watson style', 'Practice with metronome', 'Amazing when mastered']
      }
    ]
  },
  {
    id: 'intermediate-15',
    difficulty: 'intermediate',
    title: 'Modal Interchange',
    description: 'Borrow chords from parallel modes',
    fretboardPatterns: [
      { name: 'Borrowed Chord', positions: [3, 5, 5, 3, 3, 3], fingers: [1, 3, 4, 1, 1, 1] }
    ],
    scales: [
      { name: 'Parallel Key Theory', pattern: 'Major and minor interchange', notes: ['Various'] }
    ],
    subsections: [
      {
        id: 'intermediate-15-1',
        title: 'Understanding Modal Interchange',
        content: 'Borrow chords from parallel keys for color.',
        technique: 'In C major, use chords from C minor (Fm, Ab, Bb).',
        tips: ['Beatles used this', 'Adds darkness', 'Modern pop trick']
      },
      {
        id: 'intermediate-15-2',
        title: 'Common Borrowed Chords',
        content: 'Frequently used modal interchange chords.',
        technique: 'bVI, bVII, iv in major keys are very common.',
        tips: ['Creates contrast', 'Emotional impact', 'Hit songs use this']
      },
      {
        id: 'intermediate-15-3',
        title: 'Application in Songs',
        content: 'Use modal interchange to enhance chord progressions.',
        technique: 'C - Fm - C - G (borrowing Fm from C minor).',
        tips: ['Radiohead style', 'Modern harmony', 'Experiment freely']
      }
    ]
  }
];

// MASTERY LESSONS (15 total)  
export const masteryLessons: Lesson[] = [
  {
    id: 'mastery-1',
    difficulty: 'mastery',
    title: 'Advanced Sweep Arpeggios',
    description: 'Five and six-string sweep patterns',
    fretboardPatterns: [
      { name: '5-String Sweep', positions: [5, 4, 5, 6, 5, 'x'], fingers: [2, 1, 2, 4, 3, null] }
    ],
    scales: [
      { name: 'Extended Arpeggios', pattern: 'Root-3-5-7-9', notes: ['Various extended arpeggios'] }
    ],
    subsections: [
      {
        id: 'mastery-1-1',
        title: 'Five-String Sweeps',
        content: 'Expand sweeps to cover five strings for wider arpeggios.',
        technique: 'Single pick motion across five strings with precise fretting.',
        tips: ['Malmsteen level', 'Perfect synchronization required', 'Practice daily']
      },
      {
        id: 'mastery-1-2',
        title: 'Six-String Sweeps',
        content: 'Master full fretboard sweeps across all six strings.',
        technique: 'Continuous sweep motion from low E to high E string.',
        tips: ['Ultimate shred technique', 'Mute thoroughly', 'Speed comes with time']
      },
      {
        id: 'mastery-1-3',
        title: 'Musical Context',
        content: 'Use sweeps musically, not just for show.',
        technique: 'Integrate sweeps into melodic phrases and solos.',
        tips: ['Less is more', 'Serve the music', 'Dynamic control essential']
      }
    ]
  },
  {
    id: 'mastery-2',
    difficulty: 'mastery',
    title: 'Exotic Scales Mastery',
    description: 'Hungarian minor, Persian, and whole tone scales',
    fretboardPatterns: [
      { name: 'Hungarian Minor', positions: [5, 7, 8, 5, 6, 8], fingers: [1, 3, 4, 1, 2, 4] }
    ],
    scales: [
      { name: 'Hungarian Minor', pattern: 'W-H-1.5-H-H-1.5-H', notes: ['A', 'B', 'C', 'D#', 'E', 'F', 'G#'] },
      { name: 'Whole Tone', pattern: 'W-W-W-W-W-W', notes: ['C', 'D', 'E', 'F#', 'G#', 'A#'] }
    ],
    subsections: [
      {
        id: 'mastery-2-1',
        title: 'Hungarian Minor Scale',
        content: 'Dark, gypsy-flavored scale with two augmented 2nd intervals.',
        technique: 'Contains both exotic gaps (3 frets) for dramatic sound.',
        tips: ['Eastern European feel', 'Very exotic', 'Use sparingly']
      },
      {
        id: 'mastery-2-2',
        title: 'Whole Tone Scale',
        content: 'Symmetrical scale of all whole steps - dreamy, floating quality.',
        technique: 'Only two possible whole tone scales due to symmetry.',
        tips: ['Impressionist music', 'Creates ambiguity', 'Jazz and film scores']
      },
      {
        id: 'mastery-2-3',
        title: 'Persian and Arabic Scales',
        content: 'Quarter-tone bends and microtonal inflections.',
        technique: 'Bend notes between frets for authentic Middle Eastern sound.',
        tips: ['Very expressive', 'Cultural authenticity', 'Difficult to master']
      }
    ]
  },
  {
    id: 'mastery-3',
    difficulty: 'mastery',
    title: 'Polyrhythms and Odd Meters',
    description: 'Master 5/4, 7/8, and polyrhythmic playing',
    fretboardPatterns: [
      { name: 'Polyrhythm Exercise', positions: [5, 7, 8, 5, 7, 8], fingers: [1, 3, 4, 1, 3, 4] }
    ],
    scales: [
      { name: 'Rhythmic Patterns', pattern: '3-over-4, 5-over-4 polyrhythms', notes: ['Rhythmic study'] }
    ],
    subsections: [
      {
        id: 'mastery-3-1',
        title: 'Odd Time Signatures',
        content: 'Play confidently in 5/4, 7/8, 9/8, and other odd meters.',
        technique: 'Break meters into smaller chunks: 7/8 = 3+2+2 or 2+2+3.',
        tips: ['Tool and Meshuggah use', 'Count subdivisions', 'Prog rock/metal essential']
      },
      {
        id: 'mastery-3-2',
        title: 'Polyrhythmic Playing',
        content: 'Play two different rhythms simultaneously.',
        technique: '3-against-4: play 3 notes while feeling 4 beat pulse.',
        tips: ['Very challenging', 'African music influence', 'Practice with drum machine']
      },
      {
        id: 'mastery-3-3',
        title: 'Metric Modulation',
        content: 'Smoothly transition between different time signatures.',
        technique: 'Use a common subdivision to pivot between meters.',
        tips: ['Frank Zappa technique', 'Advanced composition', 'Mind-bending']
      }
    ]
  },
  {
    id: 'mastery-4',
    difficulty: 'mastery',
    title: 'Legato Speed Mastery',
    description: 'Lightning-fast hammer-ons and pull-offs',
    fretboardPatterns: [
      { name: 'Legato Run', positions: [5, 8, 12, 15, 17, 20], fingers: [1, 2, 3, 4, 1, 2] }
    ],
    scales: [
      { name: 'Legato Sequences', pattern: 'H-P-H-P patterns', notes: ['Various positions'] }
    ],
    subsections: [
      {
        id: 'mastery-4-1',
        title: 'Four-Finger Independence',
        content: 'Each finger hammers and pulls with equal strength.',
        technique: 'Pinky and ring finger strengthening crucial.',
        tips: ['Shawn Lane level', 'Daily practice essential', 'Slow to fast']
      },
      {
        id: 'mastery-4-2',
        title: 'Legato Sequences',
        content: 'Complex hammer/pull patterns across strings.',
        technique: 'Minimize picking - one pick stroke per string.',
        tips: ['Smooth and fluid', 'Allan Holdsworth style', 'Sounds effortless']
      },
      {
        id: 'mastery-4-3',
        title: 'Extreme Velocity',
        content: 'Achieve 200+ BPM 16th note legato runs.',
        technique: 'Perfect synchronization, minimal movement, maximum efficiency.',
        tips: ['Professional level', 'Requires years', 'Guthrie Govan territory']
      }
    ]
  },
  {
    id: 'mastery-5',
    difficulty: 'mastery',
    title: 'Chord Melody Arrangements',
    description: 'Play melody and harmony simultaneously',
    fretboardPatterns: [
      { name: 'Chord Melody', positions: [3, 5, 4, 5, 3, 3], fingers: [1, 4, 2, 3, 1, 1] }
    ],
    scales: [
      { name: 'Harmonized Melody', pattern: 'Melody with chord voicings', notes: ['Jazz standards'] }
    ],
    subsections: [
      {
        id: 'mastery-5-1',
        title: 'Voice Leading Principles',
        content: 'Move chord tones smoothly to create melodic bass lines.',
        technique: 'Minimal movement between chords for smooth transitions.',
        tips: ['Jazz guitar essential', 'Ted Greene approach', 'Study arranging']
      },
      {
        id: 'mastery-5-2',
        title: 'Inner Voice Movement',
        content: 'Create moving lines within chord structures.',
        technique: 'While melody notes change, inner voices create counterpoint.',
        tips: ['Classical influence', 'Very sophisticated', 'Chet Atkins style']
      },
      {
        id: 'mastery-5-3',
        title: 'Complete Arrangements',
        content: 'Arrange full songs for solo guitar with bass, chords, melody.',
        technique: 'Combine fingerstyle, chords, and melody simultaneously.',
        tips: ['Ultimate solo guitar', 'Tommy Emmanuel level', 'Rewarding mastery']
      }
    ]
  },
  {
    id: 'mastery-6',
    difficulty: 'mastery',
    title: 'Bebop Language',
    description: 'Authentic bebop phrasing and vocabulary',
    fretboardPatterns: [
      { name: 'Bebop Scale', positions: [5, 7, 8, 9, 10, 12], fingers: [1, 2, 3, 4, 1, 3] }
    ],
    scales: [
      { name: 'Bebop Dominant', pattern: 'W-W-H-W-H-H-W', notes: ['G', 'A', 'B', 'C', 'D', 'Eb', 'E', 'F'] }
    ],
    subsections: [
      {
        id: 'mastery-6-1',
        title: 'Bebop Scales',
        content: 'Eight-note scales that align with strong beats in 4/4 time.',
        technique: 'Add chromatic passing tone to seven-note scales.',
        tips: ['Charlie Parker lines', 'Swinging eighth notes', 'Jazz essential']
      },
      {
        id: 'mastery-6-2',
        title: 'Bebop Phrasing',
        content: 'Learn authentic bebop melodic phrases and licks.',
        technique: 'Enclosures, approach notes, and chromatic passing tones.',
        tips: ['Transcribe solos', 'Wes Montgomery', 'Sing the lines']
      },
      {
        id: 'mastery-6-3',
        title: 'Improvisation Concepts',
        content: 'Apply bebop language over complex chord changes.',
        technique: 'Target chord tones on strong beats, approach chromatically.',
        tips: ['Very challenging', 'Lifetime study', 'Pat Martino approach']
      }
    ]
  },
  {
    id: 'mastery-7',
    difficulty: 'mastery',
    title: 'Advanced Tapping Techniques',
    description: 'Eight-finger tapping and polyphonic tapping',
    fretboardPatterns: [
      { name: '8-Finger Tap', positions: [5, 8, 12, 15, 8, 12], fingers: [1, 2, null, null, 2, null] }
    ],
    scales: [
      { name: 'Tapping Arpeggios', pattern: 'Complex tap patterns', notes: ['Various'] }
    ],
    subsections: [
      {
        id: 'mastery-7-1',
        title: 'Eight-Finger Tapping',
        content: 'Use all fingers from both hands on the fretboard.',
        technique: 'Both hands tap notes like a piano keyboard.',
        tips: ['Stanley Jordan style', 'Two-hand tapping', 'Ultimate technique']
      },
      {
        id: 'mastery-7-2',
        title: 'Polyphonic Tapping',
        content: 'Create multiple independent melodic lines with tapping.',
        technique: 'Left hand taps bass, right hand taps melody and harmony.',
        tips: ['Sounds like two guitars', 'Very advanced', 'T.J. Helmerich']
      },
      {
        id: 'mastery-7-3',
        title: 'Compositional Approach',
        content: 'Compose pieces specifically for tapping technique.',
        technique: 'Exploit unique possibilities of two-hand tapping.',
        tips: ['Jennifer Batten', 'Not just shred', 'Musical applications']
      }
    ]
  },
  {
    id: 'mastery-8',
    difficulty: 'mastery',
    title: 'Tremolo Picking Mastery',
    description: 'Extreme speed tremolo picking for metal',
    fretboardPatterns: [
      { name: 'Tremolo Exercise', positions: [0, 0, 0, 0, 0, 0], fingers: [null, null, null, null, null, null] }
    ],
    scales: [
      { name: 'Chromatic Tremolo', pattern: 'Single note tremolo', notes: ['Rapid picking study'] }
    ],
    subsections: [
      {
        id: 'mastery-8-1',
        title: 'Relaxation Technique',
        content: 'Paradoxically, extreme speed requires extreme relaxation.',
        technique: 'Minimal pick movement (1mm), loose grip, wrist/forearm combo.',
        tips: ['Tension kills speed', 'Find your natural motion', 'Daily practice']
      },
      {
        id: 'mastery-8-2',
        title: 'Endurance Building',
        content: 'Sustain tremolo picking for extended periods.',
        technique: 'Build up from 30 seconds to minutes of continuous tremolo.',
        tips: ['Slayer style', 'Death metal essential', 'Gradually increase']
      },
      {
        id: 'mastery-8-3',
        title: 'Musical Application',
        content: 'Use tremolo picking in actual musical contexts.',
        technique: 'Apply to power chords, pedal points, and sustained notes.',
        tips: ['Not just one note', 'Create atmosphere', 'Modern metal']
      }
    ]
  },
  {
    id: 'mastery-9',
    difficulty: 'mastery',
    title: 'Outside Playing',
    description: 'Chromatic approach and outside note choices',
    fretboardPatterns: [
      { name: 'Outside Lick', positions: [5, 6, 7, 6, 5, 6], fingers: [1, 2, 3, 2, 1, 2] }
    ],
    scales: [
      { name: 'Chromatic Enclosures', pattern: 'Target note approaches', notes: ['Advanced jazz'] }
    ],
    subsections: [
      {
        id: 'mastery-9-1',
        title: 'Chromatic Approach',
        content: 'Approach target notes from above and below chromatically.',
        technique: 'Play notes outside the scale, then resolve to chord tones.',
        tips: ['Creates tension', 'Modern jazz', 'Kurt Rosenwinkel']
      },
      {
        id: 'mastery-9-2',
        title: 'Superimposition',
        content: 'Play "wrong" scales over chords for dissonance.',
        technique: 'Play scale a half-step up, then resolve down.',
        tips: ['John Scofield trick', 'Controlled chaos', 'Advanced ears']
      },
      {
        id: 'mastery-9-3',
        title: 'Resolving Tension',
        content: 'The art is knowing when and how to resolve dissonance.',
        technique: 'Outside notes must resolve convincingly to inside notes.',
        tips: ['Storytelling with notes', 'Don\'t overuse', 'Musical maturity']
      }
    ]
  },
  {
    id: 'mastery-10',
    difficulty: 'mastery',
    title: 'Quartal Harmony',
    description: 'Fourth-based chord voicings',
    fretboardPatterns: [
      { name: 'Quartal Voicing', positions: ['x', 5, 5, 5, 'x', 'x'], fingers: [null, 1, 1, 1, null, null] }
    ],
    scales: [
      { name: 'Fourths Harmony', pattern: 'Stacked perfect fourths', notes: ['Modern jazz voicings'] }
    ],
    subsections: [
      {
        id: 'mastery-10-1',
        title: 'Quartal Theory',
        content: 'Build chords from stacked fourth intervals instead of thirds.',
        technique: 'Creates open, ambiguous, modern sound.',
        tips: ['McCoy Tyner style', 'Modal jazz', 'No clear major/minor']
      },
      {
        id: 'mastery-10-2',
        title: 'Voicing Construction',
        content: 'Build quartal voicings across the fretboard.',
        technique: 'Stack notes four scale degrees apart.',
        tips: ['Very modern sound', 'Fusion and jazz', 'Pat Metheny uses']
      },
      {
        id: 'mastery-10-3',
        title: 'Comping Applications',
        content: 'Use quartal voicings for sophisticated accompaniment.',
        technique: 'Substitute quartal chords in progressions.',
        tips: ['Creates space', 'Less dense', 'Contemporary harmony']
      }
    ]
  },
  {
    id: 'mastery-11',
    difficulty: 'mastery',
    title: 'Counterpoint for Guitar',
    description: 'Multiple independent melodic lines',
    fretboardPatterns: [
      { name: 'Counterpoint', positions: [3, 2, 0, 0, 1, 0], fingers: [3, 2, null, null, 1, null] }
    ],
    scales: [
      { name: 'Bach Patterns', pattern: 'Melodic independence', notes: ['Classical study'] }
    ],
    subsections: [
      {
        id: 'mastery-11-1',
        title: 'Two-Part Invention',
        content: 'Play two independent melodic lines simultaneously.',
        technique: 'Fingerstyle technique essential for voice independence.',
        tips: ['Bach transcriptions', 'Classical guitar', 'Intellectual playing']
      },
      {
        id: 'mastery-11-2',
        title: 'Voice Leading Rules',
        content: 'Follow classical voice leading principles.',
        technique: 'Contrary motion, avoid parallel fifths and octaves.',
        tips: ['Classical training helps', 'Sophisticated', 'Joe Pass studied']
      },
      {
        id: 'mastery-11-3',
        title: 'Practical Application',
        content: 'Apply counterpoint to jazz and modern guitar.',
        technique: 'Create walking bass with simultaneous chord melody.',
        tips: ['Ultimate musicianship', 'Lifetime study', 'Ted Greene mastery']
      }
    ]
  },
  {
    id: 'mastery-12',
    difficulty: 'mastery',
    title: 'Advanced Rhythm Concepts',
    description: 'Polymetric and metric modulation',
    fretboardPatterns: [
      { name: 'Polymetric Pattern', positions: [5, 7, 8, 5, 7, 8], fingers: [1, 3, 4, 1, 3, 4] }
    ],
    scales: [
      { name: 'Rhythmic Displacement', pattern: 'Complex time concepts', notes: ['Advanced rhythm'] }
    ],
    subsections: [
      {
        id: 'mastery-12-1',
        title: 'Polymetric Playing',
        content: 'Superimpose one meter over another.',
        technique: 'Play 3/4 phrase over 4/4 time signature.',
        tips: ['King Crimson style', 'Math rock', 'Requires practice']
      },
      {
        id: 'mastery-12-2',
        title: 'Metric Modulation',
        content: 'Smoothly change tempo using common subdivisions.',
        technique: 'Triplet in old tempo becomes quarter note in new tempo.',
        tips: ['Elliott Carter concept', 'Modern composition', 'Mind-expanding']
      },
      {
        id: 'mastery-12-3',
        title: 'Rhythmic Displacement',
        content: 'Shift rhythmic patterns to different beat positions.',
        technique: 'Start familiar pattern on off-beats.',
        tips: ['Creates surprise', 'Meshuggah uses', 'Disorienting effect']
      }
    ]
  },
  {
    id: 'mastery-13',
    difficulty: 'mastery',
    title: 'Microtonal Guitar',
    description: 'Playing between the frets',
    fretboardPatterns: [
      { name: 'Microtone Bend', positions: ['x', 'x', 7, 'x', 'x', 'x'], fingers: [null, null, 2, null, null, null] }
    ],
    scales: [
      { name: 'Quarter Tone Scale', pattern: 'Half of half-steps', notes: ['Eastern music'] }
    ],
    subsections: [
      {
        id: 'mastery-13-1',
        title: 'Quarter-Tone Bends',
        content: 'Bend strings to pitches between frets.',
        technique: 'Bend only 1/4 of a whole step for microtonal inflections.',
        tips: ['Middle Eastern music', 'Very expressive', 'Difficult to control']
      },
      {
        id: 'mastery-13-2',
        title: 'Fretless Guitar Concepts',
        content: 'Apply fretless bass concepts to guitar.',
        technique: 'Slide between notes with perfect intonation.',
        tips: ['Adrian Belew experiments', 'Unique sounds', 'Experimental']
      },
      {
        id: 'mastery-13-3',
        title: 'Cultural Applications',
        content: 'Authentic performance of non-Western music styles.',
        technique: 'Study Turkish, Indian, Arabic music scales.',
        tips: ['Cultural respect', 'Ear training intensive', 'Expands horizons']
      }
    ]
  },
  {
    id: 'mastery-14',
    difficulty: 'mastery',
    title: 'Advanced Fingerstyle',
    description: 'Rasgueado, tremolo, and advanced techniques',
    fretboardPatterns: [
      { name: 'Fingerstyle Pattern', positions: [0, 2, 2, 0, 0, 0], fingers: [null, 1, 2, null, null, null] }
    ],
    scales: [
      { name: 'Flamenco Scales', pattern: 'Phrygian dominant', notes: ['E', 'F', 'G#', 'A', 'B', 'C', 'D'] }
    ],
    subsections: [
      {
        id: 'mastery-14-1',
        title: 'Rasgueado Technique',
        content: 'Flamenco strumming with individual finger flicks.',
        technique: 'Rapidly unfurl fingers (pinky to index) across strings.',
        tips: ['Flamenco essential', 'Percussive', 'Paco de Lucía']
      },
      {
        id: 'mastery-14-2',
        title: 'Classical Tremolo',
        content: 'Rapid p-a-m-i pattern for sustained melody.',
        technique: 'Thumb on bass, ring-middle-index rapidly alternate on melody.',
        tips: ['Recuerdos de la Alhambra', 'Beautiful effect', 'Requires practice']
      },
      {
        id: 'mastery-14-3',
        title: 'Percussive Fingerstyle',
        content: 'Incorporate body percussion with fingerstyle.',
        technique: 'Tap, slap, and drum on guitar body while playing.',
        tips: ['Andy McKee style', 'Modern technique', 'YouTube sensation']
      }
    ]
  },
  {
    id: 'mastery-15',
    difficulty: 'mastery',
    title: 'Total Improvisation Mastery',
    description: 'Complete fretboard freedom and musical expression',
    fretboardPatterns: [
      { name: 'Free Improvisation', positions: [12, 14, 15, 12, 14, 15], fingers: [1, 3, 4, 1, 3, 4] }
    ],
    scales: [
      { name: 'All Scales Combined', pattern: 'Complete fretboard knowledge', notes: ['Total mastery'] }
    ],
    subsections: [
      {
        id: 'mastery-15-1',
        title: 'Complete Fretboard Visualization',
        content: 'Know every note, interval, and chord across entire fretboard.',
        technique: 'Visualize any scale, chord, or arpeggio instantly.',
        tips: ['Years of study', 'Professional level', 'Never stop learning']
      },
      {
        id: 'mastery-15-2',
        title: 'Melodic Development',
        content: 'Develop musical ideas spontaneously with maturity.',
        technique: 'Tell stories with notes, create tension and release.',
        tips: ['Listen to yourself', 'Play musically', 'Serve the moment']
      },
      {
        id: 'mastery-15-3',
        title: 'Personal Voice',
        content: 'Develop your unique sound and musical personality.',
        technique: 'Combine all techniques into your individual style.',
        tips: ['Lifetime journey', 'Be yourself', 'Express your soul']
      }
    ]
  }
];

// Helper functions
export const getAllLessons = (): Lesson[] => [
  ...beginnerLessons,
  ...intermediateLessons,
  ...masteryLessons
];

export const getLessonsByDifficulty = (difficulty: DifficultyLevel): Lesson[] => {
  switch (difficulty) {
    case 'beginner':
      return beginnerLessons;
    case 'intermediate':
      return intermediateLessons;
    case 'mastery':
      return masteryLessons;
    default:
      return [];
  }
};
