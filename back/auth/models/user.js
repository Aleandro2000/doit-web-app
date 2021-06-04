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
    isGoogle: {
        type: Boolean,
        default: false
    }
})

const User = mongoose.model('user', userSchema);

module.exports = User;
