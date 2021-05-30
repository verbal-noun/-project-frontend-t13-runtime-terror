import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "./userPage.css";


// Function that shows th elapsed time since a order was created
function elapsed(since) {
  // order time calculation
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
        <div className="order-header">
          <span className="order-header">{props.order.vendorName} is creating your order!</span>
          <div className="order-status">{props.order.status}</div>
        </div><br/>
        <Button className="button" id="details" onClick={props.setSelected}>View Details</Button>

        <div className="order-time">{elapsed(props.order.createdWhen)+" "}</div>
    </div>
  );
}


function UserPage(props) {
  let [orders, loadOrders] = useState([]);
  let [selectedID, setSelectedID] = useState(null);
  let [gotoHome, setGotoHome] = useState(false);
  let [homeRedirect, setHomeRedirect] = useState(false);

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
          if(order.status == "Cancelled") {
            continue;
          }
          try {
            let res = await axios.get(`https://info30005-customer-backend.herokuapp.com/api/customer/vendor/${order.vendor}`);
            let vendor = res.data;
            newOrders.push({
              id: order._id,
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

  if (selectedID) {
    return <Redirect to={{pathname: `/status`, state: {selectedID}}}/>;
  }
  if(homeRedirect) {
    return <Redirect to="/"/>;
  }
  return (
    <div className="userpage">
      <div className="order-card-list">
        <div className="logo">
          <h1>Order History</h1>
        </div>
        <Button className="button" id="logout" onClick={logout}>Logout</Button>
        <Button className="button" id="home" onClick={() => setHomeRedirect(true)}>Home</Button>
        {orders.map((order, index) => {
          return (
            <OrderCard
              key={`order${index}`}
              order={order}
              setSelected={() => setSelectedID(order.id)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default UserPage;
