import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

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

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
