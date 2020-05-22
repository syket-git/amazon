import React from 'react';
import './Signup.css';
import { Link } from 'react-router-dom';

const Signup = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <div className="container">
        <div className="form-width">
          <h3 className="text-center mb-3">Create an account</h3>
          <form onSubmit={handleSubmit}>
            <input
              className="form-control"
              required
              type="text"
              name="name"
              placeholder="Name"
            />
            <input
              className="form-control"
              required
              type="email"
              name="email"
              placeholder="Email"
            />
            <input
              className="form-control"
              required
              type="password"
              name="password"
              placeholder="Password"
            />
            <input
              className="form-control"
              required
              type="password"
              name="cpassword"
              placeholder="Confirm Password"
            />
            <input
              className="form-control btn btn-warning Actual-button"
              type="submit"
              value="Submit"
            />
          </form>
          <p className="text-center">
            Already have an account?{' '}
            <Link className="text-primary" to="/signin">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
