import React, { Component } from "react";

let centerStyle = {
    margin: "auto",
    // justifyContent: "center",
  };
export default class FarmInfo extends Component {
    constructor(props) {
      super(props);
      this.state= {

      }
    }
    

    render() {
        return (
            <div style={centerStyle} >FarmInfo
            <p>Welcome to</p>
            <h1>{this.props.user.farm_name}!</h1>
            <p>Owned and operated by {this.props.user.name}</p>

            <p>Your address is stored privately and will never be shared without your permission</p>
            <p>We highly recommend you at least put in your zipcode to locate other users near you easier</p>
            <br></br>
            <br></br>
            <p>Currently, we have your address as:</p>

            <p>{this.props.user.farm_name}</p>
            <p>{this.props.user.street_address}</p>
            <p>{this.props.user.city}</p>
            <p>{this.props.user.zip_code}</p>
            
            </div>
        )
    }

}