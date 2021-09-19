//@ts-check

import React, { Component } from "react";
import main_logo from "../../assets/main-logo.svg";
import left from "../../assets/initiate-signin-left.svg";
import right from "../../assets/initiate-signin-right.svg";
import "./initiate-signin.css";

class InitiateSignin extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='init-signin-body'>
                <div className='init-signin-logo'>
                    <img src={main_logo}></img>
                </div>
                <div className='init-signin-content1'>
                    <div className='init-signin-left'>
                        <img src={left} width='80%'></img>
                        <div className='init-signin-left-content'>
                            <button className='init-signin-button'>SIGN IN AS A LEARNER</button>
                            <div className='init-signin-text1'>
                                When you sign up as a Learner, you are connected with real mentors for each subject that you want to
                                learn. Your mentors can reach you via your contact number or email address. Sign up and take the first
                                step towards education and success!
                            </div>
                        </div>
                    </div>
                    <div className='init-signin-right'>
                        <div className='init-signin-left-content'>
                            <div className='init-signin-text2'>
                                When you sign up as a Mentor, you are connected with real learners who you can guide through their
                                senior secondary education. Sign up and take the first step towards making an invaluable contribution
                                in someone’s life!
                            </div>
                            <button className='init-signin-button'>SIGN IN AS A MENTOR</button>
                        </div>
                        <img src={right} width='90%'></img>
                    </div>
                </div>
            </div>
        );
    }
}

export default InitiateSignin;
