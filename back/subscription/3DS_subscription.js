const stripe = require('stripe')(process.env.SECRET_PAYMENT_KEY);
const User = require('../models/user');
const jsonwebtoken = require('jsonwebtoken');

module.exports = function(req,res){
    User.findOne({ _id: req.body._id }, function(err, user) {
        let subscriptionPrice;
        switch(req.body.subscriptionType)
        {
            case "monthly":
                subscriptionPrice=process.env.DOIT_MONTHLY_SUBSCRIPTION;
                break;
            case "yearly":
                subscriptionPrice=process.env.DOIT_YEARLY_SUBSCRIPTION;
                break;
            default:
                return res.send({title: "ERROR!", message: "Payment request failed!", icon: "error"});
        }
        if(req.body.paymentIntent.status==="succeeded"&&user)
            stripe.customers.create({
                email: user.email,
                description: "DoIT "+user.subscriptionType+" subscription",
                invoice_settings: {
                    default_payment_method: req.body.payment_method,
                },
                payment_method: req.body.payment_method
            })
                .then(customer => {
                    stripe.subscriptions.create({
                        customer: customer.id,
                        items: [
                            { price: subscriptionPrice }
                        ]
                    })
                        .then(subscription => {
                            user.customerId=customer.id;
                            user.subscriptionId=subscription.id;
                            user.save();
                            return res.send({title: "CONGRATULATIONS!", message: "Payment request successfully!", icon: "success", result: jsonwebtoken.sign({user},process.env.SECRET_TOKEN)});
                        })
                        .catch(err => res.send({title: "ERROR!", message: err.message, icon: "error"}));
                    
                })
                .catch(err => res.send({title: "ERROR!", message: err.message, icon: "error"}));
        else
        {
            stripe.paymentIntents.cancel(req.body.paymentIntent.id);
            return res.send({title: "ERROR!", message: "Payment request failed!", icon: "error"});
        }
    });
}