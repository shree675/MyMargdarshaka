//@ts-check
import React from "react";
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

const Navbar = (props) => {
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
        <MobileNavLink className="nav-link-mobile" to="/mentor-guidelines">
          GUIDELINES
        </MobileNavLink>
        <MobileNavLink className="nav-link-mobile" to="/my-students">
          MY STUDENTS
        </MobileNavLink>
        <MobileNavLink className="nav-link-mobile" to="/mentor-dashboard">
          DASHBOARD
        </MobileNavLink>
        <MobileNavLink className="nav-link-mobile" to="/mentor-feedback">
          FEEDBACK
        </MobileNavLink>
        <MobileNavLink className="nav-link-mobile" to="/logout">
          LOGOUT
        </MobileNavLink>
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
          <NavLink to="/mentor-guidelines">GUIDELINES</NavLink>
          <NavLink to="/my-students">MY STUDENTS</NavLink>
          <NavLink to="/mentor-dashboard">DASHBOARD</NavLink>
          <NavLink to="/mentor-feedback">FEEDBACK</NavLink>
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
export default Navbar;
