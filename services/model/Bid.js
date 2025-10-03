const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const BidSchema = new mongoose.Schema({
    bidId: { type: String, unique: true, required: true, default: uuidv4 },
    freelancerId: { type: String, required: true },
    projectId: { type: String, required: true },
    bidAmount: { type: Number, required: true },
    deliveryTime: { type: Number, required: true },
    status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
});

module.exports = mongoose.model("Bid", BidSchema);
