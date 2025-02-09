import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyADxWyaBwNVWM6tM1_CSR_s_oAyl-3q_vA",
  authDomain: "canopy-c3236.firebaseapp.com",
  projectId: "canopy-c3236",
  storageBucket: "canopy-c3236.firebasestorage.app",
  messagingSenderId: "279408028367",
  appId: "1:279408028367:web:b6f4e2e39e54268b64e5ba",
  measurementId: "G-1VGD34TZ1T",
  databaseURL: "https://canopy-c3236-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const database = getDatabase(app);
const storage = getStorage(app);

export { auth, db, app, database, storage };
