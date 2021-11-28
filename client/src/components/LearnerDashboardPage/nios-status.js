import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "../Common/button";

// TODO (Kranthi): Add animations to the buttons
const NIOSStatus = ({ details, handleNiosSave }) => {
  const [niosStatus, setNiosStatus] = useState(details.NIOS_status);

  useEffect(() => {
    setNiosStatus(details.NIOS_status);
  }, [details]);

  const handleChangeNiosStatus = (e) => {
    console.log("nios : ", e.target.value);
    setNiosStatus(e.target.value);
  };

  return (
    <div className="nios-status mb-3">
      <div
        className="container mx-auto card mt-3"
        style={{ border: "1px solid #FF0000", borderRadius: "20px" }}
      >
        <h1 className="m-3" style={{ color: "#5D1049" }}>
          <strong>NIOS Status</strong>
        </h1>
        <div className="row">
          <div className="col">
            <button
              className="btn rounded-pill m-3 p-3"
              style={{
                borderColor: "#5D1049",
                ...(niosStatus ===
                "I HAVE REGISTERED FOR NIOS AND TOOK THE EXAM"
                  ? { background: "#5D1049", color: "white" }
                  : {}),
              }}
              value="I HAVE REGISTERED FOR NIOS AND TOOK THE EXAM"
              onClick={handleChangeNiosStatus}
            >
              I HAVE REGISTERED FOR NIOS AND TOOK THE EXAM
            </button>
          </div>
          <div className="col">
            <button
              className="btn rounded-pill m-3 p-3"
              style={{
                borderColor: "#5D1049",
                ...(niosStatus ===
                "I HAVE REGISTERED FOR NIOS BUT DID NOT TAKE THE EXAM"
                  ? { background: "#5D1049", color: "white" }
                  : {}),
              }}
              value="I HAVE REGISTERED FOR NIOS BUT DID NOT TAKE THE EXAM"
              onClick={handleChangeNiosStatus}
            >
              I HAVE REGISTERED FOR NIOS BUT DID NOT TAKE THE EXAM
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <button
              className="btn rounded-pill m-3 p-3"
              style={{
                borderColor: "#5D1049",
                ...(niosStatus ===
                "I HAVE TAKEN THE EXAM AND AM WAITING FOR RESULTS"
                  ? { background: "#5D1049", color: "white" }
                  : {}),
              }}
              value="I HAVE TAKEN THE EXAM AND AM WAITING FOR RESULTS"
              onClick={handleChangeNiosStatus}
            >
              I HAVE TAKEN THE EXAM AND AM WAITING FOR RESULTS
            </button>
          </div>
          <div className="col mb-3">
            <button
              className="btn rounded-pill m-3 p-3"
              style={{
                borderColor: "#5D1049",
                ...(niosStatus ===
                "I DIDN’T REGISTER FOR NIOS / DIDN’T TAKE THE EXAM"
                  ? { background: "#5D1049", color: "white" }
                  : {}),
              }}
              value="I DIDN’T REGISTER FOR NIOS / DIDN’T TAKE THE EXAM"
              onClick={handleChangeNiosStatus}
            >
              I DIDN’T REGISTER FOR NIOS / DIDN’T TAKE THE EXAM
            </button>
          </div>
        </div>
        <div className="mx-auto mb-3">
          {/* TODO:Aashrith : Update NIOS status */}
          <Button
            text="SAVE"
            click={() => {
              handleNiosSave(niosStatus);
              alert("NIOS status updated.");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default NIOSStatus;
