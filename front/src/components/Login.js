import "./Login.css"
import logo from "../images/logo2.png"

function Login()
{
    return(
        <div className="login">
            <img src={logo} className="logo"/>
            <h3 className="title">
                <b>
                    Login
                </b>
            </h3>
            <hr/>
            <form>
                <label for="email">
                    Email
                    <input type="email" name="email" />
                </label>
                <label for="password">
                    Password
                    <input type="password" name="password" />
                </label>
                <input type="submit" value="LOGIN" />
            </form>
            <hr/>
            <button className="button">
                REGISTER
            </button>
            <br/><br/>
            <p>
                <b>
                    © Powered by <i><u>Softana</u></i>, All right reserved.
                </b>
            </p>
        </div>
    );
}

export default Login;