const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const ContractSchema = new mongoose.Schema({
    contractId: { type: String, unique: true, required: true, default: uuidv4 }, // Generate UUID if not provided
    projectId: { type: String, required: true },
    clientId: { type: String, required: true },
    freelancerId: { type: String, required: true },
    terms: { type: String, required: true },
    status: { type: String, enum: ["pending", "completed", "canceled"], default: "pending" },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
});

module.exports = mongoose.model("Contract", ContractSchema);
