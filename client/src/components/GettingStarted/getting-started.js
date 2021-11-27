import React, { useState, useEffect } from "react";
import { slides } from "./slider-data";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import lola from "../../assets/lola_with_sparkle_trail.gif";
import "../GuidelinesPage/guidelines.css";
import "./getting-started.css";
import axios from "axios";
import firebase from "../../firebase";

const GettingStarted = () => {
  const [current, setCurrent] = useState(0);
  const [userType, setUserType] = useState("unknown");
  const [curuser, setCuruser] = useState(null);
  const length = slides.length;

  useEffect(() => {
    verify();
  }, []);

  const verify = async () => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        setCuruser(user.uid);
        //setPhone(user.phoneNumber);

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
                  //setName(data.name);
                  setUserType("learner");
                  console.log(userType);
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
                  //setName(data.name);
                  //console.log(data.name);
                  setUserType("mentor");
                  console.log(userType);
                }
              });
            })
            .catch((err) => {
              console.log(err.message);
            });
        });
      } else {
        setUserType("unknown");
        console.log(userType);
      }
    });
  };

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <div className='body' style={{ minHeight: "105vh", width: "100%" }}>
      <div className='container'>
        <div class='row justify-content-md-center p-5'>
          <div class='col-sm-10 mt-5'>
            <div id='carouselExampleIndicators' class='carousel slide' data-bs-ride='carousel'>
              <div class='carousel-indicators'>
                <button
                  type='button'
                  data-bs-target='#carouselExampleIndicators'
                  data-bs-slide-to='0'
                  class='active'
                  aria-current='true'
                  aria-label='Slide 1'
                ></button>
                <button type='button' data-bs-target='#carouselExampleIndicators' data-bs-slide-to='1' aria-label='Slide 2'></button>
                <button type='button' data-bs-target='#carouselExampleIndicators' data-bs-slide-to='2' aria-label='Slide 3'></button>
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
