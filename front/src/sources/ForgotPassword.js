import React, {useState} from "react";
import { Link,useHistory } from "react-router-dom";
import logo from "../images/logo2.png";

const ForgotPassword = () => {

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [res,setRes] = useState("");

    const [emailInput, setEmailInput] = useState({borderColor: "#ced4da"});

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
        await fetch("/forgotpass", {
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
                    localStorage.setItem("forgotPassEmail",email);
                    document.getElementById("loading").style.display="none";
                    history.push("/forgotpass/verificationkey");
                }
                else if(data.status===500)
                {
                    document.getElementById("loading").style.display="none";
                    setRes(data.msg);
                }
                else
                {
                    document.getElementById("loading").style.display="none";
                    setRes("Couldn't not send the email!");
                }
            })
            .catch(err => {
                setRes(err.message);
                document.getElementById("loading").style.display="none";
            });
    }

    return (
        <div className="content-box">
            <img alt="" src={logo} className="logo"/>
            <h3 className="title">
                <b>
                    Forgot Password
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
                <br/>
                {res}
                <br/>
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