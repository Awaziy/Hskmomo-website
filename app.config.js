// Expo app config. Values come from .env (see .env.example).
const BUNDLE_ID = process.env.EXPO_PUBLIC_BUNDLE_ID || 'com.hskmomo.app';
const FB_APP_ID = process.env.EXPO_PUBLIC_FACEBOOK_APP_ID || '0000000000';
const WECHAT_APP_ID = process.env.EXPO_PUBLIC_WECHAT_APP_ID || 'wx0000000000000000';
const GOOGLE_IOS = process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID || '';
// Google iOS sign-in needs the reversed client id as a URL scheme.
const googleScheme = GOOGLE_IOS ? GOOGLE_IOS.split('.').reverse().join('.') : null;

module.exports = {
  expo: {
    name: 'HSK Momo',
    slug: 'hsk-momo',
    scheme: 'hskmomo',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    userInterfaceStyle: 'light',
    newArchEnabled: false,
    splash: { image: './assets/images/splash.png', resizeMode: 'contain', backgroundColor: '#D9534F' },
    ios: {
      bundleIdentifier: BUNDLE_ID,
      supportsTablet: true,
      usesAppleSignIn: true,
      infoPlist: {
        CFBundleURLTypes: [
          { CFBundleURLSchemes: [`fb${FB_APP_ID}`] },
          { CFBundleURLName: 'weixin', CFBundleURLSchemes: [WECHAT_APP_ID] },
          ...(googleScheme ? [{ CFBundleURLSchemes: [googleScheme] }] : []),
        ],
        LSApplicationQueriesSchemes: ['weixin', 'weixinULAPI', 'weixinURLParamsAPI', 'fbapi', 'fb-messenger-share-api'],
        ITSAppUsesNonExemptEncryption: false,
      },
    },
    android: {
      package: BUNDLE_ID,
      adaptiveIcon: { foregroundImage: './assets/images/adaptive-icon.png', backgroundColor: '#D9534F' },
      permissions: ['INTERNET'],
    },
    web: { bundler: 'metro', output: 'single', favicon: './assets/images/icon.png' },
    plugins: [
      'expo-router',
      'expo-localization',
      'expo-apple-authentication',
      ['./plugins/withWechat', { appId: WECHAT_APP_ID }],
    ],
    experiments: { typedRoutes: false },
    extra: { eas: { projectId: process.env.EAS_PROJECT_ID || undefined } },
  },
};
