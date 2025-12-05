import { Button } from "@/components/ui/button";
import { X, Dices, GitBranch } from "lucide-react";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import FretboardDisplay from "@/components/fretboard-display";
import { getChordDiagram, colorGroups, type BridgePattern } from "@/lib/music-data";
import GearRecommendations from "@/components/gear-recommendations";
import { App } from '@capacitor/app';

// Color mapping for chord display based on colorGroups
const colorClassMap: Record<string, { bg: string; border: string; text: string }> = {
  'Purple': { bg: 'from-purple-700 to-purple-900', border: 'border-purple-800', text: 'text-purple-400' },
  'Orange': { bg: 'from-orange-600 to-orange-800', border: 'border-orange-700', text: 'text-orange-400' },
  'Blue': { bg: 'from-blue-600 to-blue-800', border: 'border-blue-700', text: 'text-blue-400' },
  'Green': { bg: 'from-green-600 to-green-800', border: 'border-green-700', text: 'text-green-400' },
  'Red': { bg: 'from-red-700 to-red-900', border: 'border-red-800', text: 'text-red-400' },
  'Yellow': { bg: 'from-yellow-600 to-yellow-800', border: 'border-yellow-700', text: 'text-yellow-400' },
  'Pink': { bg: 'from-pink-600 to-pink-800', border: 'border-pink-700', text: 'text-pink-400' },
  'Teal': { bg: 'from-teal-600 to-teal-800', border: 'border-teal-700', text: 'text-teal-400' }
};

// Get color based on chord root note
const getChordColor = (chord: string): { bg: string; border: string; text: string } => {
  // Extract root note from chord (e.g., "Am7" -> "A", "C#m" -> "C#", "Bb7" -> "Bb")
  const rootMatch = chord.match(/^([A-G][#♯b♭]?)/);
  if (!rootMatch) return colorClassMap['Red']; // Default to red
  
  let root = rootMatch[1];
  // Normalize accidentals
  root = root.replace('♯', '#').replace('♭', 'b');
  
  // Find which color group contains this root
  for (const group of colorGroups) {
    const normalizedKeys = group.keys.map(k => k.replace('♯', '#').replace('♭', 'b'));
    if (normalizedKeys.includes(root)) {
      return colorClassMap[group.name] || colorClassMap['Red'];
    }
  }
  
  return colorClassMap['Red']; // Default fallback
};

interface RiffModalProps {
  isOpen: boolean;
  onClose: () => void;
  progression: string[];
  onShowFretboard?: (chordName: string) => void;
  bridgePattern?: BridgePattern;
  mainChord?: string;
  supportingChord?: string;
  genre?: string;
}

export default function RiffModal({ isOpen, onClose, progression, bridgePattern, mainChord, supportingChord, genre }: RiffModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSaved, setIsSaved] = useState(false);
  const [revealedChords, setRevealedChords] = useState<Set<number>>(new Set());
  const [saveLimitReached, setSaveLimitReached] = useState(false);

  // Normalize chord names to match chord diagram keys
  const normalizeChordName = (chord: string): string => {
    let normalized = chord;
    
    // FIRST: Convert unicode music symbols to ASCII equivalents
    normalized = normalized.replace(/♭/g, 'b');  // Unicode flat → 'b'
    normalized = normalized.replace(/♯/g, '#');  // Unicode sharp → '#'
    
    // Convert sharps to flats where database uses flats (A#, D#, G# → Bb, Eb, Ab)
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
    
    // Fix chord symbols (handle both at end and in middle of chord name)
    // Must handle compound chords like +7, °7, etc.
    normalized = normalized.replace(/\+(?=$|[0-9])/, 'aug');  // A+ → Aaug, A+7 → Aaug7
    normalized = normalized.replace(/°(?=$|[0-9])/, 'dim');   // A° → Adim, A°7 → Adim7
    normalized = normalized.replace(/ø/, 'm7b5');             // Half-diminished anywhere
    
    // Fix suspended chords: sus → sus4 (database has sus4 and sus2, not just sus)
    normalized = normalized.replace(/sus(?![24])/, 'sus4');   // Asus → Asus4, but keep Asus2/Asus4
    
    // Fix Major notation: Maj → '' (major chords have no suffix in database)
    normalized = normalized.replace(/Maj(?![0-9])/, '');      // FMaj → F, but keep Maj7/Maj9
    
    // Fix Major 7th/9th/11th/13th: M7 → maj7, etc.
    normalized = normalized.replace(/M7/, 'maj7');
    normalized = normalized.replace(/M9/, 'maj9');
    normalized = normalized.replace(/M11/, 'maj11');
    normalized = normalized.replace(/M13/, 'maj13');
    
    // Fix power chords: remove '5' suffix (A5 → A)
    normalized = normalized.replace(/^([A-G](?:#|b)?)5$/, '$1');
    
    // Fix minor notation variations: min → m
    normalized = normalized.replace(/min(?=[0-9]|$)/, 'm');   // Amin → Am, Amin7 → Am7
    
    // Ensure proper case for chord types
    normalized = normalized.replace(/dim7/i, 'dim7');
    normalized = normalized.replace(/add9/i, 'add9');
    normalized = normalized.replace(/add11/i, 'add11');
    
    return normalized;
  };

  // Reset saved state and revealed chords when modal opens or progression changes
  useEffect(() => {
    if (isOpen) {
      setIsSaved(false);
      setRevealedChords(new Set());
      setSaveLimitReached(false);
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

  // Handle Android hardware back button (only on native platforms)
  useEffect(() => {
    let backButtonListener: any;
    
    const setupBackButton = async () => {
      // Only add listener on native platforms (Android/iOS)
      const { Capacitor } = await import('@capacitor/core');
      if (isOpen && Capacitor.isNativePlatform()) {
        backButtonListener = await App.addListener('backButton', () => {
          onClose();
        });
      }
    };

    setupBackButton();

    return () => {
      if (backButtonListener) {
        backButtonListener.remove();
      }
    };
  }, [isOpen, onClose]);

  const saveProgressionMutation = useMutation({
    mutationFn: async () => {
      const progressionName = `${genre || 'Riff'} - ${progression.slice(0, 2).join(' → ')}`;
      return await apiRequest('POST', '/api/account/progressions', {
        name: progressionName,
        type: 'riff',
        chords: progression,
        genre: genre || undefined,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/account/progressions'] });
      queryClient.invalidateQueries({ queryKey: ['/api/account/summary'] });
      setIsSaved(true);
      toast({
        title: "Saved!",
        description: "Chord progression saved to your account"
      });
    },
    onError: (error: Error) => {
      const isLimitError = error.message?.includes('only save up to');
      if (isLimitError) {
        setSaveLimitReached(true);
        toast({
          title: "Save Limit Reached",
          description: "You can only save up to 10 progressions. Delete some to save new ones.",
          variant: "destructive"
        });
      } else if (error.message?.includes('401')) {
        toast({
          title: "Sign In Required",
          description: "Please sign in to save progressions to your account",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to save progression",
          variant: "destructive"
        });
      }
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
            className="bg-red-600 hover:bg-red-700 text-white p-2 h-auto min-h-[48px] min-w-[48px]"
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
          {progression.map((chord, index) => {
            const isRevealed = revealedChords.has(index);
            const normalizedChord = normalizeChordName(chord);
            const diagram = getChordDiagram(normalizedChord);
            const chordColor = getChordColor(chord);
            
            return (
              <div
                key={index}
                className="flex flex-col gap-2"
                data-testid={`chord-container-${index + 1}`}
              >
                {/* Clickable Dice with color matching chord chart */}
                <button
                  onClick={() => toggleChordReveal(index)}
                  className={`
                    aspect-square w-full bg-gradient-to-br ${chordColor.bg}
                    border-2 ${chordColor.border} rounded-lg 
                    flex flex-col items-center justify-center gap-2
                    hover:opacity-90
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
            className="flex-1 font-medium min-h-[48px]"
            onClick={handlePractice}
            data-testid="button-practice"
          >
            <i className="fas fa-play mr-2"></i>Practice
          </Button>
          <Button 
            variant="secondary" 
            className="flex-1 font-medium min-h-[48px] hover:bg-accent hover:text-accent-foreground"
            onClick={handleSave}
            disabled={saveProgressionMutation.isPending || isSaved || saveLimitReached}
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
            ) : saveLimitReached ? (
              <>
                <i className="fas fa-exclamation-circle mr-2"></i>Limit Reached
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
