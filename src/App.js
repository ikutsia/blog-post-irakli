import React, { useState } from "react";
/*import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";*/
import "./styles/App.css";
import "./styles/Home.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost.jsx";
import UpdateResume from "./pages/UpdateResume.jsx";
import Login from "./pages/Login.jsx";
import Contact from "./pages/Contact";
import BlogPost from "./pages/BlogPost.jsx";
import Footer from "./pages/Footer";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";

function App() {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("isAuth"));

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };

  return (
    <Router>
      <nav>
        <Link to="/"> Home </Link>

        {!isAuth ? (
          <Link to="/login"> Login </Link>
        ) : (
          <>
            <Link to="/updateresume"> Update Resume </Link>

            <Link to="/createpost"> Create Post </Link>
            <button className="logout-btn" onClick={signUserOut}>
              Log out
            </button>
            <Link to="/contact">Contact</Link>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
        <Route
          path="/updateresume"
          element={<UpdateResume isAuth={isAuth} />}
        />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/contact" element={<Contact isAuth={isAuth} />} />
        <Route path="/post/:postId" element={<BlogPost isAuth={isAuth} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
