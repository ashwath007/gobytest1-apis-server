const Pig = require("pigcolor");
const { v4: uuidv4 } = require('uuid');
var nodemailer = require('nodemailer');
const axios = require('axios');

// ** User DB Imports ************

const User = require("../models/user");
const Links = require("../models/links");
const AuthTemp = require("../models/userAuth");

// *******************************


exports.createUser = (req, res) => {
    Pig.box("CREATE: Users");
    const newUser = User();
    const newLink = Links();


    // ?? User Links Section
    newLink.linkID = uuidv4();
    newLink.instagram_link = req.body.instagram_link;
    newLink.linkedIn_link = req.body.linkedIn_link;
    newLink.facebook_link = req.body.facebook_link;
    newLink.dribbble_link = req.body.dribbble_link;
    newLink.github_link = req.body.github_link;
    newLink.behance_link = req.body.behance_link;
    newLink.twitter_link = req.body.twitter_link;

    newLink.save((err, links) => {

        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        newUser.user_name = req.body.user_name;
        newUser.user_fullname = req.body.user_fullname;
        newUser.user_profile_pic = req.body.user_profile_pic;
        newUser.user_whatsapp_direct = req.body.user_whatsapp_direct;
        newUser.user_phone_direct = req.body.user_phone_direct;
        newUser.user_id = uuidv4();
        newUser.user_bni_chapter = req.body.user_bni_chapter;
        newUser.user_location = req.body.user_location;
        newUser.user_bio = req.body.user_bio;
        newUser.user_business = req.body.user_business;
        newUser.user_status = req.body.user_status;
        newUser.user_total_viste = req.body.user_total_viste;
        newUser.user_social_links = links._id;
        newUser.save((err, newuser) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            return res.json({
                newUser: newuser,
                newLinks: links
            })
        });

    });





}

exports.editUser = (req, res) => {
    Pig.box("EDIT: Users");
}

exports.deleteUser = (req, res) => {
    Pig.box("DELETE: Users");
}

exports.getAllUsers = (req, res) => {
    Pig.box("GET ALL: Users");
    User.find({}, (err, allUsers) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }

        return res.json({
            allUsers: allUsers
        })

    });
}

exports.getAUsers = (req, res) => {
    Pig.box("GET A: User - Username");
    const username = req.params.username;
    User.findOne({ user_name: username }, (err, user) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        if (!user) {
            return res.json({
                msg: "Claim this username or User doesn't exist",
            })
        }

        Links.findById({ _id: user.user_social_links }, (err, userLinks) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }

            return res.json({
                userLinks: userLinks,
                userData: user
            })
        });

    });
}

exports.getAllUsername = (req, res) => {
    Pig.box("GET ALL: User Name");
    User.find({}).select('user_name').exec((err, usernames) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        return res.json({
            userNames: usernames
        })
    });
}


// ?? ---------------------


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
            return false;
        } else {
            console.log('Email sent: ' + info.response);
            return true;
        }
    });
}

const sendWA = (to, subject) => {
    axios.post('https://localhost:8081/send/code', {
            to: to,
            subject: subject
        }, { withCredentials: true })
        .then(res => {
            console.log("Response - ", res);
            return true;
        })
        .catch(err => {
            console.log("Error - ", err);
            return false;
        })
}


exports.createTempUser = (req, res) => {
    Pig.box("CREATE: Temp User");
    console.log(req.body);
    console.log(req.sessionID);
    var userCodeEmail = Math.floor(1000 + Math.random() * 9000);
    var userCodeWA = Math.floor(1000 + Math.random() * 9000);
    if (req.body.mode === "email") {
        const newAuthTemp = new AuthTemp();
        newAuthTemp.userName = req.body.userName;
        newAuthTemp.userPhone = req.body.userPhone;
        newAuthTemp.userEmail = req.body.userEmail;
        newAuthTemp.tempId = uuidv4();
        newAuthTemp.userVerifyCodeEmail = userCodeEmail
        newAuthTemp.userVerifyCodeWA = userCodeWA;

        newAuthTemp.save((err, tempUser) => {
            var emailSubject = `User Verification Code`;
            var emailText = `This is the verification code - ${userCodeEmail}`;
            const sent = sendEmail(req.body.userEmail, emailSubject, emailText);
            if (err) {
                console.log("Error - ", err);
                return res.status(400).json({
                    error: err
                });
            }
            console.log("Temp User - ", tempUser);
            if (tempUser || sent) {
                req.session.tempId = tempUser.tempId;
                req.session.status = "not verified";
                res.json({
                    msg: "hi",
                    data: tempUser,
                    id: tempUser._id
                })
            }

        })
    } else if (req.body.mode === "wa") {
        const to = req.body.userPhone;
        const subject = req.body.userCodeWA;
        sendWA(to, subject);
    }
}



exports.sendCode = (req, res) => {
    Pig.box("SEND: Code");
}

const generateUniqueCode = () => {
    return 1
}

exports.userValidator = (req, res) => {
    Pig.box("VALIDATE: User");
    console.log("code", req.body.code);
    const id = req.session.tempId
    AuthTemp.findOne({ tempId: id }, (err, user) => {
        console.log(user);
        if (user.userVerifyCodeEmail === req.body.code) {
            req.session.user = user.tempId;
            return res.json({
                user
            })
        }
    })
}

exports.userOnboarding = (req, res) => {
    Pig.box("USER: Onboarding")
}