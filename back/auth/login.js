const User = require('./models/user');
const Bcrypt = require('bcrypt-nodejs');

module.exports = function(req, res, next) {
    User.findOne({ email: req.body.email }, function(err, user) {
        if(err)
            return res.status(500).send({msg: err.message});
        else if (!user)
            return res.status(401).send({ msg:'The email address ' + req.body.email + ' is not associated with any account. please check and try again!'});
        Bcrypt.compare(Bcrypt.hashSync(req.body.password, Bcrypt.genSaltSync(10)), user.password, (err,result)=>{
            if(result)
                return res.status(401).send({msg:'Wrong password!'});
            else if (!user.isVerified)
                return res.status(401).send({msg:'Your email has not been verified. Please click on resend!'});
                return res.status(200).send({msg:"Succesful logged in!"});
        });
    });
}