const jwt = require('jsonwebtoken');
const { isTokenBlacklisted } = require('../services/UserService.js');

const auth = async(req, res, next) => {
    try {
        const token = req.header('Authorization') ? req.header('Authorization').replace('Bearer ', '') : null;
        if (!token) {
            return res.status(401).json({ success: false, message: 'No token provided.' });
        }

        // Check if the token is blacklisted
        if (isTokenBlacklisted(token)) {
            return res.status(403).json({ success: false, message: 'Token has been invalidated.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        // Attach decoded user details to request
        req.user = {
            userId: decoded.userId, // Ensure this field exists in your JWT
            role: decoded.role, // Ensure this field exists in your JWT
            fullname: decoded.fullname,
        };

        next();
    } catch (err) {
        res.status(401).json({ success: false, message: 'Invalid token.' });
    }
};

module.exports = auth;