import React, { useEffect, useState } from "react";
import axios from "axios"
import './MenuList.css'


function ItemCard(props) {
    let { item } = props;
    return (
        <div className="item-card">
            <img src={item.photoURL} className="item-card-image"/>
            <div className="item-card-name">{item.name}</div>
            <div className="item-card-price">{item.unitPrice}$</div>
        </div>
    );
}

function MenuList(props) {
    let [items, loadItems] = useState([]);

    // Fetch the menu items and save them to component state
    useEffect(() => {
        axios
        .get(`https://info30005-customer-backend.herokuapp.com/api/customer/menu`)
        .then((res) => {
            loadItems(res.data);
        });
    });
    return (
        <div className='menu-container'>
            <h1>Item</h1>
            {items.map((item) => <ItemCard item={item}/>)}
        </div>
    )
}

export default MenuList