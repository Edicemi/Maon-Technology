const mongoose = require('mongoose');
const questionAnswerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "user",
    },
    questionPostId: {
        type: mongoose.Types.ObjectId,
        ref: "questionPost",
        required: true,
    },
    answer: {
        type: String,
        required: true
    },
    
}, { timestamps: true });

module.exports = mongoose.model('questionAnswer', questionAnswerSchema);