import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const app = initializeApp({
  apiKey: "AIzaSyAHNIsOLi6Y9LOlfnHfZiMsmscZrwHYs5U",
  authDomain: "shinclock-app.firebaseapp.com",
  projectId: "shinclock-app",
  storageBucket: "shinclock-app.appspot.com",
  messagingSenderId: "914096819284",
  appId: "1:914096819284:web:f81b604893ef671a9af1c1",
  measurementId: "G-DCTJTNCTSW",
});
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
