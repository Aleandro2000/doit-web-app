import Register from "./Register"
import Homepage from "../App";
import "./Login.css";
import logo from "../images/logo2.png";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

function Login()
{
    return(
        <Router>
            <Switch>
                <Route path="/home">
                    <Homepage/>
                </Route>
                <Route path="/register">
                    <Register/>
                </Route>
                <Route path="/login">
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
                        <Link to="/register">
                            <button className="button">
                                REGISTER
                            </button>
                        </Link>
                        <Link to="/home">
                            <button className="button">
                                Home
                            </button>
                        </Link>
                        <hr/>
                        <p>
                            <b>
                                © Powered by <i><u>Softana</u></i>, All right reserved.
                            </b>
                        </p>
                    </div>
                </Route>
            </Switch>
        </Router>
    );
}

export default Login;