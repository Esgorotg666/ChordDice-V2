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

// Open position chords (frets 0-7) - Left Hand
const OPEN_POSITION_CHORDS = [
  'C', 'Am', 'Em', 'G', 'D', 'A', 'E', 'Dm',
  'F', 'Cmaj7', 'Am7', 'Em7', 'Gmaj7', 'Dmaj7', 'Amaj7', 'Emaj7',
  'C7', 'A7', 'E7', 'G7', 'D7', 'Asus4', 'Esus4', 'Dsus4',
  'Cadd9', 'Aadd9', 'Eadd9', 'Gadd9', 'Dadd9', 'C6', 'Am6', 'Em6'
];

// High position chords (frets 9+) - Right Hand (tapping)
const HIGH_POSITION_CHORDS = [
  'C_barre', 'Am_barre', 'Em_barre', 'G_barre', 'D_barre', 'A_barre', 'E_barre', 'Dm_barre',
  'F_barre', 'Cmaj7_barre', 'Amaj7_barre', 'Emaj7_barre', 'Gmaj7_barre', 'Dmaj7_barre',
  'C7_barre', 'A7_barre', 'E7_barre', 'G7_barre', 'D7_barre',
  'Cm7_barre', 'Am7_barre', 'Em7_barre', 'Gm7_barre', 'Dm7_barre',
  'Cadd9_barre', 'Aadd9_barre', 'Eadd9_barre', 'Gadd9_barre', 'Dadd9_barre',
  'C9_barre', 'A9_barre', 'E9_barre', 'G9_barre', 'D9_barre'
];

export default function TappingPage() {
  const { user, isAuthenticated, isLoading } = useAuthContext();
  const { hasActiveSubscription, isLoading: subscriptionLoading } = useSubscription();
  
  const [leftHandChord, setLeftHandChord] = useState<string | null>(null);
  const [rightHandChord, setRightHandChord] = useState<string | null>(null);
  const [leftDice, setLeftDice] = useState<number[]>([1, 1]);
  const [rightDice, setRightDice] = useState<number[]>([1, 1]);
  const [isRollingLeft, setIsRollingLeft] = useState(false);
  const [isRollingRight, setIsRollingRight] = useState(false);

  // Create note metadata for fretboard display
  const createNoteMetadata = (diagram: ChordDiagram, isTapping: boolean): Map<number, NoteMetadata> => {
    const metadata = new Map<number, NoteMetadata>();
    
    // Find the root note (first fretted/open string for base hand only)
    let rootStringIndex = -1;
    if (!isTapping) {
      for (let i = 0; i < diagram.positions.length; i++) {
        if (diagram.positions[i] !== 'X' && diagram.positions[i] !== undefined) {
          rootStringIndex = i;
          break;
        }
      }
    }
    
    diagram.positions.forEach((pos, stringIndex) => {
      if (pos !== 'X' && pos !== undefined) {
        const finger = diagram.fingers?.[stringIndex];
        
        if (isTapping) {
          // For tapping hand: ALL notes are orange with finger numbers
          metadata.set(stringIndex, {
            color: 'bg-orange-500',
            label: typeof finger === 'number' ? finger.toString() : '',
            type: 'tapping'
          });
        } else {
          // For base hand: Root is purple, others are blue
          if (stringIndex === rootStringIndex) {
            metadata.set(stringIndex, {
              color: 'bg-purple-600',
              label: typeof finger === 'number' ? finger.toString() : '',
              type: 'root'
            });
          } else {
            metadata.set(stringIndex, {
              color: 'bg-blue-600',
              label: typeof finger === 'number' ? finger.toString() : '',
              type: 'finger'
            });
          }
        }
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
      
      // Use dice values to select chords from database (0-based indexing)
      const leftIndex = ((finalLeftDice[0] - 1) * 4 + (finalLeftDice[1] - 1)) % OPEN_POSITION_CHORDS.length;
      const rightIndex = ((finalRightDice[0] - 1) * 4 + (finalRightDice[1] - 1)) % HIGH_POSITION_CHORDS.length;
      
      const leftChordName = OPEN_POSITION_CHORDS[leftIndex];
      const rightChordName = HIGH_POSITION_CHORDS[rightIndex];
      
      setLeftHandChord(leftChordName);
      setRightHandChord(rightChordName);
      
      // Get chord diagrams from database
      const leftChordDiagram = getChordDiagram(leftChordName);
      const rightChordDiagram = getChordDiagram(rightChordName);
      
      if (leftChordDiagram) {
        setLeftDiagram(leftChordDiagram);
      } else {
        console.warn(`No diagram found for left hand chord: ${leftChordName}`);
        setLeftDiagram(null);
      }
      
      if (rightChordDiagram) {
        setRightDiagram(rightChordDiagram);
      } else {
        console.warn(`No diagram found for right hand chord: ${rightChordName}`);
        setRightDiagram(null);
      }
      
      setIsRollingLeft(false);
      setIsRollingRight(false);
    }, 1000);
  };

  // Show loading state - wait for both auth and subscription to load
  if (isLoading || subscriptionLoading) {
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
                  noteMetadata={leftDiagram ? createNoteMetadata(leftDiagram, false) : undefined}
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
                  noteMetadata={rightDiagram ? createNoteMetadata(rightDiagram, true) : undefined}
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
