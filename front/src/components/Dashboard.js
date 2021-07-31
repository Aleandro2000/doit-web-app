import { Link } from "react-router-dom";
import { logout } from "../utils";

import logo from "../images/logo.png";
import quiz from "../images/quiz.png";
import lesson from "../images/lesson.png";
import ide from "../images/ide.png";
import mentor from "../images/mentor.png";
import settings from "../images/settings.png";
import solving from "../images/solving.png";

function Dashboard(){
    
    return(
        <div className="options">
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
            <div className="dashboard-header">
                <p>
                    <img alt="" className="rotation" style={{marginBottom: "20px"}} src={logo}/>
                </p>
                <span className="dashboard-title">
                    Dashboard
                </span>
            </div>
            <div className="container content">
                <div className="row">
                    <div className="content-box column" style={{padding: "20px"}}>
                        <img alt="" className="icon" src={lesson}/>
                        <br/>
                        <Link to="/dashboard/learning">
                            <div className="button-black" style={{marginBottom: "15px",cursor: "pointer"}}>
                                Start Learning
                            </div>
                        </Link>
                    </div>
                    <div className="content-box column" style={{padding: "20px"}}>
                        <img alt="" className="icon" src={solving}/>
                        <br/>
                        <Link to="/dashboard/solving">
                            <div className="button-black" style={{marginBottom: "15px",cursor: "pointer"}}>
                                Start Solving
                            </div>
                        </Link>
                    </div>
                    <div className="content-box column" style={{padding: "20px"}}>
                        <img alt="" className="icon" src={quiz}/>
                        <br/>
                        <Link to="/dashboard/quiz">
                            <div className="button-black" style={{marginBottom: "15px",cursor: "pointer"}}>
                                Select and Start a Quiz
                            </div>
                        </Link>
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

export default Dashboard;