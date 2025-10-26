import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Settings as SettingsIcon, Palette, Guitar, Music, TrendingUp } from "lucide-react";

interface SettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const GENRES = [
  { value: "metal", label: "Metal", icon: "🤘", description: "Dark, heavy backgrounds" },
  { value: "jazz", label: "Jazz", icon: "🎷", description: "Smooth, sophisticated vibes" },
  { value: "funk", label: "Funk", icon: "🎸", description: "Groovy, colorful atmosphere" },
  { value: "rock", label: "Rock", icon: "🎵", description: "Classic rock aesthetics" },
  { value: "neo-classical", label: "Neo-Classical", icon: "🎻", description: "Elegant, refined styling" },
  { value: "blues", label: "Blues", icon: "🎺", description: "Moody, soulful tones" },
  { value: "folk", label: "Folk", icon: "🪕", description: "Warm, rustic feel" }
];

const PLAYING_STYLES = [
  { value: "rhythm", label: "Rhythm Guitar" },
  { value: "lead", label: "Lead Guitar" },
  { value: "both", label: "Both" }
];

const SKILL_LEVELS = [
  { value: "entry", label: "Entry Level" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "master", label: "Master" }
];

export function SettingsModal({ open, onOpenChange }: SettingsModalProps) {
  const { toast } = useToast();
  const [hasChanges, setHasChanges] = useState(false);

  // Fetch current preferences
  const { data: preferences, isLoading } = useQuery<{
    preferredGenre?: string;
    playingStyle?: string;
    skillLevel?: string;
  }>({
    queryKey: ["/api/preferences"],
    enabled: open,
  });

  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [playingStyle, setPlayingStyle] = useState<string>("");
  const [skillLevel, setSkillLevel] = useState<string>("");

  // Initialize form values when preferences load
  useEffect(() => {
    if (preferences) {
      setSelectedGenre(preferences.preferredGenre || "");
      setPlayingStyle(preferences.playingStyle || "");
      setSkillLevel(preferences.skillLevel || "");
      setHasChanges(false);
    }
  }, [preferences]);

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async (data: { preferredGenre?: string; playingStyle?: string; skillLevel?: string }) => {
      const response = await apiRequest("POST", "/api/preferences", data);
      if (!response.ok) {
        throw new Error("Failed to update preferences");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/preferences"] });
      toast({
        title: "Settings Saved",
        description: "Your preferences have been updated successfully.",
      });
      setHasChanges(false);
      onOpenChange(false);
    },
    onError: (error: any) => {
      console.error("Error updating preferences:", error);
      toast({
        title: "Error",
        description: "Failed to save your settings. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSave = () => {
    updateMutation.mutate({
      preferredGenre: selectedGenre || undefined,
      playingStyle: playingStyle || undefined,
      skillLevel: skillLevel || undefined,
    });
  };

  const handleGenreChange = (value: string) => {
    setSelectedGenre(value);
    setHasChanges(true);
  };

  const handlePlayingStyleChange = (value: string) => {
    setPlayingStyle(value);
    setHasChanges(true);
  };

  const handleSkillLevelChange = (value: string) => {
    setSkillLevel(value);
    setHasChanges(true);
  };

  // Reset form when modal opens
  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen && preferences) {
      setSelectedGenre(preferences.preferredGenre || "");
      setPlayingStyle(preferences.playingStyle || "");
      setSkillLevel(preferences.skillLevel || "");
      setHasChanges(false);
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-black border-gold max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gold flex items-center gap-2">
            <SettingsIcon className="w-6 h-6" />
            Settings
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Customize your Guitar Dice experience
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="py-8 text-center text-gray-400">Loading preferences...</div>
        ) : (
          <div className="space-y-6 py-4">
            {/* Background Theme Preference */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Palette className="w-5 h-5 text-gold" />
                <Label className="text-lg font-semibold">Background Theme</Label>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                Choose your preferred musical style. This will affect the background visuals throughout the app.
              </p>
              <RadioGroup value={selectedGenre} onValueChange={handleGenreChange}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {GENRES.map((genre) => (
                    <label
                      key={genre.value}
                      className={`flex items-start space-x-3 border rounded-lg p-3 cursor-pointer transition-all ${
                        selectedGenre === genre.value
                          ? "border-gold bg-gold/10"
                          : "border-gray-700 hover:border-gray-600"
                      }`}
                      data-testid={`radio-bg-genre-${genre.value}`}
                    >
                      <RadioGroupItem value={genre.value} id={`bg-${genre.value}`} />
                      <div className="flex items-start gap-2 flex-1">
                        <span className="text-xl">{genre.icon}</span>
                        <div className="flex-1">
                          <Label htmlFor={`bg-${genre.value}`} className="font-semibold cursor-pointer">
                            {genre.label}
                          </Label>
                          <p className="text-xs text-gray-500 mt-0.5">{genre.description}</p>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <Separator className="bg-gray-800" />

            {/* Playing Style */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Guitar className="w-5 h-5 text-gold" />
                <Label className="text-lg font-semibold">Playing Style</Label>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                This helps us recommend the right lessons and exercises for you.
              </p>
              <RadioGroup value={playingStyle} onValueChange={handlePlayingStyleChange}>
                <div className="space-y-2">
                  {PLAYING_STYLES.map((style) => (
                    <label
                      key={style.value}
                      className={`flex items-center space-x-3 border rounded-lg p-3 cursor-pointer transition-all ${
                        playingStyle === style.value
                          ? "border-gold bg-gold/10"
                          : "border-gray-700 hover:border-gray-600"
                      }`}
                      data-testid={`radio-style-${style.value}`}
                    >
                      <RadioGroupItem value={style.value} id={`style-${style.value}`} />
                      <Label htmlFor={`style-${style.value}`} className="font-medium cursor-pointer flex-1">
                        {style.label}
                      </Label>
                    </label>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <Separator className="bg-gray-800" />

            {/* Skill Level */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-5 h-5 text-gold" />
                <Label className="text-lg font-semibold">Skill Level</Label>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                We'll tailor course recommendations to match your current abilities.
              </p>
              <RadioGroup value={skillLevel} onValueChange={handleSkillLevelChange}>
                <div className="grid grid-cols-2 gap-2">
                  {SKILL_LEVELS.map((level) => (
                    <label
                      key={level.value}
                      className={`flex items-center space-x-3 border rounded-lg p-3 cursor-pointer transition-all ${
                        skillLevel === level.value
                          ? "border-gold bg-gold/10"
                          : "border-gray-700 hover:border-gray-600"
                      }`}
                      data-testid={`radio-level-${level.value}`}
                    >
                      <RadioGroupItem value={level.value} id={`level-${level.value}`} />
                      <Label htmlFor={`level-${level.value}`} className="font-medium cursor-pointer flex-1">
                        {level.label}
                      </Label>
                    </label>
                  ))}
                </div>
              </RadioGroup>
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-800">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={updateMutation.isPending}
            className="border-gray-700"
            data-testid="button-settings-cancel"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!hasChanges || updateMutation.isPending}
            className={`${
              !hasChanges 
                ? "bg-gray-700 text-gray-400 cursor-not-allowed" 
                : "bg-gold hover:bg-gold/90 text-black"
            }`}
            data-testid="button-settings-save"
          >
            {updateMutation.isPending ? "Saving..." : hasChanges ? "Save Changes" : "No Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
