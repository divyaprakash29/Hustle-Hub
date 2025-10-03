const mongoose = require("mongoose");
const moment = require("moment");
const User = require("../../service/models/user-model");
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  budget: { type: Number, required: true },
  daysToComplete: { type: Number, required: true },
  status: {
    type: String,
    enum: ['open', 'hiring', 'in-progress', 'completed', 'cancelled'],
    default: 'open'
  },
  postedAt: {
    type: String,
    default: moment(new Date()).format("MMM-DD-YYYY hh:mm A")
  },
  deadline: { type: Date, required: true },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tags: { type: Array, required: true },
  category: { type: String, required: true },
  currentBidCount: { type: Number, required: false },
  minimumBid: { type: Number, required: false },
  averageBid: { type: Number, required: false }
});


module.exports = mongoose.model('Project', projectSchema);

