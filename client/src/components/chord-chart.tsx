import { chordTypes, getAllKeys, colorGroups } from "@/lib/music-data";

interface ChordChartProps {
  onChordSelect?: (chord: string) => void;
}

export default function ChordChart({ onChordSelect }: ChordChartProps) {
  const allKeys = getAllKeys();
  // Use only the 12 major keys for the chart (first 12 keys)
  const majorKeys = allKeys.slice(0, 12);

  // Vibrant color palette - no black/white, different colors for variety
  const getChordCellColor = (rowIndex: number, colIndex: number) => {
    const colors = [
      'bg-red-600',      'bg-blue-600',     'bg-green-600',    'bg-yellow-600',
      'bg-purple-600',   'bg-pink-600',     'bg-indigo-600',   'bg-orange-600',
      'bg-teal-600',     'bg-cyan-600',     'bg-lime-600',     'bg-rose-600',
      'bg-violet-600',   'bg-fuchsia-600',  'bg-emerald-600',  'bg-amber-600',
      'bg-sky-600',      'bg-red-700',      'bg-blue-700',     'bg-green-700',
      'bg-purple-700',   'bg-pink-700',     'bg-indigo-700',   'bg-orange-700'
    ];
    // Create pattern so adjacent cells have different colors
    const index = (rowIndex * 3 + colIndex * 2) % colors.length;
    return colors[index];
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
    <div className="bg-card rounded-lg p-4 border border-border overflow-x-auto">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <i className="fas fa-table mr-2 text-primary"></i>Chord Chart
      </h2>
      
      {/* Chart Header - Now showing all 12 major keys */}
      <div className="grid grid-cols-13 gap-2 mb-3 min-w-[900px]">
        <div className="text-center font-medium text-muted-foreground text-sm">Type</div>
        {majorKeys.map((key: string) => (
          <div key={key} className="text-center font-medium text-muted-foreground text-sm">
            {key}
          </div>
        ))}
      </div>

      {/* Chord Types and Grid */}
      <div className="space-y-2 min-w-[900px]">
        {chordTypes.map((chordType: string, rowIndex: number) => (
          <div key={chordType} className="grid grid-cols-13 gap-2">
            <div className="text-center py-3 bg-muted rounded text-muted-foreground font-medium text-sm flex items-center justify-center">
              {chordType === 'Major' ? 'Maj' : 
               chordType === 'Minor' ? 'Min' :
               chordType === 'Minor 6th' ? 'Min6' :
               chordType === 'Minor 7th' ? 'Min7' :
               chordType === 'Major 7th' ? 'Maj7' :
               chordType === 'Diminished' ? 'Dim' :
               chordType === 'Augmented' ? 'Aug' :
               chordType === 'Suspended' ? 'Sus' :
               chordType}
            </div>
            {majorKeys.map((key: string, colIndex: number) => {
              const chordDisplay = formatChordDisplay(key, chordType);
              const colorClass = getChordCellColor(rowIndex, colIndex);
              return (
                <div
                  key={`${key}-${chordType}`}
                  className={`chord-cell p-3 rounded-lg text-center text-white font-semibold text-base cursor-pointer hover:scale-105 transition-transform ${colorClass}`}
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
  );
}
