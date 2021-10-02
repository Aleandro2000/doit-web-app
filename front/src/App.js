import "milligram";
import AOS from "aos";
import "./aos.css";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import GatewayRoute from "./routes/GatewayRoute";

import './App.css';
import Homepage from "./sources/Homepage";
import Login from "./sources/Login";
import Register from "./sources/Register";
import NotFound from "./sources/NotFound";
import ForgotPassword from "./sources/ForgotPassword";
import VerificationKey from "./sources/forgotpassComponent/VerificationKey";
import VerificationLink from "./sources/VerificationLink";
import Dashboard from "./sources/Dashboard";
import ResendLink from "./sources/ResendLink";

import IDE from "./sources/dashboardOptions/IDE";
import Settings from "./sources/dashboardOptions/Settings";
import ResetPassword from "./sources/dashboardOptions/settingsOptions/ResetPassword";
import DeleteAccount from "./sources/dashboardOptions/settingsOptions/DeleteAccount";
import Subscription from "./sources/Subscription";
import Quiz from "./sources/dashboardOptions/Quiz";
import Mentor from "./sources/dashboardOptions/Mentor";

import LogicalQuiz from "./sources/quizType/LogicalQuiz";
import TechnicalQuiz from "./sources/quizType/TechnicalQuiz";
import InterviewQuiz from "./sources/quizType/InterviewQuiz";

function App() {
  AOS.init({
    duration: 1000
  });
  return(
    <BrowserRouter>
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
        <PrivateRoute exact path="/dashboard/quiz/logical" component={LogicalQuiz}/>
        <PrivateRoute exact path="/dashboard/quiz/technical" component={TechnicalQuiz}/>
        <PrivateRoute exact path="/dashboard/quiz/interview" component={InterviewQuiz}/>
        <PrivateRoute exact path="/dashboard/IDE" component={IDE}/>
        <PrivateRoute exact path="/dashboard/settings" component={Settings}/>
        <PrivateRoute exact path="/dashboard/mentor" component={Mentor}/>
        <PrivateRoute exact path="/dashboard/settings/profile/resetpass" component={ResetPassword}/>
        <PrivateRoute exact path="/dashboard/settings/profile/delete" component={DeleteAccount}/>
        <GatewayRoute exact path="/subscription" component={Subscription}/>
        <PublicRoute restricted={false} component={NotFound}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
