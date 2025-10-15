import { chordTypes, getAllKeys, colorGroups } from "@/lib/music-data";

interface ChordChartProps {
  onChordSelect?: (chord: string) => void;
}

export default function ChordChart({ onChordSelect }: ChordChartProps) {
  const allKeys = getAllKeys();
  // Use only the 12 major keys for the chart
  const majorKeys = allKeys.slice(0, 12);

  // Get color for a key using the colorGroups system
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
    return 'bg-gray-600'; // fallback
  };

  const formatChordDisplay = (key: string, chordType: string) => {
    const suffixes: Record<string, string> = {
      'Major': '',
      'Minor': 'm',
      '6th': '6',
      '7th': '7',
      '9th': '9',
      'Minor 6th': 'm6',
      'Minor 7th': 'm7',
      'Major 7th': 'M7',
      'Diminished': '°',
      'Augmented': '+',
      'Suspended': 'sus'
    };

    // For minor chord type, add 'm' to the key unless it already has it
    if (chordType === 'Minor') {
      return key.includes('m') ? key : key + 'm';
    }
    
    // For major chord type, use the key as-is (remove 'm' if present)
    if (chordType === 'Major') {
      return key.replace('m', '');
    }

    // For all other types, add the suffix
    return key + (suffixes[chordType] || '');
  };

  const handleChordClick = (chord: string) => {
    console.log('Selected chord:', chord);
    onChordSelect?.(chord);
  };

  return (
    <div className="bg-card rounded-lg p-3 md:p-4 border border-border">
      <h2 className="text-base md:text-lg font-semibold mb-3 md:mb-4 flex items-center">
        <i className="fas fa-table mr-2 text-primary"></i>Chord Chart
      </h2>
      
      <div className="overflow-x-auto -mx-3 md:mx-0 px-3 md:px-0">
        {/* Chart Header - 12 major keys */}
        <div className="grid grid-cols-13 gap-0.5 md:gap-1 mb-1 md:mb-2 min-w-[700px] md:min-w-[800px]">
          <div className="text-center font-bold text-muted-foreground text-[10px] md:text-xs p-1 md:p-2">Type</div>
          {majorKeys.map((key: string) => (
            <div key={key} className="text-center font-bold text-foreground text-xs md:text-sm p-1 md:p-2">
              {key}
            </div>
          ))}
        </div>

        {/* Chord Grid - 11 chord types × 12 keys */}
        <div className="space-y-0.5 md:space-y-1 min-w-[700px] md:min-w-[800px]">
          {chordTypes.map((chordType: string) => (
            <div key={chordType} className="grid grid-cols-13 gap-0.5 md:gap-1">
              <div className="text-center py-1.5 md:py-2 px-0.5 md:px-1 bg-muted rounded text-foreground font-bold text-[10px] md:text-xs flex items-center justify-center">
                {chordType === 'Major' ? 'Maj' : 
                 chordType === 'Minor' ? 'Min' :
                 chordType === '6th' ? '6th' :
                 chordType === '7th' ? '7th' :
                 chordType === '9th' ? '9th' :
                 chordType === 'Minor 6th' ? 'm6' :
                 chordType === 'Minor 7th' ? 'm7' :
                 chordType === 'Major 7th' ? 'M7' :
                 chordType === 'Diminished' ? 'Dim' :
                 chordType === 'Augmented' ? 'Aug' :
                 chordType === 'Suspended' ? 'Sus' :
                 chordType}
              </div>
              {majorKeys.map((key: string) => {
                const chordDisplay = formatChordDisplay(key, chordType);
                const colorClass = getKeyColor(key);
                return (
                  <div
                    key={`${key}-${chordType}`}
                    className={`${colorClass} p-1.5 md:p-2 rounded text-center text-white font-bold text-xs md:text-sm cursor-pointer active:scale-95 md:hover:scale-105 md:hover:brightness-110 transition-all touch-manipulation`}
                    onClick={() => handleChordClick(chordDisplay)}
                    data-testid={`chord-${key}-${chordType}`}
                  >
                    {chordDisplay}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
