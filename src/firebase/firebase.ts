// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUeIj6-XtP6ArjUT4pjyA7Lq5PbKNE7ek",
  authDomain: "projetreact-e3c59.firebaseapp.com",
  databaseURL: "https://projetreact-e3c59-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "projetreact-e3c59",
  storageBucket: "projetreact-e3c59.appspot.com",
  messagingSenderId: "1021530007430",
  appId: "1:1021530007430:web:e293d20231538d9b862e07",
  measurementId: "G-83YTCHP94P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;