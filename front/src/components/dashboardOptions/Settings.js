import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../../images/logo2.png";
import reset from "../../images/password-reset.png";
import del from "../../images/delete-account.png";

function Settings(){

    const session=localStorage.getItem("session");

    if(!session)
        return <Redirect to="/login" />;

    return(
        <div className="settings fadeIn">
            <div className="navigation">
                <div className="container">
                    <ul className="navigation-list float-right">
                        <li className="navigation-item">
                            <Link className="navigation-link button-white responsive-no-button-border" to="/dashboard"><i className="fa fa-arrow-left"/></Link>
                        </li>
                    </ul>
                </div>
            </div>
            <br/>
            <p align="center" style={{marginTop: "50px"}}>
                <img alt="" src={logo} className="logo"/>
            </p>
            <h3 align="center" className="title">
                <b>
                    Settings
                </b>
            </h3>
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
                        <a href="#">
                            <i className="fa fa-facebook social-media" style={{paddingLeft: "17.5px",paddingRight: "17.5px"}}/>
                        </a>
                        <a href="#">
                            <i className="fa fa-instagram social-media"/>
                        </a>
                        <a href="#">
                            <i className="fa fa-youtube social-media"/>
                        </a>
                        <a href="#">
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