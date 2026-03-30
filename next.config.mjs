/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/bottle-rye",
  assetPrefix: "/bottle-rye",
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
};

export default nextConfig;
