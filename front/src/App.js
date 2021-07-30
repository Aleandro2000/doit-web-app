import "milligram";
import AOS from "aos";
import "./aos.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import GatewayRoute from "./routes/GatewayRoute";

import './App.css';
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Register from "./components/Register";
import NotFound from "./components/NotFound";
import ForgotPassword from "./components/ForgotPassword";
import VerificationKey from "./components/forgotpassComponent/VerificationKey";
import VerificationLink from "./components/VerificationLink";
import Dashboard from "./components/Dashboard";
import ResendLink from "./components/ResendLink";

import IDE from "./components/dashboardOptions/IDE";
import Settings from "./components/dashboardOptions/Settings";
import ResetPassword from "./components/dashboardOptions/settingsOptions/ResetPassword";
import DeleteAccount from "./components/dashboardOptions/settingsOptions/DeleteAccount";
import Subscription from "./components/Subscription";
import Quiz from "./components/dashboardOptions/Quiz";

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
          <PublicRoute restricted={false} exact path="/home" component={Homepage}/>
          <PublicRoute restricted={true} exact path="/login" component={Login}/>
          <PublicRoute restricted={true} exact path="/register" component={Register}/>
          <PublicRoute restricted={true} exact path="/verificationlink" component={VerificationLink}/>
          <PublicRoute restricted={true} exact path="/resendlink" component={ResendLink}/>
          <PublicRoute restricted={true} exact path="/forgotpass" component={ForgotPassword}/>
          <PublicRoute restricted={true} exact path="/forgotpass/verificationkey" component={VerificationKey}/>
          <PrivateRoute exact path="/dashboard" component={Dashboard}/>
          <PrivateRoute exact path="/dashboard/quiz" component={Quiz}/>
          <PrivateRoute exact path="/dashboard/IDE" component={IDE}/>
          <PrivateRoute exact path="/dashboard/settings" component={Settings}/>
          <PrivateRoute exact path="/dashboard/settings/profile/resetpass" component={ResetPassword}/>
          <PrivateRoute exact path="/dashboard/settings/profile/delete" component={DeleteAccount}/>
          <GatewayRoute exact path="/subscription" component={Subscription}/>
          <PublicRoute restricted={false} component={NotFound}/>
        </Switch>
      </Router>
    </>
  );
}

export default App;
