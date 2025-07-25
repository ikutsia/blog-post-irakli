import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";

function UpdateResume({ isAuth }) {
  const [motivation, setMotivation] = useState("");
  const [education, setEducation] = useState("");
  const [workexperience, setWorkExperience] = useState("");
  const [trainings, setTrainings] = useState("");
  const [resumeAuthor, setResumeAuthor] = useState(""); // Initialize postAuthor state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const resumeCollectionRef = collection(db, "resume");
  let navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated and has displayName property
    if (isAuth && auth.currentUser && auth.currentUser.displayName) {
      setResumeAuthor(auth.currentUser.displayName); // Set postAuthor state
    } else {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  const updateResume = async () => {
    console.log("Motivation:", motivation);
    console.log("Education:", education);
    console.log("Work Experience:", workexperience);
    console.log("Trainings:", trainings);
    console.log("Resume Author:", resumeAuthor);

    // Clear previous errors
    setError("");

    if (
      motivation &&
      education &&
      workexperience &&
      trainings &&
      resumeAuthor
    ) {
      setIsSubmitting(true);
      try {
        // Check if all required fields are not empty
        await addDoc(resumeCollectionRef, {
          motivation,
          education,
          workexperience,
          trainings,
          author: {
            name: resumeAuthor,
            id: auth.currentUser.uid,
          },
        });
        navigate("/");
      } catch (error) {
        console.error("Error updating resume:", error);
        setError("Failed to update resume. Please try again.");
        setIsSubmitting(false);
      }
    } else {
      setError("Please fill in all fields before submitting.");
      console.error(
        "Motivation, education, workexperience, trainings or resumeAuthor is empty."
      );
    }
  };

  return (
    <div className="updateResumePage">
      <div className="urContainer">
        <h1>Update Resume</h1>
        {error && (
          <div className="error-message" style={{ color: "red", marginBottom: "10px" }}>
            {error}
          </div>
        )}
        <div className="inputGp">
          <label>Motivation:</label>
          <input
            className="bg-white text-black"
            placeholder="Motivation..."
            onChange={(event) => {
              setMotivation(event.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label>Education:</label>
          <textarea
            className="bg-white text-black"
            placeholder="Education..."
            onChange={(event) => {
              setEducation(event.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label>Work Experience:</label>
          <textarea
            className="bg-white text-black"
            placeholder="Work experience..."
            onChange={(event) => {
              setWorkExperience(event.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label>Trainings:</label>
          <textarea
            className="bg-white text-black"
            placeholder="Trainings..."
            onChange={(event) => {
              setTrainings(event.target.value);
            }}
          />
        </div>
        <button 
          onClick={updateResume} 
          disabled={isSubmitting}
          className={isSubmitting ? "opacity-50 cursor-not-allowed" : ""}
        >
          {isSubmitting ? "Updating..." : "Submit Update"}
        </button>
      </div>
    </div>
  );
}

export default UpdateResume;
