// @ts-check

import React, { useEffect } from "react";
import Chat from "../Chat/chat";
import "./learner-home.css";
import firebase from "../../firebase";

const Card = (props) => {
  var showPendingTests = "";
  if (!props.details["hasPendingTests"]) {
    showPendingTests = "d-none";
  }

  var showDetails = "";
  if (!props.details["hasConsented"]) {
    showDetails = "d-none";
  }

  var showConsentButton = "";
  if (props.details["hasConsented"]) {
    showConsentButton = "d-none";
  }

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
          <h5 className="card-title mb-3">{props.details["subject"]}</h5>
          <div
            className="rounded-circle mx-auto mb-3"
            style={{
              width: "100px",
              height: "100px",
              backgroundColor: "#ff0000",
            }}
          ></div>
          <h4 className="card-text mb-3">{props.details["name"]}</h4>
          <p className="card-text">Class {props.details["Class"]}</p>
          <p className="card-text">{props.details["subject"]}</p>
          <p className={"card-text  " + showDetails}>
            {props.details["email"]}
          </p>
          <p className={"card-text  " + showDetails}>
            {props.details["phone"]}
          </p>

          <a
            href="#"
            className={"btn btn-warning text-white " + showPendingTests}
          >
            <b>YOU HAVE PENDING TESTS</b>
          </a>

          <a
            href="#"
            className={"btn btn-warning text-white " + showConsentButton}
          >
            <b>CLICK HERE TO SHARE YOUR NUMBER</b>
          </a>
          <div className="card-chat">
            <Chat
              collection_name={
                props.details["learner_id"] + props.details["mentor_id"]
              }
              userType={props.details.userType}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
