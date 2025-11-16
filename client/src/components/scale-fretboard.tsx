import { type FretPosition } from "@/lib/scales";
import { type FingerPosition } from "@/lib/fretboard-fingerings";

export type FretboardDisplayMode = "notes" | "fingers";

interface ScaleFretboardProps {
  positions: FretPosition[];
  rootNote: string;
  numFrets?: number;
  displayMode?: FretboardDisplayMode;
  fingeringPattern?: FingerPosition[];
}

export default function ScaleFretboard({ 
  positions, 
  rootNote, 
  numFrets = 12,
  displayMode = "notes",
  fingeringPattern = []
}: ScaleFretboardProps) {
  const strings = ["E", "B", "G", "D", "A", "E"];
  const frets = Array.from({ length: numFrets + 1 }, (_, i) => i);

  // Create maps for quick lookup
  const positionMap = new Map<string, FretPosition>();
  positions.forEach(pos => {
    const key = `${pos.string}-${pos.fret}`;
    positionMap.set(key, pos);
  });

  const fingeringMap = new Map<string, FingerPosition>();
  fingeringPattern.forEach(pos => {
    const key = `${pos.string}-${pos.fret}`;
    fingeringMap.set(key, pos);
  });

  const getPosition = (stringNum: number, fret: number): FretPosition | undefined => {
    return positionMap.get(`${stringNum}-${fret}`);
  };

  const getFingerPosition = (stringNum: number, fret: number): FingerPosition | undefined => {
    return fingeringMap.get(`${stringNum}-${fret}`);
  };

  // Realistic fretboard colors
  const fretboardBg = "bg-gradient-to-r from-amber-900/90 via-amber-800/80 to-amber-900/90";
  const nutColor = "bg-gradient-to-b from-amber-100 to-amber-200";

  return (
    <div className="w-full overflow-x-auto">
      <div className={`${fretboardBg} rounded-lg p-2 sm:p-3 border-2 border-amber-950/40 shadow-lg relative min-w-fit`}>
        {/* Wood grain texture overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)'
          }} />
        </div>

        {/* Fret markers (top) */}
        <div className="flex mb-1.5 relative z-10">
          <div className="w-10 flex-shrink-0" /> {/* String labels spacer */}
          <div className="flex-1 flex">
            {frets.map(fret => (
              <div
                key={fret}
                className="flex-1 text-center text-[10px] text-amber-200 font-mono font-semibold"
              >
                {fret}
              </div>
            ))}
          </div>
        </div>

        {/* Nut (at fret 0) - responsive positioning to align with string labels */}
        <div className="absolute left-[2.5rem] sm:left-10 top-12 bottom-4 w-1.5 rounded-sm bg-gradient-to-b from-amber-100 via-amber-200 to-amber-100 shadow-md z-20" />

        {/* Fretboard grid */}
        <div className="space-y-1 relative z-10">
          {strings.map((stringName, stringNum) => (
            <div key={stringNum} className="flex items-center group">
              {/* String label */}
              <div className="w-10 flex-shrink-0 text-xs font-bold text-amber-200 text-right pr-2">
                {stringName}
              </div>

              {/* Frets for this string */}
              <div className="flex-1 flex relative">
                {/* Realistic string line - thicker for lower strings */}
                <div
                  className="absolute top-1/2 left-0 right-0 bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400 group-hover:from-gray-300 group-hover:via-gray-200 group-hover:to-gray-300 transition-colors shadow-sm"
                  style={{ 
                    height: `${1.5 + (5 - stringNum) * 0.3}px`,
                    transform: 'translateY(-50%)'
                  }}
                />

                {/* Fret positions */}
                {frets.map(fret => {
                  const pos = getPosition(stringNum, fret);
                  const fingerPos = getFingerPosition(stringNum, fret);
                  const isInlayFret = [3, 5, 7, 9, 12].includes(fret);
                  const showMarker = displayMode === "fingers" ? fingerPos : pos;

                  return (
                    <div
                      key={fret}
                      className="flex-1 flex items-center justify-center relative"
                      data-testid={`fret-${stringName}-${fret}`}
                    >
                      {/* Fret inlay dots (single dots at 3,5,7,9 and double dots at 12) */}
                      {isInlayFret && stringNum === 2 && (
                        <div className="absolute w-2 h-2 bg-amber-100/30 rounded-full -z-10 shadow-inner" />
                      )}
                      {fret === 12 && stringNum === 1 && (
                        <div className="absolute w-2 h-2 bg-amber-100/30 rounded-full -z-10 shadow-inner" style={{ transform: 'translateY(-8px)' }} />
                      )}
                      {fret === 12 && stringNum === 4 && (
                        <div className="absolute w-2 h-2 bg-amber-100/30 rounded-full -z-10 shadow-inner" style={{ transform: 'translateY(8px)' }} />
                      )}

                      {/* Display marker based on mode */}
                      {displayMode === "notes" && pos && (
                        <div
                          className={`
                            relative z-20 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center
                            text-[9px] sm:text-[10px] md:text-xs font-bold transition-all hover:scale-110 cursor-default
                            ${pos.isRoot 
                              ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/60 ring-2 ring-primary/40' 
                              : 'bg-card text-card-foreground border-2 border-primary/50 hover:border-primary/70'
                            }
                          `}
                          data-testid={`note-${pos.note}-${fret}`}
                          title={`${pos.note}${pos.isRoot ? ' (Root)' : ''}`}
                        >
                          {pos.note}
                        </div>
                      )}

                      {displayMode === "fingers" && fingerPos && (
                        <div
                          className={`
                            relative z-20 w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center
                            text-[10px] sm:text-xs md:text-sm font-bold transition-all hover:scale-110 cursor-default
                            ${fingerPos.isRoot 
                              ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/60 ring-2 ring-primary/40' 
                              : 'bg-gray-800 text-white border-2 border-gray-600 shadow-md'
                            }
                          `}
                          data-testid={`finger-${fingerPos.finger}-${fret}`}
                          title={`Finger ${fingerPos.finger} - ${fingerPos.note}${fingerPos.isRoot ? ' (Root)' : ''}`}
                        >
                          {fingerPos.finger}
                        </div>
                      )}

                      {/* Fret wire - realistic metal appearance */}
                      {fret > 0 && (
                        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-gray-400 via-gray-300 to-gray-400 shadow-sm" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-3 pt-2 border-t border-amber-700/40 flex items-center gap-4 justify-center text-[10px] sm:text-xs relative z-10">
          {displayMode === "notes" ? (
            <>
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold shadow-sm text-[10px]">
                  {rootNote}
                </div>
                <span className="text-amber-100">Root Note</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full bg-card border-2 border-primary/50 flex items-center justify-center text-card-foreground font-bold">
                  •
                </div>
                <span className="text-amber-100">Scale Tone</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold shadow-sm text-xs">
                  R
                </div>
                <span className="text-amber-100">Root Position</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map(finger => (
                    <div key={finger} className="w-5 h-5 rounded-full bg-gray-800 border border-gray-600 flex items-center justify-center text-white font-bold text-[9px]">
                      {finger}
                    </div>
                  ))}
                </div>
                <span className="text-amber-100">Fingers: 1=Index 2=Middle 3=Ring 4=Pinky</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
