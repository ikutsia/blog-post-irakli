import React, { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";

import Irakli from "../Images/Irakli.png";
import "../styles/Home.css";
import Contact from "./Contact";
import Footer from "./Footer";

function Home({ isAuth }) {
  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onSnapshot(postsCollectionRef, (snapshot) => {
      const postsData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        showFullPost: false, // Initialize showFullPost property
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
      console.log("Resume data received:", resumeData);
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
      <div className="w-full bg-gradient-to-r from-gray-200 to-gray-500 flex justify-center py-6">
        <section className="flex flex-col md:flex-row items-center w-full max-w-5xl mx-auto px-4 py-6">
          <div className="mr-auto">
            <h1 className="font-bold font-[Quicksand,sans-serif] text-4xl sm:text-6xl md:text-8xl lg:text-9xl whitespace-nowrap mb-2">
              Irakli Kutsia
            </h1>
            <h2 className="font-bold text-yellow-400 text-4xl sm:text-5xl md:text-7xl lg:text-8xl whitespace-nowrap text-right">
              <span className="inline-block mr-2 text-cyan-400">⚛</span>React
              Hero
            </h2>
          </div>
          <img
            src={Irakli}
            alt="Irakli"
            className="rounded-3xl object-contain w-56 h-72 sm:w-64 sm:h-80 md:w-80 md:h-96 lg:w-96 lg:h-[36rem] ml-8"
          />
        </section>
      </div>

      <div className="w-full flex justify-center mt-8">
        <section className="w-full max-w-2xl mx-auto px-4 py-6 bg-gradient-to-r from-gray-50 to-gray-200 text-gray-800 rounded-2xl shadow-lg">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center w-full m-0 whitespace-nowrap">
            My Blog
          </h2>
        </section>
      </div>

      <div className="flex flex-wrap justify-center gap-6 px-2 py-8 w-full bg-gray-50 p-6">
        {postLists.map((post) => (
          <div
            key={post.id}
            className="bg-white shadow-lg rounded-xl flex flex-col w-full max-w-xs sm:max-w-sm md:max-w-md p-5 cursor-pointer hover:shadow-xl transition-shadow duration-200"
            onClick={() => navigate(`/post/${post.id}`)}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="font-bold text-lg md:text-xl text-gray-800 truncate max-w-[70%]">
                {post.title}
              </div>
              <div>
                {isAuth && post.author?.id === auth.currentUser?.uid && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deletePost(post.id);
                    }}
                    className="text-red-500 text-xl ml-2 hover:text-red-700 transition-colors"
                  >
                    &#x1F5D1;
                  </button>
                )}
              </div>
            </div>
            <div className="text-gray-700 text-base md:text-lg mb-2">
              {post.showFullPost ? (
                <>
                  {post.text}
                  <button
                    onClick={() => toggleFullPost(post.id)}
                    className="text-blue-500 ml-2"
                  >
                    Show Less
                  </button>
                </>
              ) : (
                <>
                  {post.text.length > 200
                    ? `${post.text.slice(0, 200)}...`
                    : post.text}
                  {post.text.length > 200 && (
                    <button
                      onClick={() => toggleFullPost(post.id)}
                      className="text-blue-500 ml-2"
                    >
                      Read Full Post
                    </button>
                  )}
                </>
              )}
            </div>
            <div className="text-sm italic text-gray-400 mt-auto">
              @{post.author?.name || post.author?.email || "Unknown Author"}
            </div>
          </div>
        ))}
      </div>

      <div className="w-full flex justify-center mt-8">
        <section className="w-full max-w-2xl mx-auto px-4 py-6 bg-gradient-to-r from-gray-600 to-gray-800 text-white rounded-2xl shadow-lg">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center w-full m-0 whitespace-nowrap">
            My Professional Resume
          </h2>
        </section>
      </div>

      <div className="flex flex-col items-center w-full gap-4 px-2 py-4">
        {/* Helper function to get the most recent non-empty resume */}
        {(() => {
          const getLatestResume = () => {
            // Find the most recent resume with content
            for (let i = resumeLists.length - 1; i >= 0; i--) {
              const resume = resumeLists[i];
              console.log(`Checking resume ${i}:`, resume);
              if (
                resume.motivation ||
                resume.education ||
                resume.workexperience ||
                resume.trainings
              ) {
                console.log(`Found resume with content at index ${i}:`, resume);
                return resume;
              }
            }
            return null;
          };

          const latestResume = getLatestResume();
          console.log("Latest resume selected:", latestResume);

          return (
            <>
              <div className="w-full max-w-2xl bg-white text-gray-800 rounded-xl shadow-md p-4 sm:p-6 mb-2">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center mb-2 text-gray-700">
                  Motivation
                </h2>
                {latestResume && (
                  <div className="text-base sm:text-lg md:text-xl text-center">
                    {latestResume.motivation || "No motivation content yet"}
                    {isAuth &&
                      latestResume.author?.id === auth.currentUser?.uid && (
                        <button
                          onClick={() =>
                            clearResumeField(latestResume.id, "motivation")
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
                {latestResume && (
                  <div className="text-base sm:text-lg md:text-xl text-center">
                    {latestResume.education || "No education content yet"}
                    {isAuth &&
                      latestResume.author?.id === auth.currentUser?.uid && (
                        <button
                          onClick={() =>
                            clearResumeField(latestResume.id, "education")
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
                {latestResume && (
                  <div className="text-base sm:text-lg md:text-xl text-center">
                    {latestResume.workexperience ||
                      "No work experience content yet"}
                    {isAuth &&
                      latestResume.author?.id === auth.currentUser?.uid && (
                        <button
                          onClick={() =>
                            clearResumeField(latestResume.id, "workexperience")
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
                {latestResume && (
                  <div className="text-base sm:text-lg md:text-xl text-center">
                    {latestResume.trainings || "No trainings content yet"}
                    {isAuth &&
                      latestResume.author?.id === auth.currentUser?.uid && (
                        <button
                          onClick={() =>
                            clearResumeField(latestResume.id, "trainings")
                          }
                          className="ml-2 text-red-500"
                        >
                          Delete
                        </button>
                      )}
                  </div>
                )}
              </div>
            </>
          );
        })()}
      </div>

      <div className="contact">
        <Contact />
      </div>

      <Footer />
    </>
  );
}

export default Home;
