import React, { Component } from "react";
import axios from "axios";
import Registration from "./auth/Registration";
import Login from "./auth/Login";

export default class Home extends Component {
  constructor(props) {
    super(props);

    // Can't get any binds to work
    // this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this)
  }

  handleSuccessfulAuth = (data) => {
    this.props.handleLogin(data);
    this.props.history.push("/dashboard");
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

  render() {
    return (
      <div>
        <h1>Home</h1>
        <h1>Status: {this.props.loggedInStatus}</h1>
        <button onClick={() => this.handleLogoutClick()}>Logout</button>
        <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} />
        <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
      </div>
    );
  }
}
