import React, { Component } from "react";

import FarmIcon from "./categoryImages/farmIcon.png";

export default class PartnershipList extends Component {
    constructor(props) {
      super(props);
      this.state= {

      }
    }

    render() {
        return (
            <div className="form" >

        <img src={FarmIcon} height="300px" alt="farmIcon"></img>
            <h1>This feature is currently under development</h1></div>
        )
    }

}