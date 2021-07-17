const stripe = require('stripe')(process.env.SECRET_PAYMENT_KEY);
const User = require('../models/user');

module.exports = function(req,res){
    User.findOne({ _id: req.body._id }, function(err, user) {
        if(err)
            res.send({title: "ERROR!", message: "Payment request failed!", icon: "error"})
        else
        {
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
                    res.send({title: "ERROR!", message: "Payment request failed!", icon: "error"});
            }
            stripe.paymentIntents.create({
                amount: price*100,
                currency: "usd",
                confirm: true,
                confirmation_method: 'automatic',
                payment_method: req.body.payment_method,
                payment_method_types: ['card'],
                setup_future_usage: 'off_session'
            })
                .then(paymentIntent => {
                    if(paymentIntent.status==="succeeded")
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
                    else if(paymentIntent.status==="requires_action"&&paymentIntent.next_action.type==="use_stripe_sdk")
                        return res.send({intent: paymentIntent});
                    else
                    {
                        stripe.paymentIntents.cancel(paymentIntent.id);
                        return res.send({title: "ERROR!", message: "Payment request failed!", icon: "error"});
                    }
                })
                .catch(err => res.send({title: "ERROR!", message: err.message, icon: "error"}));
        }
    });
}