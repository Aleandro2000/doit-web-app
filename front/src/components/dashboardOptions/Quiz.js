import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import logicthinking from "../../images/logic-thinking.png";
import interview from "../../images/interview.png";

function Quiz(){

    const session=JSON.parse(localStorage.getItem("session"));

    if(!session)
        return <Redirect to="/login" />;
    else if(!session["customerId"]||!session["subscriptionId"])
        return <Redirect to="/subscription" />;

    return(
        <div className="options">
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
            <div className="dashboard-header">
                <p>
                    <img alt="" className="rotation" style={{marginBottom: "20px"}} src={logo}/>
                </p>
                <span className="dashboard-title">
                    Quiz
                </span>
            </div>
            <div className="container content">
                <div className="row">
                    <div className="content-box column" style={{padding: "20px"}}>
                        <img alt="" className="icon" src={logicthinking}/>
                        <br/>
                        <Link to="/dashboard/quiz/logic-thinking">
                            <div className="button-black" style={{marginBottom: "15px",cursor: "pointer"}}>
                                Logical Reasoning Quiz
                            </div>
                        </Link>
                    </div>
                    <div className="content-box column" style={{padding: "20px"}}>
                        <img alt="" className="icon" src={interview}/>
                        <br/>
                        <Link to="/dashboard/quiz/interview">
                            <div className="button-black" style={{marginBottom: "15px",cursor: "pointer"}}>
                                Interview Questions Quiz
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

export default Quiz;