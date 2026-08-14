import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // assetPrefix: all-features-nextjs-new is reverse-proxied from tunee.ai at /features/...
  // CSS/JS bundles live on the Vercel deployment; assetPrefix forces the browser to load
  // them from the correct origin instead of looking on tunee.ai which doesn't have them.
  assetPrefix:
    process.env.NODE_ENV === "production"
      ? "https://all-features-nextjs-main.vercel.app"
      : undefined,
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
