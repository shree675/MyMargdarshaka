import React from "react";
import { Doughnut } from "react-chartjs-2";

const options = {
  layout: {
    padding: 0,
  },
};

const ProgressChart = ({ percent_complete, subject }) => {
  const data = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        data: [percent_complete, 100 - percent_complete],
        backgroundColor: ["#5D1049", "#FF0000"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container" style={{ width: "200px", height: "200px" }}>
      <div className="header">
        <p>{subject}</p>
      </div>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default ProgressChart;
