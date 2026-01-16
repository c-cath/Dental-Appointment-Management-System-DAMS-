const mongoose = require("mongoose");

// Define the schema for reviews
const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },      // Client's name
  email: { type: String, required: true },     // Client's email
  message: { type: String, required: true },   // Feedback message
  rating: { type: Number, required: true, min: 1, max: 5 }, // Rating (1-5)
  timestamp: { type: Date, default: Date.now } // Submission time
});

// Create the model for reviews
const Review = mongoose.model("Review", reviewSchema);

// Export the model so it can be used in other files
module.exports = Review;


