//@ts-check

import React, { useState, useEffect } from "react";
import auth_background from "../../assets/auth-background-comp.svg";
import wavefront from "../../assets/wavefront.svg";
import waveback from "../../assets/waveback.svg";
import humans from "../../assets/auth-human-comp.svg";
import telephone from "../../assets/telephone.svg";
import otp_img from "../../assets/otp.svg";
import "./authentication.css";
import { useSpring, animated } from "react-spring";
import TextField from "@mui/material/TextField";
import firebase from "../../firebase";
import { styled } from "@mui/material/styles";

const CssTextField = styled(TextField)({
    "& label.Mui-focused": {
        color: "#4e0d3a",
    },
    "& .MuiInput-underline:after": {
        borderBottomColor: "#4e0d3a",
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "gray",
        },
        "&:hover fieldset": {
            borderColor: "gray",
        },
        "&.Mui-focused fieldset": {
            border: "none",
            borderBottom: "2px solid #4e0d3a",
            borderRadius: "0px",
        },
    },
});

const Authentication = () => {
    const [toggle, setToggle] = useState(true);
    const [curuser, setCuruser] = useState("No user is logged in");
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");

    useEffect(() => {
        verify();
    }, []);

    // checks if a user is already logged in
    const verify = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setCuruser(user.uid); // user.uid is the unique identifier of the user
                // alert("You are logged in as " + user.uid);
            } else {
                setCuruser("No user found");
            }
        });
        console.log(curuser);
    };

    // invisibly checks if user is human
    const setupCaptcha = () => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("auth-signin-button", {
            size: "invisible",
            callback: (response) => {
                // reCAPTCHA solved
                verifyPhone();
            },
            defaultCountry: "IN",
        });
    };

    // sends otp
    const verifyPhone = (e) => {
        e.preventDefault();
        setupCaptcha();
        const phoneNumber = "+91" + phone;
        console.log(phoneNumber);
        const appVerifier = window.recaptchaVerifier;

        firebase
            .auth()
            .signInWithPhoneNumber(phoneNumber, appVerifier)
            .then(function (confirmationResult) {
                // SMS sent
                window.confirmationResult = confirmationResult;
                console.log("OTP is sent");
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    // signs in the user
    const verifyOtp = (e) => {
        e.preventDefault();
        let otpInput = otp;
        let optConfirm = window.confirmationResult;
        optConfirm
            .confirm(otpInput)
            .then(function (result) {
                // User signed in successfully.
                console.log("Successful sign up");

                const userid = result.user.X.X; // userid should be used as the unique identifier
                alert("Successfully signed in as " + userid);
                window.location = "/learner-signup";
            })
            .catch(function (error) {
                console.log(error);
                alert("Incorrect OTP");
            });
        verify();
    };

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
                        <div className='auth-text'>
                            <CssTextField
                                fullWidth
                                onChange={(e) => {
                                    setPhone(e.target.value);
                                }}
                                label='Phone Number'
                                id='auth-textfield'
                                defaultValue=''
                                size='small'
                                placeholder=''
                                color='error'
                                value={phone}
                            />
                        </div>
                        <br></br>
                        <br></br>
                        <div className=''>
                            <button
                                id='auth-signin-button'
                                className='auth-button'
                                onClick={(e) => {
                                    setToggle(false);
                                    verifyPhone(e);
                                    setPhone("");
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
                                <img src={otp_img} className='auth-svg'></img>
                            </span>
                        </div>
                        <br></br>
                        <br></br>
                        <div className='auth-text'>
                            <CssTextField
                                fullWidth
                                onChange={(e) => {
                                    setOtp(e.target.value);
                                }}
                                label='OTP'
                                id='auth-textfield'
                                defaultValue=''
                                size='small'
                                placeholder=''
                                color='error'
                                value={otp}
                            />
                        </div>
                        <br></br>
                        <br></br>
                        <div className=''>
                            <button
                                id='auth-signin-button'
                                className='auth-button'
                                onClick={(e) => {
                                    verifyOtp(e);
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
