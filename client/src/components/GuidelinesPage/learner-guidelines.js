// @ts-check

import React, { useEffect, useState } from "react";
import Chatbot from "react-chatbot-kit";
import config from "../../chatbot/config";
import MessageParser from "../../chatbot/MessageParser";
import ActionProvider from "../../chatbot/ActionProviderLearner";
// @ts-ignore
import lola from "../../assets/lola_basic_motion.gif";
import "react-chatbot-kit/build/main.css";
import "./guidelines.css";
import axios from "axios";
import { verify } from "../../verifyUser";
import LearnerNavbar from "../Navbar/learner-navbar";


const LearnerGuidelines = () => {
    
    const [name, setName] = useState("Cutie");
    const [newConfig, setNewConfig] = useState(null);
    const [curuser, setCuruser] = useState("No user is logged in");
    const [phone, setPhone] = useState("");
    //const [userType, setUserType] = useState(null);

    // obtaining the user's assigned mentors from the database
    const getData = async (learner_phone) => {
      if (curuser === "No user is logged in") return;
      if (!phone) return;
      
      const res = await axios.get(`/api/learner/get-data/phone/${phone}`, {
        headers: { Authorization: `Bearer ${curuser}` },
      });
      const name = res.data.name;
      setName(name);
      setNewConfig(config(name))
          
    };
  
    // verify that no user is currently logged in
    useEffect(() => {
      if (
        localStorage.getItem("userType") !== null &&
        localStorage.getItem("userType") !== undefined &&
        localStorage.getItem("userType") === "mentor"
      ) {
        window.location = "/mentor-guidelines";
      } else if (
        localStorage.getItem("isloggedin") !== null &&
        localStorage.getItem("isloggedin") !== undefined &&
        localStorage.getItem("isloggedin") === "true"
      ) {
        window.location = "/admin-home";
      }
      verify(setCuruser, setPhone);
      getData();
    }, [phone, curuser]);

    useEffect( () => {
      setNewConfig(config(name))
      //console.log("The current name is", name)
    }, [name])

    useEffect( () => {
      /* console.log("The current name in config is", newConfig)
      if(newConfig != null && newConfig.name == "Cutie")
      {
        console.log("we should reload")
        
      } */
    }, [newConfig])
  return (
    <div >
        <LearnerNavbar />
      <div className="body">
        <div className="container">
          <div className="col">
            <div className="row">
              <div className="bubble">Hello there {name}! Hope you're doing well! </div>
            </div>
            <div className="row">
              <img
                className="col lola-gif"
                // style={{ width: "100px" }}
                src={lola}
                alt=""
              />
              <div className="col">
                {((newConfig!= null && newConfig.name !=undefined && newConfig.name != "Cutie"))? <Chatbot
                  config= {newConfig}
                  actionProvider={ActionProvider}
                  messageParser={MessageParser}
                />: <div></div>}
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnerGuidelines;
