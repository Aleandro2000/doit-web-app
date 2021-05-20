import logo from "../images/logo2.png";
import { Link } from "react-router-dom";

const VerificationLink = () => {
    return(
        <center className="content-box" style={{transform: "translate(0,25%)"}}>
            <img className="logo" src={logo}/>
            <h3 className="title">
                <b>
                    An email has been sent to verify the register!
                </b>
            </h3>
            <hr/>
            <Link to="/register">
                <button className="button">
                    Back
                </button>
            </Link>
        </center>
    );
}

export default VerificationLink;