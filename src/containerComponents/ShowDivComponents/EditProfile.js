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

  loadDefaultValues = () => {
    this.setState({
      email: this.props.user.email,
      avatar_src: this.props.user.avatar_src,
      zip_code: this.props.user.zip_code,
      farm_name: this.props.user.farm_name,
      street_address: this.props.user.street_address,
      city: this.props.user.city,
      name: this.props.user.name,
    })
  }

  //set state to every change
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  componentDidMount(){
    this.loadDefaultValues()
  }

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

  deleteUser = () => {
    let userId = this.props.user.id
    let postObject = {
      method: "DELETE"
    };
    if (window.confirm("Are you sure you want to delete your account?")){
      axios
      .delete("http://localhost:3001/logout", { withCredentials: true })
      .then((response) => {
        this.props.handleLogout();
      })
      .catch((error) => {
        console.log("logout error", error);
      });
    fetch("http://localhost:3001/users/" + userId, postObject);}
  }

  render() {
    return (
      <div >
        EditProfile
        <h2>Fill out the form with fields you want to update</h2>
        <p>---</p>
        <form onSubmit={this.handleSubmit} className="editform">
        <label>Email address</label>
        <br></br>
          <input
            type="email"
            name="email"
            placeholder={this.props.user.email}
            value={this.state.email}
            onChange={this.handleChange}
          />
          <br></br>
          <label>Your Name</label>
        <br></br>
          <input
            type="name"
            name="name"
            placeholder={this.props.user.name}
            value={this.state.name}
            onChange={this.handleChange}
          />
          <br></br>
          <label>URL of a picture of you or your farm</label>
        <br></br>
          <input
            type="avatar_src"
            name="avatar_src"
            placeholder={this.props.user.avatar_src}
            value={this.state.avatar_src}
            onChange={this.handleChange}
          />
          <br></br>
          <label>Farm name</label>
        <br></br>
          <input
            type="farm_name"
            name="farm_name"
            placeholder={this.props.user.farm_name}
            value={this.state.farm_name}
            onChange={this.handleChange}
          />
          <br></br>
          <label>Street address</label>
        <br></br>
          <input
            type="street_address"
            name="street_address"
            placeholder={this.props.user.street_address}
            value={this.state.street_address}
            onChange={this.handleChange}
          />
          <br></br>
          <label>City</label>
        <br></br>
          <input
            type="city"
            name="city"
            placeholder={this.props.user.city}
            value={this.state.city}
            onChange={this.handleChange}
          />
          <br></br>
          <label>Zip code</label>
        <br></br>
          <input
            type="zip_code"
            name="zip_code"
            placeholder={this.props.user.zip_code}
            value={this.state.zip_code}
            onChange={this.handleChange}
          />
          <br></br>
          <br></br>
          <button className="updatefarm" type="submit">Update</button>
        </form>
        <br></br>
        <br></br>
        <button className="deleteaccount" onClick={() => this.deleteUser()}>Delete your account</button>
      </div>
    );
  }
}
