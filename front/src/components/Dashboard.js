import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import logo from "../images/logo2.png";

function Dashboard(){

    const session=localStorage.getItem("session");
    const history = useHistory();

    const logout = () => {
        localStorage.setItem("session",null);
        if(localStorage.getItem("registred"))
            localStorage.setItem("registred",null);
        history.push("/login");
    }

    if(!session)
        return <Redirect to="/login" />;

    return(
        <div className="dashboard container">
            <p align="right">
                <button className="button" onClick={logout}>
                    <i className="fa fa-sign-out"/> Logout
                </button>
            </p>
            <p align="center" style={{marginTop: "50px"}}>
                <img alt="" src={logo} className="logo"/>
            </p>
        </div>
    );
}

export default Dashboard;