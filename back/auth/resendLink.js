const User = require('../models/userSchema');
const Token = require("../models/tokenSchema");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

module.exports = function (req, res, next) {
    User.findOne({ email: req.body.email }, function (err, user) {
        if(!user)
            return res.send({status: 400, msg:'We were unable to find a user with that email. Make sure your email is correct!'});
        else if(user.isVerified)
            return res.send({status: 400, msg: 'This account has been already verified. Please login!'});
        else
        {
            let token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
            token.save(function (err) {
                if (err) {
                  return res.status(500).send({msg: err.message});
                }
    
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
                    subject: 'Account Verification Link',
                    html: '<b>Hello from DoIT,</b><br/><br/>Please verify your account by clicking the link: <a href="http:\/\/' + req.headers.host + '\/confirmation\/' + user.email + '\/' + token.token + '">http:\/\/' + req.headers.host + '\/confirmation\/' + user.email + '\/' + token.token + '</a><br/>Thank you for joining!'
                };

                transporter.sendMail(mailOptions, function (err) {
                    if (err)
                        return res.send({status: 500, msg: 'Technical Issue! Please click on resend for verify your email!'});
                    return res.send({status: 200, msg: 'A verification email has been sent to ' + user.email + '. It will be expire after one hour. If you not get verification email, resend token!'});
                });
            });
        }
    });
}