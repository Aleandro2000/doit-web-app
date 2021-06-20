const mongoose = require("mongoose");

const paymentsSchema = new mongoose.Schema({
    _userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    validation: {
        type: Boolean,
        default: false
    },
    paidAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Payments', paymentsSchema);