import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navbar bg-navbar'>
      <h1 className='logo'>
        <Link to='/'>
          <i className='fas fa-film'></i> Stalls and Circles{' '}
        </Link>
      </h1>
      <ul>
        <li>
          <Link to='/register'>Register</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
