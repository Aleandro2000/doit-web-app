import "./Login.css"
import logo from "../images/logo2.png"

function Login()
{
    return(
        <div className="login">
            <img src={logo} className="logo"/>
            <h1 className="title">
                <b>
                    Login
                </b>
            </h1>
            <hr/>
        </div>
    );
}

export default Login;