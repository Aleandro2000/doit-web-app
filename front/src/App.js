import "milligram";
import AOS from "aos";
import "./aos.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import './App.css';
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Register from "./components/Register";
import NotFound from "./components/NotFound";
import ForgotPassword from "./components/ForgotPassword";
import VerificationLink from "./components/VerificationLink";

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
          <Route exact path="/home" component={Homepage}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/verificationlink" component={VerificationLink}/>
          <Route exact path="/resend" component={ForgotPassword}/>
          <Route component={NotFound}/>
        </Switch>
      </Router>
    </>
  );
}

export default App;
