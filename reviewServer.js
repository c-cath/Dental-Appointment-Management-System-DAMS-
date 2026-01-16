require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Review = require("./reviewModel"); // Import the Review model

const app = express();

// Enable CORS for all requests (adjust for production use)
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// MongoDB connection
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  console.error("MongoURI is not defined. Please check your .env file.");
  process.exitCode = 1;
}

mongoose.connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });


// API to handle form submission
app.post("/submit-review", async (req, res) => {
  const { name, email, message, rating } = req.body; // Corrected field name
  if (!name || !email || !message || !rating) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const newReview = new Review({ name, email, message, rating });
    await newReview.save();
    res.status(200).json({ message: "Review submitted successfully!" });
  } catch (error) {
    console.error("Error saving review:", error);
    res.status(500).json({ error: "Failed to submit review." });
  }
});

// API to get all reviews
app.get("/reviews", async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Failed to fetch reviews." });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
