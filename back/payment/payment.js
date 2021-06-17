module.exports = function(req,res){
    const stripe = require('stripe')(process.env.SECRET_PAYMENT_KEY);
    
    stripe.charges.create({
        amount: process.env.SUBSCRIPTION_PRICE*100,
        currency: process.env.SUBSCRIPTION_CURRENCY,
        source: process.env.SUBSCRIPTION_SOURCE,
        description: "DoIT Subscription"
    })
        .catch(err => res.send({title: "ERROR!", message: "Payment request failed!", icon: "error"}));

    res.status(500).send({title: "CONGRATULATIONS!", message: "Payment request failed!", icon: "success"});
}