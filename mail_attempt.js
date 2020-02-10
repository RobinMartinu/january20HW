
const nodemailer = require('nodemailer');

// Create the transporter with the required configuration for Outlook
// change the user and pass !
const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
        ciphers: 'SSLv3'
    },
    auth: {
        user: "martinu@porg.cz",
        pass: 'HESLO' // always remove the pass before committing
    },
});

// setup e-mail data, even with unicode symbols
const mailOptions = {
    from: '"Robin Martinů " <martinu@porg.cz>', // sender address (who sends)
    to: 'lsvejda@centrum.cz', // list of receivers (who receives)
    subject: 'Spam', // Subject line
    text: 'Testíček z Node.js', // plaintext body
    html: '<b>Test</b>íček z Node.js' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }

    console.log('Message sent: ' + info.response);
});
