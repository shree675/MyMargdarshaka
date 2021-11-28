//@ts-check

import React, { useState, useEffect } from "react";
import auth_background from "../../assets/auth-background-comp.svg";
import wavefront from "../../assets/wavefront.svg";
import waveback from "../../assets/waveback.svg";
import humans from "../../assets/auth-human-comp.svg";
import lock from "../../assets/lock.svg";
import "./authentication.css";
import { useSpring, animated } from "react-spring";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import axios from "axios";
// library to encrypt password
var aesjs = require("aes-js");

// custom css for materialui textfields
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

// main page component
const AdminAuthentication = () => {
  // react spring animation
  const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2];
  const trans1 = (x, y) => `translate3d(${x / 16}px,${y / 16}px,0)`;
  const trans2 = (x, y) => `translate3d(${x / 7.5}px,${y / 7.5}px,0)`;
  const [props, set] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 10, tension: 550, friction: 140 },
  }));
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  // verifying if a user is already logged in
  useEffect(() => {
    if (localStorage.getItem("isloggedin") == "true") {
      window.location = "/admin-home";
    }
    if (
      localStorage.getItem("userType") !== null &&
      localStorage.getItem("userType") !== undefined &&
      localStorage.getItem("userType") === "mentor"
    ) {
      window.location = "/my-students";
    } else if (
      localStorage.getItem("userType") !== null &&
      localStorage.getItem("userType") !== undefined &&
      localStorage.getItem("userType") === "learner"
    ) {
      window.location = "/my-mentors";
    }
  }, []);

  // method to authenticate the user
  const submit = async (e) => {
    if (username == null || password == null) {
      alert("Please fill all the fields");
      return;
    }

    // key for encryption
    var key = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

    // encrypt the password
    var passwordBytes = aesjs.utils.utf8.toBytes(password);
    var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(4));
    var encryptedBytes = aesCtr.encrypt(passwordBytes);
    var encryptedPassword = aesjs.utils.hex.fromBytes(encryptedBytes);

    var successfulLogin = false;

    // verify user credentials and route appropriately
    await axios.get("/api/admin/login/submitadmin").then((res) => {
      if (!res) {
        alert("Incorrect username or password");
        return;
      }
      console.log(res);
      console.log(res.data);
      res.data.map((data) => {
        if (data.username == username && data.password == encryptedPassword) {
          // setting user session
          localStorage.setItem("isloggedin", "true");
          localStorage.setItem("username", username);
          successfulLogin = true;
          // auth token
          localStorage.setItem("basicAuth", `${username}:${encryptedPassword}`);
          window.location = "/admin-home";
        }
      });
    });

    if (!successfulLogin) {
      alert("Incorrect username or password");
    }
  };

  // frontend component of the page
  return (
    <div className='admin-body'>
      <div className='auth-body'>
        <div className='auth-heading'>You are signing in as an admin</div>
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
          <div className='auth-content-body'>
            <div className='auth-91'>
              <img src={lock} className='auth-svg'></img>
            </div>
            <br></br>
            <br></br>
            {/* username field */}
            <div className='auth-text'>
              <CssTextField
                fullWidth
                label='Username'
                id='auth-textfield'
                defaultValue=''
                size='small'
                placeholder=''
                color='error'
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <br></br>
            {/* password field */}
            <div className='auth-text'>
              <CssTextField
                fullWidth
                label='Password'
                id='auth-textfield'
                defaultValue=''
                size='small'
                placeholder=''
                color='error'
                type='password'
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <br></br>
            <br></br>
            <div className=''>
              <button
                className='auth-button'
                onClick={() => {
                  // function to handle sign in
                  if (
                    username != "" &&
                    username != null &&
                    username != undefined &&
                    password != null &&
                    password != "" &&
                    password != undefined
                  ) {
                    submit(); // if user has entered all fields
                  } else {
                    alert("Please enter both username and password");
                  }
                }}
              >
                LOGIN
              </button>
            </div>
          </div>
          <img src={humans} className='auth-humans-phone' />
          <img src={auth_background} className='auth-background-img-phone' />
        </div>
      </div>
    </div>
  );
};

export default AdminAuthentication;
