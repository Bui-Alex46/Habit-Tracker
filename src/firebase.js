
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyC_v4mDl86WK7CzyfMIpSXQo7dMWKT1dmg",
  authDomain: "habittracker-3d266.firebaseapp.com",
  projectId: "habittracker-3d266",
  storageBucket: "habittracker-3d266.appspot.com",
  messagingSenderId: "684276298452",
  appId: "1:684276298452:web:bbc2947a9af25036b78141"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);