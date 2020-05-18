import React, { useContext } from 'react';
import {cartContext} from '../ProductDetails/ProductDetails'

const CartScreen = () => {
    const item = sessionStorage.getItem("item");
    console.log(item);
    return (
        <div>
            <h1>hello</h1>
        </div>
    );
};

export default CartScreen;