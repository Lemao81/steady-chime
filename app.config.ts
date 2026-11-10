import type { ConfigContext, ExpoConfig } from 'expo/config'

const isProduction = process.env.APP_VARIANT === 'production'
const identifier = isProduction ? 'com.lemao81.steadychime' : 'com.lemao81.steadychime.dev'

export default function appConfig({ config }: ConfigContext): ExpoConfig {
  return {
    ...config,
    name: isProduction ? 'SteadyChime' : 'SteadyChime (Dev)',
    slug: 'SteadyChime',
    scheme: isProduction ? 'steadychime' : 'steadychime-dev',
    ios: { ...config.ios, bundleIdentifier: identifier },
    android: { ...config.android, package: identifier },
    plugins: [
      ...(config.plugins ?? []),
      ['expo-dev-client', { addGeneratedScheme: !isProduction }],
    ],
  }
}
