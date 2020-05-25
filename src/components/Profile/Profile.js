import React, { useState, useEffect } from 'react';
import { useAuth } from '../useAuth/useAuth';
import './Profile.css';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [orders, setOrders] = useState([]);
  const auth = useAuth();

  useEffect(() => {
    const email = auth.user.email;
    console.log(email);
    fetch('https://stormy-atoll-94872.herokuapp.com/yourOrders/' + email)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOrders(data);
      });
  }, []);

  console.log(orders);

  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            <div className="box">
              <h3 className="text-center">{auth.user.name}</h3>
              <input
                className="form-control"
                value={auth.user.email}
                type="text"
              />
              <Link to="/updateProfile" className="button">
                <button className="btn btn-warning Actual-button mt-3">
                  Update Profile
                </button>
              </Link>
            </div>
          </div>
          <div className="col-md-8">
            <div>
              <h2 className="text-center">Your Orders</h2>
              {orders.map((order) => (
                <li>{order._id}</li>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
