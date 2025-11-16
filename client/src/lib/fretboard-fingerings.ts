import { z } from 'zod';

// Finger position for a specific fret on a string
export const fingerPositionSchema = z.object({
  string: z.number().min(0).max(5), // 0 = high E, 5 = low E
  fret: z.number().min(0).max(24),
  finger: z.number().min(1).max(4), // 1 = index, 2 = middle, 3 = ring, 4 = pinky
  note: z.string(), // Note name for reference
  isRoot: z.boolean().optional(),
});

export type FingerPosition = z.infer<typeof fingerPositionSchema>;

// Fingering pattern for a scale in a specific position
export const fingeringPatternSchema = z.object({
  scaleId: z.string(), // e.g., "minor_pentatonic", "dorian"
  key: z.string(), // e.g., "A", "C", "E"
  position: z.string(), // e.g., "box1", "box2", "open"
  name: z.string(), // Human-readable name
  description: z.string().optional(),
  startFret: z.number(),
  endFret: z.number(),
  positions: z.array(fingerPositionSchema),
});

export type FingeringPattern = z.infer<typeof fingeringPatternSchema>;

// Curated fingering patterns library
// Starting with box position 1 (most common patterns)
export const fingeringPatterns: FingeringPattern[] = [
  // A Minor Pentatonic - Box 1 (5th fret position)
  {
    scaleId: "minor_pentatonic",
    key: "A",
    position: "box1",
    name: "A Minor Pentatonic - Box 1",
    description: "Most common minor pentatonic pattern, starting at 5th fret",
    startFret: 5,
    endFret: 8,
    positions: [
      // High E string
      { string: 0, fret: 5, finger: 1, note: "A", isRoot: true },
      { string: 0, fret: 8, finger: 4, note: "C" },
      // B string
      { string: 1, fret: 5, finger: 1, note: "E" },
      { string: 1, fret: 8, finger: 4, note: "G" },
      // G string
      { string: 2, fret: 5, finger: 1, note: "C" },
      { string: 2, fret: 7, finger: 3, note: "D" },
      // D string
      { string: 3, fret: 5, finger: 1, note: "G" },
      { string: 3, fret: 7, finger: 3, note: "A", isRoot: true },
      // A string
      { string: 4, fret: 5, finger: 1, note: "D" },
      { string: 4, fret: 7, finger: 3, note: "E" },
      // Low E string
      { string: 5, fret: 5, finger: 1, note: "A", isRoot: true },
      { string: 5, fret: 8, finger: 4, note: "C" },
    ],
  },

  // C Major Pentatonic - Box 1 (8th fret position)
  {
    scaleId: "major_pentatonic",
    key: "C",
    position: "box1",
    name: "C Major Pentatonic - Box 1",
    description: "Common major pentatonic pattern",
    startFret: 8,
    endFret: 11,
    positions: [
      // High E string
      { string: 0, fret: 8, finger: 1, note: "C", isRoot: true },
      { string: 0, fret: 10, finger: 3, note: "D" },
      // B string
      { string: 1, fret: 8, finger: 1, note: "G" },
      { string: 1, fret: 10, finger: 3, note: "A" },
      // G string
      { string: 2, fret: 9, finger: 2, note: "E" },
      { string: 2, fret: 10, finger: 3, note: "G" },
      // D string
      { string: 3, fret: 10, finger: 2, note: "C", isRoot: true },
      { string: 3, fret: 12, finger: 4, note: "D" },
      // A string
      { string: 4, fret: 8, finger: 1, note: "E" },
      { string: 4, fret: 10, finger: 3, note: "G" },
      // Low E string
      { string: 5, fret: 8, finger: 1, note: "C", isRoot: true },
      { string: 5, fret: 10, finger: 3, note: "D" },
    ],
  },

  // A Dorian Mode - 3-note-per-string pattern
  {
    scaleId: "dorian",
    key: "A",
    position: "box1",
    name: "A Dorian - Box 1",
    description: "Common Dorian mode fingering",
    startFret: 5,
    endFret: 9,
    positions: [
      // High E string
      { string: 0, fret: 5, finger: 1, note: "A", isRoot: true },
      { string: 0, fret: 7, finger: 3, note: "B" },
      { string: 0, fret: 8, finger: 4, note: "C" },
      // B string
      { string: 1, fret: 5, finger: 1, note: "E" },
      { string: 1, fret: 7, finger: 3, note: "F#" },
      { string: 1, fret: 8, finger: 4, note: "G" },
      // G string
      { string: 2, fret: 5, finger: 1, note: "C" },
      { string: 2, fret: 7, finger: 3, note: "D" },
      { string: 2, fret: 9, finger: 4, note: "E" },
      // D string
      { string: 3, fret: 5, finger: 1, note: "G" },
      { string: 3, fret: 7, finger: 3, note: "A", isRoot: true },
      { string: 3, fret: 9, finger: 4, note: "B" },
      // A string
      { string: 4, fret: 5, finger: 1, note: "D" },
      { string: 4, fret: 7, finger: 3, note: "E" },
      { string: 4, fret: 8, finger: 4, note: "F#" },
      // Low E string
      { string: 5, fret: 5, finger: 1, note: "A", isRoot: true },
      { string: 5, fret: 7, finger: 3, note: "B" },
      { string: 5, fret: 8, finger: 4, note: "C" },
    ],
  },
];

// Get fingering pattern for a specific scale, key, and position
export const getFingeringPattern = (
  scaleId: string,
  key: string,
  position: string = "box1"
): FingeringPattern | null => {
  const pattern = fingeringPatterns.find(
    (p) => p.scaleId === scaleId && p.key === key && p.position === position
  );
  return pattern || null;
};

// Get all available fingering patterns for a scale and key
export const getFingeringPatternsForScale = (
  scaleId: string,
  key: string
): FingeringPattern[] => {
  return fingeringPatterns.filter(
    (p) => p.scaleId === scaleId && p.key === key
  );
};

// Check if fingering pattern exists for scale/key combination
export const hasFingeringPattern = (scaleId: string, key: string): boolean => {
  return fingeringPatterns.some(
    (p) => p.scaleId === scaleId && p.key === key
  );
};
