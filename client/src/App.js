//@ts-check

import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/landing.js";
import InitiateSignin from "./components/InitiateSigninPage/initiate-signin.js";
import Navbar from "./components/Navbar/navbar.js";
import Home from "./components/Navbar/home";
import Authentication from "./components/AuthenticationPage/authentication.js";
import LearnerSignup from "./components/LearnerSignupPage/learner-signup.js";

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
                </Switch>
            </Router>
        );
    }
}

export default App;
