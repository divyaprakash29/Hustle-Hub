exports.sanitizeInput = (req, res, next) => {
    // Define fields to sanitize
    const fieldsToSanitize = ['description', 'skills', 'categories', 'previousCompanies'];

    fieldsToSanitize.forEach((field) => {
        if (req.body[field]) {
            // Convert all strings in array fields to lowercase
            if (Array.isArray(req.body[field])) {
                req.body[field] = req.body[field].map((item) => item.trim().toLowerCase());
            } else {
                req.body[field] = req.body[field].trim().toLowerCase();
            }
        }
    });

    next();
};