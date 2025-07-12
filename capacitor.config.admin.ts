import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.esportshq.admin',
  appName: 'Esports HQ - Admin',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: "#dc2626",
      androidSplashResourceName: "splash",
      showSpinner: true,
      spinnerColor: "#ffffff"
    },
    StatusBar: {
      style: "dark"
    }
  }
};

export default config;