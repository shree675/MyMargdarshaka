//@ts-check

import React, { Component } from "react";
import main_logo from "../../assets/main-logo.svg";
import left from "../../assets/initiate-signin-left.svg";
import right from "../../assets/initiate-signin-right.svg";
import "./initiate-signin.css";
import { useSpring, animated } from "react-spring";
import { Link } from "react-router-dom";

const InitiateSignin = () => {
    const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2];
    const trans1 = (x, y) => `translate3d(${-x / 16}px,${-y / 16}px,0)`;
    const trans2 = (x, y) => `translate3d(${x / 8}px,${y / 8}px,0)`;
    const trans3 = (x, y) => `translate3d(${x / 6}px,${y / 6}px,0)`;
    const [props, set] = useSpring(() => ({ xy: [0, 0], config: { mass: 10, tension: 550, friction: 140 } }));

    return (
        <div className='init-signin-body'>
            <div className='init-signin-content1' onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}>
                <Link to='/adminauth' className='init-signin-admin'>
                    Sign in as an admin
                </Link>
                <div className='init-signin-left'>
                    <animated.div style={{ transform: props.xy.to(trans1) }}>
                        <img src={left} width='80%'></img>
                    </animated.div>
                    <div className='init-signin-left-content'>
                        <button
                            className='init-signin-button'
                            onClick={() => {
                                window.location = "/authentication:learner";
                            }}
                        >
                            SIGN IN AS A LEARNER
                        </button>
                        <div className='init-signin-text1'>
                            When you sign up as a Learner, you are connected with real mentors for each subject that you want to learn.
                            Your mentors can reach you via your contact number or email address. Sign up and take the first step
                            towards education and success!
                        </div>
                    </div>
                    <div className='init-signin-logo'>
                        <img src={main_logo} className='init-phone-logo'></img>
                    </div>
                </div>
                <div className='init-signin-right'>
                    <div className='init-signin-left-content'>
                        <div className='init-signin-text2'>
                            When you sign up as a Mentor, you are connected with real learners who you can guide through their senior
                            secondary education. Sign up and take the first step towards making an invaluable contribution in someone’s
                            life!
                        </div>
                        <button
                            className='init-signin-button'
                            onClick={() => {
                                window.location = "/authentication:mentor";
                            }}
                        >
                            SIGN IN AS A MENTOR
                        </button>
                    </div>
                    <animated.div style={{ transform: props.xy.to(trans2) }}>
                        <img src={right} width='90%'></img>
                    </animated.div>
                </div>
            </div>
        </div>
    );
};

export default InitiateSignin;
