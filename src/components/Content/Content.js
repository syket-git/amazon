import React, {useState} from 'react';
import fakeData from '../../../src/fakeData/fakeData';
import Products from '../Products/Products';
const Content = () => {
    const [products] =  useState(fakeData);
    return (
        <div className="d-flex flex-wrap justify-content-between">
            {
                products.map(pd => <Products key={pd.id} product={pd}></Products>)
            }
        </div>
    );
};

export default Content;