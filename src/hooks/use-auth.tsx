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
        setLoading(false);
        if (doc.exists()) {
          const profileData = doc.data() as UserProfile;
          setUserProfile(profileData);

          const isAuthRoute = pathname.startsWith('/auth/signup');
          const isLoginRoute = pathname === '/login';
          const onboardingStatus = profileData.onboardingStatus;
          
          if (onboardingStatus !== 'complete' && !isAuthRoute) {
            const step = onboardingStatus.split('_')[0]; // 'country', 'kyc', 'verify'
            let redirectPath = `/auth/signup/${step}`;
            
            if (step === 'kyc') {
              redirectPath = `/auth/signup/kyc/${profileData.region || 'eu'}`;
            }
            if (pathname !== redirectPath) {
              router.push(redirectPath);
            }
          } else if (onboardingStatus === 'complete' && (isAuthRoute || isLoginRoute)) {
            router.push('/dashboard');
          }

        } else {
          setUserProfile(null);
          if (!pathname.startsWith('/auth/signup')) {
            router.push('/auth/signup/account');
          }
        }
      }, (error) => {
        console.error("Error fetching user profile:", error);
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
        setLoading(false);
        const isProtectedRoute = !['/', '/login'].includes(pathname) && !pathname.startsWith('/auth/signup') && !pathname.startsWith('/emergency-access');
        if(isProtectedRoute) {
            router.push('/login');
        }
    }
  }, [user, db, router, pathname]);

  return (
    <AuthContext.Provider value={{ user, userProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
