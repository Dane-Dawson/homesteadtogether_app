import React, { Component } from "react";
import EditProfile from "./ShowDivComponents/EditProfile";
import FarmInfo from "./ShowDivComponents/FarmInfo";
import MessageList from "./ShowDivComponents/MessageList";
import PartnershipList from "./ShowDivComponents/PartnershipList";
import ProductList from "./ShowDivComponents/ProductList";

export default class ShowDiv extends Component {
    constructor(props) {
      super(props);
      this.state= {

      }
    }

    render() {
        return (
            <div>
            <h2>ShowDiv</h2>
            <ul>
                <li><EditProfile /></li>
                <li><FarmInfo /></li>
                <li><MessageList /></li>
                <li><PartnershipList /></li>
                <li><ProductList /></li>
            </ul>
            
            </div>
        )
    }

}