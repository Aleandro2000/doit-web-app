import logo from "../images/logo2.png";
import { Link,useHistory } from "react-router-dom";
import { useState } from "react";
import Select from "react-select";

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

    const options = [
        { value: 'monthly', label: "$ "+process.env.REACT_APP_SUBSCRIPTION_MONTHLY_PRICE+" USD / month" },
        { value: 'yearly', label: "$ "+process.env.REACT_APP_SUBSCRIPTION_YEARLY_PRICE+" USD / year" }
    ];

    const [selectedOption, setSelectedOption] = useState(options[0]);

    const handleChange = (option) => {
        setSelectedOption(option);
    }

    const submitForm = async() => {
        let ok = document.getElementById("agree").checked;
        
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
        
        if(!ok)
            return;

        document.getElementById("loading").style.display="inline-block";

        const data = {
            email: email, 
            password: password,
            subscriptionType: selectedOption.value
        }

        await fetch("/register", {
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
                    localStorage.setItem("registered",registered);
                    setRegistered("Succesful");
                    document.getElementById("loading").style.display="none";
                    history.push("/verificationlink");
                }
                else if(data.status===500)
                {
                    document.getElementById("loading").style.display="none";
                    setRes(data.msg);
                }
                else
                {
                    document.getElementById("loading").style.display="none";
                    setRegistered("NotSuccesful");
                    setRes(data.msg);
                }
            })
            .catch(err => {
                setRes(err.message);
                document.getElementById("loading").style.display="none";
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return(
        <center>
            <div className="content-box">
                <img alt="" src={logo} className="logo"/>
                <h3 className="title">
                    <b>
                        Register
                    </b>
                </h3>
                <hr/>
                <form onSubmit={handleSubmit}>
                    <input type="email" name="email" style={emailInput} placeholder="Enter email" onChange={e => { setEmail(e.target.value); setEmailInput({borderColor: "#ced4da"})}} required/>
                    <input type="password" name="password" style={passwordInput} placeholder="Enter password" onChange={e => { setPassword(e.target.value); setPasswordInput({borderColor: "#ced4da"})}} required/>
                    <input type="password" name="repassword" style={passwordInput} placeholder="Retype password" onChange={e => { setRePassword(e.target.value); setPasswordInput({borderColor: "#ced4da"})}} required/>
                    <Select isSearchable={false} options={options} value={selectedOption} onChange={handleChange}/>
                    <br/>
                    <p align="left">
                        <input type="checkbox" id="agree" required/><b> * By checking the options, I have read the information on the protection of personal data, I agree with the entire content and I have personally filled in the data from the account creation pages.</b>
                    </p>
                    <br/>
                    <button type="submit" className="button" onClick={submitForm}>
                        <i className="fa fa-plus"/> REGISTER
                    </button>
                    <br/><br/>
                    {res}
                    <center>
                        <div className="lds-ellipsis" id="loading"><div></div><div></div><div></div><div></div></div>
                    </center>
                    {
                        registered === "NotSuccesful"  ? (<><br/><h5 className="text-center text-danger">Could not register! Maybe this user already exists!</h5></>) : ( registered === "Succesful"  ? (<><br/><h5 className="text-center text-success">Registered!</h5></>) : (<></>) )
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
        </center>
    );
}

export default Register;