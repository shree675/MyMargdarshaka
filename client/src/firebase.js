//@ts-check

import firebase from "firebase";

console.log(process.env.REACT_APP_FIREBASE_API_KEY);

// firebase credentials
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "mymargdarshakaweb.firebaseapp.com",
  projectId: "mymargdarshakaweb",
  storageBucket: "mymargdarshakaweb.appspot.com",
  messagingSenderId: "285220513922",
  appId: "1:285220513922:web:3f4bab8e8070694fe6ec9b",
  measurementId: "G-BY7CXNRTWW",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
