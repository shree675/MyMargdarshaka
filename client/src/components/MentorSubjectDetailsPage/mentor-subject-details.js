//@ts-check

import React, { useEffect, useState } from "react";
import MentorNavbar from "../Navbar/mentor-navbar";
import { Link } from "react-router-dom";
import "./mentor-subject-details.css";
import data from "../../data";
import { verify } from "../../verifyUser";

const defaultClassCode = "SCI10";

const Chapters = ({ handleClickChapter, classCode }) => {
  const chapters = [];
  (data[classCode] || data[defaultClassCode]).chapters.forEach((ch) => {
    chapters.push(ch.name);
  });

  const [ch, setCh] = useState(0);
  const [curuser, setCuruser] = useState("No user is logged in");
  const [phone, setPhone] = useState("");

  // reroute if a different user is logged in
  useEffect(() => {
    if (
      localStorage.getItem("userType") !== null &&
      localStorage.getItem("userType") !== undefined &&
      localStorage.getItem("userType") === "learner"
    ) {
      window.location = "/my-mentors";
    } else if (
      localStorage.getItem("isloggedin") !== null &&
      localStorage.getItem("isloggedin") !== undefined &&
      localStorage.getItem("isloggedin") === "true"
    ) {
      window.location = "/admin-home";
    }
    verify(setCuruser, setPhone);
  }, []);

  useEffect(() => {
    handleClickChapter(ch);
  }, [ch]);

  return (
    <div className="mentor-subject-details-chapters">
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
  const subTopics = (data[classCode] || data[defaultClassCode]).chapters[
    curChapter
  ].subtopics;

  return (
    <div className="mentor-subject-details-subtopics">
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
      {subTopics.map((ch) => (
        <div
          className="mentor-chapter-element"
          style={{ background: "white", color: "#5D1049" }}
        >
          <input type="checkbox" />
          {ch}
        </div>
      ))}
    </div>
  );
};

const PendingTests = ({ pendingTests }) => {
  return (
    <div className="mentor-tests-tab-inner">
      {pendingTests.map((topic) => (
        <div className="mentor-subtopic-test-element">
          <div style={{ marginLeft: "10px" }}>{topic}</div>
          <div className="mentor-launch-test-button">LAUNCH TEST</div>
        </div>
      ))}
    </div>
  );
};

const CompletedTests = ({ completedTests }) => {
  return (
    <div className="mentor-tests-tab-inner">
      {completedTests.map((topic) => (
        <div className="mentor-subtopic-test-element">
          <div style={{ marginLeft: "10px" }}>{topic}</div>
          <div className="mentor-launch-test-button">VIEW DETAILS</div>
        </div>
      ))}
    </div>
  );
};

const Tests = ({ pendingTests, completedTests }) => {
  const [tab, setTab] = React.useState(0);

  return (
    <div className="mentor-subject-details-tests">
      <div style={{ display: "flex", padding: "10px" }}>
        <div
          className="mentor-test-tab-button"
          style={tab == 0 ? { border: "solid 3px red", opacity: 1 } : {}}
          name="pending"
          onClick={() => {
            setTab(0);
          }}
        >
          PENDING TESTS
        </div>
        <div
          className="mentor-test-tab-button"
          style={tab == 1 ? { border: "solid 3px red", opacity: 1 } : {}}
          name="completed"
          onClick={() => {
            setTab(1);
          }}
        >
          COMPLETED
        </div>
      </div>
      {tab == 0 && <PendingTests pendingTests={pendingTests} />}
      {tab == 1 && <CompletedTests completedTests={completedTests} />}
    </div>
  );
};

// main component
class MentorSubjectDetails extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      subjectName: props.subDetails["subject"] || "Subject Name",
      classCode:
        data.codes[props.subDetails["subject"].split()[0]] +
        props.subDetails["Class"],
      curChapter: 0,
    };

    this.handleClickChapter = this.handleClickChapter.bind(this);
  }

  // reroute if a different user is logged in
  componentDidMount() {
    if (
      localStorage.getItem("userType") !== null &&
      localStorage.getItem("userType") !== undefined &&
      localStorage.getItem("userType") === "learner"
    ) {
      window.location = "/my-mentors";
    } else if (
      localStorage.getItem("isloggedin") !== null &&
      localStorage.getItem("isloggedin") !== undefined &&
      localStorage.getItem("isloggedin") === "true"
    ) {
      window.location = "/admin-home";
    }
  }

  handleClickChapter(ch) {
    console.log(ch);
    this.setState({ curChapter: ch });
  }

  render() {
    return (
      <div>
        <MentorNavbar />
        <div className="mentor-subject-details-main">
          <div
            style={{ width: "30%", display: "flex", flexDirection: "column" }}
          >
            {/* <Link to='/my-students' className='mentor-subject-details-back'>
              BACK
            </Link> */}

            <div
              className="mentor-subject-details-back"
              onClick={() => {
                this.props.setPageDetails({ pageName: "home" });
              }}
            >
              BACK
            </div>
            <div className="mentor-subject-details-subjectname-mobile">
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

          <div className="mentor-subject-details-col3">
            <div className="mentor-subject-details-subjectname">
              {this.state.subjectName}
            </div>

            {/* temporarily pending and completed tests are stored in data.js , these need to be queried from DB */}

            <Tests
              pendingTests={
                data.chapters.Science[this.state.curChapter].pendingTests
              }
              completedTests={
                data.chapters.Science[this.state.curChapter].completedTests
              }
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MentorSubjectDetails;
