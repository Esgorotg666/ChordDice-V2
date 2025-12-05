import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useSubscription } from "@/hooks/useSubscription";
import { useAuthContext } from "@/contexts/AuthContext";
import { Crown, Lock, Music, Guitar, Flame, Sparkles, Globe, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ScaleFretboard, { type FretboardDisplayMode } from "@/components/scale-fretboard";
import { getScalePositions } from "@/lib/scales";
import { getFingeringPattern, hasFingeringPattern } from "@/lib/fretboard-fingerings";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ScaleType {
  name: string;
  formula: string;
  description: string;
  compatibleChords: string[];
  usageTips: string;
  category: 'major' | 'minor' | 'pentatonic' | 'blues' | 'modes' | 'exotic';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  genres: string[];
  keys: { [key: string]: string[] };
}

const scaleLibrary: Record<string, ScaleType> = {
  // MAJOR SCALES
  major: {
    name: "Major Scale",
    formula: "1 - 2 - 3 - 4 - 5 - 6 - 7",
    description: "The foundation of Western music. Bright, happy, and uplifting.",
    compatibleChords: ["Major", "Major 7th", "6th", "add9"],
    usageTips: "Use over major chord progressions. Great for pop, rock, and country.",
    category: 'major',
    difficulty: 'beginner',
    genres: ["Pop", "Rock", "Country", "Classical"],
    keys: {
      "C": ["C", "D", "E", "F", "G", "A", "B"],
      "G": ["G", "A", "B", "C", "D", "E", "F#"],
      "D": ["D", "E", "F#", "G", "A", "B", "C#"],
      "A": ["A", "B", "C#", "D", "E", "F#", "G#"],
      "E": ["E", "F#", "G#", "A", "B", "C#", "D#"],
      "F": ["F", "G", "A", "Bb", "C", "D", "E"],
      "Bb": ["Bb", "C", "D", "Eb", "F", "G", "A"]
    }
  },
  major_pentatonic: {
    name: "Major Pentatonic",
    formula: "1 - 2 - 3 - 5 - 6",
    description: "5-note major scale. Bright, versatile, impossible to sound bad.",
    compatibleChords: ["Major", "Major 7th", "9th", "6th"],
    usageTips: "Perfect for country, rock solos. Emphasize root and 3rd for strong melodies.",
    category: 'pentatonic',
    difficulty: 'beginner',
    genres: ["Country", "Rock", "Blues", "Pop"],
    keys: {
      "C": ["C", "D", "E", "G", "A"],
      "G": ["G", "A", "B", "D", "E"],
      "D": ["D", "E", "F#", "A", "B"],
      "A": ["A", "B", "C#", "E", "F#"],
      "E": ["E", "F#", "G#", "B", "C#"]
    }
  },

  // MINOR SCALES
  natural_minor: {
    name: "Natural Minor",
    formula: "1 - 2 - b3 - 4 - 5 - b6 - b7",
    description: "The natural minor scale. Sad, melancholic, expressive.",
    compatibleChords: ["Minor", "Minor 7th", "Minor 9th"],
    usageTips: "Foundation for minor key music. Essential for emotional playing.",
    category: 'minor',
    difficulty: 'beginner',
    genres: ["Rock", "Metal", "Classical", "Pop"],
    keys: {
      "A": ["A", "B", "C", "D", "E", "F", "G"],
      "E": ["E", "F#", "G", "A", "B", "C", "D"],
      "D": ["D", "E", "F", "G", "A", "Bb", "C"],
      "B": ["B", "C#", "D", "E", "F#", "G", "A"],
      "G": ["G", "A", "Bb", "C", "D", "Eb", "F"]
    }
  },
  harmonic_minor: {
    name: "Harmonic Minor",
    formula: "1 - 2 - b3 - 4 - 5 - b6 - 7",
    description: "Minor scale with raised 7th. Exotic, classical, neo-classical.",
    compatibleChords: ["Minor", "Minor maj7", "Diminished 7th"],
    usageTips: "Essential for neo-classical shred. The raised 7th creates exotic tension.",
    category: 'minor',
    difficulty: 'intermediate',
    genres: ["Classical", "Metal", "Gypsy Jazz", "Flamenco"],
    keys: {
      "A": ["A", "B", "C", "D", "E", "F", "G#"],
      "E": ["E", "F#", "G", "A", "B", "C", "D#"],
      "D": ["D", "E", "F", "G", "A", "Bb", "C#"],
      "B": ["B", "C#", "D", "E", "F#", "G", "A#"]
    }
  },
  melodic_minor: {
    name: "Melodic Minor",
    formula: "1 - 2 - b3 - 4 - 5 - 6 - 7",
    description: "Minor with raised 6th and 7th. Jazz essential.",
    compatibleChords: ["Minor maj7", "Minor 6th", "Minor 9th"],
    usageTips: "Jazz standard. Creates sophisticated tension. Works over altered dominants.",
    category: 'minor',
    difficulty: 'advanced',
    genres: ["Jazz", "Fusion", "Progressive"],
    keys: {
      "A": ["A", "B", "C", "D", "E", "F#", "G#"],
      "D": ["D", "E", "F", "G", "A", "B", "C#"],
      "E": ["E", "F#", "G", "A", "B", "C#", "D#"],
      "C": ["C", "D", "Eb", "F", "G", "A", "B"]
    }
  },
  minor_pentatonic: {
    name: "Minor Pentatonic",
    formula: "1 - b3 - 4 - 5 - b7",
    description: "The backbone of blues, rock, and metal. 5 essential notes.",
    compatibleChords: ["Minor", "Minor 7th", "9th", "sus4"],
    usageTips: "Essential for rock and blues. Works over minor AND dominant 7th chords.",
    category: 'pentatonic',
    difficulty: 'beginner',
    genres: ["Blues", "Rock", "Metal", "Funk"],
    keys: {
      "A": ["A", "C", "D", "E", "G"],
      "E": ["E", "G", "A", "B", "D"],
      "D": ["D", "F", "G", "A", "C"],
      "G": ["G", "Bb", "C", "D", "F"],
      "B": ["B", "D", "E", "F#", "A"]
    }
  },

  // BLUES SCALES
  blues: {
    name: "Blues Scale",
    formula: "1 - b3 - 4 - b5 - 5 - b7",
    description: "Minor pentatonic + blues note (b5). Authentic blues feel.",
    compatibleChords: ["7th", "9th", "Minor 7th", "13th"],
    usageTips: "The b5 (blue note) adds tension. Resolve it to 4th or 5th.",
    category: 'blues',
    difficulty: 'beginner',
    genres: ["Blues", "Rock", "Jazz", "Funk"],
    keys: {
      "A": ["A", "C", "D", "Eb", "E", "G"],
      "E": ["E", "G", "A", "Bb", "B", "D"],
      "G": ["G", "Bb", "C", "Db", "D", "F"],
      "D": ["D", "F", "G", "Ab", "A", "C"],
      "B": ["B", "D", "E", "F", "F#", "A"]
    }
  },
  major_blues: {
    name: "Major Blues",
    formula: "1 - 2 - b3 - 3 - 5 - 6",
    description: "Major pentatonic with blue note. Jazzy, upbeat blues feel.",
    compatibleChords: ["Major", "7th", "9th", "6th"],
    usageTips: "Combine with minor blues for authentic blues solos. Works great over I-IV-V.",
    category: 'blues',
    difficulty: 'intermediate',
    genres: ["Blues", "Jazz", "Country", "Rock"],
    keys: {
      "A": ["A", "B", "C", "C#", "E", "F#"],
      "E": ["E", "F#", "G", "G#", "B", "C#"],
      "G": ["G", "A", "Bb", "B", "D", "E"],
      "C": ["C", "D", "Eb", "E", "G", "A"]
    }
  },

  // MODES
  dorian: {
    name: "Dorian Mode",
    formula: "1 - 2 - b3 - 4 - 5 - 6 - b7",
    description: "Minor scale with natural 6th. Jazzy, sophisticated, funky.",
    compatibleChords: ["Minor 7th", "Minor 9th", "Minor 11th", "sus2"],
    usageTips: "Jazz, funk, and fusion favorite. The natural 6th distinguishes it from natural minor.",
    category: 'modes',
    difficulty: 'intermediate',
    genres: ["Jazz", "Funk", "Fusion", "R&B"],
    keys: {
      "D": ["D", "E", "F", "G", "A", "B", "C"],
      "A": ["A", "B", "C", "D", "E", "F#", "G"],
      "E": ["E", "F#", "G", "A", "B", "C#", "D"],
      "G": ["G", "A", "Bb", "C", "D", "E", "F"]
    }
  },
  phrygian: {
    name: "Phrygian Mode",
    formula: "1 - b2 - b3 - 4 - 5 - b6 - b7",
    description: "Dark, Spanish/flamenco flavor with flat 2nd.",
    compatibleChords: ["Minor", "sus2", "Minor 7th b9"],
    usageTips: "Metal and flamenco essential. The b2 creates exotic tension.",
    category: 'modes',
    difficulty: 'intermediate',
    genres: ["Metal", "Flamenco", "World", "Progressive"],
    keys: {
      "E": ["E", "F", "G", "A", "B", "C", "D"],
      "A": ["A", "Bb", "C", "D", "E", "F", "G"],
      "B": ["B", "C", "D", "E", "F#", "G", "A"],
      "D": ["D", "Eb", "F", "G", "A", "Bb", "C"]
    }
  },
  lydian: {
    name: "Lydian Mode",
    formula: "1 - 2 - 3 - #4 - 5 - 6 - 7",
    description: "Bright, dreamy major with #4. Floating, ethereal quality.",
    compatibleChords: ["Major 7th", "Major 9th", "add9"],
    usageTips: "Dreamy, floating quality. Popular in film scores and progressive rock.",
    category: 'modes',
    difficulty: 'intermediate',
    genres: ["Progressive", "Film Score", "Fusion", "Pop"],
    keys: {
      "F": ["F", "G", "A", "B", "C", "D", "E"],
      "C": ["C", "D", "E", "F#", "G", "A", "B"],
      "G": ["G", "A", "B", "C#", "D", "E", "F#"],
      "Bb": ["Bb", "C", "D", "E", "F", "G", "A"]
    }
  },
  mixolydian: {
    name: "Mixolydian Mode",
    formula: "1 - 2 - 3 - 4 - 5 - 6 - b7",
    description: "Major with flat 7th. Dominant, bluesy rock feel.",
    compatibleChords: ["7th", "9th", "11th", "13th"],
    usageTips: "Rock, blues, country staple. Works perfectly over dominant 7th chords.",
    category: 'modes',
    difficulty: 'intermediate',
    genres: ["Rock", "Blues", "Country", "Funk"],
    keys: {
      "G": ["G", "A", "B", "C", "D", "E", "F"],
      "D": ["D", "E", "F#", "G", "A", "B", "C"],
      "A": ["A", "B", "C#", "D", "E", "F#", "G"],
      "C": ["C", "D", "E", "F", "G", "A", "Bb"]
    }
  },
  aeolian: {
    name: "Aeolian Mode",
    formula: "1 - 2 - b3 - 4 - 5 - b6 - b7",
    description: "Natural minor scale. Sad, emotional, expressive.",
    compatibleChords: ["Minor", "Minor 7th", "Minor 9th"],
    usageTips: "The natural minor foundation. Essential for minor key progressions.",
    category: 'modes',
    difficulty: 'beginner',
    genres: ["Rock", "Pop", "Metal", "Classical"],
    keys: {
      "A": ["A", "B", "C", "D", "E", "F", "G"],
      "E": ["E", "F#", "G", "A", "B", "C", "D"],
      "D": ["D", "E", "F", "G", "A", "Bb", "C"],
      "B": ["B", "C#", "D", "E", "F#", "G", "A"]
    }
  },
  locrian: {
    name: "Locrian Mode",
    formula: "1 - b2 - b3 - 4 - b5 - b6 - b7",
    description: "Diminished, unstable. Most dissonant mode.",
    compatibleChords: ["Half-diminished", "m7b5"],
    usageTips: "Rarely used as tonal center. Great for tension and metal.",
    category: 'modes',
    difficulty: 'advanced',
    genres: ["Metal", "Jazz", "Progressive"],
    keys: {
      "B": ["B", "C", "D", "E", "F", "G", "A"],
      "E": ["E", "F", "G", "A", "Bb", "C", "D"],
      "F#": ["F#", "G", "A", "B", "C", "D", "E"]
    }
  },
  ionian: {
    name: "Ionian Mode",
    formula: "1 - 2 - 3 - 4 - 5 - 6 - 7",
    description: "The major scale as a mode. Bright and stable.",
    compatibleChords: ["Major", "Major 7th", "6th"],
    usageTips: "Same as major scale. Use for bright, happy melodies.",
    category: 'modes',
    difficulty: 'beginner',
    genres: ["Pop", "Rock", "Classical", "Country"],
    keys: {
      "C": ["C", "D", "E", "F", "G", "A", "B"],
      "G": ["G", "A", "B", "C", "D", "E", "F#"],
      "F": ["F", "G", "A", "Bb", "C", "D", "E"]
    }
  },

  // EXOTIC SCALES
  phrygian_dominant: {
    name: "Phrygian Dominant",
    formula: "1 - b2 - 3 - 4 - 5 - b6 - b7",
    description: "Spanish/Flamenco scale. Exotic and passionate.",
    compatibleChords: ["Major", "7th", "7th b9", "Dominant"],
    usageTips: "Essential for flamenco and metal. Major 3rd with flat 2 creates signature Spanish tension.",
    category: 'exotic',
    difficulty: 'intermediate',
    genres: ["Flamenco", "Metal", "Middle Eastern", "Gypsy"],
    keys: {
      "E": ["E", "F", "G#", "A", "B", "C", "D"],
      "A": ["A", "Bb", "C#", "D", "E", "F", "G"],
      "D": ["D", "Eb", "F#", "G", "A", "Bb", "C"],
      "B": ["B", "C", "D#", "E", "F#", "G", "A"]
    }
  },
  hungarian_minor: {
    name: "Hungarian Minor",
    formula: "1 - 2 - b3 - #4 - 5 - b6 - 7",
    description: "Gypsy scale. Dark, dramatic with augmented 2nd intervals.",
    compatibleChords: ["Minor", "Minor maj7", "Augmented"],
    usageTips: "Creates dramatic gypsy/Eastern European flavor. Popular in metal and classical.",
    category: 'exotic',
    difficulty: 'advanced',
    genres: ["Gypsy Jazz", "Metal", "Classical", "World"],
    keys: {
      "A": ["A", "B", "C", "D#", "E", "F", "G#"],
      "E": ["E", "F#", "G", "A#", "B", "C", "D#"],
      "D": ["D", "E", "F", "G#", "A", "Bb", "C#"]
    }
  },
  whole_tone: {
    name: "Whole Tone",
    formula: "1 - 2 - 3 - #4 - #5 - b7",
    description: "Symmetrical scale. Dreamlike, unresolved, floating.",
    compatibleChords: ["Augmented", "7th #5", "9th #5"],
    usageTips: "Creates ambiguous, floating sound. Use sparingly for effect.",
    category: 'exotic',
    difficulty: 'advanced',
    genres: ["Jazz", "Film Score", "Impressionist"],
    keys: {
      "C": ["C", "D", "E", "F#", "G#", "Bb"],
      "D": ["D", "E", "F#", "G#", "A#", "C"],
      "E": ["E", "F#", "G#", "A#", "C", "D"]
    }
  },
  diminished_hw: {
    name: "Diminished (Half-Whole)",
    formula: "1 - b2 - b3 - 3 - #4 - 5 - 6 - b7",
    description: "8-note symmetrical scale. Intense dissonance.",
    compatibleChords: ["Diminished 7th", "7th b9"],
    usageTips: "Jazz and bebop essential. Creates intense dissonance over dim and dom chords.",
    category: 'exotic',
    difficulty: 'advanced',
    genres: ["Jazz", "Bebop", "Metal"],
    keys: {
      "C": ["C", "Db", "Eb", "E", "F#", "G", "A", "Bb"],
      "E": ["E", "F", "G", "G#", "A#", "B", "C#", "D"],
      "A": ["A", "Bb", "C", "C#", "D#", "E", "F#", "G"]
    }
  },
  diminished_wh: {
    name: "Diminished (Whole-Half)",
    formula: "1 - 2 - b3 - 4 - b5 - b6 - 6 - 7",
    description: "8-note symmetrical scale. Use over diminished chords.",
    compatibleChords: ["Diminished", "Diminished 7th"],
    usageTips: "Use over diminished chords. Provides smooth voice leading.",
    category: 'exotic',
    difficulty: 'advanced',
    genres: ["Jazz", "Classical", "Progressive"],
    keys: {
      "C": ["C", "D", "Eb", "F", "Gb", "Ab", "A", "B"],
      "D": ["D", "E", "F", "G", "Ab", "Bb", "B", "C#"],
      "E": ["E", "F#", "G", "A", "Bb", "C", "C#", "D#"]
    }
  },
  japanese: {
    name: "Japanese (In Sen)",
    formula: "1 - b2 - 4 - 5 - b7",
    description: "Traditional Japanese pentatonic. Haunting and mystical.",
    compatibleChords: ["Minor", "sus4", "Minor 7th"],
    usageTips: "Creates authentic Japanese/Asian atmosphere. Great for ambient and world music.",
    category: 'exotic',
    difficulty: 'intermediate',
    genres: ["World", "Ambient", "Film Score", "Metal"],
    keys: {
      "D": ["D", "Eb", "G", "A", "C"],
      "A": ["A", "Bb", "D", "E", "G"],
      "E": ["E", "F", "A", "B", "D"]
    }
  },
  hirajoshi: {
    name: "Hirajoshi",
    formula: "1 - 2 - b3 - 5 - b6",
    description: "Japanese pentatonic scale. Exotic and haunting.",
    compatibleChords: ["Minor", "Minor 7th", "sus2"],
    usageTips: "Creates beautiful Japanese atmosphere. Works great for solos and melodies.",
    category: 'exotic',
    difficulty: 'intermediate',
    genres: ["World", "Ambient", "Metal", "Progressive"],
    keys: {
      "A": ["A", "B", "C", "E", "F"],
      "E": ["E", "F#", "G", "B", "C"],
      "D": ["D", "E", "F", "A", "Bb"]
    }
  },
  arabic: {
    name: "Arabic (Double Harmonic)",
    formula: "1 - b2 - 3 - 4 - 5 - b6 - 7",
    description: "Middle Eastern scale. Exotic, dramatic, mysterious.",
    compatibleChords: ["Major", "Major 7th", "7th b9"],
    usageTips: "Creates authentic Middle Eastern flavor. The augmented 2nd interval is signature.",
    category: 'exotic',
    difficulty: 'advanced',
    genres: ["Middle Eastern", "Metal", "World", "Film Score"],
    keys: {
      "E": ["E", "F", "G#", "A", "B", "C", "D#"],
      "A": ["A", "Bb", "C#", "D", "E", "F", "G#"],
      "D": ["D", "Eb", "F#", "G", "A", "Bb", "C#"]
    }
  },
  super_locrian: {
    name: "Super Locrian (Altered)",
    formula: "1 - b2 - b3 - b4 - b5 - b6 - b7",
    description: "Maximum tension over dominant chords. All notes altered.",
    compatibleChords: ["7th alt", "7th #9 b13"],
    usageTips: "Jazz essential for altered dominants. Creates maximum tension before resolution.",
    category: 'exotic',
    difficulty: 'advanced',
    genres: ["Jazz", "Fusion", "Progressive"],
    keys: {
      "G": ["G", "Ab", "Bb", "Cb", "Db", "Eb", "F"],
      "C": ["C", "Db", "Eb", "Fb", "Gb", "Ab", "Bb"],
      "D": ["D", "Eb", "F", "Gb", "Ab", "Bb", "C"]
    }
  },
  bebop_dominant: {
    name: "Bebop Dominant",
    formula: "1 - 2 - 3 - 4 - 5 - 6 - b7 - 7",
    description: "8-note jazz scale. Smooth bebop lines.",
    compatibleChords: ["7th", "9th", "13th", "Dominant"],
    usageTips: "The added major 7th creates smooth 8th note lines. Keeps chord tones on strong beats.",
    category: 'exotic',
    difficulty: 'advanced',
    genres: ["Jazz", "Bebop", "Swing"],
    keys: {
      "G": ["G", "A", "B", "C", "D", "E", "F", "F#"],
      "C": ["C", "D", "E", "F", "G", "A", "Bb", "B"],
      "F": ["F", "G", "A", "Bb", "C", "D", "Eb", "E"]
    }
  },
  neapolitan_minor: {
    name: "Neapolitan Minor",
    formula: "1 - b2 - b3 - 4 - 5 - b6 - 7",
    description: "Dark classical scale with raised 7th. Dramatic tension.",
    compatibleChords: ["Minor maj7", "Diminished", "7th b9"],
    usageTips: "Classical and neo-classical essential. Creates dramatic climactic moments.",
    category: 'exotic',
    difficulty: 'advanced',
    genres: ["Classical", "Neo-Classical", "Metal"],
    keys: {
      "A": ["A", "Bb", "C", "D", "E", "F", "G#"],
      "E": ["E", "F", "G", "A", "B", "C", "D#"],
      "D": ["D", "Eb", "F", "G", "A", "Bb", "C#"]
    }
  },
  lydian_dominant: {
    name: "Lydian Dominant",
    formula: "1 - 2 - 3 - #4 - 5 - 6 - b7",
    description: "Lydian with flat 7th. Fusion and jazz essential.",
    compatibleChords: ["7th #11", "9th #11", "13th #11"],
    usageTips: "Jazz fusion favorite. Creates bright tension over dominant chords.",
    category: 'exotic',
    difficulty: 'advanced',
    genres: ["Jazz", "Fusion", "Progressive"],
    keys: {
      "F": ["F", "G", "A", "B", "C", "D", "Eb"],
      "Bb": ["Bb", "C", "D", "E", "F", "G", "Ab"],
      "C": ["C", "D", "E", "F#", "G", "A", "Bb"]
    }
  }
};

const categoryInfo = {
  major: { icon: Sparkles, label: "Major", color: "text-yellow-500", count: 2 },
  minor: { icon: Music, label: "Minor", color: "text-blue-400", count: 4 },
  pentatonic: { icon: Guitar, label: "Pentatonic", color: "text-green-500", count: 2 },
  blues: { icon: Flame, label: "Blues", color: "text-red-500", count: 2 },
  modes: { icon: Music, label: "Modes", color: "text-purple-500", count: 7 },
  exotic: { icon: Globe, label: "Exotic", color: "text-orange-500", count: 13 }
};

const difficultyColors = {
  beginner: "bg-green-500/20 text-green-400 border-green-500/30",
  intermediate: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  advanced: "bg-red-500/20 text-red-400 border-red-500/30"
};

interface AdvancedScaleGuideProps {
  onUpgrade?: () => void;
  onChordSelect?: (chord: string) => void;
}

function MiniFretboard({ formula, rootKey, className = "" }: { formula: string; rootKey: string; className?: string }) {
  const positions = useMemo(() => {
    return getScalePositions("custom", rootKey, formula);
  }, [formula, rootKey]);

  const frets = 12;
  const strings = 6;

  return (
    <div className={`relative w-full ${className}`}>
      <svg viewBox="0 0 240 80" className="w-full h-auto">
        <defs>
          <linearGradient id="fretboardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3d2817" />
            <stop offset="100%" stopColor="#2a1c10" />
          </linearGradient>
        </defs>
        
        <rect x="0" y="0" width="240" height="80" fill="url(#fretboardGrad)" rx="3" />
        
        <rect x="0" y="0" width="8" height="80" fill="#e8dcc8" rx="2" />
        
        {Array.from({ length: strings }).map((_, i) => (
          <line
            key={`string-${i}`}
            x1="8"
            y1={10 + i * 12}
            x2="240"
            y2={10 + i * 12}
            stroke={i < 3 ? "#c4a060" : "#888"}
            strokeWidth={i < 3 ? 0.8 : 1.2}
          />
        ))}
        
        {Array.from({ length: frets }).map((_, i) => (
          <line
            key={`fret-${i}`}
            x1={20 + i * 18}
            y1="5"
            x2={20 + i * 18}
            y2="75"
            stroke="#666"
            strokeWidth="1"
          />
        ))}
        
        {[3, 5, 7, 9].map(fret => (
          <circle
            key={`marker-${fret}`}
            cx={11 + fret * 18}
            cy="40"
            r="3"
            fill="#444"
          />
        ))}
        <circle cx={11 + 12 * 18} cy="30" r="2.5" fill="#444" />
        <circle cx={11 + 12 * 18} cy="50" r="2.5" fill="#444" />
        
        {positions.filter(p => p.fret <= frets).map((pos, i) => (
          <circle
            key={i}
            cx={pos.fret === 0 ? 4 : 11 + pos.fret * 18}
            cy={10 + pos.string * 12}
            r={pos.isRoot ? 5 : 4}
            fill={pos.isRoot ? "#D4AF37" : "#fff"}
            stroke={pos.isRoot ? "#fff" : "#D4AF37"}
            strokeWidth={pos.isRoot ? 1.5 : 1}
          />
        ))}
      </svg>
    </div>
  );
}

function ScaleCard({ 
  scaleKey, 
  scale, 
  onClick, 
  isSelected 
}: { 
  scaleKey: string; 
  scale: ScaleType; 
  onClick: () => void;
  isSelected: boolean;
}) {
  const firstKey = Object.keys(scale.keys)[0];
  
  return (
    <Card 
      className={`cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg ${
        isSelected 
          ? 'ring-2 ring-primary bg-primary/10' 
          : 'hover:bg-muted/50'
      }`}
      onClick={onClick}
      data-testid={`scale-card-${scaleKey}`}
    >
      <CardContent className="p-3">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-sm leading-tight">{scale.name}</h3>
          <Badge 
            variant="outline" 
            className={`text-[10px] px-1.5 py-0 ${difficultyColors[scale.difficulty]}`}
          >
            {scale.difficulty}
          </Badge>
        </div>
        
        <MiniFretboard formula={scale.formula} rootKey={firstKey} className="mb-2" />
        
        <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
          {scale.description}
        </p>
        
        <div className="flex flex-wrap gap-1">
          {scale.genres.slice(0, 2).map(genre => (
            <Badge key={genre} variant="secondary" className="text-[10px] px-1.5 py-0">
              {genre}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ScaleDetailModal({ 
  scaleKey, 
  scale, 
  isOpen, 
  onClose,
  onChordSelect
}: { 
  scaleKey: string; 
  scale: ScaleType; 
  isOpen: boolean; 
  onClose: () => void;
  onChordSelect?: (chord: string) => void;
}) {
  const [selectedKey, setSelectedKey] = useState(Object.keys(scale.keys)[0]);
  const [displayMode, setDisplayMode] = useState<FretboardDisplayMode>('notes');
  
  useEffect(() => {
    setSelectedKey(Object.keys(scale.keys)[0]);
  }, [scale]);
  
  const fretboardPositions = useMemo(() => {
    return getScalePositions(scaleKey, selectedKey, scale.formula);
  }, [scaleKey, selectedKey, scale.formula]);

  const fingeringPattern = useMemo(() => {
    const pattern = getFingeringPattern(scaleKey, selectedKey, 'box1');
    if (!pattern) return [];
    return pattern.positions.map(p => ({
      ...p,
      isRoot: p.isRoot ?? false
    }));
  }, [scaleKey, selectedKey]);

  const hasFingeringData = useMemo(() => {
    return hasFingeringPattern(scaleKey, selectedKey);
  }, [scaleKey, selectedKey]);

  useEffect(() => {
    if (displayMode === 'fingers' && !hasFingeringData) {
      setDisplayMode('notes');
    }
  }, [scaleKey, selectedKey, hasFingeringData, displayMode]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
        <DialogHeader className="p-4 pb-2 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl flex items-center gap-2">
                {scale.name}
                <Badge variant="outline" className={difficultyColors[scale.difficulty]}>
                  {scale.difficulty}
                </Badge>
              </DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">{scale.description}</p>
            </div>
          </div>
        </DialogHeader>
        
        <ScrollArea className="max-h-[calc(90vh-80px)]">
          <div className="p-4 space-y-4">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm font-medium">Key:</span>
              {Object.keys(scale.keys).map((key) => (
                <Button
                  key={key}
                  variant={selectedKey === key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedKey(key)}
                  className="min-w-[40px]"
                  data-testid={`modal-key-${key}`}
                >
                  {key}
                </Button>
              ))}
            </div>
            
            <div className="flex gap-2 items-center">
              <span className="text-sm font-medium">Display:</span>
              <Button
                variant={displayMode === 'notes' ? "default" : "outline"}
                size="sm"
                onClick={() => setDisplayMode('notes')}
                className="gap-1"
              >
                <Music className="h-3 w-3" />
                Notes
              </Button>
              <Button
                variant={displayMode === 'fingers' ? "default" : "outline"}
                size="sm"
                onClick={() => setDisplayMode('fingers')}
                disabled={!hasFingeringData}
                className="gap-1"
              >
                <Guitar className="h-3 w-3" />
                Fingers
              </Button>
            </div>

            <div className="bg-gradient-to-b from-amber-950/50 to-amber-950/30 rounded-lg p-4 border border-amber-800/30">
              <ScaleFretboard
                positions={fretboardPositions}
                rootNote={selectedKey}
                displayMode={displayMode}
                fingeringPattern={displayMode === 'fingers' ? fingeringPattern : []}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-muted/30">
                <CardContent className="p-4 space-y-3">
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Formula</h4>
                    <p className="font-mono text-sm">{scale.formula}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Notes in {selectedKey}</h4>
                    <div className="flex flex-wrap gap-1">
                      {scale.keys[selectedKey]?.map((note, i) => (
                        <Badge 
                          key={i} 
                          variant={i === 0 ? "default" : "secondary"}
                          className={i === 0 ? "bg-primary" : ""}
                        >
                          {note}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-muted/30">
                <CardContent className="p-4 space-y-3">
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Compatible Chords</h4>
                    <div className="flex flex-wrap gap-1">
                      {scale.compatibleChords.map((chord, i) => (
                        <Badge 
                          key={i} 
                          variant="outline" 
                          className="cursor-pointer hover:bg-primary/20"
                          onClick={() => onChordSelect?.(selectedKey + chord)}
                        >
                          {chord}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Best For</h4>
                    <div className="flex flex-wrap gap-1">
                      {scale.genres.map(genre => (
                        <Badge key={genre} variant="secondary" className="text-xs">
                          {genre}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="bg-gradient-to-r from-primary/10 to-transparent border-primary/20">
              <CardContent className="p-4">
                <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Pro Tips
                </h4>
                <p className="text-sm text-muted-foreground">{scale.usageTips}</p>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export default function AdvancedScaleGuide({ onUpgrade, onChordSelect }: AdvancedScaleGuideProps) {
  const { hasActiveSubscription } = useSubscription();
  const [selectedCategory, setSelectedCategory] = useState<'major' | 'minor' | 'pentatonic' | 'blues' | 'modes' | 'exotic'>('pentatonic');
  const [selectedScale, setSelectedScale] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const scalesInCategory = useMemo(() => {
    return Object.entries(scaleLibrary)
      .filter(([_, scale]) => scale.category === selectedCategory)
      .map(([key, scale]) => ({ key, ...scale }));
  }, [selectedCategory]);

  const totalScales = Object.keys(scaleLibrary).length;

  if (!hasActiveSubscription) {
    return (
      <div className="bg-card rounded-lg p-6 border border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
        
        <div className="relative z-10">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Crown className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Professional Scale Library</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Unlock {totalScales}+ professional scales with interactive fretboard diagrams, 
              fingering patterns, and detailed music theory.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6 opacity-60">
            {Object.entries(scaleLibrary).slice(0, 6).map(([key, scale]) => (
              <Card key={key} className="bg-muted/50">
                <CardContent className="p-3">
                  <h3 className="font-medium text-sm mb-2">{scale.name}</h3>
                  <MiniFretboard 
                    formula={scale.formula} 
                    rootKey={Object.keys(scale.keys)[0]} 
                    className="blur-[2px]"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="flex justify-center">
            <Button onClick={onUpgrade} size="lg" className="gap-2" data-testid="button-upgrade-scales">
              <Crown className="h-5 w-5" />
              Upgrade to Premium
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Music className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Scale Library</h2>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            {totalScales} Scales
          </Badge>
        </div>
        <Badge variant="secondary" className="bg-primary/10 text-primary gap-1">
          <Crown className="h-3 w-3" />
          Premium
        </Badge>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {(Object.keys(categoryInfo) as Array<keyof typeof categoryInfo>).map((cat) => {
          const info = categoryInfo[cat];
          const Icon = info.icon;
          const count = Object.values(scaleLibrary).filter(s => s.category === cat).length;
          return (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
              className="gap-1.5"
              data-testid={`category-${cat}`}
            >
              <Icon className={`h-3.5 w-3.5 ${selectedCategory === cat ? '' : info.color}`} />
              {info.label}
              <span className="text-xs opacity-70">({count})</span>
            </Button>
          );
        })}
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {scalesInCategory.map(({ key, ...scale }) => (
          <ScaleCard
            key={key}
            scaleKey={key}
            scale={scale}
            isSelected={selectedScale === key}
            onClick={() => {
              setSelectedScale(key);
              setModalOpen(true);
            }}
          />
        ))}
      </div>
      
      {selectedScale && scaleLibrary[selectedScale] && (
        <ScaleDetailModal
          scaleKey={selectedScale}
          scale={scaleLibrary[selectedScale]}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onChordSelect={onChordSelect}
        />
      )}
    </div>
  );
}
