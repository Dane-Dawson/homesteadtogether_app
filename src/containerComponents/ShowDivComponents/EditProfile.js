import React, { Component } from "react";

export default class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      avatar_src: "",
      zip_code: "",
      farm_name: "",
      street_address: "",
      city: "",
      name: "",
      registrationErrors: "",
    };
  }

  //set state to every change
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  createUserUpdateObject = (user) => {
    const userUpdateObject = {
      email,
      avatar_src,
      zip_code,
      farm_name,
      street_address,
      city,
      name,
    };

    userUpdateObject.map((attribute) => {
      let value = this.state[attribute];
      if (value < 1) {
        [attribute].value = this.props.user[attribute];
      } else {
        [attribute].value = this.state[attribute];
      }
    });

    console.log(userUpdateObject);
  };

  updateUserState = (userObject) => {
    let nestedUserObject = {
      user: userObject,
    };
    console.log(nestedUserObject)
    this.props.handleLogin(nestedUserObject);
  };

  //submit form
  handleSubmit = (event) => {
    event.preventDefault();
    //all variables are set from state
    const {
      email,
      avatar_src,
      zip_code,
      farm_name,
      street_address,
      city,
      name,
    } = this.state;
    //define user id
    let userId = this.props.user.id;
    // this.createUserUpdateObject()
    // define user update object
    let userObject = {
      id: userId,
      email: email,
      avatar_src: avatar_src,
      zip_code: zip_code,
      farm_name: farm_name,
      street_address: street_address,
      city: city,
      name: name,
    };

    let postObject = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(userObject),
    };
    fetch("http://localhost:3001/users/" + userId, postObject);
    this.updateUserState(userObject)
    window.alert("Farm updated!")
    this.props.setShowDiv("FARM_INFO")
  };

  render() {
    return (
      <div>
        EditProfile
        <h2>Fill out the form with fields you want to update</h2>
        <p>---</p>
        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder={this.props.user.email}
            value={this.state.email}
            onChange={this.handleChange}
          />
          <br></br>
          <input
            type="name"
            name="name"
            placeholder={this.props.user.name}
            value={this.state.name}
            onChange={this.handleChange}
          />
          <br></br>
          <input
            type="avatar_src"
            name="avatar_src"
            placeholder={this.props.user.avatar_src}
            value={this.state.avatar_src}
            onChange={this.handleChange}
          />
          <br></br>
          <input
            type="farm_name"
            name="farm_name"
            placeholder={this.props.user.farm_name}
            value={this.state.farm_name}
            onChange={this.handleChange}
          />
          <br></br>
          <input
            type="street_address"
            name="street_address"
            placeholder={this.props.user.street_address}
            value={this.state.street_address}
            onChange={this.handleChange}
          />
          <br></br>
          <input
            type="city"
            name="city"
            placeholder={this.props.user.city}
            value={this.state.city}
            onChange={this.handleChange}
          />
          <br></br>
          <input
            type="zip_code"
            name="zip_code"
            placeholder={this.props.user.zip_code}
            value={this.state.zip_code}
            onChange={this.handleChange}
          />
          <br></br>
          <button type="submit">Update</button>
        </form>
      </div>
    );
  }
}
