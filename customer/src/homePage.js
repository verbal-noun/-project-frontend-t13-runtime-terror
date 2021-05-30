import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "./homePage.css";
import redTruck from "./assets/redTruck.png";
import CustomGoogleMap from './CustomGoogleMap';


// Function to make a react component to display the trucks
function TruckCard(props) {
  return (
    <div className="truck-card-base" onClick={props.onClick}>
      <div className="truck-card-column truck-card-icon">
        <img src={redTruck} />
      </div>
      <div className="truck-card-column truck-card-info-section">
        <span className="truck-card-title">{props.truck.name}</span>
        <br />
        <br />
        <span className="truck-card-address">{props.truck.address}</span>
      </div>
      <div className="truck-card-column truck-card-distance-section">
        <span className="truck-card-distance" id="distance">
          {Math.round(props.truck.distance * 100) / 100} km
        </span>
      </div>
    </div>
  );
}

// Function to render the homepage properties
function HomePage(props) {
  let [coords, setCoords] = useState({longitude: 144.9605765, latitude: -37.8102361});
  let [trucks, loadTrucks] = useState([]);
  let [selectedID, setSelectedID] = useState(null);
  let [buttonRedirect, setButtonRedirect] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        axios.get(`https://info30005-customer-backend.herokuapp.com/api/customer/nearby/${position.coords.longitude},${position.coords.latitude}`)
          .then((res) => {
            setCoords({
              longitude: position.coords.longitude,
              latitude: position.coords.latitude
            });
            loadTrucks(res.data);
          });
      });
    }
    else {
      // Melbourne CBD Default
      axios.get(`https://info30005-customer-backend.herokuapp.com/api/customer/nearby/${coords.longitude},${coords.latitude}`)
        .then((res) => {
          loadTrucks(res.data);
        });
    }
  }, []);

  let isLoggedIn = localStorage.getItem('token');
  let handleButtonClick = () => {
    if(isLoggedIn) {
      setButtonRedirect("/orders");
    }
    else {
      setButtonRedirect("/login");
    }
  }

  // Visit a vendor page
  if (selectedID) {
    return <Redirect to={{ pathname: `/van`, state: { selectedID } }} />;
  }
  if (buttonRedirect) {
    return <Redirect to={buttonRedirect} />;
  }
  return (
    <div className="homepage">
      <div className="truck-card-list">

          <h1 className="logo">Find A Van</h1>

        {trucks.map((truck, index) => {
          if (truck.open) {
            return (
              <TruckCard
                key={`truck${index}`}
                truck={truck}
                onClick={() => setSelectedID(truck._id)}
              />
            );
          }
        })}
      </div>
      <div className="map-container-container">
        <div className="map-container">
          <CustomGoogleMap className="map" latitude={coords.latitude} longitude={coords.longitude}/>
          <Button className="home-page-button" onClick={handleButtonClick}>
            {isLoggedIn ? "View Orders" : "Login"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
