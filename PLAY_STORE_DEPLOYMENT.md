# Guitar Dice - Play Store Deployment Guide

## ✅ What's Already Done

Your app is **100% code-ready** for Play Store deployment:
- ✅ Hybrid payment system (Stripe + RevenueCat) implemented
- ✅ Platform detection working (web → Stripe, mobile → Google Play)
- ✅ RevenueCat SDK integrated (v11.2.11)
- ✅ Backend webhook handler ready
- ✅ Database schema updated
- ✅ Android build configuration ready (v1.10.0)
- ✅ GitHub Actions workflow ready for automated builds

---

## 📋 What You Need to Do (3 Main Steps)

### **STEP 1: Set Up RevenueCat Account (10 minutes)**

#### 1.1 Create Account
1. Go to https://www.revenuecat.com on your phone browser
2. Click **"Sign Up Free"**
3. Use your email and create a password
4. Verify your email

#### 1.2 Create Project
1. Click **"Create a project"**
2. Project name: `Guitar Dice`
3. Click **"Create"**

#### 1.3 Add Android App
1. In your project dashboard, click **"Apps"**
2. Click **"Add App"**
3. Select **"Google Play"**
4. App name: `Guitar Dice`
5. Bundle ID: `com.chorddice.app`
6. Click **"Save"**

#### 1.4 Connect Google Play
1. Still in the app settings, scroll to **"Google Play Store"**
2. Click **"Connect"**
3. Upload your **Google Play service account JSON file**
   - (This is the same file you used for GitHub Actions deployment)
4. Click **"Save"**

#### 1.5 Create Subscription Product
1. Click **"Products"** in left sidebar
2. Click **"New"** → **"Subscription"**
3. Fill in:
   - **Product ID**: `guitar_dice_premium`
   - **Display name**: `Guitar Dice Premium`
   - **Google Play Product ID**: `guitar_dice_premium`
4. Click **"Save"**

#### 1.6 Create Offering
1. Click **"Offerings"** in left sidebar
2. Click **"New Offering"**
3. Offering ID: `default`
4. Display name: `Premium Membership`
5. Add the `guitar_dice_premium` product
6. Make it the **current offering**
7. Click **"Save"**

#### 1.7 Get Your API Keys
1. Click **"API Keys"** in left sidebar
2. You'll see two keys:
   - **Public API Key** (starts with `goog_...`)
   - **Secret API Key** (starts with `sk_...`)
3. **SAVE THESE** - you'll need them in Step 2

---

### **STEP 2: Add Secrets to Replit (5 minutes)**

You need to add 3 environment secrets to your Replit project:

#### On Replit.com (Desktop Browser Recommended):
1. Open your Guitar Dice project
2. Click **"Tools"** → **"Secrets"**
3. Add these 3 secrets:

| Secret Name | Value | Where to Get It |
|------------|-------|----------------|
| `VITE_REVENUECAT_API_KEY` | `goog_...` | RevenueCat → API Keys → **Public** |
| `REVENUECAT_API_KEY` | `sk_...` | RevenueCat → API Keys → **Secret** |
| `REVENUECAT_WEBHOOK_SECRET` | (any random string) | Generate yourself: `guitar-dice-webhook-2025-secure` |

**Important**: Keep the `REVENUECAT_WEBHOOK_SECRET` value - you'll need it for Step 3.

---

### **STEP 3: Configure RevenueCat Webhook (5 minutes)**

#### 3.1 Get Your App URL
1. In Replit, click the browser preview
2. Copy the URL (looks like: `https://xxxx.replit.app`)

#### 3.2 Set Up Webhook
1. Go back to RevenueCat dashboard
2. Click **"Integrations"** in left sidebar
3. Click **"Webhooks"**
4. Click **"Add Webhook"**
5. Fill in:
   - **URL**: `https://your-replit-url.replit.app/revenuecat/webhook`
     - (Replace `your-replit-url` with your actual Replit URL)
   - **Environment**: Select **"Production"** (or both for testing)
   - **Authorization Header**: `Bearer guitar-dice-webhook-2025-secure`
     - (Use the exact same value you put in `REVENUECAT_WEBHOOK_SECRET`)
6. Select all event types (or at minimum):
   - `INITIAL_PURCHASE`
   - `RENEWAL`
   - `CANCELLATION`
   - `EXPIRATION`
7. Click **"Add Webhook"**

---

## 🚀 Deploy to Play Store

### Option A: Automatic Deployment (Recommended)
1. Update version in `android/app/build.gradle`:
   ```gradle
   versionCode 31
   versionName "1.10.0"
   ```
2. Commit and push to GitHub
3. Create version tag:
   ```bash
   git tag v1.10.0
   git push origin v1.10.0
   ```
4. GitHub Actions will automatically:
   - Build signed APK/AAB
   - Upload to Play Store Internal Testing

### Option B: Manual Build (From Mobile)
Since you're on mobile, use GitHub Actions (Option A) instead.

---

## 🧪 Testing Before Release

### Test on Android Device:
1. Download APK from Play Store Internal Testing
2. Install on your phone
3. Open app → Click **"Upgrade to Premium"**
4. You should see:
   - **"Google Play"** badge (not Stripe)
   - Google Play billing dialog
   - Test subscription works

### Test Webhook:
1. Make a test purchase (use Google Play test card)
2. Check Replit logs for webhook activity
3. Verify subscription status updates in database

---

## ✅ Pre-Launch Checklist

- [ ] RevenueCat account created
- [ ] Android app connected to Google Play
- [ ] Subscription product created (`guitar_dice_premium`)
- [ ] API keys added to Replit secrets
- [ ] Webhook configured and tested
- [ ] Test purchase completed successfully
- [ ] App uploaded to Play Store Internal Testing
- [ ] Internal testing with real device passed

---

## 🆘 Troubleshooting

### "Subscription modal shows Stripe on Android"
- Check that `VITE_REVENUECAT_API_KEY` secret exists in Replit
- Restart the app workflow
- Clear app cache and reinstall

### "No products available"
- Verify offering is marked as "current" in RevenueCat
- Check product ID matches exactly: `guitar_dice_premium`
- Ensure app is published to Play Store (at least Internal Testing)

### "Webhook not firing"
- Check webhook URL is correct
- Verify authorization header matches `REVENUECAT_WEBHOOK_SECRET`
- Look for webhook errors in RevenueCat dashboard

---

## 📞 Need Help?

If you get stuck:
1. Check RevenueCat's status page: https://status.revenuecat.com
2. Review RevenueCat docs: https://docs.revenuecat.com
3. Ask me to debug specific errors!

---

**Your app is ready to go live! 🎸✨**

Once you complete these 3 steps, you'll have a fully functional Android app on Play Store with native Google Play billing.
