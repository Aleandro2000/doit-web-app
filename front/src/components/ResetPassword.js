import "./ResetPassword.css";
import logo from "../images/logo2.png";
import {
    Link,
    useParams
} from "react-router-dom";
import { useState } from "react";

const ResetPassword = () => {

    const [password, setPassword] = useState('');
    const [repassword, setRePassword] = useState('');
    const [sent, setSent] = useState('false');

    const [passwordInput, setPasswordInput] = useState({borderColor: "#ced4da"});
    
    const token = useParams();
    const sendRequest = async() => {
        if(password !== repassword || password.length < 6){
            setPasswordInput({borderColor: "red"});
            return;
        }
        else
            setPasswordInput({borderColor: "green"});

        const data = {password, token: token.token}
        const req = await fetch("http://localhost:9000/resetpass", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if(req.status === 200)
            setSent(true);
        else
            setSent("Not Sent!");
    }

    function handleSubmit(event) {
        event.preventDefault();
    }
    return ( 
        <div className="register">
            <img src={logo} className="logo"/>
            <h3 className="title">
                <b>
                    Register
                </b>
            </h3>
            <hr/>
            <form onSubmit={handleSubmit}>
                <input type="password" name="password" style={{passwordInput}} placeholder="Enter password" onChange={e => { setPassword(e.target.value); setPasswordInput({borderColor: "#ced4da"})}}/>
                <input type="password" name="repassword" style={{passwordInput}} placeholder="Retype password" onChange={e => { setRePassword(e.target.value); setPasswordInput({borderColor: "#ced4da"})}}/>
                <button type="submit" className="button" onClick={sendRequest}>
                    RESET
                </button>
            </form>
            <hr/>
            <Link to="/dashboard">
                <button className="button">
                    Dashboard
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