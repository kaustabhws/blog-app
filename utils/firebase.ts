// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "blog-app-91330.firebaseapp.com",
  projectId: "blog-app-91330",
  storageBucket: "blog-app-91330.appspot.com",
  messagingSenderId: "456568500726",
  appId: "1:456568500726:web:d699a8c3cb17a06a2cd7d7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);