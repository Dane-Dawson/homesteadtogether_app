import React, { Component } from "react";
import ItemDetails from "./ItemDetails";

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
    };
  }

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
          <button className="ui secondary button" onClick={this.toggleShowDetailsState}> Hide Details! </button>
          <ItemDetails product={this.props.product}/>
        </div>
      );
    } else {
      return (
        <div>
        {/* {this.props.product.name} */}
          <button className="ui primary button" onClick={this.toggleShowDetailsState}> Show Details! </button>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
      <img src={categoryPoultry} height="30px"></img>
        <h1>{this.props.product.product.name}</h1>
        {this.showDetailsButton()}
      </div>
    );
  }
}
