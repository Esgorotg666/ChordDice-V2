import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Music, BookOpen, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ChordData {
  chord: string;
  root: string;
  third: string;
  fifth: string;
  seventh?: string;
}

const minorChords: ChordData[] = [
  { chord: "Cm", root: "C", third: "E♭", fifth: "G" },
  { chord: "C♯m", root: "C♯", third: "E", fifth: "G♯" },
  { chord: "D♭m", root: "D♭", third: "F♭ (E)", fifth: "A♭" },
  { chord: "Dm", root: "D", third: "F", fifth: "A" },
  { chord: "D♯m", root: "D♯", third: "F♯", fifth: "A♯" },
  { chord: "E♭m", root: "E♭", third: "G♭", fifth: "B♭" },
  { chord: "Em", root: "E", third: "G", fifth: "B" },
  { chord: "Fm", root: "F", third: "A♭", fifth: "C" },
  { chord: "F♯m", root: "F♯", third: "A", fifth: "C♯" },
  { chord: "G♭m", root: "G♭", third: "B♭♭ (A)", fifth: "D♭" },
  { chord: "Gm", root: "G", third: "B♭", fifth: "D" },
  { chord: "G♯m", root: "G♯", third: "B", fifth: "D♯" },
  { chord: "A♭m", root: "A♭", third: "C♭ (B)", fifth: "E♭" },
  { chord: "Am", root: "A", third: "C", fifth: "E" },
  { chord: "A♯m", root: "A♯", third: "C♯", fifth: "E♯ (F)" },
  { chord: "B♭m", root: "B♭", third: "D♭", fifth: "F" },
  { chord: "Bm", root: "B", third: "D", fifth: "F♯" },
];

const majorChords: ChordData[] = [
  { chord: "C", root: "C", third: "E", fifth: "G" },
  { chord: "C♯", root: "C♯", third: "E♯ (F)", fifth: "G♯" },
  { chord: "D♭", root: "D♭", third: "F", fifth: "A♭" },
  { chord: "D", root: "D", third: "F♯", fifth: "A" },
  { chord: "D♯", root: "D♯", third: "F♯♯ (G)", fifth: "A♯" },
  { chord: "E♭", root: "E♭", third: "G", fifth: "B♭" },
  { chord: "E", root: "E", third: "G♯", fifth: "B" },
  { chord: "F", root: "F", third: "A", fifth: "C" },
  { chord: "F♯", root: "F♯", third: "A♯", fifth: "C♯" },
  { chord: "G♭", root: "G♭", third: "B♭", fifth: "D♭" },
  { chord: "G", root: "G", third: "B", fifth: "D" },
  { chord: "G♯", root: "G♯", third: "B♯ (C)", fifth: "D♯" },
  { chord: "A♭", root: "A♭", third: "C", fifth: "E♭" },
  { chord: "A", root: "A", third: "C♯", fifth: "E" },
  { chord: "A♯", root: "A♯", third: "C♯♯ (D)", fifth: "E♯ (F)" },
  { chord: "B♭", root: "B♭", third: "D", fifth: "F" },
  { chord: "B", root: "B", third: "D♯", fifth: "F♯" },
];

const dominant7Chords: ChordData[] = [
  { chord: "C7", root: "C", third: "E", fifth: "G", seventh: "B♭" },
  { chord: "C♯7", root: "C♯", third: "E♯ (F)", fifth: "G♯", seventh: "B" },
  { chord: "D♭7", root: "D♭", third: "F", fifth: "A♭", seventh: "C♭ (B)" },
  { chord: "D7", root: "D", third: "F♯", fifth: "A", seventh: "C" },
  { chord: "D♯7", root: "D♯", third: "F♯♯ (G)", fifth: "A♯", seventh: "C♯" },
  { chord: "E♭7", root: "E♭", third: "G", fifth: "B♭", seventh: "D♭" },
  { chord: "E7", root: "E", third: "G♯", fifth: "B", seventh: "D" },
  { chord: "F7", root: "F", third: "A", fifth: "C", seventh: "E♭" },
  { chord: "F♯7", root: "F♯", third: "A♯", fifth: "C♯", seventh: "E" },
  { chord: "G♭7", root: "G♭", third: "B♭", fifth: "D♭", seventh: "F♭ (E)" },
  { chord: "G7", root: "G", third: "B", fifth: "D", seventh: "F" },
  { chord: "G♯7", root: "G♯", third: "B♯ (C)", fifth: "D♯", seventh: "F♯" },
  { chord: "A♭7", root: "A♭", third: "C", fifth: "E♭", seventh: "G♭" },
  { chord: "A7", root: "A", third: "C♯", fifth: "E", seventh: "G" },
  { chord: "A♯7", root: "A♯", third: "C♯♯ (D)", fifth: "E♯ (F)", seventh: "G♯" },
  { chord: "B♭7", root: "B♭", third: "D", fifth: "F", seventh: "A♭" },
  { chord: "B7", root: "B", third: "D♯", fifth: "F♯", seventh: "A" },
];

const diminishedChords: ChordData[] = [
  { chord: "Cdim", root: "C", third: "E♭", fifth: "G♭" },
  { chord: "C♯dim", root: "C♯", third: "E", fifth: "G" },
  { chord: "D♭dim", root: "D♭", third: "F♭ (E)", fifth: "A♭♭ (G)" },
  { chord: "Ddim", root: "D", third: "F", fifth: "A♭" },
  { chord: "D♯dim", root: "D♯", third: "F♯", fifth: "A" },
  { chord: "E♭dim", root: "E♭", third: "G♭", fifth: "B♭♭ (A)" },
  { chord: "Edim", root: "E", third: "G", fifth: "B♭" },
  { chord: "Fdim", root: "F", third: "A♭", fifth: "C♭ (B)" },
  { chord: "F♯dim", root: "F♯", third: "A", fifth: "C" },
  { chord: "G♭dim", root: "G♭", third: "B♭♭ (A)", fifth: "D♭♭ (C)" },
  { chord: "Gdim", root: "G", third: "B♭", fifth: "D♭" },
  { chord: "G♯dim", root: "G♯", third: "B", fifth: "D" },
  { chord: "A♭dim", root: "A♭", third: "C♭ (B)", fifth: "E♭♭ (D)" },
  { chord: "Adim", root: "A", third: "C", fifth: "E♭" },
  { chord: "A♯dim", root: "A♯", third: "C♯", fifth: "E" },
  { chord: "B♭dim", root: "B♭", third: "D♭", fifth: "F♭ (E)" },
  { chord: "Bdim", root: "B", third: "D", fifth: "F" },
];

const augmentedChords: ChordData[] = [
  { chord: "C♭aug", root: "C♭", third: "E♭", fifth: "G" },
  { chord: "Caug", root: "C", third: "E", fifth: "G♯" },
  { chord: "C♯aug", root: "C♯", third: "E♯ (F)", fifth: "G♯♯ (A)" },
  { chord: "D♭aug", root: "D♭", third: "F", fifth: "A" },
  { chord: "Daug", root: "D", third: "F♯", fifth: "A♯" },
  { chord: "D♯aug", root: "D♯", third: "F♯♯ (G)", fifth: "A♯♯ (B)" },
  { chord: "E♭aug", root: "E♭", third: "G", fifth: "B" },
  { chord: "Eaug", root: "E", third: "G♯", fifth: "B♯ (C)" },
  { chord: "E♯aug", root: "E♯", third: "G♯♯ (A)", fifth: "B♯♯ (C♯)" },
  { chord: "F♭aug", root: "F♭", third: "A♭", fifth: "C" },
  { chord: "Faug", root: "F", third: "A", fifth: "C♯" },
  { chord: "F♯aug", root: "F♯", third: "A♯", fifth: "C♯♯ (D)" },
  { chord: "G♭aug", root: "G♭", third: "B♭", fifth: "D" },
  { chord: "Gaug", root: "G", third: "B", fifth: "D♯" },
  { chord: "G♯aug", root: "G♯", third: "B♯ (C)", fifth: "D♯♯ (E)" },
  { chord: "A♭aug", root: "A♭", third: "C", fifth: "E" },
  { chord: "Aaug", root: "A", third: "C♯", fifth: "E♯ (F)" },
  { chord: "A♯aug", root: "A♯", third: "C♯♯ (D)", fifth: "E♯♯ (F♯)" },
  { chord: "B♭aug", root: "B♭", third: "D", fifth: "F♯" },
  { chord: "Baug", root: "B", third: "D♯", fifth: "F♯♯ (G)" },
  { chord: "B♯aug", root: "B♯", third: "D♯♯ (E)", fifth: "F♯♯♯ (G♯)" },
];

function ChordTable({ 
  chords, 
  title, 
  description,
  showSeventh = false 
}: { 
  chords: ChordData[]; 
  title: string; 
  description: string;
  showSeventh?: boolean;
}) {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Music className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-2 sm:px-4 font-semibold text-primary">Chord</th>
                <th className="text-left py-3 px-2 sm:px-4 font-semibold text-primary">Root</th>
                <th className="text-left py-3 px-2 sm:px-4 font-semibold text-primary">
                  {showSeventh ? "Major 3rd" : title.includes("Minor") ? "Minor 3rd" : title.includes("Diminished") ? "Minor 3rd" : "Major 3rd"}
                </th>
                <th className="text-left py-3 px-2 sm:px-4 font-semibold text-primary">
                  {title.includes("Diminished") ? "Dim. 5th" : title.includes("Augmented") ? "Aug. 5th" : "Perfect 5th"}
                </th>
                {showSeventh && (
                  <th className="text-left py-3 px-2 sm:px-4 font-semibold text-primary">Minor 7th</th>
                )}
              </tr>
            </thead>
            <tbody>
              {chords.map((chord, index) => (
                <tr 
                  key={chord.chord} 
                  className={`border-b border-border/50 hover:bg-muted/50 transition-colors ${
                    index % 2 === 0 ? 'bg-muted/20' : ''
                  }`}
                  data-testid={`chord-row-${chord.chord}`}
                >
                  <td className="py-3 px-2 sm:px-4 font-bold text-primary">{chord.chord}</td>
                  <td className="py-3 px-2 sm:px-4">{chord.root}</td>
                  <td className="py-3 px-2 sm:px-4">{chord.third}</td>
                  <td className="py-3 px-2 sm:px-4">{chord.fifth}</td>
                  {showSeventh && (
                    <td className="py-3 px-2 sm:px-4">{chord.seventh}</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ChordReference() {
  const [selectedTab, setSelectedTab] = useState("major");

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-primary" />
            Chord Reference Guide
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Complete reference for chord formulas across all 12 keys
          </p>
        </div>

        {/* Info Alert */}
        <Alert className="mb-6 bg-primary/10 border-primary/30">
          <Info className="h-4 w-4" />
          <AlertDescription className="text-sm">
            Each table shows the notes that make up chords in all 12 keys. Enharmonic equivalents are shown in parentheses (e.g., E♯ = F).
          </AlertDescription>
        </Alert>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 mb-6">
            <TabsTrigger value="major" data-testid="tab-major">
              Major
            </TabsTrigger>
            <TabsTrigger value="minor" data-testid="tab-minor">
              Minor
            </TabsTrigger>
            <TabsTrigger value="dominant7" data-testid="tab-dominant7">
              Dom. 7th
            </TabsTrigger>
            <TabsTrigger value="diminished" data-testid="tab-diminished">
              Diminished
            </TabsTrigger>
            <TabsTrigger value="augmented" data-testid="tab-augmented">
              Augmented
            </TabsTrigger>
          </TabsList>

          <TabsContent value="major" className="space-y-4">
            <ChordTable
              chords={majorChords}
              title="Major Chords"
              description="Major triads consist of the root, major third, and perfect fifth"
            />
          </TabsContent>

          <TabsContent value="minor" className="space-y-4">
            <ChordTable
              chords={minorChords}
              title="Minor Chords"
              description="Minor triads consist of the root, minor third, and perfect fifth"
            />
          </TabsContent>

          <TabsContent value="dominant7" className="space-y-4">
            <ChordTable
              chords={dominant7Chords}
              title="Dominant Seventh Chords"
              description="Dominant 7th chords add a minor seventh to the major triad"
              showSeventh
            />
          </TabsContent>

          <TabsContent value="diminished" className="space-y-4">
            <ChordTable
              chords={diminishedChords}
              title="Diminished Chords"
              description="Diminished triads consist of the root, minor third, and diminished fifth"
            />
          </TabsContent>

          <TabsContent value="augmented" className="space-y-4">
            <ChordTable
              chords={augmentedChords}
              title="Augmented Chords"
              description="Augmented triads consist of the root, major third, and augmented fifth"
            />
          </TabsContent>
        </Tabs>

        {/* Educational Footer */}
        <Card className="mt-6 bg-muted/30 border-border">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2 text-sm">Understanding Chord Construction</h3>
            <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
              <li>• <strong>Major chords</strong>: Bright, happy sound with a major third interval</li>
              <li>• <strong>Minor chords</strong>: Darker, sadder sound with a minor third interval</li>
              <li>• <strong>Dominant 7th</strong>: Creates tension that wants to resolve, common in blues and jazz</li>
              <li>• <strong>Diminished</strong>: Unstable, tense sound often used as passing chords</li>
              <li>• <strong>Augmented</strong>: Dreamy, suspended sound with a raised fifth, creating tension and symmetry</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
