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
  let orderSum = 0;

  useEffect(() => {
    if (!orderData) {
      return;
    }
<<<<<<< HEAD
    //let sum = 0;
=======

>>>>>>> feature/order-sum
    for (let orderItem of orderData.order) {
      orderSum += orderItem.price * orderItem.quantity;
    }
    setTotal(orderSum);
  }, []);

  let submitOrder = () => {
    let postData = { orderItems: [], vendor: orderData.vendor };
    for (let orderItem of orderData.order) {
      postData.orderItems.push({
        item: orderItem.item,
        quantity: orderItem.quantity,
      });
    }
    if (orderData.orderID) {
      // Update the existing order
      postData.orderID = orderData.orderID;
      postData.totalPrice = orderSum;
      axios
        .put(
          "https://info30005-customer-backend.herokuapp.com/api/customer/changeOrder",
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
    } else {
      // Post the new order
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
    }
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
    return <Redirect to="/login" />;
  }
  if (successfulOrder) {
    // TODO: Redirect to order watch page
    return <Redirect to="/orders" />;
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
