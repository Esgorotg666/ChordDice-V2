import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Guitar, Hand, Lightbulb, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import FretboardDisplay, { NoteMetadata } from "@/components/fretboard-display";
import { useAuthContext } from "@/contexts/AuthContext";
import { useSubscription } from "@/hooks/useSubscription";
import { getChordDiagram, ChordDiagram, chordDiagrams } from "@/lib/music-data";
import { Alert, AlertDescription } from "@/components/ui/alert";

const DICE_FACES = [1, 2, 3, 4, 5, 6, 7, 8];

// Two-hand tapping combinations: Left hand (fretting lower frets) → Right hand (tapping 7th fret+)
interface TappingCombination {
  leftHand: { chord: string; positions: (number | 'X')[]; fingers: number[] };
  rightHand: { chord: string; positions: (number | 'X')[]; fingers: number[] };
  description: string;
}

const TAPPING_COMBINATIONS: TappingCombination[] = [
  { 
    leftHand: { chord: 'Am', positions: ['X', 0, 2, 2, 1, 0], fingers: [0, 0, 2, 3, 1, 0] },
    rightHand: { chord: 'Cmaj7', positions: ['X', 'X', 10, 9, 8, 8], fingers: [0, 0, 4, 2, 1, 1] },
    description: 'A minor to C major 7 tapping (high position)'
  },
  { 
    leftHand: { chord: 'Em', positions: [0, 2, 2, 0, 0, 0], fingers: [0, 1, 2, 0, 0, 0] },
    rightHand: { chord: 'Gmaj9', positions: ['X', 'X', 12, 12, 12, 10], fingers: [0, 0, 2, 3, 4, 1] },
    description: 'E minor to G major 9 tapping (12th position)'
  },
  { 
    leftHand: { chord: 'C', positions: ['X', 3, 2, 0, 1, 0], fingers: [0, 3, 2, 0, 1, 0] },
    rightHand: { chord: 'Em9', positions: ['X', 'X', 9, 7, 8, 7], fingers: [0, 0, 3, 1, 2, 1] },
    description: 'C major to E minor 9 tapping (9th position)'
  },
  { 
    leftHand: { chord: 'G', positions: [3, 2, 0, 0, 0, 3], fingers: [2, 1, 0, 0, 0, 3] },
    rightHand: { chord: 'Bm7', positions: ['X', 'X', 9, 7, 7, 7], fingers: [0, 0, 3, 1, 1, 1] },
    description: 'G major to B minor 7 tapping (9th position)'
  },
  { 
    leftHand: { chord: 'D', positions: ['X', 'X', 0, 2, 3, 2], fingers: [0, 0, 0, 1, 3, 2] },
    rightHand: { chord: 'F#m7', positions: ['X', 'X', 11, 9, 10, 9], fingers: [0, 0, 3, 1, 2, 1] },
    description: 'D major to F# minor 7 tapping (11th position)'
  },
  { 
    leftHand: { chord: 'Am', positions: ['X', 0, 2, 2, 1, 0], fingers: [0, 0, 2, 3, 1, 0] },
    rightHand: { chord: 'Dm7', positions: ['X', 'X', 10, 10, 10, 10], fingers: [0, 0, 1, 1, 1, 1] },
    description: 'A minor to D minor 7 tapping (10th position)'
  },
  { 
    leftHand: { chord: 'E', positions: [0, 2, 2, 1, 0, 0], fingers: [0, 2, 3, 1, 0, 0] },
    rightHand: { chord: 'Amaj9', positions: ['X', 'X', 14, 13, 14, 14], fingers: [0, 0, 2, 1, 3, 4] },
    description: 'E major to A major 9 tapping (14th position)'
  },
  { 
    leftHand: { chord: 'Dm', positions: ['X', 'X', 0, 2, 3, 1], fingers: [0, 0, 0, 2, 3, 1] },
    rightHand: { chord: 'Gmaj7', positions: ['X', 'X', 12, 12, 12, 11], fingers: [0, 0, 2, 3, 4, 1] },
    description: 'D minor to G major 7 tapping (12th position)'
  }
];

// Get a random tapping combination
const getRandomTappingCombination = (): TappingCombination => {
  const randomIndex = Math.floor(Math.random() * TAPPING_COMBINATIONS.length);
  return TAPPING_COMBINATIONS[randomIndex];
};

export default function TappingPage() {
  const { user, isAuthenticated, isLoading } = useAuthContext();
  const { hasActiveSubscription } = useSubscription();
  
  const [leftHandChord, setLeftHandChord] = useState<string | null>(null);
  const [rightHandChord, setRightHandChord] = useState<string | null>(null);
  const [leftDice, setLeftDice] = useState<number[]>([1, 1]);
  const [rightDice, setRightDice] = useState<number[]>([1, 1]);
  const [isRollingLeft, setIsRollingLeft] = useState(false);
  const [isRollingRight, setIsRollingRight] = useState(false);

  // Create note metadata for fretboard display
  const createNoteMetadata = (diagram: ChordDiagram, isTapping: boolean): Map<number, NoteMetadata> => {
    const metadata = new Map<number, NoteMetadata>();
    
    diagram.positions.forEach((pos, stringIndex) => {
      if (typeof pos === 'number' && pos > 0) {
        const finger = diagram.fingers?.[stringIndex];
        metadata.set(stringIndex, {
          color: isTapping ? 'bg-orange-500' : 'bg-blue-500',
          label: isTapping ? 'Tap' : (typeof finger === 'number' ? finger.toString() : ''),
          type: isTapping ? 'tapping' : 'finger'
        });
      }
    });
    
    return metadata;
  };

  const [leftDiagram, setLeftDiagram] = useState<ChordDiagram | null>(null);
  const [rightDiagram, setRightDiagram] = useState<ChordDiagram | null>(null);

  const rollBothDice = () => {
    setIsRollingLeft(true);
    setIsRollingRight(true);
    
    // Animate both dice
    const interval = setInterval(() => {
      setLeftDice([
        DICE_FACES[Math.floor(Math.random() * 8)],
        DICE_FACES[Math.floor(Math.random() * 8)]
      ]);
      setRightDice([
        DICE_FACES[Math.floor(Math.random() * 8)],
        DICE_FACES[Math.floor(Math.random() * 8)]
      ]);
    }, 100);

    // Stop after animation and generate tapping combination
    setTimeout(() => {
      clearInterval(interval);
      const finalLeftDice = [
        DICE_FACES[Math.floor(Math.random() * 8)],
        DICE_FACES[Math.floor(Math.random() * 8)]
      ];
      const finalRightDice = [
        DICE_FACES[Math.floor(Math.random() * 8)],
        DICE_FACES[Math.floor(Math.random() * 8)]
      ];
      setLeftDice(finalLeftDice);
      setRightDice(finalRightDice);
      
      // Generate a random tapping combination with proper chord diagrams
      const combination = getRandomTappingCombination();
      setLeftHandChord(combination.leftHand.chord);
      setRightHandChord(combination.rightHand.chord);
      
      // Set the chord diagrams directly
      setLeftDiagram({
        name: combination.leftHand.chord,
        positions: combination.leftHand.positions,
        fingers: combination.leftHand.fingers
      });
      setRightDiagram({
        name: combination.rightHand.chord,
        positions: combination.rightHand.positions,
        fingers: combination.rightHand.fingers
      });
      
      setIsRollingLeft(false);
      setIsRollingRight(false);
    }, 1000);
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Premium gate
  if (!hasActiveSubscription) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <Link href="/">
                <Button variant="ghost" size="sm" data-testid="button-back">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <h1 className="text-lg font-semibold">Two-Hand Tapping</h1>
              <div className="w-20" />
            </div>
          </div>
        </header>

        {/* Premium Gate Content */}
        <div className="max-w-2xl mx-auto px-4 py-12">
          <Card className="p-8 text-center">
            <Crown className="h-16 w-16 mx-auto mb-4 text-amber-500" />
            <h2 className="text-2xl font-bold mb-2">Premium Feature</h2>
            <p className="text-muted-foreground mb-6">
              Two-Hand Tapping Practice is available exclusively for Premium subscribers.
            </p>
            <Link href="/">
              <Button size="lg" className="gap-2" data-testid="button-upgrade">
                <Crown className="h-4 w-4" />
                Upgrade to Premium
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" size="sm" data-testid="button-back">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-lg font-semibold">Two-Hand Tapping</h1>
            <Badge variant="default" className="gap-1">
              <Crown className="h-3 w-3" />
              Premium
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Tutorial Section */}
        <Card className="p-6 bg-muted/50" data-testid="tutorial-section">
          <div className="flex items-start gap-3">
            <Lightbulb className="h-6 w-6 text-amber-500 mt-1 flex-shrink-0" />
            <div className="space-y-3">
              <h2 className="text-xl font-bold">How Two-Hand Tapping Works</h2>
              <p className="text-muted-foreground">
                Two-hand tapping is an advanced guitar technique where you use both hands on the fretboard. 
                Your left hand (fretting hand) plays chords on the lower frets (0-3), while your right hand 
                (picking hand) taps notes on the higher frets (10-12) to create melodic patterns.
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Hand className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <strong className="text-sm">Left Hand (Blue):</strong>
                    <span className="text-sm text-muted-foreground ml-2">
                      Fret the chord positions shown on the lower fretboard
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Hand className="h-5 w-5 text-orange-500 mt-0.5" />
                  <div>
                    <strong className="text-sm">Right Hand (Orange):</strong>
                    <span className="text-sm text-muted-foreground ml-2">
                      Tap the notes shown on the higher fretboard with your picking hand
                    </span>
                  </div>
                </div>
              </div>
              <Alert>
                <AlertDescription>
                  <strong>Practice Tip:</strong> Roll each dice separately to generate chord combinations. 
                  The left dice generates chords for your fretting hand, and the right dice generates 
                  tapping patterns for your picking hand.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </Card>

        {/* Dice Section */}
        <Card className="p-6" data-testid="card-tapping-dice">
          <div className="text-center space-y-6">
            <h3 className="text-xl font-semibold">Roll Tapping Combination</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Hand Dice */}
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-2">
                  <Hand className="h-5 w-5 text-blue-500" />
                  <span className="text-sm font-semibold">Left Hand (Fretting)</span>
                </div>
                <div className="flex justify-center gap-4">
                  <div className="w-16 h-16 bg-card border-2 border-blue-500 rounded-lg flex items-center justify-center text-2xl font-bold" data-testid="dice-left-1">
                    {leftDice[0]}
                  </div>
                  <div className="w-16 h-16 bg-card border-2 border-blue-500 rounded-lg flex items-center justify-center text-2xl font-bold" data-testid="dice-left-2">
                    {leftDice[1]}
                  </div>
                </div>
                {leftHandChord && (
                  <Badge variant="outline" className="text-lg">
                    {leftHandChord}
                  </Badge>
                )}
              </div>

              {/* Right Hand Dice */}
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-2">
                  <Hand className="h-5 w-5 text-orange-500" />
                  <span className="text-sm font-semibold">Right Hand (Tapping)</span>
                </div>
                <div className="flex justify-center gap-4">
                  <div className="w-16 h-16 bg-card border-2 border-orange-500 rounded-lg flex items-center justify-center text-2xl font-bold" data-testid="dice-right-1">
                    {rightDice[0]}
                  </div>
                  <div className="w-16 h-16 bg-card border-2 border-orange-500 rounded-lg flex items-center justify-center text-2xl font-bold" data-testid="dice-right-2">
                    {rightDice[1]}
                  </div>
                </div>
                {rightHandChord && (
                  <Badge variant="outline" className="text-lg">
                    {rightHandChord}
                  </Badge>
                )}
              </div>
            </div>

            <Button 
              onClick={rollBothDice} 
              disabled={isRollingLeft || isRollingRight}
              size="lg"
              className="w-full md:w-auto px-12"
              data-testid="button-roll-tapping"
            >
              <Guitar className="h-5 w-5 mr-2" />
              {(isRollingLeft || isRollingRight) ? "Rolling..." : "Roll Tapping Combination"}
            </Button>
          </div>
        </Card>

        {/* Fretboard Display */}
        {(leftDiagram || rightDiagram) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Hand Fretboard */}
            {leftDiagram && (
              <Card className="p-6" data-testid="card-left-fretboard">
                <div className="mb-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Left Hand / {leftHandChord}</h3>
                    <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">Fretting</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Lower frets (0-3) - Fretting hand position
                  </p>
                </div>
                <FretboardDisplay
                  chordDiagram={leftDiagram}
                  chordName={leftHandChord || ''}
                  showLegend={false}
                  label="Left Hand"
                  noteMetadata={createNoteMetadata(leftDiagram, false)}
                />
              </Card>
            )}

            {/* Right Hand Fretboard */}
            {rightDiagram && (
              <Card className="p-6" data-testid="card-right-fretboard">
                <div className="mb-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Right Hand / {rightHandChord}</h3>
                    <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded">Tapping</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Higher frets (10-12) - Tapping hand position
                  </p>
                </div>
                <FretboardDisplay
                  chordDiagram={rightDiagram}
                  chordName={rightHandChord || ''}
                  showLegend={false}
                  label="Right Hand"
                  noteMetadata={createNoteMetadata(rightDiagram, true)}
                />
              </Card>
            )}
          </div>
        )}

        {/* Empty State */}
        {!leftDiagram && !rightDiagram && (
          <Card className="p-12 text-center" data-testid="empty-state">
            <Guitar className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">Ready to Practice</h3>
            <p className="text-muted-foreground">
              Roll the left and right dice to generate chord combinations for two-hand tapping practice
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
