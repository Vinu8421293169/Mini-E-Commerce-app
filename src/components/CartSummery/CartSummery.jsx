import "./summery.scss";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import data from "../data";

export default class CartSummery extends Component {

  constructor(props){
    super(props);
  }

  render(){
  let total = 0;
  let save=0;

  return (
    <div>
      <div className="wrap cf">
        <h1 className="projTitle">Order Summary</h1>
        <div className="heading cf">
          <h1>My Cart</h1>
          <Link to="/catalouge" className="continue">
            + Add more items
          </Link>
        </div>
        <div className="cart">
          <ul className="cartWrap">
            {this.props.state.map((itm, idx) => {

              //calculating discount and total sum

              total +=
                data.find((item) => itm.id === item.id).final_price *
                itm.quantity;
              if(data.find((item) => itm.id === item.id).original_price){
                  save+=(data.find((item) => itm.id === item.id).original_price-data.find((item) => itm.id === item.id).final_price)*itm.quantity;
              }

              return (
                <li className="items odd">
                  <div className="infoWrap">
                    <div className="cartSection">
                      <img
                        src={data.find((item) => itm.id === item.id).img_url}
                        alt={data.find((item) => itm.id === item.id).name}
                        className="itemImg"
                      />
                      <p className="itemNumber">#QUE-007544-00{itm.id}</p>
                      <h3>{data.find((item) => itm.id === item.id).name}</h3>
                      <p>
                        {" "}
                        <button
                          onClick={() =>
                            this.props.removeFromCart(itm.id)
                          }
                        >
                          -
                        </button>
                        <span>{itm.quantity}</span>
                        <button
                          onClick={() => this.props.addToCart(itm.id)}
                        >
                          +
                        </button>
                        x{`$${data.find((item) => itm.id === item.id).final_price}.00`}
                      </p>

                      <p className="stockStatus"> In Stock</p>
                    </div>

                    <div className="prodTotal cartSection">
                      <p>
                        {`$${data.find((item) => itm.id === item.id).final_price}.00`}
                      </p>
                    </div>
                    <div
                      className="cartSection removeWrap"
                      onClick={() =>
                        this.props.removeWholeItem(itm.id)
                      }
                    >
                      <a href="#" className="remove">
                        x
                      </a>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="promoCode">
          <label for="promo">Have A Promo Code?</label>
          <input type="text" name="promo" placholder="Enter Code" />
          <a href="#" className="btn"></a>
        </div>

        <div className="subtotal cf">
          <ul>
            <li className="totalRow">
              <span className="label">Subtotal</span>
              <span className="value">{`$${total}.00`}</span>
            </li>

            <li className="totalRow">
              <span className="label">Total Savings</span>
              <span className="value">
                {this.props.state.length === 0 ? `$0.00` : `$${save}.00`}
              </span>
            </li>

            <li className="totalRow">
              <span className="label">Shipping</span>
              <span className="value">
                {this.props.state.length === 0 ? `$0.00` : "$5.00"}
              </span>
            </li>

            <li className="totalRow">
              <span className="label">Tax</span>
              <span className="value">
                {this.props.state.length === 0 ? `$0.00` : `$4.00`}
              </span>
            </li>
            

            <li className="totalRow">
              <div className="totalRow final">
                <span className="label">Total</span>
                <span className="value">
                  {this.props.state.length === 0 ? `$0.00` : `${total + 9}.00`}
                </span>
              </div>
              
                <div onClick={this.props.sendEmail}><Link to='/orderplaced' className="btn continue">Checkout</Link></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
}
