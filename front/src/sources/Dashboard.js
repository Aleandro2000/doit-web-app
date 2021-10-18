import { Link } from "react-router-dom";

import quiz from "../images/quiz.png";
import lesson from "../images/lesson.png";
import ide from "../images/ide.png";
import mentor from "../images/mentor.png";
import settings from "../images/settings.png";
import solving from "../images/solving.png";

import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Dashboard()
{
    return(
        <div className="options">
            <Navbar type="dashboard"/>
            <br/>
            <Header type="dashboard" text="Dashboard"/>
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
                                Our Mentor
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
            <Footer/>
        </div>
    );
}