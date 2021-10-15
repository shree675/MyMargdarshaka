//@ts-check
import React from "react";
import './mentor-signup.css'
import imgSrc from '../../assets/mentor-signup.svg'
import firebase from "../../firebase";
import axios from 'axios';
import { useEffect } from "react";
import { useState } from "react";

let classes = [6,7,8,9,10,11,12]
let primSubs = ['Hindi', 'Telugu', 'Maths', 'Science', 'Social']
let secSubs = ['Physics', 'Chemistry', 'Biology']
let langs = ['English', 'Hindi', 'Telugu', 'Tamil', 'Kannada', 'Malayalam']
let times = ["Morning", "Afternoon", "Evening"]


const MentorSignup = () => {

    const [state, setState] = React.useState({
        name: "",
        email: "",
        prefLang: "",
        prefTime: "",
        clsAndSub: {6:[], 7:[], 8:[], 9:[], 10:[], 11:[], 12:[]}
    })

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


    const handleChange = e => {
        if(e.target.name == "clsAndSub"){
            console.log(e.target.value);
            console.log(e.target.checked);
            let [sub, cls] = e.target.value.split(" ")
            cls = Number(cls)
            if(e.target.checked){
                // add
                setState({
                    ...state,
                    clsAndSub: {
                        ...state.clsAndSub,
                        [cls]: [...state.clsAndSub[cls], sub]
                    }
                })
            }else{
                // remove
                var tmp = state.clsAndSub[cls].filter(tSub => tSub != sub)
                setState({
                    ...state,
                    clsAndSub:{
                        ...state.clsAndSub,
                        [cls]: tmp
                    }
                })
            }
        }else{
            setState({...state, [e.target.name]: e.target.value})
        }
    }
    
    const handleClick = async () => {
        console.log("clicked");
        console.log(state);

        //setState({ ...state, ...temp });

        
        /* const SUBJECTS = []
        for(let subject in state.subs){
        const item  = {
            code: subject,

        }
        SUBJECTS.push(item);
        } */
    
        const mentor={
        phone: phone,
        name: state.name,
        email: state.email,
        language: state.prefLang,
        time: state.prefTime,
        }
        console.log("Printing mentor before pushing:", mentor)
        await axios.post(`/mentor/signup/creatementor`, mentor).then(res=>console.log('Pushing Sign up data'));

    }

    return(
        <div className="mentor-main">
            <div className="mentor-row-1">
                <div>
                    <div className='title'>Sign Up</div>
                    <input className="input-field" name="name" onChange={handleChange}  placeholder="Name"/> <br/>
                    <input className="input-field" name="email" onChange={handleChange}  placeholder="Email (optional)"/>
                    <div>
                        <select className="input-field" name="prefTime" onChange={handleChange} value={state.prefTime}>
                            <option value="" disabled selected>Preferred Timeslot</option>
                            { times.map(time => <option value={time}>{time}</option>) }
                        </select>  
                    </div>
                    <div>
                        <select className="input-field" name="prefLang" onChange={handleChange} value={state.prefLang}>
                            <option value="" disabled selected>Preferred Language</option>
                            { langs.map(lang => <option value={lang}>{lang}</option>) }
                        </select>  
                    </div>
                </div>
                <div className="img-div">
                    <img src={imgSrc}/>
                </div>
            </div>
            <div className="class-and-sub">
                {
                    classes.map(cls => <div>
                        <div className="class-name">Class {cls}</div>     
                        {
                            cls <= 10 && <div>
                                {
                                    primSubs.map(sub => <div style={{marginBottom: '10px'}}>
                                        <input type="Checkbox" name="clsAndSub" value={`${sub} ${cls}`} onChange={handleChange}/>
                                        <label>{sub}</label>
                                    </div>)
                                }
                            </div>
                        }
                        {
                            cls > 10 && <div>
                                {
                                    secSubs.map(sub => <div style={{marginBottom: '10px'}}>
                                        <input type="Checkbox" name="clsAndSub" value={`${sub} ${cls}`}  onChange={handleChange}/>
                                        <label>{sub}</label>
                                    </div>)
                                }
                            </div>
                        }
                    </div>)
                }
            </div>
            <div className="submit-button" onClick={handleClick}>ASSIGN STUDENTS</div>
        </div>
    )
}

export default MentorSignup;

