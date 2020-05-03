import React, { Component } from "react";
import EditProfile from "./ShowDivComponents/EditProfile";
import FarmInfo from "./ShowDivComponents/FarmInfo";
import MessageList from "./ShowDivComponents/MessageList";
import PartnershipList from "./ShowDivComponents/PartnershipList";
import ProductList from "./ShowDivComponents/ProductList";
import AddProduct from "./ShowDivComponents/AddProduct";

export default class ShowDiv extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderShowDiv = () => {
    if (this.props.showDivShow === "EDIT_PROFILE") {
      return (
        <EditProfile
          setShowDiv={this.props.setShowDiv}
          handleLogin={this.props.handleLogin}
          user={this.props.user}
        />
      );
    } else if (this.props.showDivShow === "FARM_INFO") {
      return <FarmInfo user={this.props.user} />;
    } else if (
      this.props.showDivShow === "PRODUCT_LIST" &&
      this.props.sideBarShow === "USER_SIDE_BAR"
    ) {
      return <ProductList allProducts={this.props.userProducts} />;
    } else if (
        this.props.showDivShow === "PRODUCT_LIST" &&
        this.props.sideBarShow != "USER_SIDE_BAR"
        ) {
            return <ProductList allProducts={this.props.allProducts} />;
    } else if (this.props.showDivShow === "PARTNERSHIP_LIST") {
      return <PartnershipList />;
    } else if (this.props.showDivShow === "MESSAGE_LIST") {
      return <MessageList />;
    } else if (this.props.showDivShow === "CREATE_PRODUCT") {
        return <AddProduct 
        fetchRawProducts={this.props.fetchRawProducts}
        rawProducts={this.props.rawProducts}
        user={this.props.user} />;
      }
  };

  render() {
    return (
      <div>
        <h2>ShowDiv</h2>
        {/* <ul>
                <li><EditProfile /></li>
                <li><FarmInfo /></li>
                <li><MessageList /></li>
                <li><PartnershipList /></li>
                <li><ProductList /></li>
            </ul> */}
        {this.renderShowDiv()}
      </div>
    );
  }
}
