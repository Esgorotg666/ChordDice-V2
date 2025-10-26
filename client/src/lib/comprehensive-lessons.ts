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

// ============================================================
// GENERAL BEGINNER LESSONS - 16 Progressive Lessons
// ============================================================
export const generalBeginnerLessons: Lesson[] = [
  {
    id: 'general-0',
    difficulty: 'beginner',
    genre: 'general',
    title: 'Understanding Guitar Anatomy',
    description: 'Learn the essential parts of your guitar to follow tutorials and communicate effectively',
    fretboardPatterns: [],
    scales: [],
    subsections: [
      {
        id: 'general-0-1',
        title: 'Why This is Important',
        content: 'Knowing the guitar\'s parts helps you follow tutorials, communicate with teachers, and handle tasks like string changes. This prevents confusion with terms like "fret" or "bridge" and avoids mishandling that could damage the instrument.',
      },
      {
        id: 'general-0-2',
        title: 'Essential Parts to Know',
        content: 'Body (main section), Neck (long part with frets), Headstock (top with tuning pegs), Strings (six, from thickest low E to thinnest high e), Frets (metal bars on neck), Bridge (where strings anchor to body), Pickups (on electric guitars, for amplification), Nut (between neck and headstock).',
        tips: [
          'Touch each part while saying its name aloud 5-10 times',
          'The body is the large curved part',
          'The neck is the thin extension',
          'The headstock is at the top with tuning pegs'
        ]
      },
      {
        id: 'general-0-3',
        title: 'How to Practice',
        content: 'Sit with your guitar and refer to a labeled diagram (search "guitar parts labeled" online if needed). Touch each part, saying its name aloud 5-10 times. Practice 5 minutes daily, quizzing yourself by covering the diagram and naming parts.',
        technique: 'Use a systematic approach: start from the headstock and work your way down to the bridge. Point to each part while naming it.',
        tips: [
          'Practice 5 minutes daily',
          'Quiz yourself by covering diagrams',
          'Master this in about a week',
          'Use online diagrams or pictures of your guitar'
        ]
      }
    ]
  },
  {
    id: 'general-0-posture',
    difficulty: 'beginner',
    genre: 'general',
    title: 'Proper Posture and Holding the Guitar',
    description: 'Learn correct posture to prevent strain and build efficient playing habits',
    fretboardPatterns: [],
    scales: [],
    subsections: [
      {
        id: 'general-0-posture-1',
        title: 'Why This is Important',
        content: 'Correct posture prevents strain in your back, neck, or wrists, which can discourage beginners. It ensures efficient finger movement and clear sound, avoiding bad habits that slow progress.',
      },
      {
        id: 'general-0-posture-2',
        title: 'Setting Up Your Posture',
        content: 'Sit on a straight-backed, armless chair with feet flat and back straight. Place the guitar\'s body on your right thigh (left for left-handed players), with the neck angled slightly upward at about 45 degrees. Rest your right arm over the body with elbow near the bridge.',
        technique: 'Use a mirror to check: no slouching, wrists straight, shoulders relaxed. A footstool under your left foot can stabilize the guitar.',
        tips: [
          'Sit on a straight-backed, armless chair',
          'Feet flat on the floor',
          'Back straight - imagine a line from head to tailbone',
          'Guitar body on right thigh (or left for lefties)',
          'Neck angled slightly upward (45 degrees)',
          'Footstool under left foot helps stability'
        ]
      },
      {
        id: 'general-0-posture-3',
        title: 'Hand Positioning',
        content: 'Right hand: Hold a pick between thumb and index finger, arm resting over the body with elbow near the bridge. Left hand: Thumb behind the neck (not gripping), fingers curved over strings, palm NOT touching the neck.',
        technique: 'Think of your left hand as a spider crawling over the fretboard - fingers curved, hovering ready to press strings.',
        tips: [
          'Left thumb stays behind the neck',
          'Curved fingers, not flat',
          'Palm should not touch the neck',
          'Wrists stay straight, not bent',
          'Hold pick gently but firmly'
        ]
      },
      {
        id: 'general-0-posture-4',
        title: 'Practice Routine',
        content: 'Hold this position for 2-3 minutes, then stand, shake out, and repeat. Do this 5 times daily. Use a mirror to check your form: no slouching, wrists straight, shoulders relaxed. The guitar neck should point slightly upward, not parallel to the floor.',
        technique: 'Practice Duration: 10 minutes daily until it feels natural (typically 3-5 days).',
        tips: [
          'Hold position for 2-3 minutes',
          'Stand and shake out between holds',
          'Repeat 5 times daily',
          'Use a mirror to check form',
          'Practice until natural (3-5 days)',
          'Total practice: 10 minutes daily'
        ]
      }
    ]
  },
  {
    id: 'general-0-tuning',
    difficulty: 'beginner',
    genre: 'general',
    title: 'Tuning Your Guitar',
    description: 'Learn to keep your guitar in tune for great sound and ear training',
    fretboardPatterns: [],
    scales: [],
    subsections: [
      {
        id: 'general-0-tuning-1',
        title: 'Why This is Important',
        content: 'An out-of-tune guitar sounds unpleasant, demotivating you and making chords or songs sound wrong. Tuning trains your ear and ensures compatibility with music or other players.',
      },
      {
        id: 'general-0-tuning-2',
        title: 'Getting a Tuner',
        content: 'Get a clip-on tuner, app (e.g., Guitar Tuna), or online tuner. Standard tuning from low to high: E (6th, thickest), A (5th), D (4th), G (3rd), B (2nd), e (1st, thinnest).',
        tips: [
          'Clip-on tuners are most convenient',
          'Phone apps work great (Guitar Tuna, etc.)',
          'Online tuners are free alternatives',
          'Remember: E-A-D-G-B-e (low to high)',
          'Thickest string is low E, thinnest is high e'
        ]
      },
      {
        id: 'general-0-tuning-3',
        title: 'How to Tune',
        content: 'Pluck each string gently, turning tuning pegs slowly: clockwise tightens (sharpens/raises pitch), counterclockwise loosens (flattens/lowers pitch). Match the tuner\'s green light or needle center. Start with low E and move up through each string.',
        technique: 'Picture the headstock with six tuning pegs (three per side on most guitars). The tuner\'s display shows a needle or light moving left (flat/too low) or right (sharp/too high). Adjust until centered.',
        tips: [
          'Pluck strings softly to avoid breakage',
          'Turn pegs slowly - small adjustments',
          'Clockwise = tighter = sharper (higher)',
          'Counterclockwise = looser = flatter (lower)',
          'Watch for green light or centered needle',
          'Start with low E, work up to high e'
        ]
      },
      {
        id: 'general-0-tuning-4',
        title: 'Advanced: 5th Fret Method',
        content: 'After a week of using a tuner, try the 5th-fret method: Press fret 5 on low E string, it should match open A. Press fret 5 on A, matches open D. Fret 5 on D matches open G. Exception: Fret 4 on G matches open B. Fret 5 on B matches open high e.',
        technique: 'This relative tuning method helps when you don\'t have a tuner. Match the pitch of the fretted note to the open string above it.',
        tips: [
          'Fret 5 method: E→A, A→D, D→G, B→e',
          'Exception: G to B uses fret 4 (not 5)',
          'Listen for "beating" when notes don\'t match',
          'Tune one string with tuner first as reference',
          'This trains your ear over time'
        ]
      },
      {
        id: 'general-0-tuning-5',
        title: 'Practice Routine',
        content: 'Practice tuning twice daily (5 minutes each). Make it part of your routine before every practice session. Guitars go out of tune from temperature, humidity, and playing. Tuning should become second nature.',
        technique: 'Practice Duration: 5-10 minutes daily, ongoing. Eventually you\'ll tune in under a minute.',
        tips: [
          'Tune before every practice session',
          'Twice daily keeps you sharp',
          'New strings go out of tune faster',
          'Temperature changes affect tuning',
          'Make it a habit - like brushing teeth',
          'Goal: Tune in under 1 minute'
        ]
      }
    ]
  },
  {
    id: 'general-1',
    difficulty: 'beginner',
    genre: 'general',
    title: 'Finger Strength and Dexterity Exercises',
    description: 'Build finger strength, coordination, and independence for easier chords and melodies',
    fretboardPatterns: [
      { name: 'Chromatic 1-2-3-4', positions: [1, 'x', 'x', 'x', 'x', 'x'], fingers: [1, 0, 0, 0, 0, 0] },
      { name: 'Chromatic 1-2-3-4', positions: [2, 'x', 'x', 'x', 'x', 'x'], fingers: [2, 0, 0, 0, 0, 0] },
      { name: 'Chromatic 1-2-3-4', positions: [3, 'x', 'x', 'x', 'x', 'x'], fingers: [3, 0, 0, 0, 0, 0] },
      { name: 'Chromatic 1-2-3-4', positions: [4, 'x', 'x', 'x', 'x', 'x'], fingers: [4, 0, 0, 0, 0, 0] }
    ],
    scales: [],
    subsections: [
      {
        id: 'general-1-1',
        title: 'Why This is Important',
        content: 'Weak fingers cause buzzing or muted notes, frustrating beginners. These exercises build strength, coordination, and finger independence, making chords and melodies easier.',
      },
      {
        id: 'general-1-2',
        title: 'Warm Up First',
        content: 'Always warm up before practicing: Shake your hands gently, stretch your fingers by spreading them wide and then making a fist, rotate your wrists. This prevents injury and prepares your muscles.',
        tips: [
          'Shake hands gently for 10 seconds',
          'Spread fingers wide, then make a fist',
          'Rotate wrists clockwise and counterclockwise',
          'Never practice with cold, stiff hands',
          'Warm-up takes just 1-2 minutes'
        ]
      },
      {
        id: 'general-1-3',
        title: 'Chromatic Exercise (1-2-3-4)',
        content: 'Place left-hand fingers on low E string: index (1) on fret 1, middle (2) on fret 2, ring (3) on fret 3, pinky (4) on fret 4. Pluck each note with your right thumb or pick. Play frets 1-2-3-4 across ALL six strings, then reverse (4-3-2-1) back down.',
        technique: 'Pattern: E string (1-2-3-4), A string (1-2-3-4), D, G, B, high e. Then reverse. Use a metronome app at 60 BPM for steady timing.',
        tips: [
          'Start on low E string, frets 1-2-3-4',
          'Move to A, D, G, B, high e strings',
          'One finger per fret (index=1, middle=2, ring=3, pinky=4)',
          'Use metronome at 60 BPM',
          'Focus on clean, clear notes',
          'Do 4 repetitions per string'
        ]
      },
      {
        id: 'general-1-4',
        title: 'Spider Walk Exercise',
        content: 'Alternate fingers in unusual patterns to build independence. Example: Index on fret 1, ring on fret 2 (skip middle), then middle on fret 1, pinky on fret 2 (skip ring). Move this pattern across all strings.',
        technique: 'This forces each finger to work independently rather than in sequence. It feels awkward at first - that\'s the point!',
        tips: [
          'Alternate finger combinations (1-3, 2-4)',
          'Skip fingers intentionally',
          'Builds finger independence',
          'Harder than chromatic - that\'s normal',
          'Go very slowly at first'
        ]
      },
      {
        id: 'general-1-5',
        title: 'Practice Routine and Safety',
        content: 'Practice 10-15 minutes daily, focusing on clean notes over speed. STOP immediately if fingers hurt sharply (dull soreness is normal, sharp pain is not). Increase speed gradually over 2 weeks. Your goal: smooth, even notes at faster tempos.',
        technique: 'Practice Duration: 10-15 minutes daily. Increase metronome by 5 BPM every 3 days if notes are clean.',
        tips: [
          'Practice 10-15 minutes daily',
          'Stop if sharp pain occurs',
          'Dull muscle soreness is normal',
          'Increase speed over 2 weeks',
          'Prioritize clean notes over speed',
          'Add 5 BPM every few days',
          'Rest days are important too'
        ]
      }
    ]
  },
  {
    id: 'general-2',
    difficulty: 'beginner',
    genre: 'general',
    title: 'Learning Open Chords (E Minor, G Major, C Major)',
    description: 'Master the foundation chords used in most songs for rhythm guitar',
    fretboardPatterns: [
      { name: 'E Minor (Em)', positions: [0, 2, 2, 0, 0, 0], fingers: [0, 2, 3, 0, 0, 0] },
      { name: 'G Major', positions: [3, 2, 0, 0, 0, 3], fingers: [3, 2, 0, 0, 0, 4] },
      { name: 'C Major', positions: ['x', 3, 2, 0, 1, 0], fingers: [0, 3, 2, 0, 1, 0] }
    ],
    scales: [],
    subsections: [
      {
        id: 'general-2-1',
        title: 'Why This is Important',
        content: 'Open chords are the foundation of most songs, letting you play rhythm guitar quickly. They teach finger placement, string muting, and transitions, boosting motivation through early song-playing. Em, G, and C are three of the most common chords in popular music.',
      },
      {
        id: 'general-2-2',
        title: 'E Minor (Em) - The Easiest Chord',
        content: 'Em only needs TWO fingers, making it perfect for beginners. Middle finger on A string fret 2, Ring finger on D string fret 2. Strum ALL six strings - they all ring beautifully.',
        technique: 'Press strings firmly just behind the fret. Keep both fingers on the same fret (fret 2). Strum all strings with a pick or thumb, ensuring no buzzing.',
        tips: [
          'Only 2 fingers needed - easiest chord!',
          'Both fingers on fret 2',
          'Strum all 6 strings',
          'All open strings ring clear',
          'Practice 2 minutes, 4 slow downstrums',
          'Check in mirror: curved fingers'
        ]
      },
      {
        id: 'general-2-3',
        title: 'G Major - Building Finger Stretch',
        content: 'G is common in thousands of songs. Ring finger (or middle) on low E string fret 3, Index on A string fret 2, Pinky (or ring) on high e string fret 3. Strum all six strings for a full, bright sound.',
        technique: 'This chord builds finger stretch. Keep fingers arched so the middle strings (D, G, B) ring open. Some players use middle+pinky, others use index+middle+ring - both work!',
        tips: [
          'Stretch between low E and high e',
          'All 6 strings should ring',
          'Middle strings are open',
          'Practice 2 minutes of slow strumming',
          'Adjust if any string buzzes',
          'Common in rock, folk, pop'
        ]
      },
      {
        id: 'general-2-4',
        title: 'C Major - Three-Finger Placement',
        content: 'C is incredibly versatile. Ring finger on A string fret 3, Middle on D string fret 2, Index on B string fret 1. Play 5 strings (skip low E). G, high E strings are open.',
        technique: 'Form a diagonal line with your fingers. Don\'t play the low E string (marked X). Strum from A string down. In a mirror, ensure fingers are curved, pressing only the noted strings.',
        tips: [
          'Skip low E string (don\'t play it)',
          'Three fingers in diagonal pattern',
          'Strum from A string down',
          'Open G and high E strings',
          'Practice 2 minutes of strumming',
          'Most versatile chord'
        ]
      },
      {
        id: 'general-2-5',
        title: 'Chord Transitions Practice',
        content: 'Switch between Em and G, then G and C. Take 10-15 seconds per switch initially. Aim for smooth transitions over 2 weeks. Practice each transition slowly, watching your fingers move.',
        technique: 'Practice Duration: 15-20 minutes daily for 2-3 weeks. Break it down: 5 min Em, 5 min G, 5 min C, 5 min transitions.',
        tips: [
          'Switch Em → G (10-15 seconds)',
          'Switch G → C (10-15 seconds)',
          'Start slow, speed comes later',
          'Watch fingers in mirror',
          'Strum 4 times per chord',
          'Smooth transitions take 2 weeks',
          'Practice 15-20 min daily'
        ]
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
    title: 'Strumming Patterns - Down & Up',
    description: 'Master basic rhythm and strumming techniques',
    fretboardPatterns: [],
    scales: [],
    subsections: [
      {
        id: 'general-5-1',
        title: 'All Downstrokes',
        content: 'Practice strumming an E chord with all downstrokes: DOWN-DOWN-DOWN-DOWN in 4/4 time. Count: 1-2-3-4.',
        technique: 'Loose wrist, not stiff arm. Let the pick glide across strings naturally.',
        tips: ['Start slow - 60 BPM', 'Keep consistent volume', 'Practice with metronome']
      },
      {
        id: 'general-5-2',
        title: 'Down-Up Pattern',
        content: 'Basic pattern: DOWN-UP-DOWN-UP. This doubles the speed. Count: 1-and-2-and-3-and-4-and.',
        technique: 'On upstroke, only hit the top 3-4 strings. Downstroke hits all strings.',
        tips: ['Most common strumming pattern', 'Upstrokes are lighter', 'Try on G, C, D chords']
      }
    ]
  },
  {
    id: 'general-6',
    difficulty: 'beginner',
    genre: 'general',
    title: 'F Major Chord - Your First Barre',
    description: 'Tackle the challenging F chord with proper technique',
    fretboardPatterns: [
      { name: 'F Major (Simplified)', positions: ['x', 'x', 3, 2, 1, 1], fingers: [0, 0, 3, 2, 1, 1] },
      { name: 'F Major (Full Barre)', positions: [1, 3, 3, 2, 1, 1], fingers: [1, 3, 4, 2, 1, 1] }
    ],
    scales: [],
    subsections: [
      {
        id: 'general-6-1',
        title: 'Simplified F Chord',
        content: 'Start with 4 strings only. Index bars B and high E at fret 1. Middle on G fret 2, Ring on D fret 3. Skip low E and A.',
        technique: 'Press index finger flat across both strings. Apply pressure with thumb behind neck.',
        tips: ['This is easier than full F', 'Build finger strength first', 'Perfect for beginners']
      },
      {
        id: 'general-6-2',
        title: 'Full F Barre Chord',
        content: 'Index bars ALL 6 strings at fret 1. Middle on G fret 2, Ring and pinky on D and A fret 3. Full, rich sound.',
        technique: 'Roll index slightly toward thumb side. Keep it straight and firm. Other fingers press hard.',
        tips: ['Most difficult beginner chord', 'Takes weeks to master', 'Don\'t give up!']
      }
    ]
  },
  {
    id: 'general-7',
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
        id: 'general-7-1',
        title: 'Complete Box Pattern',
        content: 'The diagrams show every note in the scale. Low E: 0-3, A: 0-2, D: 0-2, G: 0-2, B: 0-3, High E: 0-3. Play both notes on each string.',
        technique: 'Open strings (0) and fret 2 use index finger. Fret 3 uses pinky. Hand stays in one position.',
        tips: ['This is THE most important scale pattern', 'Memorize the shape', 'Works for rock, blues, and metal']
      },
      {
        id: 'general-7-2',
        title: 'Practice Routine',
        content: 'Ascending: Start low E fret 0, play 3, move to A, play 0-2, move to D, play 0-2, etc. Descending: Reverse the pattern.',
        technique: 'Alternate picking throughout: down-up-down-up. Keep every note clean and even.',
        tips: ['Practice with metronome at 60 BPM', 'Use with E minor backing track', 'Try bending the high notes']
      }
    ]
  },
  {
    id: 'general-8',
    difficulty: 'beginner',
    genre: 'general',
    title: 'String Changing Exercise',
    description: 'Build coordination moving between strings smoothly',
    fretboardPatterns: [
      { name: 'Low E to A', positions: [5, 5, 'x', 'x', 'x', 'x'], fingers: [1, 1, 0, 0, 0, 0] },
      { name: 'A to D', positions: ['x', 5, 5, 'x', 'x', 'x'], fingers: [0, 1, 1, 0, 0, 0] },
      { name: 'D to G', positions: ['x', 'x', 5, 5, 'x', 'x'], fingers: [0, 0, 1, 1, 0, 0] }
    ],
    scales: [],
    subsections: [
      {
        id: 'general-8-1',
        title: 'Two-String Patterns',
        content: 'Play fret 5 on Low E, then fret 5 on A. Repeat back and forth. Then A to D, D to G, G to B, B to high E.',
        technique: 'Keep index finger on fret 5. Move cleanly between adjacent strings. No gap in sound.',
        tips: ['Start slowly', 'Perfect for building accuracy', 'Use strict alternate picking']
      },
      {
        id: 'general-8-2',
        title: 'Three-String Patterns',
        content: 'Expand to three strings: E-A-D-A-E (5-5-5-5-5). Creates wave motion across strings.',
        technique: 'Wrist stays loose. Let pick naturally bounce between strings.',
        tips: ['Practice 5 minutes daily', 'Increase speed weekly', 'Essential for lead guitar']
      }
    ]
  },
  {
    id: 'general-9',
    difficulty: 'beginner',
    genre: 'general',
    title: 'Tuning Your Guitar',
    description: 'Learn to tune by ear and with reference pitches',
    fretboardPatterns: [],
    scales: [],
    subsections: [
      {
        id: 'general-9-1',
        title: 'Standard Tuning',
        content: 'From lowest to highest: E-A-D-G-B-E. Remember "Eddie Ate Dynamite Good Bye Eddie" or "Elephants And Donkeys Grow Big Ears".',
        technique: 'Turn tuning pegs slowly. Tighten to raise pitch, loosen to lower. Small adjustments make big differences.',
        tips: ['Use electronic tuner at first', 'Tune up to pitch, not down', 'Check tuning often']
      },
      {
        id: 'general-9-2',
        title: 'Relative Tuning Method',
        content: 'Fret 5 on Low E = Open A. Fret 5 on A = Open D. Fret 5 on D = Open G. Fret 4 on G = Open B. Fret 5 on B = Open high E.',
        technique: 'Play both notes together. Listen for beating/wobbling sound. Match pitches exactly.',
        tips: ['Traditional method used for centuries', 'Develops your ear', 'Always works without tuner']
      }
    ]
  },
  {
    id: 'general-10',
    difficulty: 'beginner',
    genre: 'general',
    title: 'Basic Music Theory - Notes & Frets',
    description: 'Understand the guitar fretboard and note names',
    fretboardPatterns: [],
    scales: [],
    subsections: [
      {
        id: 'general-10-1',
        title: 'Fretboard Note Names',
        content: 'Musical alphabet: A-B-C-D-E-F-G, then repeats. Between most notes is a half step (1 fret). No sharp between B-C and E-F.',
        technique: 'Learn open string names first (E-A-D-G-B-E). Each fret = one half step higher. Fret 12 = same note, one octave up.',
        tips: ['Start with low E string notes', 'Fret 5 = A, Fret 7 = B, Fret 12 = E', 'Memorize gradually']
      },
      {
        id: 'general-10-2',
        title: 'Sharps and Flats',
        content: 'Sharp (#) raises pitch one fret. Flat (♭) lowers one fret. Fret 1 on E string = F or E#. Fret 3 = G or F##.',
        technique: 'Same note, two names. Context determines which to use (F# in G major, G♭ in D♭ major).',
        tips: ['Don\'t memorize all at once', 'Focus on common keys', 'Theory helps improvisation']
      }
    ]
  },
  {
    id: 'general-11',
    difficulty: 'beginner',
    genre: 'general',
    title: 'Fingerpicking Basics - Travis Pattern',
    description: 'Learn fingerstyle guitar with classic patterns',
    fretboardPatterns: [
      { name: 'C Chord for Picking', positions: ['x', 3, 2, 0, 1, 0], fingers: [0, 3, 2, 0, 1, 0] }
    ],
    scales: [],
    subsections: [
      {
        id: 'general-11-1',
        title: 'Right Hand Setup',
        content: 'Thumb (p) plays bass notes (E, A, D strings). Index (i) plays G string. Middle (m) plays B. Ring (a) plays high E. Pinky rests on guitar or not used.',
        technique: 'Plant thumb on bass note. Fingers pluck upward gently. No pick - fingers only.',
        tips: ['Mark fingers: p-i-m-a', 'Start with thumb only', 'Add fingers one by one']
      },
      {
        id: 'general-11-2',
        title: 'Basic Travis Pattern',
        content: 'On C chord: p(A)-i(G)-m(B)-i(G), repeat. Thumb alternates bass notes. Fingers stay steady. Creates rolling sound.',
        technique: 'Count 1-2-3-4. Thumb on beats 1 and 3. Fingers fill in between.',
        tips: ['Classic country/folk pattern', 'Practice for 10 minutes daily', 'Try on G, Am, D chords']
      }
    ]
  },
  {
    id: 'general-12',
    difficulty: 'beginner',
    genre: 'general',
    title: 'Chord Progressions - I-IV-V',
    description: 'Understand the foundation of most popular music',
    fretboardPatterns: [],
    scales: [],
    subsections: [
      {
        id: 'general-12-1',
        title: 'I-IV-V in Key of G',
        content: 'Roman numerals represent scale degrees. In G major: I=G, IV=C, V=D. Play progression: G-C-D-G.',
        technique: 'This pattern powers thousands of songs. Four beats per chord, smooth transitions.',
        tips: ['Try: G-G-C-C-D-D-G-G', 'Add Em for I-V-vi-IV', 'Foundation of rock, country, pop']
      },
      {
        id: 'general-12-2',
        title: 'Common Progressions',
        content: 'I-V-vi-IV (G-D-Em-C): Most popular pop progression. I-vi-IV-V (G-Em-C-D): Classic 50s progression. Try both.',
        technique: 'Practice chord changes. Make them smooth and quick. Keep steady rhythm throughout.',
        tips: ['Used in countless hit songs', 'Learn in multiple keys', 'Foundation for songwriting']
      }
    ]
  },
  {
    id: 'general-13',
    difficulty: 'beginner',
    genre: 'general',
    title: 'Hammer-Ons and Pull-Offs',
    description: 'Master essential lead guitar articulation techniques',
    fretboardPatterns: [
      { name: 'Hammer-On Pattern', positions: [0, 2, 'x', 'x', 'x', 'x'], fingers: [0, 2, 0, 0, 0, 0] },
      { name: 'Pull-Off Pattern', positions: [2, 0, 'x', 'x', 'x', 'x'], fingers: [2, 0, 0, 0, 0, 0] }
    ],
    scales: [],
    subsections: [
      {
        id: 'general-13-1',
        title: 'Hammer-On Technique',
        content: 'Pick open Low E, then SLAM middle finger down on fret 2 without picking again. Second note sounds from hammer.',
        technique: 'Strike fret with authority. Finger hammers behind fret wire. Creates smooth, legato sound.',
        tips: ['Common in rock and blues', 'Practice E string: 0-2-0-2', 'Build finger strength']
      },
      {
        id: 'general-13-2',
        title: 'Pull-Off Technique',
        content: 'Fret Low E at fret 2. Pick it. Then PULL finger sideways off string (like plucking). Open E sounds without picking.',
        technique: 'Pull slightly downward as you release. Snapping motion creates clear note.',
        tips: ['Opposite of hammer-on', 'Combine: 0-2(hammer)-0(pull)', 'Essential for smooth solos']
      }
    ]
  },
  {
    id: 'general-14',
    difficulty: 'beginner',
    genre: 'general',
    title: 'Reading Chord Diagrams & TAB',
    description: 'Learn to read guitar tablature and chord charts',
    fretboardPatterns: [],
    scales: [],
    subsections: [
      {
        id: 'general-14-1',
        title: 'Understanding TAB',
        content: 'Six lines represent strings (high E on top, low E on bottom). Numbers show which fret to play. 0 = open string. Read left to right.',
        technique: 'TAB is easier than standard notation. Shows exactly where to put fingers.',
        tips: ['Used in most online guitar resources', 'Doesn\'t show rhythm', 'Faster to learn than sheet music']
      },
      {
        id: 'general-14-2',
        title: 'Chord Diagram Reading',
        content: 'Vertical lines = strings (left = low E). Horizontal lines = frets. Dots show finger positions. X = don\'t play. O = open string.',
        technique: 'Numbers in dots = which finger to use (1=index, 2=middle, 3=ring, 4=pinky).',
        tips: ['Standard chord chart format', 'Used in songbooks worldwide', 'Essential skill for learning songs']
      }
    ]
  },
  {
    id: 'general-15',
    difficulty: 'beginner',
    genre: 'general',
    title: 'Practice Routine & Goal Setting',
    description: 'Build effective practice habits for faster progress',
    fretboardPatterns: [],
    scales: [],
    subsections: [
      {
        id: 'general-15-1',
        title: 'Daily Practice Structure',
        content: 'Warm up (5 min): Chromatic exercise. Chords (10 min): Practice changes. Scales (10 min): Pentatonic. Songs (10 min): Learn favorites.',
        technique: 'Consistency beats long irregular sessions. 20-30 minutes daily is perfect for beginners.',
        tips: ['Use metronome always', 'Track progress in journal', 'Celebrate small wins']
      },
      {
        id: 'general-15-2',
        title: 'Setting Achievable Goals',
        content: 'Week 1: Play E, A, D chords. Week 2: Switch between them smoothly. Week 3: Learn first song. Week 4: Play song with steady rhythm.',
        technique: 'Break big goals into small steps. Master one thing before adding more.',
        tips: ['Be patient with yourself', 'Record yourself weekly', 'Join guitar community for support']
      }
    ]
  }
];

// ============================================================
// ROCK LESSONS - 15 Progressive Lessons
// ============================================================
export const rockLessons: Lesson[] = [
  {
    id: 'rock-1',
    difficulty: 'beginner',
    genre: 'rock',
    title: 'Power Chords - Essential Shapes',
    description: 'Master the foundation of rock guitar with power chords',
    fretboardPatterns: [
      { name: 'E5 Power Chord (2-finger)', positions: [0, 2, 'x', 'x', 'x', 'x'], fingers: [0, 1, 0, 0, 0, 0] },
      { name: 'A5 Power Chord (2-finger)', positions: ['x', 0, 2, 'x', 'x', 'x'], fingers: [0, 0, 1, 0, 0, 0] },
      { name: 'E5 Power Chord (3-finger)', positions: [0, 2, 2, 'x', 'x', 'x'], fingers: [0, 1, 1, 0, 0, 0] }
    ],
    scales: [],
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
        content: 'Add one more string, same fret as the fifth. E5: Low E open, A fret 2, D fret 2. Bigger, fuller sound.',
        technique: 'Bar the A and D strings with your index finger at fret 2. Creates thicker tone with octave.',
        tips: ['Adds octave for thickness', 'Mute unused strings', 'Practice E5-A5-D5 progression']
      }
    ]
  },
  {
    id: 'rock-2',
    difficulty: 'beginner',
    genre: 'rock',
    title: 'Palm Muting Technique',
    description: 'Create tight, percussive rock rhythm sounds',
    fretboardPatterns: [
      { name: 'E5 for Muting', positions: [0, 2, 'x', 'x', 'x', 'x'], fingers: [0, 1, 0, 0, 0, 0] }
    ],
    scales: [],
    subsections: [
      {
        id: 'rock-2-1',
        title: 'Palm Mute Position',
        content: 'Rest edge of picking hand palm lightly on strings right at the bridge. Pick normally. Sound should be muted and chunky.',
        technique: 'Don\'t press hard - just rest palm. Too close to bridge = too bright. Too far = completely dead.',
        tips: ['Essential for modern rock', 'Used in metal, punk, alternative', 'Practice with distortion']
      },
      {
        id: 'rock-2-2',
        title: 'Muted Power Chord Riff',
        content: 'Palm mute E5 power chord. Play: MUTE-MUTE-MUTE-OPEN. First 3 notes muted, 4th rings clear. Creates dynamics.',
        technique: 'Lift palm on 4th note. Press back down for muted notes. Rhythm: chug-chug-chug-RING.',
        tips: ['Classic rock rhythm', 'Practice slow first', 'Used by AC/DC, Metallica']
      }
    ]
  },
  {
    id: 'rock-3',
    difficulty: 'beginner',
    genre: 'rock',
    title: 'The "Smoke on the Water" Riff',
    description: 'Learn rock\'s most famous riff',
    fretboardPatterns: [
      { name: 'Main Riff Pattern', positions: [0, 3, 'x', 'x', 'x', 'x'], fingers: [0, 1, 0, 0, 0, 0] }
    ],
    scales: [],
    subsections: [
      {
        id: 'rock-3-1',
        title: 'Main Riff',
        content: 'A string: 0-3-5, then 0-3-6-5, then 0-3-5-3-0. Uses power chord shape moved up neck.',
        technique: 'Index on fret 3, ring on fret 5. Slide to fret 6 for one note. Palm mute slightly.',
        tips: ['Most famous riff ever', 'Deep Purple (1972)', 'Practice slowly at first']
      },
      {
        id: 'rock-3-2',
        title: 'Playing with Attitude',
        content: 'Don\'t just play notes mechanically. Add slight palm muting, hit strings hard, make it aggressive.',
        technique: 'Rock is about feel and attitude. Bend strings slightly, add vibrato at end.',
        tips: ['Channel your inner rock star', 'Play with confidence', 'Volume up!']
      }
    ]
  },
  {
    id: 'rock-4',
    difficulty: 'beginner',
    genre: 'rock',
    title: 'String Bending Basics',
    description: 'Learn the expressive technique of string bending',
    fretboardPatterns: [
      { name: 'Bend at Fret 7', positions: ['x', 'x', 'x', 7, 'x', 'x'], fingers: [0, 0, 0, 3, 0, 0] }
    ],
    scales: [],
    subsections: [
      {
        id: 'rock-4-1',
        title: 'Half-Step Bend',
        content: 'Fret G string at fret 7 with ring finger. Push string upward (toward ceiling). Pitch rises one fret (half step).',
        technique: 'Support bend with middle and index fingers behind ring finger. Use wrist rotation, not just finger.',
        tips: ['Start with light gauge strings', 'Bend slowly and controlled', 'Listen for target pitch']
      },
      {
        id: 'rock-4-2',
        title: 'Full-Step Bend',
        content: 'Same technique but push further. Fret 7 bent should sound like fret 9. That\'s 2 frets = whole step.',
        technique: 'More wrist rotation needed. Ring finger supported by all others. Thumb grips back of neck.',
        tips: ['Essential for rock solos', 'Practice matching pitch', 'Add vibrato while bent']
      }
    ]
  },
  {
    id: 'rock-5',
    difficulty: 'intermediate',
    genre: 'rock',
    title: 'Classic Rock Chord Progressions',
    description: 'Learn the progressions that built rock music',
    fretboardPatterns: [
      { name: 'A5', positions: ['x', 0, 2, 2, 'x', 'x'], fingers: [0, 0, 1, 3, 0, 0] },
      { name: 'D5', positions: ['x', 'x', 0, 2, 3, 'x'], fingers: [0, 0, 0, 1, 3, 0] },
      { name: 'E5', positions: [0, 2, 2, 'x', 'x', 'x'], fingers: [0, 1, 3, 0, 0, 0] }
    ],
    scales: [],
    subsections: [
      {
        id: 'rock-5-1',
        title: 'A-D-E Progression',
        content: 'Play A5 for 4 beats, D5 for 4 beats, E5 for 4 beats, back to A5. Foundation of blues-rock.',
        technique: 'Keep power chord shape locked. Slide up and down neck between chords.',
        tips: ['Used by Led Zeppelin, AC/DC', 'Add palm muting', 'Play with distortion']
      },
      {
        id: 'rock-5-2',
        title: 'I-IV-V Rock Variation',
        content: 'Same as blues I-IV-V but with power chords and rock rhythm. Eighth notes, palm muted, aggressive.',
        technique: 'Down-down-up-down-down-up strumming. Heavy on downbeats.',
        tips: ['Foundation of garage rock', 'Simple but powerful', 'Try different keys']
      }
    ]
  },
  {
    id: 'rock-6',
    difficulty: 'intermediate',
    genre: 'rock',
    title: 'Pentatonic Rock Licks',
    description: 'Essential pentatonic licks for rock solos',
    fretboardPatterns: [
      { name: 'Box Position Fret 5', positions: [5, 'x', 'x', 'x', 'x', 'x'], fingers: [1, 0, 0, 0, 0, 0] },
      { name: 'Box Position Fret 8', positions: [8, 'x', 'x', 'x', 'x', 'x'], fingers: [4, 0, 0, 0, 0, 0] }
    ],
    scales: [
      { name: 'A Minor Pentatonic', pattern: 'Root-b3-4-5-b7', notes: ['A', 'C', 'D', 'E', 'G'] }
    ],
    subsections: [
      {
        id: 'rock-6-1',
        title: 'Box 1 at 5th Fret',
        content: 'A minor pentatonic box starting at fret 5. Index on 5, pinky on 8. Two notes per string.',
        technique: 'This box works over ANY minor chord rock progression. Movable to any fret.',
        tips: ['Most used rock scale', 'Start at fret 5 for A minor', 'Fret 12 for E minor']
      },
      {
        id: 'rock-6-2',
        title: 'Classic Rock Lick',
        content: 'B string: 5-8-5-8-5, then High E: 5-8-5. Repeat. Add bends on fret 8 for extra emotion.',
        technique: 'Alternate picking. Add vibrato on held notes. Bend fret 8 on B string.',
        tips: ['Used in countless solos', 'Sounds great over power chords', 'Add your own variations']
      }
    ]
  },
  {
    id: 'rock-7',
    difficulty: 'intermediate',
    genre: 'rock',
    title: 'The CAGED System - Intro',
    description: 'Unlock the entire fretboard with CAGED',
    fretboardPatterns: [
      { name: 'C Shape', positions: ['x', 3, 2, 0, 1, 0], fingers: [0, 3, 2, 0, 1, 0] },
      { name: 'A Shape', positions: ['x', 0, 2, 2, 2, 0], fingers: [0, 0, 1, 2, 3, 0] },
      { name: 'G Shape', positions: [3, 2, 0, 0, 0, 3], fingers: [3, 2, 0, 0, 0, 4] }
    ],
    scales: [],
    subsections: [
      {
        id: 'rock-7-1',
        title: 'What is CAGED?',
        content: 'C-A-G-E-D are 5 chord shapes that map the entire fretboard. Every chord can be played 5 ways using these shapes.',
        technique: 'Learn open C, A, G, E, D shapes first. Then move them up the neck as barre chords.',
        tips: ['Revolutionizes fretboard knowledge', 'Takes months to fully master', 'Worth the effort']
      },
      {
        id: 'rock-7-2',
        title: 'Moving Shapes Up',
        content: 'A major open shape moved to fret 3 = C major. G shape at fret 5 = C major. Same chord, different positions.',
        technique: 'Bar with index finger to replace nut/open strings. Other fingers form same shape.',
        tips: ['Opens up entire neck', 'Essential for advanced playing', 'Practice one shape per week']
      }
    ]
  },
  {
    id: 'rock-8',
    difficulty: 'intermediate',
    genre: 'rock',
    title: 'Vibrato Technique',
    description: 'Add emotion and sustain to your notes',
    fretboardPatterns: [
      { name: 'Vibrato Position', positions: ['x', 'x', 'x', 7, 'x', 'x'], fingers: [0, 0, 0, 3, 0, 0] }
    ],
    scales: [],
    subsections: [
      {
        id: 'rock-8-1',
        title: 'Wrist Vibrato',
        content: 'Fret G string fret 7. Rotate wrist back and forth rapidly. String bends slightly up and down, creating warbling pitch.',
        technique: 'Not finger vibrato - whole wrist moves. Thumb grips neck firmly. Steady, even oscillation.',
        tips: ['Listen to B.B. King, Clapton', 'Makes notes sing', 'Practice slow first']
      },
      {
        id: 'rock-8-2',
        title: 'Fast vs Slow Vibrato',
        content: 'Slow vibrato = emotional, crying. Fast vibrato = intense, aggressive. Speed up for climax, slow down for resolution.',
        technique: 'Control the speed consciously. Wide vibrato = more dramatic. Narrow = subtle.',
        tips: ['Used on every held note', 'Signature of great players', 'Develop your own style']
      }
    ]
  },
  {
    id: 'rock-9',
    difficulty: 'intermediate',
    genre: 'rock',
    title: 'Slide Guitar Basics',
    description: 'Create smooth, vocal-like melodies with slides',
    fretboardPatterns: [],
    scales: [],
    subsections: [
      {
        id: 'rock-9-1',
        title: 'Slide Technique',
        content: 'Pick a note, then slide finger up or down frets while maintaining pressure. Sound continues smoothly between notes.',
        technique: 'Keep consistent pressure while sliding. Don\'t lift finger. Creates legato effect.',
        tips: ['Used in rock, blues, country', 'Start with short slides', 'Combine with bends']
      },
      {
        id: 'rock-9-2',
        title: 'Common Slide Patterns',
        content: 'Fret 5 to 7 (slide up). Fret 8 to 5 (slide down). High E string: 12-15-12 (slide up and back).',
        technique: 'Pick first note only. Slide provides second note without picking. Smooth and connected.',
        tips: ['Essential for rock solos', 'Gary Moore used slides extensively', 'Combine with vibrato']
      }
    ]
  },
  {
    id: 'rock-10',
    difficulty: 'intermediate',
    genre: 'rock',
    title: 'Double Stops',
    description: 'Play two notes simultaneously for harmony',
    fretboardPatterns: [
      { name: 'Double Stop G-B', positions: ['x', 'x', 'x', 7, 8, 'x'], fingers: [0, 0, 0, 1, 2, 0] }
    ],
    scales: [],
    subsections: [
      {
        id: 'rock-10-1',
        title: 'Basic Double Stops',
        content: 'Play G and B strings together at frets 7 and 8. Index on G fret 7, middle on B fret 8. Strike both.',
        technique: 'Mute other strings. Only these 2 ring. Creates harmonized melody line.',
        tips: ['Used by Chuck Berry, Angus Young', 'Sounds full and powerful', 'Move shape up neck']
      },
      {
        id: 'rock-10-2',
        title: 'Rock & Roll Double Stop Lick',
        content: 'G-B strings: 7-8, 9-10, 10-10, 9-10, 7-8. Classic Chuck Berry-style lick.',
        technique: 'Keep both fingers parallel. Slide shape up and down. Both strings always fretted.',
        tips: ['Johnny B. Goode uses this', 'Foundation of rock & roll', 'Add palm muting']
      }
    ]
  },
  {
    id: 'rock-11',
    difficulty: 'intermediate',
    genre: 'rock',
    title: 'Octave Shapes',
    description: 'Play thick, bass-heavy rock lines with octaves',
    fretboardPatterns: [
      { name: 'Octave E to E', positions: [5, 'x', 7, 'x', 'x', 'x'], fingers: [1, 0, 3, 0, 0, 0] }
    ],
    scales: [],
    subsections: [
      {
        id: 'rock-11-1',
        title: 'E String Octave Shape',
        content: 'Index on Low E fret 5, ring on D string fret 7. Skip A string (muted). Two Es, one octave apart.',
        technique: 'Mute A string with underside of index finger. Only Low E and D ring.',
        tips: ['Used by Weezer, Green Day', 'Fatter than single notes', 'Move shape anywhere']
      },
      {
        id: 'rock-11-2',
        title: 'A String Octave Shape',
        content: 'Same principle: Index on A, ring two frets up on G. Skip D string. Creates octave.',
        technique: 'These shapes are movable. Fret 5 = A. Fret 7 = B. Fret 10 = D.',
        tips: ['Alternative to power chords', 'Cleaner, more melodic', 'Great for funk-rock']
      }
    ]
  },
  {
    id: 'rock-12',
    difficulty: 'intermediate',
    genre: 'rock',
    title: 'Alternate Picking Speed',
    description: 'Build speed and precision with alternate picking',
    fretboardPatterns: [],
    scales: [],
    subsections: [
      {
        id: 'rock-12-1',
        title: 'Strict Alternate Picking',
        content: 'Down-up-down-up on every note. Never two downs or two ups in a row. This builds speed faster than any other method.',
        technique: 'Wrist moves, not arm. Small, controlled motions. Every downstroke followed by upstroke.',
        tips: ['Start 60 BPM', 'Use metronome always', 'Increase 5 BPM weekly']
      },
      {
        id: 'rock-12-2',
        title: 'Speed Bursts',
        content: 'Play chromatic pattern as fast as possible for 10 seconds. Rest 20 seconds. Repeat 5 times.',
        technique: 'This builds muscle memory for speed. Don\'t worry about being perfect, just fast.',
        tips: ['Shred training method', 'Used by Paul Gilbert', 'Builds max speed over time']
      }
    ]
  },
  {
    id: 'rock-13',
    difficulty: 'intermediate',
    genre: 'rock',
    title: 'Minor Pentatonic Positions 1-5',
    description: 'Master all 5 pentatonic boxes across the neck',
    fretboardPatterns: [],
    scales: [
      { name: 'A Minor Pentatonic - All Positions', pattern: 'Root-b3-4-5-b7', notes: ['A', 'C', 'D', 'E', 'G'] }
    ],
    subsections: [
      {
        id: 'rock-13-1',
        title: '5 Box System',
        content: 'The pentatonic scale has 5 connected box patterns that cover the entire neck. Box 1 (fret 5), Box 2 (fret 7), Box 3 (fret 9), Box 4 (fret 12), Box 5 (fret 14).',
        technique: 'Learn one box per week. Then connect them. This unlocks entire fretboard.',
        tips: ['Most important scale system', 'Takes 2-3 months to master', 'Worth every minute']
      },
      {
        id: 'rock-13-2',
        title: 'Connecting the Boxes',
        content: 'Practice moving from Box 1 to Box 2 smoothly. Then Box 2 to 3. Eventually play all 5 in sequence.',
        technique: 'Look for common notes between boxes. Use them as pivot points.',
        tips: ['Opens up soloing freedom', 'Play anywhere on neck', 'No more stuck in one position']
      }
    ]
  },
  {
    id: 'rock-14',
    difficulty: 'intermediate',
    genre: 'rock',
    title: 'Rock Rhythm Guitar - Dynamics',
    description: 'Add dynamics and expression to rhythm playing',
    fretboardPatterns: [],
    scales: [],
    subsections: [
      {
        id: 'rock-14-1',
        title: 'Loud and Soft',
        content: 'Don\'t play at same volume all the time. Quiet verse, LOUD chorus. Build intensity gradually.',
        technique: 'Verse: light strumming, palm muted. Chorus: full power, open chords ringing.',
        tips: ['Creates emotional impact', 'Quiet parts make loud parts louder', 'Listen to Nirvana dynamics']
      },
      {
        id: 'rock-14-2',
        title: 'Accents and Ghost Notes',
        content: 'Accent (hit hard) on beats 2 and 4. Ghost notes (barely audible) fill in between. Creates groove.',
        technique: 'Down-UP-down-UP. Caps = accent. Lowercase = soft. Adds rhythmic interest.',
        tips: ['Used in funk-rock', 'RHCP signature sound', 'Practice with metronome']
      }
    ]
  },
  {
    id: 'rock-15',
    difficulty: 'intermediate',
    genre: 'rock',
    title: 'Writing Your First Rock Riff',
    description: 'Create original rock riffs using what you\'ve learned',
    fretboardPatterns: [],
    scales: [],
    subsections: [
      {
        id: 'rock-15-1',
        title: 'Riff Construction',
        content: 'Start with power chords. Add palm muting. Include one or two single-note runs. Keep it simple - 4 bars.',
        technique: 'Best riffs are simple and memorable. Use minor pentatonic for melody.',
        tips: ['Record yourself', 'Don\'t overthink it', 'Start with E or A']
      },
      {
        id: 'rock-15-2',
        title: 'Building a Song',
        content: 'Riff A for verse (8 bars). Riff B for pre-chorus (4 bars). Power chord progression for chorus (8 bars). Structure complete.',
        technique: 'Verse riff = palm muted and dark. Chorus = open and bright. Contrast creates impact.',
        tips: ['This is how rock songs are built', 'Write what you\'d want to play', 'Have fun experimenting!']
      }
    ]
  }
];

// ============================================================
// METAL LESSONS - 15 Progressive Lessons
// ============================================================
export const metalLessons: Lesson[] = [
  {
    id: 'metal-1',
    difficulty: 'beginner',
    genre: 'metal',
    title: 'Down-Tuning Basics',
    description: 'Learn alternate tunings for heavier metal sound',
    fretboardPatterns: [],
    scales: [],
    subsections: [
      {
        id: 'metal-1-1',
        title: 'Drop D Tuning',
        content: 'Lower only the Low E string one whole step to D. Other strings stay standard. New tuning: D-A-D-G-B-E.',
        technique: 'Tune Low E down until it matches the D string (two octaves lower). Use electronic tuner.',
        tips: ['Most common metal tuning', 'Allows one-finger power chords', 'Easy to switch back']
      },
      {
        id: 'metal-1-2',
        title: 'Power Chords in Drop D',
        content: 'In Drop D, power chords become one finger! Bar Low E, A, D at same fret. Fret 0 = D5, Fret 3 = F5, Fret 5 = G5.',
        technique: 'Bar index across three strings. Mute high strings. Fast chord changes!',
        tips: ['Used by Pantera, Tool, System of a Down', 'Enables fast riffing', 'Sounds massive']
      }
    ]
  },
  {
    id: 'metal-2',
    difficulty: 'beginner',
    genre: 'metal',
    title: 'Chromatic Speed Exercise - Spider',
    description: 'Build shred speed with the classic spider exercise',
    fretboardPatterns: [
      { name: 'Fret 5', positions: [5, 'x', 'x', 'x', 'x', 'x'], fingers: [1, 0, 0, 0, 0, 0] },
      { name: 'Fret 6', positions: [6, 'x', 'x', 'x', 'x', 'x'], fingers: [2, 0, 0, 0, 0, 0] },
      { name: 'Fret 7', positions: [7, 'x', 'x', 'x', 'x', 'x'], fingers: [3, 0, 0, 0, 0, 0] },
      { name: 'Fret 8', positions: [8, 'x', 'x', 'x', 'x', 'x'], fingers: [4, 0, 0, 0, 0, 0] }
    ],
    scales: [],
    subsections: [
      {
        id: 'metal-2-1',
        title: 'Spider Exercise',
        content: 'Play on ONE string at a time: Low E: 5-6-7-8, then A: 5-6-7-8, then D: 5-6-7-8, continue on all strings. Each finger gets one fret.',
        technique: 'Keep all 4 fingers hovering over frets 5-6-7-8. Minimize finger lift. Alternate pick strictly: DOWN-UP-DOWN-UP.',
        tips: ['Start 60 BPM', 'Perfect for warm-ups', 'Builds finger independence']
      },
      {
        id: 'metal-2-2',
        title: 'Reverse Spider',
        content: 'After ascending (Low E to High E), descend back down. High E: 8-7-6-5, B: 8-7-6-5, G: 8-7-6-5, etc.',
        technique: 'Wrist should barely move. Small, controlled pick strokes. Every note must be clean and even.',
        tips: ['Used by Petrucci, Vai, Malmsteen', 'Increase tempo weekly', 'Essential shred foundation']
      }
    ]
  },
  {
    id: 'metal-3',
    difficulty: 'beginner',
    genre: 'metal',
    title: 'Palm Muted Gallops - Iron Maiden',
    description: 'Master the classic gallop rhythm technique',
    fretboardPatterns: [
      { name: 'E5', positions: [0, 2, 2, 'x', 'x', 'x'], fingers: [0, 1, 3, 0, 0, 0] }
    ],
    scales: [],
    subsections: [
      {
        id: 'metal-3-1',
        title: 'Gallop Rhythm Pattern',
        content: 'Palm mute: Down-Down-UP triplet. First 2 notes muted tight, third note rings. Like a horse galloping.',
        technique: 'Edge of palm on bridge. First 2 picks dead, lift palm for 3rd. Triplet feel: 1-2-3, 1-2-3.',
        tips: ['Classic Iron Maiden sound', 'Keep palm loose', 'Practice with "The Trooper"']
      },
      {
        id: 'metal-3-2',
        title: 'Speed Galloping',
        content: 'Same pattern at 140+ BPM. Open low E: DOWN-DOWN-up-DOWN-DOWN-up. Tight, aggressive, relentless.',
        technique: 'Wrist does the work, not arm. Palm stays planted. Only lift for accent notes.',
        tips: ['Start 100 BPM', 'Build to 160 BPM', 'Essential NWOBHM technique']
      }
    ]
  },
  {
    id: 'metal-4',
    difficulty: 'intermediate',
    genre: 'metal',
    title: 'Thrash Metal Riffs - Downpicking',
    description: 'Build endurance for all-downstroke thrash riffs',
    fretboardPatterns: [
      { name: 'Thrash Riff Pattern', positions: [0, 0, 0, 'x', 'x', 'x'], fingers: [0, 0, 0, 0, 0, 0] }
    ],
    scales: [],
    subsections: [
      {
        id: 'metal-4-1',
        title: 'All Downstrokes',
        content: 'Palm mute Low E, play all downstrokes at 160 BPM. Eighth notes: DOWN-DOWN-DOWN-DOWN-DOWN-DOWN-DOWN-DOWN.',
        technique: 'Wrist loose. Small picking motion. Palm firmly planted on bridge. This builds stamina.',
        tips: ['Metallica, Slayer signature', 'Exhausting at first', 'Build up slowly']
      },
      {
        id: 'metal-4-2',
        title: 'Classic Thrash Pattern',
        content: 'Low E: 0-0-0-3-0-0-0-5. All downstrokes, all palm muted. Sixteenth notes at 140 BPM.',
        technique: 'Fretting hand moves between frets 0-3-5. Picking hand never stops downstroking.',
        tips: ['Master of Puppets opening', 'Builds picking endurance', 'Start at 100 BPM']
      }
    ]
  },
  {
    id: 'metal-5',
    difficulty: 'intermediate',
    genre: 'metal',
    title: 'Harmonic Minor Scale - Dark Sound',
    description: 'Learn the exotic scale of neoclassical metal',
    fretboardPatterns: [],
    scales: [
      { name: 'E Harmonic Minor', pattern: 'W-H-W-W-H-W+H-H', notes: ['E', 'F#', 'G', 'A', 'B', 'C', 'D#'] }
    ],
    subsections: [
      {
        id: 'metal-5-1',
        title: 'What Makes It Dark',
        content: 'Harmonic minor = natural minor with raised 7th. In E: E-F#-G-A-B-C-D#. That D# creates exotic, dramatic sound.',
        technique: 'Between C and D# is 3 half steps (W+H). This creates the "evil" sound.',
        tips: ['Used by Yngwie, Blackmore', 'Sounds classical and dark', 'Foundation of neoclassical metal']
      },
      {
        id: 'metal-5-2',
        title: 'Playing Position',
        content: 'Start Low E fret 12. Pattern: 12-13-15, A: 12-13-15, D: 12-14-15, etc. Same fingering as major but note D#.',
        technique: 'Three notes per string. Index-middle-pinky. Alternate picking throughout.',
        tips: ['Memorize the pattern', 'Practice ascending and descending', 'Use with E minor chord']
      }
    ]
  },
  {
    id: 'metal-6',
    difficulty: 'intermediate',
    genre: 'metal',
    title: 'Tremolo Picking',
    description: 'Develop ultra-fast picking for intense sustained notes',
    fretboardPatterns: [],
    scales: [],
    subsections: [
      {
        id: 'metal-6-1',
        title: 'The Technique',
        content: 'Pick one note as fast as physically possible. Alternate picking at extreme speed. Sounds like a continuous tone.',
        technique: 'Wrist VERY loose. Tiny picking motion. Light grip on pick. Like shaking your hand rapidly.',
        tips: ['Used in black metal, death metal', 'Start slow, build speed', 'Extremely exhausting']
      },
      {
        id: 'metal-6-2',
        title: 'Tremolo Bursts',
        content: 'Practice 5-second tremolo bursts. Rest 10 seconds. Repeat. This builds fast-twitch muscle.',
        technique: 'Don\'t tense up. Stay relaxed. Speed comes from efficiency, not force.',
        tips: ['Jeff Loomis signature technique', 'Practice daily in short bursts', 'Builds incredible speed']
      }
    ]
  },
  {
    id: 'metal-7',
    difficulty: 'intermediate',
    genre: 'metal',
    title: 'Pinch Harmonics - Squealies',
    description: 'Create those iconic squealing metal harmonics',
    fretboardPatterns: [],
    scales: [],
    subsections: [
      {
        id: 'metal-7-1',
        title: 'Basic Pinch Harmonic',
        content: 'Pick note normally but let thumb edge touch string immediately after pick strikes. Creates high-pitched squeal.',
        technique: 'Strike string with pick AND thumb simultaneously. Only works on wound strings with distortion.',
        tips: ['Zakk Wylde signature sound', 'Requires distortion/gain', 'Takes practice to nail']
      },
      {
        id: 'metal-7-2',
        title: 'Controlled Squeals',
        content: 'Different pick positions create different harmonic pitches. Experiment with picking closer to bridge vs pickup.',
        technique: 'Over bridge pickup = higher squeal. Near neck = lower. Add vibrato for more expression.',
        tips: ['Dimebag Darrell mastered this', 'Used on bent notes', 'Signature metal technique']
      }
    ]
  },
  {
    id: 'metal-8',
    difficulty: 'intermediate',
    genre: 'metal',
    title: 'Three-Note-Per-String Scales',
    description: 'Shred technique for blazing fast scales',
    fretboardPatterns: [],
    scales: [],
    subsections: [
      {
        id: 'metal-8-1',
        title: 'Why Three Notes',
        content: 'Three notes per string allows consistent fingering pattern. Index-middle-pinky on every string. Symmetrical and fast.',
        technique: 'E minor: Low E (12-14-15), A (12-14-15), D (12-14-16), G (12-14-16), B (12-15-17), E (12-15-17).',
        tips: ['Faster than 2-note patterns', 'Used by John Petrucci', 'Essential for shred']
      },
      {
        id: 'metal-8-2',
        title: 'Speed Building',
        content: 'Practice with metronome. Start 60 BPM sixteenth notes. Increase 5 BPM when perfect. Goal: 120 BPM = shred speed.',
        technique: 'Strict alternate picking. Down-up-down on each string. Smooth string changes.',
        tips: ['Takes months to build speed', 'Practice 10 minutes daily', 'Record progress']
      }
    ]
  },
  {
    id: 'metal-9',
    difficulty: 'intermediate',
    genre: 'metal',
    title: 'Sweep Picking - Arpeggio Technique',
    description: 'Master the technique for lightning-fast arpeggios',
    fretboardPatterns: [
      { name: 'Am Sweep Shape', positions: ['x', 0, 2, 2, 1, 0], fingers: [0, 0, 3, 4, 1, 0] }
    ],
    scales: [],
    subsections: [
      {
        id: 'metal-9-1',
        title: 'What is Sweeping?',
        content: 'Instead of alternate picking, "sweep" pick in one direction across strings. Like strumming but one note per string.',
        technique: 'Downward sweep: all downstrokes. Upward: all upstrokes. Mute previous strings as you go.',
        tips: ['Most difficult technique', 'Sounds incredible when mastered', 'Yngwie signature move']
      },
      {
        id: 'metal-9-2',
        title: 'Basic 3-String Sweep',
        content: 'D-G-B strings: DOWN-DOWN-DOWN in one motion. Mute D when playing G. Mute G when playing B.',
        technique: 'Roll pick across strings. Don\'t pick separately. One flowing motion.',
        tips: ['Start incredibly slow', 'Clean muting is critical', 'Speed comes later']
      }
    ]
  },
  {
    id: 'metal-10',
    difficulty: 'intermediate',
    genre: 'metal',
    title: 'Phrygian Dominant - Exotic Metal Scale',
    description: 'Learn the Middle Eastern-sounding metal scale',
    fretboardPatterns: [],
    scales: [
      { name: 'E Phrygian Dominant', pattern: '1-b2-3-4-5-b6-b7', notes: ['E', 'F', 'G#', 'A', 'B', 'C', 'D'] }
    ],
    subsections: [
      {
        id: 'metal-10-1',
        title: 'The Exotic Sound',
        content: 'Phrygian Dominant has both flatted 2nd AND major 3rd. F to G# interval creates exotic, Eastern flavor.',
        technique: 'E Phrygian Dominant: E-F-G#-A-B-C-D. Play over E power chord.',
        tips: ['Used in death metal, black metal', 'Sounds dark and exotic', 'Nile, Behemoth use this']
      },
      {
        id: 'metal-10-2',
        title: 'Riff Applications',
        content: 'Use scale notes to create exotic riffs. E-F-E creates instant tension. Resolving to G# releases it.',
        technique: 'Palm mute the F for extra darkness. Open E rings. Sounds massive with distortion.',
        tips: ['Instant evil sound', 'Combine with harmonic minor', 'Sounds best in Drop D']
      }
    ]
  },
  {
    id: 'metal-11',
    difficulty: 'intermediate',
    genre: 'metal',
    title: 'Two-Hand Tapping - Music Theory Foundation',
    description: 'Master tapping with proper chord and scale relationships',
    fretboardPatterns: [
      { name: 'E Major Fretting (Left Hand)', positions: [0, 2, 1, 'x', 'x', 'x'], fingers: [0, 2, 1, 0, 0, 0] },
      { name: 'A Minor Fretting (Left Hand)', positions: ['x', 0, 2, 2, 'x', 'x'], fingers: [0, 0, 2, 3, 0, 0] }
    ],
    scales: [
      { name: 'E Major Scale (for Tapping Hand)', pattern: 'Root-2nd-3rd-4th-5th-6th-7th', notes: ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'] },
      { name: 'A Natural Minor Scale (for Tapping Hand)', pattern: 'Root-2nd-b3-4th-5th-b6-b7', notes: ['A', 'B', 'C', 'D', 'E', 'F', 'G'] }
    ],
    subsections: [
      {
        id: 'metal-11-1',
        title: 'Understanding the Theory',
        content: 'Two-hand tapping splits musical roles: FRETTING HAND (left) establishes the harmonic foundation by playing the root note and chord tones (3rd, 5th). TAPPING HAND (right) plays melodic intervals from the associated scale, creating the "lead" part. All tapped notes must be FROM THE SCALE of the chord you\'re playing.',
        technique: 'Think of it like this: Your left hand plays the "rhythm guitar" chord. Your right hand simultaneously plays the "lead guitar" solo using scale notes that fit that chord.',
        tips: ['This is why it sounds so full and rich', 'Not random tapping - theory-based note selection', 'Each hand has a specific musical purpose']
      },
      {
        id: 'metal-11-2',
        title: 'E Major Tapping Example',
        content: 'LEFT HAND: Fret E major chord - Root E (low E open), B (A string fret 2), G# (D string fret 1). RIGHT HAND: Tap notes from E MAJOR SCALE on the low E string: Tap F# (fret 2), pull off to E (open). Then tap A (fret 5), pull to E. Then tap B (fret 7), pull to E.',
        technique: 'Your left hand holds the E major chord foundation the entire time. Your right index finger taps F#-A-B (all from E major scale), pulling off to the root E each time. This creates cascading melodic runs over a sustained chord.',
        tips: ['Start with low E string only', 'Left hand NEVER moves - just holds chord', 'Right hand taps scale intervals: 2nd (F#), 4th (A), 5th (B)']
      },
      {
        id: 'metal-11-3',
        title: 'A Minor Tapping Example',
        content: 'LEFT HAND: Fret A minor chord - Root A (A string open), E (D string fret 2), C (G string fret 2). RIGHT HAND: Tap A MINOR SCALE notes on A string: Tap B (fret 2), pull to A (open). Tap D (fret 5), pull to A. Tap F (fret 8), pull to A.',
        technique: 'Left hand maintains Am chord shape. Right hand taps B-D-F from A natural minor scale (A-B-C-D-E-F-G). Each tap resolves back to the root note A, creating a rhythmic melodic pattern.',
        tips: ['Darker, sadder sound than major', 'Pull-offs should be firm and deliberate', 'Practice slowly: tap-pull, tap-pull, tap-pull']
      },
      {
        id: 'metal-11-4',
        title: 'C Dominant 7th - Mixolydian Mode',
        content: 'LEFT HAND: Fret C7 chord - Root C (A string fret 3), plus other chord tones. RIGHT HAND: Use C MIXOLYDIAN scale (C-D-E-F-G-A-Bb) for tapping. The Bb (flatted 7th) gives the dominant sound. Tap D (A string fret 5), pull to C. Tap F (fret 8), pull to C.',
        technique: 'Dominant 7th chords use Mixolydian mode (major scale with flatted 7th). This creates bluesy, rock tension. The tapped notes D and F are the 2nd and 4th scale degrees, pulling back to the C root.',
        tips: ['Advanced: different scale for dominant chords', 'Mixolydian = major scale with b7', 'Eddie Van Halen used this extensively']
      },
      {
        id: 'metal-11-5',
        title: 'Right Hand Tapping Technique',
        content: 'Use your right INDEX FINGER as the tapping finger. Strike the string FIRMLY directly behind the fret wire (just like your left hand fingers). When pulling off, pull the finger SLIGHTLY DOWNWARD/ACROSS the string - this creates a "plucking" motion that sounds the lower note clearly.',
        technique: 'Don\'t just lift your finger straight up - that creates a weak pull-off. Pull DOWN and slightly toward the floor, like you\'re flicking the string. This snapping motion is crucial for clear articulation.',
        tips: ['Tap with authority - don\'t be timid', 'Pull-offs need a "snap" motion', 'Same firmness as left-hand fretting']
      },
      {
        id: 'metal-11-6',
        title: 'Building Speed and Fluidity',
        content: 'Start with ONE tap per chord: tap-pull, tap-pull (very slow). Add a second tap: tap-pull-tap-pull (still slow). Build to three taps: tap-pull-tap-pull-tap-pull. Gradually increase tempo from 60 BPM to 120+ BPM. The goal is smooth, even articulation.',
        technique: 'Use a metronome. Start absurdly slow - one tap every 2 seconds. Focus on clean pull-offs. Speed comes naturally after 2-3 weeks of daily practice.',
        tips: ['Patience is everything', 'Clean and slow beats fast and sloppy', 'Eddie practiced this for MONTHS before Eruption']
      }
    ]
  },
  {
    id: 'metal-12',
    difficulty: 'mastery',
    genre: 'metal',
    title: 'Diminished Scale - Symmetrical Shred',
    description: 'Master the symmetrical diminished scale pattern',
    fretboardPatterns: [],
    scales: [
      { name: 'E Diminished (W-H)', pattern: 'W-H-W-H-W-H-W-H', notes: ['E', 'F#', 'G', 'A', 'Bb', 'C', 'C#', 'D#'] }
    ],
    subsections: [
      {
        id: 'metal-12-1',
        title: 'Symmetrical Pattern',
        content: 'Alternates whole step, half step throughout. Creates 8-note scale. Pattern repeats every 3 frets.',
        technique: 'E diminished: E-F#-G-A-Bb-C-C#-D#. Play 2 frets, 1 fret, 2 frets, 1 fret pattern.',
        tips: ['Used in technical death metal', 'Very jazz-influenced', 'Sounds mechanical and alien']
      },
      {
        id: 'metal-12-2',
        title: 'Application',
        content: 'Use over diminished chords or to create outside tension. Sounds dissonant and aggressive.',
        technique: 'Play fast to hide dissonance. Resolves beautifully to minor or major.',
        tips: ['Advanced theory', 'Meshuggah, Gojira use this', 'Takes time to sound musical']
      }
    ]
  },
  {
    id: 'metal-13',
    difficulty: 'mastery',
    genre: 'metal',
    title: 'Economy Picking',
    description: 'Efficient picking technique for maximum speed',
    fretboardPatterns: [],
    scales: [],
    subsections: [
      {
        id: 'metal-13-1',
        title: 'What is Economy Picking?',
        content: 'Combine alternate picking and sweep picking. When changing strings in same direction, continue that direction.',
        technique: 'Descending? Use downstrokes when moving to lower string. Ascending? Upstrokes when moving to higher string.',
        tips: ['More efficient than strict alternate', 'Frank Gambale technique', 'Allows incredible speed']
      },
      {
        id: 'metal-13-2',
        title: 'Practice Pattern',
        content: 'Three-note-per-string scale. Down-up-down (string 1), down-up-down (string 2). Notice two downs in a row at string change.',
        technique: 'Allow pick to sweep across string change. Don\'t fight physics.',
        tips: ['Feels weird at first', 'Very efficient at high speeds', 'Takes months to integrate']
      }
    ]
  },
  {
    id: 'metal-14',
    difficulty: 'mastery',
    genre: 'metal',
    title: 'String Skipping',
    description: 'Advanced technique for wide interval runs',
    fretboardPatterns: [],
    scales: [],
    subsections: [
      {
        id: 'metal-14-1',
        title: 'The Technique',
        content: 'Skip strings during runs. E string fret 5, skip to G string fret 5, back to A string fret 7, etc.',
        technique: 'Right hand must jump accurately. Left hand shifts positions. Creates angular, technical sound.',
        tips: ['Paul Gilbert signature technique', 'Sounds impressive', 'Great for developing precision']
      },
      {
        id: 'metal-14-2',
        title: 'Practical Lick',
        content: 'Low E-5, G-5, A-7, B-5, D-7, High E-5. Repeat. Creates wide interval melody.',
        technique: 'Strict alternate picking. Each string is only one note. Precision critical.',
        tips: ['John Petrucci uses extensively', 'Builds picking accuracy', 'Sounds non-traditional']
      }
    ]
  },
  {
    id: 'metal-15',
    difficulty: 'mastery',
    genre: 'metal',
    title: 'Writing Progressive Metal Riffs',
    description: 'Compose complex, interesting metal compositions',
    fretboardPatterns: [],
    scales: [],
    subsections: [
      {
        id: 'metal-15-1',
        title: 'Odd Time Signatures',
        content: 'Don\'t stick to 4/4. Try 7/8 (1-2-3-4-5-6-7), 5/4 (1-2-3-4-5), 11/8. Creates progressive feel.',
        technique: 'Count out loud. Accent beat 1. Odd meters sound fresh and technical.',
        tips: ['Tool, Meshuggah signature', 'Sounds complex but isn\'t', 'Start with 7/8']
      },
      {
        id: 'metal-15-2',
        title: 'Polyrhythm and Polymeters',
        content: 'Play 3 notes over 4 beats. Creates rhythmic tension. Resolve back to 4/4 for release.',
        technique: 'Drums play 4/4, guitar plays groups of 3. Eventually syncs up. Mathematical and heavy.',
        tips: ['Advanced prog metal', 'Periphery, Animals as Leaders', 'Sounds impossible but works']
      }
    ]
  }
];

// ============================================================
// BLUES LESSONS - 15 Progressive Lessons
// ============================================================
export const bluesLessons: Lesson[] = [
  {
    id: 'blues-1',
    difficulty: 'beginner',
    genre: 'blues',
    title: 'Blues Pentatonic Scale - Foundation',
    description: 'Master the most important blues scale',
    fretboardPatterns: [
      { name: 'Low E - Fret 5', positions: [5, 'x', 'x', 'x', 'x', 'x'], fingers: [1, 0, 0, 0, 0, 0] },
      { name: 'Low E - Fret 8', positions: [8, 'x', 'x', 'x', 'x', 'x'], fingers: [4, 0, 0, 0, 0, 0] },
      { name: 'A - Fret 5', positions: ['x', 5, 'x', 'x', 'x', 'x'], fingers: [0, 1, 0, 0, 0, 0] },
      { name: 'A - Fret 7', positions: ['x', 7, 'x', 'x', 'x', 'x'], fingers: [0, 3, 0, 0, 0, 0] }
    ],
    scales: [
      { name: 'A Minor Pentatonic', pattern: 'Root-b3-4-5-b7', notes: ['A', 'C', 'D', 'E', 'G'] }
    ],
    subsections: [
      {
        id: 'blues-1-1',
        title: 'Complete Blues Box',
        content: 'A minor pentatonic at fret 5. LOW E: 5-8, A: 5-7, D: 5-7, G: 5-7, B: 5-8, HIGH E: 5-8.',
        technique: 'Index on 5, ring on 7, pinky on 8. Hand stays in position.',
        tips: ['Foundation of all blues', 'Works over any blues progression', 'Memorize this first']
      },
      {
        id: 'blues-1-2',
        title: 'Blues Scale Addition',
        content: 'Add flatted 5th (blue note): Between D and E. Chromatic passing tone creates that blues sound.',
        technique: 'A Blues Scale: A-C-D-D#/Eb-E-G. The D# is the "blue note" - secret ingredient.',
        tips: ['Adds that crying sound', 'Use as passing tone', 'Don\'t land on it']
      }
    ]
  },
  {
    id: 'blues-2',
    difficulty: 'beginner',
    genre: 'blues',
    title: '12-Bar Blues - The Foundation',
    description: 'Learn the most important progression in blues',
    fretboardPatterns: [
      { name: 'E7', positions: [0, 2, 0, 1, 0, 0], fingers: [0, 2, 0, 1, 0, 0] },
      { name: 'A7', positions: ['x', 0, 2, 0, 2, 0], fingers: [0, 0, 2, 0, 3, 0] },
      { name: 'B7', positions: ['x', 2, 1, 2, 0, 2], fingers: [0, 2, 1, 3, 0, 4] }
    ],
    scales: [],
    subsections: [
      {
        id: 'blues-2-1',
        title: 'The Pattern',
        content: '4 bars I (E7), 2 bars IV (A7), 2 bars I (E7), 1 bar V (B7), 1 bar IV (A7), 2 bars I (E7). That\'s 12 bars.',
        technique: 'Count to 4 for each chord change. Play steady shuffle rhythm.',
        tips: ['Foundation of blues music', 'Thousands of songs use this', 'Learn in multiple keys']
      },
      {
        id: 'blues-2-2',
        title: 'Quick Change Variation',
        content: 'Bar 2 goes to IV chord instead of staying on I. More sophisticated sound.',
        technique: 'E7 (1 bar), A7 (1 bar), E7 (2 bars), then continue normal pattern.',
        tips: ['Common in blues', 'Creates more movement', 'Try both versions']
      }
    ]
  },
  // Continue with 13 more blues lessons...
  // For brevity, I'll create summaries for the remaining lessons
  {
    id: 'blues-3',
    difficulty: 'beginner',
    genre: 'blues',
    title: 'Shuffle Rhythm Pattern',
    description: 'Master the swing feel essential to blues',
    fretboardPatterns: [],
    scales: [],
    subsections: [
      {
        id: 'blues-3-1',
        title: 'Triplet Feel',
        content: 'Shuffle rhythm = long-short, long-short. Not straight eighth notes. Based on triplets: 1-and-a-2-and-a.',
        technique: 'Play beat 1 and "a", skip "and". Creates swinging, bouncing feel.',
        tips: ['Essential blues rhythm', 'Listen to Muddy Waters', 'Feel it, don\'t count it']
      }
    ]
  },
  {
    id: 'blues-4',
    difficulty: 'beginner',
    genre: 'blues',
    title: 'String Bending - Blues Expression',
    description: 'Learn to bend strings for that crying blues sound',
    fretboardPatterns: [],
    scales: [],
    subsections: [
      {
        id: 'blues-4-1',
        title: 'Basic Bend Technique',
        content: 'B string fret 8: Bend up one whole step (sounds like fret 10). Most important blues technique.',
        technique: 'Ring finger bends, middle and index support behind. Push toward ceiling.',
        tips: ['Crying, vocal-like sound', 'B.B. King signature', 'Bend in tune always']
      }
    ]
  },
  {
    id: 'blues-5',
    difficulty: 'intermediate',
    genre: 'blues',
    title: 'Classic B.B. King Licks',
    description: 'Master the King of Blues guitar style',
    fretboardPatterns: [],
    scales: [],
    subsections: [
      {
        id: 'blues-5-1',
        title: 'The Box Lick',
        content: 'B string: Bend 8 up, release to 8, play 5, back to 8, pull to 5. Classic B.B. phrase.',
        technique: 'Big vibrato on bent notes. Each note sings. Don\'t rush.',
        tips: ['Signature B.B. King lick', 'Used in thousands of solos', 'Add your own vibrato']
      }
    ]
  },
  {
    id: 'blues-6',
    difficulty: 'intermediate',
    genre: 'blues',
    title: 'Turnaround Licks',
    description: 'End 12-bar blues phrases smoothly',
    fretboardPatterns: [],
    scales: [],
    subsections: [
      {
        id: 'blues-6-1',
        title: 'Classic Turnaround',
        content: 'Last 2 bars of 12-bar: Walk up E string: fret 0-1-2-3. Leads back to top.',
        technique: 'Chromatic walk creates tension that resolves when progression repeats.',
        tips: ['Signals end of 12 bars', 'Essential blues device', 'Try different variations']
      }
    ]
  },
  {
    id: 'blues-7',
    difficulty: 'intermediate',
    genre: 'blues',
    title: 'Double Stops - Chuck Berry Style',
    description: 'Play harmonized blues melodies',
    fretboardPatterns: [],
    scales: [],
    subsections: [
      {
        id: 'blues-7-1',
        title: 'Blues Double Stops',
        content: 'G and B strings together. Play 5-5, 7-8, 8-8. Creates moving harmony.',
        technique: 'Both fingers move together. Two-note melodies sound full.',
        tips: ['Chuck Berry signature', 'Johnny B. Goode intro', 'Essential rock & roll']
      }
    ]
  },
  {
    id: 'blues-8',
    difficulty: 'intermediate',
    genre: 'blues',
    title: 'Slow Blues Phrasing',
    description: 'Master space and dynamics in slow blues',
    fretboardPatterns: [],
    scales: [],
    subsections: [
      {
        id: 'blues-8-1',
        title: 'Less is More',
        content: 'Don\'t play constantly. Play a phrase, let it breathe. Silence is powerful in slow blues.',
        technique: 'Think: call and response. Guitar answers vocal line. Space between phrases.',
        tips: ['Albert King mastered this', 'Let notes ring and decay', 'Patience creates impact']
      }
    ]
  },
  {
    id: 'blues-9',
    difficulty: 'intermediate',
    genre: 'blues',
    title: 'Vibrato Control',
    description: 'Develop expressive vibrato technique',
    fretboardPatterns: [],
    scales: [],
    subsections: [
      {
        id: 'blues-9-1',
        title: 'Slow, Wide Vibrato',
        content: 'Blues vibrato is slow and wide. Not fast shimmer. Rocks back and forth deliberately.',
        technique: 'Rotate wrist slowly. Let pitch swell up and down. Like a voice wavering.',
        tips: ['B.B. King secret weapon', 'Makes one note speak', 'Practice on every held note']
      }
    ]
  },
  {
    id: 'blues-10',
    difficulty: 'intermediate',
    genre: 'blues',
    title: 'Minor Blues vs Major Blues',
    description: 'Understand the two types of blues tonality',
    fretboardPatterns: [],
    scales: [],
    subsections: [
      {
        id: 'blues-10-1',
        title: 'Playing Minor Over Major',
        content: 'Blues uses minor pentatonic over major chords. This clash creates blues sound.',
        technique: 'A minor pentatonic over A7 chord. The b3 against major 3rd = blues.',
        tips: ['Unique to blues', 'Why blues sounds "blue"', 'Mix major and minor tones']
      }
    ]
  },
  {
    id: 'blues-11',
    difficulty: 'intermediate',
    genre: 'blues',
    title: 'Chicago Blues Style',
    description: 'Electric blues techniques and tone',
    fretboardPatterns: [],
    scales: [],
    subsections: [
      {
        id: 'blues-11-1',
        title: 'Tube Amp Overdrive',
        content: 'Chicago blues tone: slight overdrive, neck pickup, tone rolled back to 7.',
        technique: 'Clean but with grit. Not heavy distortion. Touch-sensitive dynamics.',
        tips: ['Muddy Waters tone', 'Volume creates drive', 'Fingers control dynamics']
      }
    ]
  },
  {
    id: 'blues-12',
    difficulty: 'mastery',
    genre: 'blues',
    title: 'Mixolydian Mode - Dominant Blues',
    description: 'Advanced scale for sophisticated blues',
    fretboardPatterns: [],
    scales: [
      { name: 'A Mixolydian', pattern: '1-2-3-4-5-6-b7', notes: ['A', 'B', 'C#', 'D', 'E', 'F#', 'G'] }
    ],
    subsections: [
      {
        id: 'blues-12-1',
        title: 'Major Sound with b7',
        content: 'Mixolydian = major scale with flatted 7th. Perfect over dominant 7th chords.',
        technique: 'Use over A7 in 12-bar blues. Mix with minor pentatonic for variety.',
        tips: ['More sophisticated sound', 'Jazz-blues crossover', 'Robben Ford uses this']
      }
    ]
  },
  {
    id: 'blues-13',
    difficulty: 'mastery',
    genre: 'blues',
    title: 'Chord Melody Blues',
    description: 'Play melody and chords simultaneously',
    fretboardPatterns: [],
    scales: [],
    subsections: [
      {
        id: 'blues-13-1',
        title: 'Walking Bassline with Chords',
        content: 'Thumb plays walking bass on beats 1 and 3. Fingers play chord on beats 2 and 4.',
        technique: 'Fingerstyle technique. Bass note-chord-bass note-chord pattern.',
        tips: ['Robert Johnson technique', 'Complete one-man-band', 'Requires fingerpicking skill']
      }
    ]
  },
  {
    id: 'blues-14',
    difficulty: 'mastery',
    genre: 'blues',
    title: 'Jazz Blues - Sophisticated Changes',
    description: 'Advanced chord substitutions in blues',
    fretboardPatterns: [],
    scales: [],
    subsections: [
      {
        id: 'blues-14-1',
        title: 'Jazz Blues Progression',
        content: '12-bar with jazz chords: Imaj7-IV7-Imaj7-I7, IV7-#IV°7-Imaj7-VI7, ii7-V7-Imaj7-VI7-ii7-V7.',
        technique: 'More chord changes, more movement. Jazz harmony applied to blues.',
        tips: ['Wes Montgomery played this', 'Sophisticated blues', 'Requires jazz chord knowledge']
      }
    ]
  },
  {
    id: 'blues-15',
    difficulty: 'mastery',
    genre: 'blues',
    title: 'Creating Your Blues Voice',
    description: 'Develop your own unique blues style',
    fretboardPatterns: [],
    scales: [],
    subsections: [
      {
        id: 'blues-15-1',
        title: 'Finding Your Sound',
        content: 'Blues is about feeling, not just technique. Study masters but develop your own phrasing.',
        technique: 'Your vibrato, your bends, your timing. These make you unique.',
        tips: ['Stevie Ray had his sound', 'Albert King had his', 'You develop yours']
      }
    ]
  }
];

// ============================================================
// JAZZ LESSONS - 15 Progressive Lessons
// ============================================================
export const jazzLessons: Lesson[] = [
  {
    id: 'jazz-1',
    difficulty: 'beginner',
    genre: 'jazz',
    title: 'Jazz Chord Voicings - 7th Chords',
    description: 'Master essential maj7, min7, and dom7 shapes',
    fretboardPatterns: [
      { name: 'Cmaj7', positions: ['x', 3, 2, 0, 0, 0], fingers: [0, 3, 2, 0, 0, 0] },
      { name: 'Dm7', positions: ['x', 'x', 0, 2, 1, 1], fingers: [0, 0, 0, 2, 1, 1] },
      { name: 'G7', positions: [3, 2, 0, 0, 0, 1], fingers: [3, 2, 0, 0, 0, 1] }
    ],
    scales: [],
    subsections: [
      {
        id: 'jazz-1-1',
        title: 'Essential 7th Chords',
        content: 'Jazz uses 7th chords as standard. Maj7 (dreamy), m7 (smooth), 7 (bluesy tension).',
        technique: 'Learn these three types in all keys. Foundation of jazz harmony.',
        tips: ['Different from rock/pop', 'More complex sound', 'Practice ii-V-I']
      }
    ]
  },
  // Continue with 14 more jazz lessons following same pattern
  {
    id: 'jazz-2',
    difficulty: 'beginner',
    genre: 'jazz',
    title: 'ii-V-I Progression',
    description: 'Master jazz\'s most important progression',
    fretboardPatterns: [],
    scales: [],
    subsections: [
      {
        id: 'jazz-2-1',
        title: 'The Foundation',
        content: 'In C major: Dm7 (ii), G7 (V), Cmaj7 (I). Powers 90% of jazz standards.',
        technique: 'Practice smooth voice leading between chords. Minimal finger movement.',
        tips: ['Most important jazz progression', 'Learn all 12 keys', 'Foundation of standards']
      }
    ]
  },
  {
    id: 'jazz-3',
    difficulty: 'intermediate',
    genre: 'jazz',
    title: 'Jazz Walking Bass Lines',
    description: 'Create moving basslines under chords',
    fretboardPatterns: [],
    scales: [],
    subsections: [
      {
        id: 'jazz-3-1',
        title: 'Quarter Note Walking',
        content: 'Play root on beat 1, approach next chord from half step below or above.',
        technique: 'Cmaj7: C-E-F#-G. Next chord is G7, approached from F#.',
        tips: ['Creates forward motion', 'Standard jazz technique', 'Study bass players']
      }
    ]
  },
  {
    id: 'jazz-4',
    difficulty: 'intermediate',
    genre: 'jazz',
    title: 'Chord Tone Soloing',
    description: 'Target chord tones for sophisticated solos',
    fretboardPatterns: [],
    scales: [],
    subsections: [
      {
        id: 'jazz-4-1',
        title: 'Arpeggiate the Changes',
        content: 'Play chord tones (1-3-5-7) as melody. Creates harmonic clarity.',
        technique: 'Over Dm7: D-F-A-C. Over G7: G-B-D-F. Outlines harmony perfectly.',
        tips: ['Wes Montgomery technique', 'Sounds instantly jazzy', 'Connect with scale tones']
      }
    ]
  },
  {
    id: 'jazz-5',
    difficulty: 'intermediate',
    genre: 'jazz',
    title: 'Drop 2 Voicings',
    description: 'Play smooth chord progressions with drop 2',
    fretboardPatterns: [],
    scales: [],
    subsections: [
      {
        id: 'jazz-5-1',
        title: 'What are Drop 2 Chords?',
        content: 'Take 4-note chord, drop second voice down an octave. Creates spread voicing.',
        technique: 'Playable on middle 4 strings. Smooth voice leading.',
        tips: ['Standard jazz voicing', 'Pat Martino used these', 'Learn on all string sets']
      }
    ]
  },
  {
    id: 'jazz-6',
    difficulty: 'intermediate',
    genre: 'jazz',
    title: 'Modes and Modal Jazz',
    description: 'Understand modes for jazz improvisation',
    fretboardPatterns: [],
    scales: [
      { name: 'D Dorian', pattern: '1-2-b3-4-5-6-b7', notes: ['D', 'E', 'F', 'G', 'A', 'B', 'C'] }
    ],
    subsections: [
      {
        id: 'jazz-6-1',
        title: 'Dorian Mode',
        content: 'Minor scale with natural 6. Perfect for minor 7th chords.',
        technique: 'Over Dm7: D Dorian. Highlights the chord quality.',
        tips: ['Modal jazz foundation', 'Miles Davis "So What"', 'Sounds sophisticated']
      }
    ]
  },
  {
    id: 'jazz-7',
    difficulty: 'intermediate',
    genre: 'jazz',
    title: 'Bebop Scale',
    description: 'Add chromatic passing tone for bebop lines',
    fretboardPatterns: [],
    scales: [
      { name: 'C Major Bebop', pattern: '1-2-3-4-5-#5-6-7', notes: ['C', 'D', 'E', 'F', 'G', 'G#', 'A', 'B'] }
    ],
    subsections: [
      {
        id: 'jazz-7-1',
        title: 'The Chromatic Passing Tone',
        content: 'Major bebop scale adds #5 (G#) between 5 and 6. Creates flowing lines with 8 notes.',
        technique: '8 notes instead of 7. Chord tones land on downbeats.',
        tips: ['Charlie Parker invention', 'Essential bebop sound', 'Practice ascending/descending']
      }
    ]
  },
  {
    id: 'jazz-8',
    difficulty: 'mastery',
    genre: 'jazz',
    title: 'Altered Scale - Outside Sound',
    description: 'Play altered dominants for tension',
    fretboardPatterns: [],
    scales: [
      { name: 'G Altered', pattern: '1-b9-#9-3-b5-#5-b7', notes: ['G', 'Ab', 'A#', 'B', 'Db', 'Eb', 'F'] }
    ],
    subsections: [
      {
        id: 'jazz-8-1',
        title: 'Super Locrian',
        content: 'Altered scale = 7th mode of melodic minor. All tensions altered.',
        technique: 'Use over G7alt chord resolving to Cmaj7. Creates maximum tension.',
        tips: ['Advanced jazz harmony', 'John Coltrane used this', 'Sounds "out"']
      }
    ]
  },
  {
    id: 'jazz-9',
    difficulty: 'mastery',
    genre: 'jazz',
    title: 'Tritone Substitution',
    description: 'Substitute dominant chords for smooth changes',
    fretboardPatterns: [],
    scales: [],
    subsections: [
      {
        id: 'jazz-9-1',
        title: 'The Sub',
        content: 'Replace V7 with bII7. G7 becomes Db7. Shares same tritone.',
        technique: 'Instead of Dm7-G7-Cmaj7, play Dm7-Db7-Cmaj7. Chromatic bass.',
        tips: ['Sophisticated reharmonization', 'Creates smooth voice leading', 'Jazz standard technique']
      }
    ]
  },
  {
    id: 'jazz-10',
    difficulty: 'mastery',
    genre: 'jazz',
    title: 'Comping Patterns',
    description: 'Develop sophisticated rhythmic accompaniment',
    fretboardPatterns: [],
    scales: [],
    subsections: [
      {
        id: 'jazz-10-1',
        title: 'Jazz Rhythm',
        content: 'Don\'t play on every beat. Syncopation and space create swing.',
        technique: 'Play on "and" of 2, beat 4. Skip beat 1 sometimes.',
        tips: ['Creates conversation with soloist', 'Freddie Green style', 'Less is more']
      }
    ]
  },
  {
    id: 'jazz-11',
    difficulty: 'mastery',
    genre: 'jazz',
    title: 'Chord Melody Arrangements',
    description: 'Play melody, harmony, and bass simultaneously',
    fretboardPatterns: [],
    scales: [],
    subsections: [
      {
        id: 'jazz-11-1',
        title: 'Full Arrangement',
        content: 'Melody on top strings, chord tones on middle, bass note on bottom.',
        technique: 'Requires advanced voicings. Study Joe Pass, Ted Greene.',
        tips: ['Complete solo guitar', 'Very challenging', 'Beautiful when mastered']
      }
    ]
  },
  {
    id: 'jazz-12',
    difficulty: 'mastery',
    genre: 'jazz',
    title: 'Diminished Concepts',
    description: 'Use diminished harmony for tension and release',
    fretboardPatterns: [],
    scales: [],
    subsections: [
      {
        id: 'jazz-12-1',
        title: 'Diminished Scale Application',
        content: 'Over dominant 7th chords with altered tensions. Creates outside sound.',
        technique: 'G7: G half-whole diminished scale. Symmetrical pattern.',
        tips: ['Advanced harmonic concept', 'Coltrane changes use this', 'Very theoretical']
      }
    ]
  },
  {
    id: 'jazz-13',
    difficulty: 'mastery',
    genre: 'jazz',
    title: 'Playing Standards',
    description: 'Approach classic jazz standards',
    fretboardPatterns: [],
    scales: [],
    subsections: [
      {
        id: 'jazz-13-1',
        title: 'Standard Repertoire',
        content: 'Learn: Autumn Leaves, All the Things You Are, Take the A Train. Essential standards.',
        technique: 'Analyze chord progressions. Find ii-V-I patterns. Practice head and changes.',
        tips: ['Foundation of jam sessions', 'Real Book is essential', 'Learn 10 standards minimum']
      }
    ]
  },
  {
    id: 'jazz-14',
    difficulty: 'mastery',
    genre: 'jazz',
    title: 'Transcribing Solos',
    description: 'Learn by ear from the masters',
    fretboardPatterns: [],
    scales: [],
    subsections: [
      {
        id: 'jazz-14-1',
        title: 'The Process',
        content: 'Slow down recording 50%. Play one phrase. Figure it out by ear. Write it down. Repeat.',
        technique: 'Start with Wes Montgomery (clean tone, easy to hear). Progress to Parker.',
        tips: ['Best way to learn jazz', 'Develops ear', 'Absorb vocabulary']
      }
    ]
  },
  {
    id: 'jazz-15',
    difficulty: 'mastery',
    genre: 'jazz',
    title: 'Developing Jazz Language',
    description: 'Build your personal jazz vocabulary',
    fretboardPatterns: [],
    scales: [],
    subsections: [
      {
        id: 'jazz-15-1',
        title: 'Creating Your Voice',
        content: 'Study masters: Wes, Joe Pass, Pat Metheny, Jim Hall. Absorb their ideas. Develop yours.',
        technique: 'Jazz is a language. Learn phrases like learning words. Combine into sentences.',
        tips: ['Lifelong journey', 'Always learning', 'Play what you hear']
      }
    ]
  }
];

// ============================================================
// FUNK LESSONS - 15 Progressive Lessons
// ============================================================
export const funkLessons: Lesson[] = [
  {
    id: 'funk-1',
    difficulty: 'beginner',
    genre: 'funk',
    title: 'Funk Strumming - The 16th Note Groove',
    description: 'Master the tight, percussive funk rhythm guitar foundation',
    fretboardPatterns: [
      { name: 'E9 Chord', positions: [0, 2, 2, 1, 3, 2], fingers: [0, 2, 3, 1, 4, 2] }
    ],
    scales: [],
    subsections: [
      {
        id: 'funk-1-1',
        title: 'The Funk Strum',
        content: 'Funk is all about the MUTE. Barely release fingers after strumming. Palm mute lightly with right hand. "Chick-a" sound is the goal.',
        technique: 'Down-up-down-up on 16th notes. But MUTE most strums. Only let 1-2 out of 16 ring. Rest are muted percussive "chick" sounds.',
        tips: ['Right hand mutes, left hand chokes strings', 'Extreme tightness required', 'Listen to Nile Rodgers for reference']
      },
      {
        id: 'funk-1-2',
        title: 'The Rhythm Pattern',
        content: 'Count: 1-e-and-a-2-e-and-a-3-e-and-a-4-e-and-a. Let only "and" beats ring. Mute everything else. Creates that choppy groove.',
        technique: 'Looser wrist than rock. Right hand does most muting work. Strings barely ringing.',
        tips: ['Play with a metronome', 'Start at 80 BPM', 'Consistency is everything']
      }
    ]
  },
  {
    id: 'funk-2',
    difficulty: 'beginner',
    genre: 'funk',
    title: 'Ninth Chords - The Funk Sound',
    description: 'Learn the sophisticated extended chords that define funk',
    fretboardPatterns: [
      { name: 'E9', positions: [0, 2, 2, 1, 3, 2], fingers: [0, 2, 3, 1, 4, 2] },
      { name: 'A9', positions: ['x', 0, 2, 4, 2, 0], fingers: [0, 0, 1, 4, 2, 0] },
      { name: 'D9', positions: ['x', 'x', 0, 2, 1, 0], fingers: [0, 0, 0, 3, 1, 0] }
    ],
    scales: [],
    subsections: [
      {
        id: 'funk-2-1',
        title: 'What is a 9th Chord?',
        content: 'Add the 9th note (same as 2nd, one octave up) to a dominant 7th chord. Root-3rd-5th-♭7th-9th. Sounds sophisticated and funky.',
        technique: 'E9: Root E, 3rd G#, 5th B, ♭7th D, 9th F#. Rich, jazzy sound perfect for funk.',
        tips: ['More colorful than basic triads', 'Standard in funk and R&B', 'Nile Rodgers signature']
      },
      {
        id: 'funk-2-2',
        title: 'Common Voicings',
        content: 'E9 is easiest with open strings. A9 and D9 follow similar shapes. Practice changing between them smoothly.',
        technique: 'Focus on fingers 1, 2, 3, 4 placement. Pinky stretches are common.',
        tips: ['Start with E9', 'Mute unwanted strings', 'Funk needs CLEAN chords']
      }
    ]
  },
  {
    id: 'funk-3',
    difficulty: 'beginner',
    genre: 'funk',
    title: 'Single Note Funk Lines',
    description: 'Play melodic bass-style riffs on guitar',
    fretboardPatterns: [
      { name: 'E Funk Riff', positions: [0, 'x', 'x', 'x', 'x', 'x'], fingers: [0, 0, 0, 0, 0, 0] }
    ],
    scales: [
      { name: 'E Minor Pentatonic', pattern: 'Root-b3-4-5-b7', notes: ['E', 'G', 'A', 'B', 'D'] }
    ],
    subsections: [
      {
        id: 'funk-3-1',
        title: 'Bass-Style Guitar Riffs',
        content: 'Funk guitar often plays single-note lines like a bass. Low E string: 0-3-5-7. Simple but GROOVE is everything.',
        technique: 'Palm mute HARD. Play on beat. Each note short and punchy. Opposite of sustained rock notes.',
        tips: ['Think like a bass player', 'Groove over complexity', 'Lock with drums']
      },
      {
        id: 'funk-3-2',
        title: 'Octave Technique',
        content: 'Play root on Low E, mute A and D, play octave on G string two frets higher. Classic funk double-stop.',
        technique: 'E octave: Low E fret 0, mute middle strings with finger, G string fret 2. Creates thick sound.',
        tips: ['John Scofield uses this', 'Very percussive', 'Keep it tight']
      }
    ]
  },
  {
    id: 'funk-4',
    difficulty: 'beginner',
    genre: 'funk',
    title: 'Wah Pedal Basics',
    description: 'Add the iconic wah effect to your funk playing',
    fretboardPatterns: [],
    scales: [],
    subsections: [
      {
        id: 'funk-4-1',
        title: 'What is Wah?',
        content: 'Wah-wah pedal sweeps through frequency range. Toe down = bright "wah", heel down = dark "wah". Creates vocal-like effect.',
        technique: 'Rock pedal with rhythm. Down on downbeat, up on upbeat. "Wah-chick-wah-chick" sound.',
        tips: ['Jimi Hendrix popularized', 'Essential funk tool', 'Practice rhythm rocking']
      },
      {
        id: 'funk-4-2',
        title: 'Auto-Wah Technique',
        content: 'Leave wah in half-cocked position for "quack" sound. Don\'t rock it, just leave it there. Instant funk tone.',
        technique: 'Parked wah gives midrange boost. Great for single-note riffs.',
        tips: ['Bootsy Collins signature', 'Easier than rocking', 'Combines with muting']
      }
    ]
  },
  {
    id: 'funk-5',
    difficulty: 'intermediate',
    genre: 'funk',
    title: 'Chord Stabs - Rhythmic Accents',
    description: 'Master the percussive chord punctuation of funk',
    fretboardPatterns: [],
    scales: [],
    subsections: [
      {
        id: 'funk-5-1',
        title: 'What are Stabs?',
        content: 'Short, sharp chord hits on specific beats. Not sustained chords. Attack hard, mute immediately. "Stab" the chord.',
        technique: 'Hit chord on "2" and "4" beats only. Immediately release pressure after hit. Creates "chick" sound.',
        tips: ['Opposite of sustained', 'All about the attack', 'Essential funk rhythm']
      },
      {
        id: 'funk-5-2',
        title: 'Combining with Single Notes',
        content: 'Bassline on E string, chord stab on 2 and 4. Classic funk pattern. Bassline drives, stabs accent.',
        technique: 'Left hand shifts between bass notes and chord shape. Right hand maintains strict rhythm.',
        tips: ['Listen to James Brown', 'Tower of Power horns', 'Practice slowly']
      }
    ]
  },
  {
    id: 'funk-6',
    difficulty: 'intermediate',
    genre: 'funk',
    title: 'Sliding Double Stops',
    description: 'Add movement to your funk rhythm playing',
    fretboardPatterns: [],
    scales: [],
    subsections: [
      {
        id: 'funk-6-1',
        title: 'Double Stop Technique',
        content: 'Play two strings simultaneously. Slide into target notes from one fret below. Classic funk embellishment.',
        technique: 'B and high E strings: slide from fret 4 to 5. Quick slide, land on beat.',
        tips: ['Adds melodic interest', 'Very Nile Rodgers', 'Slide smoothly']
      },
      {
        id: 'funk-6-2',
        title: 'Syncopated Slides',
        content: 'Slide on offbeats. Adds surprise and movement. Slide up to chord on "and" beats.',
        technique: 'Approach chord from below. Half-step slide creates tension and release.',
        tips: ['Adds sophistication', 'Creates movement', 'Timing is critical']
      }
    ]
  },
  {
    id: 'funk-7',
    difficulty: 'intermediate',
    genre: 'funk',
    title: 'Mixolydian Mode - Funk Scale',
    description: 'The scale behind dominant funk progressions',
    fretboardPatterns: [],
    scales: [
      { name: 'E Mixolydian', pattern: '1-2-3-4-5-6-♭7', notes: ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D'] }
    ],
    subsections: [
      {
        id: 'funk-7-1',
        title: 'Mixolydian Explained',
        content: 'Major scale with flatted 7th. Sounds funky and bluesy. Works over dominant 7th and 9th chords perfectly.',
        technique: 'E Mixolydian: E-F#-G#-A-B-C#-D. That D natural (not D#) creates the dominant sound.',
        tips: ['Different from major and minor', 'Funky dominant vibe', 'Great for improv']
      },
      {
        id: 'funk-7-2',
        title: 'Mixolydian Licks',
        content: 'Emphasize the ♭7th note in your lines. That\'s the funk flavor. Resolve to root for strong endings.',
        technique: 'Play scale up and down. Accent the D note. End phrases on E for resolution.',
        tips: ['John Scofield uses this', 'Combines with pentatonic', 'Add chromatic passing tones']
      }
    ]
  },
  {
    id: 'funk-8',
    difficulty: 'intermediate',
    genre: 'funk',
    title: 'Hendrix Chord - The 7#9',
    description: 'Master the "Purple Haze" chord for funk flavor',
    fretboardPatterns: [
      { name: 'E7#9 (Hendrix Chord)', positions: [0, 2, 1, 2, 3, 'x'], fingers: [0, 2, 1, 3, 4, 0] }
    ],
    scales: [],
    subsections: [
      {
        id: 'funk-8-1',
        title: 'The Dissonant Dominant',
        content: 'Dominant 7th with BOTH major 3rd AND #9 (same as ♭3). Creates tension and dissonance. Sounds aggressive and funky.',
        technique: 'E7#9: Contains both G# (major 3rd) and G (♭3/#9). Clashing intervals create that gritty sound.',
        tips: ['Jimi Hendrix signature', 'Used in funk, blues, rock', 'Sounds edgy and cool']
      },
      {
        id: 'funk-8-2',
        title: 'Funk Applications',
        content: 'Use on I chord in funk progressions. Creates instant attitude. Sounds better with distortion.',
        technique: 'Don\'t strum - play short stabs. Let the dissonance bite, then move on.',
        tips: ['Bootsy Collins uses this', 'Pairs with wah pedal', 'Don\'t overuse']
      }
    ]
  },
  {
    id: 'funk-9',
    difficulty: 'intermediate',
    genre: 'funk',
    title: 'Slap Guitar Technique',
    description: 'Percussive thumb slapping for funk rhythm',
    fretboardPatterns: [],
    scales: [],
    subsections: [
      {
        id: 'funk-9-1',
        title: 'The Thumb Slap',
        content: 'Use thumb to strike strings like a drum. Bounce thumb off strings immediately. Creates percussive "thump" sound.',
        technique: 'Rotate wrist to slap with thumb flesh. Don\'t use fingernail. Quick bounce, don\'t rest.',
        tips: ['More common on bass', 'Works on guitar too', 'Very Larry Graham']
      },
      {
        id: 'funk-9-2',
        title: 'Pop Technique',
        content: 'After thumb slap, "pop" higher strings by pulling with fingers. Slap low, pop high. Creates funky conversation.',
        technique: 'Thumb hits low E, index finger pops G string. Alternating pattern.',
        tips: ['Extremely percussive', 'Takes months to develop', 'Very impressive']
      }
    ]
  },
  {
    id: 'funk-10',
    difficulty: 'intermediate',
    genre: 'funk',
    title: 'Minor 7th Chords',
    description: 'Add smooth minor sounds to funk progressions',
    fretboardPatterns: [
      { name: 'Am7', positions: ['x', 0, 2, 0, 1, 0], fingers: [0, 0, 2, 0, 1, 0] },
      { name: 'Dm7', positions: ['x', 'x', 0, 2, 1, 1], fingers: [0, 0, 0, 3, 1, 2] },
      { name: 'Em7', positions: [0, 2, 2, 0, 3, 0], fingers: [0, 2, 3, 0, 4, 0] }
    ],
    scales: [],
    subsections: [
      {
        id: 'funk-10-1',
        title: 'Minor 7th Voicings',
        content: 'Smooth, jazzy minor chords. Root-♭3-5-♭7. Less aggressive than minor triads, more sophisticated.',
        technique: 'Am7: A-C-E-G. The G (♭7) makes it smooth instead of sad.',
        tips: ['Very common in funk', 'Smoother than basic minor', 'Essential voicing']
      },
      {
        id: 'funk-10-2',
        title: 'ii-V-I Funk Progression',
        content: 'Dm7 - G9 - Cmaj7. Classic jazz progression used heavily in funk. Learn in all keys.',
        technique: 'Minor 7th sets up dominant 9th which resolves to major 7th. Smooth harmonic motion.',
        tips: ['Foundation of sophisticated funk', 'Combine with rhythm muting', 'Herbie Hancock vibes']
      }
    ]
  },
  {
    id: 'funk-11',
    difficulty: 'mastery',
    genre: 'funk',
    title: 'Chicken Picking',
    description: 'Hybrid picking technique for percussive funk',
    fretboardPatterns: [],
    scales: [],
    subsections: [
      {
        id: 'funk-11-1',
        title: 'Hybrid Technique',
        content: 'Use pick AND fingers simultaneously. Pick plays bass notes, fingers pluck higher strings. Creates complexity.',
        technique: 'Pick downstrokes on Low E and A. Middle and ring fingers pluck B and high E.',
        tips: ['Very Albert Lee', 'Country-funk crossover', 'Difficult to master']
      },
      {
        id: 'funk-11-2',
        title: 'The "Cluck" Sound',
        content: 'Fingers snap off strings creating percussive attack. Combined with pick bass notes. Creates "chicken" sound.',
        technique: 'Rest fingers on strings. Pull quickly so they snap against fretboard.',
        tips: ['Extremely percussive', 'Takes months to develop', 'Impressive technique']
      }
    ]
  },
  {
    id: 'funk-12',
    difficulty: 'mastery',
    genre: 'funk',
    title: 'Chord Inversions for Movement',
    description: 'Create smooth bass motion in funk progressions',
    fretboardPatterns: [],
    scales: [],
    subsections: [
      {
        id: 'funk-12-1',
        title: 'Voice Leading',
        content: 'Don\'t just play root position chords. Use inversions so bass note walks smoothly. Creates sophisticated movement.',
        technique: 'C - C/E - F - F/A. Bass walks up: C-E-F-A. Much smoother than all root positions.',
        tips: ['Very Steely Dan', 'Adds sophistication', 'Study bass motion']
      },
      {
        id: 'funk-12-2',
        title: 'Slash Chord Funk',
        content: 'Play different chord over different bass note. Dm7/G creates tension. Very sophisticated harmony.',
        technique: 'Left hand plays bass note, right hand strums chord above.',
        tips: ['Advanced harmony', 'Creates rich textures', 'Study Tower of Power']
      }
    ]
  },
  {
    id: 'funk-13',
    difficulty: 'mastery',
    genre: 'funk',
    title: 'Chromatic Approach Notes',
    description: 'Add sophisticated jazz-funk embellishments',
    fretboardPatterns: [],
    scales: [],
    subsections: [
      {
        id: 'funk-13-1',
        title: 'Approach Tones',
        content: 'Approach chord tones from one fret above or below. Adds melodic interest and tension.',
        technique: 'Landing on G? Approach from F# or G#. Half-step slide into target.',
        tips: ['Very jazzy', 'Creates movement', 'Study George Benson']
      },
      {
        id: 'funk-13-2',
        title: 'Chromatic Bass Lines',
        content: 'Walk bass chromatically between chord changes. E to A? Play E-F-F#-G-G#-A.',
        technique: 'Smooth chromatic motion connects distant chords. Creates forward momentum.',
        tips: ['James Jamerson technique', 'Sophisticated funk', 'Practice with metronome']
      }
    ]
  },
  {
    id: 'funk-14',
    difficulty: 'mastery',
    genre: 'funk',
    title: 'Extended Chord Voicings',
    description: 'Master 11th and 13th chords for rich harmony',
    fretboardPatterns: [
      { name: 'E13', positions: [0, 2, 2, 1, 2, 2], fingers: [0, 2, 3, 1, 4, 4] }
    ],
    scales: [],
    subsections: [
      {
        id: 'funk-14-1',
        title: 'The 13th Chord',
        content: 'Stacks root-3rd-5th-♭7th-9th-11th-13th. Rich, sophisticated jazz-funk sound.',
        technique: 'Can\'t play all notes on guitar. Imply harmony by selecting key notes.',
        tips: ['Very complex', 'Study voicing charts', 'Sounds amazing']
      },
      {
        id: 'funk-14-2',
        title: 'Sus4 and Add9 Colors',
        content: 'Suspended 4th and added 9th create ambiguous, floating sounds. Great for funk.',
        technique: 'Esus4: E-A-B. No 3rd, creates tension. E add9: E-G#-B-F#. Adds color.',
        tips: ['Creates movement', 'Ambiguous harmony', 'Combine with rhythm']
      }
    ]
  },
  {
    id: 'funk-15',
    difficulty: 'mastery',
    genre: 'funk',
    title: 'The Pocket - Locking with the Drummer',
    description: 'Develop tight rhythmic ensemble playing',
    fretboardPatterns: [],
    scales: [],
    subsections: [
      {
        id: 'funk-15-1',
        title: 'What is "The Pocket"?',
        content: 'Perfect synchronization with drums and bass. Everyone plays rhythm AS ONE. The groove "locks in".',
        technique: 'Listen to hi-hat. Match your 16th notes EXACTLY. Not ahead, not behind. Perfect sync.',
        tips: ['Holy grail of funk', 'Requires deep listening', 'Study The Meters']
      },
      {
        id: 'funk-15-2',
        title: 'Playing "In the Cut"',
        content: 'Lay back slightly behind the beat. Creates lazy, deep groove. Opposite of rock\'s urgency.',
        technique: 'Intentionally play milliseconds late. Creates tension and release. Feels relaxed.',
        tips: ['D\'Angelo signature', 'Requires feel not timing', 'Years to master']
      }
    ]
  }
];

// Legacy exports for backward compatibility
export const beginnerLessons: Lesson[] = generalBeginnerLessons;
export const intermediateLessons: Lesson[] = [];
export const masteryLessons: Lesson[] = [];
