const userCheck = (req, res, next) => {
    try {
        console.log('In userCheck middleware');

        const loggedInUserId = req.user.userId; // Extract userId from decoded token (auth middleware)
        const targetUserId = req.params.userId || req.body.userId; // Get userId from request (params or body)

        if (!targetUserId) {
            return res.status(400).json({ success: false, message: 'UserId is required in request.' });
        }

        // Check if the logged-in user is the same as the target user
        if (loggedInUserId !== targetUserId) {
            return res.status(403).json({
                success: false,
                message: 'Access Denied. You can only perform this action on your own account.'
            });
        }

        // If the check passes, proceed to the next middleware/controller
        next();
    } catch (error) {
        console.error('Error in userCheck middleware:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error.' });
    }
};

module.exports = userCheck;