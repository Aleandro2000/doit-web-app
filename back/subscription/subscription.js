const stripe = require('stripe')(process.env.SECRET_PAYMENT_KEY);
const User = require('../models/user');

module.exports = function(req,res){
    User.findOne({ _id: req.body._id }, function(err, user) {
        if(err)
            res.send({title: "ERROR!", message: "Payment request failed!", icon: "error"})
        else
        {
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
                    res.send({title: "ERROR!", message: "Payment request failed!", icon: "error"});
            }
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
                            user.subscribedAt=Date.now();
                            user.customerId=customer.id;
                            user.subscriptionId=subscription.id;
                            user.save();
                        })
                        .catch(err => res.send({title: "ERROR!", message: "Payment request failed!", icon: "error"}));
                    
                })
                .catch(err => res.send({title: "ERROR!", message: "Payment request failed!", icon: "error"}));

            res.status(500).send({title: "CONGRATULATIONS!", message: "Payment request successfully!", icon: "success"});
        }
    });
}