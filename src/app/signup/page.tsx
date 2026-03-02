'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function SignupRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the login page, which now contains the signup form in a tab.
    router.replace('/login');
  }, [router]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  );
}
