import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./orderConfirm.css";
import "./homePage";
import greenTick from "./assets/greenTick.png";
import { ProgressBar } from "react-bootstrap";


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
        className="green-tick"
        src={greenTick}
        alt="green tick illustration"
      />
      <h1 className="confirm-text">Thanks For Your Order!</h1>
      <h2 className="rating-text">How would you rate your interaction us?</h2>
      
      
        
      <div class="rate">
        <input type="radio" id="star5" name="rate" value="5" />
        <label for="star5" title="text">5 stars</label>
        <input type="radio" id="star4" name="rate" value="4" />
        <label for="star4" title="text">4 stars</label>
        <input type="radio" id="star3" name="rate" value="3" />
        <label for="star3" title="text">3 stars</label>
        <input type="radio" id="star2" name="rate" value="2" />
        <label for="star2" title="text">2 stars</label>
        <input type="radio" id="star1" name="rate" value="1" />
        <label for="star1" title="text">1 star</label>
      </div>
      <Button className="button" id="submit-btn"
          onClick={() => setRedirect("/")}
          title="Home"
          color="#047E61"
        >Submit</Button>
        
        
       
    </div>
  );
}

export default OrderStatus;