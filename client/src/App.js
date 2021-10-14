//@ts-check

import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/landing.js";
import InitiateSignin from "./components/InitiateSigninPage/initiate-signin.js";
import Authentication from "./components/AuthenticationPage/authentication.js";
import LearnerSignup from "./components/LearnerSignupPage/learner-signup.js";
import MentorSignup from "./components/MentorSignupPage/mentor-signup.js";
import Feedback from "./components/FeedbackPage/feedback.js";
import AdminAuthentication from "./components/AuthenticationPage/admin-authentication.js";
import MentorSubjectDetails from "./components/MentorSubjectDetailsPage/mentor-subject-details.js";
import LearnerSubjectDetails from "./components/LearnerSubjectDetailsPage/learner-subject-details.js";
import LearnerDashboard from "./components/LearnerDashboardPage/learner-dashboard.js";
import LearnerHomepage from "./components/LearnerHomePage/learner-home.js"


class App extends Component {
    // constructor() {
    //     super();
    //     this.state = {
    //         message: "Waiting for the message from the server",
    //     };
    // }

    // componentDidMount() {
    //     fetch("/api/message")
    //         .then((res) => res.text())
    //         .then((data) => this.setState({ message: data }));
    // }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/' component={LandingPage} />
                    <Route exact path='/initsignin' component={InitiateSignin} />
                    <Route exact path='/authentication' component={Authentication} />
                    <Route exact path='/learner-signup' component={LearnerSignup} />
                    <Route exact path='/mentor-signup' component={MentorSignup} />
                    <Route exact path='/learner-feedback' component={Feedback} />
                    <Route exact path='/adminauth' component={AdminAuthentication} />
                    <Route exact path='/mentor-subject-details' component={MentorSubjectDetails} />
                    <Route exact path='/learner-subject-details' component={LearnerSubjectDetails} />
                    <Route exact path='/learner-dashboard' component={LearnerDashboard} />
                    <Route exact path='/my-mentors' component={LearnerHomepage} />
                </Switch>
            </Router>
        );
    }
}

export default App;
