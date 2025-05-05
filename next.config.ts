import createNextIntlPlugin from "next-intl/plugin";

import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        pathname: "**",
        protocol: "https",
        hostname: "burobiz-a.akamaihd.net",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
