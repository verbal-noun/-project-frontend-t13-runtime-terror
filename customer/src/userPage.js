import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "./userPage.css";

function elapsed(since) {
  let now = new Date();
  let diff = now - since;
  diff /= 1000;
  var seconds = Math.round(diff);
  if(seconds >= 60 * 60) {
    let hours = Math.round(seconds / (60 * 60));
    if(hours == 1) return `${hours} hours ago`;
    else return `${hours} hour ago`;
  }
  else if(seconds >= 60) {
    let minutes = Math.round(seconds / 60); 
    if(minutes == 1) return `${minutes} minute ago`;
    else return `${minutes} minutes ago`;
  }
  else {
    return `${seconds} seconds ago`; 
  }
}

function OrderCard(props) {
  return (
    <div className="order">
        <div class="order-header">
          <span className="order-header">{props.order.vendorName} is creating your order!</span>
          <span className="order-status">Status: {props.order.status}</span>
        </div><br/>
        <div className="order-time">{elapsed(props.order.createdWhen)+" "}</div>
    </div>
  );
}


function UserPage(props) {
  let [orders, loadOrders] = useState([]);
  let [selectedID, setSelectedID] = useState(null);
  let [gotoHome, setGotoHome] = useState(false);

  let isLoggedIn = localStorage.getItem("token");
  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    // Fetch the user's outstanding orders
    axios
      .get(
        `https://info30005-customer-backend.herokuapp.com/api/customer/fetchOrders`
      )
      .then(async (res) => {
        let newOrders = [];
        for(let order of res.data) {
          try {
            let res = await axios.get(`https://info30005-customer-backend.herokuapp.com/api/customer/vendor/${order.vendor}`);
            let vendor = res.data;  
            newOrders.push({
              createdWhen: new Date(order.createdAt),
              status: order.status,
              vendorName: vendor.name
            });
          }
          catch(err) {
            console.log(err);
          }
        }
        // Latest order goes up
        newOrders.sort((a, b) => {
          return b.createdWhen - a.createdWhen;
        });
        loadOrders(newOrders);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  let logout = () => {
    localStorage.removeItem("token");
    setGotoHome(true);
  };

  // Go back to homepage if user is not logged in
  if (!isLoggedIn || gotoHome) {
    return <Redirect to="/" />;
  }

  // TODO: Visit the order status page
  if (selectedID) {
    console.log("GOTO ORDER STATUS PAGE");
    // return <Redirect to={{pathname: `/van`, state: {selectedID}}}/>;
  }
  return (
    <div className="userpage">
      <div className="order-card-list">
        <div className="logo">
          <h1>Order History</h1>
        </div>
        <Button className="logout-button" onClick={logout}>Logout</Button>
        {orders.map((order, index) => {
          return (
            <OrderCard
              key={`order${index}`}
              order={order}
              onClick={() => setSelectedID(order._id)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default UserPage;
