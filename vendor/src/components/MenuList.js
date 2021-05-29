import React, { useEffect, useState } from "react";
import axios from "axios"
import './MenuList.css'


function MenuList(props) {
    let [items, loadItems] = useState([]);

    useEffect(() => {
        axios
        .get(`https://info30005-customer-backend.herokuapp.com/api/customer/menu`)
        .then((res) => {
            loadItems(res.data);
        });
    }, [])
    return (
        <div className='menu-container'>
            
        </div>
    )
}

export default MenuList