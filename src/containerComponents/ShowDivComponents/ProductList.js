import React, { Component } from "react";
import ItemTile from "../ShowComponents/ItemTile";
import ItemDetails from "../ShowComponents/ItemDetails";

import categoryDairy from "./categoryImages/categoryDairy.png";
import categoryFiber from "./categoryImages/categoryFiber.png";
import categoryGuidance from "./categoryImages/categoryGuidance.png";
import categoryHandmade from "./categoryImages/categoryHandmade.png";
import categoryInfrastructure from "./categoryImages/categoryInfrastructure.png";
import categoryLivestock from "./categoryImages/categoryLivestock.png";
import categoryOther from "./categoryImages/categoryOther.png";
import categoryPoultry from "./categoryImages/categoryPoultry.png";
import categoryPreserves from "./categoryImages/categoryPreserves.png";
import categoryProduce from "./categoryImages/categoryProduce.png";

const imageMap = {
    "Dairy": categoryDairy,
    "Fiber": categoryFiber,
    "Guidance": categoryGuidance,
    "Hand-made": categoryHandmade,
    "Infrastructure": categoryInfrastructure,
    "Livestock": categoryLivestock,
    "Other": categoryOther,
    "Poultry": categoryPoultry,
    "Preserves": categoryPreserves,
    "Produce": categoryProduce,
  }
export default class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  otherPicture = () => {
      if (this.props.sideBarShow === "PRODUCT_SIDE_BAR"){
      return (<img src={imageMap[`${this.props.filterCategory}`]} width="125px" align="center" className="productpicture"></img>)}
  }
  componentDidMount() {
    this.props.sortUserProductsOwned();
  }

  conditionalRender = () => {
    if (this.props.sideBarShow === "USER_SIDE_BAR") {
      return this.listUserProducts();
    } else {
      return this.listFilteredProducts();
    }
  };

  listUserProducts = () => {
    return this.props.userProducts.map((product) => (
      <ItemTile key={product.id} setShowDiv={this.props.setShowDiv} setFilterCategory={this.props.setFilterCategory} sortUserProductsOwned={this.props.sortUserProductsOwned} product={product} sideBarShow={this.props.sideBarShow} fetchAllProducts={this.props.fetchAllProducts}/>
    ));
  };

  listFilteredProducts = () => {
    return this.props.allProducts.map((product) => (
      <ItemTile key={product.id} sortUserProductsOwned={this.props.sortUserProductsOwned} product={product} fetchAllProducts={this.props.fetchAllProducts} sideBarShow={this.props.sideBarShow}/>
    ));
  };

  renderImage = (categoryName) => {
      if (categoryName === "Hand-made"){
          imageSource = "Handmade"
      }
  }

  render() {
    return (
      <div className="centerstyle">
        {this.otherPicture()}
        <h1>{this.props.filterCategory}</h1>
        {this.conditionalRender()}
      </div>
    );
  }
}
