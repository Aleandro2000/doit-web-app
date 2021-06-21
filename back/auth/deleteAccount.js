const User = require('../models/user');
const Token = require('../models/tokenSchema');

module.exports = function(req, res, next) {
    User.deleteOne({email: req.body.email},(err)=>{
        if(err)
            return res.status(200).send({msg: "Error to delete user!"});
    });
    Token.deleteMany({_userId: req.body._id},(err)=>{
        if(err)
            return res.status(200).send({msg: "Error to delete tokens!"});
    });
    return res.status(200).send({msg: "Account Deleted!"});
}