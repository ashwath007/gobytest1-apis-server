process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
require("dotenv").config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const https = require('https');
const fs = require('fs');
const session = require('express-session');
const router = require('express').Router();

const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// ** UUID
const { v4: uuidv4 } = require('uuid');

// ** Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('./public'));
const corsConfig = {
    origin: '*',
    credentials: true,
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"]
};
app.use(cors(corsConfig));


// ?? *********** Swagger API Documentation ***************


const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');



// ?? *****************************************************



// ? Server Logs
const Pig = require('pigcolor');




// TODO: Server PORT
// ? Port TEST: 8080
const port = process.env.PORT || 8080;


// ?? LoginTemp Auth DB




// ************************ Import all routes here **********************

const userRoute = require("./routes/user");
const businessRoute = require("./routes/business");
const userAuthRoute = require("./routes/userAuth");

// **********************************************************************

const AuthTemp = require('./models/userAuth');
const UserRoute = require('./models/user');


// ?? Email Routers
const emailRoute = require('./routes/email/email');


// **********************************************************************





//TODO: How to create https server?
// ? htts Server Setup

/**
 * We need to start out with a word about SSL certificates. Speaking generally, there are two kinds of certificates:
 * those signed by a 'Certificate Authority', or CA, and 'self-signed certificates'.
 * A Certificate Authority is a trusted source for an SSL certificate,
 * and using a certificate from a CA allows your users to trust the identity of your website. 
 * In most cases, you would want to use a CA-signed certificate in a production environment - for testing purposes, however, a self-signed certificate will do just fine.
 */
// ** LINK - https://nodejs.org/en/knowledge/HTTP/servers/how-to-create-a-HTTPS-server/#:~:text=To%20start%20your%20https%20server,the%20file)%20on%20the%20terminal.&text=or%20in%20your%20browser%2C%20by,to%20https%3A%2F%2Flocalhost%3A8000%20.

const options = {
    key: fs.readFileSync('./.cert/key.pem'),
    cert: fs.readFileSync('./.cert/cert.pem')
};
// ?



//TODO: Mongoose Setup Node
// ******************************************************************* DB Connection
mongoose.set('strictQuery', true);
mongoose
    .connect(process.env.DATABASE_STAG, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        Pig.db();
    });



// ?? Session Store Connection
// ** Mongo DB Store configuraton for session storage
const db = mongoose.connection;
const MongoDBStore = require('connect-mongodb-session')(session);
var store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/goby-in-v1',
    collection: 'mySessions'
});


store.on('error', function(error) {
    console.log(error);
});

// // ???????????????????????????? User Quick Auth Section ????????????????????????????????

// const client = new Client();
// client.on('qr', qr => {
//     qrcode.generate(qr, { small: true });
// });

// client.on('message', message => {
//     console.log(message.body);
// });
// client.on('message', message => {
//     if (message.body === '!ping') {
//         message.reply('pong');
//     }
// });


// client.on('ready', () => {
//     console.log('Client is ready!');
// });

// // ?????????????????????????????????????????????????????????????????????????????????????

app.set("trust proxy", 1);
app.use(session({
    secret: 'This is a secret',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 1 // 1 week
    },
    proxy: true,
    store: store,
    resave: true,
    saveUninitialized: true
}));


app.get("/login", (req, res) => {
    console.log("GET Request")
    console.log("Session ID - ", req.sessionID);

    // ?? Login Auth WA
    const login_wa_token = uuidv4();
    res.cookie('login-temp', login_wa_token);
    req.session.login_wa_token = login_wa_token;



    return res.send({
        version: 'goby.in - version 1',
        login: login_wa_token
    });
});

app.get("/", (req, res) => {
    return res.json({
        msg: "goby.in Version 1.1.1"
    })
});



app.post("/user/new/auth", (req, res) => {
    Pig.box("New User - WA Auth");
    if (!req.body.userPhone || !req.body.userCode || !req.body.userLoginMsg) {
        return res.json({
            msg: "User Data is not valid"
        })
    } else {
        const userPhone = req.body.userPhone.slice(0, 12);
        const userCode = req.body.userCode;
        console.log("USER -> ", userPhone, userCode);
        const newAuthTemp = new AuthTemp();
        newAuthTemp.tempId = userCode;
        newAuthTemp.userPhone = userPhone;
        newAuthTemp.userSession = uuidv4();
        newAuthTemp.save((err, authTemp) => {
            if (err) {
                // return res.status(400).json({
                //     error: err
                // })
            }
            return res.json({
                authTemp: authTemp
            })
        });


    }
    console.log("New User Auth - ", req.body);
});


app.post("/user/new/verification", (req, res) => {
    console.log("User Verification");
    console.log("User Session - ", req.sessionID);
    console.log("User Auth Token - ", req.body.userID);
    // const newUserRoute = new UserRoute();
    // newUserRoute.user_phone = 
    AuthTemp.findOne({ userSession: req.body.userID }, (err, auth) => {

        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        console.log("Auth - ", auth);
        console.log("Auth Error - ", err);
        auth.userProfileStatus = 'Verified';
        auth.save((err, userVerification) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            return res.json({
                user: userVerification,
                redirect: true
            })
        });
    });

    // **  Here we can able to build user profile


});



//********************* All Route Middlewares **********************************
// ? API Mode
const MOBILE = '/api/mobile';
const WEB = '/api/web';

// ?? | WEB APIs | 
app.use(WEB, userRoute);
app.use(WEB, businessRoute);
app.use(WEB, userAuthRoute);
app.use(WEB, emailRoute);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ***************************************************************************** 


// TODO: Starting HTTPs Node Server
// ****************************************************************** Node Server
// app.listen(port, () => {
//     Pig.server(port);
// });

// exports.app = functions.https.onRequest(app);

https.createServer(options, app)
    .listen(port, function() {
        Pig.server(port);
    });