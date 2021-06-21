const User = require('../models/user');
const Bcrypt = require('bcrypt-nodejs');

module.exports = function(req, res, next) {
    User.findOne({ email: req.body.email }, function(err, user) {
        if(err)
            return res.status(500).send({msg: err.message});
        else if (!user||!user.isVerified)
            return res.status(401).send({ msg:'The email address ' + req.body.email + ' is not associated with any account or it is not valid. please check and try again!'});
        Bcrypt.compare(req.body.password, user.password, (err,result)=>{
            if(err)
                return res.status(401).send({msg:'Wrong password!'});
            if(!result)
                return res.status(401).send({msg:'Your email has not been verified. Please click on resend!'});
            else {
                user.password="";    
                return res.send({status: 200, result: user});
            }
        });
    });
}