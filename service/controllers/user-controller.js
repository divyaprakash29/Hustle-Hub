const Joi = require('joi');
const userService = require("../services/UserService.js");
const { blacklistToken } = require('../services/UserService.js');
const userSchema = Joi.object({
    fullname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    role: Joi.string().valid('client', 'freelancer', 'admin').required(),
});


//create new user
const createUser = async(req, res) => {
    try {
        const { error } = userSchema.validate(req.body);
        if (error) {
            throw error; // Joi errors include the 'details' field
        }

        // Check if the email already exists
        const existingUser = await userService.getUserByEmail(req.body.email);
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email already exists', // Custom error message
            });
        }

        const user = await userService.createUser(req.body);
        res.status(201).json({
            success: true,
            message: "User created successfully!",
            user: {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
                role: user.role,
            }
        });
    } catch (err) {
        if (err.isJoi) {
            // Joi-specific error handling
            res.status(400).json({
                success: false,
                message: err.details[0].message, // First validation error
            });
        } else {
            // General error handling
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
};

// Login user
const loginUser = async(req, res) => {
    try {
        const { email, password } = req.body;

        // Input validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required',
            });
        }

        // Call the service layer
        const { user, token } = await userService.loginUser(email, password);

        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
                role: user.role,
            },
        });
    } catch (err) {
        console.error('Login error:', err.message);
        res.status(401).json({
            success: false,
            message: err.message, // Send back the error message from the service
        });
    }
};

const getAllUsers = async(req, res) => {
    console.log('Authorization Header:', req.header('Authorization'));

    try {
        const users = await userService.getAllUsers();
        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: users,
        });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching users', error: err })
    }
}


const logout = async(req, res) => {
    try {
        const token = req.header('Authorization') ? req.header('Authorization').replace('Bearer ', '') : null;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No token provided.',
            });
        }

        // Add the token to the blacklist
        blacklistToken(token);

        res.status(200).json({
            success: true,
            message: 'Logout successful.',
            data: {
                userId: req.user.userId,
                role: req.user.role,
                fullname: req.user.fullname,
            },
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Logout failed.',
        });
    }
};

const deleteUser = async(req, res) => {
    try {
        const { userId } = req.params;
        console.log(userId);
        // Validate userId presence and format
        if (!userId) {
            return res.status(400).json({ message: 'Invalid or missing userId' });
        }

        // Attempt to find the user by userId and delete
        const result = await userService.deleteUserByUserId(userId);
        console.log(result);

        // If no user is found, send 404
        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Send success message
        res.status(200).json({
            message: 'User deleted successfully',
            deletedUser: {
                id: result._id, // Return only safe fields
                fullname: result.fullname,
                role: result.role,
            },
        });
    } catch (error) {
        console.error('Error deleting freelancer:', error);
        res.status(500).json({ message: 'Error deleting User', error: error.message });
    }
};

const deleteFreelancer = async(req, res) => {
    try {
        const { freelancerId } = req.params;

        // Check if freelancerId is provided
        if (!freelancerId) {
            return res.status(400).json({ message: 'FreelancerId is required' });
        }

        // Attempt to find the user by freelancerId and delete
        const result = await userService.deleteFreelancerByFreelancerId(freelancerId);

        // If no user is found, send 404
        if (!result) {
            return res.status(404).json({ message: 'Freelancer not found' });
        }

        // Send success message
        res.status(200).json({ message: 'Freelancer deleted successfully', deletedFreelancer: result });
    } catch (error) {
        console.error('Error deleting freelancer:', error);
        res.status(500).json({ message: 'Error deleting freelancer', error: error.message });
    }
};

const getAllFreelancers = async(req, res) => {
    try {
        // Fetch all users with role 'freelancer'
        const freelancers = await userService.getUsersByRole('freelancer');

        if (!freelancers || freelancers.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No freelancers found.',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Freelancers fetched successfully!',
            freelancers,
        });
    } catch (error) {
        console.error('Error fetching freelancers:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error.',
            error: error.message,
        });
    }
};



module.exports = {
    getAllUsers,
    createUser,
    loginUser,
    logout,
    deleteUser,
    deleteFreelancer,
    getAllFreelancers
};