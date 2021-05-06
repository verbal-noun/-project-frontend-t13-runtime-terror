import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './vanPage.css';
import redTruck from './assets/redTruck.png';

function ItemCard(props) {
  return(
    <div className="item-card-base" onClick={props.onClick}>
      <h1 className="item-card-name">{props.item.name}</h1>
      <h1 className="item-card-price">{props.item.unitPrice}$</h1>
      <img className="item-card-image" alt="something to eat" src={props.item.photoURL}/>
    </div>
  );
}

function OrderItemCard(props) {
  return(
    <div className="order-item-card-base">
      <span className="order-item-card-quantity">x{props.quantity}</span><br/>
      <img className="order-item-card-image" src={props.image}/>
    </div>
  );
}

function VanPage(props) {
  let [items, loadItems] = useState([]);
  let [vendor, loadVendor] = useState({});
  let [vendorDistance, setVendorDistance] = useState(null);
  let [order, setOrder] = useState([]);
  let [checkout, gotoCheckout] = useState(false);
  
  // Invalid access
  if(!props.location.state) {
    return <Redirect to="/"/>
  }

  axios.get(`https://info30005-customer-backend.herokuapp.com/api/customer/menu`)
    .then((res) => {
      loadItems(res.data);
    }
  );
  axios.get(`https://info30005-customer-backend.herokuapp.com/api/customer/vendor/${props.location.state.selectedID}`)
    .then((res) => {
      loadVendor(res.data);
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          let dlong = position.coords.longitude - res.data.position.longitude;
          let dlat = position.coords.latitude - res.data.position.latitude;
          let dist = Math.sqrt(dlong * dlong + dlat * dlat);
          setVendorDistance(Math.round(dist));
        });
      }
    });

  // Functions to update the order items
  let addOrder = (itemID) => {
    let found = order.find(orderItem => orderItem.item == itemID);
    if(!found) {
      order.push({item: itemID, quantity: 1});
    }
    else {
      found.quantity++;
    }
    setOrder(order);
  }
  let removeOrder = (itemID) => {
    let found = order.find(orderItem => orderItem.item == itemID);
    if(found) {
      found.quantity--;
      if(found.quantity == 0) {
        let index = order.indexOf(found);
        order.splice(index, 1);
      }
      setOrder(order);
    }
  }

  if(checkout) { // TODO: Change pathname to approprate url path
    return <Redirect to={{pathname: `/checkout`, state: {order}}}/>;
  }
  return (
    <div className="vanpage">
      <div className="row">
      </div>
      <div className="row">
        <div className="menu-items">
          {
            items.map((item, index) => (
              <ItemCard key={`item${index}`} item={item} onClick={() => addOrder(item._id)}/>
            ))
          }
        </div>
        <div className="vendor-bubble">
          <div className="vendor-bubble-left">
            <h1 className="vendor-bubble-name">{vendor.name}</h1>
            <img className="vendor-bubble-image" src={redTruck}/>
            {vendorDistance == null ? null : <h3 className="vendor-bubble-distance">{vendorDistance} km</h3>}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="order-items">
          {
            order.map((orderItem) => {
              let item = items.find(i => i._id == orderItem.item);
              return <OrderItemCard image={item.photoURL} quantity={orderItem.quantity}/>;
            })
          }
          <button className="order-button" onClick={gotoCheckout}>Order</button>
        </div>
      </div>
    </div>
    /*<div class="container-center-horizontal">
      <div className="vanpage screen" style={{ backgroundImage: `url(${vanpage})` }}>
        <div className="flex-row">
          <div className="flex-col-2">
            <div className="overlap-group4" style={{ backgroundImage: `url(${overlapGroup4})` }}>
              <img className="untitled-design-03-10-t171013-2" src={untitledDesign20210310T1710132} />
            </div>
            <div className="overlap-group">
              <div className="flex-col-5">
                <div className="overlap-group12">
                  <div className="big-cake roboto-regular-normal-black-18px">{bigCake}</div>
                  <div className="overlap-group13-1">
                    <div className="price roboto-regular-normal-black-18px">{price}</div>
                    <img className="untitled-design-03-10-t164652-1" src={untitledDesign20210310T1646521} />
                  </div>
                </div>
                <div className="overlap-group11">
                  <div className="fancy-bsicuit roboto-regular-normal-black-18px">{fancyBsicuit}</div>
                  <div className="overlap-group14">
                    <div className="price-3 roboto-regular-normal-black-18px">{price2}</div>
                    <img className="untitled-design-03-10-t101731-2" src={untitledDesign20210310T1017312} />
                  </div>
                </div>
              </div>
              <div className="flex-col-4">
                <div className="overlap-group5">
                  <div className="rectangle-36"></div>
                  <div className="surname roboto-regular-normal-black-18px">{surname}</div>
                  <div className="price-4 roboto-regular-normal-black-18px">{price3}</div>
                  <img className="untitled-design-03-10-t171428-1" src={untitledDesign20210310T1714281} />
                </div>
                <div className="overlap-group7">
                  <div className="rectangle-35"></div>
                  <div className="flat-white roboto-regular-normal-black-18px">{flatWhite}</div>
                  <div className="price-1 roboto-regular-normal-black-18px">{price4}</div>
                  <img className="untitled-design-03-10-t171345-1" src={untitledDesign20210310T1713451} />
                </div>
              </div>
              <div className="flex-col-1">
                <div className="overlap-group8">
                  <div className="rectangle-33"></div>
                  <img className="untitled-design-03-10-t101646-1" src={untitledDesign20210310T1016461} />
                  <div className="latte roboto-regular-normal-black-18px">{latte}</div>
                  <div className="price-2 roboto-regular-normal-black-18px">{price5}</div>
                </div>
                <div className="overlap-group10">
                  <div className="plain-biscuit roboto-regular-normal-black-18px">{plainBiscuit}</div>
                  <div className="flex-row-1">
                    <div className="price-5 roboto-regular-normal-black-18px">{price6}</div>
                    <div className="bxbx-log-in">
                      <div className="overlap-group13">
                        <img
                          className="vector-3"
                          src="https://anima-uploads.s3.amazonaws.com/projects/60518502f33459074ca5b995/releases/608fda63e02f4982665efe9d/img/vector@2x.svg"
                        />
                        <img className="vector" src={vector2} />
                      </div>
                    </div>
                  </div>
                  <img className="untitled-design-03-10-t165707-2" src={untitledDesign20210310T1657072} />
                </div>
              </div>
              <div className="flex-col">
                <div className="overlap-group6">
                  <div className="rectangle-34"></div>
                  <img className="untitled-design-03-10-t101527-1" src={untitledDesign20210310T1015271} />
                  <div className="capuccino roboto-regular-normal-black-18px">{capuccino}</div>
                  <div className="price-7 roboto-regular-normal-black-18px">{price7}</div>
                </div>
                <div className="overlap-group9" style={{ backgroundImage: `url(${overlapGroup9})` }}>
                  <div className="surname-1 roboto-regular-normal-black-18px">{surname2}</div>
                  <div className="price-6 roboto-regular-normal-black-18px">{price8}</div>
                  <img className="untitled-design-03-10-t164718-1" src={untitledDesign20210310T1647181} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex-col-3">
            <div className="overlap-group3">
              <div className="sign-in">{signIn}</div>
              <div className="bxbx-log-in-1">
                <div className="overlap-group5-1">
                  <img className="vector-2" src={vector3} />
                  <img className="vector-1" src={vector4} />
                </div>
              </div>
            </div>
            <div className="overlap-group2">
              <img className="ellipse-7" src={ellipse7} />
              <div className="x4km roboto-regular-normal-black-36px">{x4Km}</div>
              <img className="untitled-design-3-03-t191256-12" src={untitledDesign20210303T19125612} />
              <div className="elons-truck roboto-regular-normal-black-36px">{elonsTruck}</div>
            </div>
          </div>
        </div>
        <div className="overlap-group1">
          <div className="x2 roboto-regular-normal-black-36px">{x2}</div>
          <div className="overlap-group1-item roboto-regular-normal-black-36px">{x22}</div>
          <div className="overlap-group1-item roboto-regular-normal-black-36px">{x1}</div>
          <div className="overlap-group15">
            <h1 className="title">{title}</h1>
          </div>
        </div>
      </div>
  </div>*/
  );
}

export default VanPage;
