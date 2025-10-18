import { useAuthContext } from "@/contexts/AuthContext";
import { useSubscription } from "./useSubscription";
import {
  canAccessFeature,
  hasPremiumAccess,
  getRollsRemaining,
  isGenrePremium,
  isChordTypePremium,
  type PremiumFeature,
  type FeatureAccess
} from "@/lib/freemium";

export function useFreemium() {
  const { user, isAuthenticated } = useAuthContext();
  const { hasActiveSubscription } = useSubscription();
  
  const isPremium = hasPremiumAccess(user);
  const rollsInfo = getRollsRemaining(user);
  
  return {
    user,
    isAuthenticated,
    isPremium,
    hasActiveSubscription,
    rollsRemaining: rollsInfo.remaining,
    rollsTotal: rollsInfo.total,
    canAccessFeature: (feature: PremiumFeature): FeatureAccess => 
      canAccessFeature(feature, user),
    isGenrePremium,
    isChordTypePremium,
  };
}
