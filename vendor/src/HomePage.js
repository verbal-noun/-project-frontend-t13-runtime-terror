import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import './HomePage.css';
import foodLogo from './assets/food_logo.png'
import profileImage from './assets/profile_image.png'
import calendarIcon from './assets/calendar_icon.png'

import DashBoard from './components/DashBoard'
import MenuList from './components/MenuList'
import OrderList from './components/OrderList'
import axios from "axios";

const date_formatter = new Intl.DateTimeFormat('en-au', { month: 'long', day: 'numeric', year: 'numeric'})


// Entry point for main page of site
function HomePage(props) {

  // get vendor data to personalise page
  let [vendorData, setVendorData] = useState([]);

  useEffect(() => {
    axios.get('https://info30005-vendor-backend.herokuapp.com/api/vendor/vendorData')
    .then((res) => {
      setVendorData(res.data);
      localStorage.setItem('vendor-data', JSON.stringify(res.data));
    })
  }, []);

  // redirect to login if no token (not logged in)
  const token = localStorage.getItem('token');
  if (!token) {
    return (
      <Redirect to="/login" />
    )

  }
  return (
    <div className='container'>
      <div className="header-main">
        <img id="logo-main" src = {foodLogo} />
        <div className="header-vendor-name">
          <h3>Hello, {vendorData.name}!</h3>
        </div>
        <div className="header-date">
          <img id="calendar-icon" src = {calendarIcon} />
          <p>
            {date_formatter.format(new Date())}
          </p>
        </div>
        <div className="profile-image-container">
          <img id="header-profile-image" src={profileImage} />
        </div>
      </div>

      <div className="nav-bar">
        <ul id="nav-list">
          <li onClick={() => ChangeTab("dashboard")}>
            <span id='dashboard-list-item'>Dashboard</span>
          </li>
          <li onClick={() => ChangeTab('order-list')}>
            <span id='order-list-list-item'>Orders</span>
          </li>
          <li onClick={() => ChangeTab('menu')}>

            <span id='menu-list-item'>Menu</span>
          </li>
        </ul>
        <a href="/login" onClick={() => LogOut()} id='nav-log-out'>
          Log Out
        </a>
      </div>

      <div id='content-container'>
        <div id ='dashboard'><DashBoard /></div>
        <div id ='order-list'><OrderList /></div>
        <div id ='menu'><MenuList /></div>
      </div>

      <div id="screen-darken"></div>
    </div>
  );
}

export default HomePage;

// Handles tab change when a list item is clicked
function ChangeTab(tabName) {
  var contentContainer = document.getElementById("content-container")
  var children = contentContainer.children
  var listItems = document.getElementById("nav-list").children

  for (var i = 0; i < children.length; i++) {
    children[i].style.display = 'none'
  }

  for (var i = 0; i < listItems.length; i++) {
    listItems[i].firstChild.style['font-weight'] = '600'
  }

  document.getElementById(tabName).style.display = 'block'
  document.getElementById(tabName+'-list-item').style['font-weight'] = '700'
}


// Log out
function LogOut() {
  localStorage.clear()
}