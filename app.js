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

// ** Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('./public'));
const corsConfig = {
    origin: 'https://localhost:3000',
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






// ************************ Import all routes here **********************

const userRoute = require("./routes/user");
const businessRoute = require("./routes/business");

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

// const options = {
//     key: fs.readFileSync('./.cert/key.pem'),
//     cert: fs.readFileSync('./.cert/cert.pem')
// };
// ?



//TODO: Mongoose Setup Node
// ******************************************************************* DB Connection
mongoose.set('strictQuery', true);
mongoose
    .connect(process.env.DATABASE_PROD, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        Pig.db();
    });



// ?? Session Store Connection
// ** Mongo DB Store configuraton for session storage
const MongoDBStore = require('connect-mongodb-session')(session);
var store = new MongoDBStore({
    uri: 'mongodb+srv://goby:gobygoby@cluster0.djrk8bc.mongodb.net/?retryWrites=true&w=majority',
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


app.use(session({
    secret: 'This is a secret',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 1 // 1 week
    },
    store: store,
    resave: true,
    saveUninitialized: true
}));


app.get("/", (req, res) => {
    console.log("GET Request")
    console.log("Session ID - ", req.sessionID);
    return res.send({
        version: 'goby.in - version 1'
    });
});






//********************* All Route Middlewares **********************************
// ? API Mode
const MOBILE = '/api/mobile';
const WEB = '/api/web';

// ?? | WEB APIs | 
app.use(WEB, userRoute);
app.use(WEB, businessRoute);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ***************************************************************************** 


// TODO: Starting HTTPs Node Server
// ****************************************************************** Node Server
app.listen(port, () => {
    Pig.server(port);
});

// exports.app = functions.https.onRequest(app);

// https.createServer(options, app)
//     .listen(port, function() {
//         Pig.server(port);
//     });