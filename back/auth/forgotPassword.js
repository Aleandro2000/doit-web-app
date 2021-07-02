const User = require('../models/user');
const Bcrypt = require('bcrypt-nodejs');

module.exports = function(req,res,next) {
    User.findOne({email: req.body.email}, (err,user)=>{
        if(err)
            return res.status(500).send({msg: err.message});
        else if(!user)
            return res.status(500).send({ msg:'The email address ' + req.body.email + ' is not associated with any account or it is not valid. please check and try again!'});
        else
        {
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
                    subject: 'Account Resetpassword Link',
                    html: '<h1 style="background-color: black;color: white;">Hello from DoIT,</h1><h4>Please verify your account by clicking the link: <a href="http:\/\/' + req.headers.host + '\/confirmation\/' + user.email + '\/' + token.token + '">http:\/\/' + req.headers.host + '\/confirmation\/' + user.email + '\/' + token.token + '</a><br/>Thank you for joining!</h4>'
                };

                transporter.sendMail(mailOptions, function (err) {
                    if (err)
                        return res.status(500).send({msg:'Technical Issue!, Please click on resend for verify your Email.'});
                    return res.status(200).send('A reset-password link has been sent to ' + user.email + '. It will be expire after one day. If you not get verification Email click on resend token.');
                });
            });
        }
    });
}