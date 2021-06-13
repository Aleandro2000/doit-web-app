const User = require('./models/user');
const Token = require("./models/tokenSchema");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
require("dotenv").config();

module.exports = function (req, res, next) {
    User.findOne({ email: req.body.email }, function (err, user) {
        if(!user)
            return res.status(400).send({msg:'We were unable to find a user with that email. Make sure your Email is correct!'});
        else if(user.isVerified)
            return res.status(200).send('This account has been already verified. Please log in.');
        else
        {
            let token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
            token.save(function (err) {
                if (err) {
                  return res.status(500).send({msg:err.message});
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
                    html: '<h1 style="background-color: gray;color: white;">Hello,</h1><h4>Please verify your account by clicking the link: <a href="http:\/\/' + req.headers.host + '\/confirmation\/' + user.email + '\/' + token.token + '">http:\/\/' + req.headers.host + '\/confirmation\/' + user.email + '\/' + token.token + '</a><br/>Thank you for joining!</h4>'
                };

                transporter.sendMail(mailOptions, function (err) {
                    if (err)
                        return res.status(500).send({msg:'Technical Issue!, Please click on resend for verify your Email.'});
                    return res.status(200).send('A verification email has been sent to ' + user.email + '. It will be expire after one day. If you not get verification Email click on resend token.');
                });
            });
        }
    });
}