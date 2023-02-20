const Pig = require("pigcolor");
const AuthTemp = require('../models/userAuth');

exports.userLoginAuth = () => {
    Pig.box("User - Temp Process Session");
    const newAuthTemp = new AuthTemp();
    newAuthTemp.tempId = req.body.tempId;
    newAuthTemp.userSession = req.body.userSession;
    newAuthTemp.save((err, newAuth) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        return res.json({
            auth: newAuth
        })
    });

}