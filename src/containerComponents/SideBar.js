import React, { Component } from "react";
import UserSideBar from "./SideBarComponents/UserSideBar";
import ProductSideBar from "./SideBarComponents/ProductSideBar";

export default class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h2>SideBar</h2>
        <ul>
        <li><UserSideBar /></li>
        <li><ProductSideBar /></li>
        </ul>
      </div>
    );
  }
}
