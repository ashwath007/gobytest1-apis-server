const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({

    portfolio_name: {
        type: String,
        required: true
    },




});

module.exports = mongoose.model("Portfolio", portfolioSchema);