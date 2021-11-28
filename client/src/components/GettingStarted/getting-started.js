//@ts-check

import React, { useState, useEffect } from "react";
import { slides } from "./slider-data";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import lola from "../../assets/lola_with_sparkle_trail.gif";
import "../GuidelinesPage/guidelines.css";
import "./getting-started.css";
import axios from "axios";
import firebase from "../../firebase";

// main function component
const GettingStarted = () => {
  const [current, setCurrent] = useState(0);
  const [userType, setUserType] = useState("unknown");
  const [curuser, setCuruser] = useState(null);
  const length = slides.length;

  useEffect(() => {
    verify();
  }, []);

  // verify the user session
  const verify = async () => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        setCuruser(user.uid);

        // obtaining the middleware token to protect routes
        var tk;
        user.getIdToken(true).then(async (idToken) => {
          tk = idToken;
          // setting the user instance
          await axios
            .get("/api/learner/login/submitlearner", { headers: { Authorization: `Bearer ${tk}` } })
            .then((e) => {
              e.data.map((data) => {
                if (data.phone === user.phoneNumber) {
                  setUserType("learner");
                }
              });
            })
            .catch((err) => {
              console.log(err.message);
            });
          await axios
            .get("/api/mentor/login/submitmentor", { headers: { Authorization: `Bearer ${tk}` } })
            .then((e) => {
              e.data.map((data) => {
                if (data.phone === user.phoneNumber) {
                  setUserType("mentor");
                }
              });
            })
            .catch((err) => {
              console.log(err.message);
            });
        });
      } else {
        setUserType("unknown");
      }
    });
  };

  // function to switch to next slide in carousel
  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  // function to switch to previous slide in carousel
  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  // displaying the frontend of the page
  return (
    <div className='body' style={{ minHeight: "105vh", width: "100%" }}>
      <div className='container'>
        <div class='row justify-content-md-center p-5'>
          <div class='col-sm-10 mt-5'>
            <div id='carouselExampleIndicators' class='carousel slide' data-bs-ride='carousel'>
              <div class='carousel-indicators'>
                {/* saving all slides and swtiching to them */}
                <button
                  type='button'
                  data-bs-target='#carouselExampleIndicators'
                  data-bs-slide-to='0'
                  class='active'
                  aria-current='true'
                  aria-label='Slide 1'
                ></button>
                <button type='button' data-bs-target='#carouselExampleIndicators' data-bs-slide-to='3' aria-label='Slide 4'></button>
                <button type='button' data-bs-target='#carouselExampleIndicators' data-bs-slide-to='4' aria-label='Slide 5'></button>
                <button type='button' data-bs-target='#carouselExampleIndicators' data-bs-slide-to='5' aria-label='Slide 6'></button>
                <button type='button' data-bs-target='#carouselExampleIndicators' data-bs-slide-to='6' aria-label='Slide 7'></button>
                <button type='button' data-bs-target='#carouselExampleIndicators' data-bs-slide-to='7' aria-label='Slide 8'></button>
                <button type='button' data-bs-target='#carouselExampleIndicators' data-bs-slide-to='8' aria-label='Slide 9'></button>
                <button type='button' data-bs-target='#carouselExampleIndicators' data-bs-slide-to='9' aria-label='Slide 10'></button>
                <button type='button' data-bs-target='#carouselExampleIndicators' data-bs-slide-to='10' aria-label='Slide 11'></button>
                <button type='button' data-bs-target='#carouselExampleIndicators' data-bs-slide-to='11' aria-label='Slide 12'></button>
              </div>
              <div class='carousel-inner'>
                <div class='carousel-item active'>
                  <img class='d-block w-100' src={slides[0].image} alt='First slide' />
                </div>
                <div class='carousel-item'>
                  <img class='d-block w-100' src={slides[1].image} alt='Second slide' />
                </div>
                <div class='carousel-item'>
                  <img class='d-block w-100' src={slides[2].image} alt='Third slide' />
                </div>
                <div class='carousel-item'>
                  <img class='d-block w-100' src={slides[3].image} alt='Fourth slide' />
                </div>
                <div class='carousel-item'>
                  <img class='d-block w-100' src={slides[4].image} alt='Fifth slide' />
                </div>
                <div class='carousel-item'>
                  <img class='d-block w-100' src={slides[5].image} alt='Sixth slide' />
                </div>
                <div class='carousel-item'>
                  <img class='d-block w-100' src={slides[6].image} alt='Seventh slide' />
                </div>
                <div class='carousel-item'>
                  <img class='d-block w-100' src={slides[7].image} alt='Eigth slide' />
                </div>
                <div class='carousel-item'>
                  <img class='d-block w-100' src={slides[8].image} alt='Nineth slide' />
                </div>
                <div class='carousel-item'>
                  <img class='d-block w-100' src={slides[9].image} alt='Tenth slide' />
                </div>
                <div class='carousel-item'>
                  <img class='d-block w-100' src={slides[10].image} alt='Eleventh slide' />
                </div>
                <div class='carousel-item'>
                  <img class='d-block w-100' src={slides[11].image} alt='Twelfth slide' />
                </div>
              </div>
              <button class='carousel-control-prev' type='button' data-bs-target='#carouselExampleIndicators' data-bs-slide='prev'>
                <span class='carousel-control-prev-icon' aria-hidden='true'></span>
                <span class='visually-hidden'>Previous</span>
              </button>
              <button class='carousel-control-next' type='button' data-bs-target='#carouselExampleIndicators' data-bs-slide='next'>
                <span class='carousel-control-next-icon' aria-hidden='true'></span>
                <span class='visually-hidden'>Next</span>
              </button>
            </div>
          </div>
          <div class='col-sm-2'>
            <div className='right-pane'>
              <div className='container'>
                <div class='col'>
                  <div class='row'>
                    <div className='lola-gif'>
                      <img src={lola} style={{ width: "278px", height: "421px" }} alt='' />
                    </div>
                  </div>
                  <div class='row'>
                    <div className='done-button'>
                      <button
                        className='init-signin-button'
                        onClick={() => {
                          if (userType === "learner") window.location = "/learner-guidelines";
                          else if (userType === "mentor") window.location = "/mentor-guidelines";
                          else window.location = "/common-guidelines";
                        }}
                      >
                        DONE
                      </button>

                      <div className='optional-signin'>
                        {userType === null ? null : userType === "learner" || userType === "mentor" ? null : (
                          <button
                            className='init-signin-button'
                            onClick={() => {
                              // if user is not logged in
                              window.location = "/init-signin";
                            }}
                          >
                            SIGN IN
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GettingStarted;
