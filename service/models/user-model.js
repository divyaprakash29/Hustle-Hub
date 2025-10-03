const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        // trim: true,
        // unique: [true, 'Email must be unique!'],
        // minLength: [5, 'Email must have 5 characters!'],
        // lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Password must be provided!'],
        // trim: true,
        // select: false,
    },
    role: {
        type: String,
        enum: ["client", "freelancer", "admin"],
        required: true,
        description: "User's role in the application",
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);