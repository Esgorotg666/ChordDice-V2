import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FretboardDisplay, { NoteMetadata } from "@/components/fretboard-display";
import { getChordDiagram, ChordDiagram } from "@/lib/music-data";
import { Guitar, Info } from "lucide-react";

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

// Helper function to create note metadata for color coding
function createNoteMetadata(diagram: ChordDiagram, isTapping: boolean = false): Map<number, NoteMetadata> {
  const metadata = new Map<number, NoteMetadata>();
  
  // Find the root note (first fretted string or open string)
  let rootStringIndex = -1;
  for (let i = 0; i < diagram.positions.length; i++) {
    if (diagram.positions[i] !== 'X' && diagram.positions[i] !== undefined) {
      rootStringIndex = i;
      break;
    }
  }
  
  diagram.positions.forEach((position, stringIndex) => {
    if (position !== 'X' && position !== undefined) {
      if (isTapping) {
        // For tapping hand: ALL notes are orange (no separate root)
        metadata.set(stringIndex, {
          color: 'bg-orange-500',
          label: diagram.fingers?.[stringIndex]?.toString() || '',
          type: 'tapping'
        });
      } else {
        // For base hand: Root note gets purple, others get blue
        if (stringIndex === rootStringIndex) {
          metadata.set(stringIndex, {
            color: 'bg-purple-600',
            label: diagram.fingers?.[stringIndex]?.toString() || '',
            type: 'root'
          });
        } else {
          // Regular finger positions get blue color
          metadata.set(stringIndex, {
            color: 'bg-blue-600',
            label: diagram.fingers?.[stringIndex]?.toString() || '',
            type: 'finger'
          });
        }
      }
    }
  });
  
  return metadata;
}

interface ChordPair {
  baseChord: string;
  tapChord: string;
  baseDiagram: ChordDiagram | null;
  tapDiagram: ChordDiagram | null;
}

interface TappingSectionProps {
  currentChords?: string[];  // Current 4-chord progression
}

export default function TappingSection({ currentChords = [] }: TappingSectionProps) {
  const [selectedPair, setSelectedPair] = useState<ChordPair | null>(null);
  const [availablePairs, setAvailablePairs] = useState<ChordPair[]>([]);

  // Create tapping pairs from ANY consecutive chords in progression
  useEffect(() => {
    if (currentChords.length >= 2) {
      const pairs: ChordPair[] = [];
      
      // Create pairs from all consecutive chords
      for (let i = 0; i < currentChords.length - 1; i++) {
        const baseChord = normalizeChordName(currentChords[i].replace(/\s/g, ''));
        const tapChord = normalizeChordName(currentChords[i + 1].replace(/\s/g, ''));
        
        const baseDiagram = getChordDiagram(baseChord);
        const tapDiagram = getChordDiagram(tapChord);
        
        // Only add if both diagrams exist
        if (baseDiagram && tapDiagram) {
          pairs.push({
            baseChord,
            tapChord,
            baseDiagram,
            tapDiagram
          });
        }
      }
      
      setAvailablePairs(pairs);
      
      // Auto-select first pair
      if (pairs.length > 0) {
        setSelectedPair(pairs[0]);
      } else {
        setSelectedPair(null);
      }
    } else {
      setSelectedPair(null);
      setAvailablePairs([]);
    }
  }, [currentChords]);

  if (!selectedPair) {
    return (
      <Card className="p-8 text-center" data-testid="tapping-section-empty">
        <Guitar className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-xl font-semibold mb-2">No Tapping Combinations Available</h3>
        <p className="text-muted-foreground mb-4">
          Roll the dice to generate a chord progression with tapping patterns
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-6" data-testid="tapping-section">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
          <Guitar className="h-6 w-6" />
          Two-Hand Tapping
        </h2>
        <p className="text-muted-foreground text-sm">
          Left hand: {selectedPair.baseChord} / Right hand: {selectedPair.tapChord}
        </p>
      </div>

      {/* Tapping Selector (if multiple options) */}
      {availablePairs.length > 1 && (
        <div className="flex flex-wrap gap-2 justify-center">
          {availablePairs.map((pair, index) => (
            <Button
              key={`${pair.baseChord}_${pair.tapChord}`}
              variant={selectedPair === pair ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPair(pair)}
              data-testid={`button-select-tapping-${index}`}
            >
              {pair.baseChord} → {pair.tapChord}
            </Button>
          ))}
        </div>
      )}

      {/* Dual Fretboard Display - Responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Base Chord (Left Hand) */}
        <Card className="p-6" data-testid="card-base-fretboard">
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Left Hand / {selectedPair.baseChord}</h3>
              <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">Base</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Fret these notes with your fretting hand
            </p>
          </div>
          <FretboardDisplay
            chordDiagram={selectedPair.baseDiagram}
            chordName={selectedPair.baseChord}
            showLegend={false}
            label="Fretting Hand"
            noteMetadata={selectedPair.baseDiagram ? createNoteMetadata(selectedPair.baseDiagram, false) : undefined}
          />
        </Card>

        {/* Tapping Chord (Right Hand) */}
        <Card className="p-6" data-testid="card-tap-fretboard">
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Right Hand / {selectedPair.tapChord}</h3>
              <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded">Tap</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Tap these notes with your picking hand
            </p>
          </div>
          <FretboardDisplay
            chordDiagram={selectedPair.tapDiagram}
            chordName={selectedPair.tapChord}
            showLegend={false}
            label="Tapping Hand"
            noteMetadata={selectedPair.tapDiagram ? createNoteMetadata(selectedPair.tapDiagram, true) : undefined}
          />
        </Card>
      </div>

      {/* Legend */}
      <Card className="p-4 bg-muted/50" data-testid="tapping-legend">
        <div className="flex items-start gap-2">
          <Info className="h-5 w-5 text-muted-foreground mt-0.5" />
          <div className="text-sm space-y-2">
            <p className="font-medium">Color Guide:</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-purple-600 rounded-full"></div>
                <span className="text-muted-foreground">Root notes</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                <span className="text-muted-foreground">Tapping notes</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                <span className="text-muted-foreground">Finger positions</span>
              </div>
            </div>
            <p className="font-medium">How to play:</p>
            <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
              <li>Fret the base chord notes with your left hand</li>
              <li>Tap the <span className="text-orange-500 font-medium">orange notes</span> with your right hand fingers</li>
              <li>Notice the <span className="text-purple-600 font-medium">purple root notes</span> for musical reference</li>
              <li>Alternate between fretting and tapping for a fluid sound</li>
            </ol>
          </div>
        </div>
      </Card>
    </div>
  );
}
