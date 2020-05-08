import React, { Component } from "react";
import axios from "axios";
import Registration from "./auth/Registration";
import Login from "./auth/Login";

import FarmIcon from "../images/farmIcon.png";
import ChickenIcon from "../images/chickenIcon.png";
import landingLogo from "../images/landingLogo.png";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDiv: "SIGN_IN",
    };

    // Can't get any binds to work
    // this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this)
  }

  farmIcon = () => (
    <img
      src={FarmIcon}
      height="100px"
      alt="farmIcon"
      onClick={() => this.props.showUserSideBar()}
    ></img>
  );
  chickenIcon = () => (
    <img
      src={ChickenIcon}
      height="100px"
      alt="chickenIcon"
      onClick={() => this.props.showProductSideBar()}
    ></img>
  );

  renderLogo = () => {
    if (this.props.loggedInStatus === "LOGGED_IN") {
      return <img src={landingLogo} className="logo"></img>;
    } else {
      return (
        <div>
          <img src={landingLogo} className="logolanding"></img>
          <h2 className="landingmessage">
            A community of makers for the exchange of home-made and home-grown goods!
          </h2>
        </div>
      );
    }
  };

  handleSuccessfulAuth = (data) => {
    this.props.handleLogin(data);
    // this.props.history.push("/dashboard");
  };

  handleLogoutClick = () => {
    axios
      .delete("http://localhost:3001/logout", { withCredentials: true })
      .then((response) => {
        this.props.handleLogout();
      })
      .catch((error) => {
        console.log("logout error", error);
      });
  };

  checkLoggedInStatus = () => {
    if (this.props.loggedInStatus === "LOGGED_IN") {
      <button onClick={() => this.handleLogoutClick()}>Logout</button>;
    } else this.handleDisplay();
  };

  handleDisplay = () => {
    if (this.props.loggedInStatus === "LOGGED_IN") {
      return (
        <div>
          <table className="topbar">
            <tbody>
              <tr id="topbuttons" className="topbuttons">
                <td>
                  <button
                    onClick={() => this.props.showUserSideBar()}
                    className="topbutton"
                  >
                    <h3 className="topbuttontext">View your farm</h3>
                  </button>{" "}
                </td>
                {/* {this.chickenIcon()}</td> */}
                <td>
                  <button
                    onClick={() => this.props.showProductSideBar()}
                    className="topbutton"
                  >
                    <h3 className="topbuttontext">View listings from all farms</h3>
                  </button>
                </td>
                {/* {this.farmIcon()}</td> */}
                <td>
                  <button
                    onClick={() => this.handleLogoutClick()}
                    className="logout"
                  >
                    Logout
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          {/* {this.chickenIcon()}
          {this.farmIcon()}
          <br></br>
          <button onClick={() => this.handleLogoutClick()}>Logout</button> */}
        </div>
      );
    } else {
      if (this.state.showDiv === "SIGN_IN") {
        return (
          <div>
            <br></br>
            {/* <button onClick={() => this.toggleShowDiv()}>
              Toggle Signup/Login
            </button> */}
            <Login
            setShowDiv={this.props.setShowDiv}
              toggleShowDiv={this.toggleShowDiv}
              handleSuccessfulAuth={this.handleSuccessfulAuth}
            />
          </div>
        );
      } else {
        return (
          <div>
            <br></br>
            {/* <button onClick={() => this.toggleShowDiv()}>
              Toggle Signup/Login
            </button> */}
            <Registration
              toggleShowDiv={this.toggleShowDiv}
              handleSuccessfulAuth={this.handleSuccessfulAuth}
            />
          </div>
        );
      }
    }
  };

  toggleShowDiv = () => {
    if (this.state.showDiv === "SIGN_IN") {
      this.setState({ showDiv: "REGISTER" });
    } else {
      this.setState({ showDiv: "SIGN_IN" });
    }
  };

  render() {
    return (
      <div>
        {/* <h6>Status: {this.props.loggedInStatus}</h6> */}
        {this.renderLogo()}
        {this.handleDisplay()}
      </div>
    );
  }
}
