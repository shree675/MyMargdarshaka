//@ts-check

import React, { useEffect } from "react";
import main_logo from "../../assets/main-logo.svg";
import homepage from "../../assets/homepage.gif";
import "@lottiefiles/lottie-player";
import "./landing.css";

// main page component
const LandingPage = () => {
  // when arrow is clicked
  const scrollDown = () => {
    window.scrollTo(0, window.innerHeight + window.scrollY);
  };

  /* useEffect(() => {
    localStorage.clear();
  },[]); */

  // frontend component to display the homepage
  return (
    <div className='landing-body'>
      <button className='landing-gif' onClick={() => (window.location = "/common-guidelines")}>
        <img src={homepage} className='landing-gif-img' />
      </button>
      <div className='landing-content1' style={{ height: window.innerHeight }}>
        <div className='landing-content1-body'>
          <div className='landing-content1-body-comp'>
            <div className='landing-content1-img'>
              <lottie-player
                src='https://assets4.lottiefiles.com/packages/lf20_hzfmxrr7.json'
                background='transparent'
                speed='1'
                loop
                autoplay
              ></lottie-player>
            </div>
          </div>
          <div className='landing-content1-body-comp'>
            <div className='landing-title'>Welcome to</div>
            <img src={main_logo} className='landing-logo'></img>
            <div className='landing-name'>MyMargdarshaka</div>
            <button
              className='landing-button'
              onClick={() => {
                window.location = "/init-signin";
              }}
            >
              GET STARTED
              <span style={{ color: "gray" }}></span>
            </button>
          </div>
        </div>
        <button className='scroll-down-button' onClick={scrollDown}>
          {
            <lottie-player
              src='https://assets4.lottiefiles.com/private_files/lf30_04wi8isl.json'
              background='transparent'
              speed='1'
              style={{ width: "50px" /* , height: "50px" */, textAlign: `center` }}
              loop
              autoplay
            ></lottie-player>
          }
        </button>
      </div>
      <div className='landing-content2'>
        <span className='landing-bottom-name'>MyMargdarshaka</span> is your first step to education and enlightenment! Are you a school
        student but are unable to attend traditional school? OR, Are you someone who wants to give back by teaching and mentoring
        students but cannot reach traditional schools? We connect students and mentors who cannot avail traditional schools for various
        financial and logistical reasons. Mentors and students associate with the National Institute of Open Schooling (NIOS) by the
        Government of India to complete class 10 and Class 12 certification. Get Started to be a part of My Margdarshaka as a learner
        or a mentor!
        <div style={{ height: "110px" }}></div>
      </div>
    </div>
  );
};

export default LandingPage;
