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
    userName: {
        type: String,
        unique: true,
        trim: true
    },

    userPhone: {
        type: String,
        unique: true
    },
    userEmail: {
        type: String,
        unique: true
    },
    userProfileStatus: {
        type: String,
        enum: ['New User', 'Verified', 'OnBoarding-One', 'OnBoarding-Two', 'OnBoarding-Three'],
        default: 'New User'
    },

    userVerifyCodeEmail: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },

    userVerifyCodeWA: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },

    userEmailCodeSent: {
        type: Boolean
    }

});

module.exports = mongoose.model("AuthTemp", userAuthTemp);