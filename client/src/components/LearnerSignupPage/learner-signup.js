//@ts-check
import React from "react";
import "./learner-signup.css";
import imgSrc from "../../assets/learner-signup.svg";
import data from "../../data";
import firebase from "../../firebase";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const { classes, primSubs, secSubs, langs, times } = data;

//need to pass phone number as props
const LearnerSignup = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    prefLang: "",
    Class: 6,
    subs: [],
    times: [],
    nameValid: true,
    langValid: true,
    subValid: true,
    timeValid: true,
  });
  const [curuser, setCuruser] = useState("No user is logged in");
  const [phone, setPhone] = useState("Null phone");

  useEffect(() => {
    verify();
  }, []);

  // checks if a user is already logged in
  const verify = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setCuruser(user.uid); // user.uid is the unique identifier of the user
        // alert("You are logged in as " + user.uid);
        console.log(user.phoneNumber);
        setPhone(user.phoneNumber);
      } else {
        setCuruser("No user found");
      }
    });
    console.log(curuser);
  };

  const handleChange = (e) => {
    if (e.target.name == "class") {
      setState({ ...state, Class: e.target.value, subs: [] });
    } else if (e.target.name == "subs" || e.target.name == "times") {
      let field = e.target.name;
      if (e.target.checked) {
        setState({ ...state, [field]: [...state[field], e.target.value] });
      } else {
        var tmp = state[field].filter((item) => item != e.target.value);
        setState({ ...state, [field]: tmp });
      }
    } else {
      setState({ ...state, [e.target.name]: e.target.value });
    }
  };

  const handleClick = async () => {
    //assign mentors button clicked
    //on sign-up, we first push all sign up data to database
    console.log("clicked");

    let temp = {};

    if (state.name.length == 0) temp.nameValid = false;
    else temp.nameValid = true;

    if (state.prefLang.length == 0) temp.langValid = false;
    else temp.langValid = true;

    if (state.subs.length == 0) temp.subValid = false;
    else temp.subValid = true;

    if (state.times.length == 0) temp.timeValid = false;
    else temp.timeValid = true;

    let ok = true;
    let tempKeys = Object.keys(temp);
    tempKeys.forEach((key) => {
      ok = ok && temp[key];
    });

    if (!ok) {
      setState({ ...state, ...temp });
    } else {
      console.log(state);
      // push to DB
    }

    const SUBJECTS = [];
    for (let subject in state.subs) {
      const item = {
        code: subject,
      };
      SUBJECTS.push(item);
    }

    const learner = {
      /* phone: LearnerSignup.phone, */ //pass as props
      phone: phone,
      name: state.name,
      email: state.email,
      language: state.prefLang,
      time: state.times,
      Class: state.Class,
      subjects: SUBJECTS,
    };

    console.log("Printing learner before pushing:", learner);
    await axios
      .post(`/api/learner/signup/createlearner`, learner)
      .then((res) => console.log("Pushing Sign up data"));
    /* await axios.post(`/pref/createpreference`,pref).then(res=>console.log(''));
            window.name=this.state.username;
            window.location='/browse'; */

    //Matching algorithm - we request the database using find() passing the
  };

  return (
    <div className="learner-signup-main">
      <div style={{ width: "800px" }}>
        {/* Temporary logout button: */}
        <button
          onClick={() => {
            firebase.auth().signOut();
            window.location = "/initsignin";
          }}
        >
          Logout (temporary button here)
        </button>
        <div className="learner-signup-title">Sign Up</div>
        <div className="learner-signup-img-div-phone">
          <img
            src={imgSrc}
            style={{ width: "80%", margin: "0", padding: "0" }}
          />
        </div>
        <div className="valid-div">
          {state.nameValid ? "" : "*this field is required"}
        </div>
        <input
          className="learner-signup-input-field"
          name="name"
          onChange={handleChange}
          placeholder="Name"
        />{" "}
        <br />
        <input
          type="email"
          className="learner-signup-input-field"
          name="email"
          onChange={handleChange}
          placeholder="Email (optional)"
        />
        <div>
          <div className="valid-div">
            {state.langValid ? "" : "*this field is required"}
          </div>
          <select
            className="learner-signup-input-field"
            name="prefLang"
            onChange={handleChange}
            value={state.prefLang}
          >
            <option
              className="learner-signup-dropdown"
              value=""
              disabled
              selected
            >
              Preferred Language
            </option>
            {langs.map((lang) => (
              <option className="learner-signup-dropdown" value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>
        <div className="learner-signup-bottom-row">
          <div className="learner-signup-class-sub">
            <span className="learner-signup-class-label">
              Class & Subjects :{" "}
            </span>

            <select onChange={handleChange} name="class" value={state.Class}>
              {classes.map((cls) => (
                <option value={cls}>Class {cls}</option>
              ))}
            </select>

            {state.Class <= 10 && (
              <div>
                {primSubs.map((sub) => (
                  <div>
                    <input
                      type="Checkbox"
                      name="subs"
                      value={sub}
                      checked={state.subs.includes(sub)}
                      onChange={handleChange}
                      id="learner-checkbox"
                    />
                    <label>{sub}</label>
                  </div>
                ))}
              </div>
            )}
            {state.Class > 10 && (
              <div>
                {secSubs.map((sub) => (
                  <div>
                    <input
                      type="Checkbox"
                      name="subs"
                      value={sub}
                      checked={state.subs.includes(sub)}
                      onChange={handleChange}
                      id="learner-checkbox"
                    />
                    <label>{sub}</label>
                  </div>
                ))}
              </div>
            )}
            <div className="valid-div">
              {state.subValid ? "" : "*this field is required"}
            </div>
          </div>

          <div className="learner-signup-pref-time">
            <div className="learner-signup-pref-time-title">
              Preferred Timeslots :{" "}
            </div>
            <div>
              {times.map((time) => (
                <div>
                  <input
                    type="Checkbox"
                    name="times"
                    value={time}
                    onChange={handleChange}
                    id="learner-checkbox"
                  />
                  <label>{time}</label>
                </div>
              ))}
            </div>
            <div className="valid-div">
              {state.timeValid ? "" : "*this field is required"}
            </div>
          </div>
        </div>
        <div className="learner-signup-submit-button" onClick={handleClick}>
          ASSIGN MENTORS
        </div>
      </div>
      <div className="learner-signup-img-div">
        <img src={imgSrc} />
      </div>
    </div>
  );
};

export default LearnerSignup;
