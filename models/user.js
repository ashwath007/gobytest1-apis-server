const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;



const userSchema = new mongoose.Schema({

    user_name: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },

    user_fullname: {
        type: String,
        maxLength: 42,
        required: true
    },

    user_whatsapp_direct: {
        type: String,
        unique: true,
        required: true
    },

    user_phone_direct: {
        type: String,
        unique: true,
        required: true
    },

    user_id: {
        type: String,
        unique: true
    },

    user_bni_chapter: {
        type: String,
        required: true
    },

    user_location: {
        type: String,
        required: true
    },

    user_bio: {
        type: String,
        required: true,
        maxLength: 100
    },

    user_business: {
        type: ObjectId,
        ref: "Business"
    },

    user_status: {
        type: String,
        required: true
    },

    user_total_viste: {
        type: Number,
        required: true
    },


    user_social_links: {
        type: ObjectId,
        ref: "Links",
        required: true
    }






});


module.exports = mongoose.model("User", userSchema);