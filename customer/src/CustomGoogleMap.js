import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import GoogleMapReact from 'google-map-react'
import axios from 'axios'

import Marker from './components/marker';
import style from './map_styles/purple.json'

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
`;

const CustomGoogleMap = ({ latitude, longitude }) => {
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
    <Wrapper>
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
    </Wrapper>
  )
}

export default CustomGoogleMap

