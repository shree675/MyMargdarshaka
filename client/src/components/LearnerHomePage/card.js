// @ts-check

import React from "react";

const Card = () => {
  return (
    <div className="container-fluid p-0">
        <div
          className="card text-center m-3"
          style={{
            backgroundColor: "#5D1049",
            color: "white",
            borderRadius: "20px",
          }}
        >
          <div className="card-body">
            <h5 className="card-title mb-3">MATHEMATICS</h5>
            <div
              className="rounded-circle mx-auto mb-3"
              style={{
                width: "100px",
                height: "100px",
                backgroundColor: "#ff0000",
              }}
            ></div>
            <h4 className="card-text mb-3">Inderpal Ankur</h4>
            <p className="card-text">Class 9</p>
            <p className="card-text">Hindi</p>
            <p className="card-text">abc@example.com</p>
            <p className="card-text">9876543210</p>

            {/* add the class of d-none to hide the button */}
            <a href="#" className="btn btn-warning text-white">
              <b>YOU HAVE PENDING TESTS</b>
            </a>
          </div>
        </div>
    </div>
  );
};

export default Card;
