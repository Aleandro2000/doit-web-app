import logo from "../../../images/logo2.png";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { decodeSession } from "../../../utils";

const ResetPassword = () => {

    const [password, setPassword] = useState('');
    const [repassword, setRePassword] = useState('');
    const [res, setRes] = useState("");
    const [passwordInput, setPasswordInput] = useState({borderColor: "#ced4da"});

    const history=useHistory();

    const sendRequest = async() => {
        const passwordTest=new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})");
        
        if(password!==repassword||!passwordTest.test(password)){
            setPasswordInput({borderColor: "red"});
            setRes("This password is unsafe! Try another password!");
            return;
        }

        document.getElementById("loading").style.display="inline-block";
        const data = {_id: decodeSession().user._id, password}
        const req = await fetch("/resetpass", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if(req.status === 200)
            setRes("Action done succesfully!");
        
        document.getElementById("loading").style.display="none";
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <center>
            <div className="content-box">
                <img alt="" src={logo} className="logo"/>
                <h3 className="title">
                    <b>
                        Reset Password
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
                    <br/>
                    {res}
                </form>
                <hr/>
                <button className="button" onClick={history.goBack}>
                    <i className="fa fa-arrow-left"/> Back
                </button>
                <hr/>
                <p>
                    <b>
                        © Powered by <i><u>Softana</u></i>, All right reserved.
                    </b>
                </p>
            </div>
        </center>
    );
}
 
export default ResetPassword;