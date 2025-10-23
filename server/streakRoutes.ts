import { Router } from "express";
import { db } from "./db";
import { users } from "@shared/schema";
import { eq } from "drizzle-orm";
import { trackEvent } from "./lib/analytics";

const router = Router();

// Calculate if two dates are consecutive days
function isConsecutiveDay(lastDate: Date | null, currentDate: Date): boolean {
  if (!lastDate) return true; // First practice session
  
  const lastDay = new Date(lastDate);
  lastDay.setHours(0, 0, 0, 0);
  
  const currentDay = new Date(currentDate);
  currentDay.setHours(0, 0, 0, 0);
  
  const diffTime = currentDay.getTime() - lastDay.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays === 1; // Exactly one day apart
}

function isSameDay(lastDate: Date | null, currentDate: Date): boolean {
  if (!lastDate) return false;
  
  const lastDay = new Date(lastDate);
  lastDay.setHours(0, 0, 0, 0);
  
  const currentDay = new Date(currentDate);
  currentDay.setHours(0, 0, 0, 0);
  
  return lastDay.getTime() === currentDay.getTime();
}

// Update streak when user practices (rolls dice)
router.post("/api/streak/update", async (req: any, res) => {
  try {
    if (!req.session?.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const userId = req.session?.userId;
    const currentDate = new Date();

    // Get current user data
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, userId));

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const lastPracticeDate = user.lastPracticeDate;
    let currentStreak = user.currentStreak || 0;
    let longestStreak = user.longestStreak || 0;
    let bonusTokensEarned = 0;

    // Check if they already practiced today
    if (lastPracticeDate && isSameDay(lastPracticeDate, currentDate)) {
      return res.json({
        currentStreak,
        longestStreak,
        bonusTokensEarned: 0,
        alreadyPracticedToday: true,
      });
    }

    // Handle first-time practice
    if (!lastPracticeDate) {
      currentStreak = 1;
    }
    // Check if consecutive day (continuing existing streak)
    else if (isConsecutiveDay(lastPracticeDate, currentDate)) {
      currentStreak += 1;
      
      // Award bonus tokens for streak milestones
      if (currentStreak === 3) {
        bonusTokensEarned = 1; // 3-day streak: 1 token
      } else if (currentStreak === 7) {
        bonusTokensEarned = 2; // 7-day streak: 2 tokens
      } else if (currentStreak === 14) {
        bonusTokensEarned = 3; // 14-day streak: 3 tokens
      } else if (currentStreak === 30) {
        bonusTokensEarned = 5; // 30-day streak: 5 tokens!
      } else if (currentStreak % 30 === 0 && currentStreak > 0) {
        bonusTokensEarned = 5; // Every 30 days: 5 tokens
      }
    } else {
      // Streak broken - reset to 1
      currentStreak = 1;
    }

    // Update longest streak if needed
    if (currentStreak > longestStreak) {
      longestStreak = currentStreak;
    }

    // Update database
    await db
      .update(users)
      .set({
        currentStreak,
        longestStreak,
        lastPracticeDate: currentDate,
        streakBonusTokens: (user.streakBonusTokens || 0) + bonusTokensEarned,
        extraRollTokens: (user.extraRollTokens || 0) + bonusTokensEarned,
      })
      .where(eq(users.id, userId));

    // Track streak milestone in analytics
    if (bonusTokensEarned > 0) {
      trackEvent('streak_milestone', 'Engagement', `${currentStreak}-day streak`, currentStreak);
    }

    return res.json({
      currentStreak,
      longestStreak,
      bonusTokensEarned,
      alreadyPracticedToday: false,
      message: bonusTokensEarned > 0 
        ? `🔥 ${currentStreak}-day streak! You earned ${bonusTokensEarned} bonus tokens!`
        : currentStreak > 1
        ? `🔥 ${currentStreak}-day streak! Keep it going!`
        : "Welcome back! Start your streak today!",
    });
  } catch (error) {
    console.error("Error updating streak:", error);
    return res.status(500).json({ message: "Failed to update streak" });
  }
});

// Get current streak status
router.get("/api/streak/status", async (req: any, res) => {
  try {
    if (!req.session?.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const userId = req.session?.userId;

    const [user] = await db
      .select({
        currentStreak: users.currentStreak,
        longestStreak: users.longestStreak,
        lastPracticeDate: users.lastPracticeDate,
        streakBonusTokens: users.streakBonusTokens,
      })
      .from(users)
      .where(eq(users.id, userId));

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const currentDate = new Date();
    const isPracticedToday = isSameDay(user.lastPracticeDate, currentDate);

    return res.json({
      currentStreak: user.currentStreak || 0,
      longestStreak: user.longestStreak || 0,
      streakBonusTokens: user.streakBonusTokens || 0,
      isPracticedToday,
    });
  } catch (error) {
    console.error("Error fetching streak:", error);
    return res.status(500).json({ message: "Failed to fetch streak" });
  }
});

export default router;
