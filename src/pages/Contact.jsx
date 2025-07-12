import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const sendEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: "", type: "" });

    // Get EmailJS credentials from environment variables
    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    // Check if environment variables are set
    if (!serviceId || !templateId || !publicKey) {
      setMessage({
        text: "Email service configuration is missing. Please check your environment variables.",
        type: "error",
      });
      setIsLoading(false);
      return;
    }

    emailjs
      .sendForm(serviceId, templateId, form.current, publicKey)
      .then(
        (result) => {
          setMessage({
            text: "Message sent successfully! We'll get back to you soon.",
            type: "success",
          });
          form.current.reset();
        },
        (error) => {
          setMessage({
            text: "Failed to send message. Please try again later.",
            type: "error",
          });
        }
      )
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-4">
      <form
        ref={form}
        onSubmit={sendEmail}
        className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md space-y-6 border border-gray-200"
      >
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-2">
          Contact Me
        </h2>
        <p className="text-center text-gray-500 mb-4">
          I'd love to hear from you!
        </p>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Name</label>
          <input
            type="text"
            name="from_name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Email
          </label>
          <input
            type="email"
            name="user_email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            placeholder="you@email.com"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Message
          </label>
          <textarea
            name="message"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition min-h-[100px]"
            placeholder="Type your message here..."
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 rounded-lg font-semibold text-white transition bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-md ${
            isLoading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Sending..." : "Send"}
        </button>
        {message.text && (
          <div
            className={`text-center p-3 rounded-lg mt-2 text-sm font-medium ${
              message.type === "success"
                ? "bg-green-100 text-green-700 border border-green-200"
                : "bg-red-100 text-red-700 border border-red-200"
            }`}
          >
            {message.text}
          </div>
        )}
      </form>
    </div>
  );
};

export default Contact;
