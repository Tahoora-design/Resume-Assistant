import React, { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [feedback, setFeedback] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setFeedback("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await axios.post(
        "https://resume-assistant-api-4b5m.onrender.com/feedback",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setFeedback(res.data.feedback);

    } catch (error) {
      console.error("Upload error:", error.message);

      if (error.response) {
        setFeedback(
          `Server error: ${error.response.data.feedback || "Unknown error"}`
        );
      } else if (error.request) {
        setFeedback("No response from backend. Please try again.");
      } else {
        setFeedback("Error uploading resume.");
      }
    }
  };

  return (
    <div
      style={{
        fontFamily: "Arial",
        padding: "20px",
        maxWidth: "600px",
        margin: "auto",
      }}
    >
      <h1
        style={{
          color: "#2c3e50",
          textAlign: "center",
        }}
      >
        Resume Assistant
      </h1>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        onClick={handleUpload}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          background: "#3498db",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Upload & Get Feedback
      </button>

      <div
        style={{
          marginTop: "20px",
          background: "#ecf0f1",
          padding: "15px",
          borderRadius: "5px",
        }}
      >
        <h3>Feedback:</h3>
        <p>{feedback}</p>
      </div>
    </div>
  );
}

export default App;