import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSubscription } from "@/hooks/useSubscription";
import { useAuthContext } from "@/contexts/AuthContext";
import { Crown, Lock, Shuffle, Music, Guitar, BookOpen } from "lucide-react";
import { modes, NOTES, ModeDef, buildScaleByIntervals, generateRelatedScales, getChordDiagram, type RelatedScale } from "@/lib/music-data";
import FretboardDisplay from "@/components/fretboard-display";

// Normalize chord names to match chord diagram keys
function normalizeChordName(chord: string): string {
  let normalized = chord;
  
  // Convert unicode music symbols to ASCII equivalents
  normalized = normalized.replace(/♭/g, 'b');  // Unicode flat → 'b'
  normalized = normalized.replace(/♯/g, '#');  // Unicode sharp → '#'
  
  // Convert sharps to flats where database uses flats (A#, D#, G# → Bb, Eb, Ab)
  const sharpToFlat: Record<string, string> = {
    'A#': 'Bb',
    'D#': 'Eb',
    'G#': 'Ab'
  };
  
  for (const [sharp, flat] of Object.entries(sharpToFlat)) {
    if (normalized.startsWith(sharp)) {
      normalized = normalized.replace(sharp, flat);
      break;
    }
  }
  
  // Fix chord symbols (handle both at end and in middle of chord name)
  normalized = normalized.replace(/\+(?=$|[0-9])/, 'aug');  // A+ → Aaug, A+7 → Aaug7
  normalized = normalized.replace(/°(?=$|[0-9])/, 'dim');   // A° → Adim, A°7 → Adim7
  normalized = normalized.replace(/ø/, 'm7b5');             // Half-diminished anywhere
  
  // Fix suspended chords: sus → sus4
  normalized = normalized.replace(/sus(?![24])/, 'sus4');
  
  // Fix Major notation: Maj → ''
  normalized = normalized.replace(/Maj(?![0-9])/, '');
  
  // Fix Major 7th/9th/11th/13th: M7 → maj7, etc.
  normalized = normalized.replace(/M7/, 'maj7');
  normalized = normalized.replace(/M9/, 'maj9');
  normalized = normalized.replace(/M11/, 'maj11');
  normalized = normalized.replace(/M13/, 'maj13');
  
  // Fix power chords: remove '5' suffix (A5 → A)
  normalized = normalized.replace(/^([A-G](?:#|b)?)5$/, '$1');
  
  // Fix minor notation variations: min → m
  normalized = normalized.replace(/min(?=[0-9]|$)/, 'm');
  
  return normalized;
}

interface ScaleInfo {
  name: string;
  notes: string[];
  description: string;
  color: string;
}

interface OctaveChord {
  name: string;
  octave: number;
  notes: string[];
  fretPosition: string;
}

interface FretPosition {
  string: number; // 0-5 (E, A, D, G, B, E)
  fret: number;   // 0-12
  note: string;
}

// Standard tuning fretboard note mapping (24 frets)
const fretboardNotes: string[][] = [
  // String 6 (Low E): E to E (0-24 frets)
  ['E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B', 'C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B', 'C', 'C♯', 'D', 'D♯', 'E'],
  // String 5 (A): A to A (0-24 frets)
  ['A', 'A♯', 'B', 'C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B', 'C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A'],
  // String 4 (D): D to D (0-24 frets)
  ['D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B', 'C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B', 'C', 'C♯', 'D'],
  // String 3 (G): G to G (0-24 frets)
  ['G', 'G♯', 'A', 'A♯', 'B', 'C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B', 'C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G'],
  // String 2 (B): B to B (0-24 frets)
  ['B', 'C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B', 'C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'],
  // String 1 (High E): E to E (0-24 frets)
  ['E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B', 'C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B', 'C', 'C♯', 'D', 'D♯', 'E']
];

// Scale definitions with interval formulas (NOT hardcoded notes!)
interface ScaleDefinition {
  name: string;
  intervals: number[]; // Semitone intervals from root
  description: string;
  color: string;
}

const scaleDefinitions: Record<string, ScaleDefinition> = {
  minor_pentatonic: {
    name: "Minor Pentatonic",
    intervals: [0, 3, 5, 7, 10], // Root, m3, 4th, 5th, m7
    description: "Classic blues and rock foundation",
    color: "bg-red-500"
  },
  major_pentatonic: {
    name: "Major Pentatonic", 
    intervals: [0, 2, 4, 7, 9], // Root, 2nd, M3, 5th, 6th
    description: "Bright, uplifting melodic scale",
    color: "bg-blue-500"
  },
  blues: {
    name: "Blues Scale",
    intervals: [0, 3, 5, 6, 7, 10], // Root, m3, 4th, b5 (blue note), 5th, m7
    description: "Minor pentatonic with blue note",
    color: "bg-purple-500"
  },
  dorian: {
    name: "Dorian Mode",
    intervals: [0, 2, 3, 5, 7, 9, 10], // Root, 2nd, m3, 4th, 5th, 6th, m7
    description: "Minor with natural 6th - jazzy feel",
    color: "bg-green-500"
  },
  mixolydian: {
    name: "Mixolydian Mode", 
    intervals: [0, 2, 4, 5, 7, 9, 10], // Root, 2nd, M3, 4th, 5th, 6th, m7
    description: "Major with flat 7th - dominant sound",
    color: "bg-orange-500"
  },
  natural_minor: {
    name: "Natural Minor",
    intervals: [0, 2, 3, 5, 7, 8, 10], // Root, 2nd, m3, 4th, 5th, m6, m7
    description: "Classic minor scale foundation",
    color: "bg-gray-500"
  }
};

// Helper to transpose a note by semitones, preserving flat/sharp family
const transpose = (rootNote: string, semitones: number): string => {
  const NOTES_SHARP = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'];
  const NOTES_FLAT = ['C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭', 'G', 'A♭', 'A', 'B♭', 'B'];
  
  const normalizeNote = (note: string): string => {
    return note.replace(/♯/g, '#').replace(/♭/g, 'b').replace(/\s/g, '');
  };
  
  // Extract root note without chord quality (remove m, 7, maj, etc.)
  const match = rootNote.match(/^([A-G][♯♭#b]?)/);
  if (!match) return rootNote; // Return original if no valid root found
  
  const pureRoot = match[1];
  const normalized = normalizeNote(pureRoot);
  
  // Determine if we should use flat or sharp notation based on the root note
  const useFlats = pureRoot.includes('♭') || pureRoot.includes('b');
  const noteArray = useFlats ? NOTES_FLAT : NOTES_SHARP;
  
  // Find root index in the appropriate array
  let rootIndex = noteArray.findIndex(note => normalizeNote(note) === normalized);
  
  if (rootIndex === -1) {
    // Handle enharmonic equivalents
    const enharmonics: Record<string, string> = {
      'Db': 'D♭', 'Eb': 'E♭', 'Gb': 'G♭', 'Ab': 'A♭', 'Bb': 'B♭',
      'C#': 'C♯', 'D#': 'D♯', 'F#': 'F♯', 'G#': 'G♯', 'A#': 'A♯'
    };
    const equivalent = enharmonics[normalized];
    if (equivalent) {
      rootIndex = noteArray.findIndex(note => normalizeNote(note) === normalizeNote(equivalent));
    }
  }
  
  if (rootIndex === -1) {
    // Try the other array as fallback
    const fallbackArray = useFlats ? NOTES_SHARP : NOTES_FLAT;
    rootIndex = fallbackArray.findIndex(note => normalizeNote(note) === normalized);
    if (rootIndex !== -1) {
      const newIndex = (rootIndex + semitones + 12) % 12;
      return fallbackArray[newIndex];
    }
    return pureRoot;
  }
  
  const newIndex = (rootIndex + semitones + 12) % 12;
  return noteArray[newIndex];
};

// Build scale from root note and intervals
const buildScale = (root: string, intervals: number[]): string[] => {
  return intervals.map(interval => transpose(root, interval));
};

const octaveChords: OctaveChord[] = [
  { name: "Am", octave: 1, notes: ["A3", "C4", "E4"], fretPosition: "5th fret" },
  { name: "Am", octave: 2, notes: ["A4", "C5", "E5"], fretPosition: "12th fret" },
  { name: "C", octave: 1, notes: ["C3", "E3", "G3"], fretPosition: "3rd fret" },
  { name: "C", octave: 2, notes: ["C4", "E4", "G4"], fretPosition: "8th fret" },
  { name: "Em", octave: 1, notes: ["E3", "G3", "B3"], fretPosition: "Open" },
  { name: "Em", octave: 2, notes: ["E4", "G4", "B4"], fretPosition: "7th fret" },
  { name: "G", octave: 1, notes: ["G3", "B3", "D4"], fretPosition: "3rd fret" },
  { name: "G", octave: 2, notes: ["G4", "B4", "D5"], fretPosition: "10th fret" }
];

interface ScaleCombinationProps {
  onUpgrade?: () => void;
}

export default function ScaleCombination({ onUpgrade }: ScaleCombinationProps) {
  const { hasActiveSubscription } = useSubscription();
  const [selectedTab, setSelectedTab] = useState<string>("combinations");
  const [scaleCombination, setScaleCombination] = useState<ScaleInfo[]>([]);
  const [octaveCombination, setOctaveCombination] = useState<OctaveChord[]>([]);
  
  // Mode-related state
  const [selectedMode, setSelectedMode] = useState<ModeDef | null>(null);
  const [modeRoot, setModeRoot] = useState<string>('');
  const [modeNotes, setModeNotes] = useState<string[]>([]);
  const [relatedScales, setRelatedScales] = useState<RelatedScale[]>([]);

  if (!hasActiveSubscription) {
    return (
      <div className="bg-card rounded-lg p-6 border border-border relative">
        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm rounded-lg flex items-center justify-center z-10">
          <Card className="bg-card border-primary/20 shadow-lg">
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
                Unlock advanced scale combinations and octave chord patterns to
                take your guitar solos and compositions to the next level.
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
            Scale Combinations
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-primary/20 p-3 rounded-lg text-center">
                  <div className="w-8 h-8 bg-primary/40 rounded-full mx-auto"></div>
                </div>
              ))}
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="h-4 bg-muted-foreground/20 rounded mb-2"></div>
              <div className="h-3 bg-muted-foreground/20 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Helper function to find all fret positions for a given note
  const findNotePositions = (note: string): FretPosition[] => {
    const positions: FretPosition[] = [];
    const normalizedNote = note.replace('♯', '#').replace('♭', 'b');
    
    for (let stringIndex = 0; stringIndex < fretboardNotes.length; stringIndex++) {
      for (let fretIndex = 0; fretIndex < fretboardNotes[stringIndex].length; fretIndex++) {
        const fretNote = fretboardNotes[stringIndex][fretIndex].replace('♯', '#').replace('♭', 'b');
        if (fretNote === normalizedNote || 
            (normalizedNote === 'D#' && fretNote === 'Eb') ||
            (normalizedNote === 'Eb' && fretNote === 'D#')) {
          positions.push({
            string: stringIndex,
            fret: fretIndex,
            note: note
          });
        }
      }
    }
    return positions;
  };

  // Get color class without 'bg-' prefix for use in border/text colors
  const getColorHex = (bgColorClass: string) => {
    const colorMap: Record<string, string> = {
      'bg-red-500': 'rgb(239, 68, 68)',
      'bg-blue-500': 'rgb(59, 130, 246)', 
      'bg-purple-500': 'rgb(168, 85, 247)',
      'bg-green-500': 'rgb(34, 197, 94)',
      'bg-orange-500': 'rgb(249, 115, 22)',
      'bg-gray-500': 'rgb(107, 114, 128)'
    };
    return colorMap[bgColorClass] || 'rgb(59, 130, 246)';
  };

  // Single fretboard component for individual scale visualization
  const SingleScaleFretboard = ({ 
    scale, 
    scaleColor 
  }: { 
    scale: ScaleInfo,
    scaleColor: string
  }) => {
    const strings = ['E', 'A', 'D', 'G', 'B', 'E'];
    const frets = Array.from({ length: 25 }, (_, i) => i); // 0-24 frets
    
    // Get positions for this scale only
    const scalePositions = scale.notes.flatMap(note => 
      findNotePositions(note).map(pos => ({
        ...pos,
        color: scaleColor,
        label: note.charAt(0)
      }))
    );

    return (
      <div className="bg-card rounded-lg p-3 border border-border">
        <h4 className="text-sm font-semibold mb-3 text-center" style={{ color: scaleColor }}>
          {scale.name}
        </h4>
        
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Fret numbers */}
            <div className="flex mb-1">
              <div className="w-6 text-xs"></div>
              {frets.map(fret => (
                <div key={fret} className={`${fret === 0 ? 'w-8' : 'w-8'} text-xs text-center font-medium text-muted-foreground`}>
                  {fret}
                </div>
              ))}
            </div>
            
            {/* Fretboard strings */}
            {strings.map((string, stringIndex) => (
              <div key={stringIndex} className="flex items-center mb-0.5">
                {/* String name */}
                <div className="w-6 text-xs text-center font-bold text-muted-foreground">
                  {string}
                </div>
                
                {/* Frets */}
                {frets.map(fret => {
                  const positionsAtThisFret = scalePositions.filter(
                    pos => pos.string === stringIndex && pos.fret === fret
                  );
                  
                  return (
                    <div key={fret} className={`${fret === 0 ? 'w-8' : 'w-8'} h-6 relative flex items-center justify-center`}>
                      {/* String line */}
                      <div className="absolute w-full h-px bg-gray-400 dark:bg-gray-600"></div>
                      
                      {/* Fret wire */}
                      {fret > 0 && (
                        <div className="absolute left-0 w-px h-6 bg-gray-500 dark:bg-gray-500"></div>
                      )}
                      
                      {/* Note markers */}
                      {positionsAtThisFret.map((position, index) => (
                        <div
                          key={index}
                          className="absolute w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold z-10"
                          style={{ 
                            backgroundColor: position.color,
                            color: 'white'
                          }}
                          title={`${position.note} (${scale.name})`}
                        >
                          {position.label}
                        </div>
                      ))}
                      
                      {/* Fret position markers */}
                      {stringIndex === 2 && [3, 5, 7, 9, 15, 17, 19, 21].includes(fret) && (
                        <div className="absolute w-1.5 h-1.5 bg-gray-400 dark:bg-gray-600 rounded-full opacity-40"></div>
                      )}
                      {stringIndex === 2 && fret === 12 && (
                        <div className="absolute w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full opacity-40"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Fretboard visualization component
  const FretboardVisualization = ({ 
    scales, 
    mode, 
    variant = "scales" 
  }: { 
    scales?: ScaleInfo[], 
    mode?: { mode: ModeDef, root: string, notes: string[] },
    variant?: "scales" | "mode" 
  }) => {
    const strings = ['E', 'A', 'D', 'G', 'B', 'E'];
    const frets = Array.from({ length: 25 }, (_, i) => i); // 0-24 frets

    // For mode visualization (single fretboard)
    if (variant === "mode" && mode) {
      const scalePositions = mode.notes.flatMap((note, noteIndex) => 
        findNotePositions(note).map(pos => {
          const degree = noteIndex + 1;
          const isChordTone = mode.mode.characteristicDegrees.includes(degree) || [1, 3, 5].includes(degree);
          const isAvoid = mode.mode.avoidDegrees?.includes(degree);
          
          return {
            ...pos,
            degree,
            isChordTone,
            isAvoid,
            color: mode.mode.color,
            label: degree.toString(),
            note
          };
        })
      );

      return (
        <div className="bg-amber-50 dark:bg-amber-950/20 rounded-lg p-4 border-2 border-amber-200 dark:border-amber-800">
          <div className="flex items-center justify-center mb-3">
            <Guitar className="mr-2 h-5 w-5 text-amber-600 dark:text-amber-400" />
            <h4 className="text-lg font-semibold text-amber-800 dark:text-amber-200">
              {mode.mode.name} - Full Fretboard (0-24)
            </h4>
          </div>
          
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Fret numbers */}
              <div className="flex mb-2">
                <div className="w-6 text-xs"></div>
                {frets.map(fret => (
                  <div key={fret} className="w-8 text-xs text-center font-medium text-muted-foreground">
                    {fret}
                  </div>
                ))}
              </div>
              
              {/* Fretboard */}
              {strings.map((string, stringIndex) => (
                <div key={stringIndex} className="flex items-center mb-1">
                  <div className="w-6 text-xs text-center font-bold text-amber-700 dark:text-amber-300">
                    {string}
                  </div>
                  
                  {frets.map(fret => {
                    const positionsAtThisFret = scalePositions.filter(
                      pos => pos.string === stringIndex && pos.fret === fret
                    );
                    
                    return (
                      <div key={fret} className="w-8 h-6 relative flex items-center justify-center">
                        <div className="absolute w-full h-px bg-gray-400 dark:bg-gray-600"></div>
                        {fret > 0 && <div className="absolute left-0 w-px h-6 bg-gray-600 dark:bg-gray-400"></div>}
                        
                        {positionsAtThisFret.map((position, index) => {
                          const isChordTone = position.isChordTone;
                          const isAvoid = position.isAvoid;
                          
                          return (
                            <div
                              key={index}
                              className={`absolute w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs font-bold z-10 ${
                                isAvoid ? 'opacity-50' : ''
                              }`}
                              style={{ 
                                backgroundColor: !isChordTone ? 'transparent' : position.color,
                                borderColor: position.color,
                                color: !isChordTone ? position.color : 'white',
                                borderWidth: '2px'
                              }}
                              title={`${position.note} (Degree ${position.degree}${isChordTone ? ' - Chord Tone' : ''}${isAvoid ? ' - Avoid' : ''})`}
                            >
                              {position.label}
                            </div>
                          );
                        })}
                        
                        {stringIndex === 2 && [3, 5, 7, 9, 15, 17, 19, 21].includes(fret) && (
                          <div className="absolute w-1.5 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full opacity-50"></div>
                        )}
                        {stringIndex === 2 && fret === 12 && (
                          <div className="absolute w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full opacity-50"></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-4 text-xs text-muted-foreground space-y-2">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full border-2" style={{ backgroundColor: mode.mode.color, borderColor: mode.mode.color }}></div>
                <span>Chord Tones (1,3,5)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full border-2 bg-transparent" style={{ borderColor: mode.mode.color, color: mode.mode.color }}></div>
                <span>Tensions/Extensions</span>
              </div>
            </div>
            <p>💡 Full 24-fret visualization. Filled dots = chord tones, outlined = tensions.</p>
          </div>
        </div>
      );
    }

    // For scales - show each scale on separate fretboard
    if (variant === "scales" && scales && scales.length > 0) {
      return (
        <div className="space-y-4">
          <div className="text-center mb-2">
            <h4 className="text-lg font-semibold flex items-center justify-center gap-2">
              <Guitar className="h-5 w-5" />
              Full Fretboard Visualization (0-24 frets)
            </h4>
            <p className="text-xs text-muted-foreground mt-1">Each scale shown separately for clarity</p>
          </div>
          
          {scales.map((scale, index) => (
            <SingleScaleFretboard 
              key={index}
              scale={scale}
              scaleColor={getColorHex(scale.color)}
            />
          ))}
          
          <div className="text-xs text-muted-foreground text-center p-3 bg-muted/50 rounded-lg">
            💡 Tip: Each fretboard shows one scale across all 24 frets. Practice moving up and down the neck!
          </div>
        </div>
      );
    }

    return null;
  };

  const generateScaleCombination = () => {
    const roots = ['C', 'D♭', 'D', 'E♭', 'E', 'F', 'F♯', 'G', 'A♭', 'A', 'B♭', 'B'];
    const randomRoot = roots[Math.floor(Math.random() * roots.length)];
    
    const numScales = Math.floor(Math.random() * 2) + 2; // 2-3 scales
    const scaleKeys = Object.keys(scaleDefinitions);
    const shuffled = [...scaleKeys].sort(() => 0.5 - Math.random());
    const selectedKeys = shuffled.slice(0, numScales);
    
    const generatedScales: ScaleInfo[] = selectedKeys.map(key => {
      const definition = scaleDefinitions[key];
      const notes = buildScale(randomRoot, definition.intervals);
      
      return {
        name: `${randomRoot} ${definition.name}`,
        notes,
        description: definition.description,
        color: definition.color
      };
    });
    
    setScaleCombination(generatedScales);
  };

  const generateOctaveCombination = () => {
    const numChords = Math.floor(Math.random() * 3) + 2; // 2-4 chords
    const shuffled = [...octaveChords].sort(() => 0.5 - Math.random());
    setOctaveCombination(shuffled.slice(0, numChords));
  };

  const generateRandomMode = () => {
    // Pick random root note
    const randomRoot = NOTES[Math.floor(Math.random() * NOTES.length)];
    
    // Pick random mode
    const randomMode = modes[Math.floor(Math.random() * modes.length)];
    
    // Build mode notes
    const notes = buildScaleByIntervals(randomRoot, randomMode.intervals, randomMode.preferFlats);
    
    // Generate related scales
    const related = generateRelatedScales(randomMode, randomRoot);
    
    // Update state
    setSelectedMode(randomMode);
    setModeRoot(randomRoot);
    setModeNotes(notes);
    setRelatedScales(related);
  };

  return (
    <div className="bg-card rounded-lg p-4 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center">
          <Music className="mr-2 h-5 w-5 text-primary" />
          Scale Combinations
        </h2>
        <Badge variant="secondary" className="bg-primary/10 text-primary">
          <Crown className="mr-1 h-3 w-3" />
          Premium
        </Badge>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="combinations" className="text-sm">Scale Mix</TabsTrigger>
          <TabsTrigger value="octaves" className="text-sm">Octave Chords</TabsTrigger>
          <TabsTrigger value="modes" className="text-sm">Modes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="combinations" className="space-y-4">
          <div className="text-center">
            <Button 
              onClick={generateScaleCombination} 
              className="w-full mb-4"
              data-testid="button-generate-scales"
            >
              <Shuffle className="mr-2 h-4 w-4" />
              Generate Scale Combination
            </Button>
          </div>

          {scaleCombination.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-md font-semibold text-center">
                Soloing Combination
              </h3>
              <div className="grid gap-3">
                {scaleCombination.map((scale, index) => (
                  <Card key={index} className="p-3 border">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={`${scale.color} text-white`}>
                        Scale {index + 1}
                      </Badge>
                      <span className="font-semibold text-sm">{scale.name}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{scale.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {scale.notes.map((note, noteIndex) => (
                        <Badge 
                          key={noteIndex} 
                          variant="outline" 
                          className="text-xs"
                          data-testid={`note-${index}-${noteIndex}`}
                        >
                          {note}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
              
              {/* Fretboard Visualization */}
              <FretboardVisualization scales={scaleCombination} />
              
              <Card className="p-3 bg-primary/5 border-primary/20">
                <h4 className="font-semibold text-sm mb-2">💡 Soloing Tip</h4>
                <p className="text-xs text-muted-foreground">
                  Mix notes from these scales during your solo. Start with the first scale, 
                  then blend in notes from the others for unique melodic phrases.
                </p>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="octaves" className="space-y-4">
          <div className="text-center">
            <Button 
              onClick={generateOctaveCombination} 
              className="w-full mb-4"
              data-testid="button-generate-octaves"
            >
              <Shuffle className="mr-2 h-4 w-4" />
              Generate Octave Combination
            </Button>
          </div>

          {octaveCombination.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-md font-semibold text-center">
                Octave Chord Pattern
              </h3>
              <div className="grid gap-3">
                {octaveCombination.map((chord, index) => {
                  const chordDiagram = getChordDiagram(normalizeChordName(chord.name));
                  return (
                    <Card key={index} className="p-3 border">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-indigo-500 text-white">
                          {chord.name}
                        </Badge>
                        <span className="text-xs font-medium">
                          Octave {chord.octave} - {chord.fretPosition}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {chord.notes.map((note, noteIndex) => (
                          <Badge 
                            key={noteIndex} 
                            variant="outline" 
                            className="text-xs"
                            data-testid={`octave-note-${index}-${noteIndex}`}
                          >
                            {note.replace(/[0-9]/g, '')}
                          </Badge>
                        ))}
                      </div>
                      
                      {/* Fretboard Visualization for this octave chord */}
                      <div className="mt-3">
                        <FretboardDisplay 
                          chordDiagram={chordDiagram} 
                          chordName={chord.name}
                          showLegend={index === 0}
                          label={`Play at ${chord.fretPosition}`}
                        />
                      </div>
                    </Card>
                  );
                })}
              </div>
              <Card className="p-3 bg-primary/5 border-primary/20">
                <h4 className="font-semibold text-sm mb-2">🎸 Playing Tip</h4>
                <p className="text-xs text-muted-foreground">
                  Play these chord positions in sequence to create rich harmonic textures. 
                  The octave variations add depth and movement to your progressions.
                </p>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="modes" className="space-y-4">
          <div className="text-center">
            <Button 
              onClick={generateRandomMode} 
              className="w-full mb-4"
              data-testid="button-generate-mode"
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Generate Random Mode
            </Button>
          </div>

          {selectedMode && (
            <div className="space-y-4">
              <h3 className="text-md font-semibold text-center">
                {modeRoot} {selectedMode.name} Mode
              </h3>
              
              {/* Mode Summary */}
              <Card className="p-4 border" style={{ borderColor: selectedMode.color }}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge 
                      className="text-white" 
                      style={{ backgroundColor: selectedMode.color }}
                    >
                      {selectedMode.quality.charAt(0).toUpperCase() + selectedMode.quality.slice(1)}
                    </Badge>
                    <span className="text-sm font-medium">
                      {selectedMode.parentMajor}° of Major Scale
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {selectedMode.description}
                  </p>
                  
                  {/* Mode Formula */}
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Degree Formula:</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedMode.degreeFormula.map((degree, index) => (
                        <Badge 
                          key={index}
                          variant={selectedMode.characteristicDegrees.includes(index + 1) ? "default" : "outline"}
                          className="text-xs"
                          data-testid={`mode-degree-${index}`}
                        >
                          {degree}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Mode Notes */}
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Mode Notes:</h4>
                    <div className="flex flex-wrap gap-1">
                      {modeNotes.map((note, index) => (
                        <Badge 
                          key={index} 
                          variant="outline" 
                          className="text-xs"
                          data-testid={`mode-note-${index}`}
                        >
                          {note}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Parent Major Info */}
                  <div className="text-xs text-muted-foreground bg-muted/30 p-2 rounded">
                    💡 <strong>Theory:</strong> {selectedMode.name} shares the same notes as the{' '}
                    {modeNotes[selectedMode.parentMajor - 1]} major scale, but starts from {modeRoot}.
                  </div>
                </div>
              </Card>
              
              {/* Related Scales */}
              {relatedScales.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold mb-3">Related In-Mode Scales:</h4>
                  <div className="grid gap-3">
                    {relatedScales.map((scale, index) => (
                      <Card key={index} className="p-3 border border-dashed">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="secondary">
                            {scale.root} {scale.mode.name}
                          </Badge>
                          <span className="text-xs text-muted-foreground capitalize">
                            {scale.mode.quality}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {scale.notes.map((note, noteIndex) => (
                            <Badge 
                              key={noteIndex} 
                              variant="outline" 
                              className="text-xs"
                              data-testid={`related-note-${index}-${noteIndex}`}
                            >
                              {note}
                            </Badge>
                          ))}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Mode Fretboard Visualization */}
              <FretboardVisualization 
                mode={{ mode: selectedMode, root: modeRoot, notes: modeNotes }}
                variant="mode"
              />
              
              <Card className="p-3 bg-primary/5 border-primary/20">
                <h4 className="font-semibold text-sm mb-2">🎵 Mode Practice Tip</h4>
                <p className="text-xs text-muted-foreground">
                  Focus on the characteristic degrees (highlighted) that give this mode its unique sound. 
                  Practice the related scales to build familiarity with the mode's harmonic possibilities.
                </p>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}