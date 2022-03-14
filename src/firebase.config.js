import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBb24P1DC3kHFgjVtUP3ESpcXsdE3lMuwo",
  authDomain: "house-marketplace-f7b04.firebaseapp.com",
  projectId: "house-marketplace-f7b04",
  storageBucket: "house-marketplace-f7b04.appspot.com",
  messagingSenderId: "239379878060",
  appId: "1:239379878060:web:de2fb00d9a1e1465724f09"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()