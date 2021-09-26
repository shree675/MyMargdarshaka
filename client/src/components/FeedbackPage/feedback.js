//@ts-check

import React from "react";
import Navbar from "../Navbar/navbar";
import TextField from "@mui/material/TextField";
import "./feedback.css";
import feedbackcomp from "../../assets/feedback-comp.svg";

const Feedback = () => {
    return (
        <div>
            <Navbar />
            <div style={{ height: "35px", backgroundColor: "#720d5d" }}></div>
            <div className='feedback-content'>
                <div className='feedback-content-left'>
                    <img src={feedbackcomp} className='feedback-img'></img>
                </div>
                <div className='feedback-content-right'>
                    <TextField id='subject-input' label='Subject' variant='outlined' fullWidth size='small' color='error' />
                    <br></br>
                    <br></br>
                    <TextField id='issue-type' label='Type of issue' variant='outlined' fullWidth size='small' color='error' />
                    <br></br>
                    <br></br>
                    <TextField
                        id='issue-type'
                        label='Body of the issue'
                        variant='outlined'
                        fullWidth
                        size='small'
                        color='error'
                        multiline
                        rows={12}
                    />
                    <br></br>
                    <br></br>
                    <br></br>
                    <button className='feedback-button'>SUBMIT</button>
                </div>
            </div>
        </div>
    );
};

export default Feedback;
