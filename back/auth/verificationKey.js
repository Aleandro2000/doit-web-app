const User = require('../models/user');
const Bcrypt = require('bcrypt-nodejs');
const jsonwebtoken = require('jsonwebtoken');

module.exports = function(req,res) {
    User.findOne({email: req.body.email}, (err,user)=>{
        if(err)
            return res.send({status: 500, msg: err.message});
        else if(!user)
            return res.send({ status: 500, msg:'The email address ' + req.body.email + ' is not associated with any account or it is not valid. please check and try again!'});
        Bcrypt.compare(req.body.key, user.verificationKey, (err,result)=>{
            if(err||!result)
                return res.send({status: 401, msg:'Invalid verification key!'});
            else
            {
                user.verificationKey="";
                user.save();
                return res.send({status: 200, result: jsonwebtoken.sign({user},process.env.SECRET_TOKEN)});
            }
        });
    });
}