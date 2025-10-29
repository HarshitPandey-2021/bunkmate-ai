import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA8gFzqYsRewyDFIQ0uIsi4Cq2SlqhLKPM",
  authDomain: "bunkmateai.firebaseapp.com",
  projectId: "bunkmateai",
  storageBucket: "bunkmateai.firebasestorage.app",
  messagingSenderId: "358741457639",
  appId: "1:358741457639:web:764ed7c83ab724ed524042"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;