/* eslint import/no-anonymous-default-export: [2, {"allowAnonymousFunction": true}] */
export default async function (req, res) {
  //require("dotenv").config();
  let nodemailer = require('nodemailer');

  let mailerConfig = {
    host: process.env.EMAIL_SERVER_HOST,

    secureConnection: true, // TLS requires secureConnection to be false
    port: 587,
    auth: {
      user: 'inquiries@abuzeit.com',
      pass: 'Abuzeit123!@#',
    },
    tls: {
      ciphers: 'SSLv3',
      //rejectUnauthorized: false,
    },
  };
  let transporter = nodemailer.createTransport(mailerConfig);

  let mailOptions = {
    from: mailerConfig.auth.user,
    // to: 'inquiries@abuzeit.com',
    to: 'walaaemam077@gmail.com',
    subject: `${req.body.Subject}`,
    //   text: req.body.message + " | Sent from: " + req.body.email,
    html: `
      <div><strong>Customer Name:</strong> ${req.body.Name}</div>
      <br/>
      <div><strong>Customer Email:</strong> ${req.body.Email}</div>
      <br/>
      <div><strong>Customer Phone:</strong> ${req.body.Phone}</div>
      <br/>
      <div><strong>Customer Message Requset:</strong> ${req.body.MessageBox}</div>`,
  };

  transporter.sendMail(mailOptions, function (error) {
    if (error) {
      //console.log('error:', error);
      return res.status(error.statusCode || 500).json({ error: error.message });
      reject(err);
    } else {
     //console.log('good');
      return res.status(200).json({ error: '' });
      resolve(info);
    }
  });
}
