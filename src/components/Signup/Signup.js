import React, {useRef} from 'react';
import './Signup.css';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './Signup.css';
import Auth from '../useAuth/useAuth';

const Signup = () => {

  const auth = Auth();
  console.log(auth);

  const {register, handleSubmit, errors, watch, reset} = useForm();
  const password = useRef();
  
  password.current = watch("password", "")
  const onSubmit = data => {
    console.log(data);
    auth.createUser(data.name, data.email, data.password);
    reset();
  }

  return (
    <div>
      <div className="container">
        <div className="form-width">
          <h3 className="text-center mb-3">Create an account</h3>
          {auth.user && <p className="red">{auth.user.err}</p>}
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              className="form-control"
              type="text"
              name="name"
              placeholder="Name"
              ref={register({minLength: 3, required: true})}
            />
            {errors.name && <p className="red">Name is required </p> }
            <input
              className="form-control"
              ref={register({required: true })}
              type="email"
              name="email"
              placeholder="Email"
            
            />
            {errors.email && <p className="red">Email is required</p>}
            <input
              className="form-control"
              ref={register({required: "Password is required", minLength: 5})}
              type="password"
              name="password"
              placeholder="Password"
            />
            {errors.password && <p className="red">{errors.password.message}</p>}

            <input
              className="form-control"
              ref={register({
                validate: value =>
                  value === password.current || "The passwords do not match"
              })}
              type="password"
              name="cpassword"
              placeholder="Confirm Password"
            />
            {errors.cpassword && <p className="red">{errors.cpassword.message}</p>}
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
