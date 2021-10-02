import { Link,useHistory } from "react-router-dom";
import { isLogin,navmenu,logout } from "../utils";

export default function Navbar(props)
{
    const history=useHistory();

    switch(props.type)
    {
        case "home":
            return(
                <>
                    {
                        isLogin() ? (
                            <div className="navigation">
                                <div className="container">
                                    <ul className="navigation-list float-right">
                                        <li className="navigation-item">
                                            <Link className="navigation-link button-white responsive-no-button-border" to="/dashboard"><i class="fa fa-tachometer"/> Dashboard</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            <div className="navigation">
                                <div className="container">
                                    <ul className="navigation-list float-right">
                                        <li className="navigation-item">
                                            <div className="dropdown">
                                                <div className="button-white responsive-no-button-border dropbtn" onClick={() => navmenu("dropdown-content") }>Authentificate</div>
                                                <div className="dropdown-content" id="dropdown-content">
                                                    <Link className="navigation-link button-white-dropdown" to="/login"><i className="fa fa-sign-in"/> Login</Link>
                                                    <br/>
                                                    <Link className="navigation-link button-white-dropdown" to="/register"><i className="fa fa-plus"/> Register</Link>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )
                    }
                </>
            );
        case "dashboard":
            return(
                <div className="navigation">
                    <div className="container">
                        <ul className="navigation-list float-right">
                            <li className="navigation-item">
                                <div className="dropdown">
                                    <div className="button-white responsive-no-button-border dropbtn" onClick={() => navmenu("dropdown-content") }><i className="fa fa-user"/> Options</div>
                                    <div className="dropdown-content" id="dropdown-content">
                                        <Link className="navigation-link button-white-dropdown" to="/home"><i className="fa fa-home"/> Home</Link>
                                        <br/>
                                        <Link className="navigation-link button-white-dropdown" to="/login" onClick={logout}><i className="fa fa-sign-out"/> Logout</Link>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            );
        case "back":
            return(
                <div className="navigation">
                    <div className="container">
                        <ul className="navigation-list float-right">
                            <li className="navigation-item">
                                <div className="navigation-link button-white responsive-no-button-border" onClick={history.goBack}><i className="fa fa-arrow-left"/></div>
                            </li>
                        </ul>
                    </div>
                </div>
            )
        default:
            return(
                <>
                </>
            );
    }
}