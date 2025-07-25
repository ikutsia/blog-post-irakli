import React, { useEffect, useState } from "react";
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { db, auth } from "../firebase-config";

import Irakli from "../Images/Irakli.png";
import "../styles/Home.css";
import Contact from "./Contact";
import Footer from "./Footer";

function Home({ isAuth }) {
  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  useEffect(() => {
    const unsubscribe = onSnapshot(postsCollectionRef, (snapshot) => {
      const postsData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPostList(postsData);
    });

    // Cleanup function to unsubscribe when component unmounts
    return () => unsubscribe();
  }, [postsCollectionRef]);

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
    const updatedPosts = postLists.filter((post) => post.id !== id);
    setPostList(updatedPosts);
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
    const unsubscribe = onSnapshot(resumeCollectionRef, (snapshot) => {
      const resumeData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setResumeList(resumeData);
    });

    // Cleanup function to unsubscribe when component unmounts
    return () => unsubscribe();
  }, [resumeCollectionRef]);

  // Add new functions to clear individual fields
  const clearResumeField = async (id, field) => {
    const resumeDoc = doc(db, "resume", id);
    await updateDoc(resumeDoc, { [field]: "" });
    setResumeList((prev) =>
      prev.map((resume) =>
        resume.id === id ? { ...resume, [field]: "" } : resume
      )
    );
  };

  return (
    <>
      <div className="w-full bg-gray-300 flex justify-center">
        <section className="flex flex-col md:flex-row items-center justify-between w-full max-w-5xl mx-auto px-4 py-8">
          <h1 className="font-bold font-[Quicksand,sans-serif] text-3xl sm:text-5xl md:text-7xl whitespace-nowrap mb-6 md:mb-0">
            Irakli Kutsia
          </h1>
          <img
            src={Irakli}
            alt="Irakli"
            className="rounded-3xl object-contain w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 lg:w-72 lg:h-72"
          />
        </section>
      </div>

      <div className="flex flex-wrap justify-center gap-6 px-2 py-8 w-full max-w-5xl mx-auto">
        {postLists.map((post) => (
          <div
            key={post.id}
            className="bg-white shadow-lg rounded-xl flex flex-col w-full max-w-xs sm:max-w-sm md:max-w-md p-5"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="font-bold text-lg md:text-xl text-gray-800 truncate max-w-[70%]">
                {post.title}
              </div>
              <div>
                {isAuth && post.author?.id === auth.currentUser?.uid && (
                  <button
                    onClick={() => deletePost(post.id)}
                    className="text-red-500 text-xl ml-2"
                  >
                    &#x1F5D1;
                  </button>
                )}
              </div>
            </div>
            <div
              className={`text-gray-700 text-base md:text-lg mb-2 ${
                post.showFullPost ? "" : "line-clamp-4"
              }`}
            >
              {post.showFullPost ? post.text : `${post.text.slice(0, 200)}...`}
              {!post.showFullPost && (
                <button
                  onClick={() => toggleFullPost(post.id)}
                  className="text-blue-500 ml-2"
                >
                  Read Full Post
                </button>
              )}
            </div>
            <div className="text-sm italic text-gray-400 mt-auto">
              @{post.author?.email || "Unknown Author"}
            </div>
          </div>
        ))}
      </div>

      <div className="w-full flex justify-center mt-8">
        <section className="w-full max-w-2xl mx-auto px-4 py-6 bg-gray-700 text-white rounded-2xl shadow-lg">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center w-full m-0 whitespace-nowrap">
            My Professional Resume
          </h2>
        </section>
      </div>

      <div className="flex flex-col items-center w-full gap-4 px-2 py-4">
        <div className="w-full max-w-2xl bg-white text-gray-800 rounded-xl shadow-md p-4 sm:p-6 mb-2">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center mb-2 text-gray-700">
            Motivation
          </h2>
          {resumeLists.length > 0 && (
            <div className="text-base sm:text-lg md:text-xl text-center">
              {resumeLists[resumeLists.length - 1].motivation}
              {isAuth &&
                resumeLists[resumeLists.length - 1].author?.id ===
                  auth.currentUser?.uid && (
                  <button
                    onClick={() =>
                      clearResumeField(
                        resumeLists[resumeLists.length - 1].id,
                        "motivation"
                      )
                    }
                    className="ml-2 text-red-500"
                  >
                    Delete
                  </button>
                )}
            </div>
          )}
        </div>

        <div className="w-full max-w-2xl bg-white text-gray-800 rounded-xl shadow-md p-4 sm:p-6 mb-2">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center mb-2 text-gray-700">
            Education
          </h2>
          {resumeLists.length > 0 && (
            <div className="text-base sm:text-lg md:text-xl text-center">
              {resumeLists[resumeLists.length - 1].education}
              {isAuth &&
                resumeLists[resumeLists.length - 1].author?.id ===
                  auth.currentUser?.uid && (
                  <button
                    onClick={() =>
                      clearResumeField(
                        resumeLists[resumeLists.length - 1].id,
                        "education"
                      )
                    }
                    className="ml-2 text-red-500"
                  >
                    Delete
                  </button>
                )}
            </div>
          )}
        </div>

        <div className="w-full max-w-2xl bg-white text-gray-800 rounded-xl shadow-md p-4 sm:p-6 mb-2">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center mb-2 text-gray-700">
            Work Experience
          </h2>
          {resumeLists.length > 0 && (
            <div className="text-base sm:text-lg md:text-xl text-center">
              {resumeLists[resumeLists.length - 1].workexperience}
              {isAuth &&
                resumeLists[resumeLists.length - 1].author?.id ===
                  auth.currentUser?.uid && (
                  <button
                    onClick={() =>
                      clearResumeField(
                        resumeLists[resumeLists.length - 1].id,
                        "workexperience"
                      )
                    }
                    className="ml-2 text-red-500"
                  >
                    Delete
                  </button>
                )}
            </div>
          )}
        </div>

        <div className="w-full max-w-2xl bg-white text-gray-800 rounded-xl shadow-md p-4 sm:p-6 mb-2">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center mb-2 text-gray-700">
            Trainings
          </h2>
          {resumeLists.length > 0 && (
            <div className="text-base sm:text-lg md:text-xl text-center">
              {resumeLists[resumeLists.length - 1].trainings}
              {isAuth &&
                resumeLists[resumeLists.length - 1].author?.id ===
                  auth.currentUser?.uid && (
                  <button
                    onClick={() =>
                      clearResumeField(
                        resumeLists[resumeLists.length - 1].id,
                        "trainings"
                      )
                    }
                    className="ml-2 text-red-500"
                  >
                    Delete
                  </button>
                )}
            </div>
          )}
        </div>
      </div>

      <div className="contact">
        <Contact />
      </div>

      <Footer />
    </>
  );
}

export default Home;
