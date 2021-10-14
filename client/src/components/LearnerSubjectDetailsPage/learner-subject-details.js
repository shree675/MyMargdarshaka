import React from "react";
import { Link } from "react-router-dom";
import LearnerNavbar from "../Navbar/learner-navbar";
import "./learner-subject-details.css";
import data from "../../data";

const Chapters = ({ handleClickChapter }) => {
  const chapters = [];
  data.chapters.Science.forEach((ch) => {
    chapters.push(ch.name);
  });

  const [ch, setCh] = React.useState(0);

  React.useEffect(() => {
    handleClickChapter(ch);
  }, [ch]);
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

const SubTopics = ({ curChapter }) => {
  const subTopics = data.chapters.Science[curChapter].subtopics;

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
        <div className="learner-chapter-element">{t}</div>
      ))}
    </div>
  );
};

const PendingTests = ({ pendingTests }) => {
  return (
    <div className="learner-tests-tab-inner">
      {pendingTests.map((topic) => (
        <div className="learner-subtopic-test-element">
          <div style={{ marginLeft: "10px" }}>{topic}</div>
          <div className="learner-launch-test-button">TAKE TEST</div>
        </div>
      ))}
    </div>
  );
};

class SubjectDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subjectName: props.subjectName || "Subject Name",
      curChapter: 0,
    };
    this.handleClickChapter = this.handleClickChapter.bind(this);
  }

  handleClickChapter(ch) {
    console.log(ch);
    this.setState({ curChapter: ch });
  }

  render() {
    return (
      <div>
        <LearnerNavbar />
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
            <Link to="/my-mentors" className="learner-subject-details-back">
              BACK
            </Link>
            <Chapters handleClickChapter={this.handleClickChapter} />
          </div>
          <SubTopics curChapter={this.state.curChapter} />
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
            <div
              style={{
                marginTop: "20px",
                marginLeft: "20px",
                fontSize: "20px",
              }}
            >
              PENDING TESTS!
            </div>

            {/* temporarily pending tests are stored in data.js , these need to be queried from DB */}

            <PendingTests
              pendingTests={
                data.chapters.Science[this.state.curChapter].pendingTests
              }
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SubjectDetails;
