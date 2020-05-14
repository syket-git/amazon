import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData/fakeData';
import ProductDetails from '../ProductDetails/ProductDetails';
import Header from '../Header/Header';

const ClickProduct = () => {
    const {id} = useParams();
    const product = fakeData.find(pd => pd.id === parseInt(id));
    //console.log(product)
    return (
        <div>
            <Header></Header>
            <ProductDetails product={product}></ProductDetails>
        </div>
    );
};

export default ClickProduct;