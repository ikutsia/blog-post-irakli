import React from "react";
import { signInWithPopup } from "firebase/auth";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import app from "../firebase-config";

function Login({ setIsAuth }) {
  let navigate = useNavigate();

  const signInWithGoogle = () => {
    const auth = getAuth(); // Get the auth object
    const provider = new GoogleAuthProvider(); // Create a new instance of GoogleAuthProvider

    signInWithPopup(auth, provider)
      .then((result) => {
        localStorage.setItem("isAuth", true);
        setIsAuth(true);
        navigate("/");
      })
      .catch((error) => {
        // Handle errors here
        console.error(error);
      });
  };

  return (
    <div className="loginPage">
      <p>Sign In with Google to continue</p>
      <button className="login-with-google-btn" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
    </div>
  );
}

export default Login;
