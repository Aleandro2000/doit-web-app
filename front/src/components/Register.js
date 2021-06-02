import logo from "../images/logo2.png";
import {
    Link,
    Redirect,
    useHistory
} from "react-router-dom";
import { useState } from "react";

function Register()
{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [repassword,setRePassword]=useState("");
    const [emailInput, setEmailInput]=useState({borderColor: "#ced4da"});
    const [passwordInput, setPasswordInput]=useState({borderColor: "#ced4da"});
    const [registered, setRegistered] = useState(false);
    const [res,setRes]=useState("");

    const history=useHistory();
    const session=localStorage.getItem("session");

    const submitForm = async() => {
        let ok = true;
        
        if(email===''|| email.indexOf('@')===-1){
            setEmailInput({borderColor: "red"});
            ok=false;
        }
        else
            setEmailInput({borderColor: "green"});

        const passwordTest=new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})");
        
        if(password!==repassword||!passwordTest.test(password)){
            setPasswordInput({borderColor: "red"});
            setRes("This password is unsafe! Try another password!");
            ok=false;
        }
        else
            setPasswordInput({borderColor: "green"});
        
        if(ok===false)
            return;

        document.getElementById("loading").style.display="inline-block";
        
        const data = {
            email: email, 
            password: password
        }

        const req=await fetch("http://localhost:8081/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if(req.status===200)
        {
            localStorage.setItem("registred",registered);
            setRegistered("Succesful");
            console.log("Registered!");
            document.getElementById("loading").style.display="none";
            history.push("/verificationlink");
        }
        else
        {
            document.getElementById("loading").style.display="none";
            console.error("Couldn't register!");
            setRegistered("NotSuccesful");
        }
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
                    Register
                </b>
            </h3>
            <hr/>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" style={emailInput} placeholder="Enter email" onChange={e => { setEmail(e.target.value); setEmailInput({borderColor: "#ced4da"})}}/>
                <input type="password" name="password" style={passwordInput} placeholder="Enter password" onChange={e => { setPassword(e.target.value); setPasswordInput({borderColor: "#ced4da"})}}/>
                <input type="password" name="repassword" style={passwordInput} placeholder="Retype password" onChange={e => { setRePassword(e.target.value); setPasswordInput({borderColor: "#ced4da"})}}/>
                <button type="submit" className="button" onClick={submitForm}>
                    <i className="fa fa-plus"/> REGISTER
                </button>
                <br/>
                {res}
                <div className="lds-ellipsis" id="loading"><div></div><div></div><div></div><div></div></div>
                {
                    registered === "NotSuccesful"  ? (<><br/><h5 className="text-center text-danger">Could not register!</h5></>) : ( registered === "Succesful"  ? (<><br/><h5 className="text-center text-success">Registered!</h5></>) : (<></>) )
                }
            </form>
            <hr/>
            <Link to="/login">
                <button className="button">
                    <i className="fa fa-sign-in"/> LOGIN
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

export default Register;