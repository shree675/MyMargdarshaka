//@ts-check

import React from "react";
import auth_background from "../../assets/auth-background-comp.svg";
import wavefront from "../../assets/wavefront.svg";
import waveback from "../../assets/waveback.svg";
import humans from "../../assets/auth-human-comp.svg";
import "./authentication.css";
import { useSpring, animated } from "react-spring";

const Authentication = () => {
    const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2];
    const trans1 = (x, y) => `translate3d(${x / 16}px,${y / 16}px,0)`;
    const trans2 = (x, y) => `translate3d(${x / 8}px,${y / 8}px,0)`;
    const trans3 = (x, y) => `translate3d(${x / 6}px,${y / 6}px,0)`;
    const [props, set] = useSpring(() => ({ xy: [0, 0], config: { mass: 10, tension: 550, friction: 140 } }));

    return (
        <div className='auth-body'>
            <div className='auth-heading'>Verify your phone number</div>
            <div className='auth-content' onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}>
                <img src={auth_background} className='auth-background-img' />
                <animated.div style={{ transform: props.xy.to(trans1) }}>
                    <img src={humans} className='auth-humans' />
                    <img src={waveback} className='auth-wave-back' />
                </animated.div>
                <animated.div style={{ transform: props.xy.to(trans2) }}>
                    <img src={wavefront} className='auth-wave-front' />
                </animated.div>
            </div>
        </div>
    );
};

export default Authentication;
