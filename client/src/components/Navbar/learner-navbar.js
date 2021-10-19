//@ts-check
import React from "react";
import { Link } from "react-router-dom";
import { IoIosCloseCircle as CloseIcon } from "react-icons/io";

import {
  Nav,
  NavLogo,
  NavMenu,
  Bars,
  NavLink,
  NavBtn,
  NavBtnLink,
  MobileNavLink,
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
                height: "63vh",
                background: "#5d1049",
                display: "block",
                paddingTop: "5vh",
              }
            : { display: "none" }
        }
      >
        <div
          style={{
            border: "1px solid red",
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
          <div style={{ color: "red", marginLeft: "20vw" }}>CLOSE</div>
          <CloseIcon
            style={{ color: "red", fontSize: "3vh", marginLeft: "5vw" }}
          />
        </div>
        <MobileNavLink className="nav-link-mobile" to="/learner-guidelines">
          GUIDELINES
        </MobileNavLink>
        <MobileNavLink className="nav-link-mobile" to="/my-mentors">
          MY MENTORS
        </MobileNavLink>
        <MobileNavLink className="nav-link-mobile" to="/learner-dashboard">
          DASHBOARD
        </MobileNavLink>
        <MobileNavLink className="nav-link-mobile" to="/learner-feedback">
          FEEDBACK
        </MobileNavLink>
        <MobileNavLink to="/logout">LOGOUT</MobileNavLink>
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
          <NavLink to="/logout">LOGOUT</NavLink>
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
