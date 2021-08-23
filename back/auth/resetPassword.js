const User = require('../models/user');
const Bcrypt = require('bcrypt-nodejs');

module.exports = function(req,res) {
    req.body.password = Bcrypt.hashSync(req.body.password, Bcrypt.genSaltSync(10));
    User.updateOne({ _id: req.body._id }, { password: req.body.password }, function(err, user) {
        if(err)
            return res.send({status: 500, msg: err.message});
        if(!user)
            return res.send({status: 401, msg:'The email address ' + req.body.email + ' is not associated with any account!'});
        else
            return res.send({status: 200, msg:"Succesful changed password!"});
    });
}