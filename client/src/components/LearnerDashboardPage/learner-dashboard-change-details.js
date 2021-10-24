import React, { useEffect, useState } from "react";
import axios from "axios";

function validate() {
  "use strict";

  let forms = document.querySelectorAll(".needs-validation");

  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
}

// TODO: Replace the hardcoded colors
const LearnerDashboardChangeDetails = ({ details, learner_id }) => {
  const [state, setState] = useState(details);

  useEffect(() => {
    console.log("state : ", state);
    setState(details);
  }, [details]);

  const handleChange = (e) => {
    const name = e.target.id;
    const value = e.target.value;
    setState({ ...state, [name]: value });
  };

  const handleClick = async () => {
    validate();
    // update DB
    await axios.post(`/api/learner/update/id/${learner_id}`, state);
  };

  return (
    <div className="learner-dashboard-change-details">
      <div
        className="card px-4 py-5 mt-3 mx-md-0 mx-auto"
        style={{ borderRadius: "20px", borderColor: "#FF0000" }}
      >
        <div className="d-flex justify-content-center">
          <div
            className="rounded-circle mb-3"
            style={{ backgroundColor: "red", height: "100px", width: "100px" }}
          ></div>
        </div>

        <div
          className="d-flex justify-content-center mb-3"
          style={{ color: "#FF0000", border: "1px solid #FF0000" }}
        >
          Change picture
        </div>

        <form className="needs-validation" noValidate>
          <label htmlFor="name" className="form-label">
            <strong>Name</strong>
          </label>
          <div class="input-group mb-3">
            <input
              id="name"
              type="text"
              class="form-control"
              value={state.name}
              onChange={handleChange}
              placeholder="First Last"
              required
            />
            <div className="valid-feedback">Looks good!</div>
            <div className="invalid-feedback">Please enter your name</div>
          </div>

          <label htmlFor="phone" className="form-label">
            <strong>Phone</strong>
          </label>
          <div class="input-group mb-3">
            <input
              id="phone"
              type="text"
              class="form-control"
              value={state.phone}
              onChange={handleChange}
              placeholder="9876543210"
              required
            />
            <div className="valid-feedback">Looks good!</div>
            <div className="invalid-feedback">
              Please enter your phone number
            </div>
          </div>

          <label htmlFor="email" className="form-label">
            <strong>Email</strong>
          </label>
          <div class="input-group mb-3">
            <input
              id="email"
              type="email"
              class="form-control"
              value={state.email}
              onChange={handleChange}
              placeholder="someone@example.com"
            />
          </div>

          <div className="d-flex justify-content-center">
            <button
              className="save-details-button rounded-pill px-5 py-3 mt-3"
              style={{
                backgroundColor: "#5D1049",
                color: "white",
                border: "none",
              }}
              type="submit"
              onClick={handleClick}
            >
              SAVE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LearnerDashboardChangeDetails;
