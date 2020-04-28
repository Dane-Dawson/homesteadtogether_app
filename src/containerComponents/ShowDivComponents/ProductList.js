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

    render() {
        return (
            <div>ProductList
            <ItemTile />
            
            </div>
        )
    }

}