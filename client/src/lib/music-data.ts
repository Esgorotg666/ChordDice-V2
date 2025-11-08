// Type definitions
export type ChordDiagram = {
  name: string;
  positions: (number | 'X')[];
  fingers?: number[];
  fret?: number;
};

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

// Exotic chord types mapping (dice roll number to chord type)
export const exoticNumbers: Record<number, string> = {
  1: 'Diminished',
  2: 'Augmented',
  3: 'Suspended',
  4: 'Major 7th',
  5: '9th',
  6: 'Maj',
  7: 'Maj',
  8: 'Maj'
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
export const colorGroups = [
  { name: 'Purple', keys: ['E', 'F#', 'G#', 'A#'] },
  { name: 'Orange', keys: ['F', 'G', 'A', 'B'] },
  { name: 'Blue', keys: ['C', 'D', 'E♭', 'F#'] },
  { name: 'Green', keys: ['C#', 'D#', 'G', 'A'] },
  { name: 'Red', keys: ['D', 'E', 'F', 'G#'] },
  { name: 'Yellow', keys: ['A♭', 'B♭', 'C', 'D'] }
];

// Get all musical keys
export const getAllKeys = (): string[] => {
  return musicalKeys;
};

// Complete Guitar Chord Library - 480 Chords (12 keys × 40 variations)
export const chordDiagrams: Record<string, ChordDiagram> = {
  // A Root Chords (40 variations)
  'A': { name: 'A Major', positions: ['X', 0, 2, 2, 2, 0] },
  'Am': { name: 'A Minor', positions: ['X', 0, 2, 2, 1, 0] },
  'A7': { name: 'A Dominant 7th', positions: ['X', 0, 2, 0, 2, 0] },
  'Am7': { name: 'A Minor 7th', positions: ['X', 0, 2, 0, 1, 0] },
  'Amaj7': { name: 'A Major 7th', positions: ['X', 0, 2, 1, 2, 0] },
  'Asus4': { name: 'A Suspended 4th', positions: ['X', 0, 2, 2, 3, 0] },
  'Asus2': { name: 'A Suspended 2nd', positions: ['X', 0, 2, 2, 0, 0] },
  'Aaug': { name: 'A Augmented', positions: ['X', 0, 3, 2, 2, 1] },
  'Adim': { name: 'A Diminished', positions: ['X', 0, 2, 3, 2, 3] },
  'Adim7': { name: 'A Diminished 7th', positions: ['X', 0, 1, 2, 1, 2] },
  'Aadd9': { name: 'A Add9', positions: ['X', 0, 2, 4, 2, 0] },
  'A6': { name: 'A6', positions: ['X', 0, 2, 2, 2, 2] },
  'Am6': { name: 'A Minor 6th', positions: ['X', 0, 2, 2, 1, 2] },
  'A9': { name: 'A9', positions: ['X', 0, 2, 4, 2, 3] },
  'Ammaj7': { name: 'A Minor Major 7th', positions: ['X', 0, 2, 1, 1, 0] },
  'A7#9': { name: 'A7#9', positions: ['X', 0, 2, 3, 2, 5] },
  'Amaj9': { name: 'A Major 9th', positions: ['X', 0, 2, 1, 0, 0] },
  'Am9': { name: 'A Minor 9th', positions: ['X', 0, 5, 5, 5, 7] },
  'A7b9': { name: 'A7b9', positions: ['X', 0, 2, 3, 2, 4] },
  'A7#5': { name: 'A7#5', positions: ['X', 0, 3, 0, 2, 1] },
  'A7b5': { name: 'A7b5', positions: ['X', 0, 1, 0, 2, 3] },
  'A11': { name: 'A11', positions: ['X', 0, 0, 0, 0, 0] },
  'Am11': { name: 'A Minor 11th', positions: ['X', 0, 5, 5, 5, 5] },
  'A13': { name: 'A13', positions: ['X', 0, 4, 0, 2, 2] },
  'Am13': { name: 'A Minor 13th', positions: ['X', 0, 5, 0, 5, 7] },
  'A_barre': { name: 'A Major Barre', positions: [5, 7, 7, 6, 5, 5], fret: 5 },
  'Am_barre': { name: 'A Minor Barre', positions: [5, 7, 7, 5, 5, 5], fret: 5 },
  'A7_barre': { name: 'A Dominant 7th Barre', positions: [5, 7, 5, 6, 5, 5], fret: 5 },
  'Am7_barre': { name: 'A Minor 7th Barre', positions: [5, 7, 5, 5, 5, 5], fret: 5 },
  'Amaj7_barre': { name: 'A Major 7th Barre', positions: [5, 7, 6, 6, 5, 5], fret: 5 },
  'Asus4_barre': { name: 'A Suspended 4th Barre', positions: [5, 7, 7, 7, 5, 5], fret: 5 },
  'Asus2_barre': { name: 'A Suspended 2nd Barre', positions: [5, 7, 7, 0, 5, 5], fret: 5 },
  'Aaug_barre': { name: 'A Augmented Barre', positions: ['X', 7, 6, 6, 6, 5], fret: 5 },
  'Adim_barre': { name: 'A Diminished Barre', positions: ['X', 7, 5, 6, 5, 6], fret: 5 },
  'Adim7_barre': { name: 'A Diminished 7th Barre', positions: ['X', 7, 5, 6, 7, 5], fret: 5 },
  'Aadd9_barre': { name: 'A Add9 Barre', positions: [5, 7, 5, 6, 5, 7], fret: 5 },
  'A6_barre': { name: 'A6 Barre', positions: [5, 7, 5, 6, 7, 5], fret: 5 },
  'Am6_barre': { name: 'A Minor 6th Barre', positions: [5, 7, 5, 5, 6, 5], fret: 5 },
  'A9_barre': { name: 'A9 Barre', positions: [5, 7, 5, 6, 7, 7], fret: 5 },
  'A7#9_barre': { name: 'A7#9 Barre', positions: [5, 7, 5, 6, 7, 8], fret: 5 },

  // Bb Root Chords (40 variations)
  'Bb': { name: 'Bb Major', positions: ['X', 1, 3, 3, 3, 1] },
  'Bbm': { name: 'Bb Minor', positions: ['X', 1, 3, 3, 2, 1] },
  'Bb7': { name: 'Bb Dominant 7th', positions: ['X', 1, 3, 1, 3, 1] },
  'Bbm7': { name: 'Bb Minor 7th', positions: ['X', 1, 3, 1, 2, 1] },
  'Bbmaj7': { name: 'Bb Major 7th', positions: ['X', 1, 3, 2, 3, 1] },
  'Bbsus4': { name: 'Bb Suspended 4th', positions: ['X', 1, 3, 3, 4, 1] },
  'Bbsus2': { name: 'Bb Suspended 2nd', positions: ['X', 1, 3, 3, 1, 1] },
  'Bbaug': { name: 'Bb Augmented', positions: ['X', 1, 0, 3, 3, 2] },
  'Bbdim': { name: 'Bb Diminished', positions: ['X', 1, 2, 0, 2, 'X'] },
  'Bbdim7': { name: 'Bb Diminished 7th', positions: ['X', 1, 2, 0, 2, 0] },
  'Bbadd9': { name: 'Bb Add9', positions: ['X', 1, 3, 5, 3, 1] },
  'Bb6': { name: 'Bb6', positions: ['X', 1, 3, 0, 3, 'X'] },
  'Bbm6': { name: 'Bb Minor 6th', positions: ['X', 1, 3, 0, 2, 'X'] },
  'Bb9': { name: 'Bb9', positions: ['X', 1, 0, 1, 1, 1] },
  'Bbmmaj7': { name: 'Bb Minor Major 7th', positions: ['X', 1, 3, 2, 2, 1] },
  'Bb7#9': { name: 'Bb7#9', positions: ['X', 1, 3, 1, 3, 4] },
  'Bbmaj9': { name: 'Bb Major 9th', positions: ['X', 1, 0, 1, 0, 0] },
  'Bbm9': { name: 'Bb Minor 9th', positions: ['X', 1, 3, 1, 2, 3] },
  'Bb7b9': { name: 'Bb7b9', positions: ['X', 1, 0, 1, 1, 2] },
  'Bb7#5': { name: 'Bb7#5', positions: ['X', 1, 4, 1, 3, 2] },
  'Bb7b5': { name: 'Bb7b5', positions: ['X', 1, 2, 1, 3, 'X'] },
  'Bb11': { name: 'Bb11', positions: ['X', 1, 1, 1, 1, 1] },
  'Bbm11': { name: 'Bb Minor 11th', positions: ['X', 1, 1, 1, 1, 3] },
  'Bb13': { name: 'Bb13', positions: ['X', 1, 5, 1, 3, 3] },
  'Bbm13': { name: 'Bb Minor 13th', positions: ['X', 1, 3, 1, 3, 5] },
  'Bb_barre': { name: 'Bb Major Barre', positions: [6, 8, 8, 7, 6, 6], fret: 6 },
  'Bbm_barre': { name: 'Bb Minor Barre', positions: [6, 8, 8, 6, 6, 6], fret: 6 },
  'Bb7_barre': { name: 'Bb Dominant 7th Barre', positions: [6, 8, 6, 7, 6, 6], fret: 6 },
  'Bbm7_barre': { name: 'Bb Minor 7th Barre', positions: [6, 8, 6, 6, 6, 6], fret: 6 },
  'Bbmaj7_barre': { name: 'Bb Major 7th Barre', positions: [6, 8, 7, 7, 6, 6], fret: 6 },
  'Bbsus4_barre': { name: 'Bb Suspended 4th Barre', positions: [6, 8, 8, 8, 6, 6], fret: 6 },
  'Bbsus2_barre': { name: 'Bb Suspended 2nd Barre', positions: [6, 8, 8, 1, 6, 6], fret: 6 },
  'Bbaug_barre': { name: 'Bb Augmented Barre', positions: ['X', 8, 7, 7, 7, 6], fret: 6 },
  'Bbdim_barre': { name: 'Bb Diminished Barre', positions: ['X', 8, 6, 7, 6, 7], fret: 6 },
  'Bbdim7_barre': { name: 'Bb Diminished 7th Barre', positions: ['X', 8, 6, 7, 8, 6], fret: 6 },
  'Bbadd9_barre': { name: 'Bb Add9 Barre', positions: [6, 8, 6, 7, 6, 8], fret: 6 },
  'Bb6_barre': { name: 'Bb6 Barre', positions: [6, 8, 6, 7, 8, 6], fret: 6 },
  'Bbm6_barre': { name: 'Bb Minor 6th Barre', positions: [6, 8, 6, 6, 7, 6], fret: 6 },
  'Bb9_barre': { name: 'Bb9 Barre', positions: [6, 8, 6, 7, 8, 8], fret: 6 },
  'Bb7#9_barre': { name: 'Bb7#9 Barre', positions: [6, 8, 6, 7, 8, 9], fret: 6 },

  // B Root Chords (40 variations)
  'B': { name: 'B Major', positions: ['X', 2, 4, 4, 4, 2] },
  'Bm': { name: 'B Minor', positions: ['X', 2, 4, 4, 3, 2] },
  'B7': { name: 'B Dominant 7th', positions: ['X', 2, 4, 2, 4, 2] },
  'Bm7': { name: 'B Minor 7th', positions: ['X', 2, 4, 2, 3, 2] },
  'Bmaj7': { name: 'B Major 7th', positions: ['X', 2, 4, 3, 4, 2] },
  'Bsus4': { name: 'B Suspended 4th', positions: ['X', 2, 4, 4, 5, 2] },
  'Bsus2': { name: 'B Suspended 2nd', positions: ['X', 2, 4, 4, 2, 2] },
  'Baug': { name: 'B Augmented', positions: ['X', 2, 1, 0, 0, 3] },
  'Bdim': { name: 'B Diminished', positions: ['X', 2, 3, 4, 3, 'X'] },
  'Bdim7': { name: 'B Diminished 7th', positions: ['X', 2, 3, 1, 3, 1] },
  'Badd9': { name: 'B Add9', positions: ['X', 2, 4, 6, 4, 2] },
  'B6': { name: 'B6', positions: ['X', 2, 4, 4, 4, 4] },
  'Bm6': { name: 'B Minor 6th', positions: ['X', 2, 4, 4, 3, 4] },
  'B9': { name: 'B9', positions: ['X', 2, 4, 2, 2, 2] },
  'Bmmaj7': { name: 'B Minor Major 7th', positions: ['X', 2, 4, 3, 3, 'X'] },
  'B7#9': { name: 'B7#9', positions: ['X', 2, 4, 2, 4, 5] },
  'Bmaj9': { name: 'B Major 9th', positions: ['X', 2, 1, 3, 2, 'X'] },
  'Bm9': { name: 'B Minor 9th', positions: ['X', 2, 4, 2, 2, 4] },
  'B7b9': { name: 'B7b9', positions: ['X', 2, 1, 2, 1, 'X'] },
  'B7#5': { name: 'B7#5', positions: ['X', 2, 5, 2, 4, 'X'] },
  'B7b5': { name: 'B7b5', positions: ['X', 2, 3, 2, 4, 'X'] },
  'B11': { name: 'B11', positions: ['X', 2, 2, 2, 2, 2] },
  'Bm11': { name: 'B Minor 11th', positions: ['X', 2, 2, 2, 2, 4] },
  'B13': { name: 'B13', positions: ['X', 2, 6, 2, 4, 4] },
  'Bm13': { name: 'B Minor 13th', positions: ['X', 2, 4, 2, 4, 6] },
  'B_barre': { name: 'B Major Barre', positions: [7, 9, 9, 8, 7, 7], fret: 7 },
  'Bm_barre': { name: 'B Minor Barre', positions: [7, 9, 9, 7, 7, 7], fret: 7 },
  'B7_barre': { name: 'B Dominant 7th Barre', positions: [7, 9, 7, 8, 7, 7], fret: 7 },
  'Bm7_barre': { name: 'B Minor 7th Barre', positions: [7, 9, 7, 7, 7, 7], fret: 7 },
  'Bmaj7_barre': { name: 'B Major 7th Barre', positions: [7, 9, 8, 8, 7, 7], fret: 7 },
  'Bsus4_barre': { name: 'B Suspended 4th Barre', positions: [7, 9, 9, 9, 7, 7], fret: 7 },
  'Bsus2_barre': { name: 'B Suspended 2nd Barre', positions: [7, 9, 9, 2, 7, 7], fret: 7 },
  'Baug_barre': { name: 'B Augmented Barre', positions: [8, 7, 6, 6, 6, 'X'], fret: 6 },
  'Bdim_barre': { name: 'B Diminished Barre', positions: [7, 8, 6, 7, 6, 'X'], fret: 6 },
  'Bdim7_barre': { name: 'B Diminished 7th Barre', positions: [7, 8, 7, 6, 7, 6], fret: 6 },
  'Badd9_barre': { name: 'B Add9 Barre', positions: [7, 9, 7, 8, 7, 9], fret: 7 },
  'B6_barre': { name: 'B6 Barre', positions: [7, 9, 7, 8, 9, 7], fret: 7 },
  'Bm6_barre': { name: 'B Minor 6th Barre', positions: [7, 9, 7, 7, 8, 7], fret: 7 },
  'B9_barre': { name: 'B9 Barre', positions: [7, 9, 7, 8, 9, 9], fret: 7 },
  'B7#9_barre': { name: 'B7#9 Barre', positions: [7, 9, 7, 8, 9, 10], fret: 7 },

  // C Root Chords (40 variations)
  'C': { name: 'C Major', positions: ['X', 3, 2, 0, 1, 0] },
  'Cm': { name: 'C Minor', positions: ['X', 3, 5, 5, 4, 3] },
  'C7': { name: 'C Dominant 7th', positions: ['X', 3, 2, 3, 1, 0] },
  'Cm7': { name: 'C Minor 7th', positions: ['X', 3, 5, 3, 4, 3] },
  'Cmaj7': { name: 'C Major 7th', positions: ['X', 3, 2, 0, 0, 0] },
  'Csus4': { name: 'C Suspended 4th', positions: ['X', 3, 3, 0, 1, 1] },
  'Csus2': { name: 'C Suspended 2nd', positions: ['X', 3, 0, 0, 1, 0] },
  'Caug': { name: 'C Augmented', positions: ['X', 3, 2, 1, 1, 0] },
  'Cdim': { name: 'C Diminished', positions: ['X', 3, 4, 5, 4, 'X'] },
  'Cdim7': { name: 'C Diminished 7th', positions: ['X', 3, 4, 2, 4, 'X'] },
  'Cadd9': { name: 'C Add9', positions: ['X', 3, 2, 0, 3, 0] },
  'C6': { name: 'C6', positions: ['X', 3, 2, 2, 1, 0] },
  'Cm6': { name: 'C Minor 6th', positions: ['X', 3, 5, 0, 4, 5] },
  'C9': { name: 'C9', positions: ['X', 3, 2, 3, 3, 0] },
  'Cmmaj7': { name: 'C Minor Major 7th', positions: ['X', 3, 5, 4, 4, 3] },
  'C7#9': { name: 'C7#9', positions: ['X', 3, 2, 3, 4, 'X'] },
  'Cmaj9': { name: 'C Major 9th', positions: ['X', 3, 2, 4, 3, 'X'] },
  'Cm9': { name: 'C Minor 9th', positions: ['X', 3, 1, 3, 3, 3] },
  'C7b9': { name: 'C7b9', positions: ['X', 3, 2, 3, 2, 'X'] },
  'C7#5': { name: 'C7#5', positions: ['X', 3, 4, 3, 5, 'X'] },
  'C7b5': { name: 'C7b5', positions: ['X', 3, 4, 3, 4, 'X'] },
  'C11': { name: 'C11', positions: ['X', 3, 3, 3, 3, 3] },
  'Cm11': { name: 'C Minor 11th', positions: ['X', 3, 3, 3, 3, 5] },
  'C13': { name: 'C13', positions: ['X', 3, 5, 3, 5, 5] },
  'Cm13': { name: 'C Minor 13th', positions: ['X', 3, 5, 3, 5, 7] },
  'C_barre': { name: 'C Major Barre', positions: [8, 10, 10, 9, 8, 8], fret: 8 },
  'Cm_barre': { name: 'C Minor Barre', positions: [3, 5, 5, 3, 3, 3], fret: 3 },
  'C7_barre': { name: 'C Dominant 7th Barre', positions: [8, 10, 8, 9, 8, 8], fret: 8 },
  'Cm7_barre': { name: 'C Minor 7th Barre', positions: [3, 5, 3, 3, 3, 3], fret: 3 },
  'Cmaj7_barre': { name: 'C Major 7th Barre', positions: [8, 10, 9, 9, 8, 8], fret: 8 },
  'Csus4_barre': { name: 'C Suspended 4th Barre', positions: [8, 10, 10, 10, 8, 8], fret: 8 },
  'Csus2_barre': { name: 'C Suspended 2nd Barre', positions: [8, 10, 3, 9, 8, 8], fret: 8 },
  'Caug_barre': { name: 'C Augmented Barre', positions: ['X', 9, 8, 7, 7, 'X'], fret: 7 },
  'Cdim_barre': { name: 'C Diminished Barre', positions: ['X', 9, 7, 8, 7, 'X'], fret: 7 },
  'Cdim7_barre': { name: 'C Diminished 7th Barre', positions: ['X', 9, 7, 8, 6, 'X'], fret: 6 },
  'Cadd9_barre': { name: 'C Add9 Barre', positions: [8, 10, 8, 9, 8, 10], fret: 8 },
  'C6_barre': { name: 'C6 Barre', positions: [8, 10, 8, 9, 10, 8], fret: 8 },
  'Cm6_barre': { name: 'C Minor 6th Barre', positions: [8, 10, 8, 7, 9, 8], fret: 8 },
  'C9_barre': { name: 'C9 Barre', positions: [8, 10, 8, 9, 10, 10], fret: 8 },
  'C7#9_barre': { name: 'C7#9 Barre', positions: [8, 10, 8, 9, 10, 11], fret: 8 },

  // C# Root Chords (40 variations)
  'C#': { name: 'C# Major', positions: ['X', 4, 6, 6, 6, 4] },
  'C#m': { name: 'C# Minor', positions: ['X', 4, 6, 6, 5, 4] },
  'C#7': { name: 'C# Dominant 7th', positions: ['X', 4, 6, 4, 6, 4] },
  'C#m7': { name: 'C# Minor 7th', positions: ['X', 4, 6, 4, 5, 4] },
  'C#maj7': { name: 'C# Major 7th', positions: ['X', 4, 6, 5, 6, 4] },
  'C#sus4': { name: 'C# Suspended 4th', positions: ['X', 4, 6, 6, 7, 4] },
  'C#sus2': { name: 'C# Suspended 2nd', positions: ['X', 4, 6, 6, 4, 4] },
  'C#aug': { name: 'C# Augmented', positions: ['X', 4, 3, 2, 2, 'X'] },
  'C#dim': { name: 'C# Diminished', positions: ['X', 4, 5, 6, 5, 'X'] },
  'C#dim7': { name: 'C# Diminished 7th', positions: ['X', 4, 5, 3, 5, 3] },
  'C#add9': { name: 'C# Add9', positions: ['X', 4, 6, 8, 6, 4] },
  'C#6': { name: 'C#6', positions: ['X', 4, 6, 6, 6, 6] },
  'C#m6': { name: 'C# Minor 6th', positions: ['X', 4, 6, 6, 5, 6] },
  'C#9': { name: 'C#9', positions: ['X', 4, 3, 4, 4, 4] },
  'C#mmaj7': { name: 'C# Minor Major 7th', positions: ['X', 4, 6, 5, 5, 4] },
  'C#7#9': { name: 'C#7#9', positions: ['X', 4, 6, 4, 6, 7] },
  'C#maj9': { name: 'C# Major 9th', positions: ['X', 4, 1, 3, 3, 'X'] },
  'C#m9': { name: 'C# Minor 9th', positions: ['X', 4, 2, 4, 4, 4] },
  'C#7b9': { name: 'C#7b9', positions: ['X', 4, 3, 4, 3, 'X'] },
  'C#7#5': { name: 'C#7#5', positions: ['X', 4, 7, 4, 6, 'X'] },
  'C#7b5': { name: 'C#7b5', positions: ['X', 4, 5, 4, 5, 'X'] },
  'C#11': { name: 'C#11', positions: ['X', 4, 4, 4, 4, 4] },
  'C#m11': { name: 'C# Minor 11th', positions: ['X', 4, 4, 4, 4, 6] },
  'C#13': { name: 'C#13', positions: ['X', 4, 6, 4, 6, 6] },
  'C#m13': { name: 'C# Minor 13th', positions: ['X', 4, 6, 4, 6, 8] },
  'C#_barre': { name: 'C# Major Barre', positions: [9, 11, 11, 10, 9, 9], fret: 9 },
  'C#m_barre': { name: 'C# Minor Barre', positions: [9, 11, 11, 10, 8, 9], fret: 9 },
  'C#7_barre': { name: 'C# Dominant 7th Barre', positions: [9, 11, 9, 10, 9, 9], fret: 9 },
  'C#m7_barre': { name: 'C# Minor 7th Barre', positions: [9, 11, 9, 10, 8, 9], fret: 9 },
  'C#maj7_barre': { name: 'C# Major 7th Barre', positions: [9, 11, 10, 10, 9, 9], fret: 9 },
  'C#sus4_barre': { name: 'C# Suspended 4th Barre', positions: [9, 11, 11, 11, 9, 9], fret: 9 },
  'C#sus2_barre': { name: 'C# Suspended 2nd Barre', positions: [9, 11, 4, 10, 9, 9], fret: 9 },
  'C#aug_barre': { name: 'C# Augmented Barre', positions: ['X', 10, 9, 8, 8, 'X'], fret: 8 },
  'C#dim_barre': { name: 'C# Diminished Barre', positions: ['X', 9, 10, 8, 10, 'X'], fret: 8 },
  'C#dim7_barre': { name: 'C# Diminished 7th Barre', positions: ['X', 9, 10, 7, 9, 'X'], fret: 7 },
  'C#add9_barre': { name: 'C# Add9 Barre', positions: [9, 11, 9, 10, 11, 9], fret: 9 },
  'C#6_barre': { name: 'C#6 Barre', positions: [9, 11, 9, 10, 9, 11], fret: 9 },
  'C#m6_barre': { name: 'C# Minor 6th Barre', positions: [9, 11, 9, 10, 8, 11], fret: 9 },
  'C#9_barre': { name: 'C#9 Barre', positions: [9, 11, 9, 10, 9, 12], fret: 9 },
  'C#7#9_barre': { name: 'C#7#9 Barre', positions: [9, 11, 9, 10, 9, 13], fret: 9 },

  // D Root Chords (40 variations)
  'D': { name: 'D Major', positions: ['X', 'X', 0, 2, 3, 2] },
  'Dm': { name: 'D Minor', positions: ['X', 'X', 0, 2, 3, 1] },
  'D7': { name: 'D Dominant 7th', positions: ['X', 'X', 0, 2, 1, 2] },
  'Dm7': { name: 'D Minor 7th', positions: ['X', 'X', 0, 2, 1, 1] },
  'Dmaj7': { name: 'D Major 7th', positions: ['X', 'X', 0, 2, 2, 2] },
  'Dsus4': { name: 'D Suspended 4th', positions: ['X', 'X', 0, 2, 3, 3] },
  'Dsus2': { name: 'D Suspended 2nd', positions: ['X', 'X', 0, 2, 3, 0] },
  'Daug': { name: 'D Augmented', positions: ['X', 'X', 0, 3, 3, 2] },
  'Ddim': { name: 'D Diminished', positions: ['X', 'X', 0, 1, 3, 1] },
  'Ddim7': { name: 'D Diminished 7th', positions: ['X', 'X', 0, 1, 0, 1] },
  'Dadd9': { name: 'D Add9', positions: ['X', 'X', 0, 4, 3, 2] },
  'D6': { name: 'D6', positions: ['X', 'X', 0, 2, 0, 2] },
  'Dm6': { name: 'D Minor 6th', positions: ['X', 'X', 0, 2, 0, 1] },
  'D9': { name: 'D9', positions: ['X', 'X', 0, 2, 1, 0] },
  'Dmmaj7': { name: 'D Minor Major 7th', positions: ['X', 'X', 0, 2, 2, 1] },
  'D7#9': { name: 'D7#9', positions: ['X', 'X', 0, 2, 1, 3] },
  'Dmaj9': { name: 'D Major 9th', positions: ['X', 'X', 0, 2, 2, 0] },
  'Dm9': { name: 'D Minor 9th', positions: ['X', 'X', 0, 2, 1, 3] },
  'D7b9': { name: 'D7b9', positions: ['X', 'X', 0, 2, 1, 1] },
  'D7#5': { name: 'D7#5', positions: ['X', 'X', 0, 3, 1, 2] },
  'D7b5': { name: 'D7b5', positions: ['X', 'X', 0, 1, 1, 2] },
  'D11': { name: 'D11', positions: ['X', 'X', 3, 3, 3, 3] },
  'Dm11': { name: 'D Minor 11th', positions: ['X', 'X', 3, 3, 3, 5] },
  'D13': { name: 'D13', positions: ['X', 'X', 3, 5, 3, 5] },
  'Dm13': { name: 'D Minor 13th', positions: ['X', 'X', 3, 5, 3, 7] },
  'D_barre': { name: 'D Major Barre', positions: ['X', 5, 7, 7, 7, 5], fret: 5 },
  'Dm_barre': { name: 'D Minor Barre', positions: ['X', 5, 7, 7, 6, 5], fret: 5 },
  'D7_barre': { name: 'D Dominant 7th Barre', positions: ['X', 5, 7, 5, 7, 5], fret: 5 },
  'Dm7_barre': { name: 'D Minor 7th Barre', positions: ['X', 5, 7, 5, 6, 5], fret: 5 },
  'Dmaj7_barre': { name: 'D Major 7th Barre', positions: ['X', 5, 7, 6, 7, 5], fret: 5 },
  'Dsus4_barre': { name: 'D Suspended 4th Barre', positions: ['X', 5, 7, 7, 8, 5], fret: 5 },
  'Dsus2_barre': { name: 'D Suspended 2nd Barre', positions: ['X', 5, 7, 0, 7, 5], fret: 5 },
  'Daug_barre': { name: 'D Augmented Barre', positions: ['X', 5, 4, 3, 3, 'X'], fret: 3 },
  'Ddim_barre': { name: 'D Diminished Barre', positions: ['X', 5, 6, 4, 5, 'X'], fret: 4 },
  'Ddim7_barre': { name: 'D Diminished 7th Barre', positions: ['X', 5, 6, 4, 6, 'X'], fret: 4 },
  'Dadd9_barre': { name: 'D Add9 Barre', positions: ['X', 5, 7, 5, 7, 7], fret: 5 },
  'D6_barre': { name: 'D6 Barre', positions: ['X', 5, 7, 5, 5, 7], fret: 5 },
  'Dm6_barre': { name: 'D Minor 6th Barre', positions: ['X', 5, 7, 5, 5, 6], fret: 5 },
  'D9_barre': { name: 'D9 Barre', positions: ['X', 5, 7, 5, 5, 7], fret: 5 },
  'D7#9_barre': { name: 'D7#9 Barre', positions: ['X', 5, 7, 5, 5, 8], fret: 5 },

  // Eb Root Chords (40 variations)
  'Eb': { name: 'Eb Major', positions: ['X', 6, 8, 8, 8, 6] },
  'Ebm': { name: 'Eb Minor', positions: ['X', 6, 8, 8, 7, 6] },
  'Eb7': { name: 'Eb Dominant 7th', positions: ['X', 6, 8, 6, 8, 6] },
  'Ebm7': { name: 'Eb Minor 7th', positions: ['X', 6, 8, 6, 7, 6] },
  'Ebmaj7': { name: 'Eb Major 7th', positions: ['X', 6, 8, 7, 8, 6] },
  'Ebsus4': { name: 'Eb Suspended 4th', positions: ['X', 6, 8, 8, 9, 6] },
  'Ebsus2': { name: 'Eb Suspended 2nd', positions: ['X', 6, 8, 8, 6, 6] },
  'Ebaug': { name: 'Eb Augmented', positions: ['X', 6, 5, 4, 4, 'X'] },
  'Ebdim': { name: 'Eb Diminished', positions: ['X', 6, 7, 5, 6, 'X'] },
  'Ebdim7': { name: 'Eb Diminished 7th', positions: ['X', 6, 7, 5, 7, 5] },
  'Ebadd9': { name: 'Eb Add9', positions: ['X', 6, 8, 8, 8, 8] },
  'Eb6': { name: 'Eb6', positions: ['X', 6, 8, 8, 8, 8] },
  'Ebm6': { name: 'Eb Minor 6th', positions: ['X', 6, 8, 8, 7, 8] },
  'Eb9': { name: 'Eb9', positions: ['X', 6, 5, 6, 6, 6] },
  'Ebmmaj7': { name: 'Eb Minor Major 7th', positions: ['X', 6, 8, 7, 7, 6] },
  'Eb7#9': { name: 'Eb7#9', positions: ['X', 6, 8, 6, 8, 9] },
  'Ebmaj9': { name: 'Eb Major 9th', positions: ['X', 6, 5, 7, 8, 'X'] },
  'Ebm9': { name: 'Eb Minor 9th', positions: ['X', 6, 4, 6, 6, 6] },
  'Eb7b9': { name: 'Eb7b9', positions: ['X', 6, 5, 6, 5, 'X'] },
  'Eb7#5': { name: 'Eb7#5', positions: ['X', 6, 9, 6, 8, 'X'] },
  'Eb7b5': { name: 'Eb7b5', positions: ['X', 6, 7, 6, 7, 'X'] },
  'Eb11': { name: 'Eb11', positions: ['X', 6, 6, 6, 6, 6] },
  'Ebm11': { name: 'Eb Minor 11th', positions: ['X', 6, 6, 6, 6, 8] },
  'Eb13': { name: 'Eb13', positions: ['X', 6, 8, 6, 8, 8] },
  'Ebm13': { name: 'Eb Minor 13th', positions: ['X', 6, 8, 6, 8, 10] },
  'Eb_barre': { name: 'Eb Major Barre', positions: [11, 13, 13, 12, 11, 11], fret: 11 },
  'Ebm_barre': { name: 'Eb Minor Barre', positions: [11, 13, 13, 11, 11, 11], fret: 11 },
  'Eb7_barre': { name: 'Eb Dominant 7th Barre', positions: [11, 13, 11, 12, 11, 11], fret: 11 },
  'Ebm7_barre': { name: 'Eb Minor 7th Barre', positions: [11, 13, 11, 11, 11, 11], fret: 11 },
  'Ebmaj7_barre': { name: 'Eb Major 7th Barre', positions: [11, 13, 12, 12, 11, 11], fret: 11 },
  'Ebsus4_barre': { name: 'Eb Suspended 4th Barre', positions: [11, 13, 13, 13, 11, 11], fret: 11 },
  'Ebsus2_barre': { name: 'Eb Suspended 2nd Barre', positions: [11, 13, 5, 12, 11, 11], fret: 11 },
  'Ebaug_barre': { name: 'Eb Augmented Barre', positions: ['X', 11, 10, 9, 9, 'X'], fret: 9 },
  'Ebdim_barre': { name: 'Eb Diminished Barre', positions: ['X', 11, 9, 10, 9, 'X'], fret: 9 },
  'Ebdim7_barre': { name: 'Eb Diminished 7th Barre', positions: ['X', 11, 9, 10, 8, 'X'], fret: 8 },
  'Ebadd9_barre': { name: 'Eb Add9 Barre', positions: [11, 13, 11, 12, 11, 13], fret: 11 },
  'Eb6_barre': { name: 'Eb6 Barre', positions: [11, 13, 11, 12, 12, 11], fret: 11 },
  'Ebm6_barre': { name: 'Eb Minor 6th Barre', positions: [11, 13, 11, 12, 10, 11], fret: 11 },
  'Eb9_barre': { name: 'Eb9 Barre', positions: [11, 13, 11, 12, 12, 11], fret: 11 },
  'Eb7#9_barre': { name: 'Eb7#9 Barre', positions: [11, 13, 11, 12, 12, 13], fret: 11 },

  // E Root Chords (40 variations)
  'E': { name: 'E Major', positions: [0, 2, 2, 1, 0, 0] },
  'Em': { name: 'E Minor', positions: [0, 2, 2, 0, 0, 0] },
  'E7': { name: 'E Dominant 7th', positions: [0, 2, 0, 1, 0, 0] },
  'Em7': { name: 'E Minor 7th', positions: [0, 2, 0, 0, 0, 0] },
  'Emaj7': { name: 'E Major 7th', positions: [0, 2, 1, 1, 0, 0] },
  'Esus4': { name: 'E Suspended 4th', positions: [0, 2, 2, 2, 0, 0] },
  'Esus2': { name: 'E Suspended 2nd', positions: [0, 0, 2, 2, 0, 0] },
  'Eaug': { name: 'E Augmented', positions: [0, 3, 2, 1, 1, 0] },
  'Edim': { name: 'E Diminished', positions: ['X', 'X', 2, 3, 2, 3] },
  'Edim7': { name: 'E Diminished 7th', positions: [0, 1, 2, 0, 2, 0] },
  'Eadd9': { name: 'E Add9', positions: [0, 2, 4, 1, 0, 0] },
  'E6': { name: 'E6', positions: [0, 2, 2, 1, 2, 0] },
  'Em6': { name: 'E Minor 6th', positions: [0, 2, 2, 0, 2, 0] },
  'E9': { name: 'E9', positions: [0, 2, 0, 1, 0, 2] },
  'Emmaj7': { name: 'E Minor Major 7th', positions: [0, 2, 1, 0, 0, 0] },
  'E7#9': { name: 'E7#9', positions: ['X', 'X', 2, 4, 3, 5] },
  'Emaj9': { name: 'E Major 9th', positions: [0, 2, 1, 1, 0, 2] },
  'Em9': { name: 'E Minor 9th', positions: [0, 2, 0, 0, 0, 2] },
  'E7b9': { name: 'E7b9', positions: [0, 2, 0, 1, 0, 1] },
  'E7#5': { name: 'E7#5', positions: [0, 3, 0, 1, 2, 0] },
  'E7b5': { name: 'E7b5', positions: [0, 1, 0, 1, 'X', 'X'] },
  'E11': { name: 'E11', positions: [0, 2, 2, 2, 2, 2] },
  'Em11': { name: 'E Minor 11th', positions: [0, 2, 2, 2, 2, 4] },
  'E13': { name: 'E13', positions: [0, 4, 2, 2, 4, 4] },
  'Em13': { name: 'E Minor 13th', positions: [0, 4, 2, 2, 4, 6] },
  'E_barre': { name: 'E Major Barre', positions: ['X', 7, 9, 9, 9, 7], fret: 7 },
  'Em_barre': { name: 'E Minor Barre', positions: ['X', 7, 9, 9, 8, 7], fret: 7 },
  'E7_barre': { name: 'E Dominant 7th Barre', positions: ['X', 7, 9, 7, 9, 7], fret: 7 },
  'Em7_barre': { name: 'E Minor 7th Barre', positions: ['X', 7, 9, 7, 8, 7], fret: 7 },
  'Emaj7_barre': { name: 'E Major 7th Barre', positions: ['X', 7, 9, 8, 9, 7], fret: 7 },
  'Esus4_barre': { name: 'E Suspended 4th Barre', positions: ['X', 7, 9, 9, 10, 7], fret: 7 },
  'Esus2_barre': { name: 'E Suspended 2nd Barre', positions: ['X', 7, 9, 2, 9, 7], fret: 7 },
  'Eaug_barre': { name: 'E Augmented Barre', positions: ['X', 8, 7, 6, 6, 'X'], fret: 6 },
  'Edim_barre': { name: 'E Diminished Barre', positions: ['X', 8, 6, 7, 6, 'X'], fret: 6 },
  'Edim7_barre': { name: 'E Diminished 7th Barre', positions: ['X', 8, 6, 7, 5, 'X'], fret: 5 },
  'Eadd9_barre': { name: 'E Add9 Barre', positions: ['X', 7, 9, 9, 10, 9], fret: 7 },
  'E6_barre': { name: 'E6 Barre', positions: ['X', 7, 9, 7, 9, 7], fret: 7 },
  'Em6_barre': { name: 'E Minor 6th Barre', positions: ['X', 7, 9, 7, 8, 7], fret: 7 },
  'E9_barre': { name: 'E9 Barre', positions: ['X', 7, 9, 7, 9, 10], fret: 7 },
  'E7#9_barre': { name: 'E7#9 Barre', positions: ['X', 7, 9, 7, 9, 11], fret: 7 },

  // F Root Chords (40 variations)
  'F': { name: 'F Major', positions: [1, 3, 3, 2, 1, 1], fret: 1 },
  'Fm': { name: 'F Minor', positions: [1, 3, 3, 1, 1, 1], fret: 1 },
  'F7': { name: 'F Dominant 7th', positions: [1, 3, 1, 2, 1, 1], fret: 1 },
  'Fm7': { name: 'F Minor 7th', positions: [1, 3, 1, 1, 1, 1], fret: 1 },
  'Fmaj7': { name: 'F Major 7th', positions: [1, 3, 2, 2, 1, 1], fret: 1 },
  'Fsus4': { name: 'F Suspended 4th', positions: [1, 3, 3, 3, 1, 1], fret: 1 },
  'Fsus2': { name: 'F Suspended 2nd', positions: [1, 0, 3, 0, 1, 1], fret: 1 },
  'Faug': { name: 'F Augmented', positions: [1, 0, 3, 2, 2, 1], fret: 1 },
  'Fdim': { name: 'F Diminished', positions: [1, 2, 3, 1, 3, 'X'], fret: 1 },
  'Fdim7': { name: 'F Diminished 7th', positions: [1, 2, 0, 1, 0, 1], fret: 1 },
  'Fadd9': { name: 'F Add9', positions: [1, 0, 3, 2, 1, 3], fret: 1 },
  'F6': { name: 'F6', positions: [1, 3, 3, 2, 3, 1], fret: 1 },
  'Fm6': { name: 'F Minor 6th', positions: [1, 3, 3, 1, 3, 1], fret: 1 },
  'F9': { name: 'F9', positions: [1, 3, 1, 2, 1, 3], fret: 1 },
  'Fmmaj7': { name: 'F Minor Major 7th', positions: [1, 3, 2, 1, 1, 1], fret: 1 },
  'F7#9': { name: 'F7#9', positions: [1, 3, 1, 2, 1, 4], fret: 1 },
  'Fmaj9': { name: 'F Major 9th', positions: [1, 3, 0, 2, 1, 0], fret: 1 },
  'Fm9': { name: 'F Minor 9th', positions: [1, 3, 1, 1, 1, 3], fret: 1 },
  'F7b9': { name: 'F7b9', positions: [1, 3, 1, 2, 1, 2], fret: 1 },
  'F7#5': { name: 'F7#5', positions: [1, 4, 1, 3, 2, 1], fret: 1 },
  'F7b5': { name: 'F7b5', positions: [1, 'X', 2, 0, 1, 1], fret: 1 },
  'F11': { name: 'F11', positions: [1, 3, 3, 3, 3, 3], fret: 1 },
  'Fm11': { name: 'F Minor 11th', positions: [1, 3, 3, 3, 3, 5], fret: 1 },
  'F13': { name: 'F13', positions: [1, 5, 3, 3, 5, 5], fret: 1 },
  'Fm13': { name: 'F Minor 13th', positions: [1, 5, 3, 3, 5, 7], fret: 1 },
  'F_barre': { name: 'F Major Barre', positions: ['X', 8, 10, 10, 10, 8], fret: 8 },
  'Fm_barre': { name: 'F Minor Barre', positions: ['X', 8, 10, 10, 9, 8], fret: 8 },
  'F7_barre': { name: 'F Dominant 7th Barre', positions: ['X', 8, 10, 8, 10, 8], fret: 8 },
  'Fm7_barre': { name: 'F Minor 7th Barre', positions: ['X', 8, 10, 8, 9, 8], fret: 8 },
  'Fmaj7_barre': { name: 'F Major 7th Barre', positions: ['X', 8, 10, 9, 10, 8], fret: 8 },
  'Fsus4_barre': { name: 'F Suspended 4th Barre', positions: ['X', 8, 10, 10, 11, 8], fret: 8 },
  'Fsus2_barre': { name: 'F Suspended 2nd Barre', positions: ['X', 8, 10, 5, 10, 8], fret: 8 },
  'Faug_barre': { name: 'F Augmented Barre', positions: ['X', 9, 8, 7, 7, 'X'], fret: 7 },
  'Fdim_barre': { name: 'F Diminished Barre', positions: ['X', 9, 7, 8, 7, 'X'], fret: 7 },
  'Fdim7_barre': { name: 'F Diminished 7th Barre', positions: ['X', 9, 7, 8, 6, 'X'], fret: 6 },
  'Fadd9_barre': { name: 'F Add9 Barre', positions: ['X', 8, 10, 8, 10, 10], fret: 8 },
  'F6_barre': { name: 'F6 Barre', positions: ['X', 8, 10, 8, 10, 8], fret: 8 },
  'Fm6_barre': { name: 'F Minor 6th Barre', positions: ['X', 8, 10, 8, 9, 8], fret: 8 },
  'F9_barre': { name: 'F9 Barre', positions: ['X', 8, 10, 8, 10, 10], fret: 8 },
  'F7#9_barre': { name: 'F7#9 Barre', positions: ['X', 8, 10, 8, 10, 11], fret: 8 },

  // F# Root Chords (40 variations)
  'F#': { name: 'F# Major', positions: [2, 4, 4, 3, 2, 2], fret: 2 },
  'F#m': { name: 'F# Minor', positions: [2, 4, 4, 2, 2, 2], fret: 2 },
  'F#7': { name: 'F# Dominant 7th', positions: [2, 4, 2, 3, 2, 2], fret: 2 },
  'F#m7': { name: 'F# Minor 7th', positions: [2, 4, 2, 2, 2, 2], fret: 2 },
  'F#maj7': { name: 'F# Major 7th', positions: [2, 4, 3, 3, 2, 2], fret: 2 },
  'F#sus4': { name: 'F# Suspended 4th', positions: [2, 4, 4, 4, 2, 2], fret: 2 },
  'F#sus2': { name: 'F# Suspended 2nd', positions: [2, 4, 4, 1, 2, 2], fret: 2 },
  'F#aug': { name: 'F# Augmented', positions: [2, 'X', 4, 3, 3, 2], fret: 2 },
  'F#dim': { name: 'F# Diminished', positions: [2, 'X', 4, 3, 4, 'X'], fret: 2 },
  'F#dim7': { name: 'F# Diminished 7th', positions: [2, 'X', 2, 3, 2, 'X'], fret: 2 },
  'F#add9': { name: 'F# Add9', positions: [2, 4, 4, 3, 2, 4], fret: 2 },
  'F#6': { name: 'F#6', positions: [2, 4, 4, 3, 4, 2], fret: 2 },
  'F#m6': { name: 'F# Minor 6th', positions: [2, 4, 4, 2, 3, 2], fret: 2 },
  'F#9': { name: 'F#9', positions: [2, 4, 2, 3, 2, 4], fret: 2 },
  'F#mmaj7': { name: 'F# Minor Major 7th', positions: [2, 4, 3, 2, 2, 2], fret: 2 },
  'F#7#9': { name: 'F#7#9', positions: [2, 4, 2, 3, 2, 5], fret: 2 },
  'F#maj9': { name: 'F# Major 9th', positions: [2, 4, 1, 2, 'X', 'X'], fret: 2 },
  'F#m9': { name: 'F# Minor 9th', positions: [2, 4, 2, 2, 2, 4], fret: 2 },
  'F#7b9': { name: 'F#7b9', positions: [2, 4, 2, 3, 2, 3], fret: 2 },
  'F#7#5': { name: 'F#7#5', positions: [2, 5, 2, 4, 'X', 'X'], fret: 2 },
  'F#7b5': { name: 'F#7b5', positions: [2, 'X', 2, 3, 1, 'X'], fret: 2 },
  'F#11': { name: 'F#11', positions: [2, 4, 4, 4, 4, 4], fret: 2 },
  'F#m11': { name: 'F# Minor 11th', positions: [2, 4, 4, 4, 4, 6], fret: 2 },
  'F#13': { name: 'F#13', positions: [2, 6, 4, 4, 6, 6], fret: 2 },
  'F#m13': { name: 'F# Minor 13th', positions: [2, 6, 4, 4, 6, 8], fret: 2 },
  'F#_barre': { name: 'F# Major Barre', positions: [10, 12, 12, 11, 10, 10], fret: 10 },
  'F#m_barre': { name: 'F# Minor Barre', positions: [10, 12, 12, 11, 10, 9], fret: 10 },
  'F#7_barre': { name: 'F# Dominant 7th Barre', positions: [10, 12, 9, 11, 10, 9], fret: 10 },
  'F#m7_barre': { name: 'F# Minor 7th Barre', positions: [10, 12, 9, 10, 10, 9], fret: 10 },
  'F#maj7_barre': { name: 'F# Major 7th Barre', positions: [10, 12, 10, 11, 10, 9], fret: 10 },
  'F#sus4_barre': { name: 'F# Suspended 4th Barre', positions: [10, 12, 12, 12, 10, 9], fret: 10 },
  'F#sus2_barre': { name: 'F# Suspended 2nd Barre', positions: [10, 12, 6, 11, 10, 9], fret: 10 },
  'F#aug_barre': { name: 'F# Augmented Barre', positions: ['X', 10, 9, 8, 8, 'X'], fret: 8 },
  'F#dim_barre': { name: 'F# Diminished Barre', positions: ['X', 9, 10, 8, 10, 'X'], fret: 8 },
  'F#dim7_barre': { name: 'F# Diminished 7th Barre', positions: ['X', 9, 10, 7, 9, 'X'], fret: 7 },
  'F#add9_barre': { name: 'F# Add9 Barre', positions: [10, 12, 9, 10, 11, 9], fret: 10 },
  'F#6_barre': { name: 'F#6 Barre', positions: [10, 12, 9, 10, 9, 11], fret: 10 },
  'F#m6_barre': { name: 'F# Minor 6th Barre', positions: [10, 12, 9, 10, 8, 11], fret: 10 },
  'F#9_barre': { name: 'F#9 Barre', positions: [10, 12, 9, 10, 9, 12], fret: 10 },
  'F#7#9_barre': { name: 'F#7#9 Barre', positions: [10, 12, 9, 10, 9, 13], fret: 10 },

  // G Root Chords (40 variations)
  'G': { name: 'G Major', positions: [3, 2, 0, 0, 0, 3] },
  'Gm': { name: 'G Minor', positions: [3, 5, 5, 3, 3, 3], fret: 3 },
  'G7': { name: 'G Dominant 7th', positions: [3, 2, 0, 0, 0, 1] },
  'Gm7': { name: 'G Minor 7th', positions: [3, 5, 3, 3, 3, 3], fret: 3 },
  'Gmaj7': { name: 'G Major 7th', positions: [3, 2, 0, 0, 0, 2] },
  'Gsus4': { name: 'G Suspended 4th', positions: [3, 3, 0, 0, 0, 3] },
  'Gsus2': { name: 'G Suspended 2nd', positions: [3, 0, 0, 0, 3, 3] },
  'Gaug': { name: 'G Augmented', positions: [3, 2, 1, 0, 0, 3] },
  'Gdim': { name: 'G Diminished', positions: [3, 'X', 2, 3, 2, 'X'] },
  'Gdim7': { name: 'G Diminished 7th', positions: [3, 'X', 2, 3, 2, 1] },
  'Gadd9': { name: 'G Add9', positions: [3, 2, 0, 2, 0, 3] },
  'G6': { name: 'G6', positions: [3, 2, 0, 0, 0, 0] },
  'Gm6': { name: 'G Minor 6th', positions: [3, 5, 5, 3, 5, 3], fret: 3 },
  'G9': { name: 'G9', positions: [3, 'X', 0, 2, 0, 1] },
  'Gmmaj7': { name: 'G Minor Major 7th', positions: [3, 5, 4, 3, 3, 3], fret: 3 },
  'G7#9': { name: 'G7#9', positions: [3, 'X', 3, 4, 4, 'X'] },
  'Gmaj9': { name: 'G Major 9th', positions: [3, 'X', 0, 0, 0, 2] },
  'Gm9': { name: 'G Minor 9th', positions: [3, 5, 3, 3, 3, 5], fret: 3 },
  'G7b9': { name: 'G7b9', positions: [3, 'X', 3, 4, 3, 'X'] },
  'G7#5': { name: 'G7#5', positions: [3, 'X', 3, 4, 2, 'X'] },
  'G7b5': { name: 'G7b5', positions: [3, 'X', 2, 3, 1, 2, 'X'] },
  'G11': { name: 'G11', positions: [3, 'X', 3, 3, 3, 3] },
  'Gm11': { name: 'G Minor 11th', positions: [3, 'X', 3, 3, 3, 5] },
  'G13': { name: 'G13', positions: [3, 'X', 5, 3, 5, 5] },
  'Gm13': { name: 'G Minor 13th', positions: [3, 'X', 5, 3, 5, 7] },
  'G_barre': { name: 'G Major Barre', positions: ['X', 10, 12, 12, 12, 10], fret: 10 },
  'Gm_barre': { name: 'G Minor Barre', positions: ['X', 10, 12, 12, 11, 10], fret: 10 },
  'G7_barre': { name: 'G Dominant 7th Barre', positions: ['X', 10, 12, 10, 12, 10], fret: 10 },
  'Gm7_barre': { name: 'G Minor 7th Barre', positions: ['X', 10, 12, 10, 11, 10], fret: 10 },
  'Gmaj7_barre': { name: 'G Major 7th Barre', positions: ['X', 10, 12, 11, 12, 10], fret: 10 },
  'Gsus4_barre': { name: 'G Suspended 4th Barre', positions: ['X', 10, 12, 12, 13, 10], fret: 10 },
  'Gsus2_barre': { name: 'G Suspended 2nd Barre', positions: ['X', 10, 12, 7, 12, 10], fret: 10 },
  'Gaug_barre': { name: 'G Augmented Barre', positions: ['X', 11, 10, 9, 9, 'X'], fret: 9 },
  'Gdim_barre': { name: 'G Diminished Barre', positions: ['X', 11, 9, 10, 9, 'X'], fret: 9 },
  'Gdim7_barre': { name: 'G Diminished 7th Barre', positions: ['X', 11, 9, 10, 8, 'X'], fret: 8 },
  'Gadd9_barre': { name: 'G Add9 Barre', positions: ['X', 10, 12, 10, 12, 12], fret: 10 },
  'G6_barre': { name: 'G6 Barre', positions: ['X', 10, 12, 10, 12, 10], fret: 10 },
  'Gm6_barre': { name: 'G Minor 6th Barre', positions: ['X', 10, 12, 10, 11, 10], fret: 10 },
  'G9_barre': { name: 'G9 Barre', positions: ['X', 10, 12, 10, 12, 12], fret: 10 },
  'G7#9_barre': { name: 'G7#9 Barre', positions: ['X', 10, 12, 10, 12, 13], fret: 10 },

  // Ab Root Chords (40 variations)
  'Ab': { name: 'Ab Major', positions: [4, 6, 6, 5, 4, 4], fret: 4 },
  'Abm': { name: 'Ab Minor', positions: [4, 6, 6, 4, 4, 4], fret: 4 },
  'Ab7': { name: 'Ab Dominant 7th', positions: [4, 6, 4, 5, 4, 4], fret: 4 },
  'Abm7': { name: 'Ab Minor 7th', positions: [4, 6, 4, 4, 4, 4], fret: 4 },
  'Abmaj7': { name: 'Ab Major 7th', positions: [4, 6, 5, 5, 4, 4], fret: 4 },
  'Absus4': { name: 'Ab Suspended 4th', positions: [4, 6, 6, 6, 4, 4], fret: 4 },
  'Absus2': { name: 'Ab Suspended 2nd', positions: [4, 6, 6, 3, 4, 4], fret: 4 },
  'Abaug': { name: 'Ab Augmented', positions: [4, 'X', 2, 1, 1, 0], fret: 4 },
  'Abdim': { name: 'Ab Diminished', positions: [4, 'X', 5, 4, 5, 'X'], fret: 4 },
  'Abdim7': { name: 'Ab Diminished 7th', positions: [4, 'X', 3, 4, 3, 'X'], fret: 4 },
  'Abadd9': { name: 'Ab Add9', positions: [4, 6, 6, 5, 4, 6], fret: 4 },
  'Ab6': { name: 'Ab6', positions: [4, 6, 6, 5, 6, 4], fret: 4 },
  'Abm6': { name: 'Ab Minor 6th', positions: [4, 6, 6, 4, 5, 4], fret: 4 },
  'Ab9': { name: 'Ab9', positions: [4, 6, 4, 5, 4, 6], fret: 4 },
  'Abmmaj7': { name: 'Ab Minor Major 7th', positions: [4, 6, 5, 4, 4, 4], fret: 4 },
  'Ab7#9': { name: 'Ab7#9', positions: [4, 6, 4, 5, 4, 7], fret: 4 },
  'Abmaj9': { name: 'Ab Major 9th', positions: [4, 'X', 3, 1, 4, 'X'], fret: 4 },
  'Abm9': { name: 'Ab Minor 9th', positions: [4, 6, 4, 4, 4, 6], fret: 4 },
  'Ab7b9': { name: 'Ab7b9', positions: [4, 6, 4, 5, 4, 5], fret: 4 },
  'Ab7#5': { name: 'Ab7#5', positions: [4, 7, 4, 5, 4, 6], fret: 4 },
  'Ab7b5': { name: 'Ab7b5', positions: [4, 'X', 5, 4, 5, 'X'], fret: 4 },
  'Ab11': { name: 'Ab11', positions: [4, 6, 4, 4, 4, 4], fret: 4 },
  'Abm11': { name: 'Ab Minor 11th', positions: [4, 6, 4, 4, 4, 6], fret: 4 },
  'Ab13': { name: 'Ab13', positions: [4, 8, 4, 6, 6, 6], fret: 4 },
  'Abm13': { name: 'Ab Minor 13th', positions: [4, 8, 4, 6, 6, 8], fret: 4 },
  'Ab_barre': { name: 'Ab Major Barre', positions: [4, 6, 6, 5, 4, 4], fret: 4 },
  'Abm_barre': { name: 'Ab Minor Barre', positions: [4, 6, 6, 4, 4, 4], fret: 4 },
  'Ab7_barre': { name: 'Ab Dominant 7th Barre', positions: [4, 6, 4, 5, 4, 4], fret: 4 },
  'Abm7_barre': { name: 'Ab Minor 7th Barre', positions: [4, 6, 4, 4, 4, 4], fret: 4 },
  'Abmaj7_barre': { name: 'Ab Major 7th Barre', positions: [4, 6, 5, 5, 4, 4], fret: 4 },
  'Absus4_barre': { name: 'Ab Suspended 4th Barre', positions: [4, 6, 6, 6, 4, 4], fret: 4 },
  'Absus2_barre': { name: 'Ab Suspended 2nd Barre', positions: [4, 6, 6, 3, 4, 4], fret: 4 },
  'Abaug_barre': { name: 'Ab Augmented Barre', positions: [4, 'X', 5, 5, 4, 4], fret: 4 },
  'Abdim_barre': { name: 'Ab Diminished Barre', positions: [4, 'X', 5, 4, 5, 'X'], fret: 4 },
  'Abdim7_barre': { name: 'Ab Diminished 7th Barre', positions: [4, 'X', 5, 4, 5, 'X'], fret: 4 },
  'Abadd9_barre': { name: 'Ab Add9 Barre', positions: [4, 6, 4, 5, 4, 6], fret: 4 },
  'Ab6_barre': { name: 'Ab6 Barre', positions: [4, 6, 4, 5, 6, 4], fret: 4 },
  'Abm6_barre': { name: 'Ab Minor 6th Barre', positions: [4, 6, 4, 4, 5, 4], fret: 4 },
  'Ab9_barre': { name: 'Ab9 Barre', positions: [4, 6, 4, 5, 6, 6], fret: 4 },
  'Ab7#9_barre': { name: 'Ab7#9 Barre', positions: [4, 6, 4, 5, 6, 7], fret: 4 }
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

// Common pentatonic scales
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
