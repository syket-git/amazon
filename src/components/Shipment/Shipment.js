import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../useAuth/useAuth';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import './Shipment.css';

const Shipment = (props) => {
  const [shipInfo, setShipInfo] = useState(null);
  const stripePromise = loadStripe(
    'pk_test_RoZEYmMGVLAcXIQR9w2H97Rt00WWxZxRxj'
  );
  const auth = useAuth();
  const { register, handleSubmit, errors, watch, reset } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    setShipInfo(data);
    reset();
  };

  const handlePlaceOrder = (payment) => {
    const orderDetails = {
      name: auth.user.name,
      email: auth.user.email,
      shipInfo: shipInfo,
      cart: props.cart,
      payment: payment,
    };
    fetch('https://stormy-atoll-94872.herokuapp.com/placeOrder', {
      method: 'POST',
      body: JSON.stringify(orderDetails),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((data) => {
        console.log(data);
        props.clearCart();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <h3 className="text-center mb-3">Your Information</h3>

            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                className="form-control mb-3"
                type="text"
                name="door"
                placeholder="Delivery to door"
                ref={register({ minLength: 3, required: true })}
              />
              {errors.door && <p className="red">This field is required </p>}
              <input
                className="form-control mb-3"
                ref={register({ required: true })}
                type="text"
                name="road"
                placeholder="Road no"
              />
              {errors.road && <p className="red">This field is required</p>}
              <input
                className="form-control mb-3"
                ref={register({ required: true })}
                type="text"
                name="flat"
                placeholder="Flat, Suit or Floor"
              />
              {errors.flat && <p className="red">This field is required</p>}
              <input
                className="form-control mb-3"
                ref={register({ required: true })}
                type="text"
                name="holding"
                placeholder="Holding name"
              />
              {errors.holding && <p className="red">This field is required</p>}

              <textarea
                rows="4"
                ref={register({ required: true })}
                className="form-control mb-3"
                placeholder="Address"
                name="address"
                cols="30"
              />
              {errors.address && <p className="red">This field is required</p>}

              <input
                className="form-control btn btn-warning Actual-button"
                type="submit"
                value="Send"
              />
            </form>
          </div>
          <div className="col-md-6">
            <h3 className="text-center">Payment Info</h3>
            <div className="payment">
              <Elements stripe={stripePromise}>
                <CheckoutForm
                  shipInfo={shipInfo}
                  handlePlaceOrder={handlePlaceOrder}
                />
              </Elements>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipment;
