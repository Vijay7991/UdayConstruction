// Firebase initialisation. Keys come from .env (VITE_ prefix is required so Vite
// inlines them into the client bundle). These keys are NOT secret — security is
// enforced by Firestore security rules (see FIREBASE_RULES.md).

import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
};

// Lazy / forgiving init — if env is missing we still let the rest of the site
// render, and only the contact form fails (with a clear message).
let app, db;
const isConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

if (isConfigured) {
  app = initializeApp(firebaseConfig);
  db  = getFirestore(app);
}

/**
 * Submit a lead to Firestore `leads` collection.
 * @param {{name: string, phone: string, email?: string, service?: string, message?: string}} lead
 */
export async function submitLead(lead) {
  if (!isConfigured) {
    throw new Error(
      'Firebase is not configured yet. Add Firebase keys to .env (see .env.example).',
    );
  }
  // Light client-side sanity. Real validation lives in Firestore rules.
  const cleaned = {
    name:    String(lead.name    ?? '').trim().slice(0, 80),
    phone:   String(lead.phone   ?? '').trim().slice(0, 20),
    email:   String(lead.email   ?? '').trim().slice(0, 120),
    service: String(lead.service ?? '').trim().slice(0, 60),
    message: String(lead.message ?? '').trim().slice(0, 1000),
    source:  typeof window !== 'undefined' ? window.location.pathname : '',
    userAgent:
      typeof navigator !== 'undefined' ? navigator.userAgent.slice(0, 200) : '',
    createdAt: serverTimestamp(),
  };

  if (!cleaned.name || !cleaned.phone) {
    throw new Error('Name and phone are required.');
  }
  return addDoc(collection(db, 'leads'), cleaned);
}

export { isConfigured as firebaseConfigured };
