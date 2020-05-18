import React, {useState, useEffect} from 'react';
import Products from '../Products/Products';
import {Spinner} from 'react-bootstrap';
import './Content.css';
const Content = () => {
    const [products, setProducts] =  useState();
    const [loading, setLoading] =  useState(false);
    useEffect(() => {
        fetch('https://stormy-atoll-94872.herokuapp.com/products')
        .then(res => res.json())
        .then(data => {
            setLoading(true)
            setProducts(data)
        });
    })
    
    return (
        <div className="d-flex flex-wrap justify-content-between">
            { 
            loading ? 
            products && products.map(pd => <Products key={pd.id} product={pd}></Products>)

            :
            <div className="spin">
                <Spinner className="m-auto" animation="grow" />
            </div>
            }
        </div>
    );
};

export default Content;