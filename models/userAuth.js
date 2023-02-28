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
    },
    userProfileStatus: {
        type: String,
        enum: ['New User', 'Verified', 'OnBoarding-One', 'OnBoarding-Two', 'OnBoarding-Three'],
        default: 'New User'
    }

});

module.exports = mongoose.model("AuthTemp", userAuthTemp);