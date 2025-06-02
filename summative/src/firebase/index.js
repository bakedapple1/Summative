import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBPc0Qk-nxiSuxE2TZUYUwZgNhxOQKjTkM",
  authDomain: "ics4u-25f4d.firebaseapp.com",
  projectId: "ics4u-25f4d",
  storageBucket: "ics4u-25f4d.firebasestorage.app",
  messagingSenderId: "667592933008",
  appId: "1:667592933008:web:6fb2af3a76c8c5d1786215"
};

const config = initializeApp(firebaseConfig);
const auth = getAuth(config);
const firestore = getFirestore(config);

export { auth, firestore }