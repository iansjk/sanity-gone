/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.ctfassets.net"],
    formats: ["image/avif", "image/webp"],
    // set minimumCacheTTL to 7 days
    minimumCacheTTL: 604800,
  },
};

module.exports = nextConfig;
