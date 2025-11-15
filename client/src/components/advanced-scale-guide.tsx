import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSubscription } from "@/hooks/useSubscription";
import { useAuthContext } from "@/contexts/AuthContext";
import { Crown, Lock, Music, Info, Guitar } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ScaleType {
  name: string;
  intervals: number[];
  description: string;
  degrees: string[];
  formula: string;
  compatibleChords: string[];
  usageTips: string;
  fretboardPattern: number[][];
  category: 'pentatonic' | 'modes' | 'exotic';
  keys: { [key: string]: string[] };
}

const scaleTypes: Record<string, ScaleType> = {
  major_pentatonic: {
    name: "Major Pentatonic",
    intervals: [1, 2, 3, 5, 6],
    description: "Bright, uplifting scale perfect for major chord progressions",
    formula: "1 - 2 - 3 - 5 - 6",
    compatibleChords: ["Major", "Major 7th", "9th", "6/9"],
    usageTips: "Perfect for country, rock, and pop solos. Emphasize the root and 3rd for strong melodic lines.",
    degrees: ["Root", "2nd", "Major 3rd", "Perfect 5th", "Major 6th"],
    fretboardPattern: [[0,3], [0,2], [0,2], [0,2], [0,3], [0,3]],
    category: 'pentatonic',
    keys: {
      "C": ["C", "D", "E", "G", "A"],
      "G": ["G", "A", "B", "D", "E"],
      "D": ["D", "E", "F#", "A", "B"],
      "A": ["A", "B", "C#", "E", "F#"],
      "E": ["E", "F#", "G#", "B", "C#"]
    }
  },
  minor_pentatonic: {
    name: "Minor Pentatonic",
    intervals: [1, 3, 4, 5, 7],
    description: "The backbone of blues, rock, and metal music",
    formula: "1 - b3 - 4 - 5 - b7",
    compatibleChords: ["Minor", "Minor 7th", "9th", "sus4"],
    usageTips: "Essential for rock and blues. Works over minor and dominant 7th chords. Box position 1 starts at root.",
    degrees: ["Root", "Minor 3rd", "Perfect 4th", "Perfect 5th", "Minor 7th"],
    fretboardPattern: [[0,3], [0,3], [0,2], [0,2], [0,3], [0,3]],
    category: 'pentatonic',
    keys: {
      "A": ["A", "C", "D", "E", "G"],
      "E": ["E", "G", "A", "B", "D"],
      "D": ["D", "F", "G", "A", "C"],
      "G": ["G", "Bb", "C", "D", "F"],
      "C": ["C", "Eb", "F", "G", "Bb"]
    }
  },
  blues: {
    name: "Blues Scale",
    intervals: [1, 3, 4, 4.5, 5, 7],
    description: "Minor pentatonic with added blues note (b5)",
    formula: "1 - b3 - 4 - b5 - 5 - b7",
    compatibleChords: ["7th", "9th", "Minor 7th", "13th"],
    usageTips: "Add tension with the blues note (b5). Resolve it to the 4th or 5th. Essential for authentic blues feel.",
    degrees: ["Root", "Minor 3rd", "Perfect 4th", "Blues Note", "Perfect 5th", "Minor 7th"],
    fretboardPattern: [[0,3], [0,3], [0,2,3], [0,2], [0,3], [0,3]],
    category: 'pentatonic',
    keys: {
      "A": ["A", "C", "D", "Eb", "E", "G"],
      "E": ["E", "G", "A", "Bb", "B", "D"],
      "G": ["G", "Bb", "C", "Db", "D", "F"],
      "D": ["D", "F", "G", "Ab", "A", "C"]
    }
  },
  ionian: {
    name: "Ionian (Major Scale)",
    intervals: [1, 2, 3, 4, 5, 6, 7],
    description: "The major scale - happy and bright foundation",
    formula: "1 - 2 - 3 - 4 - 5 - 6 - 7",
    compatibleChords: ["Major", "Major 7th", "6th", "add9"],
    usageTips: "The foundation of Western music. Use over major key progressions. Great for melodic playing.",
    degrees: ["Root", "2nd", "Major 3rd", "Perfect 4th", "Perfect 5th", "Major 6th", "Major 7th"],
    fretboardPattern: [[0,2], [0,2], [0,2], [0,1], [0,2], [0,2], [0,2]],
    category: 'modes',
    keys: {
      "C": ["C", "D", "E", "F", "G", "A", "B"],
      "G": ["G", "A", "B", "C", "D", "E", "F#"],
      "D": ["D", "E", "F#", "G", "A", "B", "C#"],
      "F": ["F", "G", "A", "Bb", "C", "D", "E"]
    }
  },
  dorian: {
    name: "Dorian Mode",
    intervals: [1, 2, 3, 4, 5, 6, 7],
    description: "Minor scale with natural 6th - jazzy and sophisticated",
    formula: "1 - 2 - b3 - 4 - 5 - 6 - b7",
    compatibleChords: ["Minor 7th", "Minor 9th", "Minor 11th", "sus2"],
    usageTips: "Jazz, funk, and fusion favorite. The natural 6th distinguishes it from natural minor. Works great over ii chords.",
    degrees: ["Root", "2nd", "Minor 3rd", "Perfect 4th", "Perfect 5th", "Major 6th", "Minor 7th"],
    fretboardPattern: [[0,2], [0,2], [0,1], [0,2], [0,2], [0,2], [0,1]],
    category: 'modes',
    keys: {
      "D": ["D", "E", "F", "G", "A", "B", "C"],
      "A": ["A", "B", "C", "D", "E", "F#", "G"],
      "E": ["E", "F#", "G", "A", "B", "C#", "D"],
      "G": ["G", "A", "Bb", "C", "D", "E", "F"]
    }
  },
  phrygian: {
    name: "Phrygian Mode",
    intervals: [1, 1, 3, 4, 5, 6, 7],
    description: "Dark, Spanish/flamenco flavor with flat 2nd",
    formula: "1 - b2 - b3 - 4 - 5 - b6 - b7",
    compatibleChords: ["Minor", "sus2", "Minor 7th b9"],
    usageTips: "Metal and flamenco essential. The b2 creates exotic tension. Perfect for dark, aggressive riffs.",
    degrees: ["Root", "Minor 2nd", "Minor 3rd", "Perfect 4th", "Perfect 5th", "Minor 6th", "Minor 7th"],
    fretboardPattern: [[0,1], [0,2], [0,2], [0,2], [0,1], [0,2], [0,2]],
    category: 'modes',
    keys: {
      "E": ["E", "F", "G", "A", "B", "C", "D"],
      "A": ["A", "Bb", "C", "D", "E", "F", "G"],
      "D": ["D", "Eb", "F", "G", "A", "Bb", "C"]
    }
  },
  lydian: {
    name: "Lydian Mode",
    intervals: [1, 2, 3, 4.5, 5, 6, 7],
    description: "Bright, dreamy major sound with #4",
    formula: "1 - 2 - 3 - #4 - 5 - 6 - 7",
    compatibleChords: ["Major 7th", "Major 9th #11", "add9"],
    usageTips: "Dreamy, floating quality. The #4 creates unique tension. Popular in film scores and progressive rock.",
    degrees: ["Root", "2nd", "Major 3rd", "Aug 4th", "Perfect 5th", "Major 6th", "Major 7th"],
    fretboardPattern: [[0,2], [0,2], [0,2], [0,2], [0,2], [0,2], [0,1]],
    category: 'modes',
    keys: {
      "F": ["F", "G", "A", "B", "C", "D", "E"],
      "C": ["C", "D", "E", "F#", "G", "A", "B"],
      "G": ["G", "A", "B", "C#", "D", "E", "F#"]
    }
  },
  mixolydian: {
    name: "Mixolydian Mode",
    intervals: [1, 2, 3, 4, 5, 6, 7],
    description: "Major scale with flat 7th - dominant and bluesy",
    formula: "1 - 2 - 3 - 4 - 5 - 6 - b7",
    compatibleChords: ["7th", "9th", "11th", "13th"],
    usageTips: "Rock, blues, and country staple. Works perfectly over dominant 7th chords. The b7 adds bluesy character.",
    degrees: ["Root", "2nd", "Major 3rd", "Perfect 4th", "Perfect 5th", "Major 6th", "Minor 7th"],
    fretboardPattern: [[0,2], [0,2], [0,2], [0,1], [0,2], [0,1], [0,2]],
    category: 'modes',
    keys: {
      "G": ["G", "A", "B", "C", "D", "E", "F"],
      "D": ["D", "E", "F#", "G", "A", "B", "C"],
      "A": ["A", "B", "C#", "D", "E", "F#", "G"],
      "C": ["C", "D", "E", "F", "G", "A", "Bb"]
    }
  },
  aeolian: {
    name: "Aeolian (Natural Minor)",
    intervals: [1, 2, 3, 4, 5, 6, 7],
    description: "Natural minor scale - melancholic and expressive",
    formula: "1 - 2 - b3 - 4 - 5 - b6 - b7",
    compatibleChords: ["Minor", "Minor 7th", "Minor 9th"],
    usageTips: "The natural minor foundation. Sad, emotional quality. Essential for minor key progressions.",
    degrees: ["Root", "2nd", "Minor 3rd", "Perfect 4th", "Perfect 5th", "Minor 6th", "Minor 7th"],
    fretboardPattern: [[0,2], [0,1], [0,2], [0,2], [0,1], [0,2], [0,2]],
    category: 'modes',
    keys: {
      "A": ["A", "B", "C", "D", "E", "F", "G"],
      "E": ["E", "F#", "G", "A", "B", "C", "D"],
      "D": ["D", "E", "F", "G", "A", "Bb", "C"]
    }
  },
  locrian: {
    name: "Locrian Mode",
    intervals: [1, 1, 3, 4, 4, 6, 7],
    description: "Diminished, unstable - most dissonant mode",
    formula: "1 - b2 - b3 - 4 - b5 - b6 - b7",
    compatibleChords: ["Half-diminished", "m7b5"],
    usageTips: "Rarely used as tonal center due to b5. Great for tension and metal. Works over m7b5 chords.",
    degrees: ["Root", "Minor 2nd", "Minor 3rd", "Perfect 4th", "Dim 5th", "Minor 6th", "Minor 7th"],
    fretboardPattern: [[0,1], [0,2], [0,2], [0,1], [0,2], [0,2], [0,2]],
    category: 'modes',
    keys: {
      "B": ["B", "C", "D", "E", "F", "G", "A"],
      "E": ["E", "F", "G", "A", "Bb", "C", "D"]
    }
  },
  harmonic_minor: {
    name: "Harmonic Minor",
    intervals: [1, 2, 3, 4, 5, 6, 7.5],
    description: "Exotic minor with major 7th - classical and neo-classical",
    formula: "1 - 2 - b3 - 4 - 5 - b6 - 7",
    compatibleChords: ["Minor", "Minor maj7", "Diminished 7th"],
    usageTips: "Classical, metal, and gypsy jazz. The raised 7th creates exotic tension. Essential for neo-classical shred.",
    degrees: ["Root", "2nd", "Minor 3rd", "Perfect 4th", "Perfect 5th", "Minor 6th", "Major 7th"],
    fretboardPattern: [[0,2], [0,1], [0,2], [0,2], [0,1], [0,3], [0,1]],
    category: 'exotic',
    keys: {
      "A": ["A", "B", "C", "D", "E", "F", "G#"],
      "E": ["E", "F#", "G", "A", "B", "C", "D#"],
      "D": ["D", "E", "F", "G", "A", "Bb", "C#"]
    }
  },
  melodic_minor: {
    name: "Melodic Minor",
    intervals: [1, 2, 3, 4, 5, 6, 7],
    description: "Minor with major 6th and 7th - jazz essential",
    formula: "1 - 2 - b3 - 4 - 5 - 6 - 7",
    compatibleChords: ["Minor maj7", "Minor 6th", "Minor 9th"],
    usageTips: "Jazz standard. Ascending melodic minor. Creates sophisticated tension. Works great over altered dominants.",
    degrees: ["Root", "2nd", "Minor 3rd", "Perfect 4th", "Perfect 5th", "Major 6th", "Major 7th"],
    fretboardPattern: [[0,2], [0,1], [0,2], [0,2], [0,2], [0,2], [0,2]],
    category: 'exotic',
    keys: {
      "A": ["A", "B", "C", "D", "E", "F#", "G#"],
      "D": ["D", "E", "F", "G", "A", "B", "C#"],
      "E": ["E", "F#", "G", "A", "B", "C#", "D#"]
    }
  },
  whole_tone: {
    name: "Whole Tone",
    intervals: [1, 2, 3, 4.5, 5.5, 7],
    description: "Symmetrical scale - dreamlike and unresolved",
    formula: "1 - 2 - 3 - #4 - #5 - b7",
    compatibleChords: ["Augmented", "7th #5", "9th #5"],
    usageTips: "Creates ambiguous, floating sound. No perfect 5th creates mystery. Use sparingly for effect.",
    degrees: ["Root", "2nd", "Major 3rd", "Aug 4th", "Aug 5th", "Minor 7th"],
    fretboardPattern: [[0,2], [0,2], [0,2], [0,2], [0,2], [0,2]],
    category: 'exotic',
    keys: {
      "C": ["C", "D", "E", "F#", "G#", "Bb"]
    }
  },
  diminished: {
    name: "Diminished (Half-Whole)",
    intervals: [1, 1.5, 2.5, 3, 4, 5, 6, 7],
    description: "Symmetrical scale alternating half and whole steps",
    formula: "1 - b2 - b3 - 3 - #4 - 5 - 6 - b7",
    compatibleChords: ["Diminished 7th", "7th b9"],
    usageTips: "Jazz and bebop essential. Creates intense dissonance. Use over diminished and dominant 7th b9 chords.",
    degrees: ["Root", "Minor 2nd", "Minor 3rd", "Major 3rd", "Aug 4th", "Perfect 5th", "Major 6th", "Minor 7th"],
    fretboardPattern: [[0,1], [0,2], [0,1], [0,2], [0,1], [0,2], [0,1], [0,2]],
    category: 'exotic',
    keys: {
      "C": ["C", "Db", "Eb", "E", "F#", "G", "A", "Bb"]
    }
  }
};

interface AdvancedScaleGuideProps {
  onUpgrade?: () => void;
  onChordSelect?: (chord: string) => void;
}

export default function AdvancedScaleGuide({ onUpgrade, onChordSelect }: AdvancedScaleGuideProps) {
  const subscription = useSubscription();
  const { hasActiveSubscription } = subscription;
  const { user } = useAuthContext();
  const [selectedScale, setSelectedScale] = useState<string>("minor_pentatonic");
  const [selectedKey, setSelectedKey] = useState<string>("A");
  const [selectedCategory, setSelectedCategory] = useState<'pentatonic' | 'modes' | 'exotic'>('pentatonic');

  const handleScaleChange = (scaleKey: string) => {
    setSelectedScale(scaleKey);
    const newScale = scaleTypes[scaleKey];
    const availableKeys = Object.keys(newScale.keys);
    if (!availableKeys.includes(selectedKey)) {
      setSelectedKey(availableKeys[0]);
    }
  };

  const handleCategoryChange = (category: 'pentatonic' | 'modes' | 'exotic') => {
    setSelectedCategory(category);
    const scalesInNewCategory = Object.entries(scaleTypes)
      .filter(([_, scale]) => scale.category === category)
      .map(([key, _]) => key);
    const newScale = scalesInNewCategory[0];
    setSelectedScale(newScale);
    const availableKeys = Object.keys(scaleTypes[newScale].keys);
    setSelectedKey(availableKeys[0]);
  };

  if (!hasActiveSubscription) {
    return (
      <div className="bg-card rounded-lg p-6 border border-border relative">
        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm rounded-lg flex items-center justify-center z-10">
          <Card className="bg-card border-primary/20 shadow-lg max-w-md">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-2">
                <Crown className="h-12 w-12 text-primary" />
              </div>
              <CardTitle className="flex items-center justify-center gap-2">
                <Lock className="h-4 w-4" />
                Premium Feature
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-4">
                Unlock 14+ professional scales with fretboard diagrams, detailed theory, 
                and clickable notes to instantly view patterns on your guitar neck.
              </p>
              <Button onClick={onUpgrade} className="w-full" data-testid="button-upgrade">
                <Crown className="mr-2 h-4 w-4" />
                Upgrade to Premium
              </Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Blurred background content */}
        <div className="opacity-50">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Music className="mr-2 h-5 w-5 text-primary" />
            Advanced Scale Guide
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-primary/20 p-3 rounded-lg text-center">
                  <div className="w-8 h-8 bg-primary/40 rounded-full mx-auto"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const scalesInCategory = Object.entries(scaleTypes)
    .filter(([_, scale]) => scale.category === selectedCategory)
    .map(([key, _]) => key);

  const currentScale = scaleTypes[selectedScale];
  const availableKeys = Object.keys(currentScale.keys);

  const handleNoteClick = (note: string, chord: string) => {
    if (onChordSelect) {
      onChordSelect(chord);
    }
  };

  return (
    <div className="bg-card rounded-lg p-4 md:p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center">
          <Music className="mr-2 h-5 w-5 text-primary" />
          Advanced Scale Guide
        </h2>
        <Badge variant="secondary" className="bg-primary/10 text-primary">
          <Crown className="mr-1 h-3 w-3" />
          Premium
        </Badge>
      </div>

      {/* Category Selector */}
      <div className="mb-4">
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={selectedCategory === 'pentatonic' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleCategoryChange('pentatonic')}
            className="flex items-center gap-1"
            data-testid="button-category-pentatonic"
          >
            <Guitar className="h-3 w-3" />
            Pentatonic (3)
          </Button>
          <Button
            variant={selectedCategory === 'modes' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleCategoryChange('modes')}
            className="flex items-center gap-1"
            data-testid="button-category-modes"
          >
            <Music className="h-3 w-3" />
            Modes (7)
          </Button>
          <Button
            variant={selectedCategory === 'exotic' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleCategoryChange('exotic')}
            className="flex items-center gap-1"
            data-testid="button-category-exotic"
          >
            <Crown className="h-3 w-3" />
            Exotic (4)
          </Button>
        </div>
      </div>

      {/* Scale Selector */}
      <div className="mb-4">
        <label className="text-sm font-medium text-muted-foreground mb-2 block">Select Scale</label>
        <Select value={selectedScale} onValueChange={handleScaleChange}>
          <SelectTrigger className="w-full" data-testid="select-scale">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {scalesInCategory.map((scaleKey) => (
              <SelectItem key={scaleKey} value={scaleKey}>
                {scaleTypes[scaleKey].name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Key Selector */}
      <div className="mb-4">
        <label className="text-sm font-medium text-muted-foreground mb-2 block">Select Key</label>
        <div className="flex flex-wrap gap-2">
          {availableKeys.map((key) => (
            <Button
              key={key}
              variant={selectedKey === key ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedKey(key)}
              className="min-w-[50px]"
              data-testid={`button-key-${key}`}
            >
              {key}
            </Button>
          ))}
        </div>
      </div>

      {/* Scale Information Card */}
      <Card className="mb-4 bg-muted/50">
        <CardContent className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
              {currentScale.name}
              <Badge variant="outline" className="text-xs">{selectedKey} Key</Badge>
            </h3>
            <p className="text-sm text-muted-foreground">{currentScale.description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div>
              <span className="font-medium text-primary">Formula:</span>
              <p className="text-muted-foreground mt-1">{currentScale.formula}</p>
            </div>
            <div>
              <span className="font-medium text-primary">Compatible Chords:</span>
              <p className="text-muted-foreground mt-1">
                {currentScale.compatibleChords.join(', ')}
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-border">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium text-sm text-primary">Usage Tips:</span>
                <p className="text-sm text-muted-foreground mt-1">{currentScale.usageTips}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scale Notes with Fretboard Visualization */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Guitar className="h-4 w-4" />
          Scale Notes & Degrees
          <span className="text-xs text-muted-foreground font-normal">(Click any note to view on fretboard)</span>
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {currentScale.keys[selectedKey]?.map((note, index) => {
            const degree = currentScale.degrees[index];
            const isRoot = index === 0;
            
            return (
              <button
                key={index}
                onClick={() => handleNoteClick(note, note)}
                className={`${isRoot ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'} 
                  p-3 rounded-lg text-center hover:ring-2 hover:ring-primary transition-all
                  transform hover:scale-105 active:scale-95 cursor-pointer`}
                data-testid={`note-${index}`}
              >
                <div className="text-xs opacity-80 mb-1">{degree}</div>
                <div className="text-lg font-bold">{note}</div>
              </button>
            );
          }) || []}
        </div>
      </div>

      {/* Simplified Fretboard Pattern Visualization */}
      <Card className="bg-muted/30">
        <CardContent className="p-4">
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Guitar className="h-4 w-4" />
            Fretboard Pattern Guide
          </h4>
          <div className="space-y-2">
            {['E', 'B', 'G', 'D', 'A', 'E'].map((string, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground w-4">{string}</span>
                <div className="flex-1 h-8 bg-background rounded border border-border flex items-center px-2 gap-1">
                  {currentScale.fretboardPattern[idx]?.map((fret, fretIdx) => (
                    <div
                      key={fretIdx}
                      className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs text-primary-foreground font-bold"
                    >
                      {fret}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3 text-center">
            Numbers represent fret positions on each string. This is one common pattern - explore the full neck!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
