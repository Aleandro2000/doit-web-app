const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true
    },
    paidAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('user', userSchema);
