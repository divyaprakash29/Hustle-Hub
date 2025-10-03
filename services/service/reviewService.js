// Importing the Review model from the model directory to interact with the review data in the database
const Review = require('../model/reviewModel.js')

// Function to create a new review
// Parameters:
//   reviewData: An object containing the data for the new review, such as title, content, rating, etc.
// Returns: The saved review object after being stored in the database
const createReview = async (reviewData) => {
    const review = new Review(reviewData); // Creating a new instance of Review with the provided data
    return await review.save(); // Saving the review to the database and returning the saved object
};

// Function to retrieve all reviews from the database
// Returns: An array of all review objects stored in the database
const getAllReviews = async () => {
    return await Review.find(); // Fetching all reviews using the find method
};

const getReviewByFreelancerId = async (freelancerId) => {
    return await Review.find({ freelancerId }); // Fetching all reviews using the find method
};

// Function to retrieve a specific review by its ID
// Parameters:
//   id: The unique identifier of the review to be fetched
// Returns: The review object corresponding to the provided ID, or null if not found
const getReviewById = async (id) => {
    return await Review.findById(id); // Finding a review by its ID
};

// Function to update an existing review
// Parameters:
//   id: The unique identifier of the review to be updated
//   data: An object containing the updated data for the review
// Returns: The updated review object after modification
const updateReview = async (id, data) => {
    return await Review.findByIdAndUpdate(id, data, { new: true }); // Updating the review and returning the new version
};

// Function to delete a review by its ID
// Parameters:
//   id: The unique identifier of the review to be deleted
// Returns: The deleted review object, or null if not found
const deleteReview = async (id) => {
    return await Review.findByIdAndDelete(id); // Deleting the review by its ID
};

// Exporting the functions to be used in other parts of the application
module.exports = {
  createReview,
  getAllReviews,
  getReviewByFreelancerId,
  getReviewById,
  updateReview,
  deleteReview
};