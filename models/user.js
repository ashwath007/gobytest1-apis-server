const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;



const userSchema = new mongoose.Schema({

    user_name: {
        type: String,
        trim: true,
        unique: true
    },

    user_phone: {
        type: String,
        unique: true
    },

    user_profile_pic: {
        type: String
    },

    user_fullname: {
        type: String,
        maxLength: 42
    },

    user_whatsapp_direct: {
        type: String,
        unique: true
    },

    user_phone_direct: {
        type: String,
        unique: true
    },

    user_id: {
        type: String,
        unique: true
    },

    user_bni_chapter: {
        type: String
    },

    user_location: {
        type: String
    },

    user_bio: {
        type: String,
        maxLength: 100
    },

    user_business: {
        type: ObjectId,
        ref: "Business"
    },

    user_status: {
        type: String
    },

    user_total_viste: {
        type: Number
    },


    user_social_links: {
        type: ObjectId,
        ref: "Links"
    }






});


module.exports = mongoose.model("User", userSchema);