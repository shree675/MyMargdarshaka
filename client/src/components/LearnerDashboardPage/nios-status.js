import React from "react";

// TODO (Kranthi): Add animations to the buttons
const NIOSStatus = () => {
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
              style={{ borderColor: "#5D1049" }}
            >
              I HAVE REGISTERED FOR NIOS AND TOOK THE EXAM
            </button>
          </div>
          <div className="col">
            <button
              className="btn rounded-pill m-3 p-3"
              style={{ borderColor: "#5D1049" }}
            >
              I DIDN’T REGISTER FOR NIOS / DIDN’T TAKE THE EXAM
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <button
              className="btn rounded-pill m-3 p-3"
              style={{ borderColor: "#5D1049" }}
            >
              I HAVE REGISTERED FOR NIOS AND TOOK THE EXAM
            </button>
          </div>
          <div className="col mb-3">
            <button
              className="btn rounded-pill m-3 p-3"
              style={{ borderColor: "#5D1049" }}
            >
              I DIDN’T REGISTER FOR NIOS / DIDN’T TAKE THE EXAM
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NIOSStatus;
