import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Access the API key using process.env
const apiKey = process.env.REACT_APP_API_KEY;
console.log("API Key:", apiKey); // for demonstration, remove in production

// Measure performance in your app
reportWebVitals(console.log);
