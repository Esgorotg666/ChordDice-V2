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
  
  // Calculate note name for a given string and fret
  const getNoteAtFret = (stringIndex: number, fret: number): string => {
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const openStringNotes = ['E', 'A', 'D', 'G', 'B', 'E'];
    const openNote = openStringNotes[stringIndex];
    const openNoteIndex = notes.indexOf(openNote);
    const noteIndex = (openNoteIndex + fret) % 12;
    return notes[noteIndex];
  };
  
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
              ) : position === 0 ? (() => {
                const metadata = noteMetadata?.get(stringIndex);
                const noteName = getNoteAtFret(stringIndex, 0);
                const isRoot = metadata?.type === 'root';
                const textColor = isRoot ? '#dc2626' : '#000000';
                
                return (
                  <div 
                    className="w-9 h-9 rounded-full flex items-center justify-center mx-auto font-bold shadow-md border-2"
                    style={{ 
                      backgroundColor: '#ffffff',
                      color: textColor,
                      borderColor: isRoot ? '#dc2626' : '#000000',
                      fontSize: '13px'
                    }}
                    aria-label={`String ${strings[stringIndex]} open, note ${noteName}`}
                    data-testid={`open-string${stringIndex}`}
                    role="img"
                  >
                    {noteName}
                  </div>
                );
              })() : null}
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
                    const noteName = getNoteAtFret(stringIndex, fret);
                    const ariaLabel = `String ${strings[stringIndex]}, fret ${fret}, note ${noteName}`;
                    
                    // Playing card aesthetic: White background with black/red text
                    // Root notes get red color, all other notes are black
                    const isRoot = metadata?.type === 'root';
                    const textColor = isRoot ? '#dc2626' : '#000000'; // red-600 : black
                    
                    return (
                      <div 
                        className="w-9 h-9 rounded-full flex items-center justify-center font-bold z-10 shadow-md border-2"
                        style={{ 
                          backgroundColor: '#ffffff',
                          color: textColor,
                          borderColor: isRoot ? '#dc2626' : '#000000',
                          fontSize: '13px'
                        }}
                        aria-label={ariaLabel}
                        data-testid={`marker-string${stringIndex}-fret${fret}`}
                        role="img"
                      >
                        {noteName}
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

      {/* Legend - Playing Card Style */}
      {showLegend && (
        <div className="mt-6 space-y-2 text-sm">
          <div className="flex items-center space-x-4 flex-wrap gap-2">
            <div className="flex items-center space-x-2">
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 shadow-sm"
                style={{ backgroundColor: '#ffffff', color: '#000000', borderColor: '#000000', fontSize: '11px' }}
              >
                C
              </div>
              <span className="text-muted-foreground">Note</span>
            </div>
            <div className="flex items-center space-x-2">
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 shadow-sm"
                style={{ backgroundColor: '#ffffff', color: '#dc2626', borderColor: '#dc2626', fontSize: '11px' }}
              >
                E
              </div>
              <span className="text-muted-foreground">Root note</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-red-500 font-bold">✗</span>
              <span className="text-muted-foreground">Don't play</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
