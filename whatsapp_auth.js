const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');


// ???????????????????????????? User Quick Auth Section ????????????????????????????????

const client = new Client();
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});
client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();


client.on('message', message => {
    console.log(message.body);
});
client.on('message', message => {
    console.log(message.body);
    if (message.body === '!ping') {
        message.reply('pong');
    }
});



// ?????????????????????????????????????????????????????????????????????????????????????