import axios from "axios";
import React, { useEffect, useState } from "react";

import './DashBoard.css'

function DashBoard(props) {
    return (
        <div className='dashboard-container'>
            <div className='grid-item item-order-graph'>

            </div>
            <div className='grid-item item-heat-map'>

            </div>
            <div className='grid-item item-pie-chart'>

            </div>
            <div className='grid-item item-open-close'>
                {OpenCloseItem()}
            </div>
            <div className='grid-item item-order-list'>
                {DisplayOrders()}
            </div> 
        </div>
    )
}

function OpenCloseItem() {
    const vendorData = JSON.parse(sessionStorage.getItem('vendor-data'));

    if (vendorData.open == false) {
        return (
            <div className="is-open-info">
                <h2>Currently closed for business.</h2>
                <p>Would you like to open now?</p>
                <div className="button-toggle-operations">
                    <h3>Open for business</h3>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="is-open-info">
                <h2>Currently open for business :)</h2>
                <p>Are you ready to close?</p>
                <div className="button-toggle-operations">
                    <h3>Close for business</h3>
                </div>
            </div>
        )
    }
    return (<p>word</p>)
}

function DisplayOrders() {
    let [orders, loadOrders] = useState([]);

    useEffect(() => {
        axios.get('https://info30005-vendor-backend.herokuapp.com/api/vendor/orders')
        .then((res) => {
            loadOrders(res.data);
        });
    });

    if (!orders) {
        return (
            <div className="no-orders">You don't currently have any orders</div>
        )
    }


    return (
        <div>
            {orders.map((order) => (
                <OrderCard 
                key={order._id}
                orderID={order._id}
                orderTime={order.createdAt}
                orderStatus={order.status}
                customerDetails={order.authorName} />
            ))}
        </div>
    )
    
}

function OrderCard( {orderID, orderTime, orderStatus, customerDetails} ) {
    return (
        <div className="item-order">
            <span className="order-id">{orderID}</span>
            <span className="customer-details">{customerDetails.given} {customerDetails.family}</span>
            <span className="order-time">{orderTime}</span>
            <span className="order-status">{orderStatus}</span>
        </div>

    )
}

export default DashBoard