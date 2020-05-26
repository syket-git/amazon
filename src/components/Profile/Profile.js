import React, { useState, useEffect } from 'react';
import { useAuth } from '../useAuth/useAuth';
import './Profile.css';
import { Link, useParams } from 'react-router-dom';
import { Table, Spinner } from 'react-bootstrap';

const Profile = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const { email } = useParams();

  useEffect(() => {
    fetch('https://floating-crag-86986.herokuapp.com/orders/' + email)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLoading(true);
        setOrders(data);
      });
  }, [email]);

  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            <h2 className="text-center">Your Profile</h2>
            <div className="box">
              <h4 className="text-center">{auth.user.name}</h4>
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
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Order Id</th>
                    <th>Payment</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    orders === [] ? (
                      <h4 className="text-center">
                        Sorry we have not find any order in your gmail
                      </h4>
                    ) : (
                      orders.map((order) => (
                        <tr>
                          <td>{order._id}</td>
                          <td>true</td>
                          <td>{order.date}</td>
                        </tr>
                      ))
                    )
                  ) : (
                    <Spinner animation="grow" />
                  )}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
