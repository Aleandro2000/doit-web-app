const User = require('../models/user');
const Bcrypt = require('bcrypt-nodejs');

module.exports = function(req,res,next) {
    User.findOne({email: req.body.email}, (err,user)=>{
        if(err)
            return res.status(500).send({msg: err.message});
        else if(user)
        {
            
        }
    });
}