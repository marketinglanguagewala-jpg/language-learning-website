import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAuk8YNw5Iw0u-Dnz1uWvIsAErTQZxqQ-0",
  authDomain: "language-wala-otp.firebaseapp.com",
  projectId: "language-wala-otp",
  storageBucket: "language-wala-otp.firebasestorage.app",
  messagingSenderId: "780568661968",
  appId: "1:780568661968:web:e3f8b37f00b8742baf33d5",
};
const app = initializeApp(firebaseConfig);


const auth = getAuth(app);

export { auth };