import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductDetails.css';
import ReactImageMagnify from 'react-image-magnify';
import { Badge } from 'react-bootstrap';

const ProductDetails = (props) => {
  const [qty, setQty] = useState(1);

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
  const finalPrice = parseInt(price) * parseInt(qty);

  const handleCart = (product, qty) => {
    console.log('click product', product);
    product.quantity = qty;
    props.cartHandler(product);
  };


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
              <h5>Price: ${finalPrice}</h5>
              <p>
                Status:{' '}
                {props.product.stock > 0 ? (
                  <Badge pill variant="success">
                    Available
                  </Badge>
                ) : (
                  <Badge pill variant="danger">
                    Unavailable{' '}
                  </Badge>
                )}
              </p>
              <p>
                Quantity:{' '}
                <select
                  value={qty}
                  onChange={(e) => {
                    setQty(e.target.value);
                  }}
                >
                  {[...Array(props.product.stock).keys()].map((x) => (
                    <option value={x + 1}>{x + 1}</option>
                  ))}
                </select>
              </p>
              <div className="button">
                {props.product.stock > 0 ? (
                  <button
                    onClick={() => handleCart(props.product, qty)}
                    className="btn btn-warning Actual-button"
                  >
                    Add to Cart
                  </button>
                ) : (
                  <p>Out of Stock</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
