import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { initializeAppCheck, ReCaptchaEnterpriseProvider, AppCheck } from 'firebase/app-check';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  firebaseConfig.apiKey !== 'your_api_key_here' &&
  firebaseConfig.apiKey.length > 5
);

import { getStorage, FirebaseStorage } from 'firebase/storage';

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;
let storage: FirebaseStorage | undefined;
let appCheck: AppCheck | undefined;

if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);

    // Firebase App Check — blocks curl/Postman/script attacks
    // Only requests from the real website (verified by reCAPTCHA Enterprise) are allowed
    if (import.meta.env.VITE_RECAPTCHA_SITE_KEY) {
      appCheck = initializeAppCheck(app, {
        provider: new ReCaptchaEnterpriseProvider(import.meta.env.VITE_RECAPTCHA_SITE_KEY),
        isTokenAutoRefreshEnabled: true,
      });
    }
  } catch (e) {
    console.warn('Firebase initialization skipped/failed:', e);
  }
}

export { app, auth, db, storage, appCheck };

export interface ContactQuery {
  id?: string;
  name: string;
  company?: string;
  email: string;
  website?: string;
  service: string;
  budget: string;
  message: string;
  status: 'new' | 'in-review' | 'replied' | 'archived';
  createdAt?: any;
  replyMessage?: string;
  repliedAt?: any;
}
