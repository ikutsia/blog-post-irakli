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

    // Check if at least one field has content and author is set
    if (
      resumeAuthor &&
      (motivation || education || workexperience || trainings)
    ) {
      setIsSubmitting(true);
      try {
        // Create an object with only non-empty fields
        const resumeData = {
          author: {
            name: resumeAuthor,
            id: auth.currentUser.uid,
          },
        };

        // Only add fields that have content
        if (motivation) resumeData.motivation = motivation;
        if (education) resumeData.education = education;
        if (workexperience) resumeData.workexperience = workexperience;
        if (trainings) resumeData.trainings = trainings;

        console.log("Submitting resume data:", resumeData);

        await addDoc(resumeCollectionRef, resumeData);
        console.log("Resume updated successfully!");
        navigate("/");
      } catch (error) {
        console.error("Error updating resume:", error);
        setError("Failed to update resume. Please try again.");
        setIsSubmitting(false);
      }
    } else {
      setError(
        "Please fill in at least one field and ensure you are logged in."
      );
      console.error("No content provided or user not authenticated.");
    }
  };

  return (
    <div className="updateResumePage">
      <div className="urContainer">
        <h1>Update Resume</h1>
        {error && (
          <div
            className="error-message"
            style={{ color: "red", marginBottom: "10px" }}
          >
            {error}
          </div>
        )}
        <div className="inputGp">
          <label htmlFor="motivation">Motivation:</label>
          <input
            id="motivation"
            name="motivation"
            className="bg-white text-black"
            placeholder="Motivation..."
            onChange={(event) => {
              setMotivation(event.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label htmlFor="education">Education:</label>
          <textarea
            id="education"
            name="education"
            className="bg-white text-black"
            placeholder="Education..."
            onChange={(event) => {
              setEducation(event.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label htmlFor="workexperience">Work Experience:</label>
          <textarea
            id="workexperience"
            name="workexperience"
            className="bg-white text-black"
            placeholder="Work experience..."
            onChange={(event) => {
              setWorkExperience(event.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label htmlFor="trainings">Trainings:</label>
          <textarea
            id="trainings"
            name="trainings"
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
