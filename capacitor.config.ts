import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'local.images',
  appName: 'local-images',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
