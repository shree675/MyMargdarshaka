//@ts-check
import React, { useEffect, useState } from "react";
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
// @ts-ignore
import "./navbar.css";
import mainLogo from "../../assets/main-logo.svg";
import profileLogo from "../../assets/profile.svg";
import firebase from "../../firebase";
import axios from "axios";
import { verify } from "../../verifyUser";

// main component
const Navbar = (props) => {
  const [open, setOpen] = React.useState(false);
  const [pic, setPic] = useState(
    "https://media.istockphoto.com/vectors/user-profile-icon-flat-red-round-button-vector-illustration-vector-id1162440985?k=20&m=1162440985&s=170667a&w=0&h=cQJ5HDdUKK_8nNDd_6RBoeDQfILERZnd_EirHTi7acI="
  );
  const [phone, setPhone] = useState(null);
  const [curuser, setCuruser] = useState("No user is logged in");

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setPhone(user.phoneNumber);
        axios
          .get("/api/mentor/get-data/phone/" + user.phoneNumber, {
            headers: { Authorization: `Bearer ${curuser}` },
          })
          .then((data) => {
            // console.log(data);
            setPic(data.data.profile_picture_url);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
    verify(setCuruser, setPhone);
  }, [phone, curuser]);

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
        <Link className="nav-link-mobile" to="/mentor-guidelines">
          GUIDELINES
        </Link>
        <Link className="nav-link-mobile" to="/my-students">
          MY STUDENTS
        </Link>
        <Link className="nav-link-mobile" to="/mentor-dashboard">
          DASHBOARD
        </Link>
        <Link className="nav-link-mobile" to="/feedback">
          FEEDBACK
        </Link>
        <button
          onClick={() => {
            // logout
            firebase.auth().signOut();
            localStorage.clear();
            window.location = "/init-signin";
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
        <NavLogo to="#">
          <img src={mainLogo} style={{ height: "80px" }} />
        </NavLogo>
        <NavMenu>
          <NavLink to="/mentor-guidelines">GUIDELINES</NavLink>
          <NavLink to="/my-students">MY STUDENTS</NavLink>
          <NavLink to="/mentor-dashboard">DASHBOARD</NavLink>
          <NavLink to="/feedback">FEEDBACK</NavLink>
          <button
            onClick={() => {
              // logout
              firebase.auth().signOut();
              localStorage.clear();
              window.location = "/init-signin";
            }}
            className="nav-logout-pc"
          >
            LOGOUT
          </button>
        </NavMenu>
        <img className="img-fluid-nav rounded-circle" src={pic} />
      </Nav>
    </div>
  );
};
export default Navbar;
