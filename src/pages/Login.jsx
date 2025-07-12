import React from "react";
import {
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Login({ setIsAuth }) {
  let navigate = useNavigate();

  useEffect(() => {
    // Check for redirect result when component mounts
    const auth = getAuth();
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          localStorage.setItem("isAuth", true);
          setIsAuth(true);
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Redirect error:", error);
      });
  }, [setIsAuth, navigate]);

  const signInWithGoogle = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    // Add custom parameters
    provider.setCustomParameters({
      prompt: "select_account",
    });

    try {
      // Try popup first
      await signInWithPopup(auth, provider);
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
    } catch (error) {
      console.log("Popup failed, trying redirect:", error);
      // If popup fails, fall back to redirect
      try {
        await signInWithRedirect(auth, provider);
      } catch (redirectError) {
        console.error("Both popup and redirect failed:", redirectError);
      }
    }
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
