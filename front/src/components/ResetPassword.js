import "./ResetPassword.css";
import logo from "../images/logo2.png";
import {
    Link,
    Redirect
} from "react-router-dom";
import { useState } from "react";

const ResetPassword = () => {

    const [password, setPassword] = useState('');
    const [repassword, setRePassword] = useState('');

    const [passwordInput, setPasswordInput] = useState({borderColor: "#ced4da"});

    const session=localStorage.getItem("session");

    const sendRequest = async() => {
        if(password !== repassword || password.length < 6){
            setPasswordInput({borderColor: "red"});
            return;
        }
        else
            setPasswordInput({borderColor: "green"});

        document.getElementById("loading").style.display="inline-block";
        const data = {session, password}
        const req = await fetch("http://localhost:8081/resetpass", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if(req.status === 200)
            setSent(true);
        
        document.getElementById("loading").style.display="none";
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    if(!session)
        return <Redirect to="/dashboard" />;

    return ( 
        <div className="content-box">
            <img src={logo} className="logo"/>
            <h3 className="title">
                <b>
                    Register
                </b>
            </h3>
            <hr/>
            <form onSubmit={handleSubmit}>
                <input type="password" name="password" style={passwordInput} placeholder="Enter password" onChange={e => { setPassword(e.target.value); setPasswordInput({borderColor: "#ced4da"})}}/>
                <input type="password" name="repassword" style={passwordInput} placeholder="Retype password" onChange={e => { setRePassword(e.target.value); setPasswordInput({borderColor: "#ced4da"})}}/>
                <button type="submit" className="button" onClick={sendRequest}>
                    RESET
                </button>
                <br/>
                <div className="lds-ellipsis" id="loading"><div></div><div></div><div></div><div></div></div>
            </form>
            <hr/>
            <Link to="/dashboard">
                <button className="button">
                    <i className="fa fa-tachometer"/> Dashboard
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
 
export default ResetPassword;