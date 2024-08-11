import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBmH-alJ72yC93kYSaz2GcGRnwtM49Xk5Q",
  authDomain: "reactdb-efd4c.firebaseapp.com",
  projectId: "reactdb-efd4c",
  storageBucket: "reactdb-efd4c.appspot.com",
  messagingSenderId: "336870105504",
  appId: "1:336870105504:web:0e75b510834558e2f184c5"
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
