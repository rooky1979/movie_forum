import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('SUCCESS');
  };

  return (
    <Fragment>
      <h1 className='large text-primary my-1'>
        <i className='far fa-user-circle'></i> Login
      </h1>
      <p className='lead'>Welcome back! Sign in to start the party!</p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
            placeholder='Email'
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
            placeholder='Password'
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Login' />
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='/login'> Sign Up</Link>
      </p>
    </Fragment>
  );
};

export default Login;
