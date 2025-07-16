// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTsopipE0qvwCksuyUH-awC3YhWe3ZxBY",
  authDomain: "colftrack.firebaseapp.com",
  projectId: "colftrack",
  storageBucket: "colftrack.firebasestorage.app",
  messagingSenderId: "747142445314",
  appId: "1:747142445314:web:a26a2083640009671dea1b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
