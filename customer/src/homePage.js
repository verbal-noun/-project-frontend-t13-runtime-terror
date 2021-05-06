import React, { useState } from 'react';
import axios from 'axios';
import './homePage.css';
import redTruck from './assets/redTruck.png';



function TruckCard(props) {
  return (
    <div className="truck-card-base">
      <img className="truck-card-icon" src={redTruck} />
      <div className="truck-card-info-section">
        <h1 className="robotocondensed-regular-normal-black-36px">{props.truck.name}</h1>
        <span className="robotocondensed-bold-black-20px">{props.truck.address}</span>
      </div>
      <div className="truck-card-distance-section">
        <span className="truck-card-distance">{Math.round(props.truck.distance)} km</span>
      </div>
    </div>
  );
}

function HomePage(props) {
  const {
    homepage,
    rectangle9,
    ellipse1,
    address,
    address2,
    address3,
    address4,
    fancyTruck3,
    address5,
    fancyTruck22,
    address6,
    jamesTruck,
    searchALocation,
    untitledDesign20210303T1912562,
    untitledDesign20210303T1912568,
    untitledDesign20210303T1912569,
    untitledDesign20210303T19125612,
    untitledDesign20210303T19125610,
    untitledDesign20210303T1912563,
    untitledDesign20210303T1912564,
    address7,
    address8,
    fancyTruck32,
    untitledDesign20210303T19125611,
    untitledDesign20210310T1032552,
    untitledDesign20210310T1735541,
    untitledDesign20210310T1811463,
    spanText,
    spanText2,
    untitledDesign20210303T1912561,
    coolTruck,
    address9,
    address10,
    address11,
  } = props;

  let longitude = 3.0;
  let latitude = 1.0;
  let [trucks, loadtrucks] = useState([]);
  
  axios.get(`https://info30005-customer-backend.herokuapp.com/api/customer/nearby/${longitude},${latitude}`)
       .then((res) => {
        loadtrucks(res.data);
       })
       .catch((err) => {
       });

  return (
    <div className="homepage">
      <div className="truck-card-list">
        <div className="logo">
          <h1>Find A Van</h1>
        </div>
        {
          trucks.map((truck, index) => {
            if(truck.open) return <TruckCard key={`truck${index}`} truck={truck}/>
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

const homePageData = {
    homepage: "",
    rectangle9: "",
    ellipse1: "",
    address: "242 St Kilda Rd, St Kilda VIC 3182",
    address2: "20 km",
    address3: "6 km",
    address4: "9 km",
    fancyTruck3: "Fancy Truck",
    address5: "242 St Kilda Rd, St Kilda VIC 3182",
    fancyTruck22: "Fancy Truck",
    address6: "242 St Kilda Rd, St Kilda VIC 3182",
    jamesTruck: "Jame’s  Truck",
    searchALocation: "Search a location",
    untitledDesign20210303T1912562: "",
    untitledDesign20210303T1912568: "",
    untitledDesign20210303T1912569: "",
    untitledDesign20210303T19125612: "",
    untitledDesign20210303T19125610: "",
    untitledDesign20210303T1912563: "",
    untitledDesign20210303T1912564: "",
    address7: "242 St Kilda Rd, St Kilda VIC 3182",
    address8: "21 km",
    fancyTruck32: "Fancy Truck",
    untitledDesign20210303T19125611: "",
    untitledDesign20210310T1032552: "",
    untitledDesign20210310T1735541: "",
    untitledDesign20210310T1811463: "",
    spanText: "Available Trucks in ",
    spanText2: "Melbourne",
    untitledDesign20210303T1912561: "",
    coolTruck: "Cool Truck",
    address9: "1 km",
    address10: "250 Lower Heidelberg Rd, Fairfield VIC 3079",
    address11: "250 Lower Heidelberg Rd, Fairfield VIC 3079",
};

// button example
export default HomePage;