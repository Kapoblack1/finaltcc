import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyDB30U4EImdkwsTHCgw0oG5FKoGC2YYExw",
  authDomain: "bora1-e4c37.firebaseapp.com",
  projectId: "bora1-e4c37",
  storageBucket: "bora1-e4c37.appspot.com",
  messagingSenderId: "667203137554",
  appId: "1:667203137554:web:c85e6b07008172e5ad68cb",
  measurementId: "G-2Y51J0K5G0"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}