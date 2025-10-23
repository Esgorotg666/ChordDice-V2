import { chordTypes, exoticChordTypes, getAllKeys, colorGroups } from "@/lib/music-data";
import { useSubscription } from "@/hooks/useSubscription";
import { Lock, Crown } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface ChordChartProps {
  onChordSelect?: (chord: string) => void;
}

export default function ChordChart({ onChordSelect }: ChordChartProps) {
  const { hasActiveSubscription } = useSubscription();
  const allKeys = getAllKeys();
  const majorKeys = allKeys.slice(0, 12);

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
    // Step 1: Convert Unicode symbols to ASCII
    let normalizedKey = key
      .replace(/♭/g, 'b')
      .replace(/♯/g, '#');
    
    // Step 2: Map enharmonic equivalents to match chordDiagrams keys
    const enharmonicMap: Record<string, string> = {
      'A#': 'Bb',
      'D#': 'Eb',
      'G#': 'Ab'
    };
    
    if (enharmonicMap[normalizedKey]) {
      normalizedKey = enharmonicMap[normalizedKey];
    }
    
    // Step 3: Add suffix based on chord type (matching chordDiagrams keys exactly)
    const suffixes: Record<string, string> = {
      'Major': '',
      'Minor': 'm',
      '6th': '6',
      '7th': '7',
      '9th': '9',
      'Minor 6th': 'm6',
      'Minor 7th': 'm7',
      'Major 7th': 'maj7',     // Fixed: was 'M7'
      'Diminished': 'dim',      // Fixed: was '°'
      'Augmented': 'aug',       // Fixed: was '+'
      'Suspended': 'sus4',
      '11th': '11',
      '13th': '13',
      'Minor 9th': 'm9',
      'Add9': 'add9',
      '6/9': '6/9',
      'Diminished 7th': 'dim7',   // Fixed: was '°7'
      'Half-diminished': 'm7b5',  // Fixed: was 'ø7'
      'Augmented 7th': '7#5'      // Fixed: was '+7'
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

  const handleChordClick = (chord: string) => {
    console.log('Selected chord:', chord);
    trackEvent('chord_click', 'ChordChart', chord, 1);
    onChordSelect?.(chord);
  };

  const renderChordGrid = (types: string[], title: string, isPremium: boolean = false) => (
    <div className="mb-6">
      <h3 className="text-sm md:text-base font-semibold mb-3 flex items-center">
        {isPremium && (
          <Crown className="h-4 w-4 mr-2 text-yellow-500" />
        )}
        {title}
        {isPremium && !hasActiveSubscription && (
          <Lock className="h-4 w-4 ml-2 text-muted-foreground" />
        )}
      </h3>
      
      <div className="overflow-x-auto -mx-3 md:mx-0 px-3 md:px-0">
        <div className="grid grid-cols-13 gap-0.5 md:gap-1 mb-1 md:mb-2 min-w-[700px] md:min-w-[800px]">
          <div className="text-center font-bold text-muted-foreground text-[10px] md:text-xs p-1 md:p-2">Type</div>
          {majorKeys.map((key: string) => (
            <div key={key} className="text-center font-bold text-foreground text-xs md:text-sm p-1 md:p-2">
              {key}
            </div>
          ))}
        </div>

        <div className="space-y-0.5 md:space-y-1 min-w-[700px] md:min-w-[800px]">
          {types.map((chordType: string) => (
            <div key={chordType} className="grid grid-cols-13 gap-0.5 md:gap-1">
              <div className="text-center py-1.5 md:py-2 px-0.5 md:px-1 bg-muted rounded text-foreground font-bold text-[10px] md:text-xs flex items-center justify-center">
                {getAbbreviation(chordType)}
              </div>
              {majorKeys.map((key: string) => {
                const chordDisplay = formatChordDisplay(key, chordType);
                const colorClass = getKeyColor(key);
                const isLocked = isPremium && !hasActiveSubscription;
                
                return (
                  <div
                    key={`${key}-${chordType}`}
                    className={`${colorClass} p-1.5 md:p-2 rounded text-center text-white font-bold text-xs md:text-sm ${
                      isLocked 
                        ? 'opacity-50 cursor-not-allowed relative' 
                        : 'cursor-pointer active:scale-95 md:hover:scale-105 md:hover:brightness-110'
                    } transition-all touch-manipulation`}
                    onClick={() => !isLocked && handleChordClick(chordDisplay)}
                    data-testid={`chord-${key}-${chordType}`}
                  >
                    {isLocked && (
                      <Lock className="h-3 w-3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    )}
                    <span className={isLocked ? 'opacity-0' : ''}>{chordDisplay}</span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-card rounded-lg p-3 md:p-4 border border-border">
      <h2 className="text-base md:text-lg font-semibold mb-3 md:mb-4 flex items-center">
        <i className="fas fa-table mr-2 text-primary"></i>Chord Chart
      </h2>
      
      {renderChordGrid(chordTypes, "Essential Chords", false)}
      
      {renderChordGrid(exoticChordTypes, "Exotic Chords (Premium)", true)}
    </div>
  );
}
