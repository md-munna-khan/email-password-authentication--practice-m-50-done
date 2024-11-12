// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEufbcCY6UnZJHGo-7twM1vkVX6pkHFU8",
  authDomain: "auth-router-practiace.firebaseapp.com",
  projectId: "auth-router-practiace",
  storageBucket: "auth-router-practiace.firebasestorage.app",
  messagingSenderId: "742688966885",
  appId: "1:742688966885:web:8cd076582fc8d93c366c0c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
 export const auth = getAuth(app);