import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.esportshq.user',
  appName: 'Esports HQ - User',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: "#1e40af",
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