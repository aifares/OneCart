import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfCgE5ZJ-N6Eb6tpHXJj-ihaxr3h_sTW0",
  authDomain: "onecart-47511.firebaseapp.com",
  projectId: "onecart-47511",
  storageBucket: "onecart-47511.appspot.com",
  messagingSenderId: "361055457819",
  appId: "1:361055457819:web:cd1dfd9f565c1b945fdebe",
  measurementId: "G-C3E0H2WE9Q",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

export { app, db, auth };
