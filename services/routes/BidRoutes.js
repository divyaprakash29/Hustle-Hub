const express = require("express");
const bidController = require("../controller/BidController");

const router = express.Router();

// Define routes for the Bid API
router.get("/bids/projects/:projectId", bidController.getAllBidsByProject); // Get all bids for a project
router.get("/bids/freelancers/:freelancerId", bidController.getBidsByFreelancer);
router.post("/bids/projects/:projectId", bidController.createBid); // Create a new bid for a project
router.get("/bids/:freelancerId/projects/:projectId", bidController.getBidByFreelancerAndProject); // Get a bid by freelancer and project
router.put("/bids/:bidId/status", bidController.updateBidStatus); // Update bid status
router.delete("/bids/:bidId", bidController.deleteBid); // Delete a bid

module.exports = router;
