//@ts-check

import React, { Component } from "react";
import landing_page_comp from "../../assets/landing-page-comp.svg";
import main_logo from "../../assets/main-logo.svg";
import "./landing.css";

class LandingPage extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className='landing-body'>
                <div className='landing-content1'>
                    <div className='landing-content1-body'>
                        <div className='landing-content1-body-comp'>
                            <img src={landing_page_comp} className='landing-content1-img'></img>
                        </div>
                        <div className='landing-content1-body-comp'>
                            <div style={{ fontSize: "3.4vw", marginTop: "4vw" }}>Welcome to</div>
                            <img src={main_logo} className='landing-logo'></img>
                            <div style={{ fontSize: "4vw", marginTop: "3vw", fontWeight: "bold" }}>MyMargdarshaka</div>
                            <button
                                className='landing-button'
                                onClick={() => {
                                    window.location = "/initsignin";
                                }}
                            >
                                GET STARTED
                                <span style={{ color: "gray" }}></span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className='landing-content2'>
                    <span style={{ fontSize: "2.25vw", color: "white" }}>MyMargdarshaka</span> is your first step to education and
                    enlightenment! Are you a school student but are unable to attend traditional school? OR, Are you someone who wants
                    to give back by teaching and mentoring students but cannot reach traditional schools? We connect students and
                    mentors who cannot avail traditional schools for various financial and logistical reasons. Mentors and students
                    associate with the National Institute of Open Schooling (NIOS) by the Government of India to complete class 10 and
                    Class 12 certification. Get Started to be a part of My Margdarshaka as a learner or a mentor!
                    <div style={{ height: "35px" }}></div>
                </div>
            </div>
        );
    }
}

export default LandingPage;
