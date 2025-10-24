import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useAuthContext } from "@/contexts/AuthContext";

interface UsageStatus {
  diceRollsUsed: number;
  diceRollsLimit: number;
  extraRollTokens: number;
  totalAvailableRolls: number;
  remainingRolls: number;
  adsWatchedCount: number;
  canUseDiceRoll: boolean;
  isTestUser?: boolean;
}

interface DiceRollResult {
  diceRollsUsed: number;
  diceRollsLimit: number;
  remainingRolls: number;
}

interface AdRewardResult {
  extraRollTokens: number;
  adsWatchedCount: number;
  totalAdsWatched: number;
  message: string;
}

export function useUsageTracking() {
  const queryClient = useQueryClient();
  const { isAuthenticated, isLoading: isAuthLoading } = useAuthContext();

  // Get current usage status
  const {
    data: usageStatus,
    isLoading,
    error
  } = useQuery<UsageStatus>({
    queryKey: ['/api/usage/status'],
    staleTime: 30000, // 30 seconds
    refetchOnWindowFocus: true,
    enabled: isAuthenticated && !isAuthLoading,
  });

  // Increment dice roll usage
  const incrementDiceRollMutation = useMutation({
    mutationFn: async (): Promise<DiceRollResult> => {
      const response = await apiRequest('POST', '/api/usage/increment-dice-roll');
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to increment dice roll');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/usage/status'] });
    },
  });

  // Watch ad for reward
  const watchAdMutation = useMutation({
    mutationFn: async (): Promise<AdRewardResult> => {
      const response = await apiRequest('POST', '/api/usage/watch-ad-reward');
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to process ad reward');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/usage/status'] });
    },
  });

  return {
    // Status
    usageStatus,
    isLoading: isLoading || isAuthLoading,
    error,
    
    // Computed values
    // Demo/Guest mode: unauthenticated users get unlimited access
    canUseDiceRoll: isAuthenticated ? (usageStatus?.canUseDiceRoll ?? false) : true,
    remainingRolls: isAuthenticated ? (usageStatus?.remainingRolls || 0) : 999,
    extraTokens: usageStatus?.extraRollTokens || 0,
    hasWatchedMaxAds: (usageStatus?.adsWatchedCount || 0) >= 5,
    isTestUser: usageStatus?.isTestUser || false,
    
    // Actions
    incrementDiceRoll: incrementDiceRollMutation.mutateAsync,
    watchAd: watchAdMutation.mutateAsync,
    
    // Loading states
    isIncrementingRoll: incrementDiceRollMutation.isPending,
    isWatchingAd: watchAdMutation.isPending,
    
    // Error states
    incrementError: incrementDiceRollMutation.error?.message,
    adError: watchAdMutation.error?.message,
    
    // Auth state
    isAuthenticated,
  };
}