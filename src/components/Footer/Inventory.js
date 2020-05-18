import React from 'react';
import fakeData from '../../fakeData/fakeData';

const inventory = () => {
    console.log(fakeData)
    const handleInsert = () => {
        
        fetch('http://localhost:4000/addProducts', {
            method: 'POST',
            body: JSON.stringify(fakeData),
            headers:{
                'Content-Type':'application/json'
            }
            
        })
        .then(res => res.json())
        .then(data => console.log(data));
        
    }
    return (
        <div>
            <button onClick={handleInsert}>Insert Data</button>
        </div>
    );
};

export default inventory;