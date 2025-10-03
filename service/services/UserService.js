const User = require("../models/user-model.js");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const FreelancerProfile = require('../models/freelancer-model.js');

const createUser = async(newUser) => {
    try {

        const user = new User(newUser);
        // Save the new user
        const savedUser = await user.save();
        return savedUser;

    } catch (error) {
        throw error;
    }
}

// Get user by email
const getUserByEmail = async(email) => {
    return await User.findOne({ email }); // This will return a user if found, otherwise null
};

const loginUser = async(email, password) => {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('User not found'); // Custom error message
    }

    // Compare plain-text passwords (not recommended for production)
    if (password !== user.password) {
        throw new Error("Invalid credentials");
    }

    // Generate JWT token
    const token = jwt.sign({
            userId: user._id,
            role: user.role,
            fullname: user.fullname,
        },
        process.env.JWT_SECRET, { expiresIn: '1d' }
    );

    return { user, token }; // Return user info and token
};

const getAllUsers = async() => {
    const user = await User.find({});
    return user;
}

// Temporary in-memory token blacklist. Replace with a database in production.
const blacklistedTokens = new Set();

// Add token to blacklist
const blacklistToken = (token) => {
    blacklistedTokens.add(token);
};

// Check if a token is blacklisted
const isTokenBlacklisted = (token) => {
    return blacklistedTokens.has(token);
};

// Service to delete user by userId
const deleteUserByUserId = async(userId) => {
    try {
        // Find and delete the user by userId
        const result = await User.findByIdAndDelete(userId);
        return result;
    } catch (error) {
        console.error('Error in service while deleting user:', error);
        throw error; // Propagate error to the controller
    }
};

// Get all users with a specific role
const getUsersByRole = async(role) => {
    return await User.find({ role });
};



module.exports = {
    createUser,
    getAllUsers,
    loginUser,
    blacklistToken,
    isTokenBlacklisted,
    deleteUserByUserId,
    getUsersByRole,
    getUserByEmail,
};