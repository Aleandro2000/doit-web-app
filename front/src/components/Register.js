import Login from "./Login";
import Homepage from "../App";
import "./Register.css";
import logo from "../images/logo2.png";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

function Register()
{
    return(
        <Router>
            <Switch>
                <Route path="/home">
                    <Homepage/>
                </Route>
                <Route path="/login">
                    <Login/>
                </Route>
                <Route path="/register">
                    <div className="register">
                        <img src={logo} className="logo"/>
                        <h3 className="title">
                            <b>
                                Register
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
                            <input type="submit" value="REGISTER" />
                        </form>
                        <hr/>
                        <Link to="/login">
                            <button className="button">
                                LOGIN
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

export default Register;