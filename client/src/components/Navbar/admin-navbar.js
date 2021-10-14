import React from "react";
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
import mainLogo from "../../assets/main-logo.svg";
import profileLogo from "../../assets/profile.svg";

const AdminNavbar = (props) => {
  return (
    <div>
      <Nav>
        <NavLogo to="/">
          <img src={mainLogo} style={{ height: "80px" }} />
        </NavLogo>
        <Bars />

        <NavMenu>
          <NavLink to="/admin-applications">APPLICATIONS</NavLink>
          <NavLink to="/admin-issues">ISSUES</NavLink>
          <NavLink to="/admin-stats">STATS</NavLink>
          <NavLink to="/logout">LOGOUT</NavLink>

          <NavLink to="/admin-profile">
            <img src={profileLogo} style={{ height: "40px" }} />
          </NavLink>
          {/* 
          <NavBtn>
            <NavBtnLink to="/sign-up">Sign Up</NavBtnLink>
          </NavBtn> */}
        </NavMenu>
      </Nav>
    </div>
  );
};
export default AdminNavbar;
