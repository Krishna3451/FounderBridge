import { initializeApp } from 'firebase/app';
import { getAuth, GithubAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
export const auth = getAuth(app);
auth.useDeviceLanguage();

// Configure GitHub Provider
export const githubProvider = new GithubAuthProvider();
githubProvider.addScope('user'); // Add scope to access user's profile
githubProvider.setCustomParameters({
  'allow_signup': 'true'
});
