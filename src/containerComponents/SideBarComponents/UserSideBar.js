import React, { Component } from "react";

export default class UserSideBar extends Component {
    constructor(props) {
      super(props);
      this.state= {

      }
    }

    render() {
        return (
            <div>
                <button onClick={() => this.props.setShowDiv("FARM_INFO")}>Farm Info</button>
                <button onClick={() => this.props.setShowDiv("PRODUCT_LIST")}>View Your Products</button>
                <button onClick={() => this.props.setShowDiv("CREATE_PRODUCT")}>Add new product</button>
                <button onClick={() => this.props.setShowDiv("PARTNERSHIP_LIST")}>Partnership List</button>
                <button onClick={() => this.props.setShowDiv("MESSAGE_LIST")}>Message List</button>
                <button onClick={() => this.props.setShowDiv("EDIT_PROFILE")}>Edit Profile</button>
            </div>
        )
    }

}
