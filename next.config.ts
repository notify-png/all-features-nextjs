import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Reverse-proxied from www.tunee.ai at /features/*. Serve CSS/JS under that path so they load
  // same-origin instead of from the vercel.app domain; Next auto-rewrites
  // /features/_next/:path+ → /_next/:path+ for a relative assetPrefix.
  assetPrefix: process.env.NODE_ENV === "production" ? "/features" : undefined,
  // public/ files are served same-origin via /features/_public/* (see NEXT_PUBLIC_ASSET_PREFIX)
  async rewrites() {
    return {
      beforeFiles: [{ source: "/features/_public/:path*", destination: "/:path*" }],
    };
  },
  async redirects() {
    return [
      {
        source: "/jp/:path*",
        destination: "/ja/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tunee.ai",
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(mp4|webm|ogg)$/,
      type: "asset/resource",
      generator: {
        filename: "static/media/[name].[hash][ext]",
      },
    });
    return config;
  },
};

export default withNextIntl(nextConfig);
