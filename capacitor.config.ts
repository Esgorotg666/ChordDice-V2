import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.chorddice.app',
  appName: 'Guitar Dice',
  webDir: 'dist/public',
  server: {
    androidScheme: 'https'
  }
};

export default config;
