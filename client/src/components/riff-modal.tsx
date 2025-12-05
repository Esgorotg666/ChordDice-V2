import { Button } from "@/components/ui/button";
import { X, Dices, GitBranch, Heart, Check, AlertCircle, Loader2, Music } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import FretboardDisplay from "@/components/fretboard-display";
import { getChordDiagram, colorGroups, type BridgePattern } from "@/lib/music-data";
import GearRecommendations from "@/components/gear-recommendations";
import { App } from '@capacitor/app';

const colorClassMap: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  'Purple': { bg: 'from-purple-700 to-purple-900', border: 'border-purple-800', text: 'text-purple-400', glow: 'shadow-purple-500/30' },
  'Orange': { bg: 'from-orange-600 to-orange-800', border: 'border-orange-700', text: 'text-orange-400', glow: 'shadow-orange-500/30' },
  'Blue': { bg: 'from-blue-600 to-blue-800', border: 'border-blue-700', text: 'text-blue-400', glow: 'shadow-blue-500/30' },
  'Green': { bg: 'from-green-600 to-green-800', border: 'border-green-700', text: 'text-green-400', glow: 'shadow-green-500/30' },
  'Red': { bg: 'from-red-700 to-red-900', border: 'border-red-800', text: 'text-red-400', glow: 'shadow-red-500/30' },
  'Yellow': { bg: 'from-yellow-600 to-yellow-800', border: 'border-yellow-700', text: 'text-yellow-400', glow: 'shadow-yellow-500/30' },
  'Pink': { bg: 'from-pink-600 to-pink-800', border: 'border-pink-700', text: 'text-pink-400', glow: 'shadow-pink-500/30' },
  'Teal': { bg: 'from-teal-600 to-teal-800', border: 'border-teal-700', text: 'text-teal-400', glow: 'shadow-teal-500/30' }
};

const getChordColor = (chord: string): { bg: string; border: string; text: string; glow: string } => {
  const rootMatch = chord.match(/^([A-G][#♯b♭]?)/);
  if (!rootMatch) return colorClassMap['Red'];
  
  let root = rootMatch[1];
  root = root.replace('♯', '#').replace('♭', 'b');
  
  for (const group of colorGroups) {
    const normalizedKeys = group.keys.map(k => k.replace('♯', '#').replace('♭', 'b'));
    if (normalizedKeys.includes(root)) {
      return colorClassMap[group.name] || colorClassMap['Red'];
    }
  }
  
  return colorClassMap['Red'];
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
  const [isAnimating, setIsAnimating] = useState(false);
  const [animatedChords, setAnimatedChords] = useState<Set<number>>(new Set());
  const modalRef = useRef<HTMLDivElement>(null);

  const normalizeChordName = (chord: string): string => {
    let normalized = chord;
    
    normalized = normalized.replace(/♭/g, 'b');
    normalized = normalized.replace(/♯/g, '#');
    
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
    
    normalized = normalized.replace(/\+(?=$|[0-9])/, 'aug');
    normalized = normalized.replace(/°(?=$|[0-9])/, 'dim');
    normalized = normalized.replace(/ø/, 'm7b5');
    normalized = normalized.replace(/sus(?![24])/, 'sus4');
    normalized = normalized.replace(/Maj(?![0-9])/, '');
    normalized = normalized.replace(/M7/, 'maj7');
    normalized = normalized.replace(/M9/, 'maj9');
    normalized = normalized.replace(/M11/, 'maj11');
    normalized = normalized.replace(/M13/, 'maj13');
    normalized = normalized.replace(/^([A-G](?:#|b)?)5$/, '$1');
    normalized = normalized.replace(/min(?=[0-9]|$)/, 'm');
    normalized = normalized.replace(/dim7/i, 'dim7');
    normalized = normalized.replace(/add9/i, 'add9');
    normalized = normalized.replace(/add11/i, 'add11');
    
    normalized = normalized.replace(/m\(maj7\)/i, 'mmaj7');
    normalized = normalized.replace(/mMaj7/i, 'mmaj7');
    normalized = normalized.replace(/mMaj9/i, 'mmaj9');
    
    normalized = normalized.replace(/7sus4/, '7sus4');
    normalized = normalized.replace(/7sus2/, '7sus2');
    
    normalized = normalized.replace(/maj7#11/i, 'maj7');
    normalized = normalized.replace(/7#11/i, '7');
    normalized = normalized.replace(/maj11/i, 'maj9');
    normalized = normalized.replace(/7alt/i, '7#9');
    
    return normalized;
  };

  useEffect(() => {
    if (isOpen) {
      setIsSaved(false);
      setRevealedChords(new Set());
      setSaveLimitReached(false);
      setAnimatedChords(new Set());
      
      setIsAnimating(true);
      progression.forEach((_, index) => {
        setTimeout(() => {
          setAnimatedChords(prev => new Set([...prev, index]));
        }, index * 100);
      });
      
      setTimeout(() => setIsAnimating(false), progression.length * 100 + 300);
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

  useEffect(() => {
    let backButtonListener: any;
    
    const setupBackButton = async () => {
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
    <>
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-2 md:p-4 overflow-y-auto animate-fadeIn"
        onClick={(e) => e.target === e.currentTarget && onClose()}
        data-testid="riff-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div 
          ref={modalRef}
          className="bg-card rounded-xl p-4 md:p-6 max-w-4xl w-full border border-border my-4 max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp"
        >
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gold/10">
                <Music className="h-5 w-5 text-gold" />
              </div>
              <div>
                <h3 id="modal-title" className="text-lg md:text-xl font-semibold">
                  Generated Riff Progression
                </h3>
                {genre && (
                  <span className="text-sm text-muted-foreground">{genre} Style</span>
                )}
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full hover:bg-red-500/10 hover:text-red-500 transition-colors"
              data-testid="button-close-riff-modal"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="p-4 bg-gradient-to-r from-gold/5 to-transparent border border-gold/20 rounded-xl mb-6">
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {progression.map((chord, i) => (
                <div key={i} className="flex items-center">
                  <span 
                    className="text-base md:text-lg font-bold text-gold animate-fadeIn"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    {chord}
                  </span>
                  {i < progression.length - 1 && (
                    <span className="mx-2 text-muted-foreground">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {bridgePattern && mainChord && supportingChord && (
            <div className="mb-6 p-4 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl animate-fadeIn">
              <div className="flex items-center gap-2 mb-3">
                <GitBranch className="h-5 w-5 text-primary" />
                <h4 className="font-semibold text-primary">Bridge Pattern System</h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-purple-600/10 border border-purple-600/30 rounded-lg p-3 transition-transform hover:scale-[1.02]">
                  <div className="text-xs text-muted-foreground mb-1">Dice 1: Main Chord</div>
                  <div className="text-xl font-bold text-purple-600">{mainChord}</div>
                </div>
                
                <div className="bg-primary/10 border border-primary/30 rounded-lg p-3 transition-transform hover:scale-[1.02]">
                  <div className="text-xs text-muted-foreground mb-1">Dice 2: Bridge</div>
                  <div className="text-lg font-bold text-primary mb-1">{bridgePattern.name}</div>
                  <div className="text-xs text-muted-foreground">{bridgePattern.description}</div>
                  {bridgePattern.notes.length > 0 && bridgePattern.notes.length <= 7 && (
                    <div className="text-xs mt-2 text-foreground/70">
                      Notes: {bridgePattern.notes.join(', ')}
                    </div>
                  )}
                </div>
                
                <div className="bg-orange-600/10 border border-orange-600/30 rounded-lg p-3 transition-transform hover:scale-[1.02]">
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

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
            {progression.map((chord, index) => {
              const isRevealed = revealedChords.has(index);
              const isAnimated = animatedChords.has(index);
              const normalizedChord = normalizeChordName(chord);
              const diagram = getChordDiagram(normalizedChord);
              const chordColor = getChordColor(chord);
              
              return (
                <div
                  key={index}
                  className={`flex flex-col gap-2 transition-all duration-500 ${
                    isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                  data-testid={`chord-container-${index + 1}`}
                >
                  <button
                    onClick={() => toggleChordReveal(index)}
                    className={`
                      aspect-square w-full bg-gradient-to-br ${chordColor.bg}
                      border-2 ${chordColor.border} rounded-xl 
                      flex flex-col items-center justify-center gap-2
                      transition-all duration-300 transform
                      hover:scale-[1.03] hover:shadow-lg ${chordColor.glow}
                      active:scale-95
                      ${isRevealed ? 'ring-2 ring-gold ring-offset-2 ring-offset-background shadow-xl' : ''}
                    `}
                    data-testid={`dice-${index + 1}`}
                    aria-label={`${isRevealed ? 'Hide' : 'Show'} fretboard for ${chord}`}
                  >
                    <Dices className={`h-8 w-8 md:h-10 md:w-10 text-white transition-transform duration-300 ${isRevealed ? 'rotate-180' : ''}`} />
                    <span className="text-lg md:text-xl font-bold text-white drop-shadow-lg">
                      {chord}
                    </span>
                    <span className="text-xs text-white/80 bg-black/20 px-2 py-0.5 rounded-full">
                      {isRevealed ? 'Tap to Hide' : 'Tap to View'}
                    </span>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isRevealed ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div
                      className="pt-2"
                      data-testid={`fretboard-${index + 1}`}
                    >
                      <FretboardDisplay
                        chordDiagram={diagram}
                        chordName={chord}
                        showLegend={false}
                        label={`Chord ${index + 1}`}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {revealedChords.size === 0 && (
            <div className="text-center text-sm text-muted-foreground mb-4 animate-pulse">
              Tap any chord above to view its fretboard diagram
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <Button 
              className="flex-1 font-medium min-h-[48px] bg-primary hover:bg-primary/90 transition-all duration-200 hover:scale-[1.02] active:scale-95"
              onClick={handlePractice}
              data-testid="button-practice"
            >
              <Music className="w-4 h-4 mr-2" />
              Practice
            </Button>
            <Button 
              variant="secondary" 
              className={`flex-1 font-medium min-h-[48px] transition-all duration-200 hover:scale-[1.02] active:scale-95 ${
                isSaved ? 'bg-green-600 hover:bg-green-600 text-white' : ''
              }`}
              onClick={handleSave}
              disabled={saveProgressionMutation.isPending || isSaved || saveLimitReached}
              data-testid="button-save"
            >
              {saveProgressionMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : isSaved ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Saved!
                </>
              ) : saveLimitReached ? (
                <>
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Limit Reached
                </>
              ) : (
                <>
                  <Heart className="w-4 h-4 mr-2" />
                  Save
                </>
              )}
            </Button>
          </div>

          <GearRecommendations 
            context="any"
            compact={true}
            maxItems={3}
          />
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px) scale(0.98);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        .animate-slideUp {
          animation: slideUp 0.4s ease-out forwards;
        }
      `}</style>
    </>
  );
}
