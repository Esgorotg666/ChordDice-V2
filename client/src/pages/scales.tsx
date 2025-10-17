import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Music, Dices, Crown, Maximize2, Minimize2 } from "lucide-react";
import { Link } from "wouter";
import { getRandomCompatibleScales, type CompatibleScale } from "@/lib/music-data";
import { useSubscription } from "@/hooks/useSubscription";

interface DiceResult {
  value: number;
  rolling: boolean;
}

export default function ScalesPage() {
  const { data: user } = useQuery({ queryKey: ["/api/auth/user"] });
  const { hasActiveSubscription, isLoading: subscriptionLoading } = useSubscription();
  
  const [dice, setDice] = useState<DiceResult>({ value: 3, rolling: false });
  const [lastRoll, setLastRoll] = useState<string | null>(null);
  const [compatibleScales, setCompatibleScales] = useState<CompatibleScale[]>([]);
  const [chordProgression, setChordProgression] = useState<string[]>([]);
  const [showFullFretboard, setShowFullFretboard] = useState<boolean>(false);

  const rollDice = () => {
    if (dice.rolling) return;
    
    setDice({ value: dice.value, rolling: true });
    
    let rolls = 0;
    const maxRolls = 15;
    const interval = setInterval(() => {
      rolls++;
      const randomValue = Math.floor(Math.random() * 3) + 2; // 2-4
      setDice({ value: randomValue, rolling: true });
      
      if (rolls >= maxRolls) {
        clearInterval(interval);
        const finalValue = Math.floor(Math.random() * 3) + 2;
        setDice({ value: finalValue, rolling: false });
        generateScales(finalValue);
      }
    }, 80);
  };

  const generateScales = (count: number) => {
    // Use example chord progression for demo
    // In a real scenario, this would come from the user's last roll on home page
    const exampleProgressions = [
      ['C', 'Am', 'F', 'G'],
      ['G', 'D', 'Em', 'C'],
      ['Am', 'F', 'C', 'G'],
      ['D', 'A', 'Bm', 'G'],
      ['Em', 'C', 'G', 'D']
    ];
    
    const randomProg = exampleProgressions[Math.floor(Math.random() * exampleProgressions.length)];
    setChordProgression(randomProg);
    
    const scales = getRandomCompatibleScales(randomProg, count);
    setCompatibleScales(scales);
    setLastRoll(new Date().toISOString());
  };

  const renderFretboard = (scale: CompatibleScale) => {
    // Standard guitar tuning (low to high)
    const stringNotes = ['E', 'A', 'D', 'G', 'B', 'E'];
    const chromatic = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'];
    const totalFrets = showFullFretboard ? 24 : 12;
    
    // Fret marker positions (standard guitar inlays)
    const fretMarkers = [3, 5, 7, 9, 12, 15, 17, 19, 21, 24];
    const doubleMarkers = [12, 24];
    
    // Function to get note at a specific fret
    const getNoteAtFret = (openString: string, fret: number): string => {
      const openIndex = chromatic.indexOf(openString);
      if (openIndex === -1) return '';
      const noteIndex = (openIndex + fret) % 12;
      return chromatic[noteIndex];
    };
    
    // Normalize scale notes for comparison (handle flats vs sharps)
    const normalizeNote = (note: string): string => {
      const flatToSharp: Record<string, string> = {
        'D♭': 'C♯', 'E♭': 'D♯', 'G♭': 'F♯', 'A♭': 'G♯', 'B♭': 'A♯'
      };
      return flatToSharp[note] || note;
    };
    
    // Get the display note from scale.notes that matches the fretboard note
    const getDisplayNote = (fretNote: string): string => {
      const normalizedFret = normalizeNote(fretNote);
      const matchingScaleNote = scale.notes.find(n => normalizeNote(n) === normalizedFret);
      return matchingScaleNote || fretNote;
    };
    
    // Convert rgb() to rgba() with opacity
    const getRgbaColor = (rgbColor: string, opacity: number): string => {
      const match = rgbColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      if (match) {
        return `rgba(${match[1]}, ${match[2]}, ${match[3]}, ${opacity})`;
      }
      return rgbColor;
    };
    
    // Check if a note is an octave of the root
    const isOctave = (note: string, root: string): boolean => {
      return normalizeNote(note) === normalizeNote(root);
    };
    
    const normalizedScaleNotes = scale.notes.map(normalizeNote);
    const normalizedRoot = normalizeNote(scale.root);
    
    return (
      <div className="mt-3 space-y-2">
        {/* Fret Markers */}
        <div className="overflow-x-auto">
          <div className="flex items-center gap-1" style={{ minWidth: `${(totalFrets + 1) * 28 + 24}px` }}>
            <div className="w-6" /> {/* Spacer for string label */}
            {Array.from({ length: totalFrets + 1 }).map((_, fretIdx) => (
              <div key={fretIdx} className="w-7 h-4 flex items-center justify-center">
                {fretMarkers.includes(fretIdx) && (
                  <div className="flex gap-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/40" />
                    {doubleMarkers.includes(fretIdx) && (
                      <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/40" />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Fretboard */}
        <div className="overflow-x-auto">
          <div style={{ minWidth: `${(totalFrets + 1) * 28 + 24}px` }}>
            {stringNotes.map((openString, stringIdx) => (
              <div key={stringIdx} className="flex items-center gap-1 mb-1">
                <div className="w-6 text-xs font-mono text-muted-foreground">{openString}</div>
                <div className="flex gap-0.5">
                  {Array.from({ length: totalFrets + 1 }).map((_, fretIdx) => {
                    const noteAtFret = getNoteAtFret(openString, fretIdx);
                    const isScaleNote = normalizedScaleNotes.includes(normalizeNote(noteAtFret));
                    const isRootNote = normalizeNote(noteAtFret) === normalizedRoot;
                    const isOctaveNote = isOctave(noteAtFret, scale.root) && !isRootNote;
                    const displayNote = isScaleNote ? getDisplayNote(noteAtFret) : '';
                    
                    return (
                      <div
                        key={fretIdx}
                        className={`w-7 h-7 border flex items-center justify-center text-[10px] ${
                          isRootNote
                            ? 'border-[#D4AF37] text-white font-bold'
                            : isOctaveNote
                            ? 'border-[#D4AF37]/60 text-white font-bold'
                            : isScaleNote
                            ? 'border-border text-white'
                            : 'border-border/30 text-muted-foreground'
                        }`}
                        style={{
                          backgroundColor: isRootNote 
                            ? scale.mode.color 
                            : isOctaveNote
                            ? getRgbaColor(scale.mode.color, 0.7)
                            : isScaleNote 
                            ? getRgbaColor(scale.mode.color, 0.4)
                            : 'transparent'
                        }}
                        data-testid={`fret-${stringIdx}-${fretIdx}`}
                      >
                        {displayNote}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fret Number Labels */}
        <div className="overflow-x-auto">
          <div className="flex items-center gap-1" style={{ minWidth: `${(totalFrets + 1) * 28 + 24}px` }}>
            <div className="w-6" /> {/* Spacer for string label */}
            {Array.from({ length: totalFrets + 1 }).map((_, fretIdx) => (
              <div key={fretIdx} className="w-7 text-center text-[10px] text-muted-foreground/50">
                {fretIdx === 0 ? '' : fretIdx}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Premium gate
  if (subscriptionLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!hasActiveSubscription) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md border-red-900/50 bg-black/90">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-br from-red-700 to-red-900 p-4 border border-red-800">
                <Crown className="h-12 w-12 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
              Premium Feature
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              Compatible Scales is a premium feature. Upgrade to unlock the ability to discover 2-4 scales that work perfectly with your chord progressions.
            </p>
            <div className="space-y-2">
              <Link href="/account">
                <Button className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 border border-red-900" data-testid="button-upgrade">
                  Upgrade to Premium
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="w-full" data-testid="button-back-home">
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Music className="h-5 w-5 text-red-500" />
            <h1 className="text-lg font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">Compatible Scales</h1>
            <Badge variant="secondary" className="bg-red-900/30 text-red-400 border-red-800">
              Premium
            </Badge>
          </div>
          <Link href="/">
            <Button variant="outline" size="sm" data-testid="button-home">
              Home
            </Button>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Tutorial Section */}
        <Card className="border-red-900/50 bg-black/80">
          <CardHeader>
            <CardTitle className="text-red-500">What are Compatible Scales?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              Compatible scales are musical scales (modes) that work harmoniously with your chord progression. 
              Each scale contains the notes from your chords, making them perfect for improvisation and melody writing.
            </p>
            <p>
              <strong className="text-foreground">How to use:</strong> Roll the dice to generate 2-4 compatible scales. 
              Higher match scores mean more chord notes are in the scale. Mix and match these scales to create unique melodic ideas!
            </p>
          </CardContent>
        </Card>

        {/* Dice Interface */}
        <Card className="border-red-900/50 bg-black/80">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Dices className="h-5 w-5 text-red-500" />
              Roll for Scale Count
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center gap-4">
              <div
                className={`w-24 h-24 bg-gradient-to-br from-red-700 to-red-900 border-2 border-red-800 flex items-center justify-center ${
                  dice.rolling ? 'animate-dice-roll' : ''
                }`}
              >
                <span className="text-4xl font-bold text-white">{dice.value}</span>
              </div>
              <Button
                onClick={rollDice}
                disabled={dice.rolling}
                className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 border border-red-900"
                data-testid="button-roll-dice"
              >
                {dice.rolling ? 'Rolling...' : 'Roll Dice'}
              </Button>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Roll the dice to generate {dice.value} compatible scales
            </p>
          </CardContent>
        </Card>

        {/* Chord Progression */}
        {chordProgression.length > 0 && (
          <Card className="border-red-900/50 bg-black/80">
            <CardHeader>
              <CardTitle className="text-sm">Chord Progression</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 flex-wrap">
                {chordProgression.map((chord, idx) => (
                  <Badge key={idx} variant="outline" className="text-base py-2 px-4 border-red-800">
                    {chord}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Compatible Scales Display */}
        {compatibleScales.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-red-500">Compatible Scales ({compatibleScales.length})</h2>
            {compatibleScales.map((scale, idx) => (
              <Card key={idx} className="border-red-900/50 bg-black/80">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      {scale.root} {scale.mode.name}
                    </CardTitle>
                    <Badge 
                      variant="outline" 
                      className="border-red-800"
                      style={{ backgroundColor: `${scale.mode.color}20`, color: scale.mode.color }}
                    >
                      {scale.matchScore.toFixed(0)}% Match
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">{scale.mode.description}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-sm text-muted-foreground">Notes:</span>
                      {scale.notes.map((note, noteIdx) => (
                        <Badge key={noteIdx} variant="secondary" className="bg-card">
                          {note}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Formula: {scale.mode.degreeFormula.join(' - ')}</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-muted-foreground">Fretboard Pattern:</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowFullFretboard(!showFullFretboard)}
                        className="h-7 px-2 gap-1 text-xs"
                        data-testid="button-toggle-fretboard"
                      >
                        {showFullFretboard ? (
                          <>
                            <Minimize2 className="h-3 w-3" />
                            12 Frets
                          </>
                        ) : (
                          <>
                            <Maximize2 className="h-3 w-3" />
                            24 Frets
                          </>
                        )}
                      </Button>
                    </div>
                    {renderFretboard(scale)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {compatibleScales.length === 0 && lastRoll === null && (
          <Card className="border-red-900/50 bg-black/80">
            <CardContent className="py-12 text-center">
              <Dices className="h-16 w-16 text-red-500 mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">
                Roll the dice above to generate compatible scales for a chord progression
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
