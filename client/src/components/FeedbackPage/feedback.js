//@ts-check

import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/learner-navbar";
import TextField from "@mui/material/TextField";
import "./feedback.css";
import feedbackcomp from "../../assets/feedback-comp.svg";
import { styled } from "@mui/material/styles";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import firebase from "../../firebase";

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
            border: "none",
            borderBottom: "2px solid #4e0d3a",
            borderRadius: "0px",
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
    const [issueType, setIssueType] = useState(1);
    const [issue, setIssue] = useState(null);
    const [subject, setSubject] = useState(null);
    const [body, setBody] = useState(null);
    const [curuser, setCuruser] = useState(null);
    const [phone, setPhone] = useState(null);

    useEffect(() => {
        verify();
    }, []);

    const verify = async () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setCuruser(user.uid);
                setPhone(user.phoneNumber);
            } else {
                window.location = "/initsignin";
            }
        });
    };

    return (
        <div>
            <Navbar />
            <div style={{ height: "35px", backgroundColor: "#720d5d" }}></div>
            <div className='feedback-content'>
                <div className='feedback-content-left'>
                    <img src={feedbackcomp} className='feedback-img'></img>
                </div>
                <div className='feedback-content-right'>
                    <CssTextField
                        id='subject-input'
                        label='Subject'
                        variant='outlined'
                        fullWidth
                        size='small'
                        color='error'
                        onChange={(e) => {
                            setSubject(e.target.value);
                        }}
                    />
                    <br></br>
                    <br></br>
                    <Select
                        id='issue-type'
                        value={issueType}
                        label='Issue Type'
                        onChange={(e) => {
                            setIssueType(e.target.value);
                            if (e.target.value == 10) {
                                setIssue("Report Abuse");
                            } else if (e.target.value == 20) {
                                setIssue("Platform Issue");
                            } else if (e.target.value == 30) {
                                setIssue("Question");
                            } else if (e.target.value == 40) {
                                setIssue("Other");
                            } else {
                                setIssue(null);
                            }
                        }}
                        fullWidth
                        size='small'
                    >
                        <MenuItem value={1} style={{ color: "gray" }}>
                            <span style={{ color: "gray" }}>Type of Issue</span>
                        </MenuItem>
                        <MenuItem value={10}>Report Abuse</MenuItem>
                        <MenuItem value={20}>Platform Issue</MenuItem>
                        <MenuItem value={30}>Question</MenuItem>
                        <MenuItem value={40}>Other</MenuItem>
                    </Select>
                    <br></br>
                    <br></br>
                    <CssTextField
                        id='issue-body'
                        label='Body of the issue'
                        variant='outlined'
                        fullWidth
                        size='small'
                        color='error'
                        multiline
                        rows={12}
                        onChange={(e) => {
                            setBody(e.target.value);
                        }}
                    />
                    <div className='feedback-height'></div>
                    <button
                        className='feedback-button'
                        onClick={() => {
                            var err = 0;
                            if (subject == null || issue == null || body == null) {
                                err = 1;
                                alert("Please fill all the entries");
                            }
                            var feedback = {
                                phone: phone,
                                issueSubject: subject,
                                issueType: issue,
                                issueBody: body,
                                timestamp: new Date().toString(),
                            };
                            if (!err) {
                                axios
                                    .post("/api/feedback/api/submitfeedback", feedback)
                                    .then((res) => console.log(res))
                                    .catch((err) => console.error(err));
                            }
                        }}
                    >
                        SUBMIT
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Feedback;
