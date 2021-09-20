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


const Navbar = () => {
  return (
    <div>
      <Nav>
        <NavLogo to="/">
          Logo
        </NavLogo>
        <Bars />

        <NavMenu>
            <NavLink to="/applications">
              APPLICATIONS
            </NavLink>
            <NavLink to="/issues">
              ISSUES
            </NavLink>
            <NavLink to="/stats">
              STATS
            </NavLink>
            <NavLink to="/logout">
              LOGOUT
            </NavLink>
            
            <NavLogo to="/profile">PROFILE</NavLogo>
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
