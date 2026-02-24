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

  // Effect 3: Handle all routing logic
  useEffect(() => {
    if (loading) {
      return; // Wait until auth and profile state are resolved
    }

    const protectedRoutes = pathname.startsWith('/dashboard');
    const authRoutes = pathname.startsWith('/auth') || pathname === '/login';

    // If user is not logged in, redirect to login if they are on a protected route
    if (!user && protectedRoutes) {
      router.push('/login');
      return;
    }
    
    // If user is logged in
    if (user) {
      // If user profile is not loaded or does not exist, do nothing and wait
      if (!userProfile) {
        // This can happen briefly. Or if the user doc was deleted.
        return;
      }
      
      const onboardingComplete = userProfile.onboardingStatus === 'complete';

      if (onboardingComplete) {
        // If onboarding is complete, redirect from auth routes to dashboard
        if (authRoutes || pathname === '/') {
          router.push('/dashboard');
        }
      } else {
        // If onboarding is not complete, redirect to the correct onboarding step
        let targetPath = '/auth/signup/country'; // Default start
        switch (userProfile.onboardingStatus) {
            case 'kyc_pending':
                targetPath = `/auth/signup/kyc/${userProfile.region.toLowerCase()}`;
                break;
            case 'verify_pending':
                targetPath = '/auth/signup/verify';
                break;
        }
        
        // Redirect if not already on the correct onboarding page
        if (!pathname.startsWith('/auth/signup')) {
            router.push(targetPath);
        }
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
