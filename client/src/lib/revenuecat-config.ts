import { Purchases, LOG_LEVEL, PURCHASES_ERROR_CODE } from '@revenuecat/purchases-capacitor';
import { isNativePlatform } from './platform-utils';

export interface RevenueCatConfig {
  androidApiKey?: string;
  iosApiKey?: string;
}

let isConfigured = false;

export async function configureRevenueCat(userId?: string): Promise<void> {
  if (!isNativePlatform()) {
    console.log('RevenueCat: Skipping configuration on web platform');
    return;
  }

  if (isConfigured) {
    console.log('RevenueCat: Already configured');
    return;
  }

  try {
    const apiKey = import.meta.env.VITE_REVENUECAT_API_KEY;
    
    if (!apiKey) {
      console.warn('RevenueCat: API key not found. Set VITE_REVENUECAT_API_KEY environment variable.');
      return;
    }

    await Purchases.setLogLevel({ level: LOG_LEVEL.DEBUG });
    
    const config: { apiKey: string; appUserID?: string } = { apiKey };
    if (userId) {
      config.appUserID = userId;
    }
    
    await Purchases.configure(config);
    isConfigured = true;
    
    console.log('RevenueCat: Successfully configured', userId ? `for user ${userId}` : '');
  } catch (error) {
    console.error('RevenueCat: Configuration failed', error);
    throw error;
  }
}

export async function getRevenueCatOfferings() {
  if (!isNativePlatform()) {
    return null;
  }

  try {
    const offerings = await Purchases.getOfferings();
    return offerings.current;
  } catch (error) {
    console.error('RevenueCat: Failed to get offerings', error);
    return null;
  }
}

export async function purchaseRevenueCatPackage(packageId: string) {
  if (!isNativePlatform()) {
    throw new Error('RevenueCat purchases are only available on mobile platforms');
  }

  try {
    const offerings = await Purchases.getOfferings();
    const currentOffering = offerings.current;
    
    if (!currentOffering) {
      throw new Error('No offerings available');
    }

    const selectedPackage = currentOffering.availablePackages.find(
      pkg => pkg.identifier === packageId
    );

    if (!selectedPackage) {
      throw new Error(`Package ${packageId} not found`);
    }

    const { customerInfo } = await Purchases.purchasePackage({
      aPackage: selectedPackage
    });

    return customerInfo;
  } catch (error: any) {
    if (error.code === PURCHASES_ERROR_CODE.PURCHASE_CANCELLED_ERROR) {
      console.log('RevenueCat: Purchase cancelled by user');
      return null;
    }
    console.error('RevenueCat: Purchase failed', error);
    throw error;
  }
}

export async function getRevenueCatCustomerInfo() {
  if (!isNativePlatform()) {
    return null;
  }

  try {
    const customerInfo = await Purchases.getCustomerInfo();
    return customerInfo;
  } catch (error) {
    console.error('RevenueCat: Failed to get customer info', error);
    return null;
  }
}

export async function checkRevenueCatSubscription(entitlementId: string = 'premium'): Promise<boolean> {
  if (!isNativePlatform()) {
    return false;
  }

  try {
    const result = await Purchases.getCustomerInfo();
    if (!result?.customerInfo) return false;

    const hasEntitlement = result.customerInfo.entitlements.active[entitlementId] !== undefined;
    return hasEntitlement;
  } catch (error) {
    console.error('RevenueCat: Failed to check subscription', error);
    return false;
  }
}

export async function restoreRevenueCatPurchases() {
  if (!isNativePlatform()) {
    return null;
  }

  try {
    const customerInfo = await Purchases.restorePurchases();
    return customerInfo;
  } catch (error) {
    console.error('RevenueCat: Failed to restore purchases', error);
    throw error;
  }
}

export async function logoutRevenueCat() {
  if (!isNativePlatform()) {
    return;
  }

  try {
    await Purchases.logOut();
    isConfigured = false;
    console.log('RevenueCat: User logged out');
  } catch (error) {
    console.error('RevenueCat: Logout failed', error);
  }
}
