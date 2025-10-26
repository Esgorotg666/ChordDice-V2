import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Guitar, Music, TrendingUp } from "lucide-react";

interface OnboardingModalProps {
  open: boolean;
  onComplete: () => void;
}

const GENRES = [
  { value: "metal", label: "Metal", icon: "🤘" },
  { value: "jazz", label: "Jazz", icon: "🎷" },
  { value: "funk", label: "Funk", icon: "🎸" },
  { value: "rock", label: "Rock", icon: "🎵" },
  { value: "neo-classical", label: "Neo-Classical", icon: "🎻" },
  { value: "blues", label: "Blues", icon: "🎺" },
  { value: "folk", label: "Folk", icon: "🪕" }
];

const PLAYING_STYLES = [
  { value: "rhythm", label: "Rhythm Guitar", description: "Power chords, strumming patterns, and backing" },
  { value: "lead", label: "Lead Guitar", description: "Solos, scales, and melodic playing" },
  { value: "both", label: "Both", description: "I play rhythm and lead equally" }
];

const SKILL_LEVELS = [
  { value: "entry", label: "Entry Level", description: "Just starting out or learning basics" },
  { value: "intermediate", label: "Intermediate", description: "Comfortable with fundamentals, building skills" },
  { value: "advanced", label: "Advanced", description: "Proficient player, mastering techniques" },
  { value: "master", label: "Master", description: "Expert level, pushing boundaries" }
];

export function OnboardingModal({ open, onComplete }: OnboardingModalProps) {
  const [step, setStep] = useState(1);
  const [playingStyle, setPlayingStyle] = useState<string>("");
  const [preferredGenre, setPreferredGenre] = useState<string>("");
  const [skillLevel, setSkillLevel] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleNext = () => {
    if (step === 1 && !playingStyle) {
      toast({
        title: "Selection Required",
        description: "Please select your playing style",
        variant: "destructive"
      });
      return;
    }
    if (step === 2 && !preferredGenre) {
      toast({
        title: "Selection Required",
        description: "Please select your preferred genre",
        variant: "destructive"
      });
      return;
    }
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    if (!skillLevel) {
      toast({
        title: "Selection Required",
        description: "Please select your skill level",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await apiRequest("POST", "/api/preferences", {
        playingStyle,
        preferredGenre,
        skillLevel,
        hasCompletedOnboarding: true
      });

      if (!response.ok) {
        throw new Error("Failed to save preferences");
      }

      // Invalidate user data cache to refresh preferences
      await queryClient.invalidateQueries({ queryKey: ["/api/preferences"] });

      toast({
        title: "Welcome!",
        description: "Your preferences have been saved. Let's make some music!",
      });

      onComplete();
    } catch (error: any) {
      console.error("Error saving preferences:", error);
      toast({
        title: "Error",
        description: "Failed to save your preferences. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-[500px] bg-black border-gold max-h-[85vh] flex flex-col p-4 sm:p-6 gap-3" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader className="flex-shrink-0 space-y-1">
          <DialogTitle className="text-xl sm:text-2xl font-bold text-gold flex items-center gap-2">
            {step === 1 && <Guitar className="w-5 h-5 sm:w-6 sm:h-6" />}
            {step === 2 && <Music className="w-5 h-5 sm:w-6 sm:h-6" />}
            {step === 3 && <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />}
            {step === 1 && "Welcome to Guitar Dice!"}
            {step === 2 && "Your Musical Style"}
            {step === 3 && "Your Skill Level"}
          </DialogTitle>
          <DialogDescription className="text-gray-400 text-sm">
            {step === 1 && "Let's personalize your experience. What type of guitarist are you?"}
            {step === 2 && "What style of music do you prefer to play?"}
            {step === 3 && "How would you describe your current skill level?"}
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-y-auto flex-1 -mx-1 px-1">
          {/* Step 1: Playing Style */}
          {step === 1 && (
            <RadioGroup value={playingStyle} onValueChange={setPlayingStyle}>
              <div className="space-y-2">
                {PLAYING_STYLES.map((style) => (
                  <label
                    key={style.value}
                    className={`flex items-start space-x-3 border rounded-lg p-3 cursor-pointer transition-all ${
                      playingStyle === style.value
                        ? "border-gold bg-gold/10"
                        : "border-gray-700 hover:border-gray-600"
                    }`}
                    data-testid={`radio-playing-style-${style.value}`}
                  >
                    <RadioGroupItem value={style.value} id={style.value} className="mt-0.5" />
                    <div className="flex-1">
                      <Label htmlFor={style.value} className="font-semibold cursor-pointer text-sm">
                        {style.label}
                      </Label>
                      <p className="text-xs text-gray-400 mt-0.5">{style.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </RadioGroup>
          )}

          {/* Step 2: Preferred Genre */}
          {step === 2 && (
            <RadioGroup value={preferredGenre} onValueChange={setPreferredGenre}>
              <div className="grid grid-cols-2 gap-2">
                {GENRES.map((genre) => (
                  <label
                    key={genre.value}
                    className={`flex items-center space-x-2 border rounded-lg p-2.5 cursor-pointer transition-all ${
                      preferredGenre === genre.value
                        ? "border-gold bg-gold/10"
                        : "border-gray-700 hover:border-gray-600"
                    }`}
                    data-testid={`radio-genre-${genre.value}`}
                  >
                    <RadioGroupItem value={genre.value} id={`genre-${genre.value}`} />
                    <div className="flex items-center gap-1.5 flex-1">
                      <span className="text-lg">{genre.icon}</span>
                      <Label htmlFor={`genre-${genre.value}`} className="font-semibold cursor-pointer text-xs sm:text-sm">
                        {genre.label}
                      </Label>
                    </div>
                  </label>
                ))}
              </div>
            </RadioGroup>
          )}

          {/* Step 3: Skill Level */}
          {step === 3 && (
            <RadioGroup value={skillLevel} onValueChange={setSkillLevel}>
              <div className="space-y-2">
                {SKILL_LEVELS.map((level) => (
                  <label
                    key={level.value}
                    className={`flex items-start space-x-3 border rounded-lg p-3 cursor-pointer transition-all ${
                      skillLevel === level.value
                        ? "border-gold bg-gold/10"
                        : "border-gray-700 hover:border-gray-600"
                    }`}
                    data-testid={`radio-skill-${level.value}`}
                  >
                    <RadioGroupItem value={level.value} id={level.value} className="mt-0.5" />
                    <div className="flex-1">
                      <Label htmlFor={level.value} className="font-semibold cursor-pointer text-sm">
                        {level.label}
                      </Label>
                      <p className="text-xs text-gray-400 mt-0.5">{level.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </RadioGroup>
          )}
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center gap-2 flex-shrink-0">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 w-12 rounded-full transition-colors ${
                s === step ? "bg-gold" : s < step ? "bg-gold/50" : "bg-gray-700"
              }`}
            />
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between gap-3 flex-shrink-0">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={step === 1 || isSubmitting}
            className="border-gray-700"
            data-testid="button-onboarding-back"
          >
            Back
          </Button>
          
          {step < 3 ? (
            <Button
              onClick={handleNext}
              className="bg-gold hover:bg-gold/90 text-black"
              data-testid="button-onboarding-next"
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-gold hover:bg-gold/90 text-black"
              data-testid="button-onboarding-complete"
            >
              {isSubmitting ? "Saving..." : "Get Started!"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
