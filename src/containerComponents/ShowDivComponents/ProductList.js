import React, { Component } from "react";
import ItemTile from "../ShowComponents/ItemTile"
import ItemDetails from "../ShowComponents/ItemDetails"

export default class ProductList extends Component {
    constructor(props) {
      super(props);
      this.state= {
          products: [],
          

      }
    }

    listAllProducts = () => {
        return this.props.allProducts.map(product =><ItemTile key={product.id} product={product}/>) 
    }
    render() {
        return (
            <div>ProductList
            {this.listAllProducts()}
            
            
            </div>
        )
    }

}