import axios from "axios";
import React, { Component } from "react";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import Catelouge from "./Catelouge";
import Checkout from "./Checkout";
import data from "./data";
import Form from "./Form";
import OrderPlaced from "./OrderPlaced";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      userDetails:{
        name: "",
        email: "",
        passowrd: "",
        age: "",
        gender: "",
        address: "",
      }
    };
  }

  addToCart = (id) => {
    const ite = this.state.items.find((itm) => itm.id === id);
    if (ite) {
      this.setState({
        items: this.state.items.map((itm) =>
          itm.id === id ? { id: itm.id, quantity: itm.quantity + 1 } : itm
        ),
      });
      return;
    }
    this.setState({ items: [...this.state.items, { id: id, quantity: 1 }] });
  };

  removeFromCart = (id) => {

    const item = this.state.items.find((itm) => itm.id === id);
    if (item) {
      if (item.quantity === 1) {
        this.setState({ items: this.state.items.filter((itm) => itm.id !== id) });
        return;
      }
      this.setState({
        items: this.state.items.map((itm) =>
          itm.id === id ? { id: itm.id, quantity: itm.quantity - 1 } : itm
        ),
      });
      return;
    }
  };

  removeWholeItem = (id) => {

    return this.setState({ items: this.state.items.filter((itm) => itm.id !== id) });
  };

  itemsToString=(cartItems)=>{

    if(cartItems.length===0){
      return "no items in your cart";
    }

    let str="";

    for(let i=0;i<cartItems.length;i++){
      const item=data.find(item=>item.id===cartItems[i].id);
      str+=`name:${item.name} Quantity:${cartItems[i].quantity} \n`;
    }

    return str;
  }

  sendEmail=()=>{

      axios
      .post(
        "https://api.emailjs.com/api/v1.0/email/send",
        {
          service_id: "service_z1qad9s",
          template_id: "template_arq4ufv",
          user_id: "user_4hYZMdpecGNsalingH0cC",
          template_params:{...this.state.userDetails,items:this.itemsToString(this.state.items)}
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then((res) => console.log("email sent"))
      .catch((res) => console.log("there is problem in sending email"));

  }

  setUserDetails=(details)=>{
    this.setState({ ...this.state,userDetails:details});
  }

  render() {
    return (
      <div className="App">
        <h1>E-Commerse System</h1>
        <div className="container">
          <Link
            to="/register"
            style={{ textDecoration: "none", color: "white" }}
            className="eclipse"
          >
            Register Customer
          </Link>
          <Link
            to="/catalouge"
            style={{ textDecoration: "none", color: "white" }}
            className="eclipse"
          >
            Browse catalouge
          </Link>
          <Link
            to="/checkout"
            style={{ textDecoration: "none", color: "white" }}
            className="eclipse"
          >
            Place Order/Checkout
          </Link>
        </div>
        <Switch>
          <Route path="/register" component={()=><Form setUserDetails={this.setUserDetails}/>} />
          <Route
            path="/catalouge"
            component={()=>
              <Catelouge
                items={this.state.items}
                addToCart={this.addToCart}
                removeFromCart={this.removeFromCart}
                removeWholeItem={this.removeWholeItem}
              />
            }
          />
          <Route
            path="/checkout"
            component={()=>
              <Checkout
                items={this.state.items}
                addToCart={this.addToCart}
                removeFromCart={this.removeFromCart}
                removeWholeItem={this.removeWholeItem}
                sendEmail={this.sendEmail}
                />
            }
          />
          <Route path="/orderplaced" component={OrderPlaced}/>
          <Redirect to="/register" />
        </Switch>
      </div>
    );
  }
}