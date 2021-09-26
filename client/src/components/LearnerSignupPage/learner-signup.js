//@ts-check
import React from "react";
import './learner-signup.css'
import Scene from '../../assets/Scene.svg'

let classes = [6,7,8,9,10,11,12]
let primSubs = ['Hindi', 'Telugu', 'Maths', 'Science', 'Social']
let secSubs = ['Physics', 'Chemistry', 'Biology']
let langs = ['English', 'Hindi', 'Telugu', 'Tamil', 'Kannada', 'Malayalam']
let times = ["Morning", "Afternoon", "Evening"]


const LearnerSignup = () => {

    const [state, setState] = React.useState({name: "", email: "", prefLang: "", class: 6, subs: [], times: []})

    const handleChange = e => {
        if(e.target.name == 'class'){
            setState({...state, class: e.target.value, subs: []})
        }else if(e.target.name == 'subs' || e.target.name == 'times'){
            let field = e.target.name
            if(e.target.checked){
                setState({...state, [field]: [...state[field], e.target.value]})
            }else{
                var tmp = state[field].filter(item => item != e.target.value)
                setState({...state, [field]: tmp});
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
        <div className="main">
            <div>
                <div className='title'>Sign Up</div>
                <input className="input-field" name="name" onChange={handleChange}  placeholder="Name"/> <br/>
                <input className="input-field" name="email" onChange={handleChange}  placeholder="Email (optional)"/>
                <div>
                    <select className="input-field" name="prefLang" onChange={handleChange} value={state.prefLang}>
                        <option value="" disabled selected>Preferred Language</option>
                        { langs.map(lang => <option value={lang}>{lang}</option>) }
                    </select>  
                </div>
                <div className="bottom-row">
                    <div className="class-sub">
                        <label>Class/Subjects : </label>

                        <select onChange={handleChange} name="class" value={state.class}>
                            {classes.map(cls => <option value={cls}>Class {cls}</option>)}
                        </select>

                        {state.class <= 10 && <div>
                                {
                                    primSubs.map(sub => <div>
                                        <input type="Checkbox" name="subs" value={sub} checked={state.subs.includes(sub)} onChange={handleChange}/>
                                        <label>{sub}</label>
                                    </div>)
                                }
                            </div>
                        }
                        {state.class > 10 && <div>
                                {
                                    secSubs.map(sub => <div>
                                        <input type="Checkbox" name="subs" value={sub} checked={state.subs.includes(sub)} onChange={handleChange}/>
                                        <label>{sub}</label>
                                    </div>)
                                }
                            </div>
                        }
                    </div>
                    <div className="pref-time">
                        <h4>Preferred Timeslots : </h4>
                        <div>
                            {
                                times.map(time => <div>
                                    <input type="Checkbox" name="times" value={time} onChange={handleChange}/>
                                    <label>{time}</label>
                                </div>)
                            }
                        </div>
                    </div>
                </div>
                <div className="submit-button" onClick={handleClick}>ASSIGN MENTORS</div>
            </div>
            <div className="learner-img-div">
                <img src={Scene}/>
            </div>
        </div>
    )
}

export default LearnerSignup;

