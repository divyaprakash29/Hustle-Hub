const jwt = require('jsonwebtoken');

// Middleware to protect routes and verify JWT
const authenticateToken = (req, res, next) => {
    // const token = req.header('Authorization') ? .replace('Bearer ', ''); // Extract token from Bearer
    const token = req.header('Authorization') ? req.header('Authorization').replace('Bearer ', '') : null;
    console.log('In authenticateToken middleware');


    if (!token) {
        return res.status(401).json({ success: false, message: 'Access Denied. No token provided.' });
    }

    try {
        // Ensure JWT_SECRET is not undefined
        if (!process.env.JWT_SECRET) {
            console.error('JWT_SECRET is undefined');
            return res.status(500).json({ success: false, message: 'Internal server error. JWT_SECRET is missing.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token using secret key
        req.user = decoded; // Attach user data to the request object
        next(); // Pass control to the next handler
    } catch (err) {
        console.error('Token verification error:', err);
        return res.status(400).json({ success: false, message: 'Invalid token' });
    }
};

module.exports = authenticateToken;