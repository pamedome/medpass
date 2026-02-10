import { initializeApp, getApps, getApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBI5VZsIk5mXE0yMckWLSrwS8cOFXOoaUs",
  authDomain: "health-passport-rs9b1.firebaseapp.com",
  projectId: "health-passport-rs9b1",
  storageBucket: "health-passport-rs9b1.appspot.com",
  messagingSenderId: "885921956861",
  appId: "1:885921956861:web:4634fb1bda05fea7a08f94"
};


// Initialize Firebase
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
