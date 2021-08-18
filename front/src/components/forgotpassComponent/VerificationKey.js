import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../../images/logo2.png";

const VerificationKey = () => {

    const history = useHistory();
    const [key, setKey] = useState('');
    const [message, setMessage] = useState("");

    const [keyInput, setKeyInput] = useState({borderColor: "#ced4da"});

    const forgotPassEmail = localStorage.getItem("forgotPassEmail");

    function handleSubmit(event) {
        event.preventDefault();
    }

    const sendRequest = async() => {
        if(!key){
            setKeyInput({borderColor: "red"});
            return;
        }
        document.getElementById("loading").style.display="inline-block";
        const data = {email: forgotPassEmail, key: key.replaceAll(" ","")}
        await fetch("/verificationkey", {
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
                    localStorage.removeItem("forgotPassEmail");
                    data.result.password="";
                    localStorage.setItem("session",JSON.stringify(data.result));
                    document.getElementById("loading").style.display="none";
                    history.push("/dashboard");
                }
                else
                {
                    document.getElementById("loading").style.display="none";
                    setMessage("Invalid verification key!");
                    setKeyInput({borderColor: "#ced4da"});
                }
            });
    }

    return (
        <div className="content-box">
            <img alt="" src={logo} className="logo"/>
            <h3 className="title">
                <b>
                    Verification Key
                </b>
            </h3>
            <hr/>
            <form onSubmit={handleSubmit}>
                <input type="text" name="key" style={keyInput} placeholder="Enter verification key" onChange={e => { setKey(e.target.value); setKeyInput({borderColor: "#ced4da"})}} required/>
                <button type="submit" className="button" onClick={sendRequest}>
                    <i className="fa fa-send"/> SEND
                </button>
                <br/>
                <center>
                    <div className="lds-ellipsis" id="loading"><div></div><div></div><div></div><div></div></div>
                </center>
                <br/>
                {message}
            </form>
            <hr/>
            <Link to="/forgotpass">
                <button className="button">
                    <i className="fa fa-arrow-left"/> Back
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
 
export default VerificationKey;