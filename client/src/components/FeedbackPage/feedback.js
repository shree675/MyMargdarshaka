//@ts-check

import React from "react";
import Navbar from "../Navbar/learner-navbar";
import TextField from "@mui/material/TextField";
import "./feedback.css";
import feedbackcomp from "../../assets/feedback-comp.svg";
import { styled } from "@mui/material/styles";

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
                    <CssTextField id='subject-input' label='Subject' variant='outlined' fullWidth size='small' color='error' />
                    <br></br>
                    <br></br>
                    <CssTextField id='issue-type' label='Type of issue' variant='outlined' fullWidth size='small' color='error' />
                    <br></br>
                    <br></br>
                    <CssTextField
                        id='issue-type'
                        label='Body of the issue'
                        variant='outlined'
                        fullWidth
                        size='small'
                        color='error'
                        multiline
                        rows={12}
                    />
                    <div className='feedback-height'></div>
                    <button className='feedback-button'>SUBMIT</button>
                </div>
            </div>
        </div>
    );
};

export default Feedback;
