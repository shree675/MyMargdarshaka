//@ts-check
import React from "react";
import "./learner-signup.css";
import imgSrc from "../../assets/learner-signup.svg";
import data from "../../data";
import firebase from "../../firebase";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
//import match_learner from "../../../../backend/routes/matching.learner"

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
      /* const SUBJECTS = [];
      for (let subject in state.subs) {
        const item = {
          code: subject,
        };
        SUBJECTS.push(item);
      }
 */
      const subjects_list = [];
      console.log(state.subs);
      let subjects = state.subs;
      subjects.forEach((subject) => {
        console.log(state.Class, subject);
        let code = data.codes[subject] + state.Class;
        console.log(code);
        const item = {
          code: code,
          mentor_id: -1,
          chapters: data.default.chapters,
        };
        subjects_list.push(item);
      });
      console.log(subjects_list);

      const learner = {
        /* phone: LearnerSignup.phone, */ //pass as props
        phone: phone,
        name: state.name,
        email: state.email,
        language: state.prefLang,
        times: state.times,
        Class: state.Class,
        subjects: subjects_list,
      };
      const user = {
        phone: phone,
        user_type: "learner",
        valid_signup: true,
      };
      //TODO - call user table and check if sign up is unsuccessful or not (in case someon tries to break the system with multiple sign ups with same phone number)
      console.log("Printing learner before pushing:", learner); //remember to uncomment

      //remember to uncomment

      await axios
        .post(`/api/learner/signup/createlearner`, learner)
        .then((res) => console.log("Pushing Sign up data"));

      /* await axios.post(`/pref/createpreference`,pref).then(res=>console.log(''));
            window.name=this.state.username;
            window.location='/browse'; */
      //update valid user
      // related to firebase
      await axios
        .post(`/api/user/update/` + phone, user)
        .then((res) => console.log("User table has been updated", res));
      //Matching algorithm - we request the database using find() passing the
      //call match here
      /* let language = 'English'
      let times = ['Morning']
      let codes = ['HIN8']
      learner.language = language
      learner.times = times
      learner.codes = codes */

      //console.log(learner)
      //let mentors = {};
      //await axios
      //.post(`api/mentor/signup/findmatches/`, learner)
      //.then((res) => {
      //console.log("res", res.data);
      //mentors = res.data;
      //});
      let res = await axios.post(`api/mentor/signup/findmatches/`, learner);
      let mentors = res.data;
      //const mentors = await match_learner(language, time, codes)
      console.log(mentors);
      //now update learner

      for (let i = 0; i < learner.subjects.length; i++) {
        //console.log(learner.subjects[i].mentor_id)
        learner.subjects[i].mentor_id = mentors[i];
      }
      //console.log(learner.subjects)
      //updating the learner database with the assigned mentors
      console.log(learner);

      let res2 = await axios.post(
        `/api/learner/assign/update/` + phone,
        learner
      );

      console.log("Learner table has been updated ", res2);
      //.then((res) => console.log("Learner table has been updated", res));

      //updating the mentors database with the assigned students
      //get the current learners id
      //loop through each of the mentors in the mentors list and add the learner id to the correct class code
      const mentor = {};
      let id = mentors[0];

      let codes = [];
      learner.subjects.forEach((subject) => {
        codes.push(subject.code);
      });

      let learner_data = await axios.get(
        `/api/learner/get-data/phone/${phone}`
      );
      console.log(learner_data.data);
      let learner_id = learner_data.data._id.toString();
      console.log(learner_id);

      for (let i = 0; i < codes.length; i++) {
        let cur_code = codes[i];
        let cur_mentor_id = mentors[i];

        await axios.post(`/api/mentor/assign/update-by-id/${cur_mentor_id}`, {
          class_code: cur_code,
          learner_id,
        });
      }

      /* await axios
        .post(`/api/mentor/updateId/` + id, mentor)
        .then((res) => console.log("Learner table has been updated", res)); */
    }
  };

  return (
    <div className="learner-signup-main">
      <div style={{ width: "800px" }}>
        {/* Temporary logout button: */}
        <button
          onClick={() => {
            firebase.auth().signOut();
            window.location = "/init-signin";
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
