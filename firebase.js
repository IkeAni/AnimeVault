import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyBqX76TcPIH3HeGqc1YlnSOXLCt04bJc_s",
    authDomain: "animevault-6cb2e.firebaseapp.com",
    projectId: "animevault-6cb2e",
    storageBucket: "animevault-6cb2e.appspot.com",
    messagingSenderId: "231303616026",
    appId: "1:231303616026:web:9f844d55519f5fe2afa3a3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Use default memory persistence for Expo Go
const auth = getAuth(app);

// Firestore works the same
const db = getFirestore(app);

export { auth, db };
