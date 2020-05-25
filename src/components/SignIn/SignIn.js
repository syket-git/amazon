import React from 'react';
import './SignIn.css';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Auth from '../useAuth/useAuth';

const SignIn = () => {
  const auth = Auth();
  console.log(auth);
  const { register, handleSubmit, errors, reset } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    auth.signedInUser(data.email, data.password);
    reset();
  };
  return (
    <div>
      <div className="container">
        <div className="form-width">
          <h3 className="text-center mb-3">Login</h3>
          {auth.user && <p className="red">{auth.user.err}</p>}
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              className="form-control"
              ref={register({ required: true })}
              type="email"
              name="email"
              placeholder="Email"
            />
            {errors.email && <p className="red">Email is required</p>}

            <input
              className="form-control"
              ref={register({ required: true })}
              type="password"
              name="password"
              placeholder="Password"
            />
            {errors.password && <p className="red">Password is required</p>}

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
          <Link to="/forgotPassword">
            <p className="text-center text-primary">Forgot Password?</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
