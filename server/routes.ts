import type { Express } from "express";
import { createServer, type Server } from "http";
import { Server as SocketIOServer } from "socket.io";
import { storage } from "./storage";
import { insertChordProgressionSchema } from "@shared/schema";
import { getSession } from "./replitAuth";
import authRoutes from "./authRoutes";
import { createRateLimitMiddleware, mutationRateLimiter, referralRateLimiter, socketConnectionLimiter, socketEventLimiter } from "./middleware/rateLimiter";
import { csrfProtection } from "./middleware/csrfProtection";
import { z } from "zod";
import Stripe from "stripe";
import multer from "multer";
import { parseBuffer } from "music-metadata";
import { validateAudioMagicBytes, validateFileConsistency } from "./middleware/magicBytes";
import { randomUUID } from "crypto";
import path from "path";
import fs from "fs/promises";
import express from "express";
import DOMPurify from "isomorphic-dompurify";

// Initialize Stripe
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-08-27.basil",
});

// Configure multer for audio file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Strict whitelist of allowed audio MIME types
    const allowedMimeTypes = [
      'audio/mpeg',       // MP3
      'audio/wav',        // WAV
      'audio/ogg',        // OGG
      'audio/mp4',        // M4A
      'audio/aac',        // AAC
      'audio/flac',       // FLAC
      'audio/x-wav',      // Alternative WAV
      'audio/x-mpeg',     // Alternative MP3
    ];
    
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      const error = new Error(`File type ${file.mimetype} not allowed. Only audio files are permitted.`) as any;
      error.code = 'INVALID_FILE_TYPE';
      cb(error, false);
    }
  }
});

// Custom authentication middleware
function isAuthenticated(req: any, res: any, next: any) {
  const userId = req.session?.userId;
  if (!userId) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  req.userId = userId; // Store user ID for route handlers
  next();
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Session middleware setup - Note: Session is also set up in setupAuth for OIDC
  app.use(getSession());

  // Custom auth routes
  app.use('/api/auth', authRoutes);

  // Account deletion endpoint for Google Play Store compliance
  app.post("/api/delete-account", async (req: any, res) => {
    try {
      const { email } = req.body;
      
      if (!email || typeof email !== 'string') {
        return res.status(400).send("Email is required");
      }

      // Find user by email
      const user = await storage.getUserByEmail(email);
      
      if (!user) {
        return res.status(404).send("Account not found");
      }

      // Delete all user data
      await storage.deleteUserCascade(user.id);
      
      res.status(200).send("Account deleted successfully");
    } catch (error) {
      console.error("Account deletion error:", error);
      res.status(500).send("Internal server error");
    }
  });

  // Check subscription status
  app.get('/api/subscription/status', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.userId;
      console.log('[DEBUG] Subscription status check - userId:', userId);
      
      const user = await storage.getUser(userId);
      console.log('[DEBUG] User subscription data:', {
        userId: user?.id,
        subscriptionStatus: user?.subscriptionStatus,
        subscriptionExpiry: user?.subscriptionExpiry,
        isTestUser: user?.isTestUser
      });
      
      const now = new Date();
      const isActive = user?.subscriptionStatus === 'active' && 
                     user?.subscriptionExpiry && 
                     new Date(user.subscriptionExpiry) > now;
      
      console.log('[DEBUG] Subscription check result - isActive:', isActive, 'now:', now.toISOString(), 'expiry:', user?.subscriptionExpiry);
      
      res.json({
        hasActiveSubscription: isActive,
        subscriptionStatus: user?.subscriptionStatus || 'free',
        subscriptionExpiry: user?.subscriptionExpiry
      });
    } catch (error) {
      console.error("Error checking subscription status:", error);
      res.status(500).json({ message: "Failed to check subscription status" });
    }
  });

  // Usage tracking routes
  app.get('/api/usage/status', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.userId;
      const user = await storage.getUser(userId);
      const canRoll = await storage.canUseDiceRoll(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      // Calculate day-aware values (NULL dates need reset)
      const needsDiceReset = !user.rollsResetDate || (() => {
        const rollResetDate = new Date(user.rollsResetDate);
        rollResetDate.setHours(0, 0, 0, 0);
        return today.getTime() !== rollResetDate.getTime();
      })();
      
      const needsAdReset = !user.adsWatchDate || (() => {
        const adsWatchDate = new Date(user.adsWatchDate);
        adsWatchDate.setHours(0, 0, 0, 0);
        return today.getTime() !== adsWatchDate.getTime();
      })();
      
      const baseLimit = user.diceRollsLimit || 5;
      const effectiveUsedRolls = needsDiceReset ? 0 : (user.diceRollsUsed || 0);
      const extraTokens = user.extraRollTokens || 0;
      const totalAvailable = baseLimit + extraTokens;
      const effectiveAdsWatched = needsAdReset ? 0 : (user.adsWatchedCount || 0);
      
      // Test users get unlimited access
      if (user.isTestUser) {
        return res.json({
          diceRollsUsed: 0,
          diceRollsLimit: 999999, // Effectively unlimited
          extraRollTokens: 999999,
          totalAvailableRolls: 999999,
          remainingRolls: 999999,
          adsWatchedCount: 0,
          canUseDiceRoll: true,
          isTestUser: true
        });
      }
      
      res.json({
        diceRollsUsed: effectiveUsedRolls,
        diceRollsLimit: baseLimit,
        extraRollTokens: extraTokens,
        totalAvailableRolls: totalAvailable,
        remainingRolls: Math.max(0, totalAvailable - effectiveUsedRolls),
        adsWatchedCount: effectiveAdsWatched,
        canUseDiceRoll: canRoll,
        isTestUser: false
      });
    } catch (error) {
      console.error("Error checking usage status:", error);
      res.status(500).json({ message: "Failed to check usage status" });
    }
  });

  app.post('/api/usage/increment-dice-roll', 
    isAuthenticated, 
    csrfProtection,
    createRateLimitMiddleware(mutationRateLimiter, "dice roll"), 
    async (req: any, res) => {
    try {
      const userId = req.userId;
      const canRoll = await storage.canUseDiceRoll(userId);
      
      if (!canRoll) {
        return res.status(403).json({ 
          message: "Dice roll limit reached. Watch an ad or upgrade to premium for unlimited rolls.",
          limitReached: true
        });
      }
      
      const updatedUser = await storage.incrementDiceRoll(userId);
      
      if (!updatedUser) {
        return res.status(403).json({ 
          message: "Dice roll limit reached. Watch an ad or upgrade to premium for unlimited rolls.",
          limitReached: true
        });
      }
      
      const baseLimit = updatedUser.diceRollsLimit || 5;
      const usedRolls = updatedUser.diceRollsUsed || 0;
      const extraTokens = updatedUser.extraRollTokens || 0;
      const totalAvailable = baseLimit + extraTokens;
      
      res.json({
        diceRollsUsed: usedRolls,
        diceRollsLimit: baseLimit,
        extraRollTokens: extraTokens,
        remainingRolls: Math.max(0, totalAvailable - usedRolls)
      });
    } catch (error) {
      console.error("Error incrementing dice roll:", error);
      res.status(500).json({ message: "Failed to increment dice roll" });
    }
  });

  // Watch ad and earn reward token
  app.post('/api/usage/watch-ad-reward', isAuthenticated, csrfProtection, async (req: any, res) => {
    try {
      const userId = req.session.userId;
      
      // Use existing addAdRollReward method which handles daily limits and atomic updates
      const updatedUser = await storage.addAdRollReward(userId);
      
      if (!updatedUser) {
        return res.status(500).json({ message: "Failed to process ad reward" });
      }

      console.log(`[AdReward] User ${userId} watched ad. Tokens: ${updatedUser.extraRollTokens}, Ads today: ${updatedUser.adsWatchedCount}`);

      res.json({
        success: true,
        message: "Ad reward granted! +1 bonus dice roll",
        extraRollTokens: updatedUser.extraRollTokens,
        adsWatchedCount: updatedUser.adsWatchedCount,
        totalAdsWatched: updatedUser.totalAdsWatched
      });
    } catch (error: any) {
      console.error("Error processing ad reward:", error);
      
      // Handle daily limit error
      if (error.message?.includes("Daily ad limit reached")) {
        return res.status(429).json({ 
          message: error.message,
          adsWatchedCount: 5,
          maxAdsPerDay: 5
        });
      }
      
      res.status(500).json({ message: "Failed to process ad reward" });
    }
  });

  // Referral routes
  app.get('/api/referrals/dashboard', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.userId;
      const stats = await storage.getReferralStats(userId);
      
      res.json({
        referralCode: stats.user.referralCode,
        referrals: stats.referrals,
        totalReferred: stats.totalReferred,
        totalRewardsPending: stats.totalRewardsPending,
        referralRewardsEarned: stats.user.referralRewardsEarned || 0
      });
    } catch (error) {
      console.error("Error fetching referral dashboard:", error);
      res.status(500).json({ message: "Failed to fetch referral dashboard" });
    }
  });

  app.post('/api/referrals/generate-code', 
    isAuthenticated, 
    csrfProtection,
    createRateLimitMiddleware(referralRateLimiter, "generate referral code"), 
    async (req: any, res) => {
    try {
      const userId = req.userId;
      const user = await storage.getUser(userId);
      
      if (user?.referralCode) {
        return res.json({ 
          referralCode: user.referralCode,
          message: "You already have a referral code" 
        });
      }
      
      const updatedUser = await storage.generateReferralCode(userId);
      
      if (!updatedUser?.referralCode) {
        return res.status(500).json({ message: "Failed to generate referral code" });
      }
      
      res.json({
        referralCode: updatedUser.referralCode,
        message: "Referral code generated successfully!"
      });
    } catch (error) {
      console.error("Error generating referral code:", error);
      res.status(500).json({ message: "Failed to generate referral code" });
    }
  });

  app.post('/api/referrals/apply', 
    isAuthenticated, 
    csrfProtection,
    createRateLimitMiddleware(referralRateLimiter, "referral apply"), 
    async (req: any, res) => {
    try {
      const userId = req.userId;
      
      // Validate request body with Zod
      const applyReferralSchema = z.object({
        referralCode: z.string().min(1, "Referral code is required").max(20, "Referral code too long")
      });
      
      const validatedData = applyReferralSchema.parse(req.body);
      
      const result = await storage.applyReferralCode(userId, validatedData.referralCode.toUpperCase());
      
      if (!result.success) {
        return res.status(400).json({ message: result.message });
      }
      
      res.json({ 
        message: result.message,
        success: true
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid referral code", 
          errors: error.errors 
        });
      }
      console.error("Error applying referral code:", error);
      res.status(500).json({ message: "Failed to apply referral code" });
    }
  });

  // NOTE: Reward processing should be triggered by Stripe webhooks or protected cron jobs
  // This endpoint is removed for security - referral rewards will be processed automatically

  // Stripe subscription route
  app.post('/api/create-subscription', isAuthenticated, csrfProtection, async (req: any, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }

    let user = req.user;
    const userId = user.claims.sub;
    const dbUser = await storage.getUser(userId);

    if (dbUser?.stripeSubscriptionId) {
      const subscription = await stripe.subscriptions.retrieve(dbUser.stripeSubscriptionId);
      
      const latestInvoice = typeof subscription.latest_invoice === 'object' ? subscription.latest_invoice : null;
      const paymentIntent = latestInvoice && typeof (latestInvoice as any).payment_intent === 'object' ? (latestInvoice as any).payment_intent : null;

      res.send({
        subscriptionId: subscription.id,
        clientSecret: paymentIntent?.client_secret,
      });
      return;
    }
    
    if (!user.claims.email) {
      throw new Error('No user email on file');
    }

    try {
      const customer = await stripe.customers.create({
        email: user.claims.email,
        name: `${user.claims.first_name || ''} ${user.claims.last_name || ''}`.trim(),
      });

      // You'll need to create a price in Stripe dashboard first
      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{
          // This would be your premium plan price ID from Stripe
          price: 'price_1234567890', // Replace with your actual price ID
        }],
        payment_behavior: 'default_incomplete',
        expand: ['latest_invoice.payment_intent'],
      });

      await storage.updateUserStripeInfo(userId, customer.id, subscription.id);
      
      // Update subscription status
      const expiryDate = new Date();
      expiryDate.setMonth(expiryDate.getMonth() + 1); // Monthly subscription
      await storage.updateSubscriptionStatus(userId, 'active', expiryDate);
      
      const latestInvoice = typeof subscription.latest_invoice === 'object' ? subscription.latest_invoice : null;
      const paymentIntent = latestInvoice && typeof (latestInvoice as any).payment_intent === 'object' ? (latestInvoice as any).payment_intent : null;
  
      res.send({
        subscriptionId: subscription.id,
        clientSecret: paymentIntent?.client_secret,
      });
    } catch (error: any) {
      console.error("Stripe subscription error:", error);
      return res.status(400).send({ error: { message: error.message } });
    }
  });

  // Create Stripe Checkout Session for subscription
  app.post('/api/subscription/create-checkout', isAuthenticated, csrfProtection, async (req: any, res) => {
    try {
      const userId = req.userId;
      const dbUser = await storage.getUser(userId);

      if (!dbUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Check if user already has an active subscription
      if (dbUser.subscriptionStatus === 'active' && dbUser.subscriptionExpiry && new Date(dbUser.subscriptionExpiry) > new Date()) {
        return res.status(400).json({ message: 'You already have an active subscription' });
      }

      // Get or create Stripe customer
      let customerId = dbUser.stripeCustomerId;
      if (!customerId) {
        const customer = await stripe.customers.create({
          email: dbUser.email,
          metadata: {
            userId: dbUser.id,
            username: dbUser.username || ''
          }
        });
        customerId = customer.id;
        await storage.updateUserStripeInfo(userId, customerId, '');
      }

      // Create checkout session
      const session = await stripe.checkout.sessions.create({
        customer: customerId,
        payment_method_types: ['card'],
        line_items: [
          {
            price: process.env.STRIPE_PRICE_ID || 'price_PLACEHOLDER',
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: `${req.protocol}://${req.get('host')}/?subscription=success`,
        cancel_url: `${req.protocol}://${req.get('host')}/?subscription=cancelled`,
        metadata: {
          userId: dbUser.id
        }
      });

      res.json({ url: session.url });
    } catch (error: any) {
      console.error("Stripe checkout error:", error);
      res.status(500).json({ message: error.message || 'Failed to create checkout session' });
    }
  });

  // Stripe webhook handler
  app.post('/api/stripe/webhook', express.raw({type: 'application/json'}), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!sig || !webhookSecret) {
      console.error('Missing Stripe signature or webhook secret');
      return res.status(400).send('Webhook Error: Missing signature or secret');
    }

    let event;
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    try {
      switch (event.type) {
        case 'checkout.session.completed': {
          const session = event.data.object;
          const userId = session.metadata?.userId;
          const customerId = session.customer as string;
          const subscriptionId = session.subscription as string;

          if (userId && subscriptionId) {
            await storage.updateUserStripeInfo(userId, customerId, subscriptionId);
            
            const subscription = await stripe.subscriptions.retrieve(subscriptionId);
            const expiryDate = new Date((subscription as any).current_period_end * 1000);
            await storage.updateSubscriptionStatus(userId, 'active', expiryDate);
            
            console.log(`Subscription activated for user ${userId}`);
          }
          break;
        }

        case 'customer.subscription.updated': {
          const subscription = event.data.object as any;
          const customerId = subscription.customer as string;
          
          const [dbUser] = await storage.getUserByStripeCustomer(customerId);
          if (dbUser) {
            const expiryDate = new Date(subscription.current_period_end * 1000);
            const status = subscription.status === 'active' ? 'active' : subscription.status;
            await storage.updateSubscriptionStatus(dbUser.id, status, expiryDate);
            console.log(`Subscription updated for user ${dbUser.id}: ${status}`);
          }
          break;
        }

        case 'customer.subscription.deleted': {
          const subscription = event.data.object;
          const customerId = subscription.customer as string;
          
          const [dbUser] = await storage.getUserByStripeCustomer(customerId);
          if (dbUser) {
            await storage.updateSubscriptionStatus(dbUser.id, 'canceled');
            console.log(`Subscription canceled for user ${dbUser.id}`);
          }
          break;
        }

        case 'invoice.payment_failed': {
          const invoice = event.data.object;
          const customerId = invoice.customer as string;
          
          const [dbUser] = await storage.getUserByStripeCustomer(customerId);
          if (dbUser) {
            await storage.updateSubscriptionStatus(dbUser.id, 'past_due');
            console.log(`Payment failed for user ${dbUser.id}`);
          }
          break;
        }
      }

      res.json({ received: true });
    } catch (error) {
      console.error('Webhook handler error:', error);
      res.status(500).json({ error: 'Webhook handler failed' });
    }
  });

  // Cancel subscription
  app.post('/api/subscription/cancel', isAuthenticated, csrfProtection, async (req: any, res) => {
    try {
      const userId = req.userId;
      const dbUser = await storage.getUser(userId);

      if (!dbUser?.stripeSubscriptionId) {
        return res.status(404).json({ message: 'No active subscription found' });
      }

      await stripe.subscriptions.cancel(dbUser.stripeSubscriptionId);
      await storage.updateSubscriptionStatus(userId, 'canceled');

      res.json({ message: 'Subscription canceled successfully' });
    } catch (error: any) {
      console.error("Subscription cancellation error:", error);
      res.status(500).json({ message: error.message || 'Failed to cancel subscription' });
    }
  });

  // Chord progression routes
  app.get("/api/chord-progressions", async (req, res) => {
    try {
      const { userId } = req.query;
      const progressions = await storage.getChordProgressions(userId as string);
      res.json(progressions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch chord progressions" });
    }
  });

  app.post("/api/chord-progressions", csrfProtection, async (req, res) => {
    try {
      const validatedData = insertChordProgressionSchema.parse(req.body);
      const progression = await storage.createChordProgression(validatedData);
      res.status(201).json(progression);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid chord progression data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create chord progression" });
      }
    }
  });

  app.get("/api/chord-progressions/:id", async (req, res) => {
    try {
      const progression = await storage.getChordProgression(req.params.id);
      if (!progression) {
        return res.status(404).json({ message: "Chord progression not found" });
      }
      res.json(progression);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch chord progression" });
    }
  });

  app.put("/api/chord-progressions/:id", async (req, res) => {
    try {
      const updates = req.body;
      const progression = await storage.updateChordProgression(req.params.id, updates);
      if (!progression) {
        return res.status(404).json({ message: "Chord progression not found" });
      }
      res.json(progression);
    } catch (error) {
      res.status(500).json({ message: "Failed to update chord progression" });
    }
  });

  app.delete("/api/chord-progressions/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteChordProgression(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Chord progression not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete chord progression" });
    }
  });

  app.get("/api/chord-progressions/favorites/:userId", async (req, res) => {
    try {
      const progressions = await storage.getFavoriteProgressions(req.params.userId);
      res.json(progressions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch favorite progressions" });
    }
  });

  // Serve static audio files
  app.use('/uploads', express.static('uploads', {
    setHeaders: (res, path) => {
      res.set('Cache-Control', 'public, max-age=31536000'); // 1 year cache
    }
  }));

  // Chat endpoints
  app.get('/api/chat/history', isAuthenticated, async (req: any, res) => {
    try {
      const roomId = req.query.room || 'public';
      const limit = parseInt(req.query.limit as string) || 50;
      const before = req.query.before ? new Date(req.query.before as string) : undefined;
      
      const messages = await storage.getChatHistory(roomId, limit, before);
      res.json(messages);
    } catch (error) {
      console.error("Error fetching chat history:", error);
      res.status(500).json({ message: "Failed to fetch chat history" });
    }
  });

  // Handle unsupported methods for chat history endpoint
  app.all('/api/chat/history', (req, res) => {
    if (req.method !== 'GET') {
      return res.status(405).json({ 
        message: `Method ${req.method} not allowed`,
        allowedMethods: ['GET']
      });
    }
  });

  app.post('/api/chat/upload-audio', 
    isAuthenticated,
    csrfProtection,
    createRateLimitMiddleware(mutationRateLimiter, "audio upload"),
    upload.single('audio'),
    async (req: any, res) => {
      try {
        if (!req.file) {
          return res.status(400).json({ message: "No audio file provided" });
        }

        const userId = req.userId;
        const roomId = req.body.roomId || 'public';

        // Validate magic bytes to ensure file is actually an audio file
        const magicValidation = validateAudioMagicBytes(req.file.buffer);
        if (!magicValidation.isValid) {
          return res.status(400).json({ 
            message: "Invalid audio file format. File does not appear to be a valid audio file.",
            code: 'INVALID_MAGIC_BYTES'
          });
        }

        // Additional consistency validation
        const consistencyCheck = validateFileConsistency(req.file.buffer, req.file.originalname, req.file.mimetype);
        if (!consistencyCheck.isValid) {
          return res.status(400).json({ 
            message: consistencyCheck.reason || "File validation failed",
            code: 'INCONSISTENT_FILE_FORMAT'
          });
        }

        // Validate audio duration and metadata using music-metadata
        const metadata = await parseBuffer(req.file.buffer, req.file.mimetype);
        const duration = metadata.format.duration;

        if (!duration || duration > 30) {
          return res.status(400).json({ 
            message: "Audio file must be 30 seconds or less",
            maxDuration: 30,
            fileDuration: duration 
          });
        }

        // Generate secure filename with whitelisted extensions
        const allowedExtensions = ['.mp3', '.wav', '.ogg', '.m4a', '.aac', '.flac'];
        const originalExtension = path.extname(req.file.originalname).toLowerCase();
        const safeExtension = allowedExtensions.includes(originalExtension) ? originalExtension : '.mp3';
        
        const filename = `${randomUUID()}${safeExtension}`;
        const uploadDir = path.join(process.cwd(), 'uploads', 'chat');
        const filePath = path.join(uploadDir, filename);
        
        // Ensure upload directory exists
        await fs.mkdir(uploadDir, { recursive: true });
        
        // Validate that final path is within expected directory (prevent path traversal)
        const resolvedPath = path.resolve(filePath);
        const resolvedUploadDir = path.resolve(uploadDir);
        if (!resolvedPath.startsWith(resolvedUploadDir)) {
          return res.status(400).json({ message: "Invalid file path" });
        }

        // Save file to disk
        await fs.writeFile(resolvedPath, req.file.buffer);

        // Create chat message with audio
        const chatMessage = await storage.createChatMessage({
          roomId,
          userId,
          content: null, // Audio-only message
          audioUrl: `/uploads/chat/${filename}`,
          audioDurationSec: Math.round(duration),
          mimeType: req.file.mimetype
        });

        const messageWithUser = {
          ...chatMessage,
          user: {
            id: req.userId,
            firstName: req.user.claims.first_name || 'Unknown',
            lastName: req.user.claims.last_name || '',
            profileImageUrl: req.user.claims.profile_image_url
          }
        };

        // Broadcast to all users in the room via Socket.IO
        const io = req.app.get('io');
        if (io) {
          io.to(roomId).emit('chat:message', messageWithUser);
        }

        res.json({
          message: "Audio uploaded successfully",
          chatMessage: messageWithUser
        });

      } catch (error) {
        console.error("Error uploading audio:", error);
        res.status(500).json({ message: "Failed to upload audio file" });
      }
    }
  );

  app.post('/api/chat/message', 
    isAuthenticated,
    csrfProtection,
    createRateLimitMiddleware(mutationRateLimiter, "chat message"),
    async (req: any, res) => {
      try {
        const userId = req.userId;
        
        // Validate request body
        const messageSchema = z.object({
          roomId: z.string().default('public'),
          content: z.string().min(1, "Message content is required").max(1000, "Message too long")
        });
        
        const validatedData = messageSchema.parse(req.body);
        
        // Sanitize content to prevent XSS attacks
        const sanitizedContent = DOMPurify.sanitize(validatedData.content, { 
          ALLOWED_TAGS: [], // Strip all HTML tags
          ALLOWED_ATTR: [] // Strip all attributes
        });
        
        const chatMessage = await storage.createChatMessage({
          roomId: validatedData.roomId,
          userId,
          content: sanitizedContent,
          audioUrl: null,
          audioDurationSec: null,
          mimeType: null
        });

        const messageWithUser = {
          ...chatMessage,
          user: {
            id: req.userId,
            firstName: req.user.claims.first_name || 'Unknown',
            lastName: req.user.claims.last_name || '',
            profileImageUrl: req.user.claims.profile_image_url
          }
        };

        // Broadcast to all users in the room via Socket.IO
        const io = req.app.get('io');
        if (io) {
          io.to(validatedData.roomId).emit('chat:message', messageWithUser);
        }

        res.json({
          message: "Message sent successfully",
          chatMessage: messageWithUser
        });

      } catch (error) {
        if (error instanceof z.ZodError) {
          return res.status(400).json({ 
            message: "Invalid message data", 
            errors: error.errors 
          });
        }
        console.error("Error sending message:", error);
        res.status(500).json({ message: "Failed to send message" });
      }
    }
  );

  const httpServer = createServer(app);
  
  // Initialize Socket.IO
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: process.env.NODE_ENV === 'development' 
        ? ["http://localhost:5000", "http://127.0.0.1:5000"] 
        : [], // Empty array in production for same-origin only
      methods: ["GET", "POST"],
      credentials: true // Allow cookies for session authentication
    }
  });

  // Socket.IO authentication middleware using session cookies
  const sessionMiddleware = getSession();
  io.engine.use((req: any, res: any, next: any) => {
    sessionMiddleware(req, res, next);
  });

  io.use(async (socket, next) => {
    try {
      const req = socket.request as any;
      
      // Rate limit Socket.IO connections to prevent DoS attacks
      const clientIP = req.connection.remoteAddress || req.socket.remoteAddress;
      if (!socketConnectionLimiter.isAllowed(clientIP)) {
        return next(new Error('Too many connection attempts. Please try again later.'));
      }
      
      // Check if user is authenticated via session (same as REST API)
      if (!req.session || !req.session.passport || !req.session.passport.user) {
        return next(new Error('Authentication required'));
      }

      const sessionUser = req.session.passport.user;
      if (!sessionUser.claims || !sessionUser.claims.sub) {
        return next(new Error('Invalid session'));
      }

      const userId = sessionUser.claims.sub;
      const user = await storage.getUser(userId);
      if (!user) {
        return next(new Error('User not found'));
      }

      // Attach user info to socket (using session claims like REST API)
      socket.data.user = {
        id: userId,
        firstName: sessionUser.claims.first_name || 'Unknown',
        lastName: sessionUser.claims.last_name || '',
        profileImageUrl: sessionUser.claims.profile_image_url
      };

      next();
    } catch (error) {
      console.error('Socket authentication error:', error);
      next(new Error('Authentication failed'));
    }
  });

  // Socket.IO connection handling
  io.on('connection', (socket) => {
    console.log(`User ${socket.data.user.firstName} connected to chat`);

    // Join the public room by default
    socket.join('public');

    // Handle joining specific rooms
    socket.on('chat:join', (roomId: string) => {
      socket.leave('public'); // Leave current room
      socket.join(roomId);
      console.log(`User ${socket.data.user.firstName} joined room: ${roomId}`);
    });

    // Handle real-time text messages
    socket.on('chat:message', async (data: { roomId: string; content: string }) => {
      try {
        const { roomId, content } = data;
        
        // Validate message content
        if (!content || content.trim().length === 0 || content.length > 1000) {
          socket.emit('chat:error', { message: 'Invalid message content' });
          return;
        }

        // Create message in database
        const chatMessage = await storage.createChatMessage({
          roomId: roomId || 'public',
          userId: socket.data.user.id,
          content: content.trim(),
          audioUrl: null,
          audioDurationSec: null,
          mimeType: null
        });

        // Broadcast to all users in the room
        const messageWithUser = {
          ...chatMessage,
          user: socket.data.user
        };

        io.to(roomId || 'public').emit('chat:message', messageWithUser);
        
      } catch (error) {
        console.error('Error handling chat message:', error);
        socket.emit('chat:error', { message: 'Failed to send message' });
      }
    });

    // Handle typing indicators
    socket.on('chat:typing', (data: { roomId: string; isTyping: boolean }) => {
      socket.to(data.roomId || 'public').emit('chat:typing', {
        userId: socket.data.user.id,
        userName: `${socket.data.user.firstName} ${socket.data.user.lastName}`.trim(),
        isTyping: data.isTyping
      });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log(`User ${socket.data.user.firstName} disconnected from chat`);
    });
  });

  // Attach io to the app so routes can access it for broadcasting
  app.set('io', io);

  return httpServer;
}
