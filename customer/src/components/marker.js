import React from 'react';
import './marker.css'

const Marker = ({ id, text }) => (
    <div className = 'marker-container'>  
        <img id = 'red-truck' src='https://info30005-customer-frontend.herokuapp.com/static/media/redTruck.aac7bcb1.png' />  
        <div className = 'marker-basic' id = {"marker_" + id}>
            <p className = 'icon-name'>{text}</p>
        </div>
    </div>
);

export default Marker;