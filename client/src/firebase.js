// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blogapp-dc91b.firebaseapp.com",
  projectId: "blogapp-dc91b",
  storageBucket: "blogapp-dc91b.appspot.com",
  messagingSenderId: "884296817302",
  appId: "1:884296817302:web:e0268fadcb70f215b980b7",
  measurementId: "G-CFZ8ZP6EGZ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
