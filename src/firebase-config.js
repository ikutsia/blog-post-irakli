// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Verifying the environment variables (temporarily for debugging)
console.log(
  "API Key:",
  process.env.REACT_APP_API_KEY ? "✅ Loaded" : "❌ Missing"
);
console.log(
  "Auth Domain:",
  process.env.REACT_APP_AUTH_DOMAIN ? "✅ Loaded" : "❌ Missing"
);
console.log(
  "Project ID:",
  process.env.REACT_APP_PROJECT_ID ? "✅ Loaded" : "❌ Missing"
);
console.log(
  "Storage Bucket:",
  process.env.REACT_APP_STORAGE_BUCKET ? "✅ Loaded" : "❌ Missing"
);
console.log(
  "Messaging Sender ID:",
  process.env.REACT_APP_MESSAGING_SENDER_ID ? "✅ Loaded" : "❌ Missing"
);
console.log(
  "App ID:",
  process.env.REACT_APP_APP_ID ? "✅ Loaded" : "❌ Missing"
);

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Check if environment variables are loaded
if (!process.env.REACT_APP_API_KEY) {
  console.error("Environment variables not loaded! Check your .env file.");
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();
