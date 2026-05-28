import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all paths except API, _next, files with extensions, and /jp redirects.
  matcher: [
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
