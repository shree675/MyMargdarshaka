//@ts-check
import React from "react";
import {
  Nav,
  NavLogo,
  NavMenu,
  Bars,
  NavLink,
  NavBtn,
  NavBtnLink
} from "./navbarElements";
// @ts-ignore
import mainLogo from "../../assets/main-logo.svg"
import profileLogo from "../../assets/profile.svg"

const Navbar = (props) => {
  return (
    <div>
      <Nav>
        <NavLogo to="/">
          <img src={mainLogo} style={{height: '80px'}}/>
        </NavLogo>
        <Bars />

        <NavMenu>


            <NavLink to="/learner-guidelines">
              GUIDELINES
            </NavLink>
            <NavLink to="/my-mentors">
              MY MENTORS
            </NavLink>
            <NavLink to="/learner-dashboard">
              DASHBOARD
            </NavLink>
            <NavLink to="/learner-feedback">
              FEEDBACK
            </NavLink>
            <NavLink to="/logout">
              LOGOUT
            </NavLink>
            
            <NavLink to="/learner-profile">
                <img src={profileLogo} style={{height: '40px'}}/>
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
export default Navbar;
