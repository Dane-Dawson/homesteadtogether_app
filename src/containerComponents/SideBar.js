import React, { Component } from "react";
import UserSideBar from "./SideBarComponents/UserSideBar";
import ProductSideBar from "./SideBarComponents/ProductSideBar";

export default class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderShowDiv = () => {
    if (this.props.sideBarShow === "USER_SIDE_BAR"){
      return (
        <UserSideBar 
          setShowDiv={this.props.setShowDiv}
        />
      )
    } else if (this.props.sideBarShow === "PRODUCT_SIDE_BAR"){
      return (
        <ProductSideBar />
      )
    }
  }
  render() {
    return (
      <div>
        <h2>SideBar</h2>
        {this.renderShowDiv()}
      </div>
    );
  }
}
