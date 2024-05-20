import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import Irakli from "../Images/Irakli.png";
import "./Home.css";
import Contact from "./Contact";
import Footer from "./Footer";

function Home({ isAuth }) {
  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  }, []);

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
    const updatedPosts = postLists.filter((post) => post.id !== id);
    setPostList(updatedPosts);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const toggleFullPost = (postId) => {
    setPostList((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, showFullPost: !post.showFullPost }
          : post
      )
    );
  };

  const [resumeLists, setResumeList] = useState([]);
  const resumeCollectionRef = collection(db, "resume");

  useEffect(() => {
    const getResume = async () => {
      const data = await getDocs(resumeCollectionRef);
      setResumeList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getResume();
  }, []);

  const deleteResume = async (id) => {
    const resumeDoc = doc(db, "resume", id);
    await deleteDoc(resumeDoc);
    const updatedResume = resumeLists.filter((resume) => resume.id !== id);
    setResumeList(updatedResume);
  };

  return (
    <>
      <div className="pageTitle-Photo">
        <section className="section">
          <h1 className="section-h1">Irakli Kutsia Portfolio Website</h1>
          <img src={Irakli} alt="Irakli" description="Irakli"></img>
        </section>
      </div>

      <div className="homePage">
        {postLists.map((post) => (
          <div key={post.id}>
            {/* Render each blog post within a slide */}
            <div className="post">
              <div className="postHeader">
                <div className="title">
                  <h1>{post.title}</h1>
                </div>
                <div className="deletePost">
                  {isAuth && post.author?.id === auth.currentUser?.uid && (
                    <button onClick={() => deletePost(post.id)}>
                      &#x1F5D1;
                    </button>
                  )}
                </div>
              </div>
              <div
                className={`postTextContainer ${
                  post.showFullPost ? "full-post" : "partial-post"
                }`}
              >
                {post.showFullPost
                  ? post.text
                  : `${post.text.slice(0, 200)}...`}
                {!post.showFullPost && (
                  <button onClick={() => toggleFullPost(post.id)}>
                    Read Full Post
                  </button>
                )}
              </div>
              <h3>@{post.author?.email || "Unknown Author"}</h3>
            </div>
          </div>
        ))}
      </div>

      <div>
        <section>
          <h2 className="resume-h2">My Professional Resume:</h2>
        </section>
      </div>

      <div className="homePage-2">
        <div className="flex-box">
          <h2>Motivation</h2>
          {resumeLists.map((resume) => (
            <div key={resume.id}>
              {resume.motivation}
              {isAuth && resume.author?.id === auth.currentUser?.uid && (
                <button onClick={() => deleteResume(resume.id)}>Delete</button>
              )}
            </div>
          ))}
        </div>

        <div className="flex-box">
          <h2>Education</h2>
          {resumeLists.map((resume) => (
            <div key={resume.id}>
              {resume.education}
              {isAuth && resume.author?.id === auth.currentUser?.uid && (
                <button onClick={() => deleteResume(resume.id)}>Delete</button>
              )}
            </div>
          ))}
        </div>

        <div className="flex-box">
          <h2>Work Experience</h2>
          {resumeLists.map((resume) => (
            <div key={resume.id}>
              {resume.workexperience}
              {isAuth && resume.author?.id === auth.currentUser?.uid && (
                <button onClick={() => deleteResume(resume.id)}>Delete</button>
              )}
            </div>
          ))}
        </div>

        <div className="flex-box">
          <h2>Trainings</h2>
          {resumeLists.map((resume) => (
            <div key={resume.id}>
              {resume.trainings}
              {isAuth && resume.author?.id === auth.currentUser?.uid && (
                <button onClick={() => deleteResume(resume.id)}>Delete</button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="contact">
        <h1 className="C-h1">Contact Me!</h1>
        {Contact}
        <Contact />
      </div>

      <Footer />
    </>
  );
}

export default Home;
