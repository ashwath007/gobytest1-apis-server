const Pig = require('pigcolor');

const { request } = require('express');
var nodemailer = require('nodemailer');

// ?? -------------------------------------------[ Email Sender Module ]

const sendEmail = (to, subject, msg, html) => {
    var transporter = nodemailer.createTransport('smtps://help.goby.in@zohomail.in:gobygoby2023@smtp.zoho.in');

    var mailOptions = {
        from: 'help.goby.in@zohomail.in',
        to: to,
        subject: subject,
        text: msg,
        html: html
    };
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);

        }
    });
}


exports.sendEmailActivities = (req, res) => {
    const to = req.body.to
    const action = req.body.action
    const subject = req.body.subject
    const text = req.body.textd
    const html = req.body.html
    sendEmail(to, subject, text, html)
}