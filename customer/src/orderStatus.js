import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./orderStatus.css";
import superManCoffee from "./assets/superManCoffee.png";
import axios from "axios";


function elapsed(time) {
  // order time calculation
  time /= 1000;
  var seconds = Math.round(time);
  if(seconds >= 60 * 60) {
    let hours = Math.round(seconds / (60 * 60));
    if(hours == 1) return `${hours} hours`;
    else return `${hours} hour`;
  }
  else if(seconds >= 60) {
    let minutes = Math.round(seconds / 60); 
    if(minutes == 1) return `${minutes} minute`;
    else return `${minutes} minutes`;
  }
  else {
    return `${seconds} seconds`; 
  }
}

function OrderStatus(props) {
  let [order, setOrder] = useState({});
  let [time, setTime] = useState(0);
  let [modifyTime, setModifyTime] = useState(0);
  let [discountTime, setDiscountTime] = useState(0);  
  let [gotoHome, setGotoHome] = useState(false);  
  let [gotoEditOrder, setGotoEditOrder] = useState(false);
  
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

      let interval = setInterval(() => setTime(Date.now()), 1000);
      return () => {
        clearInterval(interval);
      }
  }, []);

  const cancelOrder = () => {
    let data = props.location.state;
    axios.post(`https://info30005-customer-backend.herokuapp.com/api/customer/cancelOrder/`, {orderID: data.selectedID})
      .then(() => {
        setGotoHome(true);
      })
      .catch((err) => {
        console.log(err.message);
    });
  }

  if(gotoEditOrder) {
    console.log("Hi");
    return <Redirect 
      to={{
        pathname: `/van`,
        state: {
          selectedID: order.vendor,
          order: order,
        },
      }}
    />;
  }
  if(gotoHome) {
    return <Redirect to="/"/>;
  }

  // Edit order and cancel order buttons are disabled after respective times has elapsed
  return (
    <div className="confirm-card">
      <img
        className="super-man"
        src={superManCoffee}
        alt="green tick illustration"
      />
      <h1 className="confirm-text">Thanks For Your Order!</h1>
      <h2 className="remaining-time">You have {elapsed(modifyTime - time)} left to modify your order</h2>
      <h2 className="discount-time">{elapsed(discountTime - time)} until a 20% Discount is applied</h2>
      
      <div className="button-div">
        <Button className="button"
          onClick={() => setGotoHome(true)}
          title="Home"
          color="#047E61"
        >Home</Button>

        <Button className="button"
          onClick={() => setGotoEditOrder(true)}
          color="#047E61"
          // disabled={() => modifyTime - time >= 0}
        >Edit Order</Button>
        
        <Button className="button"
          onClick={cancelOrder}
          color="#047E61"
          disabled={() => modifyTime - time >= 0}
        >Cancel Order</Button>
      </div>  
    </div>
  );
}

export default OrderStatus;