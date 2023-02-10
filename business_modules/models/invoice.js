const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({

    invoiceId: {
        type: String,
        required: true,
        unique: true
    },
    invoiceNumber: {
        type: String,
        required: true
    },
    invoiceDate: {
        type: Date,
        required: true
    },
    dueDate: {
        type: Date
    },

    // ? Payer Details
    payerName: {
        type: String,
        required: true
    },
    payerEmail: {
        type: String,
        unique: true
    },
    payerBillingAddress: {
        type: String,
        required: true,
        maxLength: 102
    },
    payerCompanyHeaderLogo: {
        type: String
    },

    // ? Invoice Amount
    invoiceAmount: {
        type: String,
        required: true
    },
    invoiceDescription: {
        type: String,
        maxLength: 58,
        required: true
    },
    invoiceFor: {
        type: String,
        required: true
    },
    invoiceSubTotal: {
        type: String,
        required: true
    },
    invoiceDiscount: {
        type: String,
        required: true
    },
    invoiceSalesTax: {
        type: String,
        required: true
    },
    invoiceTotal: {
        type: String,
        required: true
    },


    // ? Bank Details and Other Details
    bankDetailsOtherDetails: {
        type: String,
        required: true
    }








});

module.exports = mongoose.model("Invoice", invoiceSchema);