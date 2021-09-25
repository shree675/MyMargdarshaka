//@ts-check
import React, { useEffect } from "react";
import styled from 'styled-components'
import './learner-signup.css'

let classes = [6,7,8,9,10,11,12]
let primSubs = ['Hindi', 'Telugu', 'Maths', 'Science', 'Social']
let secSubs = ['Physics', 'Chemistry', 'Biology']
let langs = ['English', 'Hindi', 'Telugu', 'Tamil', 'Kannada', 'Malayalam']
let times = ["Morning", "Afternoon", "Evening"]

const PrefLang = () => {

    const [state, setState] = React.useState({lang : ""});

    const handleLang = (e) => {
        console.log(e.target.value);
        setState({...state, lang: e.target.value})
    }

    return <div>
            <select className="input-field" style={{color:'#4E0D3A', height: '30px'}}  onChange={handleLang} value={state.lang}>
                <option value="" disabled selected>Preferred Language</option>
                { langs.map(lang => <option value={lang}>{lang}</option>) }
            </select>  
    </div>
}

const Subj = (props) => {
    return <div>
        <input type="Checkbox" name={props.subj} onChange={props.handle}/>
        <label>{props.subj}</label>
    </div>
}

const ClassAndSubs = () => {

    const [state, setState] = React.useState({cls : 6, subs : []});

    const handleChange = (e) => {
        setState({
            cls : e.target.value,
            subs : []
        })
    }

    const handleCheck = (e) => {
        console.log(e.target.name);
        console.log(e.target.checked);
    }

    return <div className="class-sub">

            <label>Class/Subjects : </label>

            <select onChange={handleChange} value={state.cls}>
                {classes.map(cls => <option value={cls}>Class {cls}</option>)}
            </select>

            {state.cls <= 10 && <div>{primSubs.map(sub => <Subj subj={sub} handle={handleCheck}/>)}</div>}
            {state.cls > 10 && <div>{secSubs.map(sub => <Subj subj={sub} handle={handleCheck}/>)}</div>}
    </div>
}


const PrefTime = () => {

    const [state, setState] = React.useState([]);

    const handleCheck = (e) => {
        if(e.target.checked)
            setState([...state, e.target.name]);
        else{
            var tmp = state.filter(slot => slot != e.target.name)
            setState(tmp);
        }
    }

    useEffect(() => {console.log(state);}, [state]);

    return <div className="pref-time">

                <h4>Preferred Timeslots : </h4>
                <div>
                    {
                        times.map(time => <div>
                            <input type="Checkbox" name={time} onChange={handleCheck}/>
                            <label>{time}</label>
                        </div>)
                    }
                </div>
    </div>
}




const LearnerSignup = () => {

    return <div className="main">
                <div className='title'>Sign Up</div>
                <input className="input-field" name="Name"  placeholder="Name"/> <br/>
                <input className="input-field" name="Email"  placeholder="Email (optional)"/>
                <PrefLang/>
                <div className="bottom-row">
                    <ClassAndSubs/>
                    <PrefTime/>
                </div>
    </div>
}

export default LearnerSignup;

