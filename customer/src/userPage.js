import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './user.css';

function orders(props) {
    return(
      <div className="order">
        <span className="order-item-row">
        <h1 className="order-name">{props.order.number}</h1>
        <h1 className="order-price">x{props.order.totalPrice}</h1>
        <h1 className="order-truck-name">{props.order.truckName}$</h1>
        </span>
      </div>
    );
}


  function userPage(props) {
    useEffect(() => {
      axios.get(`https://info30005-customer-backend.herokuapp.com/api/customer/user`)
        .then((res) => {
          loadTrucks(res.data);
        }
      );
    }, []);
    
    // Visit a vendor page
    if(selectedID) {
      return <Redirect to={{pathname: `/van`, state: {selectedID}}}/>;
    }
    return (
      <div className="userpage">
        <div className="order-card-list">
          <div className="logo">
            <h1>Order History</h1>
          </div>
          {
            orders.map((order, index) => {
              
                return <OrderCard key={`order${index}`} order={order} onClick={() => setSelectedID(order._id)}/>
              
            })
          }
        </div>
      </div>


    );
}

  
