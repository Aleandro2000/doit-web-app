const stripe = require('stripe')(process.env.SECRET_PAYMENT_KEY);
const Payments = require('../models/paymentsSchema');

module.exports = function(req,res){
    Payments.findOne({ _userId: req.body._id }, function(err, result) {
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
            if(!result.validation)
                result.validation=true;
            if(result.paidAt.getMonth()==11)
                result.paidAt=new Date(result.paidAt.getFullYear()+1, 0, 1);
            else
                result.paidAt=new Date(result.paidAt.getFullYear(), result.paidAt.getMonth()+1, 1);
            result.save();
            res.status(500).send({title: "CONGRATULATIONS!", message: "Payment request successfully!", icon: "success"});
        }
    });
}