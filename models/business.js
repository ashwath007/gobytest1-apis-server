const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;



const businessSchema = new mongoose.Schema({



    business_name: {
        type: String,
        maxLength: 42,
        trim: true,
        required: true
    },

    business_username: {
        type: String,
        trim: true,
        required: true
    },

    business_id: {
        type: String,
        unique: true
    },

    business_logo: {
        type: String,
        required: true
    },

    business_bio: {
        type: String,
        required: true
    },

    business_banner: {
        type: String,
        required: true
    },

    user_profile_link: {
        type: ObjectId,
        ref: "Links",
        required: true
    },

    business_category: {
        type: String,
        required: true
    },

    business_social_links: {
        type: String,
        required: true
    }





});


module.exports = mongoose.model("Business", businessSchema);