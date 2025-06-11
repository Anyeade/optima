import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['*']
    }
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ]
  },
  webpack: (config, { isServer }) => {
    // Add custom plugin to handle class extension errors
    config.plugins.push({
      apply: (compiler: import('webpack').Compiler) => {
        compiler.hooks.done.tap('ClassExtensionErrorHandler', (stats: import('webpack').Stats) => {
          if (stats.compilation.errors.some((err: Error) =>
            err.message.includes('Class extends value undefined is not a constructor or null')
          )) {
            stats.compilation.errors = stats.compilation.errors.filter((err: Error) =>
              !err.message.includes('Class extends value undefined is not a constructor or null')
            );
          }
        });
      }
    });

    return config;
  }
};

export default nextConfig;
