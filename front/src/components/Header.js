import { Link } from "react-router-dom";
import logo from "../images/logo.png";

export default function Header(props)
{
    switch(props.type)
    {
        case "home":
            return(
                <div className="header">
                    <img alt="" className="rotation" style={{marginBottom: "20px"}} src={logo}/>
                    <div className="header-content">
                        <b className="header-content-title">
                            Become the Super Software Engineer!
                        </b>
                        <hr/>
                        <p className="header-content-text">
                            Become <b>master</b> at the <b>coding interview</b> and get your <b>dream job</b>. Learn how to write <b>clean quality code</b> that passes the technical interview. Develop your <b>problem solving skills</b> using our <b>step by step</b> interactive lessons, video content and tips&#38;tricks.
                        </p>
                        <Link className="header-content-text" to="/demo">
                            <div className="button-white" style={{padding: "7.5px"}}>
                                <b>
                                    Try our DEMO
                                </b>
                            </div>
                        </Link>
                        <br/>
                    </div>
                </div>
            );
        case "dashboard":
            return(
                <div className="dashboard-header">
                    <p>
                        <img alt="" className="rotation" style={{marginBottom: "20px"}} src={logo}/>
                    </p>
                    <span className="dashboard-title">
                        {props.text}
                    </span>
                </div>
            );
        default:
            return(
                <>
                </>
            );
    }
}