import { type FretPosition } from "@/lib/scales";

interface ScaleFretboardProps {
  positions: FretPosition[];
  rootNote: string;
  numFrets?: number;
}

export default function ScaleFretboard({ positions, rootNote, numFrets = 12 }: ScaleFretboardProps) {
  const strings = ["E", "B", "G", "D", "A", "E"];
  const frets = Array.from({ length: numFrets + 1 }, (_, i) => i);

  // Create a map for quick lookup
  const positionMap = new Map<string, FretPosition>();
  positions.forEach(pos => {
    const key = `${pos.string}-${pos.fret}`;
    positionMap.set(key, pos);
  });

  const getPosition = (stringNum: number, fret: number): FretPosition | undefined => {
    return positionMap.get(`${stringNum}-${fret}`);
  };

  return (
    <div className="w-full">
      <div className="bg-gradient-to-b from-amber-900/20 to-amber-950/30 rounded-lg p-3 border border-primary/20">
        {/* Fret markers (top) */}
        <div className="flex mb-1.5">
          <div className="w-10 flex-shrink-0" /> {/* String labels spacer */}
          <div className="flex-1 flex">
            {frets.map(fret => (
              <div
                key={fret}
                className="flex-1 text-center text-[10px] text-muted-foreground font-mono"
              >
                {fret}
              </div>
            ))}
          </div>
        </div>

        {/* Fretboard grid */}
        <div className="space-y-1">
          {strings.map((stringName, stringNum) => (
            <div key={stringNum} className="flex items-center group">
              {/* String label */}
              <div className="w-10 flex-shrink-0 text-xs font-bold text-muted-foreground text-right pr-2">
                {stringName}
              </div>

              {/* Frets for this string */}
              <div className="flex-1 flex relative">
                {/* String line */}
                <div
                  className="absolute top-1/2 left-0 right-0 bg-muted-foreground/30 group-hover:bg-muted-foreground/50 transition-colors"
                  style={{ height: `${2 - stringNum * 0.2}px` }}
                />

                {/* Fret positions */}
                {frets.map(fret => {
                  const pos = getPosition(stringNum, fret);
                  const isInlayFret = [3, 5, 7, 9, 12, 15].includes(fret);

                  return (
                    <div
                      key={fret}
                      className="flex-1 flex items-center justify-center relative"
                      data-testid={`fret-${stringName}-${fret}`}
                    >
                      {/* Fret marker dots (3, 5, 7, 9, 12) */}
                      {isInlayFret && stringNum === 2 && (
                        <div className="absolute w-1.5 h-1.5 bg-muted-foreground/20 rounded-full -z-10" />
                      )}
                      {fret === 12 && stringNum === 4 && (
                        <div className="absolute w-1.5 h-1.5 bg-muted-foreground/20 rounded-full -z-10" />
                      )}

                      {/* Scale note */}
                      {pos && (
                        <div
                          className={`
                            relative z-10 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center
                            text-[10px] sm:text-xs font-bold transition-all hover:scale-110
                            ${pos.isRoot 
                              ? 'bg-primary text-primary-foreground shadow-md shadow-primary/50 ring-1 ring-primary/30' 
                              : 'bg-card text-card-foreground border border-primary/40 hover:border-primary/60'
                            }
                          `}
                          data-testid={`note-${pos.note}-${fret}`}
                          title={`${pos.note}${pos.isRoot ? ' (Root)' : ''}`}
                        >
                          {pos.note}
                        </div>
                      )}

                      {/* Fret wire */}
                      {fret > 0 && (
                        <div className="absolute left-0 top-0 bottom-0 w-px bg-muted-foreground/40" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-3 pt-2 border-t border-border flex items-center gap-4 justify-center text-[10px] sm:text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold shadow-sm text-[10px]">
              {rootNote}
            </div>
            <span className="text-muted-foreground">Root</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-card border border-primary/40 flex items-center justify-center text-card-foreground font-bold">
              •
            </div>
            <span className="text-muted-foreground">Scale Tone</span>
          </div>
        </div>
      </div>
    </div>
  );
}
