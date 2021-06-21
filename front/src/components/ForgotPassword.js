import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import { Link, Redirect } from "react-router-dom";
import logo from "../images/logo2.png";

const ForgotPassword = () => {

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState('false');

    const [emailInput, setEmailInput] = useState({borderColor: "#ced4da"});

    const session = localStorage.getItem("session");

    if(session)
        return <Redirect to="/dashboard" />;

    function handleSubmit(event) {
        event.preventDefault();
    }

    const sendRequest = async() => {
        if(email === '' || email.indexOf('@') === -1){
            setEmailInput({borderColor: "red"});
            return;
        }
        document.getElementById("loading").style.display="inline-block";
        const data = {email}
        const req = await fetch("/forgotpass", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if(req.status === 200){
            document.getElementById("loading").style.display="none";
            setSent(true);
            history.push("/");
        }
        else
        {
            document.getElementById("loading").style.display="none";
            setSent("NotSent");
        }
    }

    return (
        <div className="content-box">
            <img alt="" src={logo} className="logo"/>
            <h3 className="title">
                <b>
                    Forgot Password Screen
                </b>
            </h3>
            <hr/>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" style={emailInput} placeholder="Enter email" onChange={e => { setEmail(e.target.value); setEmailInput({borderColor: "#ced4da"})}}/>
                <button type="submit" className="button" onClick={sendRequest}>
                    <i className="fa fa-send"/> SEND
                </button>
                <br/>
                <center>
                    <div className="lds-ellipsis" id="loading"><div></div><div></div><div></div><div></div></div>
                </center>
                { 
                    sent === "NotSent" ? (<><br/><h5 className="text-center text-danger mx-3">Couldn't Reset Reset Password</h5></>) : ( <></> )
                }
                <br/><br/>
            </form>
            <hr/>
            <Link to="/login">
                <button className="button">
                    <i className="fa fa-sign-in"/> LOGIN
                </button>
            </Link>
            <Link to="/register">
                <button className="button">
                    <i className="fa fa-plus"/> REGISTER
                </button>
            </Link>
            <Link to="/home">
                <button className="button">
                    <i className="fa fa-home"/> Home
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
}
 
export default ForgotPassword;