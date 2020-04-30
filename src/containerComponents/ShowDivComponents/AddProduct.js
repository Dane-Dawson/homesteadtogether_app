import React, { Component } from "react";
import ItemTile from "../ShowComponents/ItemTile"

export default class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
        showRawProducts: true,
        product: "",
        origin: "",
        category: "",
        img_src: "",
        description: "",
        tags: "",
        user_id: "",


    };
  }


  toggleRawProducts = () => {
      console.log("works?")
      let showRawProducts = !this.state.showRawProducts
      this.setState({ showRawProducts })
  }

  loadRawProductDataIntoForm = (event) => {
      console.log(event.target)
  }

  renderRawProducts = () => {
      if (this.state.showRawProducts === true){
    return (
        <div>
        <ul>
       { this.props.rawProducts.map(product =>{return <button key={product.id} category={product.category} origin={product.origin} name={product.name} onClick={this.loadRawProductDataIntoForm}>{product.name}</button>})}
       </ul>
        </div>
         )
      }
  }

  render() {
    return (
      <div>
      <button onClick={() => this.toggleRawProducts()}>Choose from exisiting products</button>
      <br></br>
        {this.renderRawProducts()}
        <br></br>
        <h3> Use the form below to fill out more details</h3>
        {/* <Dropdown title="Select location" list={this.props.rawProducts} /> */}
      </div>
    );
  }
}
