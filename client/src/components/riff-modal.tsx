import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import FretboardDisplay from "@/components/fretboard-display";
import { getChordDiagram } from "@/lib/music-data";

interface RiffModalProps {
  isOpen: boolean;
  onClose: () => void;
  progression: string[];
  onShowFretboard?: (chordName: string) => void;
}

export default function RiffModal({ isOpen, onClose, progression }: RiffModalProps) {
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
      <div className="bg-card rounded-lg p-4 md:p-6 max-w-6xl w-full border border-border my-4">
        <div className="flex justify-between items-center mb-4">
          <h3 id="modal-title" className="text-lg md:text-xl font-semibold">Generated Riff Progression</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground p-2 h-auto min-h-[44px] min-w-[44px]"
            data-testid="button-close-riff-modal"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Progression Summary */}
        <div className="p-3 bg-muted rounded-lg mb-4">
          <div className="text-sm md:text-base text-center font-semibold" data-testid="text-progression">
            {progression.join(' → ')}
          </div>
        </div>

        {/* Fretboard Diagrams Grid - Auto-displayed */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {progression.map((chord, index) => {
            const diagram = getChordDiagram(chord);
            return (
              <div
                key={index}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                data-testid={`fretboard-${index + 1}`}
              >
                <FretboardDisplay
                  chordDiagram={diagram}
                  chordName={chord}
                  showLegend={index === 0} // Only show legend on first chord
                  label={`Chord ${index + 1}`}
                />
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
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
      </div>
    </div>
  );
}
