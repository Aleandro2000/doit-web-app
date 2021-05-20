const Bcrypt = require('bcrypt-nodejs');
const User = require('./models/user');
const Token = require("./models/tokenSchema");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

module.exports = function(req, res, next) {
    User.findOne({ email: req.body.email }, function (err, user) {
        if(err)
            return res.status(500).send({msg: err.message});
        else if(user)
            return res.status(400).send({msg:'This email address is already associated with another account.'});
        else
        {
            req.body.password = Bcrypt.hashSync(req.body.password, Bcrypt.genSaltSync(10));
            user = new User({ email: req.body.email, password: req.body.password });
            user.save(function (err){
                if (err) 
                    return res.status(500).send({msg:err.message});
              
                let token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
                token.save(function (err) {
                    if(err)
                        return res.status(500).send({msg:err.message});
  
                    let testAccount = nodemailer.createTestAccount();
                    let transporter = nodemailer.createTransport({
                        host: 'smtp.mailtrap.io',
                        port: 2525,
                        auth: {
                            user: '3fc0545eeb1a18',
                            pass: 'e126b17b9313eb'
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
            });
        }
    });
}