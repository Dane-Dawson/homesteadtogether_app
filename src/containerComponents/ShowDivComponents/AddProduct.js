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
      origins: [],
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
      product_id: this.state.product.id,
      description: this.state.description,
      tags: this.state.tags,
      img_src: this.state.img_src,
      user_id: this.props.user.id,
      active: true
    };
    fetch("http://localhost:3001/user_products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(userProductObject),
    });
    window.alert("Product submitted!");
    this.props.setShowDiv("FARM_INFO")
    this.props.fetchAllProducts()
    this.props.sortUserProductsOwned()
  };

  //conditioally render of list of all previously created products fed from app state rawProducts, or toggle the form to create a new product if it's not listed
  renderRawProducts = () => {
    if (this.state.showRawProducts === true) {
      return (
        <div className="form">
          <h3>
            Check the existing items carefully to see if what you are offering
            already exists in our database please!
          </h3>
          <br></br>
          <form>
            <select
              value={this.state.value}
              onChange={this.handleProductSelect}
            >
              <option>Select From below!</option>
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
          <br></br>
          <h3>
            Otherwise, click the button below to add your product to the list.
          </h3>
          <br></br>
        </div>
      );
    } else {
      //form to create new product
      return (
        <div className="form">
          <form onSubmit={this.handleProductCreation}>
            <br></br>
            <p>
              Product name is what the actual item/service is called. Examples:
              Eggs, Tomatos, Raw Wool, etc.
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
              Origin is where the item/service came from. Choose from ours
              below!
            </p>
            <select value={this.state.value} onChange={this.handleOriginSelect}>
              <option>Select Origin from below!</option>
              {this.state.origins.map((origin) => {
                return (
                  <option
                    key={origin.id}
                    value={origin.name}
                    name={origin.name}
                  >
                    {origin.name}
                  </option>
                );
              })}
            </select>
            <br></br>
            <p>Choose from one of our categories below</p>
            <select
              value={this.state.value}
              onChange={this.handleCategorySelect}
            >
              <option>Select Category from below!</option>
              {this.state.categories.map((category) => {
                return (
                  <option
                    key={category.id}
                    value={category.name}
                    name={category.name}
                  >
                    {category.name}
                  </option>
                );
              })}
            </select>
            <br></br>
            <p>
              After adding to the database you can choose your option from the
              drop down
            </p>
            <button
              className="addproduct"
              type="submit"
              onClick={() => this.processNewProduct()}
            >
              Add product to database!
            </button>
            <br></br>
            <br></br>
          </form>
        </div>
      );
    }
  };
  ///SET  BASE STATES ON COMPONENT MOUNT

  componentDidMount() {
    this.fetchCategories();
    this.fetchOrigins();
    this.props.fetchRawProducts();
  }

  fetchCategories = () => {
    fetch("http://localhost:3001/categories")
      .then((response) => response.json())
      .then((categories) => this.setState({ categories }));
  };

  fetchOrigins = () => {
    fetch("http://localhost:3001/origins")
      .then((response) => response.json())
      .then((origins) => this.setState({ origins }));
  };

  ///HELPER FUNCTIONS

  //CHANGE
  //need to update to set all states based off product given
  //When choosing a product from the drop down, it sets state accordingly for useProduct post request
  handleProductSelect = (event) => {
    let targetValue = parseInt(event.target.value, 10);
    let productArray = this.props.rawProducts;
    let found = productArray.find((product) => product.id === targetValue);
    console.log(found);
    console.log(found.category);
    let product = found.name;
    this.setState({
      product: found,
      category: found.category,
      origin: found.origin,
    });
  };

  handleOriginSelect = (event) => {
    let targetValue = event.target.value;
    let originArray = this.state.origins;
    let found = originArray.find((origin) => origin.name === targetValue);
    this.setState({
      origin: found,
    });
  };
  //set state of category from dropdown menu
  handleCategorySelect = (event) => {
    let targetValue = event.target.value;
    let categoryArray = this.state.categories;
    let found = categoryArray.find((category) => category.name === targetValue);
    this.setState({
      category: found,
    });
  };

  //Toggles if the selection dropdown is visible or if the create product dropdown
  toggleRawProducts = () => {
    console.log("works??");
    let showRawProducts = !this.state.showRawProducts;
    this.setState({ showRawProducts });
  };

  //process new product by adding it to database and setting background states for form submission for new UserProduct
  processNewProduct = () => {
    this.addProductToDatabase();
    //   this.loadRawProductDataIntoForm()
  };

  //add product to databse
  addProductToDatabase = () => {
    fetch("http://localhost:3001/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        name: this.state.product,
        origin_id: this.state.origin.id,
        category_id: this.state.category.id,
      }),
    });
    // this.props.fetchRawProducts;
    this.props.setShowDiv("FARM_INFO")
    // this.setState({
    //   product: {
    //     name: this.state.product,
    //     id: this.props.rawProducts.length + 1,
    //   },
    // });
    window.alert("Product has been added!");
  };

  //Put new product into form
  loadRawProductDataIntoForm = () => {
    this.setState({
      product: event.target.product,
      origin: event.target.origin,
      category: event.target.category,
    });
    // console.log(event.target);
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
      <div className="form">
        <div className="form">
          {this.renderRawProducts()}

          <button
            className="addproduct"
            onClick={() => this.toggleRawProducts()}
          >
            {this.state.showRawProducts
              ? "Create product from scratch"
              : "View previously submitted products"}
          </button>
          <br></br>
          <br></br>
          <br></br>
        </div>
        <div>
          <form onSubmit={this.submitUserProduct}>
            <h3> Use the form below to fill out more details</h3>
            <p>Write a brief description about your product!</p>
            <textarea
              type="descriptin"
              name="description"
              placeholder="Description"
              value={this.state.description}
              onChange={this.handleChange}
            />
            <br></br>
            <p>Link to an image of it!</p>
            <input
              type="img_src"
              name="img_src"
              placeholder="URL of image"
              value={this.state.img_src}
              onChange={this.handleChange}
            />
            <br></br>
            <p>List any tags separated by commas</p>
            <input
              type="tags"
              name="tags"
              placeholder="Tags"
              value={this.state.tags}
              onChange={this.handleChange}
            />
            <br></br>
            <br></br>
            <button
              type="submit"
              className="addproduct"
              id="addproduct"
            >
              Add product to your farm!
            </button>
          </form>
        </div>
      </div>
    );
  }
}
