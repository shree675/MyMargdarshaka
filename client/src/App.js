//@ts-check

import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/landing.js";
import InitiateSignin from "./components/InitiateSigninPage/initiate-signin.js";
import Authentication from "./components/AuthenticationPage/authentication.js";
import LearnerSignup from "./components/LearnerSignupPage/learner-signup.js";
import MentorSignup from "./components/MentorSignupPage/mentor-signup.js";
import Feedback from "./components/FeedbackPage/feedback.js";
import Error from "./components/ErrorPage/error.js";
import AdminAuthentication from "./components/AuthenticationPage/admin-authentication.js";
import MentorSubjectDetails from "./components/MentorSubjectDetailsPage/mentor-subject-details.js";
import LearnerSubjectDetails from "./components/LearnerSubjectDetailsPage/learner-subject-details.js";
import AdminApplications from "./components/AdminApplicationsPage/admin-applications";
import LearnerDashboard from "./components/LearnerDashboardPage/learner-dashboard.js";
import MentorHome from "./components/MentorHomePage/mentor-home.js";
import MentorDashBoard from "./components/MentorDashboardPage/mentor-dashboard.js";
import LearnerHomepage from "./components/LearnerHomePage/learner-home.js";
import TestPage from "./components/TestPage/test.js";
import AdminHomePage from "./components/AdminHomePage/admin-home.js";
import Chat from "./components/Chat/chat";
import LearnerGuidelines from "./components/GuidelinesPage/learner-guidelines.js";

// all user routes
class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={LandingPage} /> // checked
          <Route exact path='/init-signin' component={InitiateSignin} /> // checked
          <Route exact path='/authentication:id' component={Authentication} /> // checked
          <Route exact path='/learner-signup' component={LearnerSignup} /> // checked
          <Route exact path='/mentor-signup' component={MentorSignup} /> // checked
          <Route exact path='/feedback' component={Feedback} /> // checked
          <Route exact path='/admin-auth' component={AdminAuthentication} /> // checked
          <Route exact path='/mentor-dashboard' component={MentorDashBoard} /> // checked
          <Route exact path='/learner-dashboard' component={LearnerDashboard} /> // checked
          <Route exact path='/my-mentors' component={LearnerHomepage} /> // checked
          <Route exact path='/my-students' component={MentorHome} /> // checked
          <Route exact path='/mentor-subject-details' component={MentorSubjectDetails} /> // checked
          <Route exact path='/learner-subject-details' component={LearnerSubjectDetails} /> // checked
          <Route exact path='/test' component={TestPage} /> // checked
          <Route exact path='/admin-applications' component={AdminApplications} /> // checked
          <Route exact path='/admin-home' component={AdminHomePage} /> // checked
          <Route exact path='/learner-guidelines' component={LearnerGuidelines} />
          <Route exact path='/chat' component={Chat} /> // checked
          <Route path='/' component={Error} /> // checked
        </Switch>
      </Router>
    );
  }
}

export default App;
