// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-e0e49.firebaseapp.com",
  projectId: "mern-blog-e0e49",
  storageBucket: "mern-blog-e0e49.appspot.com",
  messagingSenderId: "14048773956",
  appId: "1:14048773956:web:fb354eb4a429b55a9d3911"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);