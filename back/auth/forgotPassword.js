const User = require('../models/user');
const Bcrypt = require('bcrypt-nodejs');
const crypto = require("crypto");
const nodemailer = require("nodemailer");

module.exports = function(req,res) {
    console.log(req.body.email)
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
                html: '<b>Hello from DoIT,</b><br/><br/>Your verification key is: '+user.verificationKey
            };

            transporter.sendMail(mailOptions, function (err) {
                if (err)
                    return res.send({status: 500, msg: 'Technical Issue! Please click on resend for verify your email!'});
                return res.send({status: 200, msg: 'A verification email has been sent to ' + user.email + '. It will be expire after one hour. If you not get verification email, resend token!'});
            });

            user.verificationKey=Bcrypt.hashSync(user.verificationKey, Bcrypt.genSaltSync(10));
            user.save();
        }
    });
}