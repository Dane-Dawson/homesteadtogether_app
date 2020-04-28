import React, { Component } from "react";
import FarmIcon from "../images/farmIcon.png"
import ChickenIcon from "../images/chickenIcon.png"

export default class TopNav extends Component {
    constructor(props) {
      super(props);
      this.state= {

      }
    }

    farmIcon = () => (<img src={FarmIcon} height="100px" alt="farmIcon"></img>)

    chickenIcon = () => (<img src={ChickenIcon} height="100px" alt="chickenIcon"></img>)
    

    render() {
        return (
            
            <div>
             <h1>Homestead Together</h1>
             {this.chickenIcon()}
             {this.farmIcon()}
            </div>
        )
    }

}
