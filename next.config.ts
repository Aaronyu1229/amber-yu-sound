import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Image uploads go through a Server Action; the default request body
    // limit is 1MB, which silently rejects normal photos. Our image cap
    // is 5MB — allow headroom for multipart overhead.
    serverActions: {
      bodySizeLimit: "8mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
};

export default nextConfig;
