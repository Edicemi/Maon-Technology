const mongoose = require('mongoose');
const questionPostSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "user",
    },
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true
    },
    tags: {
        type: String,
        required: true
    },
    
}, { timestamps: true });

module.exports = mongoose.model('questionPost', questionPostSchema);