import React, { useState } from 'react';
import { slides } from './slider-data';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import lola from "../../assets/lola_with_sparkle_trail.gif";
import "./getting-started.css";

const GettingStarted = () => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

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

   <div className = 'body'>
       <div className='container'>
    <div class="row justify-content-md-center">
    <div class="col-sm-10">
      
      <section className='slider'>
      <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide} />
      <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide} />
      {slides.map((slide, index) => {
        return (
          <div
            className={index === current ? 'slide active' : 'slide'}
            key={index}
          >
            {index === current && (
              <img src={slide.image} alt='travel image' className='image' />
            )}
          </div>
        );
      })}
    </section>
    </div>
    <div class="col-sm-2">
    <div className = 'right-pane'>
        <div className = 'container'>
            <div class = 'col'>
            <div class="row">
        <div className = 'lola-gif'>
        <img src={lola} style={{ width: "298px", height: "421px" }} alt='' />
        </div>
    </div>
    <div class="row">
        <div className = 'done-button'>
        <button
              className='init-signin-button'
              onClick={() => {
                window.location = "/common-guidelines";
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
