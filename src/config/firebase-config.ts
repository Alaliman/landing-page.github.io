// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCrWm-BlkCS3z4OxyvfqjZzoRWI3sXDcTA",
  authDomain: "salvationenergy-5905e.firebaseapp.com",
  projectId: "salvationenergy-5905e",
  storageBucket: "salvationenergy-5905e.appspot.com",
  messagingSenderId: "491787651335",
  appId: "1:491787651335:web:d5c694cd7444dbd3e7dda2",
  measurementId: "G-LHMJ29XVHD",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
