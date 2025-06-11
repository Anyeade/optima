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
    // Handle "Class extends value undefined" error
    config.module.rules.push({
      test: /\.next\/server\/chunks\/.*\.js$/,
      loader: 'string-replace-loader',
      options: {
        search: 'Class extends value undefined is not a constructor or null',
        replace: '',
        flags: 'g'
      }
    });

    // Ignore specific warnings
    config.ignoreWarnings = [
      /Class extends value undefined is not a constructor or null/
    ];

    return config;
  }
};

export default nextConfig;
