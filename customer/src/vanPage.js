import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "./vanPage.css";
import redTruck from "./assets/redTruck.png";

function ItemCard(props) {
  return (
    <div className="item-card-base" onClick={props.onClick}>
      <h1 className="item-card-name">{props.item.name}</h1>
      <h1 className="item-card-price">{props.item.unitPrice}$</h1>
      <img
        className="item-card-image"
        alt="something to eat"
        src={props.item.photoURL}
      />
    </div>
  );
}

function OrderItemCard(props) {
  return (
    <div className="order-item-card-base" onClick={props.onClick}>
      <span className="order-item-card-quantity">x{props.quantity}</span>
      <br />
      <img className="order-item-card-image" src={props.image} />
    </div>
  );
}

function VanPage(props) {
  let [items, loadItems] = useState([]);
  let [vendor, loadVendor] = useState({});
  let [vendorDistance, setVendorDistance] = useState(null);
  let [order, setOrder] = useState([]);
  let [checkout, gotoCheckout] = useState(false);
  let [back, goBack] = useState(false);

  let data = props.location.state;
  useEffect(() => {
    // Invalid access, do not perform requests
    if (!data) {
      return;
    }
    axios
      .get(`https://info30005-customer-backend.herokuapp.com/api/customer/menu`)
      .then((res) => {
        loadItems(res.data);
        if (data.orderItems) {
          setOrder(data.orderItems);
        }
      });
    axios
      .get(
        `https://info30005-customer-backend.herokuapp.com/api/customer/vendor/${props.location.state.selectedID}`
      )
      .then((res) => {
        loadVendor(res.data);
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            let dlong = position.coords.longitude - res.data.position.longitude;
            let dlat = position.coords.latitude - res.data.position.latitude;
            let dist = Math.sqrt(dlong * dlong + dlat * dlat);
            setVendorDistance(Math.round(dist));
          });
        }
      });
  }, []);

  // Invalid access
  if (!data) {
    return <Redirect to="/" />;
  }

  // Functions to update the order items
  let addOrder = (itemObj) => {
    let newOrder = order.slice();
    let found = newOrder.find((orderItem) => orderItem.item == itemObj._id);
    if (!found) {
      newOrder.push({
        name: itemObj.name,
        photoURL: itemObj.photoURL,
        item: itemObj._id,
        price: itemObj.unitPrice,
        quantity: 1,
      });
    } else {
      found.quantity++;
    }
    setOrder(newOrder);
  };
  let removeOrder = (orderItem) => {
    let newOrder = order.slice();
    orderItem.quantity--;
    if (orderItem.quantity == 0) {
      let index = newOrder.indexOf(orderItem);
      newOrder.splice(index, 1);
    }
    setOrder(newOrder);
  };

  if (checkout) {
    // TODO: Change pathname to approprate url path
    return (
      <Redirect
        to={{
          pathname: `/checkout`,
          state: {
            order,
            vendor: props.location.state.selectedID,
          },
        }}
      />
    );
  }
  if (back) {
    return <Redirect to="/" />;
  }
  return (
    <div className="vanpage">
      <button className="back-button" onClick={() => goBack(true)}>
        <span className="left-arrow"></span>
      </button>
      <div className="menu-row">
        <div className="menu-items">
          {items.map((item, index) => (
            <ItemCard
              key={`item${index}`}
              item={item}
              onClick={() => addOrder(item)}
            />
          ))}
        </div>
        <div className="vendor-bubble">
          <h1 className="vendor-bubble-name">{vendor.name}</h1>
          <img className="vendor-bubble-image" src={redTruck} />
          {vendorDistance == null ? null : (
            <h3 className="vendor-bubble-distance">{vendorDistance} km</h3>
          )}
        </div>
      </div>
      <div className="row">
        <div className="order-items">
          <div className="order-items-left">
            {order.map((orderItem, index) => {
              let item = items.find((i) => i._id == orderItem.item);
              return (
                <OrderItemCard
                  key={`orderitem${index}`}
                  image={item.photoURL}
                  quantity={orderItem.quantity}
                  onClick={() => removeOrder(orderItem)}
                />
              );
            })}
          </div>
          <button className="order-button" onClick={() => gotoCheckout(true)}>
            Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default VanPage;
