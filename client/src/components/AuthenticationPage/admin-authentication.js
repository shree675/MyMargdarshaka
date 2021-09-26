//@ts-check

import React from "react";
import auth_background from "../../assets/auth-background-comp.svg";
import wavefront from "../../assets/wavefront.svg";
import waveback from "../../assets/waveback.svg";
import humans from "../../assets/auth-human-comp.svg";
import lock from "../../assets/lock.svg";
import "./authentication.css";
import { useSpring, animated } from "react-spring";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const AdminAuthentication = () => {
    const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2];
    const trans1 = (x, y) => `translate3d(${x / 16}px,${y / 16}px,0)`;
    const trans2 = (x, y) => `translate3d(${x / 7.5}px,${y / 7.5}px,0)`;
    const trans3 = (x, y) => `translate3d(${x / 6}px,${y / 6}px,0)`;
    const [props, set] = useSpring(() => ({ xy: [0, 0], config: { mass: 10, tension: 550, friction: 140 } }));

    return (
        <div className='admin-body'>
            <div className='auth-body'>
                <div className='auth-heading'>You are signing in as an admin</div>
                <div className='auth-content' onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}>
                    <img src={auth_background} className='auth-background-img' />
                    <animated.div style={{ transform: props.xy.to(trans1) }}>
                        <img src={humans} className='auth-humans' />
                        <img src={waveback} className='auth-wave-back' />
                    </animated.div>
                    <animated.div style={{ transform: props.xy.to(trans2) }}>
                        <img src={wavefront} className='auth-wave-front' />
                    </animated.div>

                    <div className='auth-content-body'>
                        <div className='auth-91'>
                            <img src={lock} style={{ width: "3.5vw", margin: "0.4vw", marginBottom: "-1vw" }}></img>
                        </div>
                        <br></br>
                        <br></br>
                        <div className='textfield'>
                            <TextField
                                fullWidth
                                label='Full Name'
                                id='auth-textfield'
                                defaultValue=''
                                size='small'
                                placeholder=''
                                color='error'
                            />
                        </div>
                        <br></br>
                        <div className='textfield'>
                            <TextField
                                fullWidth
                                label='Password'
                                id='auth-textfield'
                                defaultValue=''
                                size='small'
                                placeholder=''
                                color='error'
                                type='password'
                            />
                        </div>
                        <br></br>
                        <br></br>
                        <div className=''>
                            <button className='auth-button'>LOGIN</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminAuthentication;
