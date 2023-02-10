const Pig = require('pigcolor');
const Business = require('../models/business');
const BLink = require('../models/blink');

exports.createBusiness = (req, res) => {
    Pig.box("CREATE: Business");
    const newBLink = new Blink();
    newBLink.blinkID = uuidv4();
    newBLink.instagram_link = req.body.instagram_link;
    newBLink.linkedIn_link = req.body.linkedIn_link;
    newBLink.facebook_link = req.body.facebook_link;
    newBLink.dribbble_link = req.body.dribbble_link;
    newBLink.behance_link = req.body.behance_link;
    newBLink.twitter_link = req.body.twitter_link;
    newBLink.github_link = req.body.github_link;
    newBLink.save((err, blink) => {

        if (err) {
            return res.status(400).json({
                error: err
            })
        }


        const newBusiness = new Business();
        newBusiness.business_name = req.body.business_name;
        newBusiness.business_username = req.body.business_username;
        newBusiness.business_id = req.body.business_id;
        newBusiness.business_logo = req.body.business_logo;
        newBusiness.business_bio = req.body.business_bio;
        newBusiness.business_banner = req.body.business_banner;
        newBusiness.user_profile_link = req.body.user_profile_link;
        newBusiness.business_category = req.body.business_category;
        newBusiness.business_social_links = blink._id;
        newBusiness.save((err, business) => {

            if (err) {
                return res.status(400).json({
                    error: err
                })
            }

            return res.json({
                business: business
            });

        });


    })


}

exports.editBusiness = (req, res) => {
    Pig.box("EDIT: Business");

}

exports.deleteBusiness = (req, res) => {
    Pig.box("DELETE: Business");
    Business.findByIdAndDelete({ _id: req.params.bid }, (err, business) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        return res.json({
            business: business
        })
    });
}

exports.getBusinessByID = (req, res) => {
    Pig.box("GET A: Business");

    Business.findById({ _id: req.params.bid }, (err, business) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }

        return res.json({
            business: business
        })

    });
}

exports.getBusinessByUserName = (req, res) => {
    Pig.box("GET A: Business Name");

    Business.find({ business_username: req.params.busername }, (err, business) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        return res.json({
            business: business
        })
    });

}

exports.getBusinessUserProfileLink = (req, res) => {
    Pig.box("GET A: User Profile Link");

    Business.find({ user_profile_link: req.params.linkId }, (err, business) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }

        return res.json({
            business: business
        })

    });
}

exports.getAllBusiness = (req, res) => {
    Pig.box("GET ALL: Business");

    Business.find({}, (err, business) => {

        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        return res.json({
            business: business
        })
    });
}