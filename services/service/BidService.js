const Bid = require("../model/Bid");

// Fetch all bids for a given projectId
const getAllBidsByProject = async (projectId) => {
    return await Bid.find({ projectId });
};

// Fetch all bids submitted by a freelancer
const getBidsByFreelancer = async (freelancerId) => {
    try {
        console.log("Fetching bids for freelancerId:", freelancerId);
        const bids = await Bid.find({ freelancerId });
        console.log("Retrieved Bids:", bids);
        return bids;
    } catch (error) {
        console.error("Error fetching bids:", error.message);
        throw error;
    }
};



// Fetch a bid for a specific freelancer and project
const getBidByFreelancerAndProject = async (freelancerId, projectId) => {
    return await Bid.findOne({ freelancerId, projectId });
};

// Create a new bid
const createBid = async (bidData) => {
    const bid = new Bid(bidData);
    return await bid.save();
};

// Update the status of a specific bid using bidId
const updateBidStatus = async (bidId, status) => {
    return await Bid.findOneAndUpdate({ bidId }, { status }, { new: true });
};

// Delete a specific bid using bidId
const deleteBid = async (bidId) => {
    return await Bid.findOneAndDelete({ bidId });
};

module.exports = {
    getAllBidsByProject,
    getBidsByFreelancer,
    getBidByFreelancerAndProject,
    createBid,
    updateBidStatus,
    deleteBid,
};
