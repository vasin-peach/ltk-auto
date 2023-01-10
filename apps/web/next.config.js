/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone', // to bundle both client and server in the same docker image
  experimental: {
    transpilePackages: ['@config/*', '@libs/*', '@ui/*'],
    outputFileTracingRoot: path.join(__dirname, '../..'),
  },
  images: {
    remotePatterns: [
      {
        hostname: '*.googleusercontent.com',
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}

module.exports = nextConfig
