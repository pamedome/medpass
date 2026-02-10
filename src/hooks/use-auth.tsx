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
    const isPublicRoute = ['/', '/login', '/auth/forgot-password'].includes(pathname) || pathname.startsWith('/emergency-access');

    // If user is not logged in and is trying to access a protected route, redirect to login
    if (!user && protectedRoutes) {
      router.push('/login');
    }

    // If user is logged in and is on a public page like login or landing, redirect to dashboard
    if (user && (pathname === '/login' || pathname === '/')) {
      router.push('/dashboard');
    }
    
  }, [loading, user, userProfile, pathname, router]);

  return (
    <AuthContext.Provider value={{ user, userProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
