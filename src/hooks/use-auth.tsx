'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { useFirebaseAuth, useFirestore } from '@/firebase';
import { UserProfile } from '@/lib/types';
import { useRouter, usePathname } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useFirebaseAuth();
  const db = useFirestore();
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Effect 1: Handle Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        setUserProfile(null);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  // Effect 2: Handle fetching the user profile from Firestore
  useEffect(() => {
    if (!user) return; // No user, nothing to fetch

    setLoading(true); // We have a user, start loading the profile
    const userDocRef = doc(db, 'users', user.uid);
    const unsubscribe = onSnapshot(userDocRef, (doc) => {
      if (doc.exists()) {
        setUserProfile(doc.data() as UserProfile);
      } else {
        setUserProfile(null); // Doc doesn't exist
      }
      setLoading(false); // Done loading profile
    }, (error) => {
      console.error("Error fetching user profile:", error);
      setUserProfile(null);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [user, db]);

  // Effect 3: Handle all routing logic based on the current state
  useEffect(() => {
    if (loading) {
      return; // Wait until auth and profile state are resolved
    }

    const isPublicRoute = ['/', '/login', '/auth/forgot-password'].includes(pathname) || 
                          pathname.startsWith('/auth/signup') || 
                          pathname.startsWith('/emergency-access');

    // Case A: No user is logged in. Redirect from protected routes.
    if (!user) {
      if (!isPublicRoute) {
        router.push('/login');
      }
      return;
    }

    // --- From here on, we know the user is authenticated. ---

    // Case B: User is authenticated, but has no profile document in Firestore.
    // This means they are a new user who hasn't completed the first signup step.
    if (!userProfile) {
      if (!pathname.startsWith('/auth/signup/account')) {
        router.push('/auth/signup/account');
      }
      return;
    }
    
    // Case C: User is authenticated and has a profile document.
    const { onboardingStatus, region } = userProfile;
    
    if (onboardingStatus === 'complete') {
      // If onboarding is complete, they should be on the dashboard or other app pages.
      // If they land on a public/auth page, redirect them to the dashboard.
      const isOnAuthPage = pathname.startsWith('/auth/signup') || pathname === '/login';
      if (isOnAuthPage) {
        router.push('/dashboard');
      }
    } else {
      // Onboarding is not complete. Force them to the correct step.
      const step = onboardingStatus.split('_')[0]; // 'country', 'kyc', 'verify'
      let requiredPath = `/auth/signup/${step}`;
      
      if (step === 'kyc' && region) {
        requiredPath = `/auth/signup/kyc/${region.toLowerCase()}`;
      }
      
      // Only redirect if they are not already on the correct page.
      if (pathname !== requiredPath) {
        router.push(requiredPath);
      }
    }
    
  }, [loading, user, userProfile, pathname, router]);

  return (
    <AuthContext.Provider value={{ user, userProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
