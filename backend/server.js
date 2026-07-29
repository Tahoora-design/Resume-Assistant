const fs = require("fs");
const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();

// Create uploads folder if it doesn't exist
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// Multer setup
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
  }),
});

app.use(cors());
app.use(express.json());

// Health check
app.get("/ping", (req, res) => {
  res.json({ message: "Backend is alive!" });
});

// Resume feedback route (Demo Version)
app.post("/feedback", upload.single("resume"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        feedback: "No file uploaded",
      });
    }

    console.log("Uploaded file:", req.file.path);

    const feedback = `
Resume Review Summary

✓ Professional format
✓ Good overall structure
✓ Skills section is clearly visible

Suggestions:
• Add measurable achievements where possible.
• Tailor keywords to the target job description.
• Strengthen the professional summary section.
• Quantify project outcomes and impact.

Overall Rating: 8/10

(This is demo feedback and is the same for all uploaded resumes.)
`;

    res.json({ feedback });
  } catch (error) {
    console.error("Error in /feedback route:", error);
    res.status(500).json({
      feedback: "Error processing resume",
    });
  }
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});