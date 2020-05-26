import React from 'react';
import { useAuth } from '../useAuth/useAuth';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const UpdateProfile = () => {
  const auth = useAuth();
  const { register, handleSubmit, errors, reset } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    auth.updateName(data.name);
    reset();
    window.location.replace('/');
  };
  return (
    <div>
      <div className="container">
        <div className="form-width">
          <h3 className="text-center mb-3">Update Profile</h3>
          {auth.user && auth.user.err}
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              className="form-control"
              defaultValue={auth.user.name}
              ref={register({ required: true })}
              type="text"
              name="name"
            />
            {errors.name && <p className="red">Name is required</p>}

            <Link to="/changeEmailAddress">
              <p className="text-primary">Click here to change email address</p>
            </Link>
            <Link to="/changePassword">
              <p className="text-primary">Click here to reset password</p>
            </Link>

            <input
              className="form-control btn btn-warning Actual-button"
              type="submit"
              value="Update"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
