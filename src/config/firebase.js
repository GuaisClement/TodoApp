import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAUeIj6-XtP6ArjUT4pjyA7Lq5PbKNE7ek",
    authDomain: "projetreact-e3c59.firebaseapp.com",
    projectId: "projetreact-e3c59",
    storageBucket: "projetreact-e3c59.appspot.com",
    messagingSenderId: "1021530007430",
    appId: "1:1021530007430:web:e293d20231538d9b862e07",
    measurementId: "G-83YTCHP94P"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
