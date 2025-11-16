// Scale calculation engine for complete fretboard visualization

export interface FretPosition {
  string: number; // 0-5 (E, A, D, G, B, E)
  fret: number;   // 0-15
  note: string;   // Note name (e.g., "A", "C#", "Eb")
  isRoot: boolean;
}

// Standard guitar tuning in semitones from C
// Ordered from high E to low E to match UI display (top to bottom)
const STANDARD_TUNING = [4, 11, 7, 2, 9, 4]; // high E, B, G, D, A, low E
const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const NOTE_NAMES_FLAT = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];

// Convert note name to semitone (0-11)
function noteToSemitone(note: string): number {
  const cleanNote = note.replace(/[0-9]/g, "");
  let index = NOTE_NAMES.indexOf(cleanNote);
  if (index === -1) {
    index = NOTE_NAMES_FLAT.indexOf(cleanNote);
  }
  return index;
}

// Convert semitone to preferred note name based on scale context
function semitoneToNote(semitone: number, preferFlats: boolean = false): string {
  const noteArray = preferFlats ? NOTE_NAMES_FLAT : NOTE_NAMES;
  return noteArray[semitone % 12];
}

// Determine if scale uses flats based on key signature
function shouldUseFlats(rootNote: string): boolean {
  const flatKeys = ["F", "Bb", "Eb", "Ab", "Db", "Gb", "Cb"];
  return flatKeys.includes(rootNote);
}

// Convert scale formula (e.g., "1 - b3 - 4 - 5 - b7") to semitone intervals
export function formulaToIntervals(formula: string): number[] {
  const degreeMap: { [key: string]: number } = {
    "1": 0, "b2": 1, "2": 2, "#2": 3, "b3": 3, "3": 4, "4": 5,
    "#4": 6, "b5": 6, "5": 7, "#5": 8, "b6": 8, "6": 9,
    "bb7": 9, "b7": 10, "7": 11
  };

  const parts = formula.split("-").map(p => p.trim());
  const intervals: number[] = [];

  for (const part of parts) {
    if (degreeMap[part] !== undefined) {
      intervals.push(degreeMap[part]);
    }
  }

  return intervals;
}

// Generate all fret positions for a scale across the fretboard
export function generateScaleFretboard(
  rootNote: string,
  intervals: number[],
  numFrets: number = 15
): FretPosition[] {
  const positions: FretPosition[] = [];
  const rootSemitone = noteToSemitone(rootNote);
  const useFlats = shouldUseFlats(rootNote);

  // Calculate which semitones are in the scale
  const scaleNotes = intervals.map(interval => (rootSemitone + interval) % 12);

  // For each string
  for (let stringNum = 0; stringNum < 6; stringNum++) {
    const openStringSemitone = STANDARD_TUNING[stringNum];

    // For each fret (including open string at fret 0)
    for (let fret = 0; fret <= numFrets; fret++) {
      const fretSemitone = (openStringSemitone + fret) % 12;

      // Check if this fret contains a scale note
      if (scaleNotes.includes(fretSemitone)) {
        const noteName = semitoneToNote(fretSemitone, useFlats);
        const isRoot = fretSemitone === rootSemitone;

        positions.push({
          string: stringNum,
          fret,
          note: noteName,
          isRoot
        });
      }
    }
  }

  return positions;
}

// Get scale positions by pattern name and key
export function getScalePositions(
  scaleName: string,
  rootNote: string,
  scaleFormula: string
): FretPosition[] {
  const intervals = formulaToIntervals(scaleFormula);
  return generateScaleFretboard(rootNote, intervals);
}

// Generate position-based patterns (for box position display)
export function getScaleBoxPattern(positions: FretPosition[], startFret: number = 0): {
  fretRange: [number, number];
  positions: FretPosition[];
} {
  // Filter to positions within a 4-5 fret span starting from startFret
  const endFret = startFret + 5;
  const boxPositions = positions.filter(p => p.fret >= startFret && p.fret <= endFret);

  return {
    fretRange: [startFret, endFret],
    positions: boxPositions
  };
}
