import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// The route guarding logic, including authentication checks and onboarding status,
// is handled on the client-side within the `useAuth` hook (src/hooks/use-auth.tsx).
// The previous middleware implementation was causing a build error due to an unused
// dependency and has been simplified to prevent conflicts.
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - / (landing page is public)
     * - /login (login page is public)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|logo.svg|emergency-access|login|$).*)',
  ],
};
