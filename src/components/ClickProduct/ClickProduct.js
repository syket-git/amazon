import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData/fakeData';
import ProductDetails from '../ProductDetails/ProductDetails';
import Header from '../Header/Header';
import {Spinner} from 'react-bootstrap';
import './ClickProduct.css';
import Footer from '../Footer/Footer';

const ClickProduct = () => {
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(false);
    const {id} = useParams();
    useEffect(() => {
        fetch('https://stormy-atoll-94872.herokuapp.com/product/' + id)
        .then(res => res.json())
        .then(data => {
            setLoading(true);
            setProduct(data);
        });
        
    },[id])
    //const product = fakeData.find(pd => pd.id === parseInt(id));
    //console.log(product)
    return (
        <div>
            {

            loading ? 

            <div>
                <Header></Header>
                <ProductDetails product={product}></ProductDetails>
            </div>

            : 

            <div className="spin">
                <Spinner className="d-block mx-auto text-center" animation="grow" />
            </div>

            }
        </div>
    );
};

export default ClickProduct;