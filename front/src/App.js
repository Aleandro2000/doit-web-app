import "milligram";
import AOS from "aos";
import "./aos.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  AOS.init({
    duration: 1000
  });
  return(
    <>
      <Router>
        <div className="navigation">
          <section className="container">
            <ul className="navigation-list float-right fadeIn">
              <li className="navigation-item"><Link className="navigation-link button-white responsive-no-button-border" to="/home">Home</Link></li>
              <li className="navigation-item"><Link className="navigation-link button-white responsive-no-button-border" to="/login">Login</Link></li>
              <li className="navigation-item"><Link className="navigation-link button-white responsive-no-button-border" to="/register">Register</Link></li>
            </ul>
          </section>
        </div>
        <Switch>
          <Route path="/home">
              <Homepage/>
          </Route>
          <Route path="/login">
              <Login/>
          </Route>
          <Route path="/register">
              <Register/>
          </Route>
        </Switch>
        <div className="footer">
          <p align="center">
            <div className="row"></div>
            <i className="fa fa-facebook social-media" style={{paddingLeft: "17.5px",paddingRight: "17.5px"}}/>
            <i className="fa fa-instagram social-media"/>
            <i className="fa fa-youtube social-media"/>
            <i className="fa fa-linkedin social-media"/>
            <hr/>
            <b>
              © Powered by <i>Softana</i>, All right reserved.
            </b>
          </p>
        </div>
      </Router>
    </>
  );
}

export default App;
