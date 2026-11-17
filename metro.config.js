// Firebase JS SDK ships .cjs files; disable package exports so the React Native build of firebase/auth is used.
const { getDefaultConfig } = require('expo/metro-config');
const config = getDefaultConfig(__dirname);
config.resolver.sourceExts.push('cjs');
config.resolver.unstable_enablePackageExports = false;
module.exports = config;
