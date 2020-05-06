import React, { Component } from "react";

export default class ItemDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flagMessage: "",
      flagOn: false,
      userProductId: "",
      isActive: true,
    };
  }

  //set product id and active status on mount
  componentDidMount = () => {
    this.setState({ userProductId: this.props.product.id });
    this.setState({ isActive: this.props.product.active });
  };

  //update state to match forms for post
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  //flag message field and it's form
  showFlagMessage = () => {
    if (this.state.flagOn) {
      return (
        <div>
          <form>
            <textarea
              type="flagMessage"
              name="flagMessage"
              onChange={this.handleChange}
              value={this.state.flagMessage}
            ></textarea>
            <br></br>
            <button className="reportsubmit" type="submit">
              Submit report
            </button>
          </form>
        </div>
      );
    }
  };

  //show textarea for message flag
  toggleMessage = () => {
    console.log("hi");
    let flagOn = !this.state.flagOn;
    this.setState({ flagOn });
  };

  //List if product is active or not
  renderActiveState = () => {
    if (this.state.isActive === true) {
      return <p>Accepting offers</p>;
    } else {
      return <p>Currently Unavailable</p>;
    }
  };

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>
                <img
                  src={this.props.product.img_src}
                  width="200px"
                  alt={this.props.product.description}
                ></img>
              </th>
              <th>
                <p>{this.props.product.description}</p>
                <h3>Sourced from:</h3>
                <p>{this.props.product.user.city}</p>
                {this.renderActiveState()}
                <br></br>
                <p>If you are interested, email at</p>
                <p>{this.props.product.user.email}</p>
                <button
                  className="reportbutton"
                  onClick={() => this.toggleMessage()}
                >
                  Report listing
                </button>
                {this.showFlagMessage()}
              </th>
            </tr>
          </thead>
        </table>
      </div>
    );
  }
}
