import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import Footer from "./Footer";

function BlogPost({ isAuth }) {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postDoc = doc(db, "posts", postId);
        const postSnapshot = await getDoc(postDoc);

        if (postSnapshot.exists()) {
          setPost({ ...postSnapshot.data(), id: postSnapshot.id });
        } else {
          // Post doesn't exist, redirect to home
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId, navigate]);

  const deletePost = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const postDoc = doc(db, "posts", postId);
        await deleteDoc(postDoc);
        navigate("/");
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Post not found</div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-black text-white p-4">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <button
              onClick={() => navigate("/")}
              className="text-white hover:text-gray-300 transition-colors"
            >
              ← Back to Home
            </button>
            <div className="text-lg font-semibold">Blog Post</div>
            <div></div> {/* Empty div for spacing */}
          </div>
        </nav>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <article className="bg-white rounded-xl shadow-lg p-8">
            {/* Header */}
            <header className="mb-8">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                  {post.title}
                </h1>
                {isAuth && post.author?.id === auth.currentUser?.uid && (
                  <button
                    onClick={deletePost}
                    className="text-red-500 text-xl hover:text-red-700 transition-colors"
                    title="Delete Post"
                  >
                    &#x1F5D1;
                  </button>
                )}
              </div>
              <div className="text-gray-600 text-lg">
                By @
                {post.author?.name || post.author?.email || "Unknown Author"}
              </div>
            </header>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
                {post.text}
              </div>
            </div>

            {/* Footer */}
            <footer className="mt-8 pt-6 border-t border-gray-200">
              <div className="text-gray-500 text-sm">
                Published on {new Date().toLocaleDateString()}
              </div>
            </footer>
          </article>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default BlogPost;
