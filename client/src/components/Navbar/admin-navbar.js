// @ts-ignore

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
} from "./navbarElements";
import "./navbar.css";
import mainLogo from "../../assets/main-logo.svg";
import profileLogo from "../../assets/profile.svg";

const AdminNavbar = (props) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <div
        style={
          open
            ? {
                height: "50vh",
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
            textAlign: "center",
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
        <Link className="nav-link-mobile" to="/admin-applications">
          APPLICATIONS
        </Link>
        <Link className="nav-link-mobile" to="/admin-issues">
          ISSUES
        </Link>
        <Link className="nav-link-mobile" to="/admin-stats">
          STATS
        </Link>
        {/* <Link className='nav-link-mobile'>LOGOUT</Link> */}
        <button
          onClick={() => {
            localStorage.setItem("isloggedin", "false");
            // window.location='/admin-auth';
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
          <NavLink to="/admin-applications">APPLICATIONS</NavLink>
          <NavLink to="/admin-issues">ISSUES</NavLink>
          <NavLink to="/admin-stats">STATS</NavLink>
          {/* <NavLink to='/logout'>LOGOUT</NavLink> */}
          <button
            onClick={() => {
              localStorage.setItem("isloggedin", "false");
              // window.location='/admin-auth';
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
export default AdminNavbar;
