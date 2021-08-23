import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large logo'>Stalls and Circles New Zealand Forum</h1>
          <p className='lead'>
            A place to meet and discuss all things film, television, podcasts
            and theatre with like-minded people.
          </p>
          <div className='buttons'>
            <Link to='/login' className='btn btn-primary'>
              Login
            </Link>
            <Link to='/register' className='btn btn'>
              Register
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
