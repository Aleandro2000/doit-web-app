const User = require('../models/user');
const Bcrypt = require('bcrypt-nodejs');
const crypto = require("crypto");
const nodemailer = require("nodemailer");

module.exports = function(req,res,next) {
    User.findOne({email: req.body.email}, (err,user)=>{
        if(err)
            return res.status(500).send({msg: err.message});
        else if(!user)
            return res.status(500).send({ msg:'The email address ' + req.body.email + ' is not associated with any account or it is not valid. please check and try again!'});
        else
        {
            user.verificationKey=crypto.randomBytes(16).toString('hex');

            let testAccount = nodemailer.createTestAccount();
            let transporter = nodemailer.createTransport({
                host: process.env.MAIL_HOST,
                port: process.env.MAIL_PORT,
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS
                }
            });

            let mailOptions = {
                from: 'no-reply@doit.com',
                to: user.email,
                subject: 'Account Resetpassword Link',
                html: '<h1 style="background-color: black;color: white;">Hello from DoIT,</h1><h4>Your verification key is: '+user.verificationKey
            };

            transporter.sendMail(mailOptions, function (err) {
                if (err)
                    return res.status(500).send({msg:'Technical Issue! Please click on resend for verify your email!'});
                return res.status(200).send('A verification key has been sent to ' + user.email + '. It will be expire after one hour. If you not get verification email, click on resend token!');
            });

            user.verificationKey=Bcrypt.hashSync(user.verificationKey, Bcrypt.genSaltSync(10));
            user.save();
        }
    });
}