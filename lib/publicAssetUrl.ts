function trimTrailingSlash(value: string): string {
  return value.replace(/\/+$/, "");
}

/** Prefix for files served from `public/` when using a CDN / absolute asset host (matches `assetPrefix`). */
export function publicAssetUrl(path: string): string {
  const prefix = trimTrailingSlash(process.env.NEXT_PUBLIC_ASSET_PREFIX ?? "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return prefix ? `${prefix}${normalized}` : normalized;
}
