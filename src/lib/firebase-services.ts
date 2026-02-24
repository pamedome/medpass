'use client';
import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';
import {
  sendEmailVerification,
} from 'firebase/auth';
import { initializeFirebase } from '@/firebase';

export const updateUserOnboarding = async (uid: string, data: object) => {
  const { db } = initializeFirebase();
  const userDocRef = doc(db, 'users', uid);
  await setDoc(userDocRef, data, { merge: true });
};

export const sendVerificationEmail = async () => {
  const { auth } = initializeFirebase();
  const user = auth.currentUser;
  if (user) {
    await sendEmailVerification(user);
  } else {
    throw new Error('No user is currently signed in to send a verification email.');
  }
};
