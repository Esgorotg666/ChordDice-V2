import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface RiffModalProps {
  isOpen: boolean;
  onClose: () => void;
  progression: string[];
  onShowFretboard?: (chordName: string) => void;
}

export default function RiffModal({ isOpen, onClose, progression, onShowFretboard }: RiffModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSaved, setIsSaved] = useState(false);

  // Reset saved state when modal opens or progression changes
  useEffect(() => {
    if (isOpen) {
      setIsSaved(false);
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
        isFavorite: "true"  // String to match schema
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
    // Close modal to allow user to practice with the chord chart
    onClose();
    toast({
      title: "Practice Mode",
      description: "Use the chord chart below to practice this progression"
    });
  };

  const handleSave = () => {
    saveProgressionMutation.mutate();
  };

  // Get color class for a chord based on its key (matching chord chart colors)
  const getChordColorClass = (chord: string): string => {
    // Normalize ASCII # and b to Unicode ♯ and ♭ for consistent matching
    const normalized = chord.replace(/#/g, '♯').replace(/b/g, '♭');
    
    // Extract key from chord (first part before any modifiers)
    const keyMatch = normalized.match(/^([A-G][♯♭]?)(.*)/);
    if (!keyMatch) return 'bg-primary';
    
    const root = keyMatch[1]; // e.g., 'C', 'C♯', 'D♭'
    const suffix = keyMatch[2]; // e.g., '', 'm', '7', 'M7'
    const isMinor = suffix.startsWith('m');
    
    // Color coding based on key (matching chord-chart.tsx logic exactly)
    // Check for sharp/flat first, then check for minor
    if (root.includes('♯')) {
      // Sharp keys: C♯, D♯, F♯, G♯, A♯
      if (root === 'F♯' || root === 'G♯') return 'key-fs-g'; // Purple
      if (root === 'A♯') return 'key-bb-b'; // Orange (enharmonic with B♭)
      if (root === 'C♯') return 'key-c-db'; // Yellow (enharmonic with D♭)
      if (root === 'D♯') return 'key-d-eb'; // Green (enharmonic with E♭)
    }
    
    if (root.includes('♭')) {
      // Flat keys: A♭, B♭, D♭, E♭, G♭
      if (isMinor) return 'key-abm-am'; // Dark red for minor flats
      if (root === 'A♭' || root === 'G♭') return 'key-ab-a'; // Red
      if (root === 'B♭') return 'key-bb-b'; // Orange
      if (root === 'D♭') return 'key-c-db'; // Yellow
      if (root === 'E♭') return 'key-d-eb'; // Green
    }
    
    // Natural keys
    if (root === 'A') return 'key-ab-a'; // Red
    if (root === 'B') return 'key-bb-b'; // Orange
    if (root === 'C') return 'key-c-db'; // Yellow
    if (root === 'D') return 'key-d-eb'; // Green
    if (root === 'E') return 'key-e-f'; // Blue
    if (root === 'F') return 'key-e-f'; // Blue
    if (root === 'G') return 'key-fs-g'; // Purple
    
    return 'bg-primary';
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      data-testid="riff-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-card rounded-lg p-6 max-w-sm w-full border border-border animate-fade-in">
        <div className="flex justify-between items-center mb-4">
          <h3 id="modal-title" className="text-lg font-semibold">Generated Riff Progression</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground p-2 h-auto min-h-[44px] min-w-[44px]"
            data-testid="button-close-riff-modal"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-3 mb-6">
          <div className="grid grid-cols-2 gap-2">
            {progression.map((chord, index) => (
              <div
                key={index}
                className={`${getChordColorClass(chord)} text-white p-3 rounded-lg text-center font-semibold animate-fade-in relative group`}
                style={{ animationDelay: `${index * 0.1}s` }}
                data-testid={`chord-${index + 1}`}
              >
                <div className="text-sm text-white/80">Chord {index + 1}</div>
                <div className="text-lg mb-2">{chord}</div>
                {onShowFretboard && (
                  <Button
                    variant="secondary"
                    size="sm"
                    className="text-xs py-1 px-2 bg-white/20 text-white hover:bg-white/30"
                    onClick={() => onShowFretboard(chord)}
                    data-testid={`button-fretboard-${index + 1}`}
                  >
                    <i className="fas fa-guitar mr-1 text-xs"></i>Fret
                  </Button>
                )}
              </div>
            ))}
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <div className="text-sm text-muted-foreground text-center" data-testid="text-progression">
              Progression: {progression.join(' → ')}
            </div>
          </div>
        </div>

        <div className="flex space-x-3">
          <Button 
            className="flex-1 font-medium"
            onClick={handlePractice}
            data-testid="button-practice"
          >
            <i className="fas fa-play mr-2"></i>Practice
          </Button>
          <Button 
            variant="secondary" 
            className="flex-1 font-medium hover:bg-accent hover:text-accent-foreground"
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
      </div>
    </div>
  );
}
