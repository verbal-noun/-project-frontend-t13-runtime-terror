import React, { useState, useEffect } from 'react';

import GoogleMapReact from 'google-map-react'
import axios from 'axios'

import Marker from './components/marker';
import style from './mapStyles/purple.json'

function CustomGoogleMap({longitude, latitude, className}) {
  const [trucks, loadTrucks] = useState([])

  const fetchPlaces = async () => {
    let res = await axios.get(`https://info30005-customer-backend.herokuapp.com/api/customer/nearby/0,0`)
    loadTrucks(res.data);
  }

  useEffect(() => {
    fetchPlaces()
      .catch((err) => { })
  }, [])

  console.log(trucks)

  if (!trucks || trucks.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <GoogleMapReact
        options={{styles: style, scrollwheel: false, fullscreenControl: false, zoomControl: false}}
        defaultZoom={14}
        bootstrapURLKeys={{ key: "AIzaSyAlXVQH0CDISyvqYDSUThVfGKggA8vaqtU" }}
        defaultCenter={{ lat: parseFloat(latitude), lng: parseFloat(longitude) }}
      >
        {trucks
          .filter(truck => truck.open === true)
          .map((truck) => (
            <Marker
              key={truck._id}
              id={truck._id}
              text={truck.name}
              lat={truck.position.latitude}
              lng={truck.position.longitude}
            />
        ))}
      </GoogleMapReact>
    </div>
  )
}

export default CustomGoogleMap

