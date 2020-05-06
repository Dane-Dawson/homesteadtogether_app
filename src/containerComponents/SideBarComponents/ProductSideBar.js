import React, { Component } from "react";

export default class ProductSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

//   componentDidUpdate() {
//  this.props.filterProductByCategory()
//   }

  setAndFilterCategory = (categoryName) => {
    this.props.setFilterCategory(categoryName)
    this.props.filterProductByCategory(categoryName)
  }

  mapCategoryButtons = () => {
      return (
          <div>
            <ul>
        <button id="productcategoryselect" onClick={()=> this.setAndFilterCategory("ALL")}>All</button>
        <button id="productcategoryselect" onClick={()=> this.setAndFilterCategory("Poultry")}>Poultry</button>
        <button id="productcategoryselect" onClick={()=> this.setAndFilterCategory("Produce")}>Produce</button>
        <button id="productcategoryselect" onClick={()=> this.setAndFilterCategory("Fiber")}>Fiber</button>
        <button id="productcategoryselect" onClick={()=> this.setAndFilterCategory("Livestock")}>Livestock</button>
        <button id="productcategoryselect" onClick={()=> this.setAndFilterCategory("Dairy")}>Dairy</button>
        <button id="productcategoryselect" onClick={()=> this.setAndFilterCategory("Infrastructure")}>Infrastructure</button>
        <button id="productcategoryselect" onClick={()=> this.setAndFilterCategory("Guidance")}>Guidance</button>
        <button id="productcategoryselect" onClick={()=> this.setAndFilterCategory("Preserves")}>Preserves</button>
        <button id="productcategoryselect" onClick={()=> this.setAndFilterCategory("Hand-made")}>Hand-made</button>
        <button id="productcategoryselect" onClick={()=> this.setAndFilterCategory("Other")}>Other</button>
        </ul>
          </div>
      )
  }

  render() {
    return (
      <div>
        <h3 className="productbar">View items by category</h3>
        {this.mapCategoryButtons()}
      </div>
    );
  }
}
