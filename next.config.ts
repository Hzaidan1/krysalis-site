import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/editing-services",
        destination: "/post-production",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
