import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../images/logo2.png";
import payment from "../images/payment.png";
import lesson from "../images/lesson.png";
import ide from "../images/ide.png";
import settings from "../images/settings.png";
import solving from "../images/solving.png";

function Dashboard(){

    const session=localStorage.getItem("session");

    const logout = () => {
        localStorage.clear();
    }

    if(!session)
        return <Redirect to="/login" />;

    return(
        <div className="dashboard">
            <div className="navigation fadeIn">
                <div className="container">
                    <ul className="navigation-list float-right">
                        <li className="navigation-item">
                            <Link className="navigation-link button-white responsive-no-button-border" to="/login" onClick={logout}>Logout</Link>
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
                    Dashboard
                </b>
            </h3>
            <div className="small-container">
                <div className="row" style={{marginTop: "50px"}}>
                    <div className="content-box column" style={{padding: "20px"}}>
                        <img alt="" className="icon" src={payment}/>
                        <br/>
                        <div className="button-black" style={{marginBottom: "15px",cursor: "pointer"}}>
                            Payment Status
                        </div>
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
                        <div className="button-black" style={{marginBottom: "15px",cursor: "pointer"}}>
                            Go to IDE
                        </div>
                    </div>
                    <div className="content-box column" style={{padding: "20px"}}>
                        <img alt="" className="icon" src={settings}/>
                        <br/>
                        <div className="button-black" style={{marginBottom: "15px",cursor: "pointer"}}>
                            Settings
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

export default Dashboard;