const stripe = require('stripe')(process.env.SECRET_PAYMENT_KEY);
const User = require('../models/user');

module.exports = function(req,res){
    User.findOne({ _id: req.body._id }, function(err, user) {
        if(err)
            res.send({title: "ERROR!", message: "Payment request failed!", icon: "error"})
        else
        {
            stripe.charges.create({
                amount: process.env.SUBSCRIPTION_PRICE*100,
                currency: process.env.SUBSCRIPTION_CURRENCY,
                source: process.env.SUBSCRIPTION_SOURCE,
                description: "DoIT Subscription"
            })
                .catch(err => res.send({title: "ERROR!", message: "Payment request failed!", icon: "error"}));
            if(user.paidAt.getMonth()==11)
                user.paidAt=new Date(user.paidAt.getFullYear()+1, 0, 1);
            else
                user.paidAt=new Date(user.paidAt.getFullYear(), user.paidAt.getMonth()+1, 1);
            user.save();
            res.status(500).send({title: "CONGRATULATIONS!", message: "Payment request successfully!", icon: "success"});
        }
    });
}