const Service = require('../service/reviewService.js');

// Create Review
// This function handles the creation of a new review.
// It expects the review data in the request body and responds with the created review or an error.
const createReview = async (req, res) => {
    try {
      const review = await Service.createReview(req.body); // Calls the service to create a review
      res.status(201).json(review); // Responds with the created review and a 201 status
    } catch (error) {
      res.status(400).json({ error: error.message }); // Responds with an error message if creation fails
    }
};
  
  // Get All Reviews
  // This function retrieves all reviews from the database.
  // It responds with the list of reviews or an error if the retrieval fails.
  const getAllReviews = async (req, res) => {
    try {
      const reviews = await Service.getAllReviews(); // Calls the service to get all reviews
      res.status(200).json(reviews); // Responds with the list of reviews and a 200 status
    } catch (error) {
      res.status(500).json({ error: error.message }); // Responds with an error message if retrieval fails
    }
  };

  const getReviewByFreelancerId = async (req, res) => {
    try {
      const { freelancerId } = req.params;
      const review = await Service.getReviewByFreelancerId(freelancerId); // Calls the service to get a review by ID
      if (!review) return res.status(404).json({ error: 'Review not found' }); // Responds with a 404 if not found
      res.status(200).json(review); // Responds with the found review and a 200 status
    } catch (error) {
      res.status(400).json({ error: error.message }); // Responds with an error message if retrieval fails
    }
  };
  
  // Get Review By Id
  // This function retrieves a specific review by its ID.
  // It checks if the review exists and responds accordingly.
  const getReviewById = async (req, res) => {
    try {
      const review = await Service.getReviewById(req.params.reviewId); // Calls the service to get a review by ID
      if (!review) return res.status(404).json({ error: 'Review not found' }); // Responds with a 404 if not found
      res.status(200).json(review); // Responds with the found review and a 200 status
    } catch (error) {
      res.status(400).json({ error: error.message }); // Responds with an error message if retrieval fails
    }
  };
  
  // Update Review
  // This function updates an existing review based on its ID.
  // It checks if the review exists and responds with the updated review or an error.
  const updateReview = async (req, res) => {
    try {
      const review = await Service.updateReview(req.params.reviewId, req.body); // Calls the service to update the review
      if (!review) return res.status(404).json({ error: 'Review not found' }); // Responds with a 404 if not found
      res.status(200).json(review); // Responds with the updated review and a 200 status
    } catch (error) {
      res.status(400).json({ error: error.message }); // Responds with an error message if update fails
    }
  };
  
  // Delete Review
  // This function deletes a review based on its ID.
  // It checks if the review exists and responds with a success message or an error.
  const deleteReview = async (req, res) => {
    try {
      const review = await Service.deleteReview(req.params.reviewId); // Calls the service to delete the review
      if (!review) return res.status(404).json({ error: 'Review not found' }); // Responds with a 404 if not found
      res.status(200).json("Review deleted"); // Responds with a success message and a 200 status
    } catch (error) {
      res.status(400).json({ error: error.message }); // Responds with an error message if deletion fails
    }
  };

module.exports = {
  createReview,
  getAllReviews,
  getReviewByFreelancerId,
  getReviewById,
  updateReview,
  deleteReview
}