// Resolves a path under `public/` to a fully-qualified URL on the deployment
// origin. Necessary because Next's built-in `assetPrefix` only rewrites
// `/_next/*` bundles — assets under `public/` referenced by hardcoded paths
// (e.g. `<img src="/workflow/MV_mode.webp" />`) stay relative, which 404s
// when the site is served from a different domain than where the asset
// actually lives (e.g. www.tunee.ai consuming files from
// all-features-nextjs-main.vercel.app).
//
// Reads `NEXT_PUBLIC_ASSET_PREFIX` (set in .env.production); falls back to
// the input untouched in dev so local-only paths still work.

function trimTrailingSlash(value: string): string {
  return value.replace(/\/+$/, "");
}

export function publicAssetUrl(path: string): string {
  const prefix = trimTrailingSlash(process.env.NEXT_PUBLIC_ASSET_PREFIX ?? "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return prefix ? `${prefix}${normalized}` : normalized;
}
