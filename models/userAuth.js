const mongoose = require("mongoose");

const userAuthTemp = new mongoose.Schema({
    tempId: {
        type: String,
        required: true,
        unique: true
    },
    userSession: {
        type: String,
        unique: true
    },
    userPhone: {
        type: String,
        unique: true
    }

});

module.exports = mongoose.model("AuthTemp", userAuthTemp);