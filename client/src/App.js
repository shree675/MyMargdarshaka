//@ts-check

import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/landing.js";
import InitiateSignin from "./components/InitiateSigninPage/initiate-signin.js";
import Navbar from "./components/Navbar/navbar.js";
import Home from "./components/Navbar/home";

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
            
            // {/* <Switch>
            //     {/* <Route exact path='/' component={LandingPage} /> */}
            //         <Route exact path='/' component={InitiateSignin} />
            //     </Switch> */}

                <Router>
                    <Navbar />
                        <Switch>
                            <Route path="/" exact component={Home} />
                        </Switch>
                </Router>
        );
    }
}

export default App;
