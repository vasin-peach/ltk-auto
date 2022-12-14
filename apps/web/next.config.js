/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone", // to bundle both client and server in the same docker image
  experimental: {
    transpilePackages: ["@config/*", "@libs/*"],
  },
};

module.exports = nextConfig;
