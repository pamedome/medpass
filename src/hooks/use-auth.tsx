'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, onSnapshot, setDoc, serverTimestamp } from 'firebase/firestore';
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
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (!user) {
        // If user logs out, clear profile and stop loading
        setUserProfile(null);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, [auth]);

  // Effect 2: Sync user profile from Firestore, creating it if it doesn't exist
  useEffect(() => {
    if (!user) {
      return; // No user, no profile to sync.
    }

    setLoading(true);
    const userDocRef = doc(db, 'users', user.uid);

    const unsubscribeProfile = onSnapshot(userDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const profileData = docSnapshot.data() as UserProfile;
        // Handle legacy users who might not have onboardingStatus
        if (!profileData.onboardingStatus) {
          setDoc(userDocRef, { onboardingStatus: 'complete' }, { merge: true });
          // The snapshot will re-fire with the updated data, so we don't stop loading here.
        } else {
          setUserProfile(profileData);
          setLoading(false);
        }
      } else {
        // User is authenticated, but no profile document exists. Create one.
        const newProfile: UserProfile = {
          uid: user.uid,
          email: user.email,
          createdAt: serverTimestamp(),
          onboardingStatus: 'complete', // Default to complete for simple signup
          region: 'OTHER',
          kyc: {},
        };
        setDoc(userDocRef, newProfile).catch(err => {
          console.error("Failed to create user profile:", err);
          setLoading(false); // Stop loading on error to prevent getting stuck
        });
        // The onSnapshot listener will be triggered again once the document is created.
      }
    }, (error) => {
      console.error("Error fetching user profile:", error);
      setUserProfile(null);
      setLoading(false);
    });

    return () => unsubscribeProfile();
  }, [user, db]);

  // Effect 3: Handle all routing logic based on auth and profile state
  useEffect(() => {
    if (loading) {
      return; // Wait until auth state and profile are resolved
    }

    const isProtectedRoute = pathname.startsWith('/dashboard');
    const isAuthRoute = pathname.startsWith('/auth') || pathname === '/login';

    // Case 1: User is not logged in
    if (!user) {
      if (isProtectedRoute) {
        router.push('/login');
      }
      return;
    }

    // Case 2: User is logged in, but profile is not yet loaded (or failed to load)
    if (!userProfile) {
      // Don't redirect, wait for profile.
      return;
    }
    
    // Case 3: User is logged in and has a profile
    const onboardingComplete = userProfile.onboardingStatus === 'complete';

    if (onboardingComplete) {
      // If onboarding is complete, they should be in the dashboard.
      // Redirect from auth routes or the landing page.
      if (isAuthRoute || pathname === '/') {
        router.push('/dashboard');
      }
    } else {
      // Onboarding is NOT complete, redirect to the correct step
      let targetPath = '/auth/signup/country'; // Default start
      switch (userProfile.onboardingStatus) {
        case 'kyc_pending':
          targetPath = `/auth/signup/kyc/${userProfile.region.toLowerCase()}`;
          break;
        case 'verify_pending':
          targetPath = '/auth/signup/verify';
          break;
      }
      if (pathname !== targetPath) {
        router.push(targetPath);
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
