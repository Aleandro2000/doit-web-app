import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import swal from "sweetalert";
import { useHistory,Link } from "react-router-dom";
import { login,decodeSession,logout } from "../../utils";

import logo from "../../images/logo2.png";
import worldMap from "../../images/world-map.svg";
import contactless from "../../images/contactless.png";

export const CheckoutForm = () => {
    const history = useHistory();
    const stripe = useStripe();
    const elements = useElements();

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
            const session=decodeSession().user;
            const data={_id: session._id, payment_method: paymentMethod.id, subscriptionType: session.subscriptionType};
            await fetch("/subscription",{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(data => {
                    if(data.icon==="success"&&!data.intent)
                    {
                        login(data.result);
                        swal({
                            title: data.title,
                            text: data.message,
                            icon: data.icon,
                            buttons: {
                                confirm: {text:'OK',className:'alert-button'}
                            }
                        });
                        history.push("/dashboard");
                    }
                    else if(!data.intent)
                    {
                        swal({
                            title: data.title,
                            text: data.message,
                            icon: data.icon,
                            buttons: {
                                confirm: {text:'OK',className:'alert-button'}
                            }
                        });
                        document.getElementById("loading").style.display="none";
                    }
                    else
                    {
                        document.getElementById("loading").style.display="none";
                        stripe.confirmCardPayment(data.intent.client_secret)
                            .then(result => {
                                if(!result.error&&result.paymentIntent&&result.paymentIntent.status==="succeeded")
                                {
                                    document.getElementById("loading").style.display="block";
                                    const data={_id: session._id, subscriptionType: session.subscriptionType, payment_method: paymentMethod.id, paymentIntent: result.paymentIntent};
                                    return fetch("/3DS_subscription",{
                                        method: "POST",
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify(data)
                                    })
                                        .then(response => response.json())
                                        .then(data => {
                                            if(data.icon==="success")
                                            {
                                                login(data.result);
                                                swal({
                                                    title: data.title,
                                                    text: data.message,
                                                    icon: data.icon,
                                                    buttons: {
                                                        confirm: {text:'OK',className:'alert-button'}
                                                    }
                                                });
                                                history.push("/dashboard");
                                            }
                                            else
                                            {
                                                swal({
                                                    title: data.title,
                                                    text: data.message,
                                                    icon: data.icon,
                                                    buttons: {
                                                        confirm: {text:'OK',className:'alert-button'}
                                                    }
                                                });
                                                document.getElementById("loading").style.display="none";
                                            }
                                        })
                                        .catch(err => document.getElementById("loading").style.display="none");
                                }
                            });
                        }
                })
                .catch(err => document.getElementById("loading").style.display="none");
        }
    }

    return (
        <center>
            <div className="content-box">
                <img alt="" src={logo} className="logo"/>
                <h3 className="title">
                    <b>
                        Subscription
                    </b>
                </h3>
                <hr/>
                <form onSubmit={handleSubmit}>
                    <div className="credit-card">
                        <i style={{fontSize: "50px"}} class="fa fa-cc-stripe"/>
                        <img alt="" style={{float: "right"}} src={contactless} width="50px" height="50px"/>
                        <div className="chip">
                            <div className="chip-line"/>
                            <div className="chip-line"/>
                            <div className="chip-line"/>
                            <div className="chip-line"/>
                            <div className="chip-main"/>
                        </div>
                        <div className="stripe-input">
                            <CardElement/>
                        </div>
                        <br/>
                        <img alt="" style={{float: "right"}} src={worldMap} width="75px" height="35px"/>
                        <br/>
                    </div>
                    <br/>
                    <button className="button">
                        <i className="fa fa-credit-card"/>|Subscribe
                    </button>
                    <br/>
                    <center>
                        <div className="lds-ellipsis" id="loading"><div></div><div></div><div></div><div></div></div>
                    </center>
                </form>
                <hr/>
                <Link to="/login">
                    <button className="button" onClick={logout}>
                        <i className="fa fa-times"/> Cancel
                    </button>
                </Link>
                <hr/>
                <p>
                    <b>
                        © Powered by <i><u>Softana</u></i>, All right reserved.
                    </b>
                </p>
            </div>
        </center>
    );
};