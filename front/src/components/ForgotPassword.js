import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../images/logo2.png";

const ForgotPassword = () => {

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState('false');

    const [emailInput, setEmailInput] = useState({borderColor: "#ced4da"});
    //prevent form submision
    function handleSubmit(event) {
        event.preventDefault();
    }
    //localhost/resetpass

    const sendRequest = async() => {
        if(email === '' || email.indexOf('@') === -1){
            setEmailInput({borderColor: "red"});
            return;
        }
        const data = {email}
        const req = await fetch("http://localhost:8081/forgotpass", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if(req.status === 200){
            setSent(true);
            history.push("/");
        }
        else
            setSent("NotSent");
        
        //make request
    }

    return (
        <div className="content-box">
            <img src={logo} className="logo"/>
            <h3 className="title">
                <b>
                    Login
                </b>
            </h3>
            <hr/>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" style={{emailInput}} placeholder="Enter email" onChange={e => { setEmail(e.target.value); setEmailInput({borderColor: "#ced4da"})}}/>
                <button type="submit" className="button" onClick={sendRequest}>
                    SEND
                </button>
                { 
                    sent === "NotSent" ? (<><br/><h5 className="text-center text-danger mx-3">Couldn't Reset Reset Password</h5></>) : ( <></> )
                }
                <br/><br/>
            </form>
            <hr/>
            <Link to="/login">
                <button className="button">
                    LOGIN
                </button>
            </Link>
            <Link to="/register">
                <button className="button">
                    REGISTER
                </button>
            </Link>
            <Link to="/home">
                <button className="button">
                    Home
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