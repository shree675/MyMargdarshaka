//@ts-check

import React, { useState } from "react";
import auth_background from "../../assets/auth-background-comp.svg";
import wavefront from "../../assets/wavefront.svg";
import waveback from "../../assets/waveback.svg";
import humans from "../../assets/auth-human-comp.svg";
import telephone from "../../assets/telephone.svg";
import otp from "../../assets/otp.svg";
import "./authentication.css";
import { useSpring, animated } from "react-spring";
import TextField from "@mui/material/TextField";

const Authentication = () => {
    const [toggle, setToggle] = useState(true);

    const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2];
    const trans1 = (x, y) => `translate3d(${x / 16}px,${y / 16}px,0)`;
    const trans2 = (x, y) => `translate3d(${x / 7.5}px,${y / 7.5}px,0)`;
    const trans3 = (x, y) => `translate3d(${x / 6}px,${y / 6}px,0)`;
    const [props, set] = useSpring(() => ({ xy: [0, 0], config: { mass: 10, tension: 550, friction: 140 } }));

    return (
        <div className='auth-body'>
            <div className='auth-heading'>Verify your phone number</div>
            <div className='auth-content' onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}>
                <div className='auth-phone-svg'>
                    <img src={auth_background} className='auth-background-img' />
                    <animated.div style={{ transform: props.xy.to(trans1) }}>
                        <img src={humans} className='auth-humans' />
                        <img src={waveback} className='auth-wave-back' />
                    </animated.div>
                    <animated.div style={{ transform: props.xy.to(trans2) }}>
                        <img src={wavefront} className='auth-wave-front' />
                    </animated.div>
                </div>
                {toggle ? (
                    <div className='auth-content-body'>
                        <div className='auth-91'>
                            <span className='auth-num'>+91 </span>
                            <span>
                                <img src={telephone} className='auth-svg'></img>
                            </span>
                        </div>
                        <br></br>
                        <br></br>
                        <div className='textfield'>
                            <TextField
                                fullWidth
                                label='Phone Number'
                                id='auth-textfield'
                                defaultValue=''
                                size='small'
                                placeholder=''
                                color='error'
                            />
                        </div>
                        <br></br>
                        <br></br>
                        <div className=''>
                            <button
                                className='auth-button'
                                onClick={() => {
                                    setToggle(false);
                                }}
                            >
                                GET OTP
                            </button>
                        </div>
                        <div className='bottom-fact'>
                            The average time that students spend on social networks has risen to an all-time high
                        </div>
                    </div>
                ) : (
                    <div className='auth-content-body'>
                        <div className='auth-91'>
                            <span>
                                <img src={otp} className='auth-svg'></img>
                            </span>
                        </div>
                        <br></br>
                        <br></br>
                        <div className='textfield'>
                            <TextField
                                fullWidth
                                label='OTP'
                                id='auth-textfield'
                                defaultValue=''
                                size='small'
                                placeholder=''
                                color='error'
                            />
                        </div>
                        <br></br>
                        <br></br>
                        <div className=''>
                            <button
                                className='auth-button'
                                onClick={() => {
                                    setToggle(true);
                                }}
                            >
                                SUBMIT
                            </button>
                        </div>
                        <div className='bottom-fact'>
                            The average time that students spend on social networks has risen to an all-time high
                        </div>
                    </div>
                )}
                <img src={humans} className='auth-humans-phone' />
                <img src={auth_background} className='auth-background-img-phone' />
            </div>
        </div>
    );
};

export default Authentication;
