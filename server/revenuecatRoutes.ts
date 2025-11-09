import { Router } from 'express';
import { db } from './db';
import { users } from '../shared/schema';
import { eq } from 'drizzle-orm';

const router = Router();

// Store processed event IDs to prevent duplicate processing (in-memory for now)
const processedEvents = new Set<string>();

// RevenueCat webhook handler
router.post('/revenuecat/webhook', async (req, res) => {
  try {
    // 1. Verify authorization header
    const authHeader = req.headers.authorization;
    const expectedAuth = process.env.REVENUECAT_WEBHOOK_SECRET;

    if (!expectedAuth) {
      console.error('REVENUECAT_WEBHOOK_SECRET not configured');
      return res.status(500).json({ error: 'Webhook not configured' });
    }

    if (authHeader !== `Bearer ${expectedAuth}`) {
      console.warn('RevenueCat webhook: Unauthorized access attempt');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // 2. Parse webhook event
    const { api_version, event } = req.body;

    if (!event || !event.id) {
      return res.status(400).json({ error: 'Invalid webhook payload' });
    }

    const eventId = event.id;
    const userId = event.app_user_id;
    const originalUserId = event.original_app_user_id;
    const eventType = event.type;
    const environment = event.environment;
    const store = event.store; // APP_STORE, PLAY_STORE, etc.

    console.log(`RevenueCat webhook received: ${eventType} for user ${userId} (${environment})`);

    // 3. Check if already processed (idempotency)
    if (processedEvents.has(eventId)) {
      console.log(`Event ${eventId} already processed, skipping`);
      return res.status(200).json({ status: 'already_processed' });
    }

    // 4. Respond immediately (RevenueCat expects quick response)
    res.status(200).json({ status: 'received' });

    // 5. Process asynchronously
    processWebhookAsync(event, eventId, userId, originalUserId, eventType, environment, store)
      .catch(err => {
        console.error('Error processing RevenueCat webhook:', err);
      });

  } catch (error) {
    console.error('RevenueCat webhook error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

async function processWebhookAsync(
  event: any,
  eventId: string,
  userId: string,
  originalUserId: string,
  eventType: string,
  environment: string,
  store: string
) {
  try {
    // Skip sandbox events in production (optional - you may want to process them)
    if (environment === 'SANDBOX' && process.env.NODE_ENV === 'production') {
      console.log(`Skipping sandbox event in production: ${eventId}`);
      return;
    }

    // Call RevenueCat REST API to get full subscriber info
    const subscriberInfo = await getRevenueCatSubscriberInfo(originalUserId);

    if (!subscriberInfo) {
      console.error(`Failed to fetch subscriber info for ${originalUserId}`);
      return;
    }

    // Update database with subscription status
    await updateUserSubscriptionStatus(userId, subscriberInfo, store);

    // Mark event as processed
    processedEvents.add(eventId);

    // Clean up old events (keep last 1000)
    if (processedEvents.size > 1000) {
      const eventsArray = Array.from(processedEvents);
      eventsArray.slice(0, 100).forEach(id => processedEvents.delete(id));
    }

    console.log(`Successfully processed RevenueCat event ${eventId} for user ${userId}`);

  } catch (error) {
    console.error('Error in processWebhookAsync:', error);
    throw error;
  }
}

async function getRevenueCatSubscriberInfo(userId: string): Promise<any> {
  const apiKey = process.env.REVENUECAT_API_KEY;

  if (!apiKey) {
    console.error('REVENUECAT_API_KEY not configured');
    return null;
  }

  try {
    const response = await fetch(
      `https://api.revenuecat.com/v1/subscribers/${encodeURIComponent(userId)}`,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.error(`RevenueCat API error: ${response.status} ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    return data.subscriber;

  } catch (error) {
    console.error('Error calling RevenueCat API:', error);
    return null;
  }
}

async function updateUserSubscriptionStatus(
  userId: string,
  subscriber: any,
  store: string
) {
  try {
    // Determine if user has active subscription
    let hasActiveSubscription = false;
    let subscriptionExpiry: Date | null = null;

    // Check entitlements (recommended approach)
    if (subscriber.entitlements) {
      for (const [key, entitlement] of Object.entries<any>(subscriber.entitlements)) {
        if (entitlement.expires_date) {
          const expiresDate = new Date(entitlement.expires_date);
          if (expiresDate > new Date()) {
            hasActiveSubscription = true;
            subscriptionExpiry = expiresDate;
            break;
          }
        }
      }
    }

    // Determine payment provider based on store
    let paymentProvider = 'stripe';
    if (store === 'APP_STORE') {
      paymentProvider = 'app_store';
    } else if (store === 'PLAY_STORE') {
      paymentProvider = 'google_play';
    }

    // Find user by RevenueCat user ID or app user ID
    const existingUsers = await db
      .select()
      .from(users)
      .where(eq(users.revenueCatUserId, userId))
      .limit(1);

    let user = existingUsers[0];

    if (!user) {
      // Try to find by regular ID (if app_user_id matches database ID)
      const usersByRegularId = await db
        .select()
        .from(users)
        .where(eq(users.id, userId))
        .limit(1);

      user = usersByRegularId[0];
    }

    if (!user) {
      console.error(`User not found for RevenueCat ID: ${userId}`);
      return;
    }

    // Update user subscription status
    await db
      .update(users)
      .set({
        subscriptionStatus: hasActiveSubscription ? 'active' : 'free',
        subscriptionExpiry: subscriptionExpiry,
        paymentProvider: paymentProvider,
        revenueCatUserId: userId,
        updatedAt: new Date(),
      })
      .where(eq(users.id, user.id));

    console.log(`Updated subscription for user ${user.id}: ${hasActiveSubscription ? 'active' : 'free'} via ${paymentProvider}`);

  } catch (error) {
    console.error('Error updating user subscription status:', error);
    throw error;
  }
}

export default router;
