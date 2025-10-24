import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "@/contexts/AuthContext";

interface SubscriptionStatus {
  hasActiveSubscription: boolean;
  subscriptionStatus: string;
  subscriptionExpiry?: Date;
}

export function useSubscription() {
  const { isAuthenticated, user } = useAuthContext();

  const { data: subscription, isLoading } = useQuery<SubscriptionStatus>({
    queryKey: ["/api/subscription/status"],
    enabled: isAuthenticated,
    retry: false,
  });

  // Test users bypass all subscription checks
  const isTestUser = user?.isTestUser === true;
  if (isTestUser) {
    return {
      hasActiveSubscription: true,
      subscriptionStatus: 'active' as const,
      subscriptionExpiry: undefined,
      isLoading: false,
    };
  }

  // Demo/Guest mode: unauthenticated users get full premium access
  if (!isAuthenticated) {
    return {
      hasActiveSubscription: true,
      subscriptionStatus: 'demo' as const,
      subscriptionExpiry: undefined,
      isLoading: false,
    };
  }

  // Regular authenticated users: return API subscription status
  // Show loading until both auth and subscription queries complete
  return {
    hasActiveSubscription: subscription?.hasActiveSubscription ?? false,
    subscriptionStatus: subscription?.subscriptionStatus ?? 'free',
    subscriptionExpiry: subscription?.subscriptionExpiry,
    isLoading: isLoading,
  };
}