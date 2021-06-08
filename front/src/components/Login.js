import logo from "../images/logo2.png";
import {
    Link,
    Redirect,
    useHistory
} from "react-router-dom";
import { useState } from "react";
import { GoogleLogin } from 'react-google-login';
import swal from "sweetalert";

function Login()
{
    const history=useHistory();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [emailInput, setEmailInput]=useState({borderColor: "#ced4da"});
    const [passwordInput, setPasswordInput]=useState({borderColor: "#ced4da"});
    const [res,setRes]=useState("");

    const session=localStorage.getItem("session");

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
        const req=await fetch("http://localhost:8081/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if(req.status===200)
        {
            localStorage.setItem("session",email);
            console.log("Logged in!");
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
    }

    const googleAuth = async () => {
        await fetch("http://localhost:8081/auth/google")
            .then(response => response.json())
            .then(data => {
                localStorage.setItem("session",data);
                history.push("/dashboard");
            });
    }

    const googleAuthError = async () => {
        swal({
            title: "OOPS!",
            text: "This seems to be an error with Google Auth! Tyr again later!",
            icon: "error",
            buttons: {
                confirm: {text:'OK',className:'alert-button'}
            }
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    
    if(session)
        return <Redirect to="/dashboard" />;

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
                <input type="email" name="email" style={emailInput} placeholder="Enter email" onChange={e => { setEmail(e.target.value); setEmailInput({borderColor: "#ced4da"})}}/>
                <input type="password" name="password" style={passwordInput} placeholder="Enter password" onChange={e => { setPassword(e.target.value); setPasswordInput({borderColor: "#ced4da"})}}/>
                <button type="submit" className="button" onClick={sendRequest}>
                    <i className="fa fa-sign-in"/> LOGIN
                </button>
                <center>
                    <div className="lds-ellipsis" id="loading"><div></div><div></div><div></div><div></div></div>
                </center>
                {res}<br/>
                <Link to={"/forgotpass"}>Forgot password?</Link>
            </form>
            <GoogleLogin
                clientId="926330184095-c8ej0ig4v1midq5cbh8ot6tbkbfi7p3t.apps.googleusercontent.com"
                render={renderProps => (
                    <button className="button" onClick={renderProps.onClick} disabled={renderProps.disabled}><i className="fa fa-google"/> Login with Google</button>
                )}
                onSuccess={googleAuth}
                onFailure={googleAuthError}
                cookiePolicy={'single_host_origin'}
                icon={false}
            />
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