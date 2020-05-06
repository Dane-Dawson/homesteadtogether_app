import React, { Component } from "react";
import ItemDetails from "./ItemDetails";
import axios from "axios";

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

export default class ItemTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false,
      category: "",
    };
  }

  setCategory = () => {
    this.setState({ category: this.props.product.category.name });
  };

  //toggle show field for ItemDetails tile
  toggleShowDetailsState = () => {
    let showDetails = this.state.showDetails;
    showDetails = !showDetails;
    this.setState({ showDetails });
  };

  //button render for details that toggles display based on state
  showDetailsButton = () => {
    if (this.state.showDetails === true) {
      return (
        <div>
          <button
            className="productdetails"
            onClick={this.toggleShowDetailsState}
          >
            {" "}
            Hide Details!{" "}
          </button>
          {/* <br></br>
          <br></br>
          <br></br>
          <ItemDetails product={this.props.product} /> */}
        </div>
      );
    } else {
      return (
        <div>
          {/* {this.props.product.name} */}
          <button
            className="productdetails"
            onClick={this.toggleShowDetailsState}
          >
            {" "}
            Show Details!{" "}
          </button>
          <br></br>
        </div>
      );
    }
  };

  deleteProduct = () => {
    let userId = this.props.product.id;
    let postObject = {
      method: "DELETE",
    };
    if (window.confirm("Are you sure you want to delete your this product?")) {
      axios
        .delete("http://localhost:3001/user_products/" + userId, {
          withCredentials: true,
        })
        .then((response) => {
          this.props.fetchAllProducts();
        })
        .catch((error) => {
          console.log("logout error", error);
        });
      // fetch("http://localhost:3001/user_products/" + userId, postObject);
      this.props.setShowDiv("FARM_INFO");
    }
    // this.props.setFilterCategory("FARM_INFO")
    // this.props.fetchAllProducts();
  };

  toggleProductActive = () => {
    let productId = this.props.product.id
    let activeStatus = !this.props.product.active
    let productObject = {
      active: activeStatus
    }
    let postObject = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(productObject),
    };
    // fetch("http://localhost:3001/user_products/" + productId, postObject)
    // .then(response => this.props.fetchAllProducts())

    axios
    .patch("http://localhost:3001/user_products/" + productId, productObject)
    .then(res => {
      this.props.fetchAllProducts();
    })
    .catch(err => console.log(err.response.data));
    this.props.setShowDiv("FARM_INFO")
  }


  conditionalRender = () => {
    if (this.props.sideBarShow === "USER_SIDE_BAR") {
      return this.listUserProducts();
    } else {
      return this.listFilteredProducts();
    }
  };

  conditionalToggleButtonRender = () => {
    if (this.props.product.active) {
      return (
          <button onClick={() => this.toggleProductActive()} className="toggleactive">
            Make inactive
          </button>
      );
    } else {
      return (
          <button onClick={() => this.toggleProductActive()} className="toggleinactive">
            Make active
          </button>
      );
    }
  };

  //product list through user sidebar
  listUserProducts = () => {
    return (
      <div className="centerstyle">
        <table className="producttiletable">
          <thead>
            <tr>
              <th>
                <h1>{this.props.product.product.name}</h1>
              </th>
              <th>
                <p>{this.props.product.description}</p>
              </th>
              <th>
                {this.props.product.active ? (
                  <p>Currently accepting offers</p>
                ) : (
                  <p>Item currently unavailable</p>
                )}
              </th>
              <th>
                <button className="productdetails" onClick={this.deleteProduct}>
                  Delete product
                </button>
              </th>
              <th>
                {this.conditionalToggleButtonRender()}
              </th>
            </tr>
            {/* <tr>
              <td colSpan="4">
                {this.state.showDetails ? (
                  <ItemDetails product={this.props.product} />
                ) : (
                  <br></br>
                )}
              </td>
            </tr> */}
          </thead>
        </table>
      </div>
    );
  };

  //Product list when viewed throught products sidebar
  listFilteredProducts = () => {
    return (
      <div className="centerstyle">
        <table className="producttiletable">
          <tbody>
            <tr>
              <th>
                <h1>{this.props.product.product.name}</h1>
              </th>
              <th>
                <p>{this.props.product.description}</p>
              </th>
              <th>
                {this.props.product.active ? (
                  <p>Currently accepting offers</p>
                ) : (
                  <p>Item currently unavailable</p>
                )}
              </th>
              <th>{this.showDetailsButton()}</th>
            </tr>
            <tr>
              <td colSpan="4">
                {this.state.showDetails ? (
                  <ItemDetails product={this.props.product} />
                ) : (
                  <br></br>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  render() {
    return <div className="centerstyle">{this.conditionalRender()}</div>;
  }
}
