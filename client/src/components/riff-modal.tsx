import { Button } from "@/components/ui/button";
import { X, Dices, GitBranch } from "lucide-react";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import FretboardDisplay from "@/components/fretboard-display";
import { getChordDiagram, type BridgePattern } from "@/lib/music-data";
import GearRecommendations from "@/components/gear-recommendations";

interface RiffModalProps {
  isOpen: boolean;
  onClose: () => void;
  progression: string[];
  onShowFretboard?: (chordName: string) => void;
  bridgePattern?: BridgePattern;
  mainChord?: string;
  supportingChord?: string;
}

export default function RiffModal({ isOpen, onClose, progression, bridgePattern, mainChord, supportingChord }: RiffModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSaved, setIsSaved] = useState(false);
  const [revealedChords, setRevealedChords] = useState<Set<number>>(new Set());

  // Normalize chord names to match chord diagram keys
  const normalizeChordName = (chord: string): string => {
    let normalized = chord;
    
    // Convert sharps to flats where database uses flats
    const sharpToFlat: Record<string, string> = {
      'A#': 'Bb',
      'D#': 'Eb',
      'G#': 'Ab'
    };
    
    for (const [sharp, flat] of Object.entries(sharpToFlat)) {
      if (normalized.startsWith(sharp)) {
        normalized = normalized.replace(sharp, flat);
        break;
      }
    }
    
    // Fix chord symbols: + → aug, ° → dim, ø → m7b5
    normalized = normalized.replace(/\+$/, 'aug');  // B+ → Baug
    normalized = normalized.replace(/°$/, 'dim');   // G#° → G#dim (then converted to Abdim)
    normalized = normalized.replace(/ø$/, 'm7b5'); // Half-diminished
    
    // Fix suspended chords: sus → sus4 (database has sus4 and sus2, not just sus)
    normalized = normalized.replace(/sus$/, 'sus4');
    
    // Fix Major notation: Maj → maj (FMaj → Fmaj, then becomes F for major)
    normalized = normalized.replace(/Maj$/, '');  // FMaj → F (major chords have no suffix)
    
    // Fix Major 7th/9th: M7 → maj7, M9 → maj9
    normalized = normalized.replace(/M7$/, 'maj7');
    normalized = normalized.replace(/M9$/, 'maj9');
    
    // Fix power chords: remove '5' suffix
    normalized = normalized.replace(/^([A-G](?:#|b)?)5$/, '$1');
    
    return normalized;
  };

  // Reset saved state and revealed chords when modal opens or progression changes
  useEffect(() => {
    if (isOpen) {
      setIsSaved(false);
      setRevealedChords(new Set());
    }
  }, [isOpen, progression]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  const saveProgressionMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest('POST', '/api/chord-progressions', {
        type: 'riff',
        chords: progression,
        isFavorite: "true"
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/chord-progressions'] });
      setIsSaved(true);
      toast({
        title: "Saved!",
        description: "Chord progression saved to favorites"
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save progression",
        variant: "destructive"
      });
    }
  });

  const handlePractice = () => {
    onClose();
    toast({
      title: "Practice Mode",
      description: "Use the chord chart below to practice this progression"
    });
  };

  const handleSave = () => {
    saveProgressionMutation.mutate();
  };

  const toggleChordReveal = (index: number) => {
    setRevealedChords(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 md:p-4 overflow-y-auto"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      data-testid="riff-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-card rounded-lg p-4 md:p-6 max-w-4xl w-full border border-border my-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 id="modal-title" className="text-lg md:text-xl font-semibold">Generated Riff Progression</h3>
          <Button
            variant="destructive"
            size="sm"
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 text-white p-2 h-auto min-h-[44px] min-w-[44px]"
            data-testid="button-close-riff-modal"
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        
        {/* Progression Summary */}
        <div className="p-3 bg-muted rounded-lg mb-4">
          <div className="text-sm md:text-base text-center font-semibold" data-testid="text-progression">
            {progression.join(' → ')}
          </div>
        </div>

        {/* 3-Dice Bridge System Display */}
        {bridgePattern && mainChord && supportingChord && (
          <div className="mb-6 p-4 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <GitBranch className="h-5 w-5 text-primary" />
              <h4 className="font-semibold text-primary">Bridge Pattern System</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Main Chord */}
              <div className="bg-purple-600/10 border border-purple-600/30 rounded-lg p-3">
                <div className="text-xs text-muted-foreground mb-1">Dice 1: Main Chord</div>
                <div className="text-xl font-bold text-purple-600">{mainChord}</div>
              </div>
              
              {/* Bridge Pattern */}
              <div className="bg-primary/10 border border-primary/30 rounded-lg p-3">
                <div className="text-xs text-muted-foreground mb-1">Dice 2: Bridge</div>
                <div className="text-lg font-bold text-primary mb-1">{bridgePattern.name}</div>
                <div className="text-xs text-muted-foreground">{bridgePattern.description}</div>
                {bridgePattern.notes.length > 0 && bridgePattern.notes.length <= 7 && (
                  <div className="text-xs mt-2 text-foreground/70">
                    Notes: {bridgePattern.notes.join(', ')}
                  </div>
                )}
              </div>
              
              {/* Supporting Chord */}
              <div className="bg-orange-600/10 border border-orange-600/30 rounded-lg p-3">
                <div className="text-xs text-muted-foreground mb-1">Dice 3: Supporting</div>
                <div className="text-xl font-bold text-orange-600">{supportingChord}</div>
              </div>
            </div>
            {bridgePattern.fretboardPattern && (
              <div className="mt-3 text-sm text-muted-foreground">
                <strong>How to play:</strong> {bridgePattern.fretboardPattern}
              </div>
            )}
          </div>
        )}

        {/* Interactive Dice Grid - Click to Reveal Fretboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
          {progression.map((chord, index) => {
            const isRevealed = revealedChords.has(index);
            const normalizedChord = normalizeChordName(chord);
            const diagram = getChordDiagram(normalizedChord);
            
            return (
              <div
                key={index}
                className="flex flex-col gap-2"
                data-testid={`chord-container-${index + 1}`}
              >
                {/* Clickable Dice */}
                <button
                  onClick={() => toggleChordReveal(index)}
                  className={`
                    aspect-square w-full bg-gradient-to-br from-red-700 to-red-900 
                    border-2 border-red-800 rounded-lg 
                    flex flex-col items-center justify-center gap-2
                    hover:from-red-600 hover:to-red-800 
                    transition-all duration-200 
                    ${isRevealed ? 'ring-2 ring-[#D4AF37] ring-offset-2 ring-offset-background' : ''}
                  `}
                  data-testid={`dice-${index + 1}`}
                  aria-label={`${isRevealed ? 'Hide' : 'Show'} fretboard for ${chord}`}
                >
                  <Dices className="h-8 w-8 md:h-10 md:w-10 text-white" />
                  <span className="text-lg md:text-xl font-bold text-white">
                    {chord}
                  </span>
                  <span className="text-xs text-white/70">
                    {isRevealed ? 'Hide' : 'Click to View'}
                  </span>
                </button>

                {/* Fretboard - Only shown when dice is clicked */}
                {isRevealed && (
                  <div
                    className="animate-fade-in"
                    data-testid={`fretboard-${index + 1}`}
                  >
                    <FretboardDisplay
                      chordDiagram={diagram}
                      chordName={chord}
                      showLegend={false}
                      label={`Chord ${index + 1}`}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Hint Text */}
        {revealedChords.size === 0 && (
          <div className="text-center text-sm text-muted-foreground mb-4">
            Click any dice above to view its fretboard diagram
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <Button 
            className="flex-1 font-medium min-h-[44px]"
            onClick={handlePractice}
            data-testid="button-practice"
          >
            <i className="fas fa-play mr-2"></i>Practice
          </Button>
          <Button 
            variant="secondary" 
            className="flex-1 font-medium min-h-[44px] hover:bg-accent hover:text-accent-foreground"
            onClick={handleSave}
            disabled={saveProgressionMutation.isPending || isSaved}
            data-testid="button-save"
          >
            {saveProgressionMutation.isPending ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i>Saving...
              </>
            ) : isSaved ? (
              <>
                <i className="fas fa-check mr-2"></i>Saved
              </>
            ) : (
              <>
                <i className="fas fa-heart mr-2"></i>Save
              </>
            )}
          </Button>
        </div>

        {/* Gear Recommendations */}
        <GearRecommendations 
          context="any"
          compact={true}
          maxItems={3}
        />
      </div>
    </div>
  );
}
