//@ts-check
import React from "react";
import { Link } from "react-router-dom";
import { IoIosCloseCircle as CloseIcon } from "react-icons/io";
import firebase from "../../firebase";

import {
  Nav,
  NavLogo,
  NavMenu,
  Bars,
  NavLink,
  NavBtn,
  NavBtnLink,
} from "./navbarElements";
// @ts-ignore
import "./navbar.css";
import mainLogo from "../../assets/main-logo.svg";
import profileLogo from "../../assets/profile.svg";

const LearnerNavbar = (props) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <div
        style={
          open
            ? {
                height: "60vh",
                background: "#5d1049",
                display: "block",
                paddingTop: "5vh",
              }
            : { display: "none" }
        }
      >
        <div
          style={{
            border: "1px solid white",
            height: "5vh",
            width: "60vw",
            margin: "0 0 5vh 20vw",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
          }}
          onClick={() => {
            setOpen(false);
          }}
        >
          <div style={{ color: "white", marginLeft: "20vw" }}>CLOSE</div>
          <CloseIcon
            style={{ color: "white", fontSize: "3vh", marginLeft: "5vw" }}
          />
        </div>
        <Link className="nav-link-mobile" to="/learner-guidelines">
          GUIDELINES
        </Link>
        <Link className="nav-link-mobile" to="/my-mentors">
          MY MENTORS
        </Link>
        <Link className="nav-link-mobile" to="/learner-dashboard">
          DASHBOARD
        </Link>
        <Link className="nav-link-mobile" to="/learner-feedback">
          FEEDBACK
        </Link>
        {/* <Link className="nav-link-mobile" to="/logout">
          LOGOUT
        </Link> */}
        <button
          onClick={() => {
            firebase.auth().signOut();
            // window.location='/init-signin';
          }}
          className="nav-logout-phone"
        >
          LOGOUT
        </button>
      </div>

      <Nav style={open ? { display: "none" } : {}}>
        <div
          onClick={() => {
            setOpen(true);
          }}
        >
          <Bars />
        </div>

        <NavLogo to="/">
          <img src={mainLogo} style={{ height: "80px" }} />
        </NavLogo>

        <NavMenu>
          <NavLink to="/learner-guidelines">GUIDELINES</NavLink>
          <NavLink to="/my-mentors">MY MENTORS</NavLink>
          <NavLink to="/learner-dashboard">DASHBOARD</NavLink>
          <NavLink to="/learner-feedback">FEEDBACK</NavLink>
          {/* <NavLink to='/logout'>LOGOUT</NavLink> */}
          <button
            onClick={() => {
              firebase.auth().signOut();
              // window.location='/init-signin';
            }}
            className="nav-logout-pc"
          >
            LOGOUT
          </button>
        </NavMenu>

        <img
          src="https://randomuser.me/api/portraits/thumb/men/40.jpg"
          style={{ borderRadius: "20px" }}
          className="profile-photo"
        />
      </Nav>
    </div>
  );
};
export default LearnerNavbar;
