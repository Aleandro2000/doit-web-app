const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
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
        default: "",
        index: true
    },
    subscriptionId: {
        type: String,
        default: "",
        index: true
    },
    password: {
        type: String,
        required: true
    },
    verificationKey: {
        type: String,
        default: ""
    }
});

userSchema.index({createdAt: 1},{expireAfterSeconds: 24*60*60,partialFilterExpression : {customerId: "", subscriptionId: ""}});

module.exports = mongoose.model('user', userSchema);