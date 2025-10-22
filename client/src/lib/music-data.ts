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
    baseDiagram: { name: 'A Minor', positions: ['X', 0, 2, 2, 1, 0], fingers: [0, 0, 2, 3, 1, 0] },
    tapDiagram: { name: 'Cmaj7 (12th fret)', positions: ['X', 'X', 12, 12, 12, 15], fingers: [0, 0, 1, 1, 1, 4], fret: 12 },
    description: 'A minor base with Cmaj7 chord at 12th fret'
  },
  'E_Gmaj7': {
    baseChord: 'E',
    tapChord: 'Gmaj7',
    baseDiagram: { name: 'E Major', positions: [0, 2, 2, 1, 0, 0], fingers: [0, 2, 3, 1, 0, 0] },
    tapDiagram: { name: 'Gmaj7 (15th fret)', positions: ['X', 'X', 15, 16, 15, 17], fingers: [0, 0, 1, 3, 1, 4], fret: 15 },
    description: 'E major base with Gmaj7 voicing at 15th fret'
  },
  'Dm_Fmaj7': {
    baseChord: 'Dm',
    tapChord: 'Fmaj7',
    baseDiagram: { name: 'D Minor', positions: ['X', 'X', 0, 2, 3, 1], fingers: [0, 0, 0, 2, 3, 1] },
    tapDiagram: { name: 'Fmaj7 (13th fret)', positions: ['X', 'X', 13, 14, 13, 15], fingers: [0, 0, 1, 3, 1, 4], fret: 13 },
    description: 'D minor base with Fmaj7 chord at 13th fret'
  },
  'C_Em7': {
    baseChord: 'C',
    tapChord: 'Em7',
    baseDiagram: { name: 'C Major', positions: ['X', 3, 2, 0, 1, 0], fingers: [0, 3, 2, 0, 1, 0] },
    tapDiagram: { name: 'Em7 (12th fret)', positions: ['X', 'X', 12, 12, 12, 12], fingers: [0, 0, 1, 1, 1, 1], fret: 12 },
    description: 'C major base with Em7 voicing at 12th fret'
  },
  'G_Bm7': {
    baseChord: 'G',
    tapChord: 'Bm7',
    baseDiagram: { name: 'G Major', positions: [3, 2, 0, 0, 0, 3], fingers: [3, 2, 0, 0, 0, 4] },
    tapDiagram: { name: 'Bm7 (14th fret)', positions: ['X', 'X', 14, 14, 14, 14], fingers: [0, 0, 1, 1, 1, 1], fret: 14 },
    description: 'G major base with Bm7 chord at 14th fret'
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

// Common guitar chord diagrams - 175 chords (7 natural keys × 25 variations)
export const chordDiagrams: Record<string, ChordDiagram> = {
  // A chords (25 variations)
  'A': { name: 'A Major', positions: ['X', 0, 2, 2, 2, 0] },
  'Am': { name: 'A Minor', positions: ['X', 0, 2, 2, 1, 0] },
  'A7': { name: 'A Dominant 7th', positions: ['X', 0, 2, 0, 2, 0] },
  'Am7': { name: 'A Minor 7th', positions: ['X', 0, 2, 0, 1, 0] },
  'Amaj7': { name: 'A Major 7th', positions: ['X', 0, 2, 1, 2, 0] },
  'Asus4': { name: 'A Suspended 4th', positions: ['X', 0, 2, 2, 3, 0] },
  'Aaug': { name: 'A Augmented', positions: ['X', 0, 3, 2, 2, 1] },
  'Adim': { name: 'A Diminished', positions: ['X', 0, 2, 3, 2, 3] },
  'Adim7': { name: 'A Diminished 7th', positions: ['X', 0, 1, 2, 1, 2] },
  'Aadd9': { name: 'A Add9', positions: ['X', 0, 2, 4, 2, 0] },
  'A6': { name: 'A6', positions: ['X', 0, 2, 2, 2, 2] },
  'Am6': { name: 'A Minor 6th', positions: ['X', 0, 2, 2, 1, 2] },
  'A9': { name: 'A9', positions: ['X', 0, 2, 4, 2, 3] },
  'Ammaj7': { name: 'A Minor Major 7th', positions: ['X', 0, 2, 1, 1, 0] },
  'A7#9': { name: 'A7#9', positions: ['X', 0, 2, 3, 2, 5] },
  'Asus2': { name: 'A Suspended 2nd', positions: ['X', 0, 2, 2, 0, 0] },
  'A_barre': { name: 'A Major Barre', positions: [5, 7, 7, 6, 5, 5], fret: 5 },
  'Am_barre': { name: 'A Minor Barre', positions: [5, 7, 7, 5, 5, 5], fret: 5 },
  'A7_barre': { name: 'A Dominant 7th Barre', positions: [5, 7, 5, 6, 5, 5], fret: 5 },
  'Am7_barre': { name: 'A Minor 7th Barre', positions: [5, 7, 5, 5, 5, 5], fret: 5 },
  'Amaj7_barre': { name: 'A Major 7th Barre', positions: [5, 7, 6, 6, 5, 5], fret: 5 },
  'Asus4_barre': { name: 'A Suspended 4th Barre', positions: [5, 7, 7, 7, 5, 5], fret: 5 },
  'Aaug_barre': { name: 'A Augmented Barre', positions: ['X', 7, 6, 6, 6, 5], fret: 5 },
  'Adim_barre': { name: 'A Diminished Barre', positions: ['X', 7, 5, 6, 5, 6], fret: 5 },
  'Aadd9_barre': { name: 'A Add9 Barre', positions: [5, 7, 5, 6, 5, 7], fret: 5 },

  // B chords (25 variations)
  'B': { name: 'B Major', positions: ['X', 2, 4, 4, 4, 2] },
  'Bm': { name: 'B Minor', positions: ['X', 2, 4, 4, 3, 2] },
  'B7': { name: 'B Dominant 7th', positions: ['X', 2, 4, 2, 4, 2] },
  'Bm7': { name: 'B Minor 7th', positions: ['X', 2, 4, 2, 3, 2] },
  'Bmaj7': { name: 'B Major 7th', positions: ['X', 2, 4, 3, 4, 2] },
  'Bsus4': { name: 'B Suspended 4th', positions: ['X', 2, 4, 4, 5, 2] },
  'Baug': { name: 'B Augmented', positions: ['X', 2, 1, 0, 0, 3] },
  'Bdim': { name: 'B Diminished', positions: ['X', 2, 3, 4, 3, 'X'] },
  'Bdim7': { name: 'B Diminished 7th', positions: ['X', 2, 3, 1, 3, 1] },
  'Badd9': { name: 'B Add9', positions: ['X', 2, 4, 6, 4, 2] },
  'B6': { name: 'B6', positions: ['X', 2, 4, 4, 4, 4] },
  'Bm6': { name: 'B Minor 6th', positions: ['X', 2, 4, 4, 3, 4] },
  'B9': { name: 'B9', positions: ['X', 2, 4, 2, 2, 2] },
  'Bmmaj7': { name: 'B Minor Major 7th', positions: ['X', 2, 4, 3, 3, 'X'] },
  'B7#9': { name: 'B7#9', positions: ['X', 2, 4, 2, 4, 5] },
  'Bsus2': { name: 'B Suspended 2nd', positions: ['X', 2, 4, 4, 2, 2] },
  'B_barre': { name: 'B Major Barre', positions: [7, 9, 9, 8, 7, 7], fret: 7 },
  'Bm_barre': { name: 'B Minor Barre', positions: [7, 9, 9, 7, 7, 7], fret: 7 },
  'B7_barre': { name: 'B Dominant 7th Barre', positions: [7, 9, 7, 8, 7, 7], fret: 7 },
  'Bm7_barre': { name: 'B Minor 7th Barre', positions: [7, 9, 7, 7, 7, 7], fret: 7 },
  'Bmaj7_barre': { name: 'B Major 7th Barre', positions: [7, 9, 8, 8, 7, 7], fret: 7 },
  'Bsus4_barre': { name: 'B Suspended 4th Barre', positions: [7, 9, 9, 9, 7, 7], fret: 7 },
  'Baug_barre': { name: 'B Augmented Barre', positions: [8, 7, 6, 6, 6, 'X'], fret: 6 },
  'Bdim_barre': { name: 'B Diminished Barre', positions: [7, 8, 6, 7, 6, 'X'], fret: 6 },
  'Badd9_barre': { name: 'B Add9 Barre', positions: [7, 9, 7, 8, 7, 9], fret: 7 },

  // C chords (25 variations)
  'C': { name: 'C Major', positions: ['X', 3, 2, 0, 1, 0] },
  'Cm': { name: 'C Minor', positions: ['X', 3, 5, 5, 4, 3] },
  'C7': { name: 'C Dominant 7th', positions: ['X', 3, 2, 3, 1, 0] },
  'Cm7': { name: 'C Minor 7th', positions: ['X', 3, 5, 3, 4, 3] },
  'Cmaj7': { name: 'C Major 7th', positions: ['X', 3, 2, 0, 0, 0] },
  'Csus4': { name: 'C Suspended 4th', positions: ['X', 3, 3, 0, 1, 1] },
  'Caug': { name: 'C Augmented', positions: ['X', 3, 2, 1, 1, 0] },
  'Cdim': { name: 'C Diminished', positions: ['X', 3, 4, 5, 4, 'X'] },
  'Cdim7': { name: 'C Diminished 7th', positions: ['X', 3, 4, 2, 4, 'X'] },
  'Cadd9': { name: 'C Add9', positions: ['X', 3, 2, 0, 3, 0] },
  'C6': { name: 'C6', positions: ['X', 3, 2, 2, 1, 0] },
  'Cm6': { name: 'C Minor 6th', positions: ['X', 3, 5, 0, 4, 5] },
  'C9': { name: 'C9', positions: ['X', 3, 2, 3, 3, 0] },
  'Cmmaj7': { name: 'C Minor Major 7th', positions: ['X', 3, 5, 4, 4, 3] },
  'C7#9': { name: 'C7#9', positions: ['X', 3, 2, 3, 4, 'X'] },
  'Csus2': { name: 'C Suspended 2nd', positions: ['X', 3, 0, 0, 1, 0] },
  'C_barre': { name: 'C Major Barre', positions: [8, 10, 10, 9, 8, 8], fret: 8 },
  'Cm_barre': { name: 'C Minor Barre', positions: [3, 5, 5, 3, 3, 3], fret: 3 },
  'C7_barre': { name: 'C Dominant 7th Barre', positions: [8, 10, 8, 9, 8, 8], fret: 8 },
  'Cm7_barre': { name: 'C Minor 7th Barre', positions: [3, 5, 3, 3, 3, 3], fret: 3 },
  'Cmaj7_barre': { name: 'C Major 7th Barre', positions: [8, 10, 9, 9, 8, 8], fret: 8 },
  'Csus4_barre': { name: 'C Suspended 4th Barre', positions: [8, 10, 10, 10, 8, 8], fret: 8 },
  'Caug_barre': { name: 'C Augmented Barre', positions: ['X', 9, 8, 7, 7, 'X'], fret: 7 },
  'Cdim_barre': { name: 'C Diminished Barre', positions: ['X', 9, 7, 8, 7, 'X'], fret: 7 },
  'Cadd9_barre': { name: 'C Add9 Barre', positions: [8, 10, 8, 9, 8, 10], fret: 8 },

  // D chords (25 variations)
  'D': { name: 'D Major', positions: ['X', 'X', 0, 2, 3, 2] },
  'Dm': { name: 'D Minor', positions: ['X', 'X', 0, 2, 3, 1] },
  'D7': { name: 'D Dominant 7th', positions: ['X', 'X', 0, 2, 1, 2] },
  'Dm7': { name: 'D Minor 7th', positions: ['X', 'X', 0, 2, 1, 1] },
  'Dmaj7': { name: 'D Major 7th', positions: ['X', 'X', 0, 2, 2, 2] },
  'Dsus4': { name: 'D Suspended 4th', positions: ['X', 'X', 0, 2, 3, 3] },
  'Daug': { name: 'D Augmented', positions: ['X', 'X', 0, 3, 3, 2] },
  'Ddim': { name: 'D Diminished', positions: ['X', 'X', 0, 1, 3, 1] },
  'Ddim7': { name: 'D Diminished 7th', positions: ['X', 'X', 0, 1, 0, 1] },
  'Dadd9': { name: 'D Add9', positions: ['X', 'X', 0, 4, 3, 2] },
  'D6': { name: 'D6', positions: ['X', 'X', 0, 2, 0, 2] },
  'Dm6': { name: 'D Minor 6th', positions: ['X', 'X', 0, 2, 0, 1] },
  'D9': { name: 'D9', positions: ['X', 'X', 0, 2, 1, 0] },
  'Dmmaj7': { name: 'D Minor Major 7th', positions: ['X', 'X', 0, 2, 2, 1] },
  'D7#9': { name: 'D7#9', positions: ['X', 'X', 0, 2, 1, 3] },
  'Dsus2': { name: 'D Suspended 2nd', positions: ['X', 'X', 0, 2, 3, 0] },
  'D_barre': { name: 'D Major Barre', positions: ['X', 5, 7, 7, 7, 5], fret: 5 },
  'Dm_barre': { name: 'D Minor Barre', positions: ['X', 5, 7, 7, 6, 5], fret: 5 },
  'D7_barre': { name: 'D Dominant 7th Barre', positions: ['X', 5, 7, 5, 7, 5], fret: 5 },
  'Dm7_barre': { name: 'D Minor 7th Barre', positions: ['X', 5, 7, 5, 6, 5], fret: 5 },
  'Dmaj7_barre': { name: 'D Major 7th Barre', positions: ['X', 5, 7, 6, 7, 5], fret: 5 },
  'Dsus4_barre': { name: 'D Suspended 4th Barre', positions: ['X', 5, 7, 7, 8, 5], fret: 5 },
  'Daug_barre': { name: 'D Augmented Barre', positions: ['X', 5, 4, 3, 3, 'X'], fret: 3 },
  'Ddim_barre': { name: 'D Diminished Barre', positions: ['X', 5, 6, 4, 5, 'X'], fret: 4 },
  'Dadd9_barre': { name: 'D Add9 Barre', positions: ['X', 5, 7, 5, 7, 7], fret: 5 },

  // E chords (25 variations)
  'E': { name: 'E Major', positions: [0, 2, 2, 1, 0, 0] },
  'Em': { name: 'E Minor', positions: [0, 2, 2, 0, 0, 0] },
  'E7': { name: 'E Dominant 7th', positions: [0, 2, 0, 1, 0, 0] },
  'Em7': { name: 'E Minor 7th', positions: [0, 2, 0, 0, 0, 0] },
  'Emaj7': { name: 'E Major 7th', positions: [0, 2, 1, 1, 0, 0] },
  'Esus4': { name: 'E Suspended 4th', positions: [0, 2, 2, 2, 0, 0] },
  'Eaug': { name: 'E Augmented', positions: [0, 3, 2, 1, 1, 0] },
  'Edim': { name: 'E Diminished', positions: ['X', 'X', 2, 3, 2, 3] },
  'Edim7': { name: 'E Diminished 7th', positions: [0, 1, 2, 0, 2, 0] },
  'Eadd9': { name: 'E Add9', positions: [0, 2, 4, 1, 0, 0] },
  'E6': { name: 'E6', positions: [0, 2, 2, 1, 2, 0] },
  'Em6': { name: 'E Minor 6th', positions: [0, 2, 2, 0, 2, 0] },
  'E9': { name: 'E9', positions: [0, 2, 0, 1, 0, 2] },
  'Emmaj7': { name: 'E Minor Major 7th', positions: [0, 2, 1, 0, 0, 0] },
  'E7#9': { name: 'E7#9', positions: ['X', 'X', 2, 4, 3, 5] },
  'Esus2': { name: 'E Suspended 2nd', positions: [0, 0, 2, 2, 0, 0] },
  'E_barre': { name: 'E Major Barre', positions: ['X', 7, 9, 9, 9, 7], fret: 7 },
  'Em_barre': { name: 'E Minor Barre', positions: ['X', 7, 9, 9, 8, 7], fret: 7 },
  'E7_barre': { name: 'E Dominant 7th Barre', positions: ['X', 7, 9, 7, 9, 7], fret: 7 },
  'Em7_barre': { name: 'E Minor 7th Barre', positions: ['X', 7, 9, 7, 8, 7], fret: 7 },
  'Emaj7_barre': { name: 'E Major 7th Barre', positions: ['X', 7, 9, 8, 9, 7], fret: 7 },
  'Esus4_barre': { name: 'E Suspended 4th Barre', positions: ['X', 7, 9, 9, 10, 7], fret: 7 },
  'Eaug_barre': { name: 'E Augmented Barre', positions: ['X', 8, 7, 6, 6, 'X'], fret: 6 },
  'Edim_barre': { name: 'E Diminished Barre', positions: ['X', 8, 6, 7, 6, 'X'], fret: 6 },
  'Eadd9_barre': { name: 'E Add9 Barre', positions: ['X', 7, 9, 9, 10, 9], fret: 7 },

  // F chords (25 variations)
  'F': { name: 'F Major', positions: [1, 3, 3, 2, 1, 1], fret: 1 },
  'Fm': { name: 'F Minor', positions: [1, 3, 3, 1, 1, 1], fret: 1 },
  'F7': { name: 'F Dominant 7th', positions: [1, 3, 1, 2, 1, 1], fret: 1 },
  'Fm7': { name: 'F Minor 7th', positions: [1, 3, 1, 1, 1, 1], fret: 1 },
  'Fmaj7': { name: 'F Major 7th', positions: [1, 3, 2, 2, 1, 1], fret: 1 },
  'Fsus4': { name: 'F Suspended 4th', positions: [1, 3, 3, 3, 1, 1], fret: 1 },
  'Faug': { name: 'F Augmented', positions: [1, 0, 3, 2, 2, 1], fret: 1 },
  'Fdim': { name: 'F Diminished', positions: [1, 2, 3, 1, 3, 'X'], fret: 1 },
  'Fdim7': { name: 'F Diminished 7th', positions: [1, 2, 0, 1, 0, 1], fret: 1 },
  'Fadd9': { name: 'F Add9', positions: [1, 0, 3, 2, 1, 3], fret: 1 },
  'F6': { name: 'F6', positions: [1, 3, 3, 2, 3, 1], fret: 1 },
  'Fm6': { name: 'F Minor 6th', positions: [1, 3, 3, 1, 3, 1], fret: 1 },
  'F9': { name: 'F9', positions: [1, 3, 1, 2, 1, 3], fret: 1 },
  'Fmmaj7': { name: 'F Minor Major 7th', positions: [1, 3, 2, 1, 1, 1], fret: 1 },
  'F7#9': { name: 'F7#9', positions: [1, 3, 1, 2, 1, 4], fret: 1 },
  'Fsus2': { name: 'F Suspended 2nd', positions: [1, 0, 3, 0, 1, 1], fret: 1 },
  'F_barre': { name: 'F Major Barre', positions: ['X', 'X', 3, 2, 1, 1] },
  'Fm_barre': { name: 'F Minor Barre', positions: ['X', 'X', 3, 1, 1, 1] },
  'F7_barre': { name: 'F Dominant 7th Barre', positions: ['X', 'X', 3, 2, 1, 1] },
  'Fm7_barre': { name: 'F Minor 7th Barre', positions: ['X', 'X', 3, 1, 1, 1] },
  'Fmaj7_barre': { name: 'F Major 7th Barre', positions: ['X', 'X', 3, 2, 1, 0] },
  'Fsus4_barre': { name: 'F Suspended 4th Barre', positions: ['X', 'X', 3, 3, 1, 1] },
  'Faug_barre': { name: 'F Augmented Barre', positions: [1, 'X', 3, 2, 2, 1], fret: 1 },
  'Fdim_barre': { name: 'F Diminished Barre', positions: [1, 'X', 3, 1, 3, 'X'], fret: 1 },
  'Fadd9_barre': { name: 'F Add9 Barre', positions: ['X', 'X', 3, 2, 1, 3] },

  // G chords (25 variations)
  'G': { name: 'G Major', positions: [3, 2, 0, 0, 0, 3] },
  'Gm': { name: 'G Minor', positions: [3, 5, 5, 3, 3, 3], fret: 3 },
  'G7': { name: 'G Dominant 7th', positions: [3, 2, 0, 0, 0, 1] },
  'Gm7': { name: 'G Minor 7th', positions: [3, 5, 3, 3, 3, 3], fret: 3 },
  'Gmaj7': { name: 'G Major 7th', positions: [3, 2, 0, 0, 0, 2] },
  'Gsus4': { name: 'G Suspended 4th', positions: [3, 3, 0, 0, 0, 3] },
  'Gaug': { name: 'G Augmented', positions: [3, 2, 1, 0, 0, 3] },
  'Gdim': { name: 'G Diminished', positions: [3, 'X', 2, 3, 2, 'X'] },
  'Gdim7': { name: 'G Diminished 7th', positions: [3, 'X', 2, 3, 2, 1] },
  'Gadd9': { name: 'G Add9', positions: [3, 2, 0, 2, 0, 3] },
  'G6': { name: 'G6', positions: [3, 2, 0, 0, 0, 0] },
  'Gm6': { name: 'G Minor 6th', positions: [3, 5, 5, 3, 5, 3], fret: 3 },
  'G9': { name: 'G9', positions: [3, 'X', 0, 2, 0, 1] },
  'Gmmaj7': { name: 'G Minor Major 7th', positions: [3, 5, 4, 3, 3, 3], fret: 3 },
  'G7#9': { name: 'G7#9', positions: [3, 'X', 3, 4, 4, 'X'] },
  'Gsus2': { name: 'G Suspended 2nd', positions: [3, 0, 0, 0, 3, 3] },
  'G_barre': { name: 'G Major Barre', positions: ['X', 10, 12, 12, 12, 10], fret: 10 },
  'Gm_barre': { name: 'G Minor Barre', positions: ['X', 10, 12, 12, 11, 10], fret: 10 },
  'G7_barre': { name: 'G Dominant 7th Barre', positions: ['X', 10, 12, 10, 12, 10], fret: 10 },
  'Gm7_barre': { name: 'G Minor 7th Barre', positions: ['X', 10, 12, 10, 11, 10], fret: 10 },
  'Gmaj7_barre': { name: 'G Major 7th Barre', positions: ['X', 10, 12, 11, 12, 10], fret: 10 },
  'Gsus4_barre': { name: 'G Suspended 4th Barre', positions: ['X', 10, 12, 12, 13, 10], fret: 10 },
  'Gaug_barre': { name: 'G Augmented Barre', positions: ['X', 11, 10, 9, 9, 'X'], fret: 9 },
  'Gdim_barre': { name: 'G Diminished Barre', positions: ['X', 11, 9, 10, 9, 'X'], fret: 9 },
  'Gadd9_barre': { name: 'G Add9 Barre', positions: ['X', 10, 12, 10, 12, 12], fret: 10 }
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

// Musical keys for dice generation
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
