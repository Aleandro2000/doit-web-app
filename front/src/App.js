import "milligram";
import AOS from "aos";
import "./aos.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
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
        <Switch>
          <Route exact path="/">
            <Redirect to="/home"/>
          </Route>
          <Route path="/home">
            <div className="navigation">
              <div className="container">
                <ul className="navigation-list float-right fadeIn">
                  <li className="navigation-item"><Link className="navigation-link button-white responsive-no-button-border" to="/home">Home</Link></li>
                  <li className="navigation-item"><Link className="navigation-link button-white responsive-no-button-border" to="/login">Login</Link></li>
                  <li className="navigation-item"><Link className="navigation-link button-white responsive-no-button-border" to="/register">Register</Link></li>
                </ul>
              </div>
            </div>
            <Homepage/>
          </Route>
          <Route path="/login">
              <Login/>
          </Route>
          <Route path="/register">
              <Register/>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
