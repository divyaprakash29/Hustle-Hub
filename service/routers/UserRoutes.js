const express = require('express');
const UserController = require('../controllers/user-controller.js');
const
    authenticateToken = require("../middlewares/authMiddleware.js");
const
    adminCheck = require("../middlewares/adminMiddleware.js");

const
    auth = require('../middlewares/auth.js'); // Ensure the user is authenticated
const userCheck = require('../middlewares/userMiddleware.js');
const validate = require('../middlewares/validator.js');
const User = require("../models/user-model.js");

console.log({ UserController, authenticateToken, adminCheck, auth });

const router = express.Router();

//Route for user signup
router.post('/user/signup', UserController.createUser);
//Route for getting list of all users
router.get('/users', authenticateToken, adminCheck, UserController.getAllUsers);
//Route for user login
router.post('/user/login', UserController.loginUser);
//Route for user logout
router.post('/user/logout', auth, UserController.logout);
//Route for deleting user by userid
router.delete('/user/:userId', authenticateToken, userCheck, UserController.deleteUser);
// for listing all freelancer
router.get('/freelancers', authenticateToken, adminCheck, UserController.getAllFreelancers);

module.exports = router;