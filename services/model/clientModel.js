//Defining a Schema
const mongoose = require('mongoose');

// Client Profile Schema
  const ClientProfileSchema = new mongoose.Schema({
    clientId: {
      type: String,
      required: true
    },
    about: {
      type: String,
      required: true,
      trim: true
    },
    location: {
      type: String,
      required: true,
      trim: true
    },
    company: {
      type: String,
      required: true,
      trim: true
    },
    projectsPosted: {
      type: Number,
      required: false,
      default: 0,
      min: 0
    },
    projectsCompleted: {
      type: Number,
      required: false,
      default: 0,
      min: 0
    },
    averageRating: {
      type: Number,
      required: false,
      default: 0,
      min: 0,
      max: 5
    },
    paymentVerified: {
      type: Boolean,
      required: false,
    },
    preferredCategories: [{
      type: String,
      required: true,
      trim: true
    }],
    averageProjectBudget: {
      type: Number,
      required: true,
      min: 0,
      default: 0
    }
  }); 

module.exports = mongoose.model('ClientProfile', ClientProfileSchema);