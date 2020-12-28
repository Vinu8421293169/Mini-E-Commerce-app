import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cart from "./Cart";
import data from "./data";

export default class Catalouge extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="center" style={{flexDirection:"column"}}>
        <div id="cart-items">
          {data.map((item, idx) => {
            return (
              <Cart
                key={idx}
                item={item}
                addToCart={this.props.addToCart}
                removeFromCart={this.props.removeFromCart}
                removeWholeItem={this.props.removeWholeItem}
                state={this.props.items}
              />
            );
          })}
        </div>
        <Link to="/checkout" style={{textDecoration:"none", width:"100px",border:"2px solid Blue",textAlign:"center",height:"25px" }}><div>Checkout</div></Link>
      </div>
    );
  }
}