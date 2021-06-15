import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import swal from "sweetalert";
import { Link } from "react-router-dom";

import logo from "../../images/logo2.png";

export const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        });
      
        if(error)
            swal({
                title: "ERROR!",
                text: error.message,
                icon: "error",
                buttons: {
                    confirm: {text:'OK',className:'alert-button'}
                }
            });
    };

    return (
        <div className="content-box">
            <img alt="" src={logo} className="logo"/>
            <h3 className="title">
                <b>
                    Payment
                </b>
            </h3>
            <hr/>
            <center>
                <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
                    <CardElement />
                    <br/>
                    <button className="button">
                        <i className="fa fa-credit-card"/> Pay
                    </button>
                </form>
            </center>
            <hr/>
            <Link to="/dashboard">
                <button className="button">
                    <i className="fa fa-arrow-left"/> Back
                </button>
            </Link>
            <hr/>
            <p>
                <b>
                    © Powered by <i><u>Softana</u></i>, All right reserved.
                </b>
            </p>
        </div>
    );
};