const bidService = require("../service/BidService");

// Get all bids for a specific project
const getAllBidsByProject = async (req, res) => {
    try {
        const { projectId } = req.params;

        // Validate projectId
        if (!projectId) {
            return res.status(400).json({ error: "Invalid Request", message: "Project ID is required." });
        }

        // Fetch bids
        const bids = await bidService.getAllBidsByProject(projectId);
        if (!bids || bids.length === 0) {
            return res.status(404).json({ error: "No Bids Found", message: "No bids found for this project." });
        }

        res.status(200).json(bids);
    } catch (err) {
        console.error("Error fetching bids:", err.message);
        res.status(500).json({ error: "Server Error", message: "An error occurred while fetching bids." });
    }
};

// Get all bids submitted by a specific freelancer
const getBidsByFreelancer = async (req, res) => {
    try {
        const { freelancerId } = req.params;
        console.log("Fetching bids for freelancerId:", freelancerId);

        if (!freelancerId) {
            console.error("Freelancer ID is missing.");
            return res.status(400).json({ error: "Invalid Request", message: "Freelancer ID is required." });
        }

        const bids = await bidService.getBidsByFreelancer(freelancerId);
        console.log("Bids retrieved:", bids);

        if (!bids || bids.length === 0) {
            console.error("No bids found for this freelancer.");
            return res.status(404).json({ error: "No Bids Found", message: "No bids found for this freelancer." });
        }

        res.status(200).json(bids);
    } catch (err) {
        console.error("Error fetching bids by freelancer:", err.message);
        res.status(500).json({ error: "Server Error", message: "An error occurred while fetching bids." });
    }
};



// Create a new bid for a project
const createBid = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { freelancerId, bidAmount, deliveryTime } = req.body;

        console.log("Create Bid Request:", { projectId, freelancerId, bidAmount, deliveryTime });

        // Validate input
        if (!projectId || !freelancerId || !bidAmount || !deliveryTime) {
            return res.status(400).json({
                error: "Invalid Request",
                message: "Project ID, Freelancer ID, Bid Amount, and Delivery Time are required.",
            });
        }

        // Ensure numeric values are properly formatted
        if (isNaN(bidAmount) || isNaN(deliveryTime)) {
            return res.status(400).json({
                error: "Invalid Input",
                message: "Bid Amount and Delivery Time must be valid numbers.",
            });
        }

        // Check if bid already exists
        const existingBid = await bidService.getBidByFreelancerAndProject(freelancerId, projectId);
        if (existingBid) {
            console.log("Bid already exists:", existingBid);
            return res.status(400).json({
                error: "Bid Already Exists",
                message: "You have already submitted a bid for this project.",
            });
        }

        // Create new bid
        const newBid = await bidService.createBid({
            projectId,
            freelancerId,
            bidAmount: parseFloat(bidAmount), // Ensure numeric format
            deliveryTime: parseInt(deliveryTime, 10), // Ensure integer format
        });

        console.log("Bid Created Successfully:", newBid);

        return res.status(201).json({
            message: "Bid created successfully.",
            bid: newBid,
        });
    } catch (err) {
        console.error("Error creating bid:", err.message);

        // Check for MongoDB validation errors
        if (err.name === "ValidationError") {
            return res.status(400).json({
                error: "Validation Error",
                message: err.message,
            });
        }

        // General server error
        return res.status(500).json({
            error: "Server Error",
            message: "An error occurred while creating the bid. Please try again later.",
        });
    }
};

// Get a bid for a freelancer and project
const getBidByFreelancerAndProject = async (req, res) => {
    try {
        const { freelancerId, projectId } = req.params;

        // Validate input
        if (!freelancerId || !projectId) {
            return res.status(400).json({
                error: "Invalid Request",
                message: "Freelancer ID and Project ID are required.",
            });
        }

        // Fetch bid
        const bid = await bidService.getBidByFreelancerAndProject(freelancerId, projectId);
        if (!bid) {
            return res.status(404).json({ error: "Bid Not Found", message: "No bid found for this project." });
        }

        res.status(200).json(bid);
    } catch (err) {
        console.error("Error fetching bid:", err.message);
        res.status(500).json({ error: "Server Error", message: "An error occurred while fetching the bid." });
    }
};

// Update the status of a specific bid
const updateBidStatus = async (req, res) => {
    try {
        const { bidId } = req.params;
        const { status } = req.body;

        // Validate status
        if (!["accepted", "rejected", "pending"].includes(status)) {
            return res.status(400).json({
                error: "Invalid Status",
                message: "Status must be 'accepted', 'rejected', or 'pending'.",
            });
        }

        // Update bid status
        const updatedBid = await bidService.updateBidStatus(bidId, status);
        if (!updatedBid) {
            return res.status(404).json({ error: "Bid Not Found", message: "The specified bid ID does not exist." });
        }

        res.status(200).json(updatedBid);
    } catch (err) {
        console.error("Error updating bid status:", err.message);
        res.status(500).json({ error: "Server Error", message: "An error occurred while updating the bid status." });
    }
};

// Delete a specific bid
const deleteBid = async (req, res) => {
    try {
        const { bidId } = req.params;

        // Delete bid
        const deletedBid = await bidService.deleteBid(bidId);
        if (!deletedBid) {
            return res.status(404).json({ error: "Bid Not Found", message: "The specified bid ID does not exist." });
        }

        res.status(200).json({ message: `Bid with ID ${bidId} has been successfully deleted.` });
    } catch (err) {
        console.error("Error deleting bid:", err.message);
        res.status(500).json({ error: "Server Error", message: "An error occurred while deleting the bid." });
    }
};

module.exports = {
    getAllBidsByProject,
    getBidsByFreelancer,
    createBid,
    getBidByFreelancerAndProject,
    updateBidStatus,
    deleteBid,
};
