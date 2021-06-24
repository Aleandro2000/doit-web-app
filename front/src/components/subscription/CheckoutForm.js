import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import Session from "react-session-api";

import logo from "../../images/logo2.png";

export const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const session=JSON.parse(Session.get("session"));

    const handleSubmit = async (event) => {
        event.preventDefault();
        document.getElementById("loading").style.display="block";
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
        else
        {
            const data={_id: session["_id"], payment_method: paymentMethod, subscriptionType: session["subscriptionType"]};
            await fetch("/subscription",{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(result => {
                    swal({
                        title: result.title,
                        text: result.message,
                        icon: result.icon,
                        buttons: {
                            confirm: {text:'OK',className:'alert-button'}
                        }
                    });
                });
        }
        document.getElementById("loading").style.display="none";
    };

    return (
        <div className="content-box">
            <img alt="" src={logo} className="logo"/>
            <h3 className="title">
                <b>
                    Subscription
                </b>
            </h3>
            <hr/>
            <center>
                <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
                    <CardElement />
                    <br/>
                    <button className="button">
                        <i className="fa fa-credit-card"/>|Subscribe
                    </button>
                    <div className="lds-ellipsis" id="loading"><div></div><div></div><div></div><div></div></div>
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