import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { CheckoutForm } from "./CheckoutForm";

const StripeContainer = () => {
    return (
        <Elements stripe={loadStripe(process.env.REACT_APP_PUBLIC_PAYMENT_KEY)}>
            <CheckoutForm />
        </Elements>
    );
};

export default StripeContainer;