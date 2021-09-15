const User = require('../models/userSchema');
const Bcrypt = require('bcrypt-nodejs');
const jsonwebtoken = require('jsonwebtoken');

module.exports = function(req,res) {
    User.findOne({ email: req.body.email }, function(err, user) {
        if(err)
            return res.send({status: 500, msg: err.message});
        else if (!user||!user.isVerified)
            return res.send({ status: 401, msg:'The email address ' + req.body.email + ' is not associated with any account or it is not valid. please check and try again!'});
        Bcrypt.compare(req.body.password, user.password, (err,result)=>{
            if(err)
                return res.send({status: 401, msg:'Wrong password!'});
            if(!result)
                return res.send({status: 401, msg:'Your email has not been verified. Please click on resend!'});
            else {
                user.password=user.verificationKey="";
                return res.send({status: 200, result: jsonwebtoken.sign({user},process.env.SECRET_TOKEN)});
            }
        });
    });
}