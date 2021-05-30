import axios from "axios";
import React, { useEffect, useState } from "react";

import './OrderList.css'

function OrderList(props) {
    return (
        <div className='orders-container'>
        </div>
    )
}


/*function DisplayOrders() {
    let [orders, loadOrders] = useState([]);

    useEffect(() => {
        axios.get('https://info30005-vendor-backend.herokuapp.com/api/vendor/completedOrders')
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
        <div className="order-list">
            <div className="grid-orders">
                <div className="grid-header-cust-name">Customer Name</div>
                <div className="grid-header-time-created">Time Created</div>
                <div className="grid-header-time-rem">Estimated Time Remaining</div>
                <div className="grid-header-order-status">Order Status</div>
                <div className="grid-header-action"></div>
            </div>
            {orders.map((order) => (
                <OrderCard 
                key={order._id}
                orderID={order._id}
                orderTime={order.createdAt}
                orderStatus={order.status}
                customerDetails={order.customer} />
            ))}
        </div>
    )
    
}*/


export default OrderList