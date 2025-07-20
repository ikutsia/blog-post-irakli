import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles/App.css";
import "./styles/Home.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost.jsx";
import UpdateResume from "./pages/UpdateResume.jsx";
import Login from "./pages/Login.jsx";
import Contact from "./pages/Contact";
import Footer from "./pages/Footer";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";

function App() {
  return <h1>Hello World</h1>;
}
export default App;
