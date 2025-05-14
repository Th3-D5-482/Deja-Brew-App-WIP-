// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyC0SC4NuJ1wi41FLSvGKy8o_t71kihuWBg",
  authDomain: "dejabrew-8c8a7.firebaseapp.com",
  projectId: "dejabrew-8c8a7",
  storageBucket: "dejabrew-8c8a7.firebasestorage.app",
  messagingSenderId: "273384063622",
  appId: "1:273384063622:web:f1268aa7a52f28131c4707",
  measurementId: "G-HGW1DEKYC2",
  databaseURL: "https://dejabrew-8c8a7-default-rtdb.firebaseio.com" // Added database URL for Realtime Database
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;