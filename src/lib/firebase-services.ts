'use client';
import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import { initializeFirebase } from '@/firebase';
import { UserProfile, UserRole } from './types';

const { db, auth } = initializeFirebase();

export const signUpWithEmail = async (
  email: string,
  password: string,
  role: UserRole
) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  const userProfile: Partial<UserProfile> = {
    uid: user.uid,
    email: user.email,
    role: role,
    createdAt: serverTimestamp(),
    onboardingStatus: 'country_pending',
    kyc: {
      kycStatus: 'pending',
    },
  };

  await setDoc(doc(db, 'users', user.uid), userProfile);
  return user;
};

export const updateUserOnboarding = async (
  uid: string,
  data: Partial<UserProfile>
) => {
  const userRef = doc(db, 'users', uid);
  await setDoc(userRef, data, { merge: true });
};

export const sendVerificationEmail = async () => {
  const user = auth.currentUser;
  if (user) {
    await sendEmailVerification(user);
  } else {
    throw new Error('No user is currently signed in.');
  }
};
