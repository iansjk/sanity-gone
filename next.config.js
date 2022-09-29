/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.ctfassets.net"],
    formats: ["image/avif", "image/webp"],
    // set minimumCacheTTL to 7 days
    minimumCacheTTL: 604800,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");
const withVanillaExtract = createVanillaExtractPlugin({
  identifiers: process.env.NODE_ENV === "production" ? "short" : "debug",
});
module.exports = withVanillaExtract(withBundleAnalyzer(nextConfig));
