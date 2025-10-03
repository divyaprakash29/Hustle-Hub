const express = require('express');
const router = express.Router();

// Importing controllers
const ReviewController = require('../controller/reviewController.js');

//Routes for Review
router.post('/reviews', ReviewController.createReview);
router.get('/reviews', ReviewController.getAllReviews);
router.get('/reviews/:freelancerId', ReviewController.getReviewByFreelancerId);
router.get('/reviews/:reviewId', ReviewController.getReviewById);
router.put('/reviews/:reviewId', ReviewController.updateReview);
router.delete('/reviews/:reviewId', ReviewController.deleteReview);

module.exports = router;