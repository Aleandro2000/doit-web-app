const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
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
    paymentIntentId: {
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
})

userSchema.index({createdAt: 1},{expireAfterSeconds: 24*60*60,partialFilterExpression : {customerId: "", subscriptionId: "", paymentIntentId: ""}});

module.exports = mongoose.model('user', userSchema);
