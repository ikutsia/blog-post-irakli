import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";

function CreatePost({ isAuth }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [postAuthor, setPostAuthor] = useState(""); // Initialize postAuthor state
  const postsCollectionRef = collection(db, "posts");
  let navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated and has displayName property
    if (isAuth && auth.currentUser && auth.currentUser.displayName) {
      setPostAuthor(auth.currentUser.displayName); // Set postAuthor state
    } else {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  const createPost = async () => {
    if (title && text && postAuthor) {
      // Check if all required fields are not empty
      await addDoc(postsCollectionRef, {
        title,
        text,
        author: {
          name: postAuthor,
          id: auth.currentUser.uid,
        },
      });
      navigate("/");
    } else {
      console.error("Title, text, or postAuthor is empty.");
    }
  };

  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Create A Post</h1>
        <div className="inputGp">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            name="title"
            placeholder="Title..."
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label htmlFor="post">Post:</label>
          <textarea
            id="post"
            name="post"
            placeholder="Post..."
            onChange={(event) => {
              setText(event.target.value);
            }}
          />
        </div>
        <button onClick={createPost}>Submit Post</button>
      </div>
    </div>
  );
}

export default CreatePost;
