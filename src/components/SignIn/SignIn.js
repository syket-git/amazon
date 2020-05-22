import React from 'react';
import './SignIn.css';
import { Link } from 'react-router-dom';

const SignIn = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <div className="container">
        <div className="form-width">
          <h3 className="text-center mb-3">Login</h3>
          <form onSubmit={handleSubmit}>
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
              className="form-control btn btn-warning Actual-button"
              type="submit"
              value="Submit"
            />
          </form>
          <p className="text-center">
            Don't have an account?{' '}
            <Link className="text-primary" to="/signup">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
