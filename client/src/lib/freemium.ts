import type { User } from "@shared/schema";

export type PremiumFeature = 
  | 'exotic-chords'
  | 'advanced-genres'
  | 'tapping-mode'
  | 'advanced-scales'
  | 'guitar-exercises'
  | 'time-signature-dice'
  | 'bpm-dice'
  | 'audio-samples'
  | 'unlimited-rolls';

export interface FeatureAccess {
  hasAccess: boolean;
  reason?: 'premium-required' | 'subscription-required' | 'limit-reached';
  message?: string;
}

export function hasPremiumAccess(user: User | undefined): boolean {
  if (!user) return false;
  
  // Test users bypass all checks
  if (user.isTestUser === true) return true;
  
  // Check subscription status
  if (user.subscriptionStatus === 'active') {
    // Verify subscription hasn't expired
    if (user.subscriptionExpiry) {
      return new Date(user.subscriptionExpiry) > new Date();
    }
    return true;
  }
  
  return false;
}

export function canAccessFeature(
  feature: PremiumFeature,
  user: User | undefined
): FeatureAccess {
  if (!user) {
    return {
      hasAccess: false,
      reason: 'subscription-required',
      message: 'Sign in to access this feature'
    };
  }
  
  // Test users have unlimited access
  if (user.isTestUser === true) {
    return { hasAccess: true };
  }
  
  const isPremium = hasPremiumAccess(user);
  
  // All premium features require active subscription
  const premiumFeatures: PremiumFeature[] = [
    'exotic-chords',
    'advanced-genres',
    'tapping-mode',
    'advanced-scales',
    'guitar-exercises',
    'time-signature-dice',
    'bpm-dice',
    'audio-samples'
  ];
  
  if (premiumFeatures.includes(feature) && !isPremium) {
    return {
      hasAccess: false,
      reason: 'premium-required',
      message: 'Upgrade to Premium to access this feature'
    };
  }
  
  // Check unlimited rolls
  if (feature === 'unlimited-rolls') {
    if (isPremium) {
      return { hasAccess: true };
    }
    
    const rollsUsed = user.diceRollsUsed || 0;
    const rollsLimit = user.diceRollsLimit || 5;
    const extraTokens = user.extraRollTokens || 0;
    const totalAvailable = rollsLimit + extraTokens;
    
    if (rollsUsed >= totalAvailable) {
      return {
        hasAccess: false,
        reason: 'limit-reached',
        message: `You've used all ${totalAvailable} free rolls. Upgrade to Premium for unlimited access.`
      };
    }
    
    return { hasAccess: true };
  }
  
  return { hasAccess: true };
}

export function getRollsRemaining(user: User | undefined): { 
  remaining: number;
  total: number;
  isPremium: boolean;
} {
  if (!user) {
    return { remaining: 0, total: 0, isPremium: false };
  }
  
  const isPremium = hasPremiumAccess(user);
  
  if (isPremium) {
    return { remaining: Infinity, total: Infinity, isPremium: true };
  }
  
  const rollsUsed = user.diceRollsUsed || 0;
  const rollsLimit = user.diceRollsLimit || 5;
  const extraTokens = user.extraRollTokens || 0;
  const totalAvailable = rollsLimit + extraTokens;
  const remaining = Math.max(0, totalAvailable - rollsUsed);
  
  return { remaining, total: totalAvailable, isPremium: false };
}

export const PREMIUM_GENRES = [
  'rock',
  'funk',
  'neo-classical',
  'flamenco',
  'metal',
  'black-metal',
  'death-metal',
  'extreme-metal'
];

export const EXOTIC_CHORD_TYPES = [
  '11th',
  '13th',
  'Minor 9th',
  'Add9',
  '6/9',
  'Diminished 7th',
  'Half-diminished',
  'Augmented 7th'
];

export function isGenrePremium(genre: string): boolean {
  return PREMIUM_GENRES.includes(genre);
}

export function isChordTypePremium(chordType: string): boolean {
  return EXOTIC_CHORD_TYPES.includes(chordType);
}

export const PREMIUM_PRICE = 4.99;
export const PREMIUM_CURRENCY = 'USD';
export const FREE_ROLLS_LIMIT = 5;
