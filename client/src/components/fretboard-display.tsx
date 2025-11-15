import { ChordDiagram } from "@/lib/music-data";

export interface NoteMetadata {
  color: string;
  label?: string;
  type?: 'root' | 'tapping' | 'interval' | 'finger';
}

interface FretboardDisplayProps {
  chordDiagram: ChordDiagram | null;
  chordName: string;
  showLegend?: boolean;
  highlightColor?: string;
  label?: string;
  noteMetadata?: Map<number, NoteMetadata>;
}

export default function FretboardDisplay({ 
  chordDiagram, 
  chordName, 
  showLegend = true,
  highlightColor = "bg-blue-600",
  label,
  noteMetadata
}: FretboardDisplayProps) {
  const strings = ['E', 'A', 'D', 'G', 'B', 'E'];
  
  // Dynamically calculate fret range based on chord diagram
  // For standard chords (fret 0-1): show frets 0-5 (where 0 represents the nut/open strings)
  // For high fret chords (fret > 1): show frets startFret to startFret+5 (6 total frets)
  const startFret = chordDiagram?.fret || 0;
  const isHighFret = startFret > 1;
  
  // Always show 6 fret positions
  // For standard chords: [0, 1, 2, 3, 4, 5]
  // For high frets (e.g. startFret=10): [10, 11, 12, 13, 14, 15]
  const frets = isHighFret 
    ? Array.from({length: 6}, (_, i) => startFret + i)
    : [0, 1, 2, 3, 4, 5];

  if (!chordDiagram) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No fretboard diagram available for {chordName}</p>
        <p className="text-sm text-muted-foreground mt-2">Try a common chord like C, G, Am, or D</p>
      </div>
    );
  }

  return (
    <div className="bg-muted rounded-lg p-6">
      {label && (
        <div className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wide">
          {label}
        </div>
      )}
      <h4 className="text-lg font-semibold mb-4 text-center">{chordDiagram.name}</h4>
      
      {/* Fretboard visualization */}
      <div className="relative">
        {/* Nut (top of fretboard) */}
        <div className="flex justify-between mb-2">
          {strings.map((string, stringIndex) => (
            <div key={stringIndex} className="text-center w-8">
              <span className="text-xs font-medium text-muted-foreground">{string}</span>
            </div>
          ))}
        </div>

        {/* String positions at nut */}
        <div className="flex justify-between mb-1">
          {chordDiagram.positions.map((position, stringIndex) => (
            <div key={stringIndex} className="w-8 text-center">
              {position === 'X' ? (
                <span 
                  className="text-red-500 font-bold text-lg"
                  aria-label={`String ${strings[stringIndex]} muted`}
                  data-testid={`muted-string${stringIndex}`}
                  role="img"
                >✗</span>
              ) : position === 0 ? (
                <div 
                  className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto text-sm font-bold"
                  aria-label={`String ${strings[stringIndex]} open`}
                  data-testid={`open-string${stringIndex}`}
                  role="img"
                >
                  O
                </div>
              ) : null}
            </div>
          ))}
        </div>

        {/* Fretboard grid */}
        <div className="border-t-4 border-gray-800">
          {/* For standard chords, skip fret 0 (open strings shown above). For high frets, show all */}
          {(isHighFret ? frets : frets.slice(1)).map((fret) => (
            <div key={fret} className="flex justify-between items-center border-b border-gray-400 h-12 relative">
              {/* Fret number */}
              <div className="absolute -left-8 text-sm text-muted-foreground font-medium">
                {fret}
              </div>
              
              {/* String positions */}
              {strings.map((_, stringIndex) => (
                <div key={stringIndex} className="relative w-8 h-full flex items-center justify-center">
                  {/* String line */}
                  <div className="absolute w-full h-0.5 bg-gray-600"></div>
                  
                  {/* Finger position - match absolute fret position */}
                  {chordDiagram.positions[stringIndex] === fret && (() => {
                    const metadata = noteMetadata?.get(stringIndex);
                    const colorClass = metadata?.color || highlightColor;
                    const displayLabel = metadata?.label || chordDiagram.fingers?.[stringIndex] || '';
                    const ariaLabel = `String ${strings[stringIndex]}, fret ${fret}, finger ${displayLabel}`;
                    
                    // Map Tailwind classes to actual colors for inline styles
                    const bgColorMap: Record<string, string> = {
                      'bg-orange-500': '#f97316',
                      'bg-purple-600': '#9333ea',
                      'bg-blue-600': '#2563eb',
                      'bg-blue-500': '#3b82f6'
                    };
                    const bgColor = bgColorMap[colorClass] || '#3b82f6';
                    
                    return (
                      <div 
                        className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold z-10"
                        style={{ backgroundColor: bgColor }}
                        aria-label={ariaLabel}
                        data-testid={`marker-string${stringIndex}-fret${fret}`}
                        role="img"
                      >
                        {displayLabel}
                      </div>
                    );
                  })()}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Fret position markers */}
        <div className="flex justify-center mt-2">
          <div className="text-xs text-muted-foreground">
            {isHighFret 
              ? `Fret ${startFret} - ${startFret + 5}`
              : `Fret 0 - 5`
            }
          </div>
        </div>
      </div>

      {/* Legend */}
      {showLegend && (
        <div className="mt-6 space-y-2 text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs">O</div>
              <span className="text-muted-foreground">Open string</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-red-500 font-bold">✗</span>
              <span className="text-muted-foreground">Don't play</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-4 h-4 ${highlightColor} rounded-full flex items-center justify-center text-white text-xs`}>1</div>
            <span className="text-muted-foreground">Finger position (1=index, 2=middle, 3=ring, 4=pinky)</span>
          </div>
        </div>
      )}
    </div>
  );
}
