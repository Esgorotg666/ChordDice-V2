import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "@/contexts/AuthContext";

interface SubscriptionStatus {
  hasActiveSubscription: boolean;
  subscriptionStatus: string;
  subscriptionExpiry?: Date;
}

export function useSubscription() {
  const authContext = useAuthContext();
  const { isAuthenticated, isDemoMode } = authContext;

  const { data: subscription, isLoading } = useQuery<SubscriptionStatus>({
    queryKey: ["/api/subscription/status"],
    enabled: isAuthenticated && !isDemoMode,
    retry: false,
  });

  // Demo mode: always return premium subscription status
  // This ensures demo users have full access to all premium features
  if (isDemoMode) {
    return {
      hasActiveSubscription: true,
      subscriptionStatus: 'premium' as const,
      subscriptionExpiry: undefined,
      isLoading: false,
    };
  }

  // Regular authenticated users: return API subscription status
  return {
    hasActiveSubscription: subscription?.hasActiveSubscription ?? false,
    subscriptionStatus: subscription?.subscriptionStatus ?? 'free',
    subscriptionExpiry: subscription?.subscriptionExpiry,
    isLoading: isLoading && isAuthenticated,
  };
}