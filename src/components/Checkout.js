import React, { Component } from "react";
import CartSummery from "./CartSummery/CartSummery";

export default class Checkout extends Component {
  constructor(props){
      super(props);
  }
    render() {
    return (
      <CartSummery
        addToCart={this.props.addToCart}
        removeFromCart={this.props.removeFromCart}
        removeWholeItem={this.props.removeWholeItem}
        state={this.props.items}
        sendEmail={this.props.sendEmail}
      />
    );
  }
}