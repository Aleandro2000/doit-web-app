import { Link } from "react-router-dom";
import reset from "../../images/password-reset.png";
import del from "../../images/delete-account.png";

import Navbar from "../../components/Navbar";
import Header from "../../components/Header";

function Settings(){

    return(
        <div className="options">
            <Navbar type="back"/>
            <Header type="dashboard" text="Settings"/>
            <div className="container content">
                <div className="row">
                    <div className="content-box column" style={{padding: "20px"}}>
                        <img alt="" className="icon" src={reset}/>
                        <br/>
                        <Link to="/dashboard/settings/profile/resetpass">
                            <div className="button-black" style={{marginBottom: "15px",cursor: "pointer"}}>
                                Reset Password
                            </div>
                        </Link>
                    </div>
                    <div className="content-box column" style={{padding: "20px"}}>
                        <img alt="" className="icon" src={del}/>
                        <br/>
                        <Link to="/dashboard/settings/profile/delete">
                            <div className="button-black" style={{marginBottom: "15px",cursor: "pointer"}}>
                                Delete Account
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <center>
                <div className="footer">
                    <p>
                        <b>
                            © Powered by <i><u>Softana</u></i>, All right reserved.
                        </b>
                    </p>
                    <p>
                        <a href={process.env.REACT_APP_DOIT_FACEBOOK}>
                            <i className="fa fa-facebook social-media" style={{paddingLeft: "17.5px",paddingRight: "17.5px"}}/>
                        </a>
                        <a href={process.env.REACT_APP_DOIT_INSTAGRAM}>
                            <i className="fa fa-instagram social-media"/>
                        </a>
                        <a href={process.env.REACT_APP_DOIT_YOUTUBE}>
                            <i className="fa fa-youtube social-media"/>
                        </a>
                        <a href={process.env.REACT_APP_DOIT_LINKEDIN}>
                            <i className="fa fa-linkedin social-media"/>
                        </a>
                    </p>
                    <br/>
                </div>
            </center>
        </div>
    );
}

export default Settings;