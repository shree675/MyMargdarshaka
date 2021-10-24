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
import LearnerHome from "./components/LearnerHomePage/learner-home.js";
import AdminApplications from "./components/AdminApplicationsPage/admin-applications";
import LearnerDashboard from "./components/LearnerDashboardPage/learner-dashboard.js";
import MentorHome from "./components/MentorHomePage/mentor-home.js";
import MentorDashBoard from "./components/MentorDashboardPage/mentor-dashboard.js";
import LearnerHomepage from "./components/LearnerHomePage/learner-home.js";
import TestPage from "./components/TestPage/test.js";
import AdminHomePage from "./components/AdminHomePage/admin-home.js";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/init-signin' component={InitiateSignin} />
          <Route exact path='/authentication:id' component={Authentication} />
          <Route exact path='/learner-signup' component={LearnerSignup} />
          <Route exact path='/mentor-signup' component={MentorSignup} />
          <Route exact path='/feedback' component={Feedback} />
          <Route exact path='/learner-home' component={LearnerHome} />
          <Route exact path='/learner-dashboard' component={LearnerDashboard} />
          <Route exact path='/admin-auth' component={AdminAuthentication} /> // this is repeated again
          <Route exact path='/mentor-home' component={MentorHome} />
          <Route exact path='/mentor-dashboard' component={MentorDashBoard} />
          <Route exact path='/learner-dashboard' component={LearnerDashboard} />
          <Route exact path='/my-mentors' component={LearnerHomepage} />
          <Route exact path='/my-students' component={MentorHome} /> {/* //temporary - remove it */}
          <Route exact path='/mentor-subject-details' component={MentorSubjectDetails} />
          <Route exact path='/learner-subject-details' component={LearnerSubjectDetails} />
          <Route exact path='/learner-home' component={LearnerHome} />
          <Route exact path='/learner-dashboard' component={LearnerDashboard} />
          <Route exact path='/test' component={TestPage} />
          <Route exact path='/admin-applications' component={AdminApplications} />
          <Route exact path='/admin-home' component={AdminHomePage} />
          <Route path='/' component={Error} />
        </Switch>
      </Router>
    );
  }
}

export default App;
