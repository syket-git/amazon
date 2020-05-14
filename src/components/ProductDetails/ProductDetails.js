import React from 'react';
import { Link } from 'react-router-dom';
import './ProductDetails.css';
import ReactImageMagnify from 'react-image-magnify';

const ProductDetails = (props) => {
  console.log(props.product);
  const {
    name,
    img,
    description,
    category,
    size,
    ratings,
    price,
  } = props.product;
  const backToHome = '< Back to Home';
  return (
    <div>
      <div className="container mt-5">
        <div className="row d-flex flex-wrap justify-content-between">
          <div className="col-md-4">
            <Link to="/">
              <p style={{ color: 'black' }}>{backToHome}</p>
            </Link>
            
            <ReactImageMagnify
              {...{
                smallImage: {
                  isFluidWidth: true,
                  src: img,
                },
                largeImage: {
                  src: img,
                  width: 1200,
                  height: 1800,
                },
              }}
            />
          </div>
          <div className="col-md-4">
            <h4>{name}</h4>
            <p>{description}</p>
            <p>Price: ${price}</p>
            <p>Size: {size}</p>
            <p>Ratings: {ratings}</p>
            <p>Category: {category}</p>
          </div>
          <div className="col-md-4">
            <div className="action">
              <h5>Price: ${price}</h5>
              <p>Stock: InStock</p>
              <p>
                Qty:{' '}
                <select>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </p>
              <div className="button">
                <button className="btn btn-warning Actual-button">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
