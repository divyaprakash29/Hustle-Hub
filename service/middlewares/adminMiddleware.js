const adminCheck = (req, res, next) => {
    console.log('In adminCheck middleware');
    if (req.user.role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Access Denied. Admins only.' });
    }
    next(); // If the user is an admin, pass control to the next handler
};


module.exports = adminCheck;