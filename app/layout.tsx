// The actual <html>/<body> is rendered by `app/[locale]/layout.tsx` so that
// `<html lang>` matches the route's locale. next-intl's middleware ensures every
// request resolves under `[locale]`, so this root layout is a passthrough.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
