const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        reqired: true,
    },
    password: {
        type: String,
        required: true,
    },
    
}, { timestamps: true });

module.exports = mongoose.model('user', userSchema);