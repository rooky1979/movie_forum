import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAlert } from '../../actions/alert';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const dispatch = useDispatch();

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      dispatch(setAlert('Passwords do not match', 'danger'));
    } else {
      console.log('SUCCESS');
    }
  };

  return (
    <Fragment>
      <h1 className='large text-primary my-1'>
        <i className='far fa-user-circle'></i> Register
      </h1>
      <p className='lead'>Create an account to get started!</p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            name='name'
            placeholder='Name'
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
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
            minLength='6'
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            name='password2'
            value={password2}
            onChange={(e) => onChange(e)}
            placeholder='Confirm Password'
            minLength='6'
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'> Sign In</Link>
      </p>
    </Fragment>
  );
};

export default Register;
