const mongoose = require('mongoose');

const FreelancerProfileSchema = new mongoose.Schema({
    profileId: {
        type: String,
        // unique: true,
        // required: true,
    },
    // freelancerId: {
    //     type: String,
    //     required: true,
    // },
    userId: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    skills: {
        type: [String],
        required: true,
    },
    categories: {
        type: [String],
        required: true,
    },
    pricing: {
        type: Number,
        required: true,
    },
    noOfDaysToComplete: {
        type: Number,
        required: true,
    },
    previousCompanies: {
        type: [String],
    },
    portfolio: {
        type: String,
    },
    rating: {
        type: Number,
        default: 0,
    },
    reviews: [{
        clientId: { type: String },
        rating: { type: Number },
        comment: { type: String },
        postedAt: { type: Date },
    }, ],
}, {
    timestamps: true, // Adds createdAt and updatedAt timestamps
});

// Ensure unique profiles for each freelancerId/profileId combination
FreelancerProfileSchema.index({ userId: 1, profileId: 1 }, { unique: true });

module.exports = mongoose.model('FreelancerProfile', FreelancerProfileSchema);