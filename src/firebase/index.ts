import { getApp, getApps, initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

import { firebaseConfig } from './config';

interface FirebaseInstances {
  app: FirebaseApp;
  auth: Auth;
  db: Firestore;
}

let firebaseInstances: FirebaseInstances | null = null;

export const initializeFirebase = (): FirebaseInstances => {
  if (firebaseInstances) {
    return firebaseInstances;
  }

  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  const auth = getAuth(app);
  const db = getFirestore(app);

  firebaseInstances = { app, auth, db };
  return firebaseInstances;
};

export {
  FirebaseProvider,
  FirebaseClientProvider,
  useFirebase,
  useFirebaseApp,
  useAuth as useFirebaseAuth, // renamed to avoid conflict with my own useAuth
  useFirestore,
} from './provider';
