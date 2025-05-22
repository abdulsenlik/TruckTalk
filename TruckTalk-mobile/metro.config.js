const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add WebSocket polyfills for the ws package to work in React Native
const defaultSourceExts = config.resolver.sourceExts;

// Resolve Node.js module issues
config.resolver.extraNodeModules = {
  stream: require.resolve('stream-browserify'),
  zlib: require.resolve('browserify-zlib'),
  util: require.resolve('util/'),
  process: require.resolve('process/browser'),
  https: require.resolve('https-browserify'),
  http: require.resolve('stream-http'),
  path: require.resolve('path-browserify'),
  crypto: require.resolve('crypto-browserify'),
  events: require.resolve('events/'),
  fs: false,
  os: require.resolve('os-browserify/browser.js'),
  // Provide empty implementations for modules that ws depends on
  net: require.resolve('./node_modules/@supabase/realtime-js/dist/module/lib/transformers.js'), // Empty module as placeholder
  tls: false,
  child_process: false,
  // Add WebSocket polyfill
  ws: require.resolve('./node_modules/@supabase/realtime-js/dist/module/RealtimeClient.js'), // Use Supabase's RealtimeClient instead
};

// Enable loading .web.js files for web-specific implementations
config.resolver.sourceExts = [
  ...defaultSourceExts,
  'web.js', 
  'web.jsx', 
  'web.ts', 
  'web.tsx'
];

// Override the resolver to prefer native implementations
config.resolver.resolveRequest = (context, moduleName, platform) => {
  // Redirect ws requests to use the native WebSocket
  if (moduleName === 'ws') {
    return {
      filePath: require.resolve('./node_modules/@supabase/realtime-js/dist/module/RealtimeClient.js'),
      type: 'sourceFile',
    };
  }
  // Use the default resolver for all other modules
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
