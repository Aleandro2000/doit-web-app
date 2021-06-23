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
                    subscriptionPrice=process.env.DO_IT_MONTHLY_SUBSCRIPTION;
                    break;
                case "yearly":
                    subscriptionPrice=process.env.DO_IT_YEARLY_SUBSCRIPTION;
                    break;
                default:
                    res.send({title: "ERROR!", message: "Payment request failed!", icon: "error"});
            }
            stripe.customers.create({
                payment_method: req.body.payment_method,
                invoice_settings: {
                    default_payment_method: req.body.payment_method
                },
                email: user.email,
                description: "DoIT "+user.subscriptionType+" subscription"
            })
                .then(customer => {
                    console.log(customer.id)
                    stripe.subscriptions.create({
                        customer: customer.id,
                        items: [
                            { price: subscriptionPrice }
                        ]
                    })
                        .catch(err => res.send({title: "ERROR!", message: "Payment request failed!", icon: "error"}));
                    
                })
                .catch(err => res.send({title: "ERROR!", message: "Payment request failed!", icon: "error"}));

            user.hasSubscription=true;
            user.paidAt=Date.now();
            user.save();
            res.status(500).send({title: "CONGRATULATIONS!", message: "Payment request successfully!", icon: "success"});
        }
    });
}