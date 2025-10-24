// Achievement badge definitions for Guitar Dice

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string; // Emoji or icon name
  category: 'practice' | 'mastery' | 'social' | 'premium' | 'streak';
  requirement: {
    type: 'dice_rolls' | 'genre_variety' | 'exotic_chords' | 'streak' | 'subscription' | 'referrals';
    threshold?: number;
    value?: any;
  };
  rewardTokens?: number; // Optional bonus tokens for unlocking
}

export const ACHIEVEMENTS: Achievement[] = [
  // Practice Milestones
  {
    id: 'first_roll',
    name: 'First Steps',
    description: 'Roll your first chord',
    icon: '🎲',
    category: 'practice',
    requirement: { type: 'dice_rolls', threshold: 1 },
  },
  {
    id: 'novice_roller',
    name: 'Novice Roller',
    description: 'Generate 10 chord progressions',
    icon: '🎵',
    category: 'practice',
    requirement: { type: 'dice_rolls', threshold: 10 },
    rewardTokens: 1,
  },
  {
    id: 'apprentice_musician',
    name: 'Apprentice Musician',
    description: 'Generate 50 chord progressions',
    icon: '🎸',
    category: 'practice',
    requirement: { type: 'dice_rolls', threshold: 50 },
    rewardTokens: 2,
  },
  {
    id: 'veteran_composer',
    name: 'Veteran Composer',
    description: 'Generate 100 chord progressions',
    icon: '🎼',
    category: 'practice',
    requirement: { type: 'dice_rolls', threshold: 100 },
    rewardTokens: 3,
  },
  {
    id: 'master_creator',
    name: 'Master Creator',
    description: 'Generate 500 chord progressions',
    icon: '👑',
    category: 'practice',
    requirement: { type: 'dice_rolls', threshold: 500 },
    rewardTokens: 5,
  },
  
  // Streak Achievements
  {
    id: 'streak_week',
    name: 'Week Warrior',
    description: 'Maintain a 7-day practice streak',
    icon: '🔥',
    category: 'streak',
    requirement: { type: 'streak', threshold: 7 },
    rewardTokens: 2,
  },
  {
    id: 'streak_month',
    name: 'Monthly Maestro',
    description: 'Maintain a 30-day practice streak',
    icon: '⭐',
    category: 'streak',
    requirement: { type: 'streak', threshold: 30 },
    rewardTokens: 5,
  },
  {
    id: 'streak_legend',
    name: 'Legend Status',
    description: 'Maintain a 100-day practice streak',
    icon: '💎',
    category: 'streak',
    requirement: { type: 'streak', threshold: 100 },
    rewardTokens: 10,
  },
  
  // Genre Mastery
  {
    id: 'genre_explorer',
    name: 'Genre Explorer',
    description: 'Try 3 different genres',
    icon: '🌍',
    category: 'mastery',
    requirement: { type: 'genre_variety', threshold: 3 },
    rewardTokens: 1,
  },
  {
    id: 'genre_versatile',
    name: 'Genre Versatile',
    description: 'Try 5 different genres',
    icon: '🎭',
    category: 'mastery',
    requirement: { type: 'genre_variety', threshold: 5 },
    rewardTokens: 2,
  },
  {
    id: 'genre_master',
    name: 'Genre Master',
    description: 'Try all 8 premium genres',
    icon: '🏆',
    category: 'mastery',
    requirement: { type: 'genre_variety', threshold: 8 },
    rewardTokens: 3,
  },
  
  // Exotic Chord Mastery
  {
    id: 'exotic_curious',
    name: 'Exotic Curious',
    description: 'Use 3 different exotic chord types',
    icon: '✨',
    category: 'mastery',
    requirement: { type: 'exotic_chords', threshold: 3 },
    rewardTokens: 1,
  },
  {
    id: 'exotic_adventurer',
    name: 'Exotic Adventurer',
    description: 'Use 6 different exotic chord types',
    icon: '🌟',
    category: 'mastery',
    requirement: { type: 'exotic_chords', threshold: 6 },
    rewardTokens: 2,
  },
  {
    id: 'exotic_master',
    name: 'Exotic Master',
    description: 'Use all 11 exotic chord types',
    icon: '💫',
    category: 'mastery',
    requirement: { type: 'exotic_chords', threshold: 11 },
    rewardTokens: 3,
  },
  
  // Premium & Social
  {
    id: 'premium_member',
    name: 'Premium Member',
    description: 'Subscribe to Premium',
    icon: '👑',
    category: 'premium',
    requirement: { type: 'subscription', value: 'active' },
  },
  {
    id: 'referral_starter',
    name: 'Referral Starter',
    description: 'Refer your first friend',
    icon: '🤝',
    category: 'social',
    requirement: { type: 'referrals', threshold: 1 },
    rewardTokens: 2,
  },
  {
    id: 'referral_champion',
    name: 'Referral Champion',
    description: 'Refer 5 friends',
    icon: '🎖️',
    category: 'social',
    requirement: { type: 'referrals', threshold: 5 },
    rewardTokens: 5,
  },
];

// Helper to get achievement by ID
export function getAchievement(id: string): Achievement | undefined {
  return ACHIEVEMENTS.find(a => a.id === id);
}

// Helper to get achievements by category
export function getAchievementsByCategory(category: Achievement['category']): Achievement[] {
  return ACHIEVEMENTS.filter(a => a.category === category);
}
