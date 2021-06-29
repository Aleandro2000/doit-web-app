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
    subscriptionType: {
        type: String,
        required: true
    },
    customerId: {
        type: String,
        default: ""
    },
    subscriptionId: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        required: true
    },
    subscribedAt: {
        type: Date,
        default: null
    }
})

module.exports = mongoose.model('user', userSchema);
