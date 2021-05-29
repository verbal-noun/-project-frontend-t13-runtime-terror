import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./orderStatus.css";
import superManCoffee from "./assets/superManCoffee.png";
import axios from "axios";



function OrderStatus(props) {
  let [order, setOrder] = useState({});
  let [modifyTime, setModifyTime] = useState(0);
  let [discountTime, setDiscountTime] = useState(0);  
  let [redirect, setRedirect] = useState(null);
  
  useEffect(() => {
    let data = props.location.state;
    axios.get(`https://info30005-customer-backend.herokuapp.com/api/customer/fetchOrders/${data.selectedID}`)
      .then((res) => {
        let order = res.data[0];
        setOrder(order);
        axios.get(`https://info30005-customer-backend.herokuapp.com/api/customer/globals`)
          .then((res) => {
            let globals = {};
            for(let global of res.data) {
              globals[global.name] = global.value;
            }

            // Calculate timestamps
            let startTime = new Date(order.modifiedAt).getTime();
            setModifyTime(startTime + globals.orderChangeLimit*60000);
            setDiscountTime(startTime + globals.discountLimit*60000);
        });
      });
  }, []);

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
      <h2 className="remaining-time">You can modify your order before {new Date(Date.now() - modifyTime).toLocaleTimeString("en-us")}</h2>
      <h2 className="discount-time">20% Discount will be applied at {new Date(Date.now() - discountTime).toLocaleTimeString("en-us")}</h2>
      
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