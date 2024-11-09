// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCjWutRJ87ISiAM8Bl5VJ7S9lt1o7tNfOE",
  authDomain: "blogging-app-react-1124.firebaseapp.com",
  projectId: "blogging-app-react-1124",
  storageBucket: "blogging-app-react-1124.firebasestorage.app",
  messagingSenderId: "99089957566",
  appId: "1:99089957566:web:22be4591b3c86839f1d4ef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
