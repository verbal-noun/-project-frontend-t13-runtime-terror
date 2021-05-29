import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./orderStatus.css";
import superManCoffee from "./assets/superManCoffee.png";







function OrderStatus(props) {
  
  
  
  let [redirect, setRedirect] = useState(null);
  let time = new Date().toLocaleString();
  let d = time.split(' ')[1];
  let current = d.substring(0,5)
  let min = parseInt(d.substring(3,5)) + 10;
  let modTime = current.substring(0,3) + min;
  let disTime = current.substring(0,3) + (min + 5);
  
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
      <h2 className="remaining-time">You can modify your order before {modTime}</h2>
      <h2 className="discount-time">20% Discount will be applied at {disTime}</h2>
      
      
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