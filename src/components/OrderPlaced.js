import React,{ Component } from "react";
import { Link } from "react-router-dom";

class OrderPlaced extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const style = {
      border: "2px solid blue",
      width: "200px",
      height: "25px",
      textDecoration: "none",
      textAlign:"center",
    };
    return (
      <div className="column top-adjust">
        <div>Order Placed Check Email for more details</div>
        <Link style={style} to="/register">Click To Register Page</Link>
      </div>
    );
  }
}

export default OrderPlaced;