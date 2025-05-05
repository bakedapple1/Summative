// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPc0Qk-nxiSuxE2TZUYUwZgNhxOQKjTkM",
  authDomain: "ics4u-25f4d.firebaseapp.com",
  projectId: "ics4u-25f4d",
  storageBucket: "ics4u-25f4d.firebasestorage.app",
  messagingSenderId: "667592933008",
  appId: "1:667592933008:web:6fb2af3a76c8c5d1786215"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(firebaseConfig);
const firestore = getFirestore(firebaseConfig);

export { auth, firestore }