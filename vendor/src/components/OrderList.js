import axios from "axios";
import React, { useEffect, useState } from "react";
import dateFormat from "dateformat";

import './OrderList.css'

function OrderList(props) {
    return (
        <div className='orders-container'>
            {DisplayOrders()}
        </div>
    )
}


function DisplayOrders() {
    let [orders, loadOrders] = useState([]);

    useEffect(() => {
        axios.get('https://info30005-vendor-backend.herokuapp.com/api/vendor/allOrders')
        .then((res) => {
            loadOrders(res.data);
        });
    }, []);

    if (!orders) {
        return (
            <div className="no-orders">You don't currently have any orders</div>
        )
    }
 
    return (
        <div className="all-orders-list">
            {orders.reverse().map((order) => (
                <OrderDetailsCard
                key={order._id}
                orderID={order._id}
                orderTime={order.createdAt}
                orderStatus={order.status}
                customerDetails={order.customer} />
            ))}
        </div>
    )
}

function OrderDetailsCard({orderID, orderTime, orderStatus, customerDetails}) {
    return (
        <div className="orders-tab-item">

            {GetOrderItems({orderID})}
        </div>
    )
}   


function GetOrderItems({orderID}) {
    let [orderData, loadOrderData] = useState([]);
    const colourGreen = "rgb(21, 207, 70)";
    const colourOrange = "rgb(247, 182, 42)";
    const colourRed = "rgb(247, 42, 42)";
    const colourBlue = "rgb(42, 45, 247)";

    var colour = colourBlue;

    useEffect(() => {
        axios.get('https://info30005-vendor-backend.herokuapp.com/api/vendor/order/'+orderID)
        .then((res) => {
            loadOrderData(res.data);
        });
    }, []);

    console.log(orderData);

    
    if (orderData.length == 0) {
        return
    }

    if (orderData.status === "Ready for pickup") {
        colour = colourGreen;
    } else if (orderData.status === "Cancelled") {
        colour = colourRed;
    } else if (orderData.status === "Preparing") {
        colour = colourOrange;
    }

    return (
        <div className="orders-tab-order-items">
            <h4 className="orders-tab-order-title">Order #{orderID}</h4>
            <div className="orders-tab-attribute-names">
                <br />
                <p style={{fontSize: '26px'}}>Order Status</p>
                <br />
                <p>Order Date</p>
                <p>Order Created At</p>
                <br />
                <p>Customer</p>
                <p>Customer Email</p>
                <br />
            </div>
            <div className="orders-tab-attribute-values">
                <br />
                <p style={{color: colour, fontSize: '26px'}}><b>{orderData.status}</b></p>
                <br />
                <p>{dateFormat(orderData.createdAt, "dddd, mmmm dS")}</p>
                <p>{dateFormat(orderData.createdAt, "HH:MM")}</p>
                <br />
                <p>{orderData.customer.name.given} {orderData.customer.name.family}</p>
                <p>{orderData.customer.email}</p>
                <br />
            </div>
            <h4>Order Items</h4>
            <div className="order-tab-item-card">
                <div className="order-tab-card-name"><b>Item Name</b></div>
                <div className="order-tab-card-quantity"><b>Quantity</b></div>
                <div className="order-tab-card-price"><b>Price</b></div>
            </div>
            {orderData.items.map((item) => (
                <OrderDetailsItemCard
                key={item._id}
                itemID={item.item}
                quantity={item.quantity}
                />
            ))}
            <div className="order-tab-item-card">
                <div className="order-tab-card-name"></div>
                <div className="order-tab-card-quantity"></div>
                <div className="order-tab-card-price"><b>${orderData.totalPrice}</b></div>
            </div>
        </div>
    )
}

function OrderDetailsItemCard( { itemID, quantity } ) {
    let [itemData, loadItemData] = useState([]);

    useEffect(() => {
        axios.get('https://info30005-customer-backend.herokuapp.com/api/customer/menu/'+itemID)
        .then((res) => {
            loadItemData(res.data);
        });
    }, []);

    if (!itemData) {
        return
    }  

    return (
        <div className="order-tab-item-card">
            <div className="order-tab-card-name">{itemData.name}</div>
            <div className="order-tab-card-quantity">x{quantity}</div>
            <div className="order-tab-card-price">${itemData.unitPrice*quantity}</div>
        </div>
    )
}


export default OrderList