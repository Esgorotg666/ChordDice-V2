// Import complete chord library (480 chords)
import { type ChordDiagram, chordDiagrams } from './generated-chords';

// Re-export for backward compatibility
export type { ChordDiagram };
export { chordDiagrams };

// Type definitions
export type TappingVoicing = {
  baseChord: string;
  tapChord: string;
  baseDiagram: ChordDiagram;
  tapDiagram: ChordDiagram;
  description: string;
};

// Two-hand tapping combinations (base chord + tap chord)
export const tappingCombinations: Record<string, TappingVoicing> = {
  'Am_Cmaj7': {
    baseChord: 'Am',
    tapChord: 'Cmaj7',
    baseDiagram: { name: 'A Minor', positions: ['X', 0, 2, 2, 1, 0] },
    tapDiagram: { name: 'Cmaj7 (12th fret)', positions: ['X', 'X', 12, 12, 12, 15], fret: 12 },
    description: 'A minor base with Cmaj7 chord at 12th fret'
  },
  'E_Gmaj7': {
    baseChord: 'E',
    tapChord: 'Gmaj7',
    baseDiagram: { name: 'E Major', positions: [0, 2, 2, 1, 0, 0] },
    tapDiagram: { name: 'Gmaj7 (15th fret)', positions: ['X', 'X', 15, 16, 15, 17], fret: 15 },
    description: 'E major base with Gmaj7 voicing at 15th fret'
  },
  'Dm_Fmaj7': {
    baseChord: 'Dm',
    tapChord: 'Fmaj7',
    baseDiagram: { name: 'D Minor', positions: ['X', 'X', 0, 2, 3, 1] },
    tapDiagram: { name: 'Fmaj7 (13th fret)', positions: ['X', 'X', 13, 14, 13, 15], fret: 13 },
    description: 'D minor base with Fmaj7 chord at 13th fret'
  },
  'C_Em7': {
    baseChord: 'C',
    tapChord: 'Em7',
    baseDiagram: { name: 'C Major', positions: ['X', 3, 2, 0, 1, 0] },
    tapDiagram: { name: 'Em7 (12th fret)', positions: ['X', 'X', 12, 12, 12, 12], fret: 12 },
    description: 'C major base with Em7 voicing at 12th fret'
  },
  'G_Bm7': {
    baseChord: 'G',
    tapChord: 'Bm7',
    baseDiagram: { name: 'G Major', positions: [3, 2, 0, 0, 0, 3] },
    tapDiagram: { name: 'Bm7 (14th fret)', positions: ['X', 'X', 14, 14, 14, 14], fret: 14 },
    description: 'G major base with Bm7 chord at 14th fret'
  },
  'A_F#m7': {
    baseChord: 'A',
    tapChord: 'F#m7',
    baseDiagram: { name: 'A Major', positions: ['X', 0, 2, 2, 2, 0] },
    tapDiagram: { name: 'F#m7 (14th fret)', positions: ['X', 'X', 14, 14, 14, 17], fret: 14 },
    description: 'A major base with F#m7 chord at 14th fret'
  },
  'E_Dmaj9': {
    baseChord: 'E',
    tapChord: 'Dmaj9',
    baseDiagram: { name: 'E Major', positions: [0, 2, 2, 1, 0, 0] },
    tapDiagram: { name: 'Dmaj9 (10th fret)', positions: ['X', 'X', 10, 11, 10, 12], fret: 10 },
    description: 'E major base with Dmaj9 voicing at 10th fret'
  }
};

export const getTappingVoicing = (baseChord: string, tapChord: string): TappingVoicing | null => {
  const key = `${baseChord}_${tapChord}`;
  return tappingCombinations[key] || null;
};

export const getTappingCombinationsForChord = (baseChord: string): TappingVoicing[] => {
  return Object.values(tappingCombinations).filter(combo => combo.baseChord === baseChord);
};

// Chord types mapping (dice roll number to chord type) - balanced variety
export const exoticNumbers: Record<number, string> = {
  1: 'Major',
  2: 'Minor',
  3: '7th',
  4: 'Minor 7th',
  5: 'Major 7th',
  6: '6th',
  7: 'Suspended',
  8: 'Diminished'
};

// Chord types for the basic chord grid
export const chordTypes = [
  'Major',
  'Minor',
  '6th',
  '7th',
  '9th',
  'Minor 6th',
  'Minor 7th',
  'Major 7th',
  'Diminished',
  'Augmented',
  'Suspended'
];

// Exotic/Premium chord types
export const exoticChordTypes = [
  '11th',
  '13th',
  'Minor 9th',
  'Add9',
  '6/9',
  'Diminished 7th',
  'Half-diminished',
  'Augmented 7th'
];

// Color groups for chord grid (12 musical keys organized by groups)
// 8 groups to match 8-sided dice design
export const colorGroups = [
  { name: 'Purple', keys: ['E', 'F#', 'G#', 'A#'] },
  { name: 'Orange', keys: ['F', 'G', 'A', 'B'] },
  { name: 'Blue', keys: ['C', 'D', 'E♭', 'F#'] },
  { name: 'Green', keys: ['C#', 'D#', 'G', 'A'] },
  { name: 'Red', keys: ['D', 'E', 'F', 'G#'] },
  { name: 'Yellow', keys: ['A♭', 'B♭', 'C', 'D'] },
  { name: 'Pink', keys: ['C', 'E', 'G', 'B♭'] },
  { name: 'Teal', keys: ['C#', 'F', 'A', 'B'] }
];

// Get all musical keys
export const getAllKeys = (): string[] => {
  return musicalKeys;
};

// Chord diagrams are imported from generated-chords.ts (480 chords total)

// Musical Mode Definitions for advanced theory
export interface ModeDef {
  id: string;
  name: string;
  quality: 'major' | 'minor' | 'diminished';
  intervals: number[]; // Semitone intervals from root
  degreeFormula: string[]; // Scale degrees (1, 2, b3, etc.)
  characteristicDegrees: number[]; // Degrees that define the mode
  avoidDegrees?: number[]; // Degrees to avoid emphasizing
  preferredPentatonic: 'major' | 'minor';
  preferFlats?: boolean; // Prefer flat note spellings (for modes with flatted degrees)
  color: string; // For visualization
  description: string;
  parentMajor: number; // Which degree of major scale this mode starts from
}

// The 7 modes of the major scale
export const modes: ModeDef[] = [
  {
    id: 'ionian',
    name: 'Ionian',
    quality: 'major',
    intervals: [0, 2, 4, 5, 7, 9, 11],
    degreeFormula: ['1', '2', '3', '4', '5', '6', '7'],
    characteristicDegrees: [1, 3, 5],
    preferredPentatonic: 'major',
    color: 'rgb(59, 130, 246)', // Blue
    description: 'The major scale - bright and happy',
    parentMajor: 1
  },
  {
    id: 'dorian',
    name: 'Dorian',
    quality: 'minor',
    intervals: [0, 2, 3, 5, 7, 9, 10],
    degreeFormula: ['1', '2', '♭3', '4', '5', '6', '♭7'],
    characteristicDegrees: [6], // Natural 6th makes it distinctive
    preferredPentatonic: 'minor',
    preferFlats: true, // Has ♭3 and ♭7
    color: 'rgb(34, 197, 94)', // Green
    description: 'Minor with natural 6th - jazzy and sophisticated',
    parentMajor: 2
  },
  {
    id: 'phrygian',
    name: 'Phrygian',
    quality: 'minor',
    intervals: [0, 1, 3, 5, 7, 8, 10],
    degreeFormula: ['1', '♭2', '♭3', '4', '5', '♭6', '♭7'],
    characteristicDegrees: [2], // Flat 2nd creates Spanish/exotic sound
    preferredPentatonic: 'minor',
    preferFlats: true, // Has ♭2, ♭3, ♭6, ♭7
    color: 'rgb(168, 85, 247)', // Purple
    description: 'Dark and exotic - Spanish/Mediterranean flavor',
    parentMajor: 3
  },
  {
    id: 'lydian',
    name: 'Lydian',
    quality: 'major',
    intervals: [0, 2, 4, 6, 7, 9, 11],
    degreeFormula: ['1', '2', '3', '♯4', '5', '6', '7'],
    characteristicDegrees: [4], // Sharp 4th creates dreamy quality
    preferredPentatonic: 'major',
    color: 'rgb(249, 115, 22)', // Orange
    description: 'Major with sharp 4th - dreamy and floating',
    parentMajor: 4
  },
  {
    id: 'mixolydian',
    name: 'Mixolydian',
    quality: 'major',
    intervals: [0, 2, 4, 5, 7, 9, 10],
    degreeFormula: ['1', '2', '3', '4', '5', '6', '♭7'],
    characteristicDegrees: [7], // Flat 7th gives bluesy/rock feel
    preferredPentatonic: 'major',
    preferFlats: true, // Has ♭7
    color: 'rgb(239, 68, 68)', // Red
    description: 'Major with flat 7th - bluesy and dominant',
    parentMajor: 5
  },
  {
    id: 'aeolian',
    name: 'Aeolian',
    quality: 'minor',
    intervals: [0, 2, 3, 5, 7, 8, 10],
    degreeFormula: ['1', '2', '♭3', '4', '5', '♭6', '♭7'],
    characteristicDegrees: [3, 6, 7],
    preferredPentatonic: 'minor',
    preferFlats: true, // Has ♭3, ♭6, ♭7
    color: 'rgb(234, 179, 8)', // Yellow
    description: 'Natural minor - melancholic and emotional',
    parentMajor: 6
  },
  {
    id: 'locrian',
    name: 'Locrian',
    quality: 'diminished',
    intervals: [0, 1, 3, 5, 6, 8, 10],
    degreeFormula: ['1', '♭2', '♭3', '4', '♭5', '♭6', '♭7'],
    characteristicDegrees: [5], // Flat 5th creates unstable, tense sound
    avoidDegrees: [1], // Root lacks stability
    preferredPentatonic: 'minor',
    preferFlats: true, // Has ♭2, ♭3, ♭5, ♭6, ♭7
    color: 'rgb(107, 114, 128)', // Gray
    description: 'Most unstable mode - theoretical and rarely used melodically',
    parentMajor: 7
  }
];

// Chromatic note names with enharmonic equivalents
export const chromaticNotes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
export const chromaticNotesFlat = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

// Standard guitar tuning (low to high)
export const standardTuning = ['E', 'A', 'D', 'G', 'B', 'E'];

// Musical keys for dice generation (12 keys)
export const musicalKeys = ['A', 'B♭', 'B', 'C', 'C#', 'D', 'E♭', 'E', 'F', 'F#', 'G', 'A♭'];

// Helper function to get a mode by ID
export const getModeById = (id: string): ModeDef | undefined => {
  return modes.find(mode => mode.id === id);
};

// Helper function to transpose a note by semitones
export const transposeNote = (note: string, semitones: number, preferFlats: boolean = false): string => {
  const noteMap = preferFlats ? chromaticNotesFlat : chromaticNotes;
  
  // Extract root note from chord symbol (e.g., "Am7" -> "A", "C#" -> "C#", "Bb" -> "Bb")
  const rootMatch = note.match(/^([A-G][#b♭♯]?)/);
  if (!rootMatch) return note;
  
  const root = rootMatch[1]
    .replace('♭', 'b')
    .replace('♯', '#');
  
  // Find the note in either sharp or flat array
  let noteIndex = chromaticNotes.indexOf(root);
  if (noteIndex === -1) {
    noteIndex = chromaticNotesFlat.indexOf(root);
  }
  
  if (noteIndex === -1) return note;
  
  // Calculate new index
  const newIndex = (noteIndex + semitones + 12) % 12;
  
  return noteMap[newIndex];
};

// Generate scale from interval formula
export const generateScale = (root: string, intervals: number[], preferFlats: boolean = false): string[] => {
  return intervals.map(interval => transposeNote(root, interval, preferFlats));
};

// Comprehensive Scale Library
export interface ScaleDef {
  id: string;
  name: string;
  category: 'major' | 'minor' | 'pentatonic' | 'blues' | 'modal' | 'exotic';
  intervals: number[];
  degreeFormula: string[];
  description: string;
  preferFlats?: boolean;
  color: string;
}

// All scales for comprehensive reference
export const allScales: ScaleDef[] = [
  // Major Scales
  {
    id: 'major',
    name: 'Major Scale (Ionian)',
    category: 'major',
    intervals: [0, 2, 4, 5, 7, 9, 11],
    degreeFormula: ['1', '2', '3', '4', '5', '6', '7'],
    description: 'The major scale - bright and happy. Foundation of Western music.',
    color: 'rgb(59, 130, 246)'
  },
  
  // Minor Scales
  {
    id: 'natural_minor',
    name: 'Natural Minor Scale (Aeolian)',
    category: 'minor',
    intervals: [0, 2, 3, 5, 7, 8, 10],
    degreeFormula: ['1', '2', '♭3', '4', '5', '♭6', '♭7'],
    description: 'Natural minor - melancholic and emotional. Most common minor scale.',
    preferFlats: true,
    color: 'rgb(234, 179, 8)'
  },
  {
    id: 'harmonic_minor',
    name: 'Harmonic Minor Scale',
    category: 'minor',
    intervals: [0, 2, 3, 5, 7, 8, 11],
    degreeFormula: ['1', '2', '♭3', '4', '5', '♭6', '7'],
    description: 'Minor with raised 7th - exotic, classical sound. Creates tension and resolution.',
    preferFlats: true,
    color: 'rgb(147, 51, 234)'
  },
  {
    id: 'melodic_minor',
    name: 'Melodic Minor Scale',
    category: 'minor',
    intervals: [0, 2, 3, 5, 7, 9, 11],
    degreeFormula: ['1', '2', '♭3', '4', '5', '6', '7'],
    description: 'Minor with raised 6th and 7th - smooth ascending sound. Jazz favorite.',
    preferFlats: true,
    color: 'rgb(236, 72, 153)'
  },
  
  // Modes
  {
    id: 'dorian',
    name: 'Dorian Mode',
    category: 'modal',
    intervals: [0, 2, 3, 5, 7, 9, 10],
    degreeFormula: ['1', '2', '♭3', '4', '5', '6', '♭7'],
    description: 'Minor with natural 6th - jazzy and sophisticated. Common in rock and jazz.',
    preferFlats: true,
    color: 'rgb(34, 197, 94)'
  },
  {
    id: 'phrygian',
    name: 'Phrygian Mode',
    category: 'modal',
    intervals: [0, 1, 3, 5, 7, 8, 10],
    degreeFormula: ['1', '♭2', '♭3', '4', '5', '♭6', '♭7'],
    description: 'Dark and exotic - Spanish/Mediterranean flavor. Distinctive flat 2nd.',
    preferFlats: true,
    color: 'rgb(168, 85, 247)'
  },
  {
    id: 'lydian',
    name: 'Lydian Mode',
    category: 'modal',
    intervals: [0, 2, 4, 6, 7, 9, 11],
    degreeFormula: ['1', '2', '3', '♯4', '5', '6', '7'],
    description: 'Major with sharp 4th - dreamy and floating. Bright and uplifting.',
    color: 'rgb(249, 115, 22)'
  },
  {
    id: 'mixolydian',
    name: 'Mixolydian Mode',
    category: 'modal',
    intervals: [0, 2, 4, 5, 7, 9, 10],
    degreeFormula: ['1', '2', '3', '4', '5', '6', '♭7'],
    description: 'Major with flat 7th - bluesy and dominant. Rock and blues staple.',
    preferFlats: true,
    color: 'rgb(239, 68, 68)'
  },
  {
    id: 'locrian',
    name: 'Locrian Mode',
    category: 'modal',
    intervals: [0, 1, 3, 5, 6, 8, 10],
    degreeFormula: ['1', '♭2', '♭3', '4', '♭5', '♭6', '♭7'],
    description: 'Most unstable mode - theoretical and rarely used melodically. Diminished feel.',
    preferFlats: true,
    color: 'rgb(107, 114, 128)'
  },
  
  // Pentatonic Scales
  {
    id: 'pentatonic_major',
    name: 'Pentatonic Major Scale',
    category: 'pentatonic',
    intervals: [0, 2, 4, 7, 9],
    degreeFormula: ['1', '2', '3', '5', '6'],
    description: 'Bright, happy sound - used in country, rock, blues. Easy to improvise with.',
    color: 'rgb(34, 211, 238)'
  },
  {
    id: 'pentatonic_minor',
    name: 'Pentatonic Minor Scale',
    category: 'pentatonic',
    intervals: [0, 3, 5, 7, 10],
    degreeFormula: ['1', '♭3', '4', '5', '♭7'],
    description: 'Dark, bluesy sound - most common in rock and blues. Perfect for soloing.',
    preferFlats: true,
    color: 'rgb(251, 146, 60)'
  },
  
  // Blues
  {
    id: 'blues',
    name: 'Blues Scale',
    category: 'blues',
    intervals: [0, 3, 5, 6, 7, 10],
    degreeFormula: ['1', '♭3', '4', '♭5', '5', '♭7'],
    description: 'Minor pentatonic + blue note (♭5) - quintessential blues sound.',
    preferFlats: true,
    color: 'rgb(99, 102, 241)'
  },
  
  // Exotic Scales
  {
    id: 'whole_tone',
    name: 'Whole Tone Scale',
    category: 'exotic',
    intervals: [0, 2, 4, 6, 8, 10],
    degreeFormula: ['1', '2', '3', '♯4', '♯5', '♭7'],
    description: 'Symmetrical scale of whole steps - dreamy, ambiguous, impressionistic.',
    color: 'rgb(124, 58, 237)'
  },
  {
    id: 'diminished',
    name: 'Diminished Scale (Half-Whole)',
    category: 'exotic',
    intervals: [0, 1, 3, 4, 6, 7, 9, 10],
    degreeFormula: ['1', '♭2', '♭3', '3', '♯4', '5', '6', '♭7'],
    description: 'Alternating half and whole steps - tense, dissonant, jazz and metal.',
    preferFlats: true,
    color: 'rgb(190, 24, 93)'
  },
  {
    id: 'hirajoshi',
    name: 'Hirajoshi Scale',
    category: 'exotic',
    intervals: [0, 2, 3, 7, 8],
    degreeFormula: ['1', '2', '♭3', '5', '♭6'],
    description: 'Japanese pentatonic scale - mysterious, contemplative sound used in traditional and modern music.',
    preferFlats: true,
    color: 'rgb(236, 72, 153)'
  },
  {
    id: 'hungarian_minor',
    name: 'Hungarian Minor Scale',
    category: 'exotic',
    intervals: [0, 2, 3, 6, 7, 8, 11],
    degreeFormula: ['1', '2', '♭3', '♯4', '5', '♭6', '7'],
    description: 'Dark, exotic scale with augmented 2nd intervals - Eastern European, gypsy, and neo-classical metal.',
    preferFlats: true,
    color: 'rgb(147, 51, 234)'
  },
  {
    id: 'bebop_dominant',
    name: 'Bebop Dominant Scale',
    category: 'exotic',
    intervals: [0, 2, 4, 5, 7, 9, 10, 11],
    degreeFormula: ['1', '2', '3', '4', '5', '6', '♭7', '7'],
    description: 'Mixolydian + major 7th - essential jazz scale for smooth chromatic lines over dominant chords.',
    color: 'rgb(6, 182, 212)'
  },
  {
    id: 'double_harmonic_major',
    name: 'Double Harmonic Major Scale',
    category: 'exotic',
    intervals: [0, 1, 4, 5, 7, 8, 11],
    degreeFormula: ['1', '♭2', '3', '4', '5', '♭6', '7'],
    description: 'Byzantine/Arabic scale with two augmented 2nds - exotic, Middle Eastern, flamenco.',
    preferFlats: true,
    color: 'rgb(220, 38, 38)'
  },
  {
    id: 'acoustic',
    name: 'Acoustic Scale',
    category: 'exotic',
    intervals: [0, 2, 4, 6, 7, 9, 10],
    degreeFormula: ['1', '2', '3', '♯4', '5', '6', '♭7'],
    description: 'Lydian Dominant (Lydian ♯2) - bright, open sound derived from overtone series, fusion and jazz-rock.',
    color: 'rgb(251, 191, 36)'
  }
];

// Common pentatonic scales (kept for backward compatibility)
export const pentatonicScales = {
  major: {
    name: 'Major Pentatonic',
    intervals: [0, 2, 4, 7, 9], // 1, 2, 3, 5, 6
    description: 'Bright, happy sound - used in country, rock, blues'
  },
  minor: {
    name: 'Minor Pentatonic',
    intervals: [0, 3, 5, 7, 10], // 1, ♭3, 4, 5, ♭7
    description: 'Dark, bluesy sound - most common in rock and blues'
  },
  blues: {
    name: 'Blues Scale',
    intervals: [0, 3, 5, 6, 7, 10], // 1, ♭3, 4, ♭5, 5, ♭7
    description: 'Minor pentatonic + blue note (♭5) - quintessential blues sound'
  }
};

// Helper to get a scale by ID
export const getScaleById = (id: string): ScaleDef | undefined => {
  return allScales.find(scale => scale.id === id);
};

// Get chord diagram by chord symbol
export const getChordDiagram = (chordSymbol: string): ChordDiagram | null => {
  return chordDiagrams[chordSymbol] || null;
};

// Get all chord variations for a given root note
export const getChordsForRoot = (root: string): ChordDiagram[] => {
  const chords: ChordDiagram[] = [];
  Object.entries(chordDiagrams).forEach(([key, diagram]) => {
    if (key.startsWith(root) || key.startsWith(`${root}_`)) {
      chords.push(diagram);
    }
  });
  return chords;
};

// Alias for backward compatibility
export const NOTES = chromaticNotes;
export const buildScaleByIntervals = generateScale;

// Generate related scales for a mode
export interface RelatedScale {
  mode: ModeDef;
  root: string;
  notes: string[];
}

export const generateRelatedScales = (mode: ModeDef, root: string): RelatedScale[] => {
  const relatedScales: RelatedScale[] = [];
  const preferFlats = mode.preferFlats || false;
  
  // Generate the primary scale
  const notes = generateScale(root, mode.intervals, preferFlats);
  relatedScales.push({ mode, root, notes });
  
  return relatedScales;
};

// Get random compatible scales for a chord progression
export interface CompatibleScale {
  mode: ModeDef;
  root: string;
  notes: string[];
  matchScore: number;
}

export const getRandomCompatibleScales = (
  chordProgression: string[],
  count: number = 3
): CompatibleScale[] => {
  const compatibleScales: CompatibleScale[] = [];
  
  // For now, return a basic compatible scale based on the first chord
  if (chordProgression.length > 0) {
    const firstChord = chordProgression[0];
    const rootMatch = firstChord.match(/^([A-G][#b♭♯]?)/);
    if (rootMatch) {
      const root = rootMatch[1];
      
      // Determine if the chord is major or minor
      const isMinor = firstChord.includes('m') && !firstChord.includes('maj');
      const preferredMode = isMinor ? modes.find(m => m.id === 'aeolian') : modes.find(m => m.id === 'ionian');
      
      if (preferredMode) {
        const notes = generateScale(root, preferredMode.intervals, preferredMode.preferFlats);
        compatibleScales.push({
          mode: preferredMode,
          root,
          notes,
          matchScore: 1.0
        });
      }
      
      // Add additional compatible modes
      const additionalModes = isMinor 
        ? modes.filter(m => m.quality === 'minor' && m.id !== 'aeolian').slice(0, count - 1)
        : modes.filter(m => m.quality === 'major' && m.id !== 'ionian').slice(0, count - 1);
      
      additionalModes.forEach(mode => {
        const notes = generateScale(root, mode.intervals, mode.preferFlats);
        compatibleScales.push({
          mode,
          root,
          notes,
          matchScore: 0.8
        });
      });
    }
  }
  
  return compatibleScales.slice(0, count);
};

// Bridge Pattern System - Connects two chords with musical patterns
export type BridgePatternType = 'scale' | 'pentatonic' | 'chromatic' | 'arpeggio';

export interface BridgePattern {
  type: BridgePatternType;
  name: string;
  notes: string[];
  description: string;
  fretboardPattern?: string; // Optional fretboard pattern description
}

export const generateBridgePattern = (chord1: string, chord3: string): BridgePattern => {
  const patterns: BridgePattern[] = [];
  
  // Extract root notes from both chords
  const root1Match = chord1.match(/^([A-G][#b♭♯]?)/);
  const root3Match = chord3.match(/^([A-G][#b♭♯]?)/);
  
  if (!root1Match || !root3Match) {
    // Fallback: Chromatic pattern
    return {
      type: 'chromatic',
      name: 'Chromatic Bridge',
      notes: ['Chromatic notes'],
      description: 'Use chromatic notes to connect the chords'
    };
  }
  
  const root1 = root1Match[1].replace('♭', 'b').replace('♯', '#');
  const root3 = root3Match[1].replace('♭', 'b').replace('♯', '#');
  
  // Determine if chords are major or minor
  const isMinor1 = chord1.includes('m') && !chord1.includes('maj');
  const isMinor3 = chord3.includes('m') && !chord3.includes('maj');
  
  // Pattern 1: Compatible Scale - find a scale that works with both chords
  const compatibility = getRandomCompatibleScales([chord1, chord3], 1);
  if (compatibility.length > 0) {
    const scale = compatibility[0];
    patterns.push({
      type: 'scale',
      name: `${scale.root} ${scale.mode.name}`,
      notes: scale.notes,
      description: `${scale.mode.description}`,
      fretboardPattern: `Play ${scale.root} ${scale.mode.name} scale between chords`
    });
  }
  
  // Pattern 2: Pentatonic - most common and user-friendly
  const pentatonicType = (isMinor1 || isMinor3) ? 'minor' : 'major';
  const pentatonicRoot = root1; // Use first chord's root
  const pentatonicIntervals = pentatonicScales[pentatonicType].intervals;
  const pentatonicNotes = generateScale(pentatonicRoot, pentatonicIntervals);
  
  patterns.push({
    type: 'pentatonic',
    name: `${pentatonicRoot} ${pentatonicScales[pentatonicType].name}`,
    notes: pentatonicNotes,
    description: pentatonicScales[pentatonicType].description,
    fretboardPattern: `Box pattern at fret ${getNotePosition(pentatonicRoot)}`
  });
  
  // Pattern 3: Chromatic approach - always works
  patterns.push({
    type: 'chromatic',
    name: 'Chromatic Bridge',
    notes: [`${root1} → ${root3} (chromatic)`],
    description: 'Use chromatic notes (half-steps) to approach the next chord',
    fretboardPattern: 'Walk chromatically from one chord to the next'
  });
  
  // Pattern 4: Arpeggio - use notes from the chords
  patterns.push({
    type: 'arpeggio',
    name: `${chord1} / ${chord3} Arpeggios`,
    notes: [chord1, chord3],
    description: 'Play arpeggios of both chords to create melodic connection',
    fretboardPattern: 'Alternate notes from both chord shapes'
  });
  
  // Randomly select one of the patterns
  const randomIndex = Math.floor(Math.random() * patterns.length);
  return patterns[randomIndex];
};

// Helper: Get fret position for a note (simplified, just for reference)
const getNotePosition = (note: string): number => {
  const basePositions: Record<string, number> = {
    'A': 5, 'A#': 6, 'Bb': 6,
    'B': 7,
    'C': 8, 'C#': 9, 'Db': 9,
    'D': 10, 'D#': 11, 'Eb': 11,
    'E': 12,
    'F': 1, 'F#': 2, 'Gb': 2,
    'G': 3, 'G#': 4, 'Ab': 4
  };
  return basePositions[note] || 5;
};
