import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import env from "react-dotenv";

import { CheckoutForm } from "./CheckoutForm";

const StripeContainer = () => {
    const stripeTestPromise = loadStripe("PUBLIC_PAYMENT_KEY");
    return (
        <Elements stripe={stripeTestPromise}>
            <CheckoutForm />
        </Elements>
    );
};

export default StripeContainer;