const express = require('express');
const router = express.Router();
const freelancerController = require('../controllers/freelancerController.js');
const { sanitizeInput } = require('../middlewares/sanitizeInputMiddleware.js');
const authenticateToken = require("../middlewares/authMiddleware.js");
const adminCheck = require("../middlewares/adminMiddleware.js");
const userCheck = require('../middlewares/userMiddleware.js');

//Route for creating new profile for frelancer
router.post('/user/:userId/profile', authenticateToken, userCheck, freelancerController.createProfile);

// Route for updating freelancer profile by id
router.put('/user/:userId/profile/:profileId', authenticateToken, userCheck, sanitizeInput, freelancerController.updateProfile);

// Route for getting all freelancers profile
// router.get('/user/:userId/profile/', authenticateToken, userCheck, freelancerController.getProfiles);
router.get('/user/:userId/profile/', freelancerController.getProfiles);

// Route for getting single freelancer profile by profile id
router.get('/user/:userId/profile/:profileId', authenticateToken, userCheck, freelancerController.getProfile);

// Route for deleting freelancer profile by profile id
router.delete('/user/:userId/profile/:profileId', authenticateToken, userCheck, freelancerController.deleteProfile);

module.exports = router;