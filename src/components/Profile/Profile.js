import React from 'react';
import { useAuth } from '../useAuth/useAuth';
import './Profile.css';
import { Link } from 'react-router-dom';

const Profile = () => {
  const auth = useAuth();
  console.log(auth);
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
