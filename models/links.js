const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({

    linkID: {
        type: String,
        required: true
    },

    instagram_link: {
        type: String,
        unique: true,
        required: true
    },

    linkedIn_link: {
        type: String,
        unique: true,
        required: true
    },

    facebook_link: {
        type: String,
        unique: true,
        required: true
    },

    dribbble_link: {
        type: String,
        unique: true,
        required: true
    },

    behance_link: {
        type: String,
        unique: true,
        required: true
    },

    twitter_link: {
        type: String,
        unique: true,
        required: true
    },

    github_link: {
        type: String,
        unique: true,
        required: true
    }


});


module.exports = mongoose.model("Links", linkSchema);