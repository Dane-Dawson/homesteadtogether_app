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

  farmIcon = () => <img src={FarmIcon} height="100px" alt="farmIcon" onClick={() => this.props.showUserSideBar()}></img>;
  chickenIcon = () => (
    <img src={ChickenIcon} height="100px" alt="chickenIcon" onClick={() => this.props.showProductSideBar()}></img>
  );

  renderLogo = () => {
    if (this.props.loggedInStatus === "LOGGED_IN"){
        return <img src={landingLogo} height="50px"></img>
    } else {
        return (
            <div>
        <img src={landingLogo}></img>
        <p>A community seeking for those who grow, raise, or make their own goods to share and exchange with other like minded people.</p>
        </div>
        )
    }
  }

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
          {this.chickenIcon()}
          {this.farmIcon()}
          <br></br>
          <button onClick={() => this.handleLogoutClick()}>Logout</button>
        </div>
      );
    } else {
      if (this.state.showDiv === "SIGN_IN") {
        return (
          <div>
          <br></br>
            <button onClick={() => this.toggleShowDiv()}>
              Toggle Signup/Login
            </button>
            <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
          </div>
        );
    } else {
        return (
            <div>
            <br></br>
            <button onClick={() => this.toggleShowDiv()}>
              Toggle Signup/Login
            </button>
            <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} />
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
        {this.renderLogo()}
        {this.handleDisplay()}
        <h6>Status: {this.props.loggedInStatus}</h6>
      </div>
    );
  }
}
