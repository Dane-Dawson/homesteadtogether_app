import React, { Component } from "react";
import ItemDetails from "./ItemDetails";

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

  //button render for details
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
        <h1>{this.props.product.product.name}</h1>
        {this.showDetailsButton()}
      </div>
    );
  }
}
