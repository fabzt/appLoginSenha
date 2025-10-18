import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDajfeLK9w_Z3roFh0D0LMRUL6YuRYySCg",
  authDomain: "apploginsenha-6093d.firebaseapp.com",
  projectId: "apploginsenha-6093d",
  storageBucket: "apploginsenha-6093d.firebasestorage.app",
  messagingSenderId: "173189124437",
  appId: "1:173189124437:web:e4de6f1fedf47e8f665fdc",
  measurementId: "G-T0ZE580LD1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth (app);
const db = getFirestore(app);

export { auth, db };

