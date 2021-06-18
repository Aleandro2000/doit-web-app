import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../images/logo2.png";
import payment from "../images/payment.png";
import lesson from "../images/lesson.png";
import ide from "../images/ide.png";
import mentor from "../images/mentor.png";
import settings from "../images/settings.png";
import solving from "../images/solving.png";

function Dashboard(){

    const session=localStorage.getItem("session");

    if(!session)
        return <Redirect to="/login" />;

    const logout = () => {
        localStorage.clear();
    }

    return(
        <div className="dashboard fadeIn">
            <div className="navigation">
                <div className="container">
                    <ul className="navigation-list float-right">
                        <li className="navigation-item">
                            <Link className="navigation-link button-white responsive-no-button-border" to="/login" onClick={logout}>Logout</Link>
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
                    Dashboard
                </b>
            </h3>
            <div className="container content">
                <div className="row">
                    <div className="content-box column" style={{padding: "20px"}}>
                        <img alt="" className="icon" src={payment}/>
                        <br/>
                        <Link to="/dashboard/payment">
                            <div className="button-black" style={{marginBottom: "15px",cursor: "pointer"}}>
                                Payment
                            </div>
                        </Link>
                    </div>
                    <div className="content-box column" style={{padding: "20px"}}>
                        <img alt="" className="icon" src={lesson}/>
                        <br/>
                        <div className="button-black" style={{marginBottom: "15px",cursor: "pointer"}}>
                            Start Learning
                        </div>
                    </div>
                    <div className="content-box column" style={{padding: "20px"}}>
                        <img alt="" className="icon" src={solving}/>
                        <br/>
                        <div className="button-black" style={{marginBottom: "15px",cursor: "pointer"}}>
                            Start Solving
                        </div>
                    </div>
                </div>
                <div className="row" style={{marginBottom: "50px"}}>
                    <div className="content-box column" style={{padding: "20px"}}>
                        <img alt="" className="icon" src={ide}/>
                        <br/>
                        <Link to="/dashboard/IDE">
                            <div className="button-black" style={{marginBottom: "15px",cursor: "pointer"}}>
                                Go to IDE
                            </div>
                        </Link>
                    </div>
                    <div className="content-box column" style={{padding: "20px"}}>
                        <img alt="" className="icon" src={mentor}/>
                        <br/>
                        <Link to="/dashboard/mentor">
                            <div className="button-black" style={{marginBottom: "15px",cursor: "pointer"}}>
                                Our AI Mentor
                            </div>
                        </Link>
                    </div>
                    <div className="content-box column" style={{padding: "20px"}}>
                        <img alt="" className="icon" src={settings}/>
                        <br/>
                        <Link to="/dashboard/settings">
                            <div className="button-black" style={{marginBottom: "15px",cursor: "pointer"}}>
                                Settings
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <br/>
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

export default Dashboard;