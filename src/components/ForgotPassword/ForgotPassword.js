import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../useAuth/useAuth';

const ForgotPassword = () => {
  const auth = useAuth();
  console.log(auth);
  const { register, handleSubmit, errors, reset } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    auth.forgotPassword(data.email);
    reset();
  };
  return (
    <div>
      <div className="container">
        <div className="form-width">
          <h3 className="text-center mb-3">Forgot Password</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              className="form-control"
              ref={register({ required: true })}
              type="email"
              name="email"
              placeholder="Enter your email"
            />
            {errors.email && <p className="red">Email is required</p>}

            <input
              className="form-control btn btn-warning Actual-button"
              type="submit"
              value="Reset Password Link"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
