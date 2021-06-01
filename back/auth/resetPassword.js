const User = require('./models/user');
const Bcrypt = require('bcrypt-nodejs');

module.exports = function(req,res,next) {
    req.body.password = Bcrypt.hashSync(req.body.password, Bcrypt.genSaltSync(10));
    User.updateOne({ email: req.body.session }, { password: req.body.password }, function(err, user) {
        if(err)
            return res.status(500).send({msg: err.message});
        if(!user)
            return res.status(401).send({ msg:'The email address ' + req.body.email + ' is not associated with any account!'});
        else
            return res.status(200).send({msg:"Succesful changed password!"});
    });
}