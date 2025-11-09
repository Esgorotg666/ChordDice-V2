# RevenueCat Integration Guide - Guitar Dice

## 🎸 **Important: Your App Architecture**

Guitar Dice is a **Capacitor web app** (React + TypeScript), NOT a native Android Kotlin app.

### What This Means:
- ✅ **You write JavaScript/TypeScript** - No Kotlin code needed
- ✅ **Capacitor handles native code** - Gradle dependencies are auto-managed
- ✅ **RevenueCat Capacitor Plugin** - Already installed (v11.2.11)
- ✅ **Platform-agnostic code** - Same code works on iOS, Android, and Web

---

## ✅ **What's Already Implemented**

Your RevenueCat integration is **90% complete**! Here's what you already have:

### 1. SDK Installation ✅
```json
"@revenuecat/purchases-capacitor": "^11.2.11"
```
**Location:** `package.json` (already installed)

### 2. Configuration ✅
**File:** `client/src/lib/revenuecat-config.ts`
```typescript
await Purchases.configure({
  apiKey: 'your-api-key',
  appUserID: userId // Optional
});
```
**Status:** ✅ Fully implemented with platform detection

### 3. Get Offerings ✅
```typescript
const offerings = await getRevenueCatOfferings();
const currentOffering = offerings.current;
```
**Status:** ✅ Implemented in `revenuecat-config.ts`

### 4. Purchase Products ✅
```typescript
const customerInfo = await purchaseRevenueCatPackage(packageId);
```
**Status:** ✅ Implemented with error handling and cancellation support

### 5. Check Entitlements ✅
```typescript
const hasAccess = await checkRevenueCatSubscription('premium');
```
**Status:** ✅ Implemented in `revenuecat-config.ts`

### 6. Customer Info ✅
```typescript
const customerInfo = await getRevenueCatCustomerInfo();
```
**Status:** ✅ Implemented

### 7. Restore Purchases ✅
```typescript
const customerInfo = await restoreRevenueCatPurchases();
```
**Status:** ✅ Implemented

### 8. Backend Webhook Handler ✅
**File:** `server/revenuecatRoutes.ts`
- ✅ Webhook endpoint: `/revenuecat/webhook`
- ✅ Authorization validation
- ✅ Idempotency handling
- ✅ Database sync

---

## 🆕 **What We'll Add Now**

### 1. RevenueCat Paywalls (Native UI)
### 2. Customer Center (Self-Service Management)
### 3. Your New API Key

---

## 📋 **Step-by-Step Enhancement**

### **STEP 1: Install Paywalls UI Package**

```bash
npm install @revenuecat/purchases-capacitor-ui@11.2.11
npx cap sync
```

**Note:** Version must match your main plugin (11.2.11)

---

### **STEP 2: Update Your API Key**

Your new test API key: `test_pKctjUmJiRxQVlmJEOHUtAIfGQO`

**Add to Replit Secrets:**
1. Go to Replit → Tools → Secrets
2. Update: `VITE_REVENUECAT_API_KEY` = `test_pKctjUmJiRxQVlmJEOHUtAIfGQO`

---

### **STEP 3: Create Enhanced RevenueCat Helper**

**New File:** `client/src/lib/revenuecat-ui.ts`

```typescript
import { RevenueCatUI } from '@revenuecat/purchases-capacitor-ui';
import { PAYWALL_RESULT } from '@revenuecat/purchases-capacitor';
import { isNativePlatform } from './platform-utils';

/**
 * Present RevenueCat native paywall
 * Only shows if user doesn't have the required entitlement
 */
export async function presentPaywallIfNeeded(
  entitlementId: string = 'premium'
): Promise<boolean> {
  if (!isNativePlatform()) {
    console.log('Paywalls only available on native platforms');
    return false;
  }

  try {
    const { result } = await RevenueCatUI.presentPaywallIfNeeded({
      requiredEntitlementIdentifier: entitlementId
    });

    if (result === PAYWALL_RESULT.PURCHASED) {
      console.log('User purchased from paywall');
      return true;
    } else if (result === PAYWALL_RESULT.CANCELLED) {
      console.log('User dismissed paywall');
      return false;
    } else if (result === PAYWALL_RESULT.NOT_PRESENTED) {
      console.log('User already has entitlement');
      return true;
    }

    return false;
  } catch (error) {
    console.error('Paywall error:', error);
    return false;
  }
}

/**
 * Always present RevenueCat native paywall (for "Upgrade" button)
 */
export async function presentPaywall(
  offeringId?: string
): Promise<boolean> {
  if (!isNativePlatform()) {
    console.log('Paywalls only available on native platforms');
    return false;
  }

  try {
    const options = offeringId 
      ? { offeringIdentifier: offeringId }
      : {};

    const { result } = await RevenueCatUI.presentPaywall(options);

    if (result === PAYWALL_RESULT.PURCHASED) {
      console.log('User purchased from paywall');
      return true;
    }

    return false;
  } catch (error) {
    console.error('Paywall error:', error);
    return false;
  }
}

/**
 * Present Customer Center for subscription management
 */
export async function presentCustomerCenter(): Promise<void> {
  if (!isNativePlatform()) {
    console.log('Customer Center only available on native platforms');
    return;
  }

  try {
    await RevenueCatUI.presentCustomerCenter();
    console.log('Customer Center presented');
  } catch (error) {
    console.error('Customer Center error:', error);
  }
}
```

---

### **STEP 4: Create Product Configuration**

**RevenueCat Dashboard Setup:**

1. **Go to:** https://app.revenuecat.com
2. **Create Products:**
   - `monthly` - Monthly Subscription ($4.99/month)
   - `yearly` - Yearly Subscription ($49.99/year)
   - `lifetime` - Lifetime Access ($99.99 one-time)

3. **Create Offering (ID: `default`):**
   - Package 1: Monthly (`monthly`)
   - Package 2: Yearly (`yearly`)
   - Package 3: Lifetime (`lifetime`)

4. **Create Entitlement (ID: `premium`):**
   - Attach to all three products

---

### **STEP 5: Update Subscription Modal**

**File:** `client/src/components/subscription-modal.tsx`

Add native paywall support:

```typescript
import { presentPaywall } from '@/lib/revenuecat-ui';

// In handleRevenueCatPurchase():
const handleRevenueCatPurchase = async () => {
  try {
    // Option 1: Use native paywall UI
    const purchased = await presentPaywall();
    
    if (purchased) {
      await queryClient.invalidateQueries({ queryKey: ['/api/subscription/status'] });
      toast({
        title: "Welcome to Premium!",
        description: "Your subscription is now active!",
      });
      onOpenChange(false);
    }
    
    setIsLoading(false);
  } catch (error: any) {
    setIsLoading(false);
    throw error;
  }
};
```

---

### **STEP 6: Add Customer Center Button**

**File:** `client/src/pages/account.tsx` (or settings page)

```typescript
import { presentCustomerCenter } from '@/lib/revenuecat-ui';

// Add button in your account/settings UI:
<Button 
  onClick={presentCustomerCenter}
  data-testid="manage-subscription-btn"
>
  Manage Subscription
</Button>
```

---

## 🎯 **Product Configuration (RevenueCat Dashboard)**

### Products You Need to Create:

| Product ID | Type | Price | Platform |
|-----------|------|-------|----------|
| `monthly` | Auto-renewable subscription | $4.99/month | Google Play + App Store |
| `yearly` | Auto-renewable subscription | $49.99/year | Google Play + App Store |
| `lifetime` | Non-consumable | $99.99 one-time | Google Play + App Store |

### Entitlement:
- **ID:** `premium`
- **Products:** All three (monthly, yearly, lifetime)

### Offering:
- **ID:** `default`
- **Packages:** Monthly (default), Yearly, Lifetime
- **Make it Current:** ✅ Yes

---

## 🔧 **Complete Integration Checklist**

- [x] RevenueCat SDK installed (v11.2.11)
- [x] Configuration helper created
- [x] Get offerings implemented
- [x] Purchase flow implemented
- [x] Entitlement checking implemented
- [x] Restore purchases implemented
- [x] Backend webhook handler created
- [ ] Install Paywalls UI package
- [ ] Update API key in Replit secrets
- [ ] Create product configuration in dashboard
- [ ] Add native paywall support
- [ ] Add Customer Center button
- [ ] Test on Android device

---

## 📱 **Testing on Android**

### 1. Build APK:
```bash
npm run build
npx cap copy android
npx cap open android
# Build from Android Studio
```

### 2. Test Purchase Flow:
1. Open app on device
2. Click "Upgrade to Premium"
3. Native Google Play paywall appears
4. Use test card to purchase
5. Verify entitlement grants access

### 3. Test Customer Center:
1. Go to Account/Settings
2. Click "Manage Subscription"
3. Customer Center opens with management options

---

## 🆚 **Native Kotlin vs Capacitor Comparison**

| Feature | Native Kotlin (Your Request) | Capacitor (What You Have) |
|---------|------------------------------|---------------------------|
| **Language** | Kotlin | JavaScript/TypeScript |
| **Build System** | Gradle only | Capacitor → Gradle (auto) |
| **Code Location** | `android/app/src/main/java/` | `client/src/` |
| **Package Manager** | Gradle | npm + Gradle (auto-sync) |
| **Web Support** | ❌ No | ✅ Yes |
| **iOS Support** | ❌ Need separate Swift | ✅ Same code |
| **Learning Curve** | High (Kotlin + Android) | Medium (just JavaScript) |

**Bottom Line:** Your Capacitor setup gives you cross-platform support with one codebase!

---

## 🚀 **Next Steps**

1. **Install UI package:** `npm install @revenuecat/purchases-capacitor-ui`
2. **Update API key** in Replit secrets
3. **Configure products** in RevenueCat dashboard
4. **Add Paywalls** to subscription modal
5. **Add Customer Center** to account page
6. **Build and test** on Android device

---

## 🆘 **Common Questions**

### "Do I need to write Kotlin code?"
**No!** Capacitor handles all native code. You only write JavaScript/TypeScript.

### "Do I need to edit build.gradle?"
**No!** The `@revenuecat/purchases-capacitor` plugin automatically adds all Gradle dependencies when you run `npx cap sync`.

### "Where's the native Android code?"
It's in `node_modules/@revenuecat/purchases-capacitor/android/` - fully managed by the plugin. You never edit it.

### "Can I use Google Play Billing directly?"
You could, but RevenueCat handles billing + backend + analytics + webhooks all in one. Much easier!

---

**You're 90% done! Just add the UI components and you're ready to deploy.** 🎸✨
