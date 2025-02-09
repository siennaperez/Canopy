import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyADxWyaBwNVWM6tM1_CSR_s_oAyl-3q_vA",
  authDomain: "http://10.136.35.119:8081/_expo/loading",
  projectId: "canopy-c3236",
  storageBucket: "canopy-c3236.firebasestorage.app",
  messagingSenderId: "279408028367",
  appId: "1:279408028367:web:b6f4e2e39e54268b64e5ba",
  measurementId: "G-1VGD34TZ1T"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export { auth, db };
