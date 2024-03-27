// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZyQidI5aTm5Ch-az6l6m0-v36p1dGJt4",
  authDomain: "blog-post-natia.firebaseapp.com",
  projectId: "blog-post-natia",
  storageBucket: "blog-post-natia.appspot.com",
  messagingSenderId: "613688985396",
  appId: "1:613688985396:web:d13f99e2e09a7d8f0d4761",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();
