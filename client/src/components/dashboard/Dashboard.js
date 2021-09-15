import React, { useEffect, Fragment } from 'react';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import DashboardActions from './DashboardActions';
import DashboardItem from './DashboardItem';

const Dashboard = ({
  deleteAccount,
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        Good to see you {user && user.name} <i className='far fa-smile'></i>
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <DashboardItem profile={profile} />
          <div className=''>
            <button className='btn btn-danger' onClick={() => deleteAccount()}>
              <i className='fas fa-user-alt-slash'></i> Delete Profile
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>
            You don't appear to have set up a profile yet. Add some info to say
            more about yourself.
          </p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
