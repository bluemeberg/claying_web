// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIK1F6M0svPbrwL_QELpGD4Dfpt9sY8GM",
  authDomain: "claying-e3c36.firebaseapp.com",
  projectId: "claying-e3c36",
  storageBucket: "claying-e3c36.appspot.com",
  messagingSenderId: "831628530994",
  appId: "1:831628530994:web:3ca82f7c9a9d113b9bf32b",
  measurementId: "G-CG3LE3BVYQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
