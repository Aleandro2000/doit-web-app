const User = require('./models/user');
const Token = require("./models/tokenSchema");

module.exports = function (req, res, next) {
    Token.findOne({ token: req.params.token }, function (err, token) {
        if (!token)
            return res.status(400).send({msg:'Your verification link may have expired. Please click on resend for verify your Email.'});
        else{
            User.findOne({ _id: token._userId, email: req.params.email }, function (err, user) {
                if (!user)
                    return res.status(401).send({msg:'We were unable to find a user for this verification. Please SignUp!'});
                else if (user.isVerified)
                    return res.status(200).send('User has been already verified. Please Login');
                else
                {
                    user.isVerified = true;
                    user.save(function (err) {
                        if(err)
                            return res.status(500).send({msg: err.message});
                        else
                          return res.status(200).send('Your account has been successfully verified');
                    });
                }
            });
        }
        
    });
}