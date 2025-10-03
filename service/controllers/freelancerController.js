const profileService = require('../services/freelancerService.js');

const { Types } = require('mongoose');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
// Create a new profile
const createProfile = async(req, res) => {
    try {
        const { userId } = req.params;
        const data = req.body;

        // Create the profile with the generated profileId
        const profile = await profileService.createProfile({
            userId,
            ...data
        });
        res.status(201).json({
            success: true,
            message: "User created successfully!",
            profile: {
                profile_id: profile._id,
                user_id: userId,
                ...data
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating profile', error });
    }
};


// Get all profiles for a freelancer
const getProfiles = async(req, res) => {
    try {
        const { userId } = req.params;
        console.log(userId + "****");
        // const freelancer = await profileService.findFreelancerById(freelancerId); -> Include
        // console.log("Freelancer found:", freelancer); // Debug log
        // if (!freelancer) {
        //     return res.status(404).json({ success: false, message: 'Freelancer not found.' });
        // }
        const profiles = await profileService.getProfilesByUserId(userId);
        if (!profiles) {
            return res.status(404).json({ message: 'Profile or user not found' });
        }
        res.status(200).json({
            success: true,
            message: "Profiles fetched successfully!",
            profiles: {
                profile_id: profiles._id,
                ...profiles
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a profile by profileId
const getProfile = async(req, res) => {
    try {
        const { userId, profileId } = req.params;
        const freelancer = await profileService.findFreelancerById(userId); //- > Include
        // Validate userId and profileId format
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid userId format' });
        }

        if (!mongoose.Types.ObjectId.isValid(profileId)) {
            return res.status(400).json({ message: 'Invalid profileId format' });
        }

        if (!freelancer) {
            return res.status(404).json({ message: 'freelancer not found' });
        }
        const profile = await profileService.getProfileByProfileId(
            profileId
        );
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        if (profile.userId.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. This profile does not belong to you.',
            });
        }

        res.status(200).json({
            success: true,
            message: "Profile fetched successfully!",
            profiles: {
                ...profile._doc
                // freelancerId: user.freelancerId // Only present for freelancers
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateProfile = async(req, res) => {
    try {
        const { userId, profileId } = req.params;
        const updates = req.body;

        // Define allowed fields for update
        const allowedFields = [
            'description',
            'skills',
            'categories',
            'pricing',
            'noOfDaysToComplete',
            'previousCompanies',
            'portfolio',
        ];


        if (!Types.ObjectId.isValid(profileId)) {
            return res.status(400).json({ message: 'Invalid profileId format' });
        }

        // Filter updates to include only allowed fields
        const filteredUpdates = {};
        Object.keys(updates).forEach((key) => {
            if (allowedFields.includes(key)) {
                filteredUpdates[key] = updates[key];
            }
        });

        console.log(userId + "*****1" + profileId);
        if (Object.keys(filteredUpdates).length === 0) {
            return res.status(400).json({ message: 'No valid fields provided for update' });
        }

        // Perform the update
        const profile = await profileService.findOneAndUpdate({ userId, _id: profileId }, // Match specific profile
            filteredUpdates, // Only update allowed fields
            { new: true, runValidators: true } // Return updated doc & validate changes
        );
        // const profile = await profileService.updateProfileByProfileId(profileId);
        console.log("profile " + profile);
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.status(200).json(profile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating profile', error });
    }
};


// Delete a profile by profileId
const deleteProfile = async(req, res) => {
    try {
        const { userId, profileId } = req.params;
        if (!Types.ObjectId.isValid(profileId)) {
            return res.status(400).json({ message: 'Invalid profileId format' });
        }
        const profile = await profileService.deleteProfileByProfileId(userId, profileId);
        console.log("profile " + profile);
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }


        res.status(200).json({ message: 'Profile deleted successfully', profile });
    } catch (error) {
        console.error('Error deleting profile:', error);
        res.status(500).json({ message: 'Error deleting profile', error: error.message });
    }
};


module.exports = {
    createProfile,
    getProfiles,
    getProfile,
    updateProfile,
    deleteProfile,
};