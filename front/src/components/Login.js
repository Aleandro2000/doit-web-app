import logo from "../images/logo2.png";
import {
    Link,
    useHistory
} from "react-router-dom";
import { useState } from "react";
import { login } from "../utils";

function Login()
{
    const history=useHistory();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [emailInput, setEmailInput]=useState({borderColor: "#ced4da"});
    const [passwordInput, setPasswordInput]=useState({borderColor: "#ced4da"});
    const [res,setRes]=useState("");

    const sendRequest=async () => {
        let ok=true;
        if(email===''||email.indexOf('@')===-1)
        {
            setEmailInput({borderColor: "red"});
            ok=false;
        }
        else
            setEmailInput({borderColor: "green"});
        if(password.length<8)
        {
            setPasswordInput({borderColor: "red"});
            ok=false;
        }
        else
            setPasswordInput({borderColor: "green"});
        if(!ok)
            return;
        document.getElementById("loading").style.display="inline-block";
        const data={email, password};
        await fetch("/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                if(data.status===200)
                {
                    localStorage.removeItem("registered");
                    login(data.result);
                    document.getElementById("loading").style.display="none";
                    history.push("/dashboard");
                }
                else
                {
                    document.getElementById("loading").style.display="none";
                    setRes("Please verify input data. Make sure you have a valid account!");
                    setEmailInput({borderColor: "#ced4da"});
                    setPasswordInput({borderColor: "#ced4da"});
                }
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return(
        <div className="content-box">
            <img alt="" src={logo} className="logo"/>
            <h3 className="title">
                <b>
                    Login
                </b>
            </h3>
            <hr/>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" style={emailInput} placeholder="Enter email" onChange={e => { setEmail(e.target.value); setEmailInput({borderColor: "#ced4da"})}} required/>
                <input type="password" name="password" style={passwordInput} placeholder="Enter password" onChange={e => { setPassword(e.target.value); setPasswordInput({borderColor: "#ced4da"})}} required/>
                <button type="submit" className="button" onClick={sendRequest}>
                    <i className="fa fa-sign-in"/> LOGIN
                </button>
                <center>
                    <div className="lds-ellipsis" id="loading"><div></div><div></div><div></div><div></div></div>
                </center>
                {res}
                <br/>
                <Link to={"/forgotpass"}>Forgot password?</Link>
                <br/>
                <Link to={"/resendlink"}>Problem with verification link?</Link>
            </form>
            <hr/>
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

export default Login;