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
import Dashboard from "./components/Dashboard";

import IDE from "./components/dashboardOptions/IDE";
import Settings from "./components/dashboardOptions/Settings";
import ResetPassword from "./components/dashboardOptions/settingsOptions/ResetPassword";
import DeleteAccount from "./components/dashboardOptions/settingsOptions/DeleteAccount";
import Subscription from "./components/dashboardOptions/Subscription";

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
          <Route exact path="/forgotpass" component={ForgotPassword}/>
          <Route exact path="/dashboard" component={Dashboard}/>
          <Route exact path="/dashboard/IDE" component={IDE}/>
          <Route exact path="/dashboard/settings" component={Settings}/>
          <Route exact path="/dashboard/settings/profile/resetpass" component={ResetPassword}/>
          <Route exact path="/dashboard/settings/profile/delete" component={DeleteAccount}/>
          <Route exact path="/dashboard/subscription" component={Subscription}/>
          <Route component={NotFound}/>
        </Switch>
      </Router>
    </>
  );
}

export default App;
