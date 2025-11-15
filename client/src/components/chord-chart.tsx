import { useState } from "react";
import { chordTypes, exoticChordTypes, getAllKeys, colorGroups } from "@/lib/music-data";
import { useSubscription } from "@/hooks/useSubscription";
import { Lock, Crown, X } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface ChordChartProps {
  onChordSelect?: (chord: string) => void;
}

export default function ChordChart({ onChordSelect }: ChordChartProps) {
  const { hasActiveSubscription } = useSubscription();
  const allKeys = getAllKeys();
  const majorKeys = allKeys.slice(0, 12);
  
  const [selectedRoot, setSelectedRoot] = useState<string | null>(null);
  const [showChordCards, setShowChordCards] = useState(false);

  const getKeyColor = (key: string): string => {
    for (const group of colorGroups) {
      if (group.keys.includes(key)) {
        switch(group.name) {
          case 'Red': return 'bg-red-600';
          case 'Orange': return 'bg-orange-600';
          case 'Yellow': return 'bg-yellow-600';
          case 'Green': return 'bg-green-600';
          case 'Blue': return 'bg-blue-600';
          case 'Purple': return 'bg-purple-600';
          case 'Dark Red': return 'bg-red-700';
          case 'Dark Orange': return 'bg-orange-700';
          default: return 'bg-gray-600';
        }
      }
    }
    return 'bg-gray-600';
  };

  const normalizeChordKey = (key: string, chordType: string): string => {
    let normalizedKey = key
      .replace(/♭/g, 'b')
      .replace(/♯/g, '#');
    
    const enharmonicMap: Record<string, string> = {
      'A#': 'Bb',
      'D#': 'Eb',
      'G#': 'Ab'
    };
    
    if (enharmonicMap[normalizedKey]) {
      normalizedKey = enharmonicMap[normalizedKey];
    }
    
    const suffixes: Record<string, string> = {
      'Major': '',
      'Minor': 'm',
      '6th': '6',
      '7th': '7',
      '9th': '9',
      'Minor 6th': 'm6',
      'Minor 7th': 'm7',
      'Major 7th': 'maj7',
      'Diminished': 'dim',
      'Augmented': 'aug',
      'Suspended': 'sus4',
      '11th': '11',
      '13th': '13',
      'Minor 9th': 'm9',
      'Add9': 'add9',
      '6/9': '6/9',
      'Diminished 7th': 'dim7',
      'Half-diminished': 'm7b5',
      'Augmented 7th': '7#5'
    };
    
    const suffix = suffixes[chordType] || '';
    return normalizedKey + suffix;
  };

  const formatChordDisplay = (key: string, chordType: string) => {
    return normalizeChordKey(key, chordType);
  };

  const getAbbreviation = (chordType: string): string => {
    const abbreviations: Record<string, string> = {
      'Major': 'Maj',
      'Minor': 'Min',
      '6th': '6th',
      '7th': '7th',
      '9th': '9th',
      'Minor 6th': 'm6',
      'Minor 7th': 'm7',
      'Major 7th': 'M7',
      'Diminished': 'Dim',
      'Augmented': 'Aug',
      'Suspended': 'sus4',
      '11th': '11',
      '13th': '13',
      'Minor 9th': 'm9',
      'Add9': 'add9',
      '6/9': '6/9',
      'Diminished 7th': '°7',
      'Half-diminished': 'ø7',
      'Augmented 7th': '+7'
    };
    return abbreviations[chordType] || chordType;
  };

  const handleRootNoteClick = (key: string) => {
    setSelectedRoot(key);
    setShowChordCards(true);
    trackEvent('root_note_click', 'ChordChart', key, 1);
  };

  const handleChordCardClick = (chord: string) => {
    trackEvent('chord_card_click', 'ChordChart', chord, 1);
    onChordSelect?.(chord);
    setShowChordCards(false);
  };

  const allChordTypes = [...chordTypes, ...exoticChordTypes];

  return (
    <div className="bg-card rounded-lg p-4 md:p-6 border border-border">
      <h2 className="text-base md:text-lg font-semibold mb-4 flex items-center">
        <i className="fas fa-music mr-2 text-primary"></i>
        Root Notes - Select to View Chords
      </h2>
      
      <p className="text-sm text-muted-foreground mb-4">
        Click any note to view all chord variations
      </p>

      {/* Root Note Grid - Playing Card Style */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 md:gap-4">
        {majorKeys.map((key: string) => {
          // Determine if note should be red (like red suits) or black (like black suits)
          // Using sharps/flats for red, naturals for black pattern
          const isRedNote = key.includes('#') || key.includes('♯') || key.includes('♭') || key.includes('b');
          const textColor = isRedNote ? '#dc2626' : '#000000'; // red-600 : black
          const borderColor = isRedNote ? '#dc2626' : '#000000';
          
          return (
            <button
              key={key}
              onClick={() => handleRootNoteClick(key)}
              className="aspect-square rounded-xl shadow-lg flex flex-col items-center justify-center
                cursor-pointer transform transition-all duration-200
                hover:scale-110 hover:shadow-2xl active:scale-95
                relative overflow-hidden group border-4"
              style={{
                backgroundColor: '#ffffff',
                borderColor: borderColor
              }}
              data-testid={`root-note-${key}`}
            >
              {/* Card shine effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              {/* Note name */}
              <span 
                className="text-3xl md:text-4xl font-bold relative z-10"
                style={{ color: textColor }}
              >
                {key}
              </span>
              <span 
                className="text-xs mt-1 relative z-10 opacity-60"
                style={{ color: textColor }}
              >
                Root Note
              </span>
            </button>
          );
        })}
      </div>

      {/* Transparent Playing Card Modal */}
      <Dialog open={showChordCards} onOpenChange={setShowChordCards}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-black/90 backdrop-blur-xl border-2 border-primary/30">
          <VisuallyHidden>
            <DialogTitle>{selectedRoot} Chord Family</DialogTitle>
            <DialogDescription>
              View all chord variations for the {selectedRoot} root note. Click any chord to view its fretboard diagram.
            </DialogDescription>
          </VisuallyHidden>
          <div className="relative">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-primary/30">
              <div className="flex items-center gap-3">
                <div className={`${getKeyColor(selectedRoot || '')} w-16 h-16 rounded-lg flex items-center justify-center shadow-xl`}>
                  <span className="text-3xl font-bold text-white">{selectedRoot}</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {selectedRoot} Chord Family
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Click any chord to view on fretboard
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowChordCards(false)}
                className="text-white hover:bg-white/10"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            {/* Essential Chords */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                Essential Chords
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {chordTypes.map((chordType: string) => {
                  const chordDisplay = formatChordDisplay(selectedRoot || '', chordType);
                  const colorClass = getKeyColor(selectedRoot || '');
                  
                  return (
                    <button
                      key={chordType}
                      onClick={() => handleChordCardClick(chordDisplay)}
                      className="group relative"
                      data-testid={`chord-card-${chordDisplay}`}
                    >
                      {/* Playing Card */}
                      <div className={`${colorClass} rounded-xl p-4 shadow-2xl
                        transform transition-all duration-200
                        hover:scale-105 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]
                        active:scale-95
                        backdrop-blur-sm bg-opacity-80
                        border-2 border-white/20
                        relative overflow-hidden`}
                      >
                        {/* Card shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        
                        {/* Chord name */}
                        <div className="text-center relative z-10">
                          <div className="text-3xl font-bold text-white mb-1">
                            {chordDisplay}
                          </div>
                          <div className="text-xs text-white/70 uppercase tracking-wider">
                            {chordType}
                          </div>
                        </div>

                        {/* Corner decorations */}
                        <div className="absolute top-2 left-2 text-white/30">
                          <i className="fas fa-music text-xs"></i>
                        </div>
                        <div className="absolute bottom-2 right-2 text-white/30">
                          <i className="fas fa-music text-xs"></i>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Exotic Chords (Premium) */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Crown className="h-5 w-5 text-yellow-500" />
                Exotic Chords
                {!hasActiveSubscription && (
                  <Lock className="h-4 w-4 text-muted-foreground ml-2" />
                )}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {exoticChordTypes.map((chordType: string) => {
                  const chordDisplay = formatChordDisplay(selectedRoot || '', chordType);
                  const colorClass = getKeyColor(selectedRoot || '');
                  const isLocked = !hasActiveSubscription;
                  
                  return (
                    <button
                      key={chordType}
                      onClick={() => !isLocked && handleChordCardClick(chordDisplay)}
                      className={`group relative ${isLocked ? 'cursor-not-allowed' : ''}`}
                      data-testid={`chord-card-${chordDisplay}`}
                    >
                      {/* Playing Card */}
                      <div className={`${colorClass} rounded-xl p-4 shadow-2xl
                        ${isLocked ? 'opacity-50' : 'hover:scale-105 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] active:scale-95'}
                        transform transition-all duration-200
                        backdrop-blur-sm bg-opacity-80
                        border-2 border-white/20
                        relative overflow-hidden`}
                      >
                        {/* Lock overlay for premium */}
                        {isLocked && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20">
                            <Lock className="h-8 w-8 text-white" />
                          </div>
                        )}

                        {/* Card shine effect */}
                        <div className={`absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-0 ${!isLocked && 'group-hover:opacity-100'} transition-opacity`}></div>
                        
                        {/* Chord name */}
                        <div className="text-center relative z-10">
                          <div className="text-3xl font-bold text-white mb-1">
                            {chordDisplay}
                          </div>
                          <div className="text-xs text-white/70 uppercase tracking-wider">
                            {chordType}
                          </div>
                        </div>

                        {/* Corner decorations */}
                        <div className="absolute top-2 left-2 text-white/30">
                          <i className="fas fa-music text-xs"></i>
                        </div>
                        <div className="absolute bottom-2 right-2 text-white/30">
                          <i className="fas fa-music text-xs"></i>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
