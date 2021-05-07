import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "./orderPage.css";

function OrderItem(props) {
  return (
    <div className="shopping-cart">
      <span className="order-item-row">
        <h1 className="item-card-name">{props.item.name}</h1>
        <img className="item-card-image" src={props.item.photoURL} />
        <h1 className="item-card-price">x{props.item.quantity}</h1>
        <h1 className="item-card-price">
          {props.item.price * props.item.quantity}$
        </h1>
      </span>
    </div>
  );
}

function OrderPage(props) {
  let orderData = props.location.state;
  let [total, setTotal] = useState(0);
  let [loginRedirect, setLoginRedirect] = useState(false);
  let [menuRedirect, setMenuRedirect] = useState(false);
  let [cancelRedirect, setCancelRedirect] = useState(false);
  let [successfulOrder, setSuccess] = useState(null);

  useEffect(() => {
    if (!orderData) {
      return;
    }
    let sum = 0;
    for (let orderItem of orderData.order) {
      sum += orderItem.price * orderItem.quantity;
    }
    setTotal(sum);
  }, []);

  let submitOrder = () => {
    let postData = { orderItems: [], vendor: orderData.vendor };
    for (let orderItem of orderData.order) {
      postData.orderItems.push({
        item: orderItem.item,
        quantity: orderItem.quantity,
      });
    }
    // Post the order
    axios
      .post(
        "https://info30005-customer-backend.herokuapp.com/api/customer/order",
        postData
      )
      .then((order) => {
        setSuccess(order);
        console.log(order);
      })
      .catch((err) => {
        setLoginRedirect(true);
        console.log(err.message);
      });
  };

  // Redirect if invalid
  if (!orderData || cancelRedirect) {
    return <Redirect to="/" />;
  }
  if (menuRedirect) {
    return (
      <Redirect
        to={{
          pathname: `/van`,
          state: {
            selectedID: orderData.vendor,
            orderItems: orderData.order,
          },
        }}
      />
    );
  }
  if (loginRedirect) {
    // TODO: Redirect to login page and pass the generated order ID
    console.log("GOTO LOGIN PAGE!");
  }
  if (successfulOrder) {
    // TODO: Redirect to order watch page
    console.log("SUCCESS! GOTO ORDER WATCH");
  }
  return (
    <div className="orderpage">
      <button
        className="back-to-menu-button"
        onClick={() => setMenuRedirect(true)}
      >
        Back to Menu
      </button>
      <div className="order-rectangle">
        <div className="order-items-column">
          {orderData.order.map((item, index) => (
            <OrderItem key={`item${index}`} item={item} />
          ))}
        </div>
        <div className="total-row">
          <span>
            <h1 className="total">Total</h1>
            <h1 className="total-price">${total}</h1>
          </span>
        </div>
      </div>
      <span>
        <button
          className="cancel-button"
          onClick={() => setCancelRedirect(true)}
        >
          Cancel Order
        </button>
        <button className="confirm-button" onClick={submitOrder}>
          {"Confirm & Pay"}
        </button>
      </span>
    </div>
  );
}

export default OrderPage;

/*function PlaceOrderCheckOut(props) {
  const {
    placeorderCheckout,
    backToMenu,
    untitledDesign20210310T1016462,
    untitledDesign20210310T1714282,
    untitledDesign20210310T1657072,
    untitledDesign20210310T1647182,
    x1XLatte,
    x2XLongBlack,
    x2XPlainBiscuit,
    x1XSmallCake,
    text10,
    price,
    text62,
    line8,
    total,
    price2,
    text72,
    price3,
    text11,
    text12,
    price4,
    text82,
    text13,
    price5,
    text9,
    cancel,
    confirmPay,
    untitledDesign20210310T1811462,
    ellipse7,
    x4Km,
    untitledDesign20210303T19125612,
    elonsTruck,
  } = props;

  return (
    <div class="container-center-horizontal">
      <div className="placeorder-checkout screen" style={{ backgroundImage: `url(${placeorderCheckout})` }}>
        <div className="flex-col-3">
          <div className="overlap-group4">
            <h1 className="title roboto-regular-normal-soapstone-48px">{backToMenu}</h1>
          </div>
          <div className="overlap-group">
            <div className="flex-row">
              <div className="flex-col-1">
                <img className="untitled-design-03-10-t101646-2" src={untitledDesign20210310T1016462} />
                <img className="untitled-design-03-10-t171428-2" src={untitledDesign20210310T1714282} />
                <img className="untitled-design-03-10-t165707-2" src={untitledDesign20210310T1657072} />
                <img className="untitled-design-03-10-t164718-2" src={untitledDesign20210310T1647182} />
              </div>
              <div className="flex-col">
                <div className="x1x-latte robotocondensed-light-black-24px">{x1XLatte}</div>
                <div className="x2x-long-black robotocondensed-light-black-24px">{x2XLongBlack}</div>
                <div className="x2x-plain-biscuit robotocondensed-light-black-24px">{x2XPlainBiscuit}</div>
                <div className="x1x-small-cake robotocondensed-light-black-24px">{x1XSmallCake}</div>
              </div>
              <div className="overlap-group7">
                <div className="rectangle-10"></div>
                <div className="text- robotocondensed-light-black-24px">{text10}</div>
              </div>
              <div className="overlap-group6">
                <div className="price-1 robotocondensed-light-black-24px">{price}</div>
                <div className="rectangle-99"></div>
                <div className="text-1 robotocondensed-light-black-24px">{text62}</div>
              </div>
            </div>
            <img className="line-8" src={line8} />
            <div className="flex-row-4">
              <div className="total">{total}</div>
              <div className="overlap-group3-1">
                <div className="overlap-group9">
                  <div className="price robotocondensed-light-black-24px">{price2}</div>
                  <div className="rectangle-10-1"></div>
                  <div className="text--1 robotocondensed-light-black-24px">{text72}</div>
                </div>
                <div className="price-3 robotocondensed-light-black-24px">{price3}</div>
                <div className="overlap-group11">
                  <div className="rectangle-10"></div>
                  <div className="text- robotocondensed-light-black-24px">{text11}</div>
                </div>
              </div>
            </div>
            <div className="flex-row-2">
              <div className="overlap-group1-1">
                <div className="rectangle-10"></div>
                <div className="text- robotocondensed-light-black-24px">{text12}</div>
              </div>
              <div className="overlap-group5">
                <div className="price-2 robotocondensed-light-black-24px">{price4}</div>
                <div className="rectangle-102"></div>
                <div className="text-3 robotocondensed-light-black-24px">{text82}</div>
              </div>
            </div>
            <div className="flex-row-3">
              <div className="overlap-group1-1">
                <div className="rectangle-10"></div>
                <div className="text- robotocondensed-light-black-24px">{text13}</div>
              </div>
              <div className="overlap-group8">
                <div className="price-1 robotocondensed-light-black-24px">{price5}</div>
                <div className="rectangle-10-1"></div>
                <div className="text--1 robotocondensed-light-black-24px">{text9}</div>
              </div>
            </div>
          </div>
          <div className="flex-row-1">
            <div className="overlap-group2">
              <div className="cancel roboto-regular-normal-soapstone-48px">{cancel}</div>
            </div>
            <div className="overlap-group1">
              <div className="rectangle-53 smart-layers-pointers"></div>
              <div className="confirm-pay roboto-regular-normal-soapstone-48px">{confirmPay}</div>
            </div>
          </div>
        </div>
        <div className="flex-col-2">
          <img className="untitled-design-03-10-t181146-2" src={untitledDesign20210310T1811462} />
          <div className="overlap-group3">
            <img className="ellipse-7" src={ellipse7} />
            <div className="x4km roboto-regular-normal-black-36px">{x4Km}</div>
            <img className="untitled-design-3-03-t191256-12" src={untitledDesign20210303T19125612} />
            <div className="elons-truck roboto-regular-normal-black-36px">{elonsTruck}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const placeOrderCheckOutData = {
    placeorderCheckout: "homepage.png",
    backToMenu: "Back to Menu",
    untitledDesign20210310T1016462: "untitled-design-2021-03-10t101646-2.png",
    untitledDesign20210310T1714282: "untitled-design-2021-03-10t171428-2.png",
    untitledDesign20210310T1657072: "untitled-design-2021-03-10t165707-2-1.png",
    untitledDesign20210310T1647182: "untitled-design-2021-03-10t164718-2.png",
    x1XLatte: "1x Latte",
    x2XLongBlack: "2x Long Black",
    x2XPlainBiscuit: "2x Plain Biscuit",
    x1XSmallCake: "1x Small Cake",
    text10: "-",
    price: "$4.00",
    text62: "+",
    line8: "line-8-1.svg",
    total: "Total",
    price2: "$9.00",
    text72: "+",
    price3: "$29.50",
    text11: "-",
    text12: "-",
    price4: "$12.00",
    text82: "+",
    text13: "-",
    price5: "$4.50",
    text9: "+",
    cancel: "Cancel",
    confirmPay: "Confirm & Pay",
    untitledDesign20210310T1811462: "untitled-design-2021-03-10t181146-3.png",
    ellipse7: "ellipse-7.svg",
    x4Km: "4km",
    untitledDesign20210303T19125612: "untitled-design-2021-03-03t191256-12-1.png",
    elonsTruck: "Elon’s Truck",
}; */
