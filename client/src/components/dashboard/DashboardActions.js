import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div className='dashboard-buttons'>
      <Link to='/edit-profile' className='btn btn-light my-1'>
        <i className='fas fa-user-edit'></i> Edit Profile
      </Link>
      <div className=''>
        <button className='btn btn-danger'>
          <i className='fas fa-user-alt-slash'></i> Delete Profile
        </button>
      </div>
    </div>
  );
};

export default DashboardActions;
