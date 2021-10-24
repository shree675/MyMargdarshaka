//@ts-check

import React, { useState, useEffect } from "react";
import LearnerNavbar from "../Navbar/learner-navbar";
import MentorNavbar from "../Navbar/mentor-navbar";
import TextField from "@mui/material/TextField";
import "./error.css";
import errorcomp from "../../assets/error.svg";
import { styled } from "@mui/material/styles";
import { useSpring, animated } from "react-spring";
import axios from "axios";
import firebase from "../../firebase";

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
      border: "none",
      borderBottom: "2px solid #4e0d3a",
      borderRadius: "0px",
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

const Error = () => {
  const [curuser, setCuruser] = useState(null);
  //   const [phone, setPhone] = useState(null);
  var phone = null;
  var tempuserType = "unknown";
  const [name, setName] = useState(null);
  const [userType, setUserType] = useState("unknown");

  useEffect(() => {
    verify();
  }, []);

  useEffect(() => {
    console.log(tempuserType);
    setUserType(tempuserType);
  }, [tempuserType, phone]);

  const verify = async () => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        setCuruser(user.uid);
        // setPhone(user.phoneNumber);
        phone = user.phoneNumber;

        await axios.get("/api/user/login/getUser").then((e) => {
          //console.log("*****************")
          console.log(phone);

          e.data.map((userData) => {
            let p = userData.phone;
            if (p[0] != "+") p = "+91" + p;
            //if (phone[0] != "+") setPhone("+91"+phone)
            console.log("*****", phone, p);

            if (phone === p) {
              console.log("Valid phone number matched: ", p);
              if (userData.user_type == "mentor") {
                console.log("mentor found");
                setUserType("mentor");
                tempuserType = "mentor";
              } else if (userData.user_type == "learner") {
                setUserType("learner");
                tempuserType = "learner";
                console.log("learner found");
              }
              console.log("Phone number found ", p, userType);
            } else {
              setUserType("unknown");
              tempuserType = "unknown";
            }
          });
        });
        setUserType(tempuserType);
      } else {
      }
    });
  };

  const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2];
  const trans1 = (x, y) => `translate3d(${-x / 16}px,${-y / 16}px,0)`;
  const [props, set] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 10, tension: 550, friction: 140 },
  }));

  return (
    <div>
      {userType === "unknown" ? null : userType === "learner" ? <LearnerNavbar /> : <MentorNavbar />}
      <div style={{ height: "35px", backgroundColor: "#720d5d" }}></div>
      <div className='error-content' onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}>
        <div className='error-content-left'>
          <animated.div style={{ transform: props.xy.to(trans1) }}>
            {/* <img src={left} width='80%'></img> */}
            <img src={errorcomp} className='error-img'></img>
          </animated.div>
        </div>
        <div className='error-content-right'>
          <div className='error-404-code'>404 Page Not Found</div>
          <div className='error-error'>ERROR</div>
          <br></br>
          <br></br>
          <div className='error-message'>Oops. Looks like we took the wrong turn. Let us guide you back to the right path.</div>
          <div className='error-height'></div>
          <button
            className='error-button'
            onClick={() => {
              console.log("clicked");
              if (userType == "unknown") window.location = "/init-signin";
              else if (userType == "learner") window.location = "/my-mentors";
              else if (userType == "mentor") window.location = "/my-students";
            }}
          >
            GO BACK HOME
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error;
