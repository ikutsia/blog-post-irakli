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
      <nav className="m-0 w-full h-20 bg-black flex justify-center items-center text-white">
        <Link
          to="/"
          className="text-white no-underline mx-2.5 text-2xl border-none bg-transparent shadow-none hover:text-orange-400 hover:no-underline hover:text-3xl transition-all duration-200"
        >
          {" "}
          Home{" "}
        </Link>
        <a
          href="/#blog"
          className="text-white no-underline mx-2.5 text-2xl border-none bg-transparent shadow-none cursor-pointer hover:text-orange-400 hover:no-underline hover:text-3xl transition-all duration-200"
        >
          {" "}
          Blog{" "}
        </a>
        <a
          href="/#resume"
          className="text-white no-underline mx-2.5 text-2xl border-none bg-transparent shadow-none cursor-pointer hover:text-orange-400 hover:no-underline hover:text-3xl transition-all duration-200"
        >
          {" "}
          Resume{" "}
        </a>
        <a
          href="/#contact"
          className="text-white no-underline mx-2.5 text-2xl border-none bg-transparent shadow-none cursor-pointer hover:text-orange-400 hover:no-underline hover:text-3xl transition-all duration-200"
        >
          {" "}
          Contact{" "}
        </a>

        {isAuth && (
          <>
            <Link
              to="/updateresume"
              className="text-white no-underline mx-2.5 text-2xl border-none bg-transparent shadow-none hover:text-orange-400 hover:no-underline hover:text-3xl transition-all duration-200"
            >
              {" "}
              Update Resume{" "}
            </Link>

            <Link
              to="/createpost"
              className="text-white no-underline mx-2.5 text-2xl border-none bg-transparent shadow-none hover:text-orange-400 hover:no-underline hover:text-3xl transition-all duration-200"
            >
              {" "}
              Create Post{" "}
            </Link>
            <button
              className="text-2xl py-2 px-4.5 bg-transparent border-none text-white cursor-pointer mx-2.5 transition-all duration-200 hover:text-orange-400 hover:text-3xl"
              onClick={signUserOut}
            >
              Log out
            </button>
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
