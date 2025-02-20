// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZGmEPgQB_UwKC3XNT_OoNzNqmy3xrENo",
  authDomain: "task-management-c46a2.firebaseapp.com",
  projectId: "task-management-c46a2",
  storageBucket: "task-management-c46a2.firebasestorage.app",
  messagingSenderId: "361830926833",
  appId: "1:361830926833:web:00719549c5390add2fdc50"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth