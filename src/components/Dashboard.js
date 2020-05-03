import React from "react";

import FarmIcon from "../images/farmIcon.png";
import ChickenIcon from "../images/chickenIcon.png";
const Dashboard = (props) => {

  return (
    <div>
      <div>
        <h1>Homestead Together</h1>
        <img src={FarmIcon} height="100px" alt="farmIcon"></img>
        <p>Click here to see all products</p>
        <img src={ChickenIcon} height="100px" alt="chickenIcon"></img>
        <h1>Status: {props.loggedInStatus}</h1>
        <button onClick={() => props.handleLogout()}>Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;
