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
});

module.exports = mongoose.model('Dictionary', dictionarySchema);