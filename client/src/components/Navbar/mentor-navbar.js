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
import profileLogo from '../../assets/profile.svg'

const Navbar = (props) => {
  return (
    <div>
      <Nav>
        <NavLogo to="/">
          <img src={mainLogo} style={{height: '80px'}}/>
        </NavLogo>
        <Bars />

        <NavMenu>


            <NavLink to="/mentor-guidelines">
              GUIDELINES
            </NavLink>
            <NavLink to="/my-students">
              MY STUDENTS
            </NavLink>
            <NavLink to="/mentor-dashboard">
              DASHBOARD
            </NavLink>
            <NavLink to="/mentor-feedback">
              FEEDBACK
            </NavLink>
            <NavLink to="/logout">
              LOGOUT
            </NavLink>
            
            <NavLink to="/mentor-profile">
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

