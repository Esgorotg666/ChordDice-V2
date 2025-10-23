import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/lib/analytics";

export interface StreakStatus {
  currentStreak: number;
  longestStreak: number;
  streakBonusTokens: number;
  isPracticedToday: boolean;
}

export interface StreakUpdateResponse {
  currentStreak: number;
  longestStreak: number;
  bonusTokensEarned: number;
  alreadyPracticedToday: boolean;
  message: string;
}

export function useStreak() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Get current streak status
  const { data: streakStatus, isLoading } = useQuery<StreakStatus>({
    queryKey: ['/api/streak/status'],
    retry: 1,
  });

  // Update streak (call when user practices - rolls dice)
  const updateStreakMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest('POST', '/api/streak/update', {});
      if (!response.ok) {
        throw new Error('Failed to update streak');
      }
      return response.json() as Promise<StreakUpdateResponse>;
    },
    onSuccess: (data) => {
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['/api/streak/status'] });
      queryClient.invalidateQueries({ queryKey: ['/api/usage/status'] });

      // Show toast for streak milestones
      if (data.bonusTokensEarned > 0) {
        toast({
          title: "🔥 Streak Milestone!",
          description: data.message,
          duration: 5000,
        });
        
        // Track milestone in analytics
        trackEvent('streak_milestone', 'Engagement', `${data.currentStreak}-day`, data.currentStreak);
      } else if (data.currentStreak > 1 && !data.alreadyPracticedToday) {
        // Silent update for non-milestone days
        console.log(`Streak updated: ${data.currentStreak} days`);
      }
    },
    onError: (error) => {
      console.error('Failed to update streak:', error);
    },
  });

  return {
    currentStreak: streakStatus?.currentStreak || 0,
    longestStreak: streakStatus?.longestStreak || 0,
    streakBonusTokens: streakStatus?.streakBonusTokens || 0,
    isPracticedToday: streakStatus?.isPracticedToday || false,
    isLoading,
    updateStreak: updateStreakMutation.mutate,
    isUpdating: updateStreakMutation.isPending,
  };
}
