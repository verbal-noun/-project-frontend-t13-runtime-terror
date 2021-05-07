import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './homePage.css';
import redTruck from './assets/redTruck.png';



function TruckCard(props) {
  return (
    <div className="truck-card-base" onClick={props.onClick}>
      <div className="truck-card-column truck-card-icon">
        <img src={redTruck}/>
      </div>
      <div className="truck-card-column truck-card-info-section">
        <span className="truck-card-title">{props.truck.name}</span>
        <br/><br/>
        <span className="truck-card-address">{props.truck.address}</span>
      </div>
      <div className="truck-card-column truck-card-distance-section">
        <span className="truck-card-distance">{Math.round(props.truck.distance)} km</span>
      </div>
    </div>
  );
}

function HomePage(props) {
  let longitude = 3.0;
  let latitude = 1.0;
  let [trucks, loadTrucks] = useState([]);
  let [selectedID, setSelectedID] = useState(null);
  
  useEffect(() => {
    axios.get(`https://info30005-customer-backend.herokuapp.com/api/customer/nearby/${longitude},${latitude}`)
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
    <div className="homepage">
      <div className="truck-card-list">
        <div className="logo">
          <h1>Find A Van</h1>
        </div>
        {
          trucks.map((truck, index) => {
            if(truck.open) {
              return <TruckCard key={`truck${index}`} truck={truck} onClick={() => setSelectedID(truck._id)}/>
            }
          })
        }
      </div>
      {/* <div className="overlap-group2">
        <div className="text-1">
          <span className="span0 ">{spanText}</span>
          <span className="span1 ">{spanText2}</span>
        </div>
      </div>
      <div className="overlap-group1">
        <div className="flex-row">
          <img className="untitled-design-03-03-t191256-1" src={untitledDesign20210303T1912561} />
          <div className="cool-truck robotocondensed-regular-normal-black-36px">{coolTruck}</div>
          <div className="address robotocondensed-bold-black-20px">{address9}</div>
        </div>
        <div className="overlap-group3">
          <div className="address-1 robotocondensed-regular-normal-black-18px">{address10}</div>
          <div className="address-1 robotocondensed-regular-normal-black-18px">{address11}</div>
        </div>
      </div> */}
    </div>
  );
}

export default HomePage;