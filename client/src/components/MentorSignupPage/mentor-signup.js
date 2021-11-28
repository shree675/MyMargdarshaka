//@ts-check
import React from "react";
import "./mentor-signup.css";
import imgSrc from "../../assets/mentor-signup.svg";
import firebase from "../../firebase";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import data from "../../data";
import { verify } from "../../verifyUser";

let classes = data.classes;
let primSubs = data.primSubs;
let secSubs = data.secSubs;
let langs = data.langs;
let times = data.times;

// main component
const MentorSignup = () => {
  const [state, setState] = React.useState({
    name: "",
    email: "",
    prefLang: "",
    prefTime: "",
    clsAndSub: { 6: [], 7: [], 8: [], 9: [], 10: [], 11: [], 12: [] },
    nameCheck: true,
    emailCheck: true,
    prefLangCheck: true,
    prefTimeCheck: true,
    subCheck: true,
  });
  const [curuser, setCuruser] = useState("No user is logged in");
  const [phone, setPhone] = useState("Null phone");
  const [show, setShow] = useState(false);

  // reroute if a different user is logged in
  useEffect(() => {
    if (
      localStorage.getItem("userType") !== null &&
      localStorage.getItem("userType") !== undefined &&
      localStorage.getItem("userType") === "learner"
    ) {
      window.location = "/my-mentors";
    } else if (
      localStorage.getItem("isloggedin") !== null &&
      localStorage.getItem("isloggedin") !== undefined &&
      localStorage.getItem("isloggedin") === "true"
    ) {
      window.location = "/admin-home";
    }
    verify(setCuruser, setPhone);
  }, []);

  useEffect(() => {
    axios.get("/api/user/login/getUser").then((e) => {
      //call user table and check if sign up is unsuccessful or not (in case someone tries to break the system with multiple sign ups with same phone number)
      e.data.map((user) => {
        let p = phone;
        if (p[0] != "+") p = "+91" + p;
        if (user.phone === p) {
          if (user.valid_signup == true) {
            alert("You have already signed up");
            window.location = "/my-mentors";
          }
        } else {
        }
      });
    });
  }, [phone]);

  // fill the page with the appropriate checkboxes and fields
  const handleChange = (e) => {
    if (e.target.name == "clsAndSub") {
      console.log(e.target.value);
      console.log(e.target.checked);
      let [sub, cls] = e.target.value.split(" ");
      cls = Number(cls);
      if (e.target.checked) {
        // add
        setState({
          ...state,
          clsAndSub: {
            ...state.clsAndSub,
            [cls]: [...state.clsAndSub[cls], sub],
          },
        });
      } else {
        // remove
        var tmp = state.clsAndSub[cls].filter((tSub) => tSub != sub);
        setState({
          ...state,
          clsAndSub: {
            ...state.clsAndSub,
            [cls]: tmp,
          },
        });
      }
    } else {
      setState({ ...state, [e.target.name]: e.target.value });
    }
  };

  const handleClick = async () => {
    setShow(true);
    console.log(state);

    let temp = {};

    if (state.name.length == 0) temp.nameCheck = false;
    else temp.nameCheck = true;

    if (state.email.length == 0) temp.emailCheck = false;
    else temp.emailCheck = true;

    if (state.prefLang.length == 0) temp.prefLangCheck = false;
    else temp.prefLangCheck = true;

    if (state.prefTime.length == 0) temp.prefTimeCheck = false;
    else temp.prefTimeCheck = true;

    temp.subCheck = false;

    for (let i = 6; i <= 12; i++) {
      if (state.clsAndSub[i].length != 0) {
        temp.subCheck = true;
        break;
      }
    }

    let ok = true;
    let tempKeys = Object.keys(temp);
    tempKeys.forEach((key) => {
      ok = ok && temp[key];
    });

    if (!ok) {
      setState({ ...state, ...temp });
    } else {
      // push to DB
      console.log("ok");

      await axios.get("/api/user/login/getUser").then((e) => {
        console.log(e);
        if (phone[0] != "+") setPhone("+91" + phone);
        console.log("Phone number was updated");

        //call user table and check if sign up is unsuccessful or not (in case someon tries to break the system with multiple sign ups with same phone number)
        e.data.map((user) => {
          let p = phone;
          if (p[0] != "+") p = "+91" + p;
          //if (phone[0] != "+") setPhone("+91"+phone)
          console.log("*****", user.phone, p);

          if (user.phone === p) {
            console.log("Valid phone number matched: ", p);
            if (user.valid_signup == true) {
              alert("You have already signed up");
              window.location = "/my-students";
            }
            console.log("Phone number found ", p);
          } else {
          }
        });
      });

      const classes_list = [];
      console.log(state.clsAndSub);
      for (let i = 6; i <= 12; i++) {
        let subjects = state.clsAndSub[i];
        subjects.forEach((subject) => {
          console.log(i, subject);
          let code = data.codes[subject] + i;
          console.log(code);
          const item = {
            code: code,
            chapters: data.default.chapters,
            //TODO: Add nice data to ENG9 and PHY10 and add it here
          };
          classes_list.push(item);
        });
      }

      console.log(classes_list);
      const mentor = {
        phone: phone,
        name: state.name,
        email: state.email,
        language: state.prefLang,
        time: state.prefTime,
        approved: false,
        Classes: classes_list,
        profile_picture_url:
          "https://media.istockphoto.com/vectors/user-profile-icon-flat-red-round-button-vector-illustration-vector-id1162440985?k=20&m=1162440985&s=170667a&w=0&h=cQJ5HDdUKK_8nNDd_6RBoeDQfILERZnd_EirHTi7acI=",
      };
      const user = {
        phone: phone,
        user_type: "mentor",
        valid_signup: true,
      };
      console.log("Printing mentor before pushing:", mentor.Classes);
      //console.log("curuser : ", curuser);
      await axios
        .post(`/api/mentor/signup/creatementor`, mentor, {
          headers: { Authorization: `Bearer ${curuser}` },
        })
        .then(async (res) => {
          console.log("Pushing Sign up data", phone);
        });
      //update valid user
      await axios.post(`/api/user/update/` + phone, user).then((res) => console.log("User table has been updated"));

      setShow(false);
      alert("Sign up Successful!");
      window.location = "/my-students";
    }
  };

  return (
    <div className='mentor-main'>
      <div className='mentor-row-1'>
        <div>
          <div className='title'>Sign Up</div>
          <div className='mentor-signup-img-div-phone'>
            <img src={imgSrc} style={{ width: "80%", margin: "0", padding: "0" }} />
          </div>
          <div className='valid-div'>{state.nameCheck ? "" : "*this field is required"}</div>
          <input className='input-field' name='name' onChange={handleChange} placeholder='Name' /> <br />
          <div className='valid-div'>{state.emailCheck ? "" : "*this field is required"}</div>
          <input className='input-field' name='email' onChange={handleChange} placeholder='Email' />
          <div>
            <div className='valid-div'>{state.prefTimeCheck ? "" : "*this field is required"}</div>
            <select className='input-field' name='prefTime' onChange={handleChange} value={state.prefTime}>
              <option value='' className='mentor-signup-dropdown' disabled selected>
                Preferred Timeslot
              </option>
              {times.map((time) => (
                <option value={time}>{time}</option>
              ))}
            </select>
          </div>
          <div>
            <div className='valid-div'>{state.prefLangCheck ? "" : "*this field is required"}</div>
            <select className='input-field' name='prefLang' onChange={handleChange} value={state.prefLang}>
              <option value='' className='mentor-signup-dropdown' disabled selected>
                Preferred Language
              </option>
              {langs.map((lang) => (
                <option value={lang}>{lang}</option>
              ))}
            </select>
          </div>
        </div>
        <div className='img-div'>
          <img src={imgSrc} />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className='class-and-sub'>
          {classes.map((cls) => (
            <div>
              <div className='class-name'>Class {cls}</div>
              {cls <= 10 && (
                <div className='subs-box'>
                  {primSubs.map((sub) => (
                    <div style={{ marginBottom: "10px" }}>
                      <input
                        type='Checkbox'
                        name='clsAndSub'
                        value={`${sub} ${cls}`}
                        onChange={handleChange}
                        style={{ marginLeft: "20px" }}
                      />
                      <label style={{ marginLeft: "10px" }}>{sub}</label>
                    </div>
                  ))}
                </div>
              )}
              {cls > 10 && (
                <div className='subs-box'>
                  {secSubs.map((sub) => (
                    <div style={{ marginBottom: "10px" }}>
                      <input
                        type='Checkbox'
                        name='clsAndSub'
                        value={`${sub} ${cls}`}
                        onChange={handleChange}
                        style={{ marginLeft: "20px" }}
                      />
                      <label style={{ marginLeft: "10px" }}>{sub}</label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className='valid-div' style={{ marginLeft: "-140px" }}>
          {state.subCheck ? "" : "*select at least one subject"}
        </div>
      </div>
      {!show ? (
        <div className='submit-button' onClick={handleClick}>
          ASSIGN STUDENTS
        </div>
      ) : (
        <lottie-player
          src='https://assets3.lottiefiles.com/packages/lf20_aenqe9xz.json'
          background='transparent'
          speed='1'
          style={{
            width: "35px",
            textAlign: `center`,
            zIndex: "12",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          loop
          autoplay
        ></lottie-player>
      )}
    </div>
  );
};

export default MentorSignup;
