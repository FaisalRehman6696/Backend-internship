import axios from "axios";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyCvzCViD_Ch9qyo5jPFPEDcrex-aAvwdFQ",
  authDomain: "user-authentication-8b746.firebaseapp.com",
  projectId: "user-authentication-8b746",
  storageBucket: "user-authentication-8b746.firebasestorage.app",
  messagingSenderId: "698653610619",
  appId: "1:698653610619:web:37f225d9b1537b79e788de",
  measurementId: "G-CDCC5C62K5",
};

// Initialize Firebase
const hanldeGoogleLogin = async () => {
  try {
    Provider.addScope("email");
    const result = await signInWithPopup(auth, Provider);
    const user = result.user;
    console.log(user);

    const res = await axios.post("http://localhost:8000/google-login", {
      name: user.displayName,
      email: user.providerData[0].email,
      photo: user.photoURL,
    });
    
    alert(res.data.msg);

   
  } catch (error) {
    console.log(error);
  }
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const Provider = new GoogleAuthProvider();

export { auth, app, Provider, hanldeGoogleLogin };
