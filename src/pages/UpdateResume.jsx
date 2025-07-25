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
    <div className="w-full min-h-screen bg-gray-100 flex justify-center items-start pt-8 pb-20 px-4">
      <div className="w-full max-w-2xl bg-black text-white rounded-xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Update Resume</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="motivation" className="block text-lg font-semibold">
              Motivation:
            </label>
            <input
              id="motivation"
              name="motivation"
              className="w-full px-4 py-3 bg-white text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Motivation..."
              onChange={(event) => {
                setMotivation(event.target.value);
              }}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="education" className="block text-lg font-semibold">
              Education:
            </label>
            <textarea
              id="education"
              name="education"
              rows="4"
              className="w-full px-4 py-3 bg-white text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
              placeholder="Education..."
              onChange={(event) => {
                setEducation(event.target.value);
              }}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="workexperience"
              className="block text-lg font-semibold"
            >
              Work Experience:
            </label>
            <textarea
              id="workexperience"
              name="workexperience"
              rows="4"
              className="w-full px-4 py-3 bg-white text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
              placeholder="Work experience..."
              onChange={(event) => {
                setWorkExperience(event.target.value);
              }}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="trainings" className="block text-lg font-semibold">
              Trainings:
            </label>
            <textarea
              id="trainings"
              name="trainings"
              rows="4"
              className="w-full px-4 py-3 bg-white text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
              placeholder="Trainings..."
              onChange={(event) => {
                setTrainings(event.target.value);
              }}
            />
          </div>

          <button
            onClick={updateResume}
            disabled={isSubmitting}
            className={`w-full py-3 px-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors duration-200 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Updating..." : "Submit Update"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateResume;
