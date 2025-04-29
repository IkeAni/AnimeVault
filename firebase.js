import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBqX76TcPIH3HeGqc1YlnSOXLCt04bJc_s",
    authDomain: "animevault-6cb2e.firebaseapp.com",
    projectId: "animevault-6cb2e",
    storageBucket: "animevault-6cb2e.appspot.com",
    messagingSenderId: "231303616026",
    appId: "1:231303616026:web:9f844d55519f5fe2afa3a3"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Use persistent auth (so login survives app restarts)
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore
const db = getFirestore(app);

export { auth, db };