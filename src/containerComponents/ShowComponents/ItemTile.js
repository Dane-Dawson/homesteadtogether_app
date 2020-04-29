import React, { Component } from "react";
import ItemDetails from "./ItemDetails";

export default class ItemTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false,
    };
  }

  toggleShowDetailsState = () => {
    let showDetails = this.state.showDetails;
    showDetails = !showDetails;
    this.setState({ showDetails });
  };

  showDetails = () => {
    if (this.state.showDetails === true) {
      return (
        <div>
          <button class="ui secondary button" onClick={this.toggleShowDetailsState}> Hide Details! </button>
          {console.log(this.props.product.name)}
          <ItemDetails />
        </div>
      );
    } else {
      return (
        <div>
        {/* {this.props.product.name} */}
          <button class="ui primary button" onClick={this.toggleShowDetailsState}> Show Details! </button>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <h1>{this.props.product.name}</h1>
        {this.showDetails()}
      </div>
    );
  }
}
