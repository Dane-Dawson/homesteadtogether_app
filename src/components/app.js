import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import axios from "axios";

import Home from "./Home";
import Dashboard from "./Dashboard";
import ShowDiv from "../containerComponents/ShowDiv";
import SideBar from "../containerComponents/SideBar";
import TopNav from "../containerComponents/TopNav";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
      sideBarShow: "USER_SIDE_BAR",
      showDivShow: "FARM_INFO",
      userProducts: [],
      allProducts: [],
      filteredProducts: [],
      rawProducts: [],
      filterCategory: "ALL",
    };

    // this.handleLogin=this.handleLogin.bind(this)
    // this.handleLogout=this.handleLogout.bind(this)
  }

  filterProductByCategory = (categoryName) => {
    if (categoryName === "ALL") {
      this.setState({
        filteredProducts: this.state.allProducts,
      });
    } else {
      let allProducts = this.state.allProducts;
      let filteredProducts = allProducts.filter(
        (product) => product.category.name === categoryName
      );
      this.setState({ filteredProducts });
    }
  };

  setFilterCategory = (categoryName) => {
    this.setState({ filterCategory: categoryName });
  };

  checkLoginStatus = () => {
    axios
      .get("http://localhost:3001/logged_in", { withCredentials: true })
      .then((response) => {
        if (
          response.data.logged_in &&
          this.state.loggedInStatus === "NOT_LOGGED_IN"
        ) {
          this.setState({
            loggedInStatus: "LOGGED_IN",
            user: response.data.user,
          });
        } else if (
          !response.data.logged_in &
          (this.state.loggedInStatus === "LOGGED_IN")
        ) {
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN",
            user: {},
          });
        }
      })
      .catch((error) => {
        console.log("check login error", error);
      });
  };

  //Fetch all products to be listed
  //CHANGE this still needs the proper fetch to the proper source
  //second fetch sets the current raw product list for userProduct creation
  fetchAllProducts = () => {
    // axios.get("http://localhost:3001/products", { withCredentials: true } )
    fetch("http://localhost:3001/user_products")
      .then((response) => response.json())
      .then((allProducts) =>
        this.setState({ allProducts, filteredProducts: allProducts })
      );
  };

  fetchRawProducts = () => {
    fetch("http://localhost:3001/products")
      .then((response) => response.json())
      .then((rawProducts) => this.setState({ rawProducts }));
  };

  componentDidMount() {
    this.checkLoginStatus();
    this.fetchAllProducts();
    this.fetchRawProducts();
  }

  //filter user_products owned by user into array
  sortUserProductsOwned = () => {
    let allProducts = this.state.allProducts;
    let userId = this.state.user.id;
    let userProducts = allProducts.filter(
      (product) => product.user.id === userId
    );
    this.setState({ userProducts });
  };

  handleLogout = () => {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
    });
  };

  handleLogin = (data) => {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user,
    });
  };

  setShowDiv = (showDivState) => {
    this.setState({ showDivShow: showDivState });
  };
  //Only shows the side bar and showdiv if the user is logged in
  renderShowIfLoggedIn = () => {
    if (this.state.loggedInStatus === "LOGGED_IN") {
      return (
        <div>
          <table className="maintable" id="maintable">
            <tbody>
              <tr>
                <td className="sidebar" id="sidebar">
                  <SideBar
                    filterProductByCategory={this.filterProductByCategory}
                    setFilterCategory={this.setFilterCategory}
                    setShowDiv={this.setShowDiv}
                    sideBarShow={this.state.sideBarShow}
                  />
                </td>
                <td className="content" id="content">
                  <ShowDiv
                    setFilterCategory={this.setFilterCategory}
                    sortUserProductsOwned={this.sortUserProductsOwned}
                    filterCategory={this.state.filterCategory}
                    fetchAllProducts={this.fetchAllProducts}
                    fetchRawProducts={this.fetchRawProducts}
                    rawProducts={this.state.rawProducts}
                    setShowDiv={this.setShowDiv}
                    handleLogout={this.handleLogout}
                    handleLogin={this.handleLogin}
                    user={this.state.user}
                    filteredProducts={this.state.filteredProducts}
                    allProducts={this.state.filteredProducts}
                    userProducts={this.state.userProducts}
                    sideBarShow={this.state.sideBarShow}
                    showDivShow={this.state.showDivShow}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
  };

  showUserSideBar = () => {
    this.setState({
      sideBarShow: "USER_SIDE_BAR",
      showDivShow: "FARM_INFO",
    });
  };

  showProductSideBar = () => {
    this.setState({
      sideBarShow: "PRODUCT_SIDE_BAR",
      showDivShow: "PRODUCT_LIST",
    });
  };

  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path={"/"}
              render={(props) => (
                <Home
                setShowDiv={this.setShowDiv}
                  {...props}
                  showUserSideBar={this.showUserSideBar}
                  showProductSideBar={this.showProductSideBar}
                  handleLogin={this.handleLogin}
                  handleLogout={this.handleLogout}
                  loggedInStatus={this.state.loggedInStatus}
                />
              )}
            />
            <Route
              exact
              path={"/dashboard"}
              render={(props) => (
                <Dashboard
                  {...props}
                  loggedInStatus={this.state.loggedInStatus}
                  handleLogout={this.handleLogout}
                />
              )}
            />{" "}
            />
          </Switch>
        </BrowserRouter>
        {this.renderShowIfLoggedIn()}
      </div>
    );
  }
}
