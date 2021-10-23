import React, { useEffect, useState } from "react";
import axios from "axios";

import LearnerDashboardEditAttributes from "./learner-edit-attributes";
import LearnerDashboardChangeDetails from "./learner-dashboard-change-details";
import NIOSStatus from "./nios-status";
import LearnerNavbar from "../Navbar/learner-navbar";
import LearnerRequestChangeOfMentor from "./learner-change-mentor";

const LearnerDashboard = () => {
  // this id should be passed through props
  let learner_id = "61716f548c649b63a6a06856";

  const [learnerData, setLearnerData] = useState({});

  const getData = async () => {
    const res = await axios.get(`/api/learner/get-data/id/${learner_id}`);
    const data = res.data;
    console.log(data);
    setLearnerData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="mb-3">
      <LearnerNavbar />
      <div className="container-fluid">
        <div className="row align-items-end">
          <div className="col-lg-3 col-12">
            <LearnerDashboardChangeDetails
              details={{
                name: learnerData.name,
                email: learnerData.email,
                phone: learnerData.phone,
              }}
            />
          </div>
          <div className="col-lg-9 col-12">
            <LearnerDashboardEditAttributes />
          </div>
        </div>
        <NIOSStatus />
        <LearnerRequestChangeOfMentor />
      </div>
    </div>
  );
};

export default LearnerDashboard;
