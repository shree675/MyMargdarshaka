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
import { useParams } from "react-router-dom";
import axios from "axios";

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
//we need to know which button was clicked

const Authentication = () => {
    let user = useParams();
    let userType = user.id.slice(1);
    console.log(userType); //:student or :mentor
    const [toggle, setToggle] = useState(true);
    const [curuser, setCuruser] = useState("No user is logged in");
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const slides = ["The average time that students spend on social networks has risen to an all-time high", "lorem ipsum"];
    const [time, setTime] = useState(0);
    const interval = setInterval(() => {
        setTime(time + 1);
        clearInterval(interval);
    }, 4000);

    useEffect(() => {
        verify();
    }, []);

    // checks if a user is already logged in
    const verify = async () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setCuruser(user.uid); // user.uid is the unique identifier of the user
                // alert("You are logged in as " + user.uid);
                setPhone(user.phoneNumber);
                //console.log(user.phoneNumber);
            } else {
                setCuruser("No user found");
            }
        });
        console.log(curuser);

        /* const user={
            phone: '1234567890',
            user_type: userType,
            valid_signup: false,
            }
          console.log("Printing user before pushing:", user)
          await axios.post(`user/signup/createUser`, user).then(res=>console.log('Pushing user Sign up data')); */
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
    const verifyPhone = async (e) => {
        // e.preventDefault();
        //query the mongodb users database -
        // 1. if number does not exist - continue with sign up process
        // 2. if number exists by=ut sign up is not successful - continue with sign up
        // 3. successful sign up number exists - route accordingly to homepage

        //set variables - mentor or learner, valid signup or not and use them for routing

        await axios.get("user/login/getUser").then((e) => {
            //console.log(e);
            e.data.map((user) => {
                console.log(user.phone);
                if (user.phone === phone) {
                    /* this.setState({
                        prefgens: user.genre
                    }); */
                    console.log("Phone number found ", phone);
                }
            });
        });

        setupCaptcha();
        let phoneNumber = phone;
        if (phone[0] != "+") phoneNumber = "+91" + phoneNumber;
        setPhone(phone);
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
            .then(async function (result) {
                // User signed in successfully.
                console.log("Successful log in");
                const user = {
                    /* phone: LearnerSignup.phone, */ //pass as props
                    phone: phone,
                    user_type: userType,
                    valid_signup: false,
                };
                console.log("Printing user before pushing:", user);
                await axios.post(`user/signup/createUser`, user).then((res) => console.log("Pushing user Sign up data"));

                window.location = "/learner-signup";

                //here do the appropriate routing
                //create a collection in mongodb - for all users - storing (phone number, mentor/learner, successful signup: true/false) {firebase UID ?}
                //remember to update sign up successful at the end of sign up
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
                        <div className='bottom-fact'>{slides[time % slides.length]}</div>
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
                        <div className='bottom-fact'>{slides[time % slides.length]}</div>
                    </div>
                )}
                <img src={humans} className='auth-humans-phone' />
                <img src={auth_background} className='auth-background-img-phone' />
            </div>
        </div>
    );
};

export default Authentication;
