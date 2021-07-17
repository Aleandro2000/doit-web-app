const stripe = require('stripe')(process.env.SECRET_PAYMENT_KEY);
const User = require('../models/user');

module.exports = function(req,res){
    User.findOne({ _id: req.body._id }, function(err, user) {
        let subscriptionPrice, price;
        switch(req.body.subscriptionType)
        {
            case "monthly":
                subscriptionPrice=process.env.DOIT_MONTHLY_SUBSCRIPTION;
                price=process.env.MONTHLY_PRICE;
                break;
            case "yearly":
                subscriptionPrice=process.env.DOIT_YEARLY_SUBSCRIPTION;
                price=process.env.YEARLY_PRICE;
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
                            return res.status(200).send({title: "CONGRATULATIONS!", message: "Payment request successfully!", icon: "success", result: user});
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