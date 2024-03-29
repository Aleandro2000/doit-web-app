import logo from "../images/logo2.png";
import { Link,Redirect } from "react-router-dom";

const VerificationLink = () => {
    const registered=localStorage.getItem("registered");

    if(!registered||registered==="NotSuccesful")
        return <Redirect to="/register" />;

    return(
        <center>
            <div className="content-box" style={{transform: "translate(0,25%)"}}>
                <img alt="" className="logo" src={logo}/>
                <h3 className="title">
                    <b>
                        An email has been sent to verify the register!
                    </b>
                </h3>
                <hr/>
                <Link to="/login">
                    <button className="button">
                        <i className="fa fa-sign-in"/> Go to LOGIN
                    </button>
                </Link>
            </div>
        </center>
    );
}

export default VerificationLink;