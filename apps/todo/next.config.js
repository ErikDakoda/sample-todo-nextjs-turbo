import { PrismaPlugin } from '@prisma/nextjs-monorepo-workaround-plugin';

const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()];
    }
    return config;
  },
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ['@zenstackhq/runtime'],
  },
  transpilePackages: [
    '@erikdakoda/database',
    '@erikdakoda/tailwind-ui',
    '@erikdakoda/todo',
    '@erikdakoda/auth',
    '@erikdakoda/auth-ui',
  ],
  swcMinify: true,
  images: {
    domains: ['picsum.photos', 'lh3.googleusercontent.com', 'avatars.githubusercontent.com'],
  },
  env: {
    APP_VERSION: process.env.npm_package_version,
  },
};

export default nextConfig;
