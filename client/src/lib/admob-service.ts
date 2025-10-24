import { AdMob, RewardAdOptions, AdMobRewardItem, RewardAdPluginEvents } from '@capacitor-community/admob';
import { Capacitor } from '@capacitor/core';

interface AdReward {
  type: string;
  amount: number;
}

class AdMobService {
  private isInitialized = false;
  private isWeb = !Capacitor.isNativePlatform();
  private appId: string;
  private adUnitId: string;
  private adRewardCallback: ((reward: AdReward) => void) | null = null;

  constructor() {
    this.appId = import.meta.env.VITE_ADMOB_APP_ID || '';
    this.adUnitId = import.meta.env.VITE_ADMOB_AD_UNIT_ID || '';
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      if (!this.isWeb) {
        // Native platform (Android/iOS)
        await AdMob.initialize({
          testingDevices: [], // Add test device IDs in development
          initializeForTesting: false,
        });
        
        // Set up reward listener
        AdMob.addListener(RewardAdPluginEvents.Rewarded, (reward: AdMobRewardItem) => {
          console.log('[AdMob] User earned reward:', reward);
          if (this.adRewardCallback) {
            this.adRewardCallback({
              type: reward.type,
              amount: reward.amount,
            });
          }
        });

        console.log('[AdMob] Initialized for native platform');
      } else {
        // Web platform - Load Google AdSense script
        await this.loadAdSenseScript();
        console.log('[AdMob] Initialized for web platform');
      }
      
      this.isInitialized = true;
    } catch (error) {
      console.error('[AdMob] Initialization error:', error);
      throw new Error('Failed to initialize AdMob');
    }
  }

  private loadAdSenseScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Check if script already loaded
      if (document.querySelector('script[src*="adsbygoogle.js"]')) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.setAttribute('data-ad-client', this.appId);
      
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load AdSense script'));
      
      document.head.appendChild(script);
    });
  }

  async showRewardedAd(): Promise<AdReward> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      if (!this.isWeb) {
        // Native platform - Use Capacitor AdMob plugin
        return await this.showNativeRewardedAd();
      } else {
        // Web platform - Show rewarded ad via AdSense
        return await this.showWebRewardedAd();
      }
    } catch (error) {
      console.error('[AdMob] Error showing rewarded ad:', error);
      throw error;
    }
  }

  private async showNativeRewardedAd(): Promise<AdReward> {
    return new Promise(async (resolve, reject) => {
      try {
        const options: RewardAdOptions = {
          adId: this.adUnitId,
          isTesting: false, // Set to true for testing
        };

        // Set up one-time reward callback
        this.adRewardCallback = (reward: AdReward) => {
          resolve(reward);
          this.adRewardCallback = null;
        };

        // Prepare the ad
        console.log('[AdMob] Preparing rewarded ad...');
        await AdMob.prepareRewardVideoAd(options);
        console.log('[AdMob] Rewarded ad prepared');

        // Show the ad
        console.log('[AdMob] Showing rewarded ad...');
        const reward = await AdMob.showRewardVideoAd();
        console.log('[AdMob] Ad shown, reward:', reward);
        
        // Resolve with reward if callback wasn't triggered
        if (this.adRewardCallback) {
          this.adRewardCallback = null;
          resolve({
            type: reward.type,
            amount: reward.amount,
          });
        }

      } catch (error) {
        console.error('[AdMob] Native rewarded ad error:', error);
        this.adRewardCallback = null;
        reject(error);
      }
    });
  }

  private async showWebRewardedAd(): Promise<AdReward> {
    // For web, we'll simulate the ad experience with a timeout
    // In production, you'd integrate with Google AdSense rewarded ads
    // or use a different ad network that supports web rewarded ads
    
    return new Promise((resolve, reject) => {
      // Show a modal or overlay explaining the ad will play
      const confirmed = window.confirm(
        'Watch a short video ad to earn 1 bonus dice roll?\n\n' +
        '(In production, this will show a real video ad from Google AdMob)'
      );

      if (!confirmed) {
        reject(new Error('User cancelled ad'));
        return;
      }

      // Simulate ad duration (30 seconds)
      const adDuration = 3000; // 3 seconds for testing, use 30000 in production
      
      // Show loading overlay
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        color: white;
        font-family: Arial, sans-serif;
      `;
      
      const content = document.createElement('div');
      content.style.cssText = 'text-align: center; padding: 20px;';
      
      const message = document.createElement('div');
      message.textContent = 'Ad playing...';
      message.style.cssText = 'font-size: 20px; margin-bottom: 20px;';
      
      const spinner = document.createElement('div');
      spinner.innerHTML = '⏳';
      spinner.style.cssText = 'font-size: 48px; animation: spin 2s linear infinite;';
      
      const timer = document.createElement('div');
      timer.style.cssText = 'margin-top: 20px; font-size: 16px;';
      
      content.appendChild(message);
      content.appendChild(spinner);
      content.appendChild(timer);
      overlay.appendChild(content);
      
      // Add spinner animation
      const style = document.createElement('style');
      style.textContent = '@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }';
      document.head.appendChild(style);
      
      document.body.appendChild(overlay);
      
      // Countdown timer
      let remaining = Math.floor(adDuration / 1000);
      timer.textContent = `${remaining} seconds remaining`;
      
      const countdown = setInterval(() => {
        remaining--;
        if (remaining > 0) {
          timer.textContent = `${remaining} seconds remaining`;
        } else {
          clearInterval(countdown);
        }
      }, 1000);
      
      // Complete after ad duration
      setTimeout(() => {
        clearInterval(countdown);
        document.body.removeChild(overlay);
        document.head.removeChild(style);
        
        resolve({
          type: 'dice_roll',
          amount: 1,
        });
      }, adDuration);
    });
  }

  async isAdReady(): Promise<boolean> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    if (this.isWeb) {
      // On web, ads are always "ready" (simulated)
      return true;
    }

    // On native, ads should be loaded via prepareRewardVideoAd
    return true;
  }
}

// Export singleton instance
export const admobService = new AdMobService();
