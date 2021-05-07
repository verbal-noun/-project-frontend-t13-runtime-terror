import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './orderStatus.css';


function userPage(props) {
    useEffect(() => {
      axios.get(`https://info30005-customer-backend.herokuapp.com/api/customer/confirmation`)
        .then((res) => {
          loadTrucks(res.data);
        }
      );
    }, []);
    
    // Visit a vendor page
    
    return (
       <div className="confirm-card">
          
          <img className="green-tick" src="./assets/greenTick" alt="green tick illustration"/>
          <h1 className="confirm-text">Thanks For Your Order!</h1>
          print order status here 
          <img className="confirm-vector" src="./assets/superMamCoffee" alt="confirmation illustration"/>
          
          <Button
            onPress={onPressHome}
            title="Home"
            color="#047E61"
            accessibilityLabel="go back to home"
            />
            <Button
            onPress={onPressOrderPage}
            title="User Page"
            color="#047E61"
            accessibilityLabel="go back to user dashboard"
            />

          
        </div>

        
      
    );
}
