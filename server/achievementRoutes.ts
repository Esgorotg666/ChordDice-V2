import { Router } from "express";
import { db } from "./db";
import { users, userAchievements } from "@shared/schema";
import { eq, and, sql } from "drizzle-orm";
import { ACHIEVEMENTS, Achievement } from "@shared/achievements";
import { trackEvent } from "./lib/analytics";

const router = Router();

// Check if user is authenticated
const requireAuth = (req: any, res: any, next: any) => {
  if (!req.session?.userId) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  next();
};

// Get all achievements with user's unlock status
router.get("/api/achievements", requireAuth, async (req: any, res) => {
  try {
    const userId = req.session.userId;

    // Get user's unlocked achievements
    const unlockedAchievements = await db
      .select()
      .from(userAchievements)
      .where(eq(userAchievements.userId, userId));

    const unlockedIds = new Set(unlockedAchievements.map((a: any) => a.achievementId));

    // Map all achievements with unlock status
    const achievementsWithStatus = ACHIEVEMENTS.map(achievement => ({
      ...achievement,
      unlocked: unlockedIds.has(achievement.id),
      unlockedAt: unlockedAchievements.find((a: any) => a.achievementId === achievement.id)?.unlockedAt || null,
    }));

    res.json(achievementsWithStatus);
  } catch (error) {
    console.error("Error fetching achievements:", error);
    res.status(500).json({ message: "Failed to fetch achievements" });
  }
});

// Get only unlocked achievements
router.get("/api/achievements/unlocked", requireAuth, async (req: any, res) => {
  try {
    const userId = req.session.userId;

    const unlocked = await db
      .select()
      .from(userAchievements)
      .where(eq(userAchievements.userId, userId));

    res.json(unlocked);
  } catch (error) {
    console.error("Error fetching unlocked achievements:", error);
    res.status(500).json({ message: "Failed to fetch unlocked achievements" });
  }
});

// Check and unlock new achievements based on user's progress
router.post("/api/achievements/check", requireAuth, async (req: any, res) => {
  try {
    const userId = req.session.userId;

    // Get user data
    const user = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    if (!user || user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    const userData = user[0];

    // Get already unlocked achievements
    const alreadyUnlocked = await db
      .select()
      .from(userAchievements)
      .where(eq(userAchievements.userId, userId));
    
    const unlockedIds = new Set(alreadyUnlocked.map((a: any) => a.achievementId));

    // Check each achievement
    const newlyUnlocked: Achievement[] = [];
    let totalTokensEarned = 0;

    for (const achievement of ACHIEVEMENTS) {
      // Skip if already unlocked
      if (unlockedIds.has(achievement.id)) continue;

      let shouldUnlock = false;

      // Check requirement
      switch (achievement.requirement.type) {
        case 'dice_rolls':
          shouldUnlock = (userData.totalDiceRolls || 0) >= (achievement.requirement.threshold || 0);
          break;
        
        case 'streak':
          shouldUnlock = (userData.longestStreak || 0) >= (achievement.requirement.threshold || 0);
          break;
        
        case 'genre_variety':
          const genresUsed = (userData.genresUsed as string[]) || [];
          shouldUnlock = genresUsed.length >= (achievement.requirement.threshold || 0);
          break;
        
        case 'exotic_chords':
          const exoticUsed = (userData.exoticChordsUsed as string[]) || [];
          shouldUnlock = exoticUsed.length >= (achievement.requirement.threshold || 0);
          break;
        
        case 'subscription':
          shouldUnlock = userData.subscriptionStatus === 'active';
          break;
        
        case 'referrals':
          // Count referrals where reward was granted (user subscribed)
          const referralCount = await db
            .select({ count: sql<number>`count(*)` })
            .from(userAchievements)
            .where(eq(userAchievements.userId, userId));
          // This is placeholder - actual referral count would need JOIN with referrals table
          shouldUnlock = false; // TODO: implement proper referral counting
          break;
      }

      if (shouldUnlock) {
        // Unlock achievement
        await db.insert(userAchievements).values({
          userId,
          achievementId: achievement.id,
          notificationShown: false,
        });

        newlyUnlocked.push(achievement);

        // Award bonus tokens if specified
        if (achievement.rewardTokens && achievement.rewardTokens > 0) {
          totalTokensEarned += achievement.rewardTokens;
        }

        // Track in analytics
        trackEvent('achievement_unlocked', 'Engagement', achievement.name, 1);
      }
    }

    // Update user's token balance if any earned
    if (totalTokensEarned > 0) {
      await db
        .update(users)
        .set({
          extraRollTokens: sql`${users.extraRollTokens} + ${totalTokensEarned}`,
        })
        .where(eq(users.id, userId));
    }

    res.json({
      newAchievements: newlyUnlocked,
      tokensEarned: totalTokensEarned,
      message: newlyUnlocked.length > 0 
        ? `Unlocked ${newlyUnlocked.length} new achievement${newlyUnlocked.length > 1 ? 's' : ''}!` 
        : 'No new achievements',
    });
  } catch (error) {
    console.error("Error checking achievements:", error);
    res.status(500).json({ message: "Failed to check achievements" });
  }
});

// Mark achievement notification as shown
router.post("/api/achievements/mark-shown/:achievementId", requireAuth, async (req: any, res) => {
  try {
    const userId = req.session.userId;
    const { achievementId } = req.params;

    await db
      .update(userAchievements)
      .set({ notificationShown: true })
      .where(
        and(
          eq(userAchievements.userId, userId),
          eq(userAchievements.achievementId, achievementId)
        )
      );

    res.json({ success: true });
  } catch (error) {
    console.error("Error marking achievement as shown:", error);
    res.status(500).json({ message: "Failed to update achievement" });
  }
});

export default router;
