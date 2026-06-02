// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID as string,
};

let app: any;
let auth: any;
let analytics: any = null;
let db: any = null;

const hasFirebaseKeys = !!(import.meta.env.VITE_FIREBASE_API_KEY && import.meta.env.VITE_FIREBASE_API_KEY !== "undefined");

if (hasFirebaseKeys) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    try {
      analytics = getAnalytics(app);
    } catch (e) {
      console.warn("Analytics initialization failed: ", e);
    }
    db = getFirestore(app);
  } catch (error) {
    console.error("Firebase initialization failed: ", error);
  }
} else {
  console.warn("VITE_FIREBASE_API_KEY is not defined. Using mock auth client.");
  // Provide a minimal mock client so importing auth/db won't crash the app
  auth = {
    currentUser: null,
    onAuthStateChanged: (callback: any) => {
      const savedUserStr = localStorage.getItem("user");
      if (savedUserStr) {
        try {
          const user = JSON.parse(savedUserStr);
          callback({
            uid: user.id,
            email: user.email,
            displayName: user.name,
          });
        } catch {
          callback(null);
        }
      } else {
        callback(null);
      }
      return () => {};
    }
  };
}

export { app, auth, analytics, db, hasFirebaseKeys };