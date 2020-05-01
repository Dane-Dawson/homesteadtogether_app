import React, { Component } from "react";
import ItemTile from "../ShowComponents/ItemTile";

export default class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRawProducts: true,
      product: "",
      origin: "",
      category: "Poultry",
      img_src: "",
      description: "",
      tags: "",
      user_id: "",
      categories: [
        "Poultry",
        "Produce",
        "Fiber",
        "Livestock",
        "Dairy",
        "Infrastructure",
        "Guidance",
        "Preserves",
        "Hand-made",
        "Other",
      ],
    };
  }

  submitUserProduct = (event) => {
    event.preventDefault();
    // const { product, origin, category, description, img_src, ftags, user_id, city, name } = this.state;
    const userProductObject = {
      product: this.state.product,
      origin: this.state.origin,
      category: this.state.category,
      description: this.state.description,
      tags: this.state.tags,
      img_src: this.state.img_src,
    };
  };

  //conditioally render of list of all previously created products fed from app state rawProducts, or toggle the form to create a new product if it's not listed
  renderRawProducts = () => {
    if (this.state.showRawProducts === true) {
      return (
        <form>
          <select value={this.state.value} onChange={this.handleProductSelect}>
            {this.props.rawProducts.map((product) => {
              let productName = `${product.name}: ${product.origin.name}`;
              return (
                <option
                  name={product.name}
                  key={product.id}
                  category={product.category.name}
                  origin={product.origin.name}
                  value={product.id}
                >
                  {productName}
                </option>
              );
            })}
          </select>
        </form>
      );
    } else {
      //form to create new product
      return (
        <div>
          <form onSubmit={this.handleProductCreation}>
            <h4>
              Check the existing items carefully to see if what you are offering
              already exists in our database please!
            </h4>
            <br></br>
            <p>
              Product name is what the actual item/service is called. Examples:
              Eggs, Tomatos, Canned Peaches, Wool, etc.
            </p>
            <input
              type="product"
              name="product"
              placeholder="Product name"
              value={this.state.product}
              onChange={this.handleChange}
              required
            />
            <br></br>
            <p>
              Origin is where the item/service came from. Eggs might come from
              "Chicken" or "Duck".
            </p>
            <input
              type="origin"
              name="origin"
              placeholder="Product origin"
              value={this.state.origin}
              onChange={this.handleChange}
              required
            />
            <br></br>
            <p>Choose from one of our categories below</p>
            <select
              value={this.state.value}
              onChange={this.handleCategorySelect}
            >
              {this.state.categories.map((category) => {
                return (
                  <option key={category} value={category} name={category}>
                    {category}
                  </option>
                );
              })}
            </select>
            <br></br>
            <p>
              After adding to the database you can choose your option from the
              drop down
            </p>
            <button type="submit">Add product to database!</button>
          </form>
        </div>
      );
    }
  };
  ///HELPER FUNCTIONS

  //CHANGE
  //need to update to set all states based off product given
  //When choosing a product from the drop down, it sets state accordingly for useProduct post request
  handleProductSelect = (event) => {

    let targetValue = parseInt(event.target.value, 10);
    let productArray = this.props.rawProducts;
    let found = productArray.find((product) => product.id === targetValue);
    console.log(found)
    let product = found.name
    this.setState({
      product: event.target.value,
      //   category: event.target.category.name,
      //   origin: event.target.origin.name,
    });
  };
  //set state of category from dropdown menu
  handleCategorySelect = (event) => {
    this.setState({
      category: event.target.value,
    });
  };

  //Toggles if the selection dropdown is visible or if the create product dropdown
  toggleRawProducts = () => {
    console.log("works?");
    let showRawProducts = !this.state.showRawProducts;
    this.setState({ showRawProducts });
  };

  //Currently useless
  loadRawProductDataIntoForm = (event) => {
    console.log(event.target);
  };

  //Sets state for each of the form entry fields
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  //CHANGE
  //what is called when a new product needs to be created
  handleProductCreation = (event) => {
    event.preventDefault();
    const newProduct = {
      name: this.state.product,
      origin: this.state.origin,
      category: this.state.category,
    };
    let showRawProducts = !this.state.showRawProducts;
    this.setState({ showRawProducts });
    console.log(newProduct);
  };

  render() {
    return (
      <div>
        <button onClick={() => this.toggleRawProducts()}>
          {this.state.showRawProducts
            ? "Click here to create product from scratch"
            : "Click here to look at previously submitted products"}
        </button>
        <br></br>
        {this.renderRawProducts()}
        <br></br>
        <form onSubmit={this.submitUserProduct}>
          <h3> Use the form below to fill out more details</h3>
          <p>
            Write a brief description about what you have! It could be
            information about where it came from or anything fun or interesting
            about it
          </p>
          <textarea
            type="descriptin"
            name="description"
            placeholder="Description"
            value={this.state.description}
            onChange={this.handleChange}
            required
          />
          <br></br>
          <p>Link to an image you have uploaded somewhere of it!</p>
          <input
            type="img_src"
            name="img_src"
            placeholder="URL of image"
            value={this.state.origin}
            onChange={this.handleChange}
            required
          />
          <br></br>
          <p>List any tags separated by commas</p>
          <input
            type="tags"
            name="tags"
            placeholder="Tags"
            value={this.state.tags}
            onChange={this.handleChange}
            required
          />
          <br></br>
          <button type="submit">Add product to your farm!</button>
        </form>
      </div>
    );
  }
}
