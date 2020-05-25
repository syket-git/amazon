import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = (props) => {
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    if (error) {
      setPaymentError(error.message);
      setPaymentSuccess(null);
    } else {
      setPaymentSuccess(paymentMethod);
      props.handlePlaceOrder(paymentMethod);
      setPaymentError(null);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement className="mb-3 mt-3" />
      <div className="text-center mb-2">
        {props.shipInfo ? (
          <button
            className="btn btn-warning Actual-button"
            type="submit"
            disabled={!stripe}
          >
            Pay & Place Order
          </button>
        ) : (
          <button
            style={{ cursor: 'not-allowed' }}
            className="btn btn-secondary"
            type="submit"
            disabled
          >
            Pay & Place Order
          </button>
        )}
        {paymentError && (
          <p style={{ marginTop: '20px' }} className="text-danger">
            {paymentError}
          </p>
        )}
        {paymentSuccess && (
          <p style={{ marginTop: '20px' }} className="text-success">
            Payment Successful!
          </p>
        )}
      </div>
    </form>
  );
};

export default CheckoutForm;
