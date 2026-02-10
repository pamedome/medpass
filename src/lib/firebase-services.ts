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

// This file is intentionally left with no exports as the signup flow has been removed.
// The functions that were here (signUpWithEmail, updateUserOnboarding, sendVerificationEmail)
// are no longer needed.
