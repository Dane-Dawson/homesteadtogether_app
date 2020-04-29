import React, { Component } from "react";
import axios from "axios";

export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      password_confirmation: "",
      avatar_src: "",
      zip_code: "",
      farm_name: "",
      street_address: "",
      city: "",
      name: "",
      registrationErrors: "",
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
    const { email, password, password_confirmation, avatar_src, zip_code, farm_name, street_address, city, name } = this.state;
    axios
      .post(
        "http://localhost:3001/registrations",
        {
          user: {
            email: email,
            password: password,
            password_confirmation: password_confirmation,
            avatar_src: avatar_src, 
            zip_code: zip_code, 
            farm_name: farm_name, 
            street_address: street_address, 
            city: city, 
            name: name
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.status === "created")
          this.props.handleSuccessfulAuth(response.data);
      })
      .catch((error) => {
        console.log("registration error", error);
      });
  };

  render() {
    return (
      <div>
        <h2>Fill out the form below to register for a new account</h2>
        <p>Email and password are required</p>
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
          <input
            type="password"
            name="password_confirmation"
            placeholder="Password confirmation"
            value={this.state.password_confirmation}
            onChange={this.handleChange}
            required
          />
          <br></br>
          <input
            type="name"
            name="name"
            placeholder="Full Name (optional)"
            value={this.state.name}
            onChange={this.handleChange}
            required
          />
          <br></br>
          <input
            type="avatar_src"
            name="avatar_src"
            placeholder="URL of profile picture (optional)"
            value={this.state.avatar_src}
            onChange={this.handleChange}
            required
          />
          <br></br>
          <input
            type="farm_name"
            name="farm_name"
            placeholder="Farm Name (optional)"
            value={this.state.farm_name}
            onChange={this.handleChange}
            required
          />
          <br></br>
          <input
            type="street_address"
            name="street_address"
            placeholder="Street Address (optional)"
            value={this.state.street_address}
            onChange={this.handleChange}
            required
          />
          <br></br>
          <input
            type="city"
            name="city"
            placeholder="City (optional)"
            value={this.state.city}
            onChange={this.handleChange}
            required
          />
          <br></br>
          <input
            type="zip_code"
            name="zip_code"
            placeholder="Zip Code (optional)"
            value={this.state.zip_code}
            onChange={this.handleChange}
            required
          />
          <br></br>
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}
