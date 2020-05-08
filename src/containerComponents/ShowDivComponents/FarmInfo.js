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
    
    conditionPhotorender = () => {
      if (this.props.user.avatar_src) {
        return ( <img src={this.props.user.avatar_src} height="150px"></img>)
      }
    }

    render() {
        return (
            <div className="farminfobox">
            <p>Welcome to</p>
            {this.conditionPhotorender()}
            <h1 className="farmname">{this.props.user.farm_name}!</h1>
            <p>Owned and operated by {this.props.user.name}</p>

            <p>Your address is stored privately and will never be shared without your permission</p>
            <p>We highly recommend including a zip code for ease of finding nearby farms and partnerships</p>
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