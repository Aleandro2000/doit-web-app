const Bcrypt = require('bcrypt-nodejs');
const User = require('../models/user');
const Token = require("../models/tokenSchema");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

module.exports = function(req, res, next) {
    User.findOne({ email: req.body.email }, function (err, user) {
        if(err)
            return res.send({status: 500, msg: err.message});
        else if(user)
            return res.send({status: 400, msg:'This email address is already associated with another account.'});
        else
        {
            req.body.password = Bcrypt.hashSync(req.body.password, Bcrypt.genSaltSync(10));
            user = new User({ email: req.body.email, password: req.body.password, subscriptionType: req.body.subscriptionType});
            user.save(function (err){
                if (err) 
                    return res.send({status: 500, msg:err.message});
              
                let token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
                token.save(function (err) {
                    if(err)
                        return res.status(500).send({msg:err.message});
  
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
                            return res.send({status: 500, msg:'Technical Issue! Please click on resend for verify your Email.'});
                        return res.send({status: 200, msg:'A verification email has been sent to ' + user.email + '. It will be expire after one day. If you not get verification Email click on resend token.'});
                    });
                });
            });
        }
    });
}