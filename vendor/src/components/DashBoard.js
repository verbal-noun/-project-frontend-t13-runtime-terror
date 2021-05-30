import axios from "axios";
import React, { useEffect, useState } from "react";
import dateFormat from 'dateformat';

import './DashBoard.css'

// Entry point for dashboard content
function DashBoard(props) {
    return (
        <div className='dashboard-container'>
            
            <div className='grid-item item-open-close'>
                {OpenCloseItem()}
            </div>
            <div className='grid-item item-order-list'>
                {DisplayOrders()}
            </div>
            {MessageBox()}
        </div>
    )
}

// Display content for Open/Close view at top of dashboard
function OpenCloseItem() {

    const vendorData = JSON.parse(localStorage.getItem('vendor-data'));

    if (!vendorData) {
        return
    }

    var isOpen = localStorage.getItem('isopen');

    if (isOpen == null) {
        isOpen = vendorData.open == true;
    } else {
        isOpen = isOpen == 'true';
    }

    // display different content depending on it the truck is open
    if (vendorData.open == false) {
        return (
            <div>
                <div className="is-open-info">
                    <h2>Currently closed for business.</h2>
                    <p>Would you like to open now?</p>
                </div>
                <div className="button-toggle-operations" onClick={() => OpenMessageBox(true)}>
                    <h3>Open Truck</h3>
                </div>
            </div>
        )
    }
    else {
        return (
            <div>
                <div className="is-open-info"> 
                    <h2>Currently open for business :)</h2>
                    <textarea id="new-location-text" defaultValue="Change of location"></textarea>
                    <div className="submit-button" onClick={() => ChangeLocation()}>Submit</div>
                </div>
                <div className="button-toggle-operations" onClick={() => OpenMessageBox(false)}>
                    <h3>Close Truck</h3>
                </div>
            </div>
        )
    }
}


// Get content for displaying orders
function DisplayOrders() {
    // get order content and global values (discount amount and time limit)
    let [orders, loadOrders] = useState([]);
    let [globals, setGlobals] = useState([]);
    
    useEffect(() => {
        axios.get('https://info30005-vendor-backend.herokuapp.com/api/vendor/globals')
        .then((res) => {
            setGlobals(res.data);
        })
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            axios.get('https://info30005-vendor-backend.herokuapp.com/api/vendor/orders')
            .then((res) => {
                loadOrders(res.data);
            });
        }, 3000);
        return () => {clearTimeout(timer);};
    }, [orders]);

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
                customerDetails={order.customer}
                globals={globals} />
            ))}
        </div>
    )
    
}


// Create order cards from each order's attributes
function OrderCard( {orderID, orderTime, orderStatus, customerDetails, globals} ) {
    // calculate estimated time remaining for order and until discount is applied
    var timeRemaining = parseInt((new Date(orderTime).getTime() - new Date().getTime())/(1000*60)) + globals[1].value;
    var timeRemainingMessage = timeRemaining;

    // create message based on time left
    if (timeRemaining <= 0 && orderStatus === "Preparing") {
        timeRemainingMessage = "Discount Applied";
    } 
    else if (orderStatus === "Ready for pickup") {
        timeRemainingMessage = "Ready";
    } 
    else {
        timeRemainingMessage = timeRemainingMessage + " minutes";
    }

    return (
        <div className="item-order" id={"order-" + orderID} onClick={() => ToggleExpandOrder({orderID})}>
            <div className="cust-name">{customerDetails.name.given} {customerDetails.name.family}</div>
            <div className="time-created">{dateFormat(orderTime, "HH:MM")}</div>
            <div className="time-rem">{timeRemainingMessage}</div>
            <div className="order-status">{orderStatus}</div>
            <div className="button-expand" id={"toggle-button-" + orderID}>Expand</div>
            <div className="expanded-order" id={"expanded-order-" + orderID} style={{display:'none', height:'0%'}}>
                <div className="inner-expanded-order">
                    {DisplayOrderData({orderID, globals}, timeRemaining)}
                </div>
            </div>
        </div>
    )
}


// Toggles whether order details is expanded/visible or not
function ToggleExpandOrder( { orderID } ) {
    var elem = document.getElementById("expanded-order-"+orderID);
    var toggleButton = document.getElementById("toggle-button-" + orderID);

    if (elem.style.display == "block") {
        elem.style.height = "0%";
        elem.style.display = "none";
        toggleButton.innerHTML = "Expand";
        toggleButton.style.backgroundColor = "rgb(243, 127, 127)"
    } else {
        elem.style.height = "100%";
        elem.style.display = "block";
        toggleButton.innerHTML = "Close";
        toggleButton.style.backgroundColor = "rgb(72, 130, 224)"
    }
}


// Displays content for expanded order information
function DisplayOrderData( { orderID, globals }, timeRemaining ) {
    let [orderData, loadOrderData] = useState([]);

    useEffect(() => {
        axios.get('https://info30005-vendor-backend.herokuapp.com/api/vendor/order/'+orderID)
        .then((res) => {
            loadOrderData(res.data);
        });
    }, []);

    if (orderData.length == 0) {
        return
    }
    return (
        <div className="expanded-order-container">
            <div className="order-details-left">
                <div className="order-details-header">Order for {orderData.customer.name.given} {orderData.customer.name.family}</div>
                <div className="order-details-info">
                    <p>Contact Email: {orderData.customer.email}</p>
                    <p>This order was created on {dateFormat(orderData.createdAt, "dddd, mmmm dS")}</p>
                    <p>{orderData.customer.name.given} ordered {CalculateElapsedTime(orderData.createdAt)} ago</p>
                </div>
                {orderData.items.map((item) => (
                    <OrderDetailsItemCard
                    key={item._id}
                    itemID={item.item}
                    quantity={item.quantity}
                    />
                ))}
                <div className="order-details-total">
                    <div>Total:</div>
                    <div>${orderData.totalPrice}</div>
                </div>
                <div id={"discount-applied-message-"+orderID} className="discount-applied-message">
                    { orderData.status == "Preparing" ? (timeRemaining > 0 ? <p>A {globals[1].amount}% discount will be applied in {timeRemaining} minute(s).</p> 
                    : <p>A {globals[1].amount}% discount has been applied.</p>) : <p></p>}
                </div>
                {GetBottomButtons(orderData.status, {orderID})}
            </div>
        </div>
    )
}


// Gets buttons at bottom of expanded order, allowing cancellation, completion and fulfilment of order
function GetBottomButtons( orderStatus, {orderID} ) {
    if (orderStatus === "Preparing") {
        return (
            <div>
                <div id={"order-details-ready-cancel-"+orderID}>
                    <div className="order-details-ready" onClick={(e) => FulfillOrder({orderID}, e)}>Ready for Pick-up</div>
                    <div className="order-details-cancel" onClick={(e) => CancelOrder({orderID}, e)}>Cancel & Refund</div>
                </div>
                <div id={"order-details-complete-"+orderID} style={{display: 'none'}}>
                    <div className="order-details-complete" onClick={(e) => CompleteOrder({orderID}, e)}>Order Picked Up</div>
                </div>
            </div>
        )
    } else if (orderStatus === "Ready for pickup") {
        return (
            <div>
                <div id={"order-details-ready-cancel-"+orderID} style={{display: 'none'}}>
                    <div className="order-details-ready" onClick={(e) => FulfillOrder({orderID}, e)}>Ready for Pick-up</div>
                    <div className="order-details-cancel" onClick={(e) => CancelOrder({orderID}, e)}>Cancel & Refund</div>
                </div>
                <div id={"order-details-complete-"+orderID}>
                    <div className="order-details-complete" onClick={(e) => CompleteOrder({orderID}, e)}>Order Picked Up</div>
                </div>
            </div>
        )
    }
}

// Talks with API to complete the order fully
function CompleteOrder( { orderID }, e) {
    const confirmMessage = "Click Again to Confirm";
    const originalMessage = "Order Picked Up";
    e.stopPropagation(); // prevent expanded order being clicked 

    // force a double click within 5 seconds so accidents don't happen
    if (e.target.innerHTML != confirmMessage) {
        e.target.innerHTML = confirmMessage;
        setTimeout(function() {
            e.target.innerHTML = originalMessage;
        }, 5000);
        return
    }

    // hide order
    document.getElementById("order-"+orderID).style.display = "none";

    // complete order in db
    axios.post('https://info30005-vendor-backend.herokuapp.com/api/vendor/orderPickup', {order: orderID});
}

// Talks with API to cancel order
function CancelOrder( { orderID }, e ) {
    const confirmMessage = "Click Again to Confirm";
    const originalMessage = "Cancel & Refund";
    e.stopPropagation();

    // force a double click to prevent accidents
    if (e.target.innerHTML != confirmMessage) {
        e.target.innerHTML = confirmMessage;
        setTimeout(function() {
            e.target.innerHTML = originalMessage;
        }, 5000);
        return
    }

    // hide order
    document.getElementById("order-"+orderID).style.display = "none";

    // cancel order in db
    axios.post('https://info30005-vendor-backend.herokuapp.com/api/vendor/cancelOrder', {orderID: orderID});
}

function FulfillOrder( {orderID}, e ) {
    const confirmMessage = "Click Again to Confirm";
    const originalMessage = "Ready for Pick-up";
    e.stopPropagation();

    // force a double click to prevent accidents
    if (e.target.innerHTML != confirmMessage) {
        e.target.innerHTML = confirmMessage;
        setTimeout(function() {
            e.target.innerHTML = originalMessage;
        }, 5000);
        return
    }

    // change buttons
    document.getElementById("order-details-ready-cancel-"+orderID).style.display = "none";
    document.getElementById("order-details-complete-"+orderID).style.display = "block";
    document.getElementById("discount-applied-message-"+orderID).style.display = "none";

    // fulfill order and mark as ready to pick up
    axios.post('https://info30005-vendor-backend.herokuapp.com/api/vendor/fulfillOrder', {order: orderID});
}

// Calculates time in minutes since order created and colours text based on time elapsed
function CalculateElapsedTime(timeCreated) {
    const colourRed = "rgb(207, 37, 31)";
    const colourOrange = "rgb(240, 184, 65)";
    const timeWellOver = 20;
    const timeWarning = 10;

    var timeElapsed = parseInt((new Date().getTime() - new Date(timeCreated).getTime())/(1000*60))
    var warningIndicator = "rgb(0, 0, 0)";
    
    if (timeElapsed > timeWellOver) {
        warningIndicator = colourRed;
    } else if (timeElapsed > timeWarning) {
        warningIndicator = colourOrange; 
    }

    return (<b><span style={{color: warningIndicator}}>{timeElapsed} minutes</span></b>)
}


// Creates row with information on items in order
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
        <div className="order-item-card">
            <div className="order-item-card-img"><img src={itemData.photoURL} /></div>
            <div className="order-item-card-name">{itemData.name}</div>
            <div className="order-item-card-quantity">x{quantity}</div>
            <div className="order-item-card-price">${itemData.unitPrice*quantity}</div>
        </div>
    )
}

// Creates message box requiring confirmation for open/close of business
function MessageBox() {
    return (
        <div id="message-box">
            <h3 id="message-box-close">Are you sure you want to close?</h3>
            <textarea id="message-box-textarea" defaultValue="Describe where you are so customers can find you."></textarea>
            <div id="message-box-cancel" onClick={() => CloseMessageBox()}>Cancel</div>
            <div id="message-box-confirm" onClick={() => ToggleBusinessOperations()}>Confirm</div>
        </div>
    )
}

// Makes message box visible
function OpenMessageBox(toOpen) {
    var msgBox = document.getElementById("message-box");
    var msgBoxTextarea = document.getElementById("message-box-textarea");
    var screenDarken = document.getElementById("screen-darken");
    
    if (toOpen) {
        msgBox.firstChild.innerHTML = "<h3 id='message-box-open'>Are you ready to open for the day?</h3>"
        msgBox.style.display = "block";
        msgBoxTextarea.style.display = "block";
        screenDarken.style.display = "block";
    } else {
        msgBox.firstChild.innerHTML = "<h3 id='message-box-close'>Are you sure you want to close?</h3>"
        msgBox.style.display = "block";
        msgBoxTextarea.style.display = "none";
        screenDarken.style.display = "block";
    }
}

// Close message box
function CloseMessageBox() {
    var msgBox = document.getElementById("message-box");
    var screenDarken = document.getElementById("screen-darken");
    msgBox.style.display = "none";
    screenDarken.style.display = "none";
}


// Talks with API to open or close business
function ToggleBusinessOperations() {
    var toOpen = document.getElementById("message-box-open") != null;
    var locationDescription = document.getElementById("message-box-textarea").value;
    
    // get geolocation, then post geolocation and area description
    // once confirmed, reload page
    if (toOpen) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((geopos) => {
                var position = { longitude: geopos.coords.longitude, latitude: geopos.coords.latitude }
                var postData = { address: locationDescription, location: position }
                
                axios.post('https://info30005-vendor-backend.herokuapp.com/api/vendor/open', postData)
                .then((res) => {
                    console.log(res);
                    setTimeout(function() {
                        window.location.reload(false);
                    }, 1000);
                })
                .catch((err) => {
                    console.log(err);
                })
                localStorage.setItem('isopen', 'true');
            })
        }
    
    // post close request and reload page
    } else {
        axios.post('https://info30005-vendor-backend.herokuapp.com/api/vendor/close')
        .then((res) => {
            console.log(res);
            setTimeout(function() {
                window.location.reload(false);
            }, 1000);
        })
        .catch((err) => {
            console.log(err);
        })
        localStorage.setItem('isopen', 'false');
    }
    CloseMessageBox();

}


// Creates post request to update location
function ChangeLocation() {
    var newLocation = document.getElementById("new-location-text").value;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((geopos) => {
            var position = { longitude: geopos.coords.longitude, latitude: geopos.coords.latitude }
            var postData = { address: newLocation, location: position }
            
            axios.post('https://info30005-vendor-backend.herokuapp.com/api/vendor/open', postData)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
            localStorage.setItem('isopen', 'true');
        })
    }
}

export default DashBoard