//@ts-check

import React from "react";
import { Link } from "react-router-dom";
import LearnerNavbar from "../Navbar/learner-navbar";
import "./learner-subject-details.css";
import data from "../../data";
import { verify } from "../../verifyUser";

const defaultClassCode = "SCI10";

const Chapters = ({ handleClickChapter, classCode }) => {
  const chapters = [];
  (data[classCode] || data[defaultClassCode]).forEach((ch) => {
    chapters.push(ch.name);
  });

  const [ch, setCh] = React.useState(0);
  const [curuser, setCuruser] = React.useState("No user is logged in");
  const [phone, setPhone] = React.useState("");

  React.useEffect(() => {
    handleClickChapter(ch);
  }, [ch]);

  // verify if a user has been logged in and route appropriately
  React.useState(() => {
    if (
      localStorage.getItem("userType") !== null &&
      localStorage.getItem("userType") !== undefined &&
      localStorage.getItem("userType") === "mentor"
    ) {
      window.location = "/my-students";
    } else if (
      localStorage.getItem("isloggedin") !== null &&
      localStorage.getItem("isloggedin") !== undefined &&
      localStorage.getItem("isloggedin") === "true"
    ) {
      window.location = "/admin-home";
    }
    verify(setCuruser, setPhone);
  });

  return (
    <div className="learner-subject-details-chapters">
      <div
        style={{
          color: "white",
          fontSize: "30px",
          borderBottom: "solid 1px white",
          width: "90%",
          display: "flex",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        Chapters
      </div>
      {chapters.map((chName, i) => (
        <div
          className="mentor-chapter-element"
          onClick={() => {
            setCh(i);
          }}
          style={i == ch ? { border: "1px solid white" } : {}}
        >
          {chName}
        </div>
      ))}
    </div>
  );
};

const SubTopics = ({ curChapter, classCode }) => {
  //const subTopics = data.chapters.Science[curChapter].subtopics;
  const subTopics = (data[classCode] || data[defaultClassCode])[curChapter]
    .subtopics;

  return (
    <div className="learner-subject-details-subtopics">
      <div
        style={{
          color: "white",
          fontSize: "30px",
          borderBottom: "solid 1px white",
          width: "90%",
          display: "flex",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        SubTopics
      </div>
      {subTopics.map((t) => (
        <div className="learner-chapter-element">
          <input type="checkbox" checked={t[1]} />
          {t[0].length < 20 ? t[0] : t[0].substring(0, 20) + "....."}
        </div>
      ))}
    </div>
  );
};

const PendingTests = ({ pendingTests }) => {
  const handleTakeTest = (e) => {
    window.location = "/test";
  };
  return (
    <div className="learner-tests-tab-inner">
      {pendingTests.map((topic) => (
        <div className="learner-subtopic-test-element">
          <div
            style={{ marginLeft: "10px", marginTop: "-10px", width: "10vw" }}
          >
            {topic.length < 20 ? topic : topic.substring(0, 20) + "....."}
          </div>
          <div className="learner-launch-test-button" onClick={handleTakeTest}>
            TAKE TEST
          </div>
        </div>
      ))}
    </div>
  );
};

class SubjectDetails extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      subjectName: props.subDetails["subject"] || "Subject Name",
      classCode:
        data.codes[props.subDetails["subject"]] + props.subDetails["Class"],
      curChapter: 0,
    };
    this.handleClickChapter = this.handleClickChapter.bind(this);
  }

  handleClickChapter(ch) {
    console.log(ch);
    this.setState({ curChapter: ch });
  }

  // verify if a user is already logged in and route appropriately
  componentDidMount() {
    if (
      localStorage.getItem("userType") !== null &&
      localStorage.getItem("userType") !== undefined &&
      localStorage.getItem("userType") === "mentor"
    ) {
      window.location = "/my-students";
    } else if (
      localStorage.getItem("isloggedin") !== null &&
      localStorage.getItem("isloggedin") !== undefined &&
      localStorage.getItem("isloggedin") === "true"
    ) {
      window.location = "/admin-home";
    }
  }

  render() {
    return (
      <div>
        <LearnerNavbar />
        <div className="learner-subject-details-main">
          <div
            style={{ width: "30%", display: "flex", flexDirection: "column" }}
          >
            {/* <Link to="/my-mentors" className="learner-subject-details-back">
              BACK
            </Link> */}
            <div
              className="learner-subject-details-back"
              onClick={() => {
                this.props.setPageDetails({ pageName: "home" });
              }}
            >
              BACK
            </div>
            <div className="learner-subject-details-subjectname-mobile">
              {this.state.subjectName}
            </div>
            <Chapters
              handleClickChapter={this.handleClickChapter}
              classCode={this.state.classCode}
            />
          </div>
          <SubTopics
            curChapter={this.state.curChapter}
            classCode={this.state.classCode}
          />

          <div className="learner-subject-details-col3">
            <div className="learner-subject-details-subjectname">
              {this.state.subjectName}
            </div>
            <div>PENDING TESTS!</div>

            {/* temporarily pending tests are stored in data.js , these need to be queried from DB */}

            <PendingTests
              pendingTests={
                //data.chapters.Science[this.state.curChapter].pendingTests
                (data[this.state.classCode] || data[defaultClassCode])[
                  this.state.curChapter
                ].pendingTests
              }
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SubjectDetails;
