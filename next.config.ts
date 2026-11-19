import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Old page addresses keep working and forward to the new pages.
  async redirects() {
    return [
      { source: "/research", destination: "/projects", permanent: true },
      { source: "/workshops-events", destination: "/outreach", permanent: true },
      { source: "/contact", destination: "/connect", permanent: true },
    ];
  },
};

export default nextConfig;
