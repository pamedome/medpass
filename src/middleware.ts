import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { get } from '@vercel/edge-config';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // This is a placeholder for actual authentication logic.
  // In a real app, you would get the user's session, probably from a cookie.
  const isAuthenticated = request.cookies.has('__session');

  // Placeholder for fetching user profile from an API or Edge Config
  // In a real app, this would be a fetch to your backend or a DB lookup.
  const userOnboardingStatus = isAuthenticated
    ? await get('onboardingStatus') // Example: 'country_pending', 'kyc_pending', 'complete'
    : null;

  const authRoutes = [
    '/auth/signup/account',
    '/auth/signup/country',
    '/auth/signup/verify',
  ];
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route)) || pathname.startsWith('/auth/signup/kyc/');

  // If user is not authenticated, redirect them to the login page from any protected route.
  if (!isAuthenticated && !isAuthRoute && pathname !== '/login' && pathname !== '/') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If the user is authenticated, enforce the onboarding flow.
  if (isAuthenticated && userOnboardingStatus) {
    if (userOnboardingStatus !== 'complete' && !isAuthRoute) {
      const step = userOnboardingStatus.split('_')[0]; // 'country', 'kyc', 'verify'
      let redirectPath = `/auth/signup/${step}`;
      
      if (step === 'kyc') {
        const region = await get('region'); // Fetch user's region
        redirectPath = `/auth/signup/kyc/${region || 'eu'}`; // Default to 'eu' if not found
      }
      return NextResponse.redirect(new URL(redirectPath, request.url));
    }
    
    // If onboarding is complete, but they are trying to access signup pages, redirect to dashboard
    if (userOnboardingStatus === 'complete' && isAuthRoute) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

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
