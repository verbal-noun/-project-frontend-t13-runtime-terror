import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./orderStatus.css";
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
        className="super-man"
        src={superManCoffee}
        alt="green tick illustration"
      />
      <h1 className="confirm-text">Thanks For Your Order!</h1>
      <h2 className="remaining-time">Your order will be ready in xx:xx</h2>
      
      
      <div className="button-div">
        <Button className="button"
          onClick={() => setRedirect("/")}
          title="Home"
          color="#047E61"
        >Home</Button>
        <Button className="button"
          onClick={() => setRedirect("/checkout")}
          color="#047E61"
        >Order Page</Button>
      </div>  
    </div>
  );
}

export default OrderStatus;