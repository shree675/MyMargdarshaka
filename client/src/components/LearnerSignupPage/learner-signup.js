//@ts-check
import React from "react";
import "./learner-signup.css";
import imgSrc from "../../assets/learner-signup.svg";
import data from "../../data";
import firebase from "../../firebase";

const { classes, primSubs, secSubs, langs, times } = data;

const LearnerSignup = () => {
  const [state, setState] = React.useState({
    name: "",
    email: "",
    prefLang: "",
    class: 6,
    subs: [],
    times: [],
    nameValid: true,
    emailValid: true,
    langValid: true,
    subValid: true,
    timeValid: true,
  });

  const handleChange = (e) => {
    if (e.target.name == "class") {
      setState({ ...state, class: e.target.value, subs: [] });
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

  const handleClick = () => {
    console.log("clicked");

    let temp = {};

    if (state.name.length == 0) temp.nameValid = false;
    else temp.nameValid = true;

    if (state.email.length == 0) temp.emailValid = false;
    else temp.emailValid = true;

    if (state.prefLang.length == 0) temp.langValid = false;
    else temp.langValid = true;

    if (state.subs.length == 0) temp.subValid = false;
    else temp.subValid = true;

    if (state.times.length == 0) temp.timeValid = false;
    else temp.timeValid = true;

    setState({ ...state, ...temp });

    console.log(state);
  };

  return (
    <div className="learner-signup-main">
      <div style={{ width: "800px" }}>
        {/* Temporary logout button: */}
        <button
          onClick={() => {
            firebase.auth().signOut();
            window.location = "/authentication";
          }}
        >
          Logout (temporary button here)
        </button>
        <div className="learner-signup-title">Sign Up</div>
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
        <div className="valid-div">
          {state.emailValid ? "" : "*this field is required"}
        </div>
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
            <option value="" disabled selected>
              Preferred Language
            </option>
            {langs.map((lang) => (
              <option value={lang}>{lang}</option>
            ))}
          </select>
        </div>
        <div className="learner-signup-bottom-row">
          <div className="learner-signup-class-sub">
            <label>Class & Subjects : </label>

            <select onChange={handleChange} name="class" value={state.class}>
              {classes.map((cls) => (
                <option value={cls}>Class {cls}</option>
              ))}
            </select>

            {state.class <= 10 && (
              <div>
                {primSubs.map((sub) => (
                  <div>
                    <input
                      type="Checkbox"
                      name="subs"
                      value={sub}
                      checked={state.subs.includes(sub)}
                      onChange={handleChange}
                    />
                    <label>{sub}</label>
                  </div>
                ))}
              </div>
            )}
            {state.class > 10 && (
              <div>
                {secSubs.map((sub) => (
                  <div>
                    <input
                      type="Checkbox"
                      name="subs"
                      value={sub}
                      checked={state.subs.includes(sub)}
                      onChange={handleChange}
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
