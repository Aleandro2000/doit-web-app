const jwt = require('jsonwebtoken');
const config = require('./config/key');
const User = require('./models/user');
const Bcrypt = require('bcrypt-nodejs');
const ActiveSession = require('./models/activeSession');

module.exports = function(req, res, next) {
    User.findOne({ email: req.body.email }, function(err, user) {
        if(err)
            return res.status(500).send({msg: err.message});
        else if (!user)
            return res.status(401).send({ msg:'The email address ' + req.body.email + ' is not associated with any account. please check and try again!'});
        else if(!Bcrypt.compareSync(req.body.password, user.password))
            return res.status(401).send({msg:'Wrong Password!'});
        else if (!user.isVerified)
            return res.status(401).send({msg:'Your Email has not been verified. Please click on resend'});
        else
        {
            const token = jwt.sign( user.email , config.secret,{
                expiresIn: 3600000,
            });
            user.password = null;
            const session = {userId: user._id, token: 'JWT ' + token};
            
            ActiveSession.create(session, function(err, resp) {
                if(err)
                    console.log(""+err);
                console.log(token);
            });
        }
    });
}