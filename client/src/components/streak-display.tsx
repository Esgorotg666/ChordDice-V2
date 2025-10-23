import { Flame, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface StreakDisplayProps {
  currentStreak: number;
  longestStreak: number;
  isPracticedToday: boolean;
  compact?: boolean;
}

export default function StreakDisplay({ 
  currentStreak, 
  longestStreak, 
  isPracticedToday,
  compact = false 
}: StreakDisplayProps) {
  
  if (compact) {
    // Compact version for header
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge 
            variant={isPracticedToday ? "default" : "secondary"}
            className={`flex items-center gap-1 ${isPracticedToday ? 'bg-orange-600 text-white' : 'bg-muted text-muted-foreground'}`}
            data-testid="badge-streak"
          >
            <Flame className={`h-3 w-3 ${isPracticedToday ? 'animate-pulse' : ''}`} />
            <span className="font-bold">{currentStreak}</span>
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-xs space-y-1">
            <p className="font-semibold">{currentStreak}-day practice streak!</p>
            <p className="text-muted-foreground">
              {isPracticedToday ? "✓ Practiced today" : "Roll the dice to continue your streak"}
            </p>
            <p className="text-muted-foreground">
              Record: {longestStreak} days
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    );
  }

  // Full version for dashboard
  return (
    <div className="bg-card rounded-lg p-4 border border-border space-y-3" data-testid="streak-display">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold flex items-center gap-2">
          <Flame className={`h-4 w-4 ${isPracticedToday ? 'text-orange-500' : 'text-muted-foreground'}`} />
          Practice Streak
        </h3>
        {isPracticedToday && (
          <Badge variant="default" className="bg-green-600">
            ✓ Today
          </Badge>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="text-center flex-1">
          <div className={`text-3xl font-bold ${currentStreak > 0 ? 'text-orange-500' : 'text-muted-foreground'}`}>
            {currentStreak}
          </div>
          <div className="text-xs text-muted-foreground">Current Streak</div>
        </div>

        <div className="text-center flex-1 border-l border-border">
          <div className="text-2xl font-bold text-primary flex items-center justify-center gap-1">
            <Trophy className="h-5 w-5" />
            {longestStreak}
          </div>
          <div className="text-xs text-muted-foreground">Personal Record</div>
        </div>
      </div>

      {!isPracticedToday && currentStreak > 0 && (
        <div className="text-xs text-muted-foreground text-center pt-2 border-t border-border">
          Roll the dice to continue your {currentStreak}-day streak!
        </div>
      )}
      
      {currentStreak === 0 && (
        <div className="text-xs text-muted-foreground text-center pt-2 border-t border-border">
          Start your practice streak by rolling the dice!
        </div>
      )}
    </div>
  );
}
