import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./orderStatus.css";
import greenTick from "./assets/greenTick.png";
import superManCoffee from "./assets/superManCoffee.png";

function OrderStatus(props) {
  let [redirect, setRedirect] = useState(null);

  if(redirect) {
    console.log(redirect);
    return <Redirect to={redirect} />;
  }
  // Visit a vendor page
  return (
    <div className="confirm-card">
      <img
        className="green-tick"
        src={greenTick}
        alt="green tick illustration"
      />
      <h1 className="confirm-text">Thanks For Your Order!</h1>
      print order status here
      <img
        className="confirm-vector"
        src={superManCoffee}
        alt="confirmation illustration"
      />
      <Button
        onClick={() => setRedirect("/")}
        title="Home"
        color="#047E61"
      >Home</Button>
      <Button
        onClick={() => setRedirect("/orders")}
        color="#047E61"
      >User Page</Button>
    </div>
  );
}

export default OrderStatus;