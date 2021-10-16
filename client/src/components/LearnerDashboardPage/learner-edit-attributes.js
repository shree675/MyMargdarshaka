import React from "react";

const LearnerDashboardEditAttributes = () => {
  return (
    <div
      className="container p-xl-0 card mx-auto mt-3 mx-xl-0"
      style={{ border: "1px solid #ff0000", borderRadius: "20px" }}
    >
      <div className="row justify-content-center mt-4">
        <div className="col-md-4 my-md-3" style={{ color: "#5D1049" }}>
          <strong>ADD OR REMOVE SUBJECTS</strong>
          <ul className="list-group" id="preferred-subjects">
            <li className="list-group-item">
              <input className="form-check-input me-1" type="checkbox" />
              First checkbox
            </li>
            <li className="list-group-item">
              <input className="form-check-input me-1" type="checkbox" />
              Second checkbox
            </li>
            <li className="list-group-item">
              <input className="form-check-input me-1" type="checkbox" />
              Third checkbox
            </li>
            <li className="list-group-item">
              <input className="form-check-input me-1" type="checkbox" />
              Fourth checkbox
            </li>
            <li className="list-group-item">
              <input className="form-check-input me-1" type="checkbox" />
              Fifth checkbox
            </li>
          </ul>
        </div>

        <div className="col-md-4 my-3" style={{ color: "#5D1049" }}>
          <strong>PREFERRED TIMES</strong>
          <ul className="list-group" id="preferred-subjects">
            <li className="list-group-item">
              <input className="form-check-input me-1" type="checkbox" />
              MORNING
            </li>
            <li className="list-group-item">
              <input className="form-check-input me-1" type="checkbox" />
              AFTERNOON
            </li>
            <li className="list-group-item">
              <input className="form-check-input me-1" type="checkbox" />
              EVENING
            </li>
          </ul>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-4 col-12 my-3" style={{ color: "#5D1049" }}>
          <strong>PREFERRED LANGUAGES</strong>
          <ul className="list-group" id="preferred-subjects">
            <li className="list-group-item">
              <input className="form-check-input me-1" type="checkbox" />
              ENGLISH
            </li>
            <li className="list-group-item">
              <input className="form-check-input me-1" type="checkbox" />
              HINDI
            </li>
            <li className="list-group-item">
              <input className="form-check-input me-1" type="checkbox" />
              TELUGU
            </li>
            <li className="list-group-item">
              <input className="form-check-input me-1" type="checkbox" />
              KANNADA
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center">
        <a
          className="rounded-pill btn px-3 mb-3"
          style={{ border: "none", backgroundColor: "#5D1049", color: "white" }}
        >
          SAVE
        </a>
      </div>
    </div>
  );
};

export default LearnerDashboardEditAttributes;
