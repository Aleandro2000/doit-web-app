import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../../images/logo2.png";
import reset from "../../images/password-reset.png";
import del from "../../images/delete-account.png";

function Settings(){

    const session=localStorage.getItem("session");

    const logout = () => {
        localStorage.clear();
    }

    if(!session)
        return <Redirect to="/login" />;

    return(
        <div className="settings">
            <div className="navigation fadeIn">
                <div className="container">
                    <ul className="navigation-list float-right">
                        <li className="navigation-item">
                            <Link className="navigation-link button-white responsive-no-button-border" to="/dashboard"><i className="fa fa-arrow-left"/></Link>
                        </li>
                    </ul>
                </div>
            </div>
            <br/>
            <p className="fadeIn" align="center" style={{marginTop: "50px"}}>
                <img alt="" src={logo} className="logo"/>
            </p>
            <h3 align="center" className="title fadeIn">
                <b>
                    Settings
                </b>
            </h3>
            <div className="small-container">
                <div className="row" style={{marginTop: "50px"}}>
                    <div className="content-box column" style={{padding: "20px"}}>
                        <img alt="" className="icon" src={reset}/>
                        <br/>
                        <Link to="/dashboard/resetpass">
                            <div className="button-black" style={{marginBottom: "15px",cursor: "pointer"}}>
                                Reset Password
                            </div>
                        </Link>
                    </div>
                    <div className="content-box column" style={{padding: "20px"}}>
                        <img alt="" className="icon" src={del}/>
                        <br/>
                        <div className="button-black" style={{marginBottom: "15px",cursor: "pointer"}}>
                            Delete Account
                        </div>
                    </div>
                </div>
            </div>
            <br/>
            <p className="container fadeIn" align="center">
                <b>
                    © Powered by <i><u>Softana</u></i>, All right reserved.
                </b>
            </p>
        </div>
    );
}

export default Settings;