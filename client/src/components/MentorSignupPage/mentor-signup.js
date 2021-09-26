//@ts-check
import React from "react";
import './mentor-signup.css'
import mainLogo from '../../assets/Group.svg'

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
    
    const handleClick = () => {
        console.log("clicked");
        console.log(state);
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
                    <img src={mainLogo}/>
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

