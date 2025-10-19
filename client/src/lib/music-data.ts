export interface ColorGroup {
  name: string;
  keys: string[];
  class: string;
}

export const colorGroups: ColorGroup[] = [
  // Major keys
  { name: 'Red', keys: ['A♭', 'A'], class: 'key-ab-a' },
  { name: 'Orange', keys: ['B♭', 'B'], class: 'key-bb-b' },
  { name: 'Yellow', keys: ['C', 'D♭'], class: 'key-c-db' },
  { name: 'Green', keys: ['D', 'E♭'], class: 'key-d-eb' },
  { name: 'Blue', keys: ['E', 'F'], class: 'key-e-f' },
  { name: 'Purple', keys: ['F♯', 'G'], class: 'key-fs-g' },
  // Minor keys - all 12 minor keys mapped to color groups
  { name: 'Dark Red', keys: ['A♭m', 'Am'], class: 'key-abm-am' },
  { name: 'Dark Orange', keys: ['B♭m', 'Bm'], class: 'key-bbm-bm' },
  { name: 'Dark Yellow', keys: ['Cm', 'D♭m'], class: 'key-cm-dbm' },
  { name: 'Dark Green', keys: ['Dm', 'E♭m'], class: 'key-dm-ebm' },
  { name: 'Dark Blue', keys: ['Em', 'Fm'], class: 'key-em-fm' },
  { name: 'Dark Purple', keys: ['F♯m', 'Gm'], class: 'key-fsm-gm' }
];

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

// Premium exotic chord types for advanced musicians
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

// Basic chord numbers (dice roll 1-8 on standard dice)
export const basicChordNumbers: Record<number, string> = {
  1: 'Major',
  2: 'Minor',
  3: '6th',
  4: '7th',
  5: '9th',
  6: 'Minor 6th',
  7: 'Minor 7th',
  8: 'Major 7th',
  9: 'Diminished',
  10: 'Augmented',
  11: 'Suspended'
};

// Exotic chord numbers (for premium exotic chord dice)
export const exoticNumbers: Record<number, string> = {
  1: '11th',
  2: '13th',
  3: 'Minor 9th',
  4: 'Add9',
  5: '6/9',
  6: 'Diminished 7th',
  7: 'Half-diminished',
  8: 'Augmented 7th',
  9: 'Major',  // Fallback
  10: 'Minor',  // Fallback
  11: 'Suspended'  // Fallback
};

export const getAllKeys = (): string[] => {
  return [
    'A♭', 'A', 'B♭', 'B', 'C', 'D♭', 'D', 'E♭', 'E', 'F', 'F♯', 'G',
    'A♭m', 'Am', 'B♭m', 'Bm', 'Cm', 'D♭m', 'Dm', 'E♭m', 'Em', 'Fm', 'F♯m', 'Gm'
  ];
};

export const pentatonicScale = [
  { degree: 1, name: 'Root', interval: 'Unison' },
  { degree: 2, name: 'Whole Step', interval: 'Major 2nd' },
  { degree: 3, name: 'Major 3rd', interval: 'Major 3rd' },
  { degree: 5, name: 'Perfect 5th', interval: 'Perfect 5th' },
  { degree: 6, name: 'Major 6th', interval: 'Major 6th' }
];

export interface ChordDiagram {
  name: string;
  positions: (number | 'X')[];  // 6 strings: E A D G B E (low to high)
  fingers?: number[];  // Finger positions (1-4)
  fret?: number;  // Starting fret for barre chords
}

export interface TappingVoicing {
  baseChord: string;  // Base chord name (e.g., 'C', 'Am')
  tapChord: string;   // Tapping chord name (e.g., 'Em', 'G')
  baseDiagram: ChordDiagram;
  tapDiagram: ChordDiagram;
  description?: string;
}

// Tapping combinations for two-hand technique
// Right hand plays full chord voicings in higher frets (7th-24th)
export const tappingCombinations: Record<string, TappingVoicing> = {
  'C_Am7': {
    baseChord: 'C',
    tapChord: 'Am7',
    baseDiagram: { name: 'C Major', positions: ['X', 3, 2, 0, 1, 0], fingers: [0, 3, 2, 0, 1, 0] },
    tapDiagram: { name: 'Am7 (12th fret)', positions: ['X', 12, 12, 12, 13, 12], fingers: [0, 1, 1, 1, 2, 1], fret: 12 },
    description: 'C major base with Am7 chord shape at 12th fret'
  },
  'Am_Gmaj9': {
    baseChord: 'Am',
    tapChord: 'Gmaj9',
    baseDiagram: { name: 'A Minor', positions: ['X', 0, 2, 2, 1, 0], fingers: [0, 0, 2, 3, 1, 0] },
    tapDiagram: { name: 'Gmaj9 (10th fret)', positions: ['X', 'X', 9, 11, 10, 10], fingers: [0, 0, 1, 4, 2, 3], fret: 9 },
    description: 'A minor base with Gmaj9 voicing at 10th fret'
  },
  'G_Dm7': {
    baseChord: 'G',
    tapChord: 'Dm7',
    baseDiagram: { name: 'G Major', positions: [3, 2, 0, 0, 3, 3], fingers: [3, 2, 0, 0, 4, 4] },
    tapDiagram: { name: 'Dm7 (10th fret)', positions: ['X', 'X', 10, 10, 10, 13], fingers: [0, 0, 1, 1, 1, 4], fret: 10 },
    description: 'G major base with Dm7 chord at 10th fret'
  },
  'D_Bm7': {
    baseChord: 'D',
    tapChord: 'Bm7',
    baseDiagram: { name: 'D Major', positions: ['X', 'X', 0, 2, 3, 2], fingers: [0, 0, 0, 1, 3, 2] },
    tapDiagram: { name: 'Bm7 (7th fret)', positions: ['X', 'X', 'X', 7, 7, 10], fingers: [0, 0, 0, 1, 1, 4], fret: 7 },
    description: 'D major base with Bm7 voicing at 7th fret'
  },
  'Em_Cmaj7': {
    baseChord: 'Em',
    tapChord: 'Cmaj7',
    baseDiagram: { name: 'E Minor', positions: [0, 2, 2, 0, 0, 0], fingers: [0, 2, 3, 0, 0, 0] },
    tapDiagram: { name: 'Cmaj7 (8th fret)', positions: ['X', 'X', 'X', 9, 10, 12], fingers: [0, 0, 0, 1, 2, 4], fret: 8 },
    description: 'E minor base with Cmaj7 chord at 8th fret'
  },
  'F_Em9': {
    baseChord: 'F',
    tapChord: 'Em9',
    baseDiagram: { name: 'F Major', positions: [1, 3, 3, 2, 1, 1], fingers: [1, 3, 4, 2, 1, 1] },
    tapDiagram: { name: 'Em9 (12th fret)', positions: ['X', 'X', 12, 12, 12, 15], fingers: [0, 0, 1, 1, 1, 4], fret: 12 },
    description: 'F major base with Em9 voicing at 12th fret'
  },
  'A_F#m7': {
    baseChord: 'A',
    tapChord: 'F#m7',
    baseDiagram: { name: 'A Major', positions: ['X', 0, 2, 2, 2, 0], fingers: [0, 0, 1, 2, 3, 0] },
    tapDiagram: { name: 'F#m7 (14th fret)', positions: ['X', 'X', 14, 14, 14, 17], fingers: [0, 0, 1, 1, 1, 4], fret: 14 },
    description: 'A major base with F#m7 chord at 14th fret'
  },
  'E_Dmaj9': {
    baseChord: 'E',
    tapChord: 'Dmaj9',
    baseDiagram: { name: 'E Major', positions: [0, 2, 2, 1, 0, 0], fingers: [0, 2, 3, 1, 0, 0] },
    tapDiagram: { name: 'Dmaj9 (10th fret)', positions: ['X', 'X', 10, 11, 10, 12], fingers: [0, 0, 1, 3, 1, 4], fret: 10 },
    description: 'E major base with Dmaj9 voicing at 10th fret'
  }
};

// Get tapping voicing by chord pair
export const getTappingVoicing = (baseChord: string, tapChord: string): TappingVoicing | null => {
  const key = `${baseChord}_${tapChord}`;
  return tappingCombinations[key] || null;
};

// Get all available tapping combinations for a given base chord
export const getTappingCombinationsForChord = (baseChord: string): TappingVoicing[] => {
  return Object.values(tappingCombinations).filter(combo => combo.baseChord === baseChord);
};

// Common guitar chord diagrams
export const chordDiagrams: Record<string, ChordDiagram> = {
  // Major chords
  'C': { name: 'C Major', positions: ['X', 3, 2, 0, 1, 0], fingers: [0, 3, 2, 0, 1, 0] },
  'D': { name: 'D Major', positions: ['X', 'X', 0, 2, 3, 2], fingers: [0, 0, 0, 1, 3, 2] },
  'E': { name: 'E Major', positions: [0, 2, 2, 1, 0, 0], fingers: [0, 2, 3, 1, 0, 0] },
  'F': { name: 'F Major', positions: [1, 3, 3, 2, 1, 1], fingers: [1, 3, 4, 2, 1, 1], fret: 1 },
  'G': { name: 'G Major', positions: [3, 2, 0, 0, 0, 3], fingers: [3, 2, 0, 0, 0, 4] },
  'A': { name: 'A Major', positions: ['X', 0, 2, 2, 2, 0], fingers: [0, 0, 1, 2, 3, 0] },
  'B': { name: 'B Major', positions: ['X', 2, 4, 4, 4, 2], fingers: [0, 1, 3, 3, 3, 1] },

  // Minor chords  
  'Am': { name: 'A Minor', positions: ['X', 0, 2, 2, 1, 0], fingers: [0, 0, 2, 3, 1, 0] },
  'Bm': { name: 'B Minor', positions: ['X', 2, 4, 4, 3, 2], fingers: [0, 1, 3, 4, 2, 1] },
  'Cm': { name: 'C Minor', positions: ['X', 3, 5, 5, 4, 3], fingers: [0, 1, 3, 4, 2, 1] },
  'Dm': { name: 'D Minor', positions: ['X', 'X', 0, 2, 3, 1], fingers: [0, 0, 0, 2, 3, 1] },
  'Em': { name: 'E Minor', positions: [0, 2, 2, 0, 0, 0], fingers: [0, 2, 3, 0, 0, 0] },
  'Fm': { name: 'F Minor', positions: [1, 3, 3, 1, 1, 1], fingers: [1, 3, 4, 1, 1, 1], fret: 1 },
  'Gm': { name: 'G Minor', positions: [3, 5, 5, 3, 3, 3], fingers: [1, 3, 4, 1, 1, 1], fret: 3 },

  // 7th chords - Dominant
  'A7': { name: 'A Dominant 7', positions: ['X', 0, 2, 0, 2, 0], fingers: [0, 0, 2, 0, 3, 0] },
  'B7': { name: 'B Dominant 7', positions: ['X', 2, 4, 2, 4, 2], fingers: [0, 1, 3, 1, 4, 1] },
  'C7': { name: 'C Dominant 7', positions: ['X', 3, 2, 3, 1, 0], fingers: [0, 3, 2, 4, 1, 0] },
  'D7': { name: 'D Dominant 7', positions: ['X', 'X', 0, 2, 1, 2], fingers: [0, 0, 0, 2, 1, 3] },
  'E7': { name: 'E Dominant 7', positions: [0, 2, 0, 1, 0, 0], fingers: [0, 2, 0, 1, 0, 0] },
  'F7': { name: 'F Dominant 7', positions: [1, 3, 1, 2, 1, 1], fingers: [1, 3, 1, 2, 1, 1], fret: 1 },
  'G7': { name: 'G Dominant 7', positions: [3, 2, 0, 0, 0, 1], fingers: [3, 2, 0, 0, 0, 1] },

  // Major 7th chords
  'AM7': { name: 'A Major 7', positions: ['X', 0, 2, 1, 2, 0], fingers: [0, 0, 2, 1, 3, 0] },
  'BM7': { name: 'B Major 7', positions: ['X', 2, 4, 3, 4, 2], fingers: [0, 1, 3, 2, 4, 1] },
  'CM7': { name: 'C Major 7', positions: ['X', 3, 2, 0, 0, 0], fingers: [0, 3, 2, 0, 0, 0] },
  'DM7': { name: 'D Major 7', positions: ['X', 'X', 0, 2, 2, 2], fingers: [0, 0, 0, 1, 2, 3] },
  'EM7': { name: 'E Major 7', positions: [0, 2, 1, 1, 0, 0], fingers: [0, 2, 1, 1, 0, 0] },
  'FM7': { name: 'F Major 7', positions: [1, 3, 2, 2, 1, 1], fingers: [1, 4, 2, 3, 1, 1], fret: 1 },
  'GM7': { name: 'G Major 7', positions: [3, 2, 0, 0, 0, 2], fingers: [3, 2, 0, 0, 0, 1] },

  // Minor 7th chords
  'Am7': { name: 'A Minor 7', positions: ['X', 0, 2, 0, 1, 0], fingers: [0, 0, 2, 0, 1, 0] },
  'Bm7': { name: 'B Minor 7', positions: ['X', 2, 4, 2, 3, 2], fingers: [0, 1, 3, 1, 2, 1] },
  'Cm7': { name: 'C Minor 7', positions: ['X', 3, 5, 3, 4, 3], fingers: [0, 1, 3, 1, 2, 1] },
  'Dm7': { name: 'D Minor 7', positions: ['X', 'X', 0, 2, 1, 1], fingers: [0, 0, 0, 2, 1, 1] },
  'Em7': { name: 'E Minor 7', positions: [0, 2, 0, 0, 0, 0], fingers: [0, 2, 0, 0, 0, 0] },
  'Fm7': { name: 'F Minor 7', positions: [1, 3, 1, 1, 1, 1], fingers: [1, 3, 1, 1, 1, 1], fret: 1 },
  'Gm7': { name: 'G Minor 7', positions: [3, 5, 3, 3, 3, 3], fingers: [1, 3, 1, 1, 1, 1], fret: 3 },

  // Suspended chords
  'Asus': { name: 'A Suspended', positions: ['X', 0, 2, 2, 3, 0], fingers: [0, 0, 1, 2, 3, 0] },
  'Bsus': { name: 'B Suspended 4th', positions: ['X', 2, 4, 4, 5, 2], fingers: [0, 1, 2, 3, 4, 1] },
  'Csus': { name: 'C Suspended 4th', positions: ['X', 3, 3, 0, 1, 1], fingers: [0, 2, 3, 0, 1, 1] },
  'Dsus': { name: 'D Suspended 4th', positions: ['X', 'X', 0, 2, 3, 3], fingers: [0, 0, 0, 1, 2, 3] },
  'Esus': { name: 'E Suspended', positions: [0, 2, 2, 2, 0, 0], fingers: [0, 1, 1, 1, 0, 0] },
  'Fsus': { name: 'F Suspended 4th', positions: [1, 3, 3, 3, 1, 1], fingers: [1, 2, 3, 4, 1, 1], fret: 1 },
  'Gsus': { name: 'G Suspended 4th', positions: [3, 3, 0, 0, 1, 3], fingers: [3, 4, 0, 0, 1, 2] },

  // Sharp/Flat root variants
  'F#': { name: 'F# Major', positions: [2, 4, 4, 3, 2, 2], fingers: [1, 3, 4, 2, 1, 1], fret: 2 },
  'F#m': { name: 'F# Minor', positions: [2, 4, 4, 2, 2, 2], fingers: [1, 3, 4, 1, 1, 1], fret: 2 },
  'Bb': { name: 'Bb Major', positions: ['X', 1, 3, 3, 3, 1], fingers: [0, 1, 2, 3, 4, 1], fret: 1 },
  'Bbm': { name: 'Bb Minor', positions: ['X', 1, 3, 3, 2, 1], fingers: [0, 1, 3, 4, 2, 1], fret: 1 },
  'C#': { name: 'C# Major', positions: ['X', 4, 6, 6, 6, 4], fingers: [0, 1, 2, 3, 4, 1], fret: 4 },
  'C#m': { name: 'C# Minor', positions: ['X', 4, 6, 6, 5, 4], fingers: [0, 1, 3, 4, 2, 1], fret: 4 },
  'Eb': { name: 'Eb Major', positions: ['X', 'X', 1, 3, 4, 3], fingers: [0, 0, 1, 2, 4, 3] },
  'Ebm': { name: 'Eb Minor', positions: ['X', 'X', 1, 3, 4, 2], fingers: [0, 0, 1, 3, 4, 2] },
  'Ab': { name: 'Ab Major', positions: [4, 6, 6, 5, 4, 4], fingers: [1, 3, 4, 2, 1, 1], fret: 4 },
  'Abm': { name: 'Ab Minor', positions: [4, 6, 6, 4, 4, 4], fingers: [1, 3, 4, 1, 1, 1], fret: 4 },
  'Db': { name: 'Db Major', positions: ['X', 4, 6, 6, 6, 4], fingers: [0, 1, 3, 4, 4, 1], fret: 4 },
  'Dbm': { name: 'Db Minor', positions: ['X', 4, 6, 6, 5, 4], fingers: [0, 1, 3, 4, 2, 1], fret: 4 },
  'Gb': { name: 'Gb Major', positions: [2, 4, 4, 3, 2, 2], fingers: [1, 3, 4, 2, 1, 1], fret: 2 },
  'Gbm': { name: 'Gb Minor', positions: [2, 4, 4, 2, 2, 2], fingers: [1, 3, 4, 1, 1, 1], fret: 2 },

  // 9th chords
  'A9': { name: 'A Dominant 9', positions: ['X', 0, 2, 4, 2, 3], fingers: [0, 0, 1, 3, 2, 4] },
  'B9': { name: 'B Dominant 9', positions: ['X', 2, 4, 2, 2, 2], fingers: [0, 1, 4, 2, 2, 2] },
  'C9': { name: 'C Dominant 9', positions: ['X', 3, 2, 3, 3, 0], fingers: [0, 2, 1, 3, 4, 0] },
  'D9': { name: 'D Dominant 9', positions: ['X', 'X', 0, 2, 1, 0], fingers: [0, 0, 0, 2, 1, 0] },
  'E9': { name: 'E Dominant 9', positions: [0, 2, 0, 1, 0, 2], fingers: [0, 2, 0, 1, 0, 3] },
  'F9': { name: 'F Dominant 9', positions: [1, 3, 1, 2, 1, 3], fingers: [1, 3, 1, 2, 1, 4], fret: 1 },
  'G9': { name: 'G Dominant 9', positions: [3, 'X', 0, 2, 0, 1], fingers: [3, 0, 0, 2, 0, 1] },

  // 6th chords
  'A6': { name: 'A Major 6th', positions: ['X', 0, 2, 2, 2, 2], fingers: [0, 0, 1, 1, 1, 1] },
  'B6': { name: 'B Major 6th', positions: ['X', 2, 4, 4, 4, 4], fingers: [0, 1, 2, 3, 3, 3] },
  'C6': { name: 'C Major 6th', positions: ['X', 3, 2, 2, 1, 0], fingers: [0, 3, 2, 2, 1, 0] },
  'D6': { name: 'D Major 6th', positions: ['X', 'X', 0, 2, 0, 2], fingers: [0, 0, 0, 2, 0, 3] },
  'E6': { name: 'E Major 6th', positions: [0, 2, 2, 1, 2, 0], fingers: [0, 2, 3, 1, 4, 0] },
  'F6': { name: 'F Major 6th', positions: [1, 3, 3, 2, 3, 1], fingers: [1, 2, 3, 1, 4, 1], fret: 1 },
  'G6': { name: 'G Major 6th', positions: [3, 2, 0, 0, 0, 0], fingers: [3, 2, 0, 0, 0, 0] },

  // Minor 6th chords  
  'Am6': { name: 'A Minor 6th', positions: ['X', 0, 2, 2, 1, 2], fingers: [0, 0, 2, 3, 1, 4] },
  'Bm6': { name: 'B Minor 6th', positions: ['X', 2, 4, 4, 3, 4], fingers: [0, 1, 2, 3, 1, 4] },
  'Cm6': { name: 'C Minor 6th', positions: ['X', 3, 5, 0, 4, 5], fingers: [0, 1, 3, 0, 2, 4] },
  'Dm6': { name: 'D Minor 6th', positions: ['X', 'X', 0, 2, 0, 1], fingers: [0, 0, 0, 2, 0, 1] },
  'Em6': { name: 'E Minor 6th', positions: [0, 2, 2, 0, 2, 0], fingers: [0, 1, 2, 0, 3, 0] },
  'Fm6': { name: 'F Minor 6th', positions: [1, 3, 3, 1, 3, 1], fingers: [1, 2, 3, 1, 4, 1], fret: 1 },
  'Gm6': { name: 'G Minor 6th', positions: [3, 5, 5, 3, 5, 3], fingers: [1, 2, 3, 1, 4, 1], fret: 3 },

  // Diminished chords
  'A°': { name: 'A Diminished', positions: ['X', 0, 2, 3, 2, 3], fingers: [0, 0, 1, 3, 2, 4] },
  'B°': { name: 'B Diminished', positions: ['X', 2, 3, 4, 3, 'X'], fingers: [0, 1, 2, 4, 3, 0] },
  'C°': { name: 'C Diminished', positions: ['X', 3, 4, 5, 4, 'X'], fingers: [0, 1, 2, 4, 3, 0] },
  'D°': { name: 'D Diminished', positions: ['X', 'X', 0, 1, 3, 1], fingers: [0, 0, 0, 1, 3, 2] },
  'E°': { name: 'E Diminished', positions: ['X', 'X', 2, 3, 2, 3], fingers: [0, 0, 1, 3, 2, 4] },
  'F°': { name: 'F Diminished', positions: [1, 2, 3, 1, 3, 'X'], fingers: [1, 2, 4, 1, 3, 0], fret: 1 },
  'G°': { name: 'G Diminished', positions: [3, 'X', 2, 3, 2, 'X'], fingers: [3, 0, 1, 4, 2, 0] },

  // Augmented chords  
  'A+': { name: 'A Augmented', positions: ['X', 0, 3, 2, 2, 1], fingers: [0, 0, 4, 2, 3, 1] },
  'B+': { name: 'B Augmented', positions: [3, 2, 1, 0, 0, 3], fingers: [4, 3, 2, 0, 0, 1] },
  'C+': { name: 'C Augmented', positions: ['X', 3, 2, 1, 1, 0], fingers: [0, 4, 3, 1, 2, 0] },
  'D+': { name: 'D Augmented', positions: ['X', 'X', 0, 3, 3, 2], fingers: [0, 0, 0, 2, 3, 1] },
  'E+': { name: 'E Augmented', positions: [0, 3, 2, 1, 1, 0], fingers: [0, 4, 3, 1, 2, 0] },
  'F+': { name: 'F Augmented', positions: [1, 0, 3, 2, 2, 1], fingers: [1, 0, 4, 2, 3, 1], fret: 1 },
  'G+': { name: 'G Augmented', positions: [3, 2, 1, 0, 0, 3], fingers: [4, 3, 2, 0, 0, 1] },
  
  // Add9 chords
  'Aadd9': { name: 'A Add9', positions: ['X', 0, 2, 4, 2, 0], fingers: [0, 0, 1, 3, 2, 0] },
  'Badd9': { name: 'B Add9', positions: ['X', 2, 4, 6, 4, 2], fingers: [0, 1, 2, 4, 3, 1] },
  'Cadd9': { name: 'C Add9', positions: ['X', 3, 2, 0, 3, 0], fingers: [0, 2, 1, 0, 3, 0] },
  'Dadd9': { name: 'D Add9', positions: ['X', 'X', 0, 4, 3, 2], fingers: [0, 0, 0, 3, 2, 1] },
  'Eadd9': { name: 'E Add9', positions: [0, 2, 4, 1, 0, 0], fingers: [0, 2, 4, 1, 0, 0] },
  'Fadd9': { name: 'F Add9', positions: [1, 0, 3, 2, 1, 3], fingers: [1, 0, 3, 2, 1, 4], fret: 1 },
  'Gadd9': { name: 'G Add9', positions: [3, 2, 0, 2, 0, 3], fingers: [3, 2, 0, 1, 0, 4] },
  
  // Suspended 2nd chords
  'Asus2': { name: 'A Suspended 2nd', positions: ['X', 0, 2, 2, 0, 0], fingers: [0, 0, 1, 2, 0, 0] },
  'Bsus2': { name: 'B Suspended 2nd', positions: ['X', 2, 4, 4, 2, 2], fingers: [0, 1, 3, 4, 1, 1] },
  'Csus2': { name: 'C Suspended 2nd', positions: ['X', 3, 0, 0, 1, 0], fingers: [0, 3, 0, 0, 1, 0] },
  'Dsus2': { name: 'D Suspended 2nd', positions: ['X', 'X', 0, 2, 3, 0], fingers: [0, 0, 0, 1, 2, 0] },
  'Esus2': { name: 'E Suspended 2nd', positions: [0, 0, 2, 2, 0, 0], fingers: [0, 0, 1, 2, 0, 0] },
  'Fsus2': { name: 'F Suspended 2nd', positions: [1, 0, 3, 0, 1, 1], fingers: [1, 0, 3, 0, 1, 1], fret: 1 },
  'Gsus2': { name: 'G Suspended 2nd', positions: [3, 0, 0, 0, 3, 3], fingers: [2, 0, 0, 0, 3, 4] },
  
  // Diminished 7th chords
  'A°7': { name: 'A Diminished 7th', positions: ['X', 0, 1, 2, 1, 2], fingers: [0, 0, 1, 3, 2, 4] },
  'B°7': { name: 'B Diminished 7th', positions: ['X', 2, 3, 1, 3, 1], fingers: [0, 2, 3, 1, 4, 1] },
  'C°7': { name: 'C Diminished 7th', positions: ['X', 3, 4, 2, 4, 'X'], fingers: [0, 2, 4, 1, 3, 0] },
  'D°7': { name: 'D Diminished 7th', positions: ['X', 'X', 0, 1, 0, 1], fingers: [0, 0, 0, 1, 0, 2] },
  'E°7': { name: 'E Diminished 7th', positions: [0, 1, 2, 0, 2, 0], fingers: [0, 1, 3, 0, 4, 0] },
  'F°7': { name: 'F Diminished 7th', positions: [1, 2, 0, 1, 0, 1], fingers: [2, 3, 0, 1, 0, 1], fret: 1 },
  'G°7': { name: 'G Diminished 7th', positions: [3, 'X', 2, 3, 2, 1], fingers: [4, 0, 2, 3, 2, 1] },
  
  // Minor Major 7th chords
  'AmM7': { name: 'A Minor Major 7th', positions: ['X', 0, 2, 1, 1, 0], fingers: [0, 0, 2, 1, 1, 0] },
  'BmM7': { name: 'B Minor Major 7th', positions: ['X', 2, 4, 3, 3, 'X'], fingers: [0, 1, 4, 2, 3, 0] },
  'CmM7': { name: 'C Minor Major 7th', positions: ['X', 3, 5, 4, 4, 3], fingers: [0, 1, 4, 2, 3, 1] },
  'DmM7': { name: 'D Minor Major 7th', positions: ['X', 'X', 0, 2, 2, 1], fingers: [0, 0, 0, 2, 3, 1] },
  'EmM7': { name: 'E Minor Major 7th', positions: [0, 2, 1, 0, 0, 0], fingers: [0, 2, 1, 0, 0, 0] },
  'FmM7': { name: 'F Minor Major 7th', positions: [1, 3, 2, 1, 1, 1], fingers: [1, 4, 2, 1, 1, 1], fret: 1 },
  'GmM7': { name: 'G Minor Major 7th', positions: [3, 5, 4, 3, 3, 3], fingers: [1, 4, 2, 1, 1, 1], fret: 3 },
  
  // 7#9 chords
  'A7#9': { name: 'A Dominant 7#9', positions: ['X', 0, 2, 3, 2, 5], fingers: [0, 0, 1, 2, 1, 4] },
  'B7#9': { name: 'B Dominant 7#9', positions: ['X', 2, 4, 2, 4, 5], fingers: [0, 1, 3, 1, 4, 2] },
  'C7#9': { name: 'C Dominant 7#9', positions: ['X', 3, 2, 3, 4, 'X'], fingers: [0, 2, 1, 3, 4, 0] },
  'D7#9': { name: 'D Dominant 7#9', positions: ['X', 'X', 0, 2, 1, 3], fingers: [0, 0, 0, 2, 1, 4] },
  'E7#9': { name: 'E Dominant 7#9', positions: ['X', 'X', 2, 4, 3, 5], fingers: [0, 0, 1, 3, 2, 4] },
  'F7#9': { name: 'F Dominant 7#9', positions: [1, 3, 1, 2, 1, 4], fingers: [1, 3, 1, 2, 1, 4], fret: 1 },
  'G7#9': { name: 'G Dominant 7#9', positions: [3, 'X', 3, 4, 4, 'X'], fingers: [1, 0, 2, 3, 4, 0] },
  
  // E Barre chords (7th fret position)
  'E_barre': { name: 'E Major (Barre)', positions: ['X', 7, 9, 9, 9, 7], fingers: [0, 1, 3, 3, 3, 1], fret: 7 },
  'Em_barre': { name: 'E Minor (Barre)', positions: ['X', 7, 9, 9, 8, 7], fingers: [0, 1, 3, 4, 2, 1], fret: 7 },
  'E7_barre': { name: 'E Dominant 7th (Barre)', positions: ['X', 7, 9, 7, 9, 7], fingers: [0, 1, 3, 1, 4, 1], fret: 7 },
  'Em7_barre': { name: 'E Minor 7th (Barre)', positions: ['X', 7, 9, 7, 8, 7], fingers: [0, 1, 3, 1, 2, 1], fret: 7 },
  'EM7_barre': { name: 'E Major 7th (Barre)', positions: ['X', 7, 9, 8, 9, 7], fingers: [0, 1, 3, 2, 4, 1], fret: 7 },
  'Esus_barre': { name: 'E Suspended 4th (Barre)', positions: ['X', 7, 9, 9, 10, 7], fingers: [0, 1, 2, 3, 4, 1], fret: 7 },
  'E+_barre': { name: 'E Augmented (Barre)', positions: ['X', 7, 6, 5, 5, 'X'], fingers: [0, 4, 3, 1, 2, 0], fret: 5 },
  'E°_barre': { name: 'E Diminished (Barre)', positions: ['X', 7, 8, 6, 8, 'X'], fingers: [0, 2, 4, 1, 3, 0], fret: 6 },
  'Eadd9_barre': { name: 'E Add9 (Barre)', positions: ['X', 7, 9, 9, 10, 9], fingers: [0, 1, 2, 3, 4, 2], fret: 7 },
  
  // A Barre chords (5th fret position)
  'A_barre': { name: 'A Major (Barre)', positions: [5, 7, 7, 6, 5, 5], fingers: [1, 3, 4, 2, 1, 1], fret: 5 },
  'Am_barre': { name: 'A Minor (Barre)', positions: [5, 7, 7, 5, 5, 5], fingers: [1, 3, 4, 1, 1, 1], fret: 5 },
  'A7_barre': { name: 'A Dominant 7th (Barre)', positions: [5, 7, 5, 6, 5, 5], fingers: [1, 3, 1, 2, 1, 1], fret: 5 },
  'Am7_barre': { name: 'A Minor 7th (Barre)', positions: [5, 7, 5, 5, 5, 5], fingers: [1, 3, 1, 1, 1, 1], fret: 5 },
  'AM7_barre': { name: 'A Major 7th (Barre)', positions: [5, 7, 6, 6, 5, 5], fingers: [1, 4, 2, 3, 1, 1], fret: 5 },
  'Asus_barre': { name: 'A Suspended 4th (Barre)', positions: [5, 7, 7, 7, 5, 5], fingers: [1, 2, 3, 4, 1, 1], fret: 5 },
  'A+_barre': { name: 'A Augmented (Barre)', positions: ['X', 7, 6, 6, 6, 5], fingers: [0, 4, 2, 2, 3, 1], fret: 5 },
  'A°_barre': { name: 'A Diminished (Barre)', positions: ['X', 7, 5, 6, 5, 6], fingers: [0, 4, 1, 3, 1, 2], fret: 5 },
  'Aadd9_barre': { name: 'A Add9 (Barre)', positions: [5, 7, 5, 6, 5, 7], fingers: [1, 3, 1, 2, 1, 4], fret: 5 },
  
  // B Barre chords (7th fret position)
  'B_barre': { name: 'B Major (Barre)', positions: [7, 9, 9, 8, 7, 7], fingers: [1, 3, 4, 2, 1, 1], fret: 7 },
  'Bm_barre': { name: 'B Minor (Barre)', positions: [7, 9, 9, 7, 7, 7], fingers: [1, 3, 4, 1, 1, 1], fret: 7 },
  'B7_barre': { name: 'B Dominant 7th (Barre)', positions: [7, 9, 7, 8, 7, 7], fingers: [1, 3, 1, 2, 1, 1], fret: 7 },
  'Bm7_barre': { name: 'B Minor 7th (Barre)', positions: [7, 9, 7, 7, 7, 7], fingers: [1, 3, 1, 1, 1, 1], fret: 7 },
  'BM7_barre': { name: 'B Major 7th (Barre)', positions: [7, 9, 8, 8, 7, 7], fingers: [1, 4, 2, 3, 1, 1], fret: 7 },
  'Bsus_barre': { name: 'B Suspended 4th (Barre)', positions: [7, 9, 9, 9, 7, 7], fingers: [1, 2, 3, 4, 1, 1], fret: 7 },
  'B+_barre': { name: 'B Augmented (Barre)', positions: [8, 7, 6, 6, 6, 'X'], fingers: [4, 3, 1, 1, 2, 0], fret: 6 },
  'B°_barre': { name: 'B Diminished (Barre)', positions: [7, 8, 6, 7, 6, 'X'], fingers: [2, 4, 1, 3, 1, 0], fret: 6 },
  'Badd9_barre': { name: 'B Add9 (Barre)', positions: [7, 9, 7, 8, 7, 9], fingers: [1, 3, 1, 2, 1, 4], fret: 7 },
  
  // C Barre chords (8th fret position)
  'C_barre': { name: 'C Major (Barre)', positions: [8, 10, 10, 9, 8, 8], fingers: [1, 3, 4, 2, 1, 1], fret: 8 },
  'Cm_barre': { name: 'C Minor (Barre)', positions: [3, 5, 5, 3, 3, 3], fingers: [1, 3, 4, 1, 1, 1], fret: 3 },
  'C7_barre': { name: 'C Dominant 7th (Barre)', positions: [8, 10, 8, 9, 8, 8], fingers: [1, 3, 1, 2, 1, 1], fret: 8 },
  'Cm7_barre': { name: 'C Minor 7th (Barre)', positions: [3, 5, 3, 3, 3, 3], fingers: [1, 3, 1, 1, 1, 1], fret: 3 },
  'CM7_barre': { name: 'C Major 7th (Barre)', positions: [8, 10, 9, 9, 8, 8], fingers: [1, 4, 2, 3, 1, 1], fret: 8 },
  'Csus_barre': { name: 'C Suspended 4th (Barre)', positions: [8, 10, 10, 10, 8, 8], fingers: [1, 2, 3, 4, 1, 1], fret: 8 },
  'C+_barre': { name: 'C Augmented (Barre)', positions: ['X', 9, 8, 7, 7, 'X'], fingers: [0, 4, 3, 1, 2, 0], fret: 7 },
  'C°_barre': { name: 'C Diminished (Barre)', positions: ['X', 9, 7, 8, 7, 'X'], fingers: [0, 4, 1, 3, 2, 0], fret: 7 },
  'Cadd9_barre': { name: 'C Add9 (Barre)', positions: [8, 10, 8, 9, 8, 10], fingers: [1, 3, 1, 2, 1, 4], fret: 8 },
  
  // D Barre chords (5th fret position)
  'D_barre': { name: 'D Major (Barre)', positions: ['X', 5, 7, 7, 7, 5], fingers: [0, 1, 2, 3, 4, 1], fret: 5 },
  'Dm_barre': { name: 'D Minor (Barre)', positions: ['X', 5, 7, 7, 6, 5], fingers: [0, 1, 3, 4, 2, 1], fret: 5 },
  'D7_barre': { name: 'D Dominant 7th (Barre)', positions: ['X', 5, 7, 5, 7, 5], fingers: [0, 1, 3, 1, 4, 1], fret: 5 },
  'Dm7_barre': { name: 'D Minor 7th (Barre)', positions: ['X', 5, 7, 5, 6, 5], fingers: [0, 1, 3, 1, 2, 1], fret: 5 },
  'DM7_barre': { name: 'D Major 7th (Barre)', positions: ['X', 5, 7, 6, 7, 5], fingers: [0, 1, 3, 2, 4, 1], fret: 5 },
  'Dsus_barre': { name: 'D Suspended 4th (Barre)', positions: ['X', 5, 7, 7, 8, 5], fingers: [0, 1, 2, 3, 4, 1], fret: 5 },
  'D+_barre': { name: 'D Augmented (Barre)', positions: ['X', 5, 4, 3, 3, 'X'], fingers: [0, 4, 3, 1, 2, 0], fret: 3 },
  'D°_barre': { name: 'D Diminished (Barre)', positions: ['X', 5, 6, 4, 5, 'X'], fingers: [0, 2, 4, 1, 3, 0], fret: 4 },
  'Dadd9_barre': { name: 'D Add9 (Barre)', positions: ['X', 5, 7, 5, 7, 7], fingers: [0, 1, 3, 1, 2, 4], fret: 5 },
  
  // F Barre chords (8th fret position)
  'F_barre': { name: 'F Major (Barre)', positions: ['X', 8, 10, 10, 10, 8], fingers: [0, 1, 3, 3, 3, 1], fret: 8 },
  'Fm_barre': { name: 'F Minor (Barre)', positions: ['X', 8, 10, 10, 9, 8], fingers: [0, 1, 3, 4, 2, 1], fret: 8 },
  'F7_barre': { name: 'F Dominant 7th (Barre)', positions: ['X', 8, 10, 8, 10, 8], fingers: [0, 1, 3, 1, 4, 1], fret: 8 },
  'Fm7_barre': { name: 'F Minor 7th (Barre)', positions: ['X', 8, 10, 8, 9, 8], fingers: [0, 1, 3, 1, 2, 1], fret: 8 },
  'FM7_barre': { name: 'F Major 7th (Barre)', positions: ['X', 8, 10, 9, 10, 8], fingers: [0, 1, 3, 2, 4, 1], fret: 8 },
  'Fsus_barre': { name: 'F Suspended 4th (Barre)', positions: ['X', 8, 10, 10, 11, 8], fingers: [0, 1, 2, 3, 4, 1], fret: 8 },
  'F+_barre': { name: 'F Augmented (Barre)', positions: ['X', 8, 7, 6, 6, 'X'], fingers: [0, 4, 3, 1, 2, 0], fret: 6 },
  'F°_barre': { name: 'F Diminished (Barre)', positions: ['X', 8, 9, 7, 9, 'X'], fingers: [0, 2, 4, 1, 3, 0], fret: 7 },
  'Fadd9_barre': { name: 'F Add9 (Barre)', positions: ['X', 8, 10, 8, 10, 10], fingers: [0, 1, 3, 1, 2, 4], fret: 8 },
  
  // G Barre chords (10th fret position)
  'G_barre': { name: 'G Major (Barre)', positions: ['X', 10, 12, 12, 12, 10], fingers: [0, 1, 3, 3, 3, 1], fret: 10 },
  'Gm_barre': { name: 'G Minor (Barre)', positions: ['X', 10, 12, 12, 11, 10], fingers: [0, 1, 3, 4, 2, 1], fret: 10 },
  'G7_barre': { name: 'G Dominant 7th (Barre)', positions: ['X', 10, 12, 10, 12, 10], fingers: [0, 1, 3, 1, 4, 1], fret: 10 },
  'Gm7_barre': { name: 'G Minor 7th (Barre)', positions: ['X', 10, 12, 10, 11, 10], fingers: [0, 1, 3, 1, 2, 1], fret: 10 },
  'GM7_barre': { name: 'G Major 7th (Barre)', positions: ['X', 10, 12, 11, 12, 10], fingers: [0, 1, 3, 2, 4, 1], fret: 10 },
  'Gsus_barre': { name: 'G Suspended 4th (Barre)', positions: ['X', 10, 12, 12, 13, 10], fingers: [0, 1, 2, 3, 4, 1], fret: 10 },
  'G+_barre': { name: 'G Augmented (Barre)', positions: ['X', 11, 10, 9, 9, 'X'], fingers: [0, 4, 3, 1, 2, 0], fret: 9 },
  'G°_barre': { name: 'G Diminished (Barre)', positions: ['X', 11, 9, 10, 9, 'X'], fingers: [0, 4, 1, 3, 2, 0], fret: 9 },
  'Gadd9_barre': { name: 'G Add9 (Barre)', positions: ['X', 10, 12, 10, 12, 12], fingers: [0, 1, 3, 1, 2, 4], fret: 10 }
};

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
    characteristicDegrees: [1, 3, 5],
    preferredPentatonic: 'minor',
    preferFlats: true, // Has ♭3, ♭6, ♭7
    color: 'rgb(107, 114, 128)', // Gray
    description: 'Natural minor scale - melancholy and emotional',
    parentMajor: 6
  },
  {
    id: 'locrian',
    name: 'Locrian',
    quality: 'diminished',
    intervals: [0, 1, 3, 5, 6, 8, 10],
    degreeFormula: ['1', '♭2', '♭3', '4', '♭5', '♭6', '♭7'],
    characteristicDegrees: [5], // Flat 5th creates unstable, diminished sound
    avoidDegrees: [1], // Root is often avoided due to instability
    preferredPentatonic: 'minor',
    preferFlats: true, // Has ♭2, ♭3, ♭5, ♭6, ♭7
    color: 'rgb(75, 85, 99)', // Dark gray
    description: 'Unstable and dissonant - rarely used as tonal center',
    parentMajor: 7
  }
];

// Core chromatic notes (using sharps to match fretboard mapping)
export const NOTES = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'];
export const NOTES_FLAT = ['C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭', 'G', 'A♭', 'A', 'B♭', 'B'];

// Normalize note names for consistent comparison
export const normalizeNote = (note: string): string => {
  return note.replace(/♯/g, '#').replace(/♭/g, 'b').replace(/\s/g, '');
};

// Transpose a note by semitones, preserving flat/sharp family
export const transpose = (rootNote: string, semitones: number, forceFlats?: boolean): string => {
  // Extract root note without chord quality (remove m, 7, maj, etc.)
  const match = rootNote.match(/^([A-G][♯♭#b]?)/);
  if (!match) return rootNote; // Return original if no valid root found
  
  const pureRoot = match[1];
  const normalized = normalizeNote(pureRoot);
  
  // Determine if we should use flat or sharp notation
  // Priority: 1) forceFlats parameter, 2) root note has flat, 3) default to sharps
  const useFlats = forceFlats !== undefined ? forceFlats : (pureRoot.includes('♭') || pureRoot.includes('b'));
  const noteArray = useFlats ? NOTES_FLAT : NOTES;
  
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
    const fallbackArray = useFlats ? NOTES : NOTES_FLAT;
    rootIndex = fallbackArray.findIndex(note => normalizeNote(note) === normalized);
    if (rootIndex !== -1) {
      const newIndex = (rootIndex + semitones + 12) % 12;
      return fallbackArray[newIndex];
    }
    return pureRoot; // Return pure root if still not found
  }
  
  const newIndex = (rootIndex + semitones + 12) % 12;
  return noteArray[newIndex];
};

// Build scale notes from root and intervals
export const buildScaleByIntervals = (root: string, intervals: number[], preferFlats?: boolean): string[] => {
  return intervals.map(interval => transpose(root, interval, preferFlats));
};

// Convert degree formula to actual notes
export const degreeToNote = (root: string, degreeFormula: string[]): string[] => {
  const degreeToSemitones: Record<string, number> = {
    '1': 0, '♭2': 1, '2': 2, '♭3': 3, '3': 4, '4': 5, '♯4': 6, '♭5': 6, '5': 7,
    '♯5': 8, '♭6': 8, '6': 9, '♯6': 10, '♭7': 10, '7': 11
  };
  
  return degreeFormula.map(degree => {
    const semitones = degreeToSemitones[degree];
    return semitones !== undefined ? transpose(root, semitones) : root;
  });
};

// Check if array A is a subset of array B
export const isSubset = (a: string[], b: string[]): boolean => {
  const normalizedB = b.map(normalizeNote);
  return a.every(note => normalizedB.includes(normalizeNote(note)));
};

// Generate related scales for a given mode
export const generateRelatedScales = (mode: ModeDef, root: string): Array<{name: string, notes: string[], type: string}> => {
  const modeNotes = buildScaleByIntervals(root, mode.intervals, mode.preferFlats);
  const relatedScales: Array<{name: string, notes: string[], type: string}> = [];
  
  // Major pentatonic (1 2 3 5 6)
  if (mode.preferredPentatonic === 'major') {
    const majorPenta = [root, transpose(root, 2, mode.preferFlats), transpose(root, 4, mode.preferFlats), transpose(root, 7, mode.preferFlats), transpose(root, 9, mode.preferFlats)];
    if (isSubset(majorPenta, modeNotes)) {
      relatedScales.push({name: 'Major Pentatonic', notes: majorPenta, type: 'pentatonic'});
    }
  }
  
  // Minor pentatonic (1 ♭3 4 5 ♭7)
  if (mode.preferredPentatonic === 'minor') {
    const minorPenta = [root, transpose(root, 3, mode.preferFlats), transpose(root, 5, mode.preferFlats), transpose(root, 7, mode.preferFlats), transpose(root, 10, mode.preferFlats)];
    if (isSubset(minorPenta, modeNotes)) {
      relatedScales.push({name: 'Minor Pentatonic', notes: minorPenta, type: 'pentatonic'});
    }
  }
  
  // Triad arpeggio
  let triadNotes: string[];
  if (mode.quality === 'major') {
    triadNotes = [root, transpose(root, 4, mode.preferFlats), transpose(root, 7, mode.preferFlats)]; // 1 3 5
  } else if (mode.quality === 'minor') {
    triadNotes = [root, transpose(root, 3, mode.preferFlats), transpose(root, 7, mode.preferFlats)]; // 1 ♭3 5
  } else { // diminished
    triadNotes = [root, transpose(root, 3, mode.preferFlats), transpose(root, 6, mode.preferFlats)]; // 1 ♭3 ♭5
  }
  
  if (isSubset(triadNotes, modeNotes)) {
    relatedScales.push({name: `${mode.quality.charAt(0).toUpperCase() + mode.quality.slice(1)} Triad`, notes: triadNotes, type: 'arpeggio'});
  }
  
  // Seventh arpeggio - derive 7th interval from mode notes
  let seventhNotes: string[];
  const seventhDegreeNote = modeNotes[6]; // 7th degree note from the mode
  if (mode.quality === 'major') {
    seventhNotes = [...triadNotes, seventhDegreeNote]; // Natural 7th from mode
  } else if (mode.quality === 'minor') {
    seventhNotes = [...triadNotes, seventhDegreeNote]; // ♭7th from mode
  } else { // diminished (Locrian - should be m7♭5)
    seventhNotes = [...triadNotes, seventhDegreeNote]; // ♭7th from mode for half-diminished
  }
  
  if (isSubset(seventhNotes, modeNotes)) {
    relatedScales.push({name: `${mode.quality.charAt(0).toUpperCase() + mode.quality.slice(1)} 7th`, notes: seventhNotes, type: 'arpeggio'});
  }
  
  // Hexatonic (6-note scale removing avoid degree if present)
  if (mode.avoidDegrees && mode.avoidDegrees.length > 0) {
    const hexatonicNotes = modeNotes.filter((_, index) => !mode.avoidDegrees!.includes(index + 1));
    if (hexatonicNotes.length === 6) {
      relatedScales.push({name: 'Hexatonic (avoid removed)', notes: hexatonicNotes, type: 'hexatonic'});
    }
  }
  
  // Return 2-3 random scales
  const shuffled = relatedScales.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(3, Math.max(2, shuffled.length)));
};

// Scale compatibility system for chord progressions
export interface CompatibleScale {
  mode: ModeDef;
  root: string;
  notes: string[];
  matchScore: number; // How well it fits (higher is better)
}

// Find compatible scales for a chord progression
export const findCompatibleScales = (chords: string[]): CompatibleScale[] => {
  if (!chords || chords.length === 0) return [];
  
  const compatibleScales: CompatibleScale[] = [];
  
  // Extract roots from chord names
  const chordRoots = chords.map(chord => {
    const match = chord.match(/^([A-G][♯♭#b]?)/);
    return match ? match[1].replace(/#/g, '♯').replace(/b/g, '♭') : '';
  }).filter(Boolean);
  
  // Try each mode with each chromatic root
  const roots = ['C', 'D♭', 'D', 'E♭', 'E', 'F', 'F♯', 'G', 'A♭', 'A', 'B♭', 'B'];
  
  for (const root of roots) {
    for (const mode of modes) {
      const scaleNotes = buildScaleByIntervals(root, mode.intervals, mode.preferFlats);
      
      // Count how many chord roots are in the scale
      let matchCount = 0;
      for (const chordRoot of chordRoots) {
        const normalized = normalizeNote(chordRoot);
        if (scaleNotes.some(note => normalizeNote(note) === normalized)) {
          matchCount++;
        }
      }
      
      // Calculate match score (percentage of chords that fit)
      const matchScore = (matchCount / chordRoots.length) * 100;
      
      // Only include scales with at least 50% match
      if (matchScore >= 50) {
        compatibleScales.push({
          mode,
          root,
          notes: scaleNotes,
          matchScore
        });
      }
    }
  }
  
  // Sort by match score (highest first)
  compatibleScales.sort((a, b) => b.matchScore - a.matchScore);
  
  return compatibleScales;
};

// Get a random selection of 2-4 compatible scales
export const getRandomCompatibleScales = (chords: string[], count: number = 3): CompatibleScale[] => {
  const allCompatible = findCompatibleScales(chords);
  
  // Ensure count is between 2 and 4
  const validCount = Math.max(2, Math.min(4, count));
  
  if (allCompatible.length === 0) return [];
  if (allCompatible.length <= validCount) return allCompatible;
  
  // Get top matches and some variety
  const topScales = allCompatible.slice(0, Math.ceil(validCount / 2));
  const remaining = allCompatible.slice(Math.ceil(validCount / 2));
  
  // Shuffle remaining and take enough to reach target count
  const shuffled = remaining.sort(() => Math.random() - 0.5);
  const selected = [...topScales, ...shuffled.slice(0, validCount - topScales.length)];
  
  return selected.slice(0, validCount);
};

export const getChordDiagram = (chordName: string): ChordDiagram | null => {
  // Handle empty/null input
  if (!chordName) return null;
  
  // Initial cleanup and Unicode conversion
  let normalized = chordName.replace(/\s+/g, '')
    .replace(/♯/g, '#')  // Convert musical sharp symbol to #
    .replace(/♭/g, 'b'); // Convert musical flat symbol to b
  
  console.log(`Looking up chord diagram for: "${chordName}" -> initial: "${normalized}"`);
  
  // Parse root note and quality using regex
  const match = normalized.match(/^([A-G][#b]?)(.*)/);
  if (!match) {
    console.log(`Invalid chord format: "${normalized}"`);
    return null;
  }
  
  const root = match[1];
  let quality = match[2];
  
  // Normalize quality/suffix aliases
  const qualityAliases: Record<string, string> = {
    // Major variants
    'MAJ': '',
    'MAJOR': '',
    'M': '',
    
    // Major 7th variants (important fix!)
    'MAJ7': 'M7',
    'MAJOR7': 'M7',
    'Δ7': 'M7',
    
    // Minor variants
    'MIN': 'm',
    'MINOR': 'm',
    '-': 'm',
    
    // Minor 7th variants
    'MIN7': 'm7',
    'MINOR7': 'm7',
    '-7': 'm7',
    
    // Suspended variants
    'SUS2': 'sus',
    'SUS4': 'sus',
    'SUSPENDED': 'sus',
    
    // Diminished variants
    'DIM': '°',
    'DIMINISHED': '°',
    
    // Augmented variants
    'AUG': '+',
    'AUGMENTED': '+',
    
    // Dominant 7th (keep as-is)
    'DOM7': '7',
    'DOMINANT7': '7'
  };
  
  // Apply quality aliases
  const upperQuality = quality.toUpperCase();
  const normalizedQuality = qualityAliases[upperQuality] !== undefined ? qualityAliases[upperQuality] : quality;
  
  const finalChord = root + normalizedQuality;
  console.log(`Parsed: root="${root}", quality="${quality}" -> normalized: "${finalChord}"`);
  
  // Try exact match first
  if (chordDiagrams[finalChord]) {
    console.log(`Found exact match for: ${finalChord}`);
    return chordDiagrams[finalChord];
  }
  
  // Try priority fallbacks for common variations
  const priorityFallbacks = [
    // For 7th chords, try different variants
    finalChord.replace(/M7$/i, '7'),  // Major 7 -> Dominant 7 fallback
    finalChord.replace(/7$/, 'M7'),   // Dominant 7 -> Major 7 fallback
    
    // For sus chords, try specific sus types
    finalChord.replace(/sus$/, 'sus2'),
    finalChord.replace(/sus$/, 'sus4'),
    
    // Try without numbers (9th, 6th -> base chord)
    finalChord.replace(/[69]$/, ''),
    
    // Try base major/minor
    root,           // Major
    root + 'm',     // Minor
    root + '7'      // Dominant 7
  ];
  
  for (const fallback of priorityFallbacks) {
    if (fallback && chordDiagrams[fallback]) {
      console.log(`Found fallback match: "${fallback}" for "${finalChord}"`);
      return chordDiagrams[fallback];
    }
  }
  
  console.log(`No diagram found for: "${chordName}" (final: "${finalChord}")`);
  return null;
};
