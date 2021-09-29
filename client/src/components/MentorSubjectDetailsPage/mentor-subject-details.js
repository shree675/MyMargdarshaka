import React from "react";
import MentorNavbar from "../Navbar/mentor-navbar";
import { Link } from "react-router-dom";
import "./mentor-subject-details.css";

const Chapters = ({ curChapter }) => {
  const chapters = [
    "chapter1",
    "chapter1",
    "chapter1",
    "chapter1",
    "chapter1",
    "chapter1",
    "chapter1",
    "chapter1",
    "chapter1",
    "chapter1",
    "chapter1",
    "chapter1",
    "chapter1",
  ];
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
      {chapters.map((ch) => (
        <div className="mentor-chapter-element">{ch}</div>
      ))}
    </div>
  );
};

const SubTopics = () => {
  const subTopics = [
    "Subtopic1",
    "Subtopic1",
    "Subtopic1",
    "Subtopic1",
    "Subtopic1",
    "Subtopic1",
    "Subtopic1",
    "Subtopic1",
    "Subtopic1",
    "Subtopic1",
    "Subtopic1",
  ];
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

class MentorSubjectDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subjectName: props.subjectName || "Subject Name",
      curChapter: 1,
    };
  }

  render() {
    return (
      <div>
        <MentorNavbar />
        <div
          style={{
            display: "flex",
            borderRadius: "10px",
            marginTop: "-20px",
            zIndex: "2",
            background: "white",
          }}
        >
          <div
            style={{ width: "30%", display: "flex", flexDirection: "column" }}
          >
            <Link to="/my-students" className="mentor-subject-details-back">
              BACK
            </Link>
            <Chapters curChapter={this.state.curChapter} />
          </div>
          <SubTopics />
          <div
            style={{
              width: "60%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                marginLeft: "-150px",
                height: "100px",
                paddingTop: "30px",
                fontSize: "50px",
                color: "#5D1049",
              }}
            >
              Subject Name
            </div>
            <Tests
              pendingTests={["SUBTOPIC1", "SUBTOPIC2"]}
              completedTests={["SUBTOPIC3", "SUBTOPIC4"]}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MentorSubjectDetails;
