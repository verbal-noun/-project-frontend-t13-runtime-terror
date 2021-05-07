import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "./userPage.css";

function OrderCard(props) {
  return (
    <div className="order">
        <span className="order-name">{props.order.createdWhen+ " "}</span>
        <span className="order-name">{props.order.status+ " "}</span>
        <span className="order-name">{props.order.vendorName}</span>
    </div>
  );
}

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
      .then((res) => {
        for(let order of res.data) {
          axios.get(`https://info30005-customer-backend.herokuapp.com/api/customer/vendor/${order.vendor}`)
            .then((res) => {
              let vendor = res.data;
              let newOrders = orders.slice();
              newOrders.push({
                createdWhen: elapsed(new Date(order.createdAt)),
                status: order.status,
                vendorName: vendor.name
              });
              loadOrders(newOrders);
            });
        }
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
