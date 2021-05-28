import axios from "axios";
import React, { useEffect, useState } from "react";
import dateFormat from 'dateformat';

import './DashBoard.css'

const TIME_BEFORE_DISCOUNT = 10;

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

    if (!vendorData) {
        return
    }

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
            <div className="grid-orders">
                <div className="grid-header-cust-name">Customer Name</div>
                <div className="grid-header-time-created">Time Created</div>
                <div className="grid-header-time-rem">Estimated Time Remaining</div>
                <div className="grid-header-order-status">Order Status</div>
                <div className="grid-header-action">Expand</div>
            </div>
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
    var timeRemaining = parseInt((new Date(orderTime).getTime() - new Date().getTime())/(1000*60)) + TIME_BEFORE_DISCOUNT;
    if (timeRemaining < 0 && orderStatus === "Preparing") {
        timeRemaining = "Apply discount";
    } else {
        timeRemaining = timeRemaining + " minutes";
    }

    return (
        <div className="item-order">
            {console.log(dateFormat(orderTime, "HH:MM"))}
            <div className="cust-name">Cool Guy</div>
            <div className="time-created">{dateFormat(orderTime, "HH:MM")}</div>
            <div className="time-rem">{timeRemaining}</div>
            <div className="order-status">{orderStatus}</div>
            <div className="button-expand">Expand</div>
        </div>

    )
}

export default DashBoard