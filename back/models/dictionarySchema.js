const mongoose = require("mongoose");

const dictionarySchema = new mongoose.Schema({
    keyword: {
        type: String,
        required: true
    },
    definition: {
        type: String,
        required: true
    },
},{
    collection: "dictionary",
    timestamps: true
});

module.exports = mongoose.model('dictionary', dictionarySchema);