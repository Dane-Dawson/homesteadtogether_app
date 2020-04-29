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
    };

    // this.handleLogin=this.handleLogin.bind(this)
    // this.handleLogout=this.handleLogout.bind(this)
  }

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
  fetchAllProducts = () => {
    // axios.get("http://localhost:3001/products", { withCredentials: true } )
    fetch("http://localhost:3001/products")
      .then((response) => response.json())
      .then((allProducts) => this.setState({ allProducts }));
  };

  componentDidMount() {
    this.checkLoginStatus();
    this.fetchAllProducts();
  }

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
          {/* <TopNav /> */}
          <div className="ui divider"></div>
          <SideBar
            setShowDiv={this.setShowDiv}
            sideBarShow={this.state.sideBarShow}
          />
          <ShowDiv
            setShowDiv={this.setShowDiv}
            handleLogin={this.handleLogin}
            user={this.state.user}
            allProducts={this.state.allProducts}
            userProducts={this.state.userProducts}
            sideBarShow={this.state.sideBarShow}
            showDivShow={this.state.showDivShow}
          />
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
        <h1> {this.state.user.email} is logged in!</h1>
        {this.renderShowIfLoggedIn()}
      </div>
    );
  }
}
