module.exports = function(req,res){
    const stripe = require('stripe')(process.env.PUBLIC_PAYMENT_KEY);
    // get the product details
    
    const product = getTheProduct(productId);
    stripe.charges.create({
    
        amount: product.price,
        currency: 'usd',
        source: cardToken.id,
        description: `Payment for ${product.title}`,
        metadta: {
            productId: product.id
        }
    }, (err, charge) => {
        if(err)
            console.log("Payment Success");    
        else
            console.log("Payment Success");
    });
}