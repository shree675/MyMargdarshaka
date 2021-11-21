// @ts-check

import React, { useEffect } from "react";
import Chat from "../Chat/chat";
import "./learner-home.css";

// card component
const Card = (props) => {
  var showPendingTests = "";

  if (!props.details["hasPendingTests"]) {
    showPendingTests = "d-none";
  }

  // frontend UI of the card
  return (
    <div className='container-fluid p-0'>
      <div
        className='card text-center m-3'
        style={{
          backgroundColor: "#5D1049",
          color: "white",
          borderRadius: "20px",
        }}
      >
        <div className='card-body'>
          <h5 className='card-title mb-3'>{props.details["subject"]}</h5>
          <img
            className='rounded-circle mx-auto mb-3'
            style={{
              width: "100px",
              height: "100px",
              backgroundColor: "#ff0000",
            }}
            src={props.details["profile_picture_url"]}
          ></img>
          <h4 className='card-text mb-3'>{props.details["name"]}</h4>
          <p className='card-text'>Class {props.details["Class"]}</p>
          <p className='card-text'>{props.details["subject"]}</p>
          <p className='card-text'>{props.details["email"]}</p>

          <a href='#' className={"btn btn-warning text-white " + showPendingTests}>
            <b>YOU HAVE PENDING TESTS</b>
          </a>

          {props.details.userType === "learner" ? (
            <a
              className={"btn btn-warning text-white "}
              onClick={() => {
                props.setPageDetails({
                  pageName: "sub",
                  details: { ...props.details },
                });
              }}
            >
              <b>Details</b>
            </a>
          ) : (
            <div></div>
          )}

          {/* displaying the chat box */}
          {props.details["learner_id"] === undefined || props.details["mentor_id"] === undefined ? null : (
            <div className='card-chat'>
              <Chat
                collection_name={props.details["learner_id"] + props.details["mentor_id"]}
                userType={props.details.userType}
                name={props.details["name"]}
              />
            </div>
          )}
          {/* displaying the user status */}
          {props.details["is_banned"] ? <div className='banned-status'>This user has been banned</div> : null}
        </div>
      </div>
    </div>
  );
};

export default Card;
