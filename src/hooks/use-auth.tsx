'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from 'react';
import { getAuth, onAuthStateChanged, User, Auth } from 'firebase/auth';
import { getFirestore, doc, onSnapshot, Firestore } from 'firebase/firestore';
import { app } from '@/lib/firebase-client';
import { UserProfile } from '@/lib/types';
import { useRouter, usePathname } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  auth: Auth | null;
  db: Firestore | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  loading: true,
  auth: null,
  db: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const auth = useMemo(() => getAuth(app), []);
  const db = useMemo(() => getFirestore(app), []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (!user) {
        setLoading(false);
        setUserProfile(null);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      const unsubscribe = onSnapshot(userDocRef, (doc) => {
        if (doc.exists()) {
          const profileData = doc.data() as UserProfile;
          setUserProfile(profileData);

          // Route guarding logic
          const isAuthRoute = pathname.startsWith('/auth/signup');
          const onboardingStatus = profileData.onboardingStatus;
          
          if (onboardingStatus !== 'complete' && !isAuthRoute) {
            const step = onboardingStatus.split('_')[0]; // 'country', 'kyc', 'verify'
            let redirectPath = `/auth/signup/${step}`;
            
            if (step === 'kyc') {
              redirectPath = `/auth/signup/kyc/${profileData.region || 'eu'}`;
            }
            router.push(redirectPath);
          } else if (onboardingStatus === 'complete' && isAuthRoute) {
            router.push('/dashboard');
          }

        } else {
          // This case might happen if Firestore doc creation fails after signup
          setUserProfile(null);
          if (!pathname.startsWith('/auth/signup')) {
            router.push('/auth/signup/account');
          }
        }
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
        // Not logged in, redirect from protected routes
        const isProtectedRoute = !['/', '/login'].includes(pathname) && !pathname.startsWith('/auth/signup') && !pathname.startsWith('/emergency-access');
        if(isProtectedRoute) {
            router.push('/login');
        }
    }
  }, [user, db, router, pathname]);

  return (
    <AuthContext.Provider value={{ user, userProfile, loading, auth, db }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
