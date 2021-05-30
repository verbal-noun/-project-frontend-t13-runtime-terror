import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./orderConfirm.css";
import "./homePage";
import greenTick from "./assets/greenTick.png";
import { ProgressBar } from "react-bootstrap";
import axios from "axios";


// Function to display the order confirmation page
function OrderStatus(props) {
  let [gotoHome, setGotoHome] = useState(null);
  let [ratingValue, setRatingValue] = useState(null);

  let handleSubmit = () => {
    if(!ratingValue) {
      setGotoHome(true);
      return;
    }
    let data = props.location.state;
    console.log(data.order.id);
    axios.post(
      'https://info30005-customer-backend.herokuapp.com/api/customer/rate', 
      {
        orderID: data.order.id, 
        rating: {
          value: ratingValue,
          comment: "",
          order: data.order._id
        }
      })
      .then(() => setGotoHome("/"))
      .catch((err) => {
        setGotoHome("/");
    });
  }

  if(gotoHome) {
    return <Redirect to={gotoHome}/>;
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
        <input type="radio" id="star5" name="rate" value="5" onClick={() => setRatingValue(5)}/>
        <label for="star5" title="text">5 stars</label>
        <input type="radio" id="star4" name="rate" value="4" onClick={() => setRatingValue(4)}/>
        <label for="star4" title="text">4 stars</label>
        <input type="radio" id="star3" name="rate" value="3" onClick={() => setRatingValue(3)}/>
        <label for="star3" title="text">3 stars</label>
        <input type="radio" id="star2" name="rate" value="2" onClick={() => setRatingValue(2)}/>
        <label for="star2" title="text">2 stars</label>
        <input type="radio" id="star1" name="rate" value="1" onClick={() => setRatingValue(1)}/>
        <label for="star1" title="text">1 star</label>
      </div>

      <Button className="button" id="submit-btn"
          onClick={handleSubmit}
          title="Home"
          color="#047E61"
        >Submit</Button>

    </div>
  );
}

export default OrderStatus;