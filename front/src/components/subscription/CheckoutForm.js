import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";

import logo from "../../images/logo2.png";

export const CheckoutForm = () => {
    const history = useHistory();
    const stripe = useStripe();
    const elements = useElements();

    const session=JSON.parse(localStorage.getItem("session"));

    const handleSubmit = async (event) => {
        event.preventDefault();
        document.getElementById("loading").style.display="block";
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        });
      
        if(error)
        {
            swal({
                title: "ERROR!",
                text: error.message,
                icon: "error",
                buttons: {
                    confirm: {text:'OK',className:'alert-button'}
                }
            });
            document.getElementById("loading").style.display="none";
        }
        else
        {
            const data={_id: session["_id"], payment_method: paymentMethod.id, subscriptionType: session["subscriptionType"]};
            await fetch("/subscription",{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(data => {
                    swal({
                        title: data.title,
                        text: data.message,
                        icon: data.icon,
                        buttons: {
                            confirm: {text:'OK',className:'alert-button'}
                        }
                    });
                    if(data.icon==="success")
                    {
                        data.result.password=data.result.verificationKey="";
                        localStorage.setItem("session",JSON.stringify(data.result));
                        history.push("/dashboard");
                    }
                });
        }
    };

    const handleCancellation = async () => {
        document.getElementById("loading").style.display="inline-block";
        const data={_id: session["_id"]};
        const req=await fetch("/delete", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if(req.status===200)
        {
            localStorage.clear();
            document.getElementById("loading").style.display="none";
            history.push("/register");
        }
        else
            document.getElementById("loading").style.display="none";
    }

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
                    <br/>
                    <div className="lds-ellipsis" id="loading"><div></div><div></div><div></div><div></div></div>
                </form>
            </center>
            <hr/>
            <button className="button" onClick={handleCancellation}>
                <i className="fa fa-times"/> Cancel
            </button>
            <hr/>
            <p>
                <b>
                    © Powered by <i><u>Softana</u></i>, All right reserved.
                </b>
            </p>
        </div>
    );
};