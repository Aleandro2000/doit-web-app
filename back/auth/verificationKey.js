const User = require('../models/user');
const Bcrypt = require('bcrypt-nodejs');

module.exports = function(req,res,next) {
    User.findOne({email: req.body.email}, (err,user)=>{
        if(err)
            return res.status(500).send({msg: err.message});
        else if(!user)
            return res.status(500).send({ msg:'The email address ' + req.body.email + ' is not associated with any account or it is not valid. please check and try again!'});
        Bcrypt.compare(req.body.key, user.verificationKey, (err,result)=>{
            if(err||!result)
                return res.status(401).send({msg:'Invalid verification key!'});
            else
            {
                user.verificationKey="";
                user.save(); 
                return res.send({status: 200, result: user});
            }
        });
    });
}