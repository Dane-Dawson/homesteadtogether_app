import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loginErrors: "",
    };

    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    axios
      .post(
        "http://localhost:3001/sessions",
        {
          user: {
            email: email,
            password: password,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.logged_in) {
          this.props.handleSuccessfulAuth(response.data);
        }
      })
      .catch((error) => {
        console.log("login error", error);
      });
      this.props.setShowDiv("FARM_INFO")
  };

  render() {
    return (
      <div className="loginform">
        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
          <br></br>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
          <br></br>
          <br></br>
          <button type="submit" className="loginbutton">Login</button>
          <br></br>
          <br></br>
        </form>
          <h2 >Don't have an account?</h2>
          <button onClick={() => this.props.toggleShowDiv()} className="loginlink">Register here!</button>
      </div>
    );
  }
}
