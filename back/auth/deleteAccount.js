const stripe = require('stripe')(process.env.SECRET_PAYMENT_KEY);
const User = require('../models/userSchema');
const Token = require('../models/tokenSchema');

module.exports = function(req, res, next) {
    User.findOneAndDelete({_id: req.body._id}, (err,user)=>{
        if(err)
            return res.send({status: 400,msg: "Error to delete tokens!"});
        else
        {
            stripe.subscriptions.del(user.subscriptionId);
            stripe.customers.del(user.customerId);
            Token.deleteMany({_userId: user._id},(err)=>{
                if(err)
                    return res.send({status: 200,msg: "Error to delete tokens!"});
            });
        }
    });
    return res.send({status: 200,msg: "Account Deleted!"});
}