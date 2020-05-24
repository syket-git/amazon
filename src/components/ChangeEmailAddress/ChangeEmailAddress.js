import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../useAuth/useAuth';

const ChangeEmailAddress = () => {
  const auth = useAuth();
  console.log(auth);
  const { register, handleSubmit, errors, reset } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    auth.updateEmail(data.password, data.email);
    reset();
  };
  return (
    <div>
      <div className="container">
        <div className="form-width">
          <h3 className="text-center mb-3">
            Please Login again to change email
          </h3>
          {auth.user && <p className="red">{auth.user.err}</p>}
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              className="form-control"
              ref={register({ required: true })}
              type="password"
              name="password"
              placeholder="Current Password"
            />
            {errors.password && <p className="red">Password is required</p>}

            <input
              className="form-control"
              ref={register({ required: true })}
              type="email"
              name="email"
              placeholder="New Email"
            />
            {errors.email && <p className="red">Email is required</p>}

            <input
              className="form-control btn btn-warning Actual-button"
              type="submit"
              value="Submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangeEmailAddress;
