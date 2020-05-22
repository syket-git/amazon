import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { cartContext } from '../../App';
import './CartScreen.css'

const CartScreen = (props) => {
  const items = useContext(cartContext);

  let totalQuantity = items.reduce((totalQ, item) => {
    return parseInt(totalQ) + parseInt(item.quantity);
  }, 0);
  let subtotal = parseInt(items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0));

  const shipCost = parseInt((subtotal * (2/100)).toFixed(2));
  const tax = parseInt((subtotal * (5/100)).toFixed(2));
  const total = (subtotal + shipCost + tax).toFixed(2);

  return (
    <div className="cartScreen">
      {props.cart.length === 0 ? (
        <div style={{marginTop:'200px'}}>
          <h4 className="font-weight-bold text-center">Your shopping cart is empty!</h4>
          <h3 className="font-weight-bold text-center">| |</h3>
          <h4 className="font-weight-bold text-center"><Link className="text-success" to="/">Continue Shopping</Link></h4>
        </div>
      ) : (
        <div>
          <h2 className="mt-3 text-center font-weight-bold">Shopping Cart</h2>

          <div className="container-fluid">
            <div className="row">
              <div className="col-md-8">
                {items.map((item) => (
                  <div
                    style={{
                      border: '1px solid #cccccc',
                      marginBottom: '10px',
                    }}
                    className="d-flex flex-wrap justify-content-between p-2 pr-5"
                  >
                    <img
                      src={item.img}
                      style={{ width: '200px', height: '140px' }}
                      alt=""
                    />
                    <div>
                      <h3>
                        <Link className="text-success" to={`/product/${item.id}`}>{item.name}</Link>
                      </h3>
                      <p>Size: {item.size}</p>
                      <p>
                        Quantity:
                        <select
                          value={item.quantity}
                          onChange={(e) => {
                            props.cartQuantityHandler(item.id, e.target.value);
                          }}
                        >
                          {[...Array(item.stock).keys()].map((x) => (
                            <option value={x + 1}>{x + 1}</option>
                          ))}
                        </select>
                      </p>
                    </div>
                    <div>
                      <h5>Price: ${item.price}</h5>
                      <p>subtotal: ${item.price * item.quantity}</p>
                      <button
                        onClick={() => props.DeleteFromCart(item.id)}
                        className="btn btn-warning Actual-button"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-md-4">
                <div>
                  <div style={{border: '1px solid #cccccc', padding:'20px'}}>
                    
                    <h6>Total Quantity: {totalQuantity}</h6>
                    <h5>Subtotal: ${subtotal}</h5>
                    <h5>Shipping cost: ${shipCost}</h5>
                    <h5>Tax: ${tax}</h5>
                    <h4>In Total : ${total}</h4>

                    <div className="button">
                      <button className="btn btn-warning Actual-button">Proceed to Checkout</button>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartScreen;
