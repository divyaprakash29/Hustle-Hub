const FreelancerProfile = require('../models/freelancer-model.js');
const User = require('../services/UserService.js');

// Create a new freelancer profile
const createProfile = async(data) => {
    const profile = new FreelancerProfile(data);
    return await profile.save();
};

// Get profiles by freelancerId
const getProfilesByUserId = async(userId) => {
    return await FreelancerProfile.find({ userId });
};

// Get a single profile by profileId
const getProfileByProfileId = async(profileId) => {
    return await FreelancerProfile.findOne({ _id: profileId });
};

// Update a profile by profileId
const updateProfileByProfileId = async(profileId, updateData) => {
    return await FreelancerProfile.findOneAndUpdate({ profileId },
        updateData, { new: true, runValidators: true }
    );
};

const findOneAndUpdate = async(query, updates, options) => {
    try {
        return await FreelancerProfile.findOneAndUpdate(query, updates, options);
    } catch (error) {
        throw error; // Pass the error to the calling function
    }
};

// Delete a profile by profileId
const deleteProfileByProfileId = async(userId, profileId) => {
    return await FreelancerProfile.findOneAndDelete({ userId, _id: profileId });
};

const findFreelancerById = async(userId) => {
    const freelancer = await FreelancerProfile.find({ userId });
    return freelancer;
};


module.exports = {
    createProfile,
    getProfilesByUserId,
    getProfileByProfileId,
    updateProfileByProfileId,
    deleteProfileByProfileId,
    findOneAndUpdate,
    findFreelancerById
};