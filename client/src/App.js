//@ts-check

import React, { Component } from "react";
import "./App.css";

class App extends Component {
    constructor() {
        super();
        this.state = {
            message: "Waiting for the message from the server",
        };
    }

    componentDidMount() {
        fetch("/api/message")
            .then((res) => res.text())
            .then((data) => this.setState({ message: data }));
    }

    render() {
        return (
            <div className='App'>
                <div>This is the frontend of the app</div>
                <br></br>
                <div>{this.state.message}</div>
            </div>
        );
    }
}

export default App;
