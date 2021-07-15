const stripe = require('stripe')(process.env.SECRET_PAYMENT_KEY);
const User = require('../models/user');
const Token = require('../models/tokenSchema');

module.exports = function(req, res, next) {
    User.findOneAndDelete({_id: req.body._id}, (err,user)=>{
        if(err)
            return res.status(200).send({msg: "Error to delete tokens!"});
        else
        {
            stripe.subscriptions.del(user.subscriptionId);
            stripe.customers.del(user.customerId);
            stripe.paymentIntents.cancel(user.paymentIntentId);
            Token.deleteMany({_userId: user._id},(err)=>{
                if(err)
                    return res.status(200).send({msg: "Error to delete tokens!"});
            });
        }
    });
    return res.status(200).send({msg: "Account Deleted!"});
}