import { Capacitor } from '@capacitor/core';

export type Platform = 'web' | 'ios' | 'android';
export type PaymentProvider = 'stripe' | 'google_play' | 'app_store';

export function getPlatform(): Platform {
  const platform = Capacitor.getPlatform();
  if (platform === 'ios') return 'ios';
  if (platform === 'android') return 'android';
  return 'web';
}

export function isNativePlatform(): boolean {
  return Capacitor.isNativePlatform();
}

export function getPaymentProvider(): PaymentProvider {
  const platform = getPlatform();
  if (platform === 'android') return 'google_play';
  if (platform === 'ios') return 'app_store';
  return 'stripe';
}

export function shouldUseRevenueCat(): boolean {
  return isNativePlatform();
}

export function shouldUseStripe(): boolean {
  return !isNativePlatform();
}
