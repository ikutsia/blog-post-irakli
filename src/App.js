import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css";
import "./pages/Home.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Irakli from "./Images/Irakli.png";
import CreatePost from "./pages/CreatePost";
import UpdateResume from "./pages/UpdateResume";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import Footer from "./pages/Footer";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import Slider from "react-slick";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

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
            <button onClick={signUserOut}>Log out</button>
            <Link to="/Contact">Contact</Link>
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
        <Route path="/Login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/Contact" element={<Contact isAuth={isAuth} />}></Route>
        <Route path="/Footer" element={<Footer isAuth={isAuth} />} />
      </Routes>
    </Router>
  );
}

export default App;
