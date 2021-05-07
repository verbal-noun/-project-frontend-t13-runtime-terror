import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "./userPage.css";

function OrderCard(props) {
  return (
    <div className="order">
      <span className="order-item-row">
        <h1 className="order-name">{props.order.id}</h1>
        <h1 className="order-name">{props.order.vendorName}</h1>
      </span>
    </div>
  );
}

function UserPage(props) {
  let [orders, loadOrders] = useState([]);
  let [selectedID, setSelectedID] = useState(null);
  let [gotoHome, setGotoHome] = useState(false);
  
  let isLoggedIn = localStorage.getItem('token');
  useEffect(() => {
    if(!isLoggedIn) {
      return;
    }
    // Fetch the user's outstanding orders
    axios.get(`https://info30005-customer-backend.herokuapp.com/api/customer/fetchOrders`)
      .then((res) => {
        for(let order of res.data) {
          let vendorID = order.vendor;
          let newOrders = orders.slice();
          newOrders.push({
            id: order._id,
            vendorName: vendorID
          });
          loadOrders(newOrders);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  let logout = () => {
    localStorage.removeItem('token');
    setGotoHome(true);
  }

  // Go back to homepage if user is not logged in
  if(!isLoggedIn || gotoHome) {
    return <Redirect to="/"/>
  }
  
  // TODO: Visit the order status page
  if(selectedID) {
    console.log("GOTO ORDER STATUS PAGE");
    // return <Redirect to={{pathname: `/van`, state: {selectedID}}}/>;
  }
  return (
    <div className="userpage">
      <div className="order-card-list">
        <div className="logo">
          <h1>Order History</h1>
        </div>
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
      <Button onClick={logout}>
        Logout
      </Button>
    </div>
  );
}

export default UserPage;
